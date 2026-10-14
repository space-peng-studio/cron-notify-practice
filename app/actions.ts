"use server";

import { sendNotifyEmail, type SendResult } from "@/lib/sendNotifyEmail";

// 首頁按鈕用的 Server Action，在伺服器端寄信，密鑰不會傳到瀏覽器
export async function sendNotifyAction(): Promise<SendResult> {
  return sendNotifyEmail();
}
