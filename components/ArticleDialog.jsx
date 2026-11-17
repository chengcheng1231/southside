"use client";
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {findGuideArticle,nextGuideArticle,previousGuideArticle,guideGroupLabel} from '../lib/guides';
import journey from '../content/journey.json';
import updates from '../content/journey-updates.json';
import GuideAuthor from './GuideAuthor';
import GuideArticleIntro from './GuideArticleIntro';
import GuideTimeline from './GuideTimeline';
import FormattedText from './FormattedText';
import GuideArticleSection from './GuideArticleSection';
const text=journey.article;
const siteTitle='Southside — 澳洲生活資訊與經驗分享';
export default function ArticleDialog({articleId,onClose,onArticle,historyVersion=0}){
 const dialog=useRef(null);
 const [history,setHistory]=useState([]);
 const returnScroll=useRef(null);
 const previousHistoryVersion=useRef(historyVersion);
 const article=findGuideArticle(articleId);
 const stage=article?.stage,topic=article?.topic,title=topic?.title;
 const source=topic?.source;
 const next=nextGuideArticle(articleId);
 const preceding=previousGuideArticle(articleId);

 const isOpen=!!article;
 const previous=history.at(-1);
 const showPrevious=!!(previous||preceding);
 const showNext=!!next;
 function navigateArticle(id){
  if(id===articleId||!findGuideArticle(id))return;
  setHistory(entries=>[...entries,{id:articleId,title,scrollTop:dialog.current?.scrollTop||0}]);
  returnScroll.current=0;
  onArticle(id);
 }
 function returnToArticle(){
  if(!previous)return;
  returnScroll.current=previous.scrollTop;
  setHistory(entries=>entries.slice(0,-1));
  onArticle(previous.id);
 }
 useEffect(()=>{
  const el=dialog.current;if(!isOpen){setHistory([]);returnScroll.current=null;return;}
  const previousOverflow=document.body.style.overflow;
  if(!el.open)el.showModal();document.body.style.overflow='hidden';
  return ()=>{if(el.open)el.close();document.body.style.overflow=previousOverflow;};
 },[isOpen]);
 useEffect(()=>{document.title=title?`${title} — Southside`:siteTitle;return ()=>{document.title=siteTitle;};},[title]);
 useLayoutEffect(()=>{
  if(previousHistoryVersion.current!==historyVersion){
   previousHistoryVersion.current=historyVersion;
   setHistory([]);
   returnScroll.current=0;
  }
  if(!isOpen||!dialog.current)return;
  dialog.current.scrollTop=returnScroll.current??0;
  returnScroll.current=null;
 },[articleId,isOpen,historyVersion]);
 return <dialog ref={dialog} id="article-dialog" aria-labelledby="article-title" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}>
 <div className="article-toolbar">
  <nav className={`article-pagination${showPrevious?'':' article-pagination-next-only'}${showNext?'':' article-pagination-previous-only'}`} aria-label="文章導覽">
   {showPrevious&&<button type="button" disabled={!preceding} title={previous?.title||preceding?.topic.title} onClick={()=>previous?returnToArticle():navigateArticle(preceding.id)}><small>← 上一篇</small><strong>{previous?.title||preceding?.topic.title}</strong></button>}
   {showNext&&<button type="button" disabled={!next} title={next?.topic.title} onClick={()=>navigateArticle(next.id)}><small>下一篇 →</small><strong>{next?.topic.title}</strong></button>}
  </nav>
  <button type="button" aria-label={text.closeLabel} onClick={onClose}><span>×</span></button>
 </div>
 <article id="article-content">{title&&<div className="article-body"><p className="eyebrow">{guideGroupLabel(stage)} / {stage.en}</p><h1 id="article-title">{title}</h1><GuideAuthor key={articleId} author={topic.author} updatedAt={updates[articleId]?.updatedAt} /><GuideArticleIntro paragraphs={topic.introParagraphs??[topic.intro??stage.intro].filter(Boolean)} onArticle={navigateArticle}/>{topic.timeline?<GuideTimeline key={articleId} topic={topic} onArticle={navigateArticle}/>:topic.sections?<>{topic.sections.map(section=><GuideArticleSection key={section.title||section.intro} section={section} onArticle={navigateArticle}/>)}</>:<><h2>{topic.stepsTitle||text.stepsTitle}</h2><ul>{topic.details.map(item=><li key={item}><FormattedText text={item} onArticle={navigateArticle}/></li>)}</ul></>}<h2>{text.sourcesTitle}</h2>{(topic.references||[source]).map(ref=><p key={ref.url}><a className="external" href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label} ↗</a></p>)}<p className="source-note">{text.sourceNote}</p>{showNext&&<button className="next-article" onClick={()=>navigateArticle(next.id)}><span>{text.nextLabel} · {guideGroupLabel(next.stage)}<br />{next.topic.title}</span><span>↗</span></button>}</div>}</article>
 </dialog>;
}
