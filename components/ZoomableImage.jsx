"use client";

import {useRef} from 'react';

export default function ZoomableImage({image,inlineLabel}) {
 const dialog = useRef(null);
 const Wrapper=inlineLabel?'span':'figure';
 return <Wrapper className={inlineLabel?'guide-example-inline':'guide-example'}>
  {!inlineLabel&&<figcaption>{image.caption}</figcaption>}
  <button type="button" className={inlineLabel?'guide-image-text-link':'guide-example-preview'} aria-label={`${image.caption}，點擊放大`} onClick={()=>dialog.current.showModal()}>
   {inlineLabel||<img src={image.src} alt={image.alt} loading="lazy" />}
  </button>
  <dialog ref={dialog} className="guide-image-lightbox" aria-label={image.caption} onCancel={event=>{event.preventDefault();event.stopPropagation();dialog.current.close();}} onClick={event=>{event.stopPropagation();if(event.target===event.currentTarget)dialog.current.close();}}>
   <button type="button" className="guide-image-close" aria-label="關閉圖片" onClick={()=>dialog.current.close()}>×</button>
   <img src={image.src} alt={image.alt} />
  </dialog>
 </Wrapper>;
}
