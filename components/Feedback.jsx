'use client';
import {useId} from 'react';
import Link from 'next/link';
export default function Feedback(){
 const ringId=useId();
 return <Link href="/contact" className="feedback-trigger contact-orb" aria-label="回饋與投稿">
  <svg className="contact-ring" viewBox="0 0 120 120" aria-hidden="true"><defs><path id={ringId} d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs><text><textPath href={`#${ringId}`} textLength="282.7" lengthAdjust="spacing">回饋與投稿 · FEEDBACK · SUBMISSIONS · </textPath></text></svg>
  <svg className="contact-envelope" viewBox="0 0 64 56" fill="none" aria-hidden="true"><path d="M15 7h34a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H29L15 52V43a8 8 0 0 1-8-8V15a8 8 0 0 1 8-8Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="25" r="2.5" fill="currentColor"/><circle cx="32" cy="25" r="2.5" fill="currentColor"/><circle cx="42" cy="25" r="2.5" fill="currentColor"/></svg>
 </Link>;
}
