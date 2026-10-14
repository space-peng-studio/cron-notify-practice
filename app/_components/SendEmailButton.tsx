"use client";

import { useActionState } from "react";
import { sendNotifyAction } from "@/app/actions";
import type { SendResult } from "@/lib/sendNotifyEmail";

export function SendEmailButton() {
  const [result, formAction, isPending] = useActionState<
    SendResult | null
  >(() => sendNotifyAction(), null);

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      <button
        type="submit"
        disabled={isPending}
        className="h-12 rounded-full bg-foreground px-8 font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {isPending ? "寄送中…" : "寄出通知信"}
      </button>

      <p aria-live="polite" className="min-h-6 text-sm">
        {result?.ok && (
          <span className="text-green-600 dark:text-green-400">
            已寄出（{result.sentAt}），請到信箱查看
          </span>
        )}
        {result && !result.ok && (
          <span className="text-red-600 dark:text-red-400">
            {result.error}，請稍後再試
          </span>
        )}
      </p>
    </form>
  );
}
