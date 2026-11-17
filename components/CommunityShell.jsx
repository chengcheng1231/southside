import Link from 'next/link';
export default function CommunityShell({children}){
 return <><header className="community-nav"><Link className="community-brand" href="/">Southside</Link><nav aria-label="經驗分享導覽"><Link href="/#notes">經驗分享</Link><Link href="/contact?topic=submission">分享經驗 ＋</Link></nav></header><main className="community-main">{children}</main><footer className="community-footer">© 2026 Southside · Australia <span>投稿內容經確認後刊登</span></footer></>;
}
