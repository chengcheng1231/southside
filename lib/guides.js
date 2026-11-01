import journey from '../content/journey.json';
export const {stages}=journey;
export const guideArticles=stages.flatMap((stage,stageIndex)=>stage.topics.map((topic,topicIndex)=>({
 id:`${stage.id}/${topic.id}`,stage,topic,stageIndex,topicIndex
})));
export function findGuideArticle(id){return guideArticles.find(article=>article.id===id);}
export function nextGuideArticle(id){const index=guideArticles.findIndex(article=>article.id===id);return index<0?null:guideArticles[(index+1)%guideArticles.length];}
