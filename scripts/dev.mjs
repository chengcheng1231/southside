import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {syncGuideUpdates} from './sync-guide-updates.mjs';
syncGuideUpdates();
const file='content/journey.json';
fs.watchFile(file,{interval:500},()=>{try{syncGuideUpdates();}catch{console.warn('journey.json 尚未完成儲存或格式有誤，暫不更新日期。');}});
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','8000'],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{fs.unwatchFile(file);child.kill(signal);});
child.on('exit',code=>{fs.unwatchFile(file);process.exitCode=code??0;});
