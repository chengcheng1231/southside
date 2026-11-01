function elapsedSince(start,date) {
 const days=Math.round((Date.parse(`${date}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/86400000);
 if(!Number.isFinite(days)||days<0)return '';
 if(days===0)return '申請當天';
 const weeks=Math.floor(days/7),remaining=days%7;
 return `申請後 ${[weeks&&`${weeks} 週`,remaining&&`${remaining} 天`].filter(Boolean).join(' ')}`;
}

export default function PersonalTimeline({timeline}) {
 const start=timeline.events[0]?.date;
 const end=timeline.events.at(-1)?.date;
 const totalDays=Math.round((Date.parse(`${end}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/86400000);
 const totalDuration=elapsedSince(start,end).replace('申請後 ','');
 return <section className="personal-timeline" aria-label={timeline.title}>
  <h2>{timeline.title}</h2>
  {Number.isFinite(totalDays)&&totalDays>0?<p className="personal-timeline-total">我的申請從送件到核准共 <strong>{totalDays} 天（{totalDuration}）</strong>，審理時間因人而異。</p>:<p className="personal-timeline-note">{timeline.note}</p>}
  <ol>{timeline.events.map(event=><li key={event.date}>
   <time dateTime={event.date}>{event.date.replaceAll('-', '/')}</time>
   <div><span>{event.label}</span></div>
  </li>)}</ol>
 </section>;
}
