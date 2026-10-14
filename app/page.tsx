import { SendEmailButton } from "@/app/_components/SendEmailButton";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl bg-white px-8 py-12 text-center shadow-sm dark:bg-zinc-900">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Cron Notify Practice
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            按下按鈕，寄一封通知信到你的信箱
          </p>
        </div>
        <SendEmailButton />
      </main>
    </div>
  );
}
