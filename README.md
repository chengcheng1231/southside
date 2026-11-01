# Southside

澳洲打工度假準備與生活經驗分享網站。使用 Next.js App Router、React 與 React Hook Form。目前僅本地開發，不會自動發布至 Sites。

## 啟動

```sh
npm ci
cp .env.example .env.local
npm run dev
```

若已有 `.env.local`，不要覆蓋。開啟 http://127.0.0.1:8000 。

```sh
npm run build
npm start
```

開發及正式啟動均使用 8000 埠，一次只啟動一個。

## 編輯內容

- `content/about.txt`：關於介紹；換行會保留，反引號標色，`[文字](/contact)` 建立站內連結。
- `content/about.json`：關於區塊標題。
- `content/journey.json`：六階段、文章內容與相關連結。
- `content/faq.json`：常見問題，目前隱藏。
- `lib/stories.js`：經驗文章示例，非真實使用者投稿。
- `components/`：頁面元件；`app/globals.css`：樣式。
- `public/`：網站圖片，來源見 `CREDITS.md`。

## 投稿與回饋

`/contact` 使用 React Hook Form，透過伺服器 `POST /api/feedback` 呼叫 Resend。沒有 Google 登入或資料庫；投稿不會自動公開。`/stories/new` 與 `/account/stories` 保留本機草稿功能，資料只存在當前瀏覽器。

在 `.env.local` 設定：

- `RESEND_API_KEY`：Resend API key。
- `FEEDBACK_FROM`：可用的寄件地址；`onboarding@resend.dev` 僅供測試，收件人須是 Resend 帳號地址。
- `FEEDBACK_TO`：收件人 Email，僅在伺服器使用。

不要使用 `NEXT_PUBLIC_` 儲存以上資訊。修改設定後重啟伺服器。只有寄信服務接受請求才顯示成功，不代表已進入收件匣。自動化測試使用模擬寄信，不會寄出真實郵件。

## 寄送限制

- 本地開發：單一程序全站每分鐘最多 5 次寄送嘗試。
- 正式環境：需設定 `UPSTASH_REDIS_REST_URL` 與 `UPSTASH_REDIS_REST_TOKEN`，以原子計數器提供跨程序全站每小時 30 次的限制。未設定或服務失敗時拒絕寄信。
- Redis 僅儲存計數與到期時間，不儲存投稿內容；回饋會交給 Resend 及收件信箱處理。
- 全站限制不是每人限制，達上限後會影響所有人；對外開放後可再依部署平台加入可信 IP 限流與 CAPTCHA。

## 公開原始碼前

`.env.local`、`.next/`、`node_modules/`、舊版 `dist/` 與 `.openai/` 設定均不應提交。移除 Git 追蹤不會清除舊 commit；目前歷史仍可能包含舊版及 Sites 專案設定。如不想公開這些歷史，請另行建立乾淨 repository，勿直接強制推送重寫。

部分圖片來源仍待確認，詳見 `CREDITS.md`。不要將未知作者的照片標為自行創作。文章中主動提供的公開署名與聯絡文字仍保留，請站主確認。

## 授權

原創程式碼採 MIT，見 `LICENSE`。網站文章（`content/` 與文章資料）、Southside 名稱與品牌素材不包含在 MIT 授權中；未另行授權者保留權利。第三方圖片及字體依各自授權，見 `CREDITS.md`。投稿者仍保有其原創內容的權利，提交表單不代表以 MIT 開源文章。

## 文章分享者與自動更新時間

在 `content/journey.json` 每個主題的 `author` 填入 `name`、`email`、`avatar`。頭像放 `public/`，例如 `public/authors/wilson.jpg` 對應 `/authors/wilson.jpg`；空白時使用預設人像。姓名與 Email 為公開資訊，請取得分享者同意。

`npm run dev` 會監看主題資料；`npm run build` 前也會同步。每個主題以固定 ID 與內容雜湊追蹤，實質內容（包含作者、來源或所屬階段介紹）改變時，自動記錄到 `content/journey-updates.json`，頁面以墨爾本時間顯示更新年月。單純排版 JSON 或修改其他主題不會更新該篇日期。這份追蹤檔需一起提交，請勿手動修改 hash。

首次建立僅記錄基準，不冒充過去更新日期；文章下一次修改後才顯示時間。新增主題也是先建立基準。監看腳本剛加入時，請重啟 `npm run dev`。已下載文件不會自動變更。
