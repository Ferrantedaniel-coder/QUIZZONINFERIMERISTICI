(()=>{
  const VERSION="20260914-fix2";
  const MANIFEST="data/paziente-chirurgico-explanations-manifest.json";
  const EXPECTED_EXPLANATIONS=462;
  const EXPLANATIONS={};
  let loadError=null;

  function versionedUrl(url){
    return `${url}${url.includes("?")?"&":"?"}v=${VERSION}`;
  }

  async function fetchJson(url){
    const response=await fetch(versionedUrl(url),{cache:"no-store"});
    if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);
    return response.json();
  }

  const ready=(async()=>{
    const files=await fetchJson(MANIFEST);
    if(!Array.isArray(files)||!files.length)throw new Error("Manifest spiegazioni non valido");

    const settled=await Promise.allSettled(files.map(async file=>({file,data:await fetchJson(file)})));
    const failures=[];
    settled.forEach((result,i)=>{
      if(result.status==="fulfilled")Object.assign(EXPLANATIONS,result.value.data);
      else failures.push(`${files[i]}: ${result.reason?.message||String(result.reason)}`);
    });

    const count=Object.keys(EXPLANATIONS).length;
    window.__studyhubPazienteExplanations={version:VERSION,count,failures:[...failures]};
    if(failures.length||count!==EXPECTED_EXPLANATIONS){
      throw new Error(`Spiegazioni caricate ${count}/${EXPECTED_EXPLANATIONS}${failures.length?` · ${failures.join(" | ")}`:""}`);
    }
    return true;
  })().catch(error=>{
    loadError=error;
    window.__studyhubPazienteExplanations={version:VERSION,count:Object.keys(EXPLANATIONS).length,error:error.message};
    console.error("Impossibile caricare tutte le spiegazioni avanzate di Paziente chirurgico",error);
    throw error;
  });

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

  function reasonFor(entry,q,opt){
    if(entry.options&&entry.options[opt])return entry.options[opt];
    if(Array.isArray(entry.reasons)){
      const originalIndex=q.options.indexOf(opt);
      if(originalIndex>=0&&entry.reasons[originalIndex])return entry.reasons[originalIndex];
    }
    return null;
  }

  function renderLoadError(fb,message){
    fb.className="feedback bad";
    fb.innerHTML=`<div class="status">ERRORE SPIEGAZIONE</div><strong>La spiegazione avanzata non è disponibile.</strong><br>${escapeHtml(message||"Ricarica la pagina prima di continuare il quiz.")}`;
  }

  // Le opzioni aggregate dipendenti dalla posizione non devono essere rimescolate.
  // Esempi: “Tutte le precedenti”, “Tutte vere”, “Tutte corrette”.
  const basePrepare=prepare;
  prepare=function(q,targetPos){
    const lockOrder=Boolean(q.lockOrder)||q.options.some(opt=>/\b(tutte\s+(?:le\s+)?precedenti|tutte\s+vere|tutte\s+corrette)\b/i.test(opt));
    if(lockOrder){
      return {...q,optionsShown:[...q.options],correctShown:q.correct,selected:null,checked:false,wasCorrect:null};
    }
    return basePrepare(q,targetPos);
  };

  const baseRender=render;
  render=function(){
    baseRender();
    if(!session.length)return;
    const q=session[index];
    if(!q.checked)return;
    const fb=document.getElementById("feedback");

    if(loadError){
      renderLoadError(fb,"Il pacchetto completo delle spiegazioni non è stato caricato correttamente. Ricarica la pagina.");
      return;
    }

    const entry=EXPLANATIONS[q.id];
    if(!entry||(!entry.options&&!Array.isArray(entry.reasons))){
      renderLoadError(fb,`Manca la spiegazione specifica per la domanda ${q.id}.`);
      return;
    }

    const rows=q.optionsShown.map((opt,i)=>{
      const isCorrect=i===q.correctShown;
      const reason=reasonFor(entry,q,opt);
      return `<div class="answer-explanation ${isCorrect?"correct-reason":"wrong-reason"}"><strong>${String.fromCharCode(65+i)} · ${isCorrect?"CORRETTA":"ERRATA"}</strong><span>${escapeHtml(reason||"Errore: motivazione specifica non disponibile per questa alternativa.")}</span></div>`;
    }).join("");

    fb.className="feedback "+(q.wasCorrect?"ok":"bad");
    fb.innerHTML=`<div class="status">${q.wasCorrect?"RISPOSTA CORRETTA":"RISPOSTA ERRATA"}</div><strong>Risposta corretta:</strong> ${String.fromCharCode(65+q.correctShown)}. ${escapeHtml(q.optionsShown[q.correctShown])}${entry.summary?`<br><strong>Concetto chiave:</strong> ${escapeHtml(entry.summary)}`:""}<div class="answer-explanations-title">Perché ogni alternativa è giusta o sbagliata:</div><div class="answer-explanations">${rows}</div>`;
  };

  const baseStartQuiz=startQuiz;
  startQuiz=function(ids=null){
    return ready.then(()=>baseStartQuiz(ids)).catch(error=>{
      console.error(error);
      alert("Le spiegazioni avanzate di Paziente chirurgico non sono state caricate correttamente. Ricarica la pagina prima di iniziare il quiz.");
    });
  };
})();
