import { connection } from "next/server";
import { checkCronAuth } from "@/lib/cronAuth";
import { connectDB } from "@/lib/mongodb";
import { TimeRecordModel } from "@/models/TimeRecord";

// 給 cron-job.org 用 GET 呼叫，每次新增一筆當下時間
export async function GET(request: Request) {
  // 確保每次都在請求時執行，不會在 build 時被預先渲染
  await connection();

  const authError = checkCronAuth(request);
  if (authError) return authError;

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
