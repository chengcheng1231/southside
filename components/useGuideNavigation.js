"use client";
import {useEffect,useRef,useState} from 'react';
import {findGuideArticle,guideArticleHash,guideArticleIdFromHash} from '../lib/guides';

export default function useGuideNavigation(){
 const [articleId,setArticleId]=useState(null);
 const [historyVersion,setHistoryVersion]=useState(0);
 const returnHash=useRef(null);
 useEffect(()=>{
  function syncFromUrl(){
   const id=guideArticleIdFromHash(window.location.hash);
   if(!id)returnHash.current=window.location.hash;
   setArticleId(id);
   setHistoryVersion(version=>version+1);
  }
  syncFromUrl();
  window.addEventListener('hashchange',syncFromUrl);
  window.addEventListener('popstate',syncFromUrl);
  return ()=>{
   window.removeEventListener('hashchange',syncFromUrl);
   window.removeEventListener('popstate',syncFromUrl);
  };
 },[]);
 function openArticle(id){
  const hash=guideArticleHash(id);
  if(!hash)return;
  if(!guideArticleIdFromHash(window.location.hash))returnHash.current=window.location.hash;
  if(window.location.hash!==hash){
   const url=new URL(window.location.href);url.hash=hash;
   window.history.pushState(null,'',url);
  }
  setArticleId(id);
 }
 function closeArticle(){
  const current=findGuideArticle(guideArticleIdFromHash(window.location.hash));
  const url=new URL(window.location.href);
  url.hash=returnHash.current??(current?.stage.kind==='topic'?'#housing-and-work':'#journey');
  window.history.replaceState(null,'',url);
  setArticleId(null);
 }
 return {articleId,openArticle,closeArticle,historyVersion};
}
