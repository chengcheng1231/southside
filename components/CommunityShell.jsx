import Link from 'next/link';
import {showExperiences} from '../lib/site-features';
export default function CommunityShell({children,showSubmission=true}){
 return <><header className="community-nav"><Link className="community-brand" href="/">Southside</Link>{(showExperiences||showSubmission)&&<nav aria-label="經驗分享導覽">{showExperiences&&<Link href="/#notes">經驗分享</Link>}{showSubmission&&<Link href="/contact?topic=submission">分享經驗 ＋</Link>}</nav>}</header><main className="community-main">{children}</main><footer className="community-footer">© 2026 Southside · Australia <span>投稿內容經確認後刊登</span></footer></>;
}
