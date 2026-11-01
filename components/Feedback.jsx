import Link from 'next/link';
import './contact-simple.css';
export default function Feedback(){
 return <Link href="/contact" className="feedback-pill" aria-label="投稿與回饋">
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6l-5 3v-3a4 4 0 0 1-3-4V8a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  <span>投稿與回饋</span><span className="feedback-pill-arrow" aria-hidden="true">↗</span>
 </Link>;
}
