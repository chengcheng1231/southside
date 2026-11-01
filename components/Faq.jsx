import questions from '../content/faq.json';
export default function Faq(){
 return <section id="faq" className="faq section-wrap" aria-labelledby="faq-title">
  <div className="section-heading"><div><p className="eyebrow">03 — FAQ</p><h2 id="faq-title">常見問題</h2></div></div>
  <div className="faq-list">{questions.map(item=><details className="faq-item" key={item.question}><summary>{item.question}<span className="faq-toggle" aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
 </section>;
}
