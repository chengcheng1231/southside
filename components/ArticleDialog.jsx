"use client";
import {useEffect,useRef} from 'react';
import {stages,details,sourceFor} from '../lib/guides';
import journey from '../content/journey.json';
const text=journey.article;
const siteTitle='Southside — 澳洲生活資訊與經驗分享';
export default function ArticleDialog({articleId,onClose,onArticle}){
 const dialog=useRef(null);
 const [i,j]=articleId===null?[]:articleId.split('-').map(Number);
 const stage=stages[i],title=stage?.topics[j];
 const source=title?sourceFor(i,j):null;
 const next=title?(j+1<stage.topics.length?`${i}-${j+1}`:i<5?`${i+1}-0`:'0-0'):null;
 const [nextI,nextJ]=next?next.split('-').map(Number):[];
 const isOpen=articleId!==null;
 useEffect(()=>{
  const el=dialog.current;if(!isOpen)return;
  const previousOverflow=document.body.style.overflow;
  if(!el.open)el.showModal();document.body.style.overflow='hidden';
  return ()=>{if(el.open)el.close();document.body.style.overflow=previousOverflow;};
 },[isOpen]);
 useEffect(()=>{document.title=title?`${title} — Southside`:siteTitle;if(dialog.current)dialog.current.scrollTop=0;return ()=>{document.title=siteTitle;};},[title]);
 return <dialog ref={dialog} id="article-dialog" aria-labelledby="article-title" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}>
 <div className="article-toolbar"><a className="article-logo" href="#journey" onClick={onClose}>{text.brand}</a><button aria-label={text.closeLabel} onClick={onClose}><span>×</span></button></div>
 <article id="article-content">{title&&<div className="article-body"><p className="eyebrow">0{i+1} {stage.title} / {stage.en}</p><h1 id="article-title">{title}</h1><p className="article-date">{text.typeLine}<br />{text.dateLine}</p><p className="article-lead">{stage.intro}</p><h2>{text.stepsTitle}</h2><ul>{details[title].map(item=><li key={item}>{item}</li>)}</ul><div className="experience-blank"><p className="eyebrow">{text.experienceEyebrow}</p><h2>{text.experienceTitle}</h2><p>{text.experienceDescription}</p>{text.experienceFields.map(label=><div className="blank-row" key={label}>{label}　＿＿＿＿＿＿</div>)}</div><h2>{text.sourcesTitle}</h2><p><a className="external" href={source[1]} target="_blank" rel="noopener noreferrer">{source[0]} ↗</a></p><p className="source-note">{text.sourceNote}</p><button className="next-article" onClick={()=>onArticle(next)}><span>{text.nextLabel} · 0{nextI+1} {stages[nextI].title}<br />{stages[nextI].topics[nextJ]}</span><span>↗</span></button></div>}</article>
 </dialog>;
}
