import Link from 'next/link';
export default function FormattedText({text}){
 return text.split(/(`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\))/g).map((part,index)=>{
  if(part.startsWith('`')&&part.endsWith('`'))return <span className="about-highlight" key={index}>{part.slice(1,-1)}</span>;
  const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if(link&&/^\/(?!\/)/.test(link[2]))return <Link className="about-inline-link" href={link[2]} key={index}>{link[1]}</Link>;
  return part;
 });
}
