import ContactForm from '../../components/ContactForm';
export const metadata = { title: '回饋與投稿 — Southside' };
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const emailOnly =
    process.env.NODE_ENV === 'production' &&
    !(
      process.env.RESEND_API_KEY &&
      process.env.FEEDBACK_FROM &&
      process.env.FEEDBACK_TO
    );
  return <ContactForm emailOnly={emailOnly} initialTopic={params.topic === 'submission' ? '經驗投稿' : '網站建議'} />;
}
