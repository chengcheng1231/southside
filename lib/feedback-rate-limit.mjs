// No form contents are stored. Production requires a shared counter.
const local=globalThis.__southsideFeedbackLimits??=new Map();
export async function checkFeedbackRateLimit(){
 const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
 if(url&&token){
  const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";
  const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',script,'1','southside:feedback:hour','3600']),signal:AbortSignal.timeout(5000),cache:'no-store'});
  if(!response.ok)throw new Error('Rate limit service unavailable');
  const data=await response.json();if(data.error||!Number.isInteger(data.result))throw new Error('Invalid counter response');
  return {allowed:data.result<=30,retryAfter:3600};
 }
 if(process.env.NODE_ENV==='production')throw new Error('Shared rate limit is required');
 const now=Date.now(),key='global';let entry=local.get(key);
 if(!entry||entry.until<=now){entry={count:0,until:now+60000};local.set(key,entry);}
 entry.count++;return {allowed:entry.count<=5,retryAfter:Math.max(1,Math.ceil((entry.until-now)/1000))};
}
