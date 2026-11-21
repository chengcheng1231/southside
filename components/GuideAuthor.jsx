import Link from 'next/link';
import ContributorAvatar from './ContributorAvatar';
import {contributorHref} from '../lib/contributors';
export default function GuideAuthor({author={},updatedAt}){
 const date=updatedAt?new Intl.DateTimeFormat('zh-TW',{year:'numeric',month:'2-digit',timeZone:'Australia/Melbourne'}).format(new Date(updatedAt)):null;
 return <div className="guide-byline"><div className="guide-author"><Link className="guide-author-trigger" href={contributorHref(author)} aria-label={`查看分享者：${author.name||'分享者'}`}><ContributorAvatar author={author}/><span>{author.name||'分享者待補'}</span></Link></div><span className="guide-updated">{date?<>更新於 <time dateTime={updatedAt}>{date}</time></>:'更新時間尚未記錄'}</span></div>;
}
