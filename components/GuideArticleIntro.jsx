import FormattedText from './FormattedText';

export default function GuideArticleIntro({paragraphs=[],onArticle}) {
 if (!paragraphs.length) return null;
 return <div className="guide-article-intro">
  {paragraphs.map((paragraph,index)=><p key={index}><FormattedText text={paragraph} onArticle={onArticle}/></p>)}
 </div>;
}
