import { Resend } from "resend";
import { congratsEmail } from "@/lib/congratsEmail";

// 還沒在 Resend 驗證自己的網域前，只能用 Resend 提供的測試寄件地址
const FROM = "Cron Notify <onboarding@resend.dev>";
const TO = "mavisover@gmail.com";

export type SendResult =
  | { ok: true; id: string | undefined; sentAt: string }
  | { ok: false; error: string };

// 寄一封通知信，API 和首頁按鈕共用
export async function sendNotifyEmail(): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("缺少環境變數 RESEND_API_KEY");
    return { ok: false, error: "伺服器設定錯誤" };
  }

  const now = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
  const { subject, html, text } = congratsEmail(now);
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("寄信失敗:", error);
    return { ok: false, error: "寄信失敗" };
  }
  return { ok: true, id: data?.id, sentAt: now };
}
