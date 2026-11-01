import Link from 'next/link';
export default function CommunityShell({children}){
 return <><header className="community-nav"><Link className="community-brand" href="/">Southside</Link><nav aria-label="經驗分享導覽"><Link href="/#notes">經驗分享</Link><Link href="/account/stories">我的投稿</Link><Link href="/stories/new">分享經驗 ＋</Link></nav></header><main className="community-main">{children}</main><footer className="community-footer">© 2026 Southside · Australia <span>Google 登入與公開投稿尚未開放</span></footer></>;
}
