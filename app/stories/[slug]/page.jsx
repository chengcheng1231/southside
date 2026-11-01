import {notFound} from 'next/navigation';
import Link from 'next/link';
import {stories} from '../../../lib/stories';
import CommunityShell from '../../../components/CommunityShell';
import StoryContent from '../../../components/StoryContent';
export function generateStaticParams(){return stories.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}){const {slug}=await params;return {title:`${stories.find(s=>s.slug===slug)?.title||'找不到文章'} — Southside`};}
export default async function Page({params}){const {slug}=await params;const story=stories.find(s=>s.slug===slug);if(!story)notFound();return <CommunityShell><Link className="back-link" href="/#notes">← 經驗分享</Link><StoryContent story={story}/><div className="article-actions"><Link href="/stories/new" className="button dark">分享你的經驗 ＋</Link></div></CommunityShell>;}
