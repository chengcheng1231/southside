'use client';
import { useState, useEffect } from 'react';
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      setMenuOpen(false);
    };
    setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="#" aria-label="Southside 首頁">
          <span className="brand-mark">
            Southside
            <svg className="brand-sun" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M3 54C15 51 22 43 27 32C29 27 32 24 35 22L39 14C37 11 36 6 37 3C40 5 42 9 42 12L45 3C47 6 47 11 46 15L50 18L57 20C59 21 58 23 56 24L49 25L45 23L41 32L46 36L51 35C53 35 54 37 52 38L46 40C44 40 41 38 39 37L37 41C42 42 44 46 41 50L38 54L48 55C51 55 53 57 52 58H33C30 58 29 56 31 53L35 48C29 49 24 50 20 52C14 55 8 56 3 56C1 56 1 55 3 54Z"
              />
            </svg>
          </span>
          <span className="brand-sub">
            AUSTRALIA
            <br />
            GUIDES & COMMUNITY
          </span>
        </a>
        <nav className="desktop-nav" aria-label="主要導覽">
          <a href="#journey">
            旅程指南 <span>↗</span>
          </a>
          <a href="/#notes">經驗分享</a>
          
          <a href="#about">關於這裡</a>
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span>☰</span>
        </button>
      </header>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="手機導覽"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#journey">旅程指南</a>
        <a href="/#notes">經驗分享</a>
        
          <a href="#about">關於這裡</a>
      </nav>
    </>
  );
}
