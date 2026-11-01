"use client";
import {useState} from 'react';
import Link from 'next/link';
import {stories,categories} from '../lib/stories';
export default function StoriesList(){
 const [category,setCategory]=useState('全部'),[query,setQuery]=useState('');
 const visible=stories.filter(s=>(category==='全部'||s.category===category)&&`${s.title} ${s.city} ${s.excerpt}`.toLowerCase().includes(query.toLowerCase()));
 return <><div className="community-heading"><div><p className="eyebrow">EXPERIENCES</p><h1>經驗分享</h1><p>澳洲生活的實際經驗，依主題與地點查找。</p></div><Link className="button dark" href="/stories/new">分享經驗 ＋</Link></div><p className="community-notice">目前文章為版型示例；你可以先撰寫並預覽自己的草稿。</p><div className="story-filters"><label>搜尋標題、內容或城市<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜尋經驗" /></label><label>主題<select value={category} onChange={e=>setCategory(e.target.value)}>{['全部',...categories].map(c=><option key={c}>{c}</option>)}</select></label></div><p className="results-count" aria-live="polite">{visible.length} 篇文章</p><div className="community-grid">{visible.map(s=><Link className="community-card" href={`/stories/${s.slug}`} key={s.slug}><img src={s.cover} alt="" /><div className="story-meta"><span>{s.category}</span><span>版型示例</span></div><h2>{s.title}</h2><p>{s.excerpt}</p><span className="read-link">閱讀文章 ↗</span></Link>)}</div>{!visible.length&&<div className="empty-state"><h2>沒有符合的文章</h2><p>試試其他關鍵字或主題。</p><button className="text-button" onClick={()=>{setCategory('全部');setQuery('');}}>清除篩選</button></div>}</>;
}
