'use client';
import {useState} from 'react';
export default function ContributorAvatar({author={}}){
 const [failed,setFailed]=useState(false);
 const avatar=typeof author.avatar==='string'&&/^\/(?!\/)/.test(author.avatar)?author.avatar:null;
 return <span className="guide-avatar">{avatar&&!failed?<img src={avatar} alt="" style={{objectPosition:author.avatarPosition||'center',transform:`rotate(${Number(author.avatarRotation)||0}deg)`}} onError={()=>setFailed(true)}/>:<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>}</span>;
}
