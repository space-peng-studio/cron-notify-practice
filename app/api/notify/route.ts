import { connection } from "next/server";
import { checkCronAuth } from "@/lib/cronAuth";
import { sendNotifyEmail } from "@/lib/sendNotifyEmail";

// 呼叫一次就寄一封通知信
export async function GET(request: Request) {
  // 確保每次都在請求時執行，不會在 build 時被預先渲染
  await connection();

  const authError = checkCronAuth(request);
  if (authError) return authError;

  const result = await sendNotifyEmail();
  if (!result.ok) {
    return Response.json(result, { status: 502 });
  }
  return Response.json(result);
}
