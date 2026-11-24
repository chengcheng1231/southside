"use client";

import {useRef,useState} from 'react';
import availableGuideAssets from '../content/guide-assets.json';

export default function ZoomableImage({image,inlineLabel}) {
 const dialog = useRef(null);
 const [failed,setFailed]=useState(false);
 if(image.src.startsWith('/examples/')&&!availableGuideAssets.includes(image.src))return null;
 if(failed&&image.fallbackUrl)return <p className="guide-image-fallback">圖片暫時無法載入，可至<a className="external" href={image.fallbackUrl} target="_blank" rel="noopener noreferrer">官方頁面查看產季地圖 ↗</a>。</p>;
 const Wrapper=inlineLabel?'span':'figure';
 return <Wrapper className={inlineLabel?'guide-example-inline':`guide-example${image.wide?' guide-example-wide':''}`}>
  {!inlineLabel&&<figcaption>{image.caption}</figcaption>}
  <button type="button" className={inlineLabel?'guide-image-text-link':'guide-example-preview'} aria-label={`${image.caption}，點擊放大`} onClick={()=>dialog.current.showModal()}>
   {inlineLabel||<img src={image.src} alt={image.alt} loading="lazy" onError={()=>setFailed(true)} />}
  </button>
  <dialog ref={dialog} className="guide-image-lightbox" aria-label={image.caption} onCancel={event=>{event.preventDefault();event.stopPropagation();dialog.current.close();}} onClick={event=>{event.stopPropagation();if(event.target===event.currentTarget)dialog.current.close();}}>
   <button type="button" className="guide-image-close" aria-label="關閉圖片" onClick={()=>dialog.current.close()}>×</button>
   <img src={image.src} alt={image.alt} onError={()=>setFailed(true)} />
  </dialog>
 </Wrapper>;
}
