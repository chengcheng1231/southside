import Link from 'next/link';
import CommunityShell from '../../components/CommunityShell';
import ContributorAvatar from '../../components/ContributorAvatar';
import {contributors} from '../../lib/contributors';
import './contributors.css';
export const metadata={title:'分享者 — Southside',description:'認識在 Southside 分享澳洲打工度假與生活經驗的分享者。'};
export default function ContributorsPage(){
 return <CommunityShell showSubmission={false}><div className="contributors-heading"><p className="eyebrow">OUR AUTHORS</p><h1>分享者</h1></div><div className="contributors-grid">{contributors.map(person=><article className="contributor-card" id={person.id} key={person.id}><ContributorAvatar author={person}/><div><h2>{person.name}</h2><p>{person.bio}</p>{person.email&&<a className="contributor-email" href={`mailto:${person.email}`}>{person.email}</a>}</div></article>)}</div><div className="contributors-invite"><Link href="/contact?topic=submission">歡迎投稿你的經驗 ↗</Link></div><Link className="contributors-back" href="/#journey">← 返回文章列表</Link></CommunityShell>;
}
