'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
const topics = ['經驗投稿', '資訊更正', '網站建議', '操作問題', '其他'];
export default function ContactForm({ initialTopic = '網站建議' }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      website: '',
      topic: initialTopic,
      city: '',
      year: '',
      consent: false,
    },
  });
  const isStory = watch('topic') === '經驗投稿';
  async function submit(values) {
    clearErrors('root');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '送出失敗，請稍後再試。');
      setSent(true);
      reset();
    } catch (error) {
      setError('root', { message: error.message || '連線失敗，請稍後再試。' });
    }
  }
  return (
    <main className="contact-page">
      <Link className="contact-close" href="/" aria-label="返回首頁">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 5 14 14M19 5 5 19" />
        </svg>
      </Link>
      <div className="contact-layout">
        <aside className="contact-intro">
          <p className="eyebrow">SOUTHSIDE / COMMUNITY</p>
          <h1 id="feedback-title">
            Let's talk.
            <br />
            <span>投稿與回饋</span>
          </h1>
          
          <p>透過表單告訴我們。投稿會在確認內容與刊登同意後整理上架；一般回饋不會公開。</p>
          <div className="contact-intro-bottom">
            <svg viewBox="0 0 64 52" fill="none" aria-hidden="true">
              <rect x="5" y="7" width="54" height="38" rx="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="m9 12 23 18 23-18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>
              AUSTRALIA WORKING HOLIDAY
              <br />
              EXPERIENCES & IDEAS
            </span>
          </div>
        </aside>
        <div className="contact-form-pane">
          {sent ? (
            <div className="contact-success" role="status">
              <p className="eyebrow">MESSAGE SENT</p>
              <h3>已收到你的訊息。</h3>
              <p>感謝你的分享與建議。投稿不會自動公開，後續將透過 Email 聯繫。</p>
              <Link className="contact-submit" href="/">
                返回首頁 <span>↗</span>
              </Link>
            </div>
          ) : (
            <form className="feedback-form contact-form" onSubmit={handleSubmit(submit)} noValidate>
              <fieldset>
                <legend>聯絡資訊</legend>
                <div className="contact-fields">
                  <label>
                    <span>稱呼／公開署名 *</span>
                    <input
                      placeholder="怎麼稱呼你？"
                      autoComplete="name"
                      maxLength={80}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      {...register('name', {
                        validate: (v) => !!v.trim() || '請填寫稱呼。',
                        maxLength: { value: 80, message: '稱呼請在 80 字以內。' },
                      })}
                    />
                    {errors.name && (
                      <em id="contact-name-error" role="alert">
                        {errors.name.message}
                      </em>
                    )}
                  </label>
                  <label>
                    <span>Email{isStory ? ' *' : '（選填）'}</span>
                    <input
                      placeholder="方便後續聯絡的 Email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      {...register('email', {
                        validate: (v) =>
                          (!v && !isStory) ||
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                          '請填寫有效的 Email，投稿需要聯絡地址。',
                      })}
                    />
                    {errors.email && (
                      <em id="contact-email-error" role="alert">
                        {errors.email.message}
                      </em>
                    )}
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>想分享什麼？或是問題</legend>
                <div className="contact-topics">
                  {topics.map((topic) => (
                    <label key={topic}>
                      <input type="radio" value={topic} {...register('topic')} />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {isStory && (
                <fieldset>
                  <legend>經驗背景</legend>
                  <div className="contact-fields">
                    <label>
                      <span>城市／地區（選填）</span>
                      <input placeholder="例如 Melbourne" maxLength={80} {...register('city', { maxLength: 80 })} />
                    </label>
                    <label>
                      <span>經驗年份（選填）</span>
                      <input
                        placeholder="例如 2026"
                        inputMode="numeric"
                        maxLength={4}
                        aria-invalid={!!errors.year}
                        {...register('year', { validate: (v) => !v || /^\d{4}$/.test(v) || '請填寫四位數年份。' })}
                      />
                      {errors.year && <em role="alert">{errors.year.message}</em>}
                    </label>
                  </div>
                </fieldset>
              )}
              <label className="contact-message">
                <span>{isStory ? '分享內容' : '訊息內容'} *</span>
                <textarea
                  rows={6}
                  placeholder={
                    isStory
                      ? '當時的情況、實際做法、遇到的問題，以及給其他人的建議……'
                      : '請描述你的建議或問題；若是資訊更正，也請附上文章名稱或參考連結。'
                  }
                  maxLength={5000}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  {...register('message', {
                    validate: (v) => v.trim().length >= 5 || '請至少填寫 5 個字。',
                    maxLength: { value: 5000, message: '內容請在 5000 字以內。' },
                  })}
                />
                {errors.message && (
                  <em id="contact-message-error" role="alert">
                    {errors.message.message}
                  </em>
                )}
              </label>
              {isStory && (
                <label className="contact-consent">
                  <input type="checkbox" {...register('consent')} />
                  <span>同意 Southside 聯絡我，確認內容及署名後整理刊登。未勾選時，內容僅作為交流，不授權刊登。</span>
                </label>
              )}
              <div className="feedback-honeypot" aria-hidden="true">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" {...register('website')} />
                </label>
              </div>
              <div className="contact-form-bottom">
                <p>
                  Email 僅用於聯繫，不會公開。
                  <br />
                  訊息將寄至 Southside 管理者信箱。
                </p>
                <button className="contact-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '送出中…' : '送出訊息'}
                  <span>↗</span>
                </button>
              </div>
              {errors.root && (
                <p className="contact-error" role="alert">
                  {errors.root.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
