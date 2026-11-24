import './globals.css';
import { Analytics } from '@vercel/analytics/next';
export const metadata = {
 metadataBase:new URL('https://southside.yuchenghsu.dev'),
 title:'Southside — 澳洲生活資訊與經驗分享',
 description:'澳洲打工度假與留學生活資訊，包含出發準備、租屋、工作及離澳事項。',
 openGraph:{
  type:'website',
  locale:'zh_TW',
  siteName:'Southside',
  title:'Southside — 澳洲生活資訊與經驗分享',
  description:'澳洲打工度假與留學生活資訊，包含出發準備、租屋、工作及離澳事項。',
  images:[{url:'/hero.jpg',width:4564,height:3043,alt:'Southside 首頁 banner：雪梨港灣與雪梨歌劇院'}]
 },
 twitter:{
  card:'summary_large_image',
  title:'Southside — 澳洲生活資訊與經驗分享',
  description:'澳洲打工度假與留學生活資訊，包含出發準備、租屋、工作及離澳事項。',
  images:[{url:'/hero.jpg',alt:'Southside 首頁 banner：雪梨港灣與雪梨歌劇院'}]
 }
};
export const viewport = { themeColor:'#233c32' };
export default function RootLayout({children}){
 return <html lang="zh-Hant" suppressHydrationWarning><head>
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
 </head><body>{children}<Analytics /></body></html>;
}
