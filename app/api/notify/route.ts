import { connection } from "next/server";
import { Resend } from "resend";
import { checkCronAuth } from "@/lib/cronAuth";

// 還沒在 Resend 驗證自己的網域前，只能用 Resend 提供的測試寄件地址
const FROM = "Cron Notify <onboarding@resend.dev>";
const TO = "mavisover@gmail.com";

// 呼叫一次就寄一封通知信
export async function GET(request: Request) {
  // 確保每次都在請求時執行，不會在 build 時被預先渲染
  await connection();

  const authError = checkCronAuth(request);
  if (authError) return authError;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("缺少環境變數 RESEND_API_KEY");
    return Response.json({ ok: false, error: "伺服器設定錯誤" }, { status: 500 });
  }

  const now = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Cron 通知：${now}`,
    text: `這是一封由 cron-notify-practice 寄出的通知信。\n\n觸發時間：${now}`,
  });

  if (error) {
    console.error("寄信失敗:", error);
    return Response.json({ ok: false, error: "寄信失敗" }, { status: 502 });
  }
  return Response.json({ ok: true, id: data?.id, sentAt: now });
}
