'use client';
import {useState} from 'react';
export default function GuideAuthor({author={},updatedAt}){
 const [failed,setFailed]=useState(false);
 const [expanded,setExpanded]=useState(false),[hovered,setHovered]=useState(false);
 const visible=expanded||hovered;
 const date=updatedAt?new Intl.DateTimeFormat('zh-TW',{year:'numeric',month:'2-digit',timeZone:'Australia/Melbourne'}).format(new Date(updatedAt)):null;
 const email=typeof author.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(author.email)?author.email:null;
 const avatar=typeof author.avatar==='string'&&/^\/(?!\/)/.test(author.avatar)?author.avatar:null;
 return <div className="guide-byline"><div className="guide-author" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setExpanded(false);}} onKeyDown={e=>{if(e.key==='Escape'){setExpanded(false);setHovered(false);}}}><button type="button" className="guide-author-trigger" aria-expanded={visible} onClick={()=>setExpanded(v=>!v)} aria-label={`查看分享者資料：${author.name||'待補'}`}><span className="guide-avatar">{avatar&&!failed?<img src={avatar} alt={author.name||'分享者頭像'} style={{objectPosition:author.avatarPosition||'center',transform:`rotate(${Number(author.avatarRotation)||0}deg)`}} onError={()=>setFailed(true)}/>:<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>}</span><span>{author.name||'分享者待補'}</span></button><div className="guide-author-card" hidden={!visible}><strong>{author.name||'分享者待補'}</strong>{email?<a href={`mailto:${email}`}>{email}</a>:<span>Email 尚未提供</span>}</div></div><span className="guide-updated">{date?<>更新於 <time dateTime={updatedAt}>{date}</time></>:'更新時間尚未記錄'}</span></div>;
}
