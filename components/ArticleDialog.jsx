"use client";
import {useEffect,useRef} from 'react';
import {findGuideArticle,nextGuideArticle} from '../lib/guides';
import journey from '../content/journey.json';
import updates from '../content/journey-updates.json';
import GuideAuthor from './GuideAuthor';
import GuideTimeline from './GuideTimeline';
const text=journey.article;
const siteTitle='Southside — 澳洲生活資訊與經驗分享';
export default function ArticleDialog({articleId,onClose,onArticle}){
 const dialog=useRef(null);
 const article=findGuideArticle(articleId);
 const stage=article?.stage,topic=article?.topic,title=topic?.title;
 const source=topic?.source;
 const i=article?.stageIndex;
 const next=nextGuideArticle(articleId);
 const isOpen=!!article;
 useEffect(()=>{
  const el=dialog.current;if(!isOpen)return;
  const previousOverflow=document.body.style.overflow;
  if(!el.open)el.showModal();document.body.style.overflow='hidden';
  return ()=>{if(el.open)el.close();document.body.style.overflow=previousOverflow;};
 },[isOpen]);
 useEffect(()=>{document.title=title?`${title} — Southside`:siteTitle;if(dialog.current)dialog.current.scrollTop=0;return ()=>{document.title=siteTitle;};},[title]);
 return <dialog ref={dialog} id="article-dialog" aria-labelledby="article-title" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}>
 <div className="article-toolbar"><a className="article-logo" href="#journey" onClick={onClose}>{text.brand}</a><button aria-label={text.closeLabel} onClick={onClose}><span>×</span></button></div>
 <article id="article-content">{title&&<div className="article-body"><p className="eyebrow">0{i+1} {stage.title} / {stage.en}</p><h1 id="article-title">{title}</h1><GuideAuthor key={articleId} author={topic.author} updatedAt={updates[articleId]?.updatedAt} /><p className="article-lead">{topic.intro||stage.intro}</p>{topic.timeline?<GuideTimeline topic={topic}/>:<><h2>{text.stepsTitle}</h2><ul>{topic.details.map(item=><li key={item}>{item}</li>)}</ul></>}{!topic.hideExperiencePlaceholder&&<div className="experience-blank"><p className="eyebrow">{text.experienceEyebrow}</p><h2>{text.experienceTitle}</h2><p>{text.experienceDescription}</p>{text.experienceFields.map(label=><div className="blank-row" key={label}>{label}　＿＿＿＿＿＿</div>)}</div>}<h2>{text.sourcesTitle}</h2>{(topic.references||[source]).map(ref=><p key={ref.url}><a className="external" href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label} ↗</a></p>)}<p className="source-note">{text.sourceNote}</p><button className="next-article" onClick={()=>onArticle(next.id)}><span>{text.nextLabel} · 0{next.stageIndex+1} {next.stage.title}<br />{next.topic.title}</span><span>↗</span></button></div>}</article>
 </dialog>;
}
