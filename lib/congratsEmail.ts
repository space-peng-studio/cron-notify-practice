// 恭喜信的內容：HTML 版給一般信箱，純文字版給不顯示 HTML 的信箱
// HTML 用 table 排版 + inline style，才能在 Gmail、Outlook 等信箱正常顯示

const SITE_URL = "https://cron-notify-practice-two.vercel.app";

export function congratsEmail(sentAt: string) {
  const subject = "🎉 恭喜！課程積木就快全部完成了";

  const text = [
    "恭喜你！",
    "",
    "你的課程就快學完所有積木了。",
    "從建立 Next.js 專案、寫 API、連上 MongoDB，",
    "到部署 Vercel、設定 cron 排程，再到用 Resend 寄出這封信，",
    "每一塊積木都是你一步一步親手疊起來的。",
    "",
    "剩下最後幾塊，加油，終點就在前面！",
    "",
    `回到網站：${SITE_URL}`,
    "",
    `寄出時間：${sentAt}`,
    "這封信由 cron-notify-practice 自動寄出。",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;">
  <!-- 收件匣預覽文字，不會顯示在信件內文 -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    你的課程就快學完所有積木了，終點就在前面！
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- 標題區 -->
          <tr>
            <td align="center" style="background-color:#4f46e5;padding:40px 24px;">
              <div style="font-size:48px;line-height:1;">🎉</div>
              <h1 style="margin:16px 0 0;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:26px;line-height:1.4;color:#ffffff;">
                恭喜你！課程積木就快全部完成了
              </h1>
            </td>
          </tr>

          <!-- 內文 -->
          <tr>
            <td style="padding:32px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:16px;line-height:1.8;color:#3f3f46;">
              <p style="margin:0 0 16px;">嗨，</p>
              <p style="margin:0 0 16px;">
                你的課程已經快要學完<strong style="color:#4f46e5;">所有積木</strong>了！
                回頭看看這一路，每一塊都是你親手疊上去的：
              </p>
            </td>
          </tr>

          <!-- 已完成的積木 -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2ff;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:15px;line-height:2;color:#3730a3;">
                    ✅ 建立 Next.js 專案<br>
                    ✅ 寫出第一支 API<br>
                    ✅ 用 Mongoose 連上 MongoDB<br>
                    ✅ 部署到 Vercel<br>
                    ✅ 用 cron 自動排程<br>
                    ✅ 用 Resend 寄出這封信
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:16px;line-height:1.8;color:#3f3f46;">
              <p style="margin:0;">剩下最後幾塊，加油，終點就在前面！💪</p>
            </td>
          </tr>

          <!-- 按鈕 -->
          <tr>
            <td align="center" style="padding:24px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:999px;background-color:#4f46e5;">
                    <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;">
                      回到網站
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 頁尾 -->
          <tr>
            <td align="center" style="padding:20px 32px;border-top:1px solid #e4e4e7;font-family:-apple-system,BlinkMacSystemFont,'PingFang TC','Microsoft JhengHei',Arial,sans-serif;font-size:12px;line-height:1.6;color:#a1a1aa;">
              寄出時間：${sentAt}<br>
              這封信由 cron-notify-practice 自動寄出
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
