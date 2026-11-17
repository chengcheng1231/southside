import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const source=JSON.stringify(JSON.parse(fs.readFileSync(path.join(root,'content/journey.json'),'utf8')));
const referenced=[...new Set(source.match(/\/examples\/[A-Za-z0-9_.-]+/g)||[])];
const available=referenced.filter(src=>fs.existsSync(path.join(root,'public',src)));
fs.writeFileSync(path.join(root,'content/guide-assets.json'),JSON.stringify(available,null,2)+'\n');
