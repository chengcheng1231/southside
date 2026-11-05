import Link from 'next/link';
import ZoomableImage from './ZoomableImage';
export default function FormattedText({text,images=[],onArticle}){
 return text.split(/(`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\))/g).map((part,index)=>{
  if(part.startsWith('`')&&part.endsWith('`'))return <span className="about-highlight" key={index}>{part.slice(1,-1)}</span>;
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link&&link[2].startsWith('#guide/')&&onArticle)return <a className="external" href={link[2]} key={index} onClick={event=>{event.preventDefault();onArticle(link[2].slice(7));}}>{link[1]}</a>;
  const image=link&&images.find(image=>image.src===link[2]);
  if(image)return <ZoomableImage key={index} image={image} inlineLabel={link[1]}/>;
  if(link&&/^\/(?!\/)/.test(link[2]))return <Link className="about-inline-link" href={link[2]} key={index}>{link[1]}</Link>;
  if(link&&/^https?:\/\//.test(link[2]))return <a className="external" href={link[2]} target="_blank" rel="noopener noreferrer" key={index}>{link[1]}</a>;
  return part;
 });
}
