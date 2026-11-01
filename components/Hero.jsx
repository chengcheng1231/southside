'use client';
import { useState, useEffect } from 'react';
const slides = [
  {
    image: '/hero.jpg?v=52b2aef2ee',
    name: '雪梨港灣',
    position: 'center 55%',
    author: 'Halley Tian',
    profile: 'stia004',
    photo: 'a-large-body-of-water-with-a-large-building-in-the-middle-of-it-WuTb_rfLP9I',
  },
  {
    image: '/uluru.jpg',
    name: '烏魯魯',
    position: 'center 68%',
    author: 'Jason Ham',
    profile: 'planett',
    photo: 'grand-canyon-national-park-arizona-IKlpLl7HVo0',
  },
  {
    image: '/twelve-apostles.jpg',
    name: '十二門徒石',
    position: 'center 60%',
    author: 'Victor',
    profile: 'victor_g',
    photo: 'rock-formation-on-seashore-hM0jUUU5eDg',
  },
  {
    image: '/mel.jpg',
    name: '墨爾本',
    position: 'center 60%',
    author: 'cody gallo',
    profile: 'gallocody',
    photo: 'city-skyline-across-body-of-water-during-daytime-iB2tPmxUn1g',
  },
];
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(motion.matches || document.hidden);
    sync();
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(timer);
  }, [paused, active]);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`hero-slide${active === i ? ' is-active' : ''}`}
            style={{ backgroundImage: `url('${slide.image}')`, backgroundPosition: slide.position }}
          />
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow light">
          <span className="tiny-line" /> AUSTRALIA WORKING HOLIDAY EXPERIENCES
        </p>
        <h1 id="hero-title">台灣人的澳洲打工度假<br />生活經驗分享</h1>
      </div>
      <a className="hero-scroll" href="#about" aria-label="向下捲動至下一個區塊">
        <svg viewBox="0 0 32 40" fill="none" aria-hidden="true">
          <path
            d="M16 4v29M6 23l10 10 10-10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div className="hero-bottom">
        <span>VISA · ARRIVAL · HOUSING · WORK · EXTENSION · DEPARTURE</span>
        <div className="slide-controls" aria-label="橫幅圖片輪播">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              className={`slide-dot${active === i ? ' is-active' : ''}`}
              aria-label={`顯示${slide.name}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
      <p className="hero-credit">
        Photo by{' '}
        <a
          href={`https://unsplash.com/@${slides[active].profile}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {slides[active].author}
        </a>{' '}
        on{' '}
        <a
          href={`https://unsplash.com/photos/${slides[active].photo}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </p>
    </section>
  );
}
