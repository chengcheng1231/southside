'use client';
import { useState, useEffect, useRef } from 'react';
import { preparationStages, commonTopics, guideGroupLabel, guideArticleHash } from '../lib/guides';
import journey from '../content/journey.json';
export default function Journey({ onArticle }) {
  return <>
    <GuideCollection id="journey" stages={preparationStages} title={journey.title} eyebrow={journey.eyebrow} subtitle={journey.subtitle} onArticle={onArticle}/>
    <GuideCollection id="housing-and-work" stages={commonTopics} {...journey.common} onArticle={onArticle} common/>
  </>;
}
function GuideCollection({id,stages,title,eyebrow,subtitle,onArticle,common=false}) {
  const [active, setActive] = useState(null);
  const panel = useRef(null),
    buttons = useRef([]);
  useEffect(() => {
    if (active !== null)
      panel.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'nearest',
      });
  }, [active]);
  const stage = active === null ? null : stages[active];
  function close() {
    buttons.current[active]?.focus();
    setActive(null);
  }
  return (
    <section id={id} className={`journey section-wrap ${common?'common-topics':'preparation-flow'}`} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p className="heading-note journey-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="stage-grid">
        {stages.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            className="stage"
            aria-expanded={active === i}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(i)}
          >
            {!common&&<div className="stage-top">
              <span className="stage-number">0{i + 1}</span>
            </div>}
            <h3>
              {s.title}
              <small>{s.en}</small>
            </h3>
            <p>{s.desc}</p>
            <span className="stage-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="guide-panel" id={`${id}-panel`} ref={panel} hidden={!stage}>
        {stage && (
          <>
            <div className="guide-panel-heading">
              <div>
                <p className="eyebrow">
                  {common?'常用主題':guideGroupLabel(stage)} — {stage.en}
                </p>
                {common&&<h3>{stage.title}</h3>}
              </div>
              <button className="text-button" aria-label={journey.collapseAriaLabel} onClick={close}>
                {journey.collapseLabel}
              </button>
            </div>
            <div className="panel-articles">
              {stage.topics.map((topic) => topic.status!=='published' ? (
                <div key={topic.id} className="article-link article-link-pending" aria-disabled="true"><span>{topic.title}</span><span className="article-pending-label">待補</span></div>
              ) : (
                <a key={topic.id} className="article-link" href={guideArticleHash(`${stage.id}/${topic.id}`)} onClick={event => {if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();onArticle(`${stage.id}/${topic.id}`);}}>
                  <span>
                    {topic.title}
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
