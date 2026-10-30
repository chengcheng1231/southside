const stages=[
 {title:'出發前',en:'BEFORE YOU GO',symbol:'↗',desc:'簽證、初期住宿、台幣轉帳、台灣電信',topics:['簽證申請','初期住宿','台幣轉帳','台灣電信'],intro:'先替出發留一點餘裕。從文件到落腳處，把需要準備的事慢慢整理好。'},
 {title:'剛落地',en:'FIRST DAYS',symbol:'⌁',desc:'SIM 電話、銀行帳戶、TFN 稅號',topics:['SIM 電話','銀行帳戶','TFN 稅號'],intro:'第一週不必把一切安排妥當。先整理通訊、金流與辦理事項，讓生活開始運轉。'},
 {title:'安頓',en:'MAKE IT HOME',symbol:'⌂',desc:'找房／租屋、Bond 押金',topics:['找房／租屋','Bond 押金'],intro:'從短暫落腳，到有一個可以回去的地方。先釐清需求，再一步步認識租屋流程。'},
 {title:'工作',en:'FIND YOUR WAY',symbol:'✳',desc:'找工作、印履歷、工作權益',topics:['找工作','印履歷','工作權益'],intro:'把過去的經歷整理成新的可能。從準備履歷開始，也替自己的權益留心。'},
 {title:'留澳',en:'STAY A LITTLE LONGER',symbol:'↟',desc:'二簽／三簽、集簽',topics:['二簽／三簽','集簽'],intro:'如果想多留一段時間，先了解適用條件，再安排自己的下一站。'},
 {title:'離開',en:'UNTIL NEXT TIME',symbol:'↙',desc:'退租、退稅、退休金、關閉必要服務',topics:['退租','退稅','處理退休金','關閉必要服務'],intro:'好好收尾，也是旅程的一部分。替住處、文件和各項服務，留一段整理的時間。'}
];
const details={
 '簽證申請':['把護照、個人資料與申請所需資料集中整理，並記錄文件效期。','從官方網站確認適用的簽證類別、申請條件與辦理入口。','此處保留你的申請時間線、遇到的問題與實際經驗。'],
 '初期住宿':['先列出預算、交通、入住時間與行李寄放等需求。','確認取消條件、入住方式與從機場抵達住宿的路線。','替看房與熟悉城市保留彈性，避免第一週排得太滿。'],
 '台幣轉帳':['先比較自己的銀行及匯款服務，記錄匯率、手續費與預估到帳時間。','確認收款資料與服務條件，並保留交易紀錄。','此處可補上你實際使用的方式與當時費用；報價請以服務商當下資訊為準。'],
 '台灣電信':['整理哪些銀行、登入與驗證服務仍使用台灣門號。','出發前詢問業者海外收簡訊、漫遊及合約方案。','確認方案變更的生效時間、費用及返台後的恢復方式。'],
 'SIM 電話':['先確認手機是否支援預計使用的 SIM 或 eSIM。','依常住地點、通話與流量需求比較方案及涵蓋資訊。','保留門號及帳戶登入方式，之後可能需要用於工作與銀行聯繫。'],
 '銀行帳戶':['到銀行官方網站確認開戶方式、身分文件與適用條件。','留意帳戶費用、地址與聯絡資料的填寫要求。','將實際開戶流程與遇到的問題記在下方，避免把個別經驗當成通則。'],
 'TFN 稅號':['由澳洲稅務局官方入口確認自己適用的申請方式。','提交前核對個人資料，保留申請紀錄。','妥善保存稅務資料，對分享身分與稅務資訊保持謹慎。'],
 '找房／租屋':['先寫下租金範圍、通勤、房型及生活習慣等需求。','看房時確認費用包含項目、居住人數、設備與合約條件。','入住前拍照記錄房況，保存合約、付款與溝通紀錄。'],
 'Bond 押金':['先確認所在地州或領地的租屋規定與押金主管機關。','了解合約中的押金安排，保留付款及登記相關證明。','入住與退租的房況紀錄，都整理在容易找到的位置。'],
 '找工作':['整理能工作的時間、地點、過往經驗與希望嘗試的職位。','依職位調整履歷，記錄投遞管道與後續聯絡。','在接受工作前，確認職務內容、薪資安排與雇用條件。'],
 '印履歷':['準備可閱讀的 PDF，先檢查聯絡資料與版面。','依投遞方式決定是否需要紙本，先少量列印檢查效果。','此處可填入你使用的列印地點、價格與投遞經驗。'],
 '工作權益':['到 Fair Work 官方網站查閱與自己工作情況相關的資訊。','保存雇用條件、工時、薪資單與相關對話紀錄。','遇到疑問時，先整理事實與文件，再尋找官方諮詢管道。'],
 '二簽／三簽':['從移民部官方網站確認適用的簽證條件與申請時點。','不要只依他人的工作經驗判斷自己的資格。','把規劃與文件整理分開記錄，申請前重新確認官方資訊。'],
 '集簽':['先到官方網站確認適用簽證對工作類別、地區與證明的要求。','選工作前核對資訊，保留實際工作與付款紀錄。','此處留給你的工作地點、時間線與親身經驗，尚未填寫。'],
 '退租':['依合約與所在地規定確認通知方式與期限。','整理房況、清潔、鑰匙交接及押金相關紀錄。','保留退租後可聯繫的方式，追蹤未完成事項。'],
 '退稅':['先整理薪資、收入及相關稅務文件。','到澳洲稅務局確認適用的報稅安排；是否有退稅須視個人情況。','離境後仍要能接收相關通知，妥善保存必要紀錄。'],
 '處理退休金':['整理退休金帳戶與可用的登入資料。','由澳洲稅務局確認離澳退休金申請的適用資格、條件與流程。','離境與簽證狀態等可能影響申請，請依官方資料判斷。'],
 '關閉必要服務':['列出銀行、手機、網路、保險與各項訂閱及自動扣款。','先確認退款、稅務或其他款項的接收安排，再決定何時關閉帳戶。','向各服務商確認取消程序，保留結清或取消證明。']
};
const official={visa:['澳洲內政部／簽證資訊','https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder'],tax:['澳洲稅務局 ATO','https://www.ato.gov.au/'],work:['Fair Work Ombudsman','https://www.fairwork.gov.au/'],rent:['澳洲政府／州及領地政府入口','https://www.australia.gov.au/'],general:['澳洲政府資訊入口','https://www.australia.gov.au/']};
const sourceFor=(i,j)=>i===4||(i===0&&j===0)?official.visa:i===1&&j===2||i===5&&(j===1||j===2)?official.tax:i===3&&j===2?official.work:i===2||i===5&&j===0?official.rent:official.general;
const grid=document.querySelector('#stage-grid'),panel=document.querySelector('#guide-panel'),dialog=document.querySelector('#article-dialog');
grid.innerHTML=stages.map((s,i)=>`<button class="stage" data-stage="${i}" aria-expanded="false" aria-controls="guide-panel"><div class="stage-top"><span class="stage-number">0${i+1}</span><span class="stage-symbol" aria-hidden="true">${s.symbol}</span></div><h3>${s.title}<small>${s.en}</small></h3><p>${s.desc}</p><span class="stage-arrow" aria-hidden="true">↗</span></button>`).join('');
function openStage(i){const s=stages[i];document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-expanded',String(Number(b.dataset.stage)===i)));document.querySelector('#panel-label').textContent=`0${i+1} — ${s.en}`;document.querySelector('#panel-title').textContent=s.title;document.querySelector('#panel-articles').innerHTML=s.topics.map((t,j)=>`<button class="article-link" data-article="${i}-${j}"><span>${t}<small>準備筆記 · 個人經驗待補</small></span><span aria-hidden="true">↗</span></button>`).join('');panel.hidden=false;panel.scrollIntoView({behavior:'smooth',block:'nearest'});}
document.querySelector('#close-panel').onclick=()=>{const active=grid.querySelector('[aria-expanded=true]');panel.hidden=true;grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-expanded','false'));active?.focus();};
let articleOpener;
function openArticle(id){const [i,j]=id.split('-').map(Number),s=stages[i];if(!s||!s.topics[j])return;const title=s.topics[j],src=sourceFor(i,j),next=j+1<s.topics.length?`${i}-${j+1}`:i<5?`${i+1}-0`:'0-0',ni=Number(next.split('-')[0]),nj=Number(next.split('-')[1]);if(!dialog.open)articleOpener=document.activeElement;document.querySelector('#article-content').innerHTML=`<div class="article-body"><p class="eyebrow">0${i+1} ${s.title} / ${s.en}</p><h1 id="article-title">${title}</h1><p class="article-date">內容類型：準備方向／版型初稿<br>個人經驗年份：待填寫 · 資料查證日期：待補</p><p class="article-lead">${s.intro}</p><h2>先從這幾件事開始</h2><ul>${details[title].map(t=>`<li>${t}</li>`).join('')}</ul><div class="experience-blank"><p class="eyebrow">YOUR OWN FIELD NOTES</p><h2>這裡，留給你的親身經驗。</h2><p>以下欄位尚未填寫，供作者後續補上自己的故事。</p><div class="blank-row">當時的年份、城市與背景　＿＿＿＿＿＿</div><div class="blank-row">我是怎麼做的　＿＿＿＿＿＿</div><div class="blank-row">遇到的問題與實際花費　＿＿＿＿＿＿</div><div class="blank-row">如果再來一次，我會……　＿＿＿＿＿＿</div></div><h2>繼續查找資訊</h2><p><a class="external" href="${src[1]}" target="_blank" rel="noopener noreferrer">${src[0]} ↗</a></p><p class="source-note">本頁為待完善的內容初稿，尚未串接爬蟲或完成逐項查證。官方連結為查詢起點；簽證、稅務、租屋與工作規定，請依所在地及個人情況查閱官方最新資訊。個人經驗與來源資料將分別標示。</p><button class="next-article" data-article="${next}"><span>下一篇 · 0${ni+1} ${stages[ni].title}<br>${stages[ni].topics[nj]}</span><span>↗</span></button></div>`;if(!dialog.open){dialog.showModal();document.body.style.overflow='hidden';}dialog.scrollTop=0;document.title=`${title} — 南行 SOUTHBOUND`;}
document.addEventListener('click',e=>{const stage=e.target.closest('[data-stage]');if(stage)openStage(Number(stage.dataset.stage));const article=e.target.closest('[data-article]');if(article)openArticle(article.dataset.article);});
document.querySelector('#close-article').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.style.overflow='';document.title='南行 SOUTHBOUND — 澳洲生活手記';articleOpener?.focus();});
const menu=document.querySelector('.menu-button'),mobileNav=document.querySelector('#mobile-nav');menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;};mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');}));
