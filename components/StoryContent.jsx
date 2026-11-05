import ZoomableImage from './ZoomableImage';

function StoryPhotos({images=[]}) {
 return images.filter(image=>image.src).map(image=><ZoomableImage key={image.src} image={image}/>);
}

export default function StoryContent({story,preview=false}){
 return <article className="community-article">
  <p className="eyebrow">{story.category||'未選分類'} / {preview?'DRAFT PREVIEW':'EXPERIENCES'}</p>
  <h1>{story.title||'未命名草稿'}</h1>
  <div className="community-byline">
   <span>{story.author||'分享者待補'}</span>
   <span>{story.city||'地點待補'}</span>
   <span>經驗年份：{story.year||'待補'}</span>
   {story.publishedAt&&<time dateTime={story.publishedAt}>發布：{story.publishedAt.replaceAll('-','/')}</time>}
  </div>
  {story.sample&&<p className="community-notice">版型示例，非真實投稿。</p>}
  {preview&&<p className="community-notice">草稿預覽，尚未公開。</p>}
  {story.cover&&<img className="article-cover" src={story.cover} alt={story.coverAlt||story.title||'文章封面'} />}
  <div className="story-prose">
   {story.intro&&<p>{story.intro}</p>}
   <StoryPhotos images={story.images}/>
   {story.sections?story.sections.map(section=><section key={section.title}>
    <h2>{section.title}</h2>
    {section.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
    <StoryPhotos images={section.images}/>
    {section.links?.map(link=><p className="story-source" key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a></p>)}
   </section>):(story.body||'內容待補').split(/\n\s*\n/).map((paragraph,i)=><p key={i}>{paragraph}</p>)}
  </div>
  {story.link&&<p className="story-source"><a href={story.link} target="_blank" rel="noopener noreferrer">相關連結 ↗</a></p>}
 </article>;
}
