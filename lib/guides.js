import journey from '../content/journey.json';
export const {stages}=journey;
export const preparationStages=stages.filter(stage=>stage.kind!=='topic');
export const commonTopics=stages.filter(stage=>stage.kind==='topic');
export function guideGroupLabel(stage){
 return stage.kind==='topic'?`常用主題 · ${stage.title}`:`${String(preparationStages.findIndex(item=>item.id===stage.id)+1).padStart(2,'0')} ${stage.title}`;
}
export const guideArticles=stages.flatMap((stage,stageIndex)=>stage.topics.map((topic,topicIndex)=>({
 id:`${stage.id}/${topic.id}`,stage,topic,stageIndex,topicIndex
})));
export function findGuideArticle(id){return guideArticles.find(article=>article.id===id);}
function adjacentGuideArticle(id,offset){
 const current=findGuideArticle(id);
 if(!current)return null;
 const related=guideArticles.filter(article=>current.stage.kind==='topic'?article.stage.id===current.stage.id:article.stage.kind!=='topic');
 const index=related.findIndex(article=>article.id===id);
 return related[(index+offset+related.length)%related.length];
}

export function nextGuideArticle(id){return adjacentGuideArticle(id,1);}
export function previousGuideArticle(id){return adjacentGuideArticle(id,-1);}

export function guideArticleHash(id){
 return findGuideArticle(id)?`#guide/${id.split('/').map(encodeURIComponent).join('/')}`:null;
}
export function guideArticleIdFromHash(hash){
 if(!hash.startsWith('#guide/'))return null;
 try{
  const id=decodeURIComponent(hash.slice(7));
  return findGuideArticle(id)?id:null;
 }catch{return null;}
}
