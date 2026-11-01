import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
export function syncGuideUpdates(root=process.cwd(),now=new Date().toISOString()){
 const source=JSON.parse(fs.readFileSync(path.join(root,'content/journey.json'),'utf8'));
 const target=path.join(root,'content/journey-updates.json');
 const previous=fs.existsSync(target)?JSON.parse(fs.readFileSync(target,'utf8')):{};
 const next={};
 for(const stage of source.stages){for(const topic of stage.topics){
  const id=`${stage.id}/${topic.id}`;
  if(next[id])throw new Error('Duplicate article ID');
  const hash=createHash('sha256').update(JSON.stringify({intro:stage.intro,topic})).digest('hex');
  next[id]={hash,updatedAt:previous[id]?previous[id].hash===hash?previous[id].updatedAt:now:null};
 }}
 const serialized=JSON.stringify(next,null,2)+'\n';
 if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==serialized){fs.writeFileSync(target+'.tmp',serialized);fs.renameSync(target+'.tmp',target);}
 return next;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)syncGuideUpdates();
