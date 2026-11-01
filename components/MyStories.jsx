"use client";
import {useState,useEffect} from 'react';
import Link from 'next/link';
import {readDrafts,deleteDraft} from '../lib/draft-storage';
export default function MyStories(){
 const [drafts,setDrafts]=useState([]),[ready,setReady]=useState(false),[error,setError]=useState('');
 useEffect(()=>{try{setDrafts(readDrafts());}catch{setError('無法讀取本機草稿，請確認瀏覽器允許儲存。');}setReady(true);},[]);
 function remove(draft){if(!window.confirm(`刪除「${draft.title||'未命名草稿'}」？此本機草稿無法復原。`))return;try{deleteDraft(draft.id);setDrafts(readDrafts());}catch{setError('無法刪除草稿，請稍後再試。');}}
 return <><div className="community-heading"><div><p className="eyebrow">MY STORIES</p><h1>我的投稿</h1><p>管理這台瀏覽器裡的草稿。</p></div><Link className="button dark" href="/stories/new">新增草稿 ＋</Link></div><p className="community-notice">目前為本機草稿，沒有登入、跨裝置同步或公開投稿。清除瀏覽器資料會移除草稿。</p>{error&&<p role="alert" className="form-error">{error}</p>}{!ready?<p>讀取中…</p>:drafts.length?<div className="draft-list">{drafts.map(d=><div className="draft-row" key={d.id}><div><span className="draft-badge">草稿</span><h2><Link href={`/account/stories/${d.id}`}>{d.title||'未命名草稿'}</Link></h2><p>{d.category||'未分類'} · {d.city||'地點待補'} · {d.updatedAt?new Date(d.updatedAt).toLocaleString('zh-TW'):''}</p></div><div className="draft-row-actions"><Link href={`/account/stories/${d.id}`}>編輯／預覽 ↗</Link><button className="text-button" onClick={()=>remove(d)}>刪除</button></div></div>)}</div>:<div className="empty-state"><h2>還沒有草稿</h2><p>先記錄一段澳洲生活經驗，再補上細節。</p><Link className="read-link" href="/stories/new">開始撰寫 ↗</Link></div>}</>;
}
