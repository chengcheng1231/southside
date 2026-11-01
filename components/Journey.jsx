'use client';
import { useState, useEffect, useRef } from 'react';
import { stages } from '../lib/guides';
import journey from '../content/journey.json';
export default function Journey({ onArticle }) {
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
    <section id="journey" className="journey section-wrap" aria-labelledby="journey-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{journey.eyebrow}</p>
          <h2 id="journey-title">{journey.title}</h2>
          <p className="heading-note journey-subtitle">{journey.subtitle}</p>
        </div>
      </div>
      <div className="stage-grid" id="stage-grid">
        {stages.map((s, i) => (
          <button
            key={s.title}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            className="stage"
            aria-expanded={active === i}
            aria-controls="guide-panel"
            onClick={() => setActive(i)}
          >
            <div className="stage-top">
              <span className="stage-number">0{i + 1}</span>
            </div>
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
      <div className="guide-panel" id="guide-panel" ref={panel} hidden={!stage}>
        {stage && (
          <>
            <div className="guide-panel-heading">
              <div>
                <p className="eyebrow">
                  0{active + 1} — {stage.en}
                </p>
                <h3>{stage.title}</h3>
              </div>
              <button className="text-button" aria-label={journey.collapseAriaLabel} onClick={close}>
                {journey.collapseLabel}
              </button>
            </div>
            <div className="panel-articles">
              {stage.topics.map((topic, j) => (
                <button key={topic} className="article-link" onClick={() => onArticle(`${active}-${j}`)}>
                  <span>
                    {topic}
                    <small>{journey.topicCaption}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
