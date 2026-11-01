import {checkFeedbackRateLimit} from '../../../lib/feedback-rate-limit.mjs';
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request){
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'無法接受此來源的請求。'},{status:403});
 let data;try{const raw=await request.text();if(raw.length>24000)return Response.json({error:'回饋內容過長。'},{status:413});data=JSON.parse(raw);}catch{return Response.json({error:'無效的表單資料。'},{status:400});}
 if(!data||typeof data!=='object'||Array.isArray(data))return Response.json({error:'無效的表單資料。'},{status:400});
 if(data.website)return Response.json({error:'無法送出，請重新填寫。'},{status:400});
 const {name='',email='',message,topic='網站建議',city='',year='',consent=false}=data;
 if(!['經驗投稿','資訊更正','網站建議','操作問題','其他'].includes(topic)||typeof city!=='string'||city.length>80||typeof year!=='string'||year&&!/^\d{4}$/.test(year)||typeof consent!=='boolean'||topic==='經驗投稿'&&(!email||typeof email!=='string'||!EMAIL.test(email)))return Response.json({error:'請確認投稿類型、年份與聯絡 Email。'},{status:400});
 if(typeof name!=='string'||!name.trim()||name.length>80||typeof email!=='string'||email.length>254||email&& !EMAIL.test(email)||typeof message!=='string'||message.trim().length<5||message.length>5000)return Response.json({error:'請確認回饋內容至少 5 字，且 Email 格式正確。'},{status:400});
 if(!process.env.RESEND_API_KEY||!process.env.FEEDBACK_FROM||!process.env.FEEDBACK_TO||!EMAIL.test(process.env.FEEDBACK_TO))return Response.json({error:'回饋寄信功能尚未設定完成，請稍後再試。'},{status:503});
 try{
  const limit=await checkFeedbackRateLimit();
  if(!limit.allowed)return Response.json({error:'目前寄送次數較多，請稍後再試。'},{status:429,headers:{'Retry-After':String(limit.retryAfter)}});
 }catch{return Response.json({error:'寄送功能暫時無法使用，請稍後再試。'},{status:503});}
 try{
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.FEEDBACK_FROM,to:[process.env.FEEDBACK_TO],...(email?{reply_to:email}:{}),subject:`Southside ${topic}`,text:`稱呼：${name.trim()||'未提供'}\nEmail：${email||'未提供'}\n\n類型：${topic}\n城市／地區：${topic==='經驗投稿'?city||'未提供':'不適用'}\n經驗年份：${topic==='經驗投稿'?year||'未提供':'不適用'}\n刊登同意：${topic==='經驗投稿'&&consent?'同意聯繫確認後刊登':'未授權刊登'}\n\n訊息內容：\n${message.trim()}`}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)return Response.json({error:'寄送失敗，請稍後再試。'},{status:502});
 return Response.json({success:true});
 }catch{return Response.json({error:'寄信服務暫時無法連線，請稍後再試。'},{status:502});}
}
