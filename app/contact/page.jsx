import ContactForm from '../../components/ContactForm';
export const metadata={title:'回饋與投稿 — Southside'};
export default async function Page({searchParams}){const params=await searchParams;return <ContactForm initialTopic={params.topic==='submission'?'經驗投稿':'網站建議'}/>;}
