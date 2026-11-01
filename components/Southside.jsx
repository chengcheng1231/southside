'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import Hero from './Hero';
import FormattedText from './FormattedText';
import Feedback from './Feedback';
import Journey from './Journey';
import ArticleDialog from './ArticleDialog';
export default function Southside({about}) {
  const [articleId, setArticleId] = useState(null);
  const openArticle = (id) => setArticleId(id);
  const closeArticle = () => setArticleId(null);
  return (
    <>
      <a className="skip" href="#journey">
        跳到旅程指南
      </a>
      <Navigation />
      <main>
        <Hero />
        <section id="about" className="about-intro section-wrap" aria-labelledby="about-title">
          <div className="about-intro-heading">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 id="about-title">{about.title}</h2>
          </div>
          <div className="about-copy">
            <p className="about-text"><FormattedText text={about.text.trim()} /></p>
          </div>
        </section>
        <Journey onArticle={openArticle} />
        <section id="notes" className="notes section-wrap" aria-labelledby="notes-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 — EXPERIENCES</p>
              <h2 id="notes-title">經驗分享</h2>
            </div>
          <div className="notes-heading-actions">
            <Link className="button dark" href="/contact?topic=submission">投稿／分享經驗 ＋</Link>
          <p className="demo-caption">目前文章為版型示例。投稿請填寫表單，確認內容與刊登同意後再上架。</p></div>
          </div>
          <div className="editorial-grid">
            <Link className="story story-feature" href="/stories/first-accommodation">
              <div className="story-image">
                <img src="/journey.jpg" alt="日光下的戶外旅行風景" loading="lazy" />
                <span className="photo-label">BEFORE YOU GO</span>
                <span className="round-arrow">↗</span>
              </div>
              <div className="story-meta">
                <span>01 出發前</span>
                <span>準備指南</span>
              </div>
              <h3>
                初期住宿：
                <br />
                預算、地點與入住準備
              </h3>
              <p>比較住宿條件，確認交通、入住方式與取消規則。</p>
              <span className="read-link">閱讀住宿準備指南 ↗</span>
            </Link>
            <div className="story-side">
              <Link className="story" href="/stories/rental-preparation">
                <div className="story-image">
                  <img src="/home.jpg" alt="明亮住宅的日常角落" loading="lazy" />
                  <span className="round-arrow">↗</span>
                </div>
                <div className="story-meta">
                  <span>03 安頓</span>
                  <span>租屋指南</span>
                </div>
                <h3>
                  找房與租屋：
                  <br />
                  需求、看房與合約
                </h3>
              </Link>
              <Link className="story story-text" href="/stories/job-preparation">
                <div className="story-meta">
                  <span>04 工作</span>
                  <span>工作指南</span>
                </div>
                <h3>
                  找工作：
                  <br />
                  履歷準備與投遞方式
                </h3>
                <p>從整理經歷、準備履歷，到選擇投遞方式。</p>
                <span className="read-link">查看工作指南 ↗</span>
              </Link>
            </div>
          </div>

        </section>
        {/* 常見問題暫時隱藏，內容保留於 content/faq.json。 */}

      </main>
      <footer className="footer section-wrap">
        <div className="footer-top">
          <a className="brand footer-brand" href="#">
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

          <a href="#">回到頂端 ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Southside · Australia</span>
          <span>經驗有時間背景；簽證、稅務及權益資訊，請以官方最新公告為準。</span>
        </div>
      </footer>
      <Feedback />
<ArticleDialog articleId={articleId} onClose={closeArticle} onArticle={openArticle} />
    </>
  );
}
