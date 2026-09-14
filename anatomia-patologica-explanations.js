(function(){
'use strict';
const OPTIONAL_EXPLANATION_FILES=['data/anatomia-patologica-explanations-001.json','data/anatomia-patologica-explanations-002.json','data/anatomia-patologica-explanations-003.json','data/anatomia-patologica-explanations-004.json','data/anatomia-patologica-explanations-005.json','data/anatomia-patologica-explanations-006.json'];
const EXPECTED_ADVANCED=240;
const ADVANCED_EXPLANATIONS={};
let feedbackObserver=null;

function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}

function getOriginalQuestion(q){
  if(!q||typeof QUESTIONS==='undefined'||!Array.isArray(QUESTIONS))return null;
  return QUESTIONS.find(item=>String(item.id)===String(q.id))||null;
}

function advancedReason(entry,q,displayedOption){
  if(!entry||!Array.isArray(entry.reasons))return null;
  const original=getOriginalQuestion(q);
  if(!original||!Array.isArray(original.options))return null;
  const originalIndex=original.options.indexOf(displayedOption);
  if(originalIndex<0)return null;
  const reason=entry.reasons[originalIndex];
  return typeof reason==='string'&&reason.trim()?reason:null;
}

function validAdvancedEntry(entry,q){
  if(!entry||typeof entry.summary!=='string'||!entry.summary.trim())return false;
  const original=getOriginalQuestion(q);
  if(!original||!Array.isArray(original.options)||original.options.length!==4)return false;
  return original.options.every(opt=>advancedReason(entry,q,opt));
}

function injectStyles(){
  if(document.getElementById('anatomiaAdvancedStyles'))return;
  const style=document.createElement('style');
  style.id='anatomiaAdvancedStyles';
  style.textContent=`
    .advanced-reasons{display:grid;gap:9px;margin-top:12px}
    .advanced-reason{display:grid;gap:4px;padding:10px 12px;border-radius:13px;background:rgba(255,255,255,.58);border:1px solid rgba(100,110,114,.11)}
    .advanced-reason strong{letter-spacing:.03em}
    .advanced-reason.correct strong{color:#277d79}
    .advanced-reason.wrong strong{color:#a85d48}
    .advanced-reason span{color:#52656b}
    .advanced-title{margin-top:11px;font-weight:800}
  `;
  document.head.appendChild(style);
}

function ensureStatus(){
  let status=document.getElementById('advancedAnatomiaStatus');
  if(status)return status;
  const stats=document.querySelector('.panel .stats');
  if(!stats)return null;
  status=document.createElement('span');
  status.id='advancedAnatomiaStatus';
  status.textContent='Spiegazioni avanzate: caricamento…';
  const pool=document.getElementById('poolInfo');
  if(pool&&pool.parentNode===stats)pool.insertAdjacentElement('afterend',status);
  else stats.prepend(status);
  return status;
}

async function loadJson(path){
  const response=await fetch(path,{cache:'no-store'});
  if(!response.ok)throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function waitForBank(){
  for(let i=0;i<100;i++){
    if(typeof QUESTIONS!=='undefined'&&Array.isArray(QUESTIONS)&&QUESTIONS.length===300)return true;
    await new Promise(resolve=>setTimeout(resolve,50));
  }
  return false;
}

function enrichCurrentFeedback(){
  try{
    if(typeof session==='undefined'||typeof index==='undefined'||!Array.isArray(session)||!session.length)return;
    const q=session[index];
    if(!q||!q.checked)return;
    const feedback=document.getElementById('feedback');
    if(!feedback)return;
    const entry=ADVANCED_EXPLANATIONS[String(q.id)];
    if(!validAdvancedEntry(entry,q))return;
    if(feedback.querySelector(`[data-anatomia-advanced="${String(q.id)}"]`))return;

    const letters=['A','B','C','D'];
    const rows=q.optionsShown.map((opt,i)=>{
      const isCorrect=i===q.correctShown;
      return `<div class="advanced-reason ${isCorrect?'correct':'wrong'}"><strong>${letters[i]} · ${isCorrect?'CORRETTA':'ERRATA'}</strong><span>${escapeHtml(advancedReason(entry,q,opt))}</span></div>`;
    }).join('');
    const statusText=q.wasCorrect?'RISPOSTA CORRETTA':'RISPOSTA ERRATA';
    feedback.innerHTML=`<div class="status">${statusText}</div><div data-anatomia-advanced="${escapeHtml(q.id)}"><strong>Risposta corretta:</strong> ${letters[q.correctShown]}. ${escapeHtml(q.optionsShown[q.correctShown])}<br><strong>Concetto chiave:</strong> ${escapeHtml(entry.summary)}<div class="advanced-title">Perché ogni alternativa è giusta o sbagliata:</div><div class="advanced-reasons">${rows}</div></div>`;
  }catch(error){
    console.warn('Spiegazione avanzata Anatomia Patologica non applicata; feedback base mantenuto.',error);
  }
}

function observeFeedback(){
  const feedback=document.getElementById('feedback');
  if(!feedback||feedbackObserver)return;
  feedbackObserver=new MutationObserver(()=>enrichCurrentFeedback());
  feedbackObserver.observe(feedback,{childList:true,subtree:true,characterData:true});
}

async function loadOptionalAdvancedExplanations(){
  const status=ensureStatus();
  if(status)status.textContent='Spiegazioni avanzate: caricamento…';
  try{
    const [results,bankReady]=await Promise.all([
      Promise.allSettled(OPTIONAL_EXPLANATION_FILES.map(loadJson)),
      waitForBank()
    ]);
    const merged={};
    results.forEach((result,index)=>{
      if(result.status==='fulfilled'&&result.value&&typeof result.value==='object')Object.assign(merged,result.value);
      else console.warn('Spiegazioni opzionali non caricate:',OPTIONAL_EXPLANATION_FILES[index],result.reason);
    });
    let valid=0;
    if(bankReady){
      for(const [id,entry] of Object.entries(merged)){
        const q=QUESTIONS.find(item=>String(item.id)===String(id));
        if(!q||!validAdvancedEntry(entry,q))continue;
        ADVANCED_EXPLANATIONS[String(id)]=entry;
        valid++;
      }
    }
    if(status)status.textContent=`Spiegazioni avanzate: ${valid}/${EXPECTED_ADVANCED}${valid===EXPECTED_ADVANCED?' ✓':' · feedback base disponibile'}`;
    enrichCurrentFeedback();
  }catch(error){
    if(status)status.textContent='Spiegazioni avanzate: non disponibili · feedback base attivo';
    console.warn('Il caricamento opzionale delle spiegazioni non modifica il funzionamento del quiz.',error);
  }
}

function init(){
  try{
    injectStyles();
    ensureStatus();
    observeFeedback();
    loadOptionalAdvancedExplanations();
  }catch(error){
    console.warn('Enhancer Anatomia Patologica non disponibile; quiz base invariato.',error);
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
