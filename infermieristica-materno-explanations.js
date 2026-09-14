(() => {
  "use strict";

  const ADVANCED_FILES = [
    "data/materno-explanations-001.json.gz.b64",
    "data/materno-explanations-002.json.gz.b64",
    "data/materno-explanations-003.json.gz.b64",
    "data/materno-explanations-004.json.gz.b64",
    "data/materno-explanations-005.json.gz.b64",
    "data/materno-explanations-006.json.gz.b64"
  ];
  const EXPECTED_ADVANCED = 240;
  const BY_INDEX = new Map();
  const BY_ID = new Map();

  function injectStyles() {
    if (document.getElementById("materno-advanced-styles")) return;
    const style = document.createElement("style");
    style.id = "materno-advanced-styles";
    style.textContent = `
      .advanced-why{margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.25)}
      .advanced-why-title{font-weight:800;margin-bottom:8px}
      .advanced-why-summary{margin-bottom:10px;line-height:1.55}
      .advanced-reason{margin:7px 0;padding:9px 10px;border-radius:12px;background:rgba(255,255,255,.12);line-height:1.48}
      .advanced-reason b{font-weight:800}
      .advanced-source-note{margin-top:10px;font-size:.82rem;opacity:.82}
    `;
    document.head.appendChild(style);
  }

  async function unpack(url) {
    const response = await fetch(url, {cache: "no-store"});
    if (!response.ok) throw new Error(`Impossibile caricare ${url}`);
    const packed = (await response.text()).trim();
    const binary = atob(packed);
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return JSON.parse(await new Response(stream).text());
  }

  function validEntry(entry) {
    return entry &&
      typeof entry.summary === "string" &&
      entry.summary.trim().length > 0 &&
      Array.isArray(entry.reasons) &&
      entry.reasons.length === 4 &&
      entry.reasons.every(reason => typeof reason === "string" && reason.trim().length > 0);
  }

  async function loadAdvanced() {
    const results = await Promise.allSettled(ADVANCED_FILES.map(unpack));
    for (const result of results) {
      if (result.status !== "fulfilled" || !result.value || typeof result.value !== "object") continue;
      for (const [key, entry] of Object.entries(result.value)) {
        const bankIndex = Number(key);
        if (Number.isInteger(bankIndex) && bankIndex >= 1 && bankIndex <= EXPECTED_ADVANCED && validEntry(entry)) {
          BY_INDEX.set(bankIndex, entry);
        }
      }
    }
    if (BY_INDEX.size !== EXPECTED_ADVANCED) {
      console.warn(`[Materno] spiegazioni avanzate caricate: ${BY_INDEX.size}/${EXPECTED_ADVANCED}. Il quiz resta operativo con i perché originali.`);
    }
  }

  function waitForBank() {
    return new Promise(resolve => {
      const check = () => {
        try {
          if (Array.isArray(QUESTIONS) && QUESTIONS.length === 300) return resolve(true);
        } catch (_) {}
        setTimeout(check, 80);
      };
      check();
    });
  }

  function buildIdMap() {
    if (!Array.isArray(QUESTIONS) || QUESTIONS.length !== 300) {
      console.warn("[Materno] banca inattesa: enhancer avanzato disattivato per sicurezza.");
      return false;
    }

    const expectedSections = [
      {from: 1, to: 137, topic: "Infermieristica Pediatrica"},
      {from: 138, to: 192, topic: "Pediatria"},
      {from: 193, to: 245, topic: "Ostetricia"},
      {from: 246, to: 300, topic: "Ginecologia"}
    ];
    const coherent = expectedSections.every(({from, to, topic}) =>
      QUESTIONS.slice(from - 1, to).every(q => q && q.topic === topic)
    );
    if (!coherent) {
      console.warn("[Materno] ordine/sezioni della banca inattesi: enhancer avanzato disattivato per sicurezza.");
      return false;
    }

    QUESTIONS.slice(0, EXPECTED_ADVANCED).forEach((question, zeroIndex) => {
      const advanced = BY_INDEX.get(zeroIndex + 1);
      if (advanced) BY_ID.set(String(question.id), advanced);
    });
    return BY_ID.size > 0;
  }

  function originalQuestion(id) {
    try {
      return QUESTIONS.find(q => String(q.id) === String(id)) || null;
    } catch (_) {
      return null;
    }
  }

  function currentQuestion() {
    try {
      return Array.isArray(session) && session.length ? session[index] : null;
    } catch (_) {
      return null;
    }
  }

  function enhanceFeedback() {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;
    const q = currentQuestion();
    if (!q || !q.checked) return;
    const key = String(q.id);
    if (feedback.dataset.maternoAdvancedFor === key) return;

    const advanced = BY_ID.get(key);
    const original = originalQuestion(q.id);
    if (!advanced || !original || !Array.isArray(original.options) || original.options.length !== 4) return;

    feedback.dataset.maternoAdvancedFor = key;
    const box = document.createElement("div");
    box.className = "advanced-why";

    const title = document.createElement("div");
    title.className = "advanced-why-title";
    title.textContent = "Spiegazione completa";
    box.appendChild(title);

    const summary = document.createElement("div");
    summary.className = "advanced-why-summary";
    summary.textContent = advanced.summary;
    box.appendChild(summary);

    q.optionsShown.forEach((optionText, shownIndex) => {
      const originalIndex = original.options.findIndex(opt => opt === optionText);
      if (originalIndex < 0 || originalIndex > 3) return;
      const row = document.createElement("div");
      row.className = "advanced-reason";
      const label = document.createElement("b");
      label.textContent = `${String.fromCharCode(65 + shownIndex)}. `;
      row.appendChild(label);
      row.appendChild(document.createTextNode(advanced.reasons[originalIndex]));
      box.appendChild(row);
    });

    const source = document.createElement("div");
    source.className = "advanced-source-note";
    source.textContent = "Approfondimento verificato su materiale universitario del corso e, ove necessario, fonti scientifiche autorevoli.";
    box.appendChild(source);

    feedback.appendChild(box);
  }

  function observeFeedback() {
    const feedback = document.getElementById("feedback");
    if (!feedback) return;
    const observer = new MutationObserver(() => enhanceFeedback());
    observer.observe(feedback, {childList: true, subtree: true, characterData: true});
    enhanceFeedback();
  }

  async function start() {
    try {
      injectStyles();
      await loadAdvanced();
      await waitForBank();
      if (!buildIdMap()) return;
      observeFeedback();
      console.info(`[Materno] spiegazioni avanzate attive: ${BY_ID.size}/${EXPECTED_ADVANCED}.`);
    } catch (error) {
      console.warn("[Materno] enhancer non disponibile; il quiz continua con le spiegazioni originali.", error);
    }
  }

  start();
})();
