(function(){
'use strict';
const OPTIONAL_EXPLANATION_FILES=['data/scienze-salute-explanations-001.json','data/scienze-salute-explanations-002.json','data/scienze-salute-explanations-003.json','data/scienze-salute-explanations-004.json','data/scienze-salute-explanations-005.json','data/scienze-salute-explanations-006.json','data/scienze-salute-explanations-007.json','data/scienze-salute-explanations-008.json','data/scienze-salute-explanations-009.json','data/scienze-salute-explanations-010.json','data/scienze-salute-explanations-011.json','data/scienze-salute-explanations-012.json','data/scienze-salute-explanations-013.json'];
const EXPECTED_ADVANCED=459;
const ADVANCED_EXPLANATIONS={};
let feedbackObserver=null;

function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}

function getOriginalQuestion(q){
  if(!q||typeof BANK==='undefined'||!Array.isArray(BANK))return null;
  return BANK.find(item=>String(item.id)===String(q.id))||null;
}

function advancedReason(entry,q,displayedOption){
  if(!entry||!Array.isArray(entry.reasons))return null;
  const original=getOriginalQuestion(q);
  if(!original||!Array.isArray(original.o))return null;
  const originalIndex=original.o.indexOf(displayedOption);
  if(originalIndex<0)return null;
  const reason=entry.reasons[originalIndex];
  return typeof reason==='string'&&reason.trim()?reason:null;
}

function validAdvancedEntry(entry,q){
  if(!entry||typeof entry.summary!=='string'||!entry.summary.trim())return false;
  const original=getOriginalQuestion(q);
  if(!original||!Array.isArray(original.o)||original.o.length!==4)return false;
  return original.o.every(opt=>advancedReason(entry,q,opt));
}

function injectStyles(){
  if(document.getElementById('scienzeAdvancedStyles'))return;
  const style=document.createElement('style');
  style.id='scienzeAdvancedStyles';
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
  let status=document.getElementById('advancedStatus');
  if(status)return status;
  const stats=document.querySelector('#quizView .stats');
  if(!stats)return null;
  status=document.createElement('span');
  status.id='advancedStatus';
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

function enrichCurrentFeedback(){
  try{
    if(typeof quiz==='undefined'||typeof state==='undefined'||typeof current==='undefined')return;
    if(!Array.isArray(quiz)||!Array.isArray(state)||!quiz.length)return;
    const q=quiz[current],s=state[current];
    if(!q||!s||!s.checked)return;
    const feedback=document.getElementById('feedback');
    if(!feedback)return;
    const entry=ADVANCED_EXPLANATIONS[String(q.id)];
    if(!validAdvancedEntry(entry,q))return;
    if(feedback.querySelector(`[data-scienze-advanced="${String(q.id)}"]`))return;

    const letters=['A','B','C','D'];
    const rows=q.o.map((opt,i)=>{
      const isCorrect=i===q.a;
      return `<div class="advanced-reason ${isCorrect?'correct':'wrong'}"><strong>${letters[i]} · ${isCorrect?'CORRETTA':'ERRATA'}</strong><span>${escapeHtml(advancedReason(entry,q,opt))}</span></div>`;
    }).join('');
    const statusText=s.correct?'✓ RISPOSTA CORRETTA':'✗ RISPOSTA ERRATA';
    feedback.innerHTML=`<div class="status">${statusText}</div><div data-scienze-advanced="${escapeHtml(q.id)}"><strong>Risposta corretta:</strong> ${letters[q.a]}. ${escapeHtml(q.o[q.a])}<br><strong>Concetto chiave:</strong> ${escapeHtml(entry.summary)}<div class="advanced-title">Perché ogni alternativa è giusta o sbagliata:</div><div class="advanced-reasons">${rows}</div></div>`;
  }catch(error){
    console.warn('Spiegazione avanzata non applicata; feedback base mantenuto.',error);
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
    const results=await Promise.allSettled(OPTIONAL_EXPLANATION_FILES.map(loadJson));
    const merged={};
    results.forEach((result,index)=>{
      if(result.status==='fulfilled'&&result.value&&typeof result.value==='object')Object.assign(merged,result.value);
      else console.warn('Spiegazioni opzionali non caricate:',OPTIONAL_EXPLANATION_FILES[index],result.reason);
    });
    let valid=0;
    for(const [id,entry] of Object.entries(merged)){
      const q=(typeof BANK!=='undefined'&&Array.isArray(BANK))?BANK.find(item=>String(item.id)===String(id)):null;
      if(!q||!validAdvancedEntry(entry,q))continue;
      ADVANCED_EXPLANATIONS[String(id)]=entry;
      valid++;
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
    console.warn('Enhancer Scienze della Salute non disponibile; quiz base invariato.',error);
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
