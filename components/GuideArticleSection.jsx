import FormattedText from './FormattedText';
import GuideTimeline from './GuideTimeline';
import ZoomableImage from './ZoomableImage';

export default function GuideArticleSection({section,onArticle,level=2}) {
 const Heading=`h${Math.min(level,6)}`;
 return <section className={[level===3?'guide-article-bank-block':'',section.layout==='bank-directory'?'guide-bank-directory':'',section.layout==='note'?'guide-article-note':'',section.layout==='bullet'?'guide-article-bullet':''].filter(Boolean).join(' ')||undefined}>
  {section.title&&<Heading>{section.title}</Heading>}
  {(section.introParagraphs??[section.intro].filter(Boolean)).map((paragraph,index)=><p className="guide-section-intro" key={index}><FormattedText text={paragraph} onArticle={onArticle}/></p>)}
  {section.timeline?<GuideTimeline topic={section} onArticle={onArticle}/>:section.items?.length>0&&<ul>{section.items.map(item=><li key={item}><FormattedText text={item} onArticle={onArticle}/></li>)}</ul>}
  {section.orderedItems?.length>0&&<ol>{section.orderedItems.map(item=><li key={item}><FormattedText text={item} onArticle={onArticle}/></li>)}</ol>}
  {section.afterword&&<p><FormattedText text={section.afterword} onArticle={onArticle}/></p>}
  {section.image&&<ZoomableImage key={section.image.src} image={section.image}/>}
  {section.links?.length>0&&(section.linksStyle==='bank-directory'?<nav className="bank-directory-links" aria-label="澳幣現鈔兌換銀行查詢">{section.links.map(link=><a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"><span>{link.label}</span><span aria-hidden="true">↗</span></a>)}</nav>:<nav className="article-related-links" aria-label="相關文章">{section.links.map(link=><FormattedText key={link.url} text={`[${link.label}](${link.url})`} onArticle={onArticle}/>)}</nav>)}
  {section.blocks?.map(block=><GuideArticleSection key={block.title} section={block} onArticle={onArticle} level={level+1}/>)}
 </section>;
}
