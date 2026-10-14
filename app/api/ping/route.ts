import { timingSafeEqual } from "node:crypto";
import { connection } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TimeRecordModel } from "@/models/TimeRecord";

// 檢查 header 是否帶有 Authorization: Bearer <CRON_SECRET>
function isAuthorized(request: Request, secret: string) {
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(request.headers.get("authorization") ?? "");
  // 用固定時間比對，避免從回應時間猜出密鑰
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// 給 cron-job.org 用 GET 呼叫，每次新增一筆當下時間
export async function GET(request: Request) {
  // 確保每次都在請求時執行，不會在 build 時被預先渲染
  await connection();

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("缺少環境變數 CRON_SECRET");
    return Response.json({ ok: false, error: "伺服器設定錯誤" }, { status: 500 });
  }
  if (!isAuthorized(request, secret)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const record = await TimeRecordModel.create({ time: new Date() });
    return Response.json(
      { ok: true, id: record._id, time: record.time },
      { status: 201 }
    );
  } catch (err) {
    console.error("儲存時間失敗:", err);
    return Response.json(
      { ok: false, error: "儲存時間失敗" },
      { status: 500 }
    );
  }
}
