import {readFile} from 'node:fs/promises';
import path from 'node:path';
import Southside from '../components/Southside';
import about from '../content/about.json';
export const dynamic='force-dynamic';
export default async function Page(){
 const aboutText=await readFile(path.join(process.cwd(),'content/about.txt'),'utf8');
 return <Southside about={{...about,text:aboutText}} />;
}
