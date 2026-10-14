import { timingSafeEqual } from "node:crypto";

// 檢查 header 是否帶有 Authorization: Bearer <CRON_SECRET>
// 通過回傳 null，否則回傳要直接送出的錯誤回應
export function checkCronAuth(request: Request): Response | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("缺少環境變數 CRON_SECRET");
    return Response.json({ ok: false, error: "伺服器設定錯誤" }, { status: 500 });
  }

  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(request.headers.get("authorization") ?? "");
  // 用固定時間比對，避免從回應時間猜出密鑰
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
