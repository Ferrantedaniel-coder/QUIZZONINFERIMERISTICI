(()=>{
  const MANIFEST="data/paziente-chirurgico-explanations-manifest.json";
  const EXPLANATIONS={};
  const ready=(async()=>{
    try{
      const manifestResponse=await fetch(MANIFEST);
      if(!manifestResponse.ok)throw new Error(MANIFEST);
      const files=await manifestResponse.json();
      const parts=await Promise.all(files.map(f=>fetch(f).then(r=>{if(!r.ok)throw new Error(f);return r.json();})));
      parts.forEach(part=>Object.assign(EXPLANATIONS,part));
    }catch(e){console.error("Impossibile caricare le spiegazioni avanzate di Paziente chirurgico",e);}
  })();

  const style=document.createElement("style");
  style.textContent=`
    .answer-explanations{display:grid;gap:9px;margin-top:12px}
    .answer-explanation{display:grid;gap:4px;padding:10px 12px;border-radius:13px;background:rgba(255,255,255,.58);border:1px solid rgba(100,110,114,.11)}
    .answer-explanation strong{font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;letter-spacing:.04em}
    .answer-explanation.correct-reason strong{color:#277d79}
    .answer-explanation.wrong-reason strong{color:#a85d48}
    .answer-explanation span{color:#52656b}
    .answer-explanations-title{margin-top:11px;font-weight:800}
  `;
  document.head.appendChild(style);

  const baseRender=render;
  render=function(){
    baseRender();
    if(!session.length)return;
    const q=session[index];
    if(!q.checked)return;
    const entry=EXPLANATIONS[q.id];
    if(!entry||!entry.options)return;
    const fb=document.getElementById("feedback");
    const rows=q.optionsShown.map((opt,i)=>{
      const isCorrect=i===q.correctShown;
      const reason=entry.options[opt]||"Spiegazione specifica non ancora disponibile per questa alternativa.";
      return `<div class="answer-explanation ${isCorrect?"correct-reason":"wrong-reason"}"><strong>${String.fromCharCode(65+i)} · ${isCorrect?"CORRETTA":"ERRATA"}</strong><span>${escapeHtml(reason)}</span></div>`;
    }).join("");
    fb.innerHTML=`<div class="status">${q.wasCorrect?"RISPOSTA CORRETTA":"RISPOSTA ERRATA"}</div><strong>Risposta corretta:</strong> ${String.fromCharCode(65+q.correctShown)}. ${escapeHtml(q.optionsShown[q.correctShown])}${entry.summary?`<br><strong>Concetto chiave:</strong> ${escapeHtml(entry.summary)}`:""}<div class="answer-explanations-title">Perché ogni alternativa è giusta o sbagliata:</div><div class="answer-explanations">${rows}</div>`;
  };

  const baseStartQuiz=startQuiz;
  startQuiz=function(ids=null){ready.finally(()=>baseStartQuiz(ids));};
})();
