// SSF E-book — app logic
// Renders chapters, builds sentences, navigates pages, TTS, onboarding

(function() {
  const COL_COUNT = 3;
  const ROMAN = ['I','II','III'];

  // Curated list of practical chapters in pedagogical order (basic → advanced).
  // Chapters not in this list stay in chapters.js but aren't rendered.
  const ENABLED_CHAPTERS = [
    'at-home',       // daily / small talk
    'family',
    'relationships',
    'cooking-1',     // restaurant & food
    'shopping',
    'health',        // doctor visit
    'money',         // banking & finance
    'driving',
    'traveling',     // airport, hotel
    'education',
    'working',       // career / interview
    'phone',         // calls & meetings
  ];

  const chapters = window.SSF_CHAPTERS
    .filter(c => ENABLED_CHAPTERS.includes(c.id))
    .sort((a, b) => ENABLED_CHAPTERS.indexOf(a.id) - ENABLED_CHAPTERS.indexOf(b.id));
  const OV = window.SSF_OVERRIDES || {};

  // Merge overrides — supports column replacements + meta overrides + tree
  chapters.forEach(ch => {
    const o = OV[ch.id]; if (!o) return;
    Object.keys(o).forEach(key => {
      const def = o[key];
      if (key === 'examples' && Array.isArray(def)) {
        ch.examples = def;
      } else if (key === 'phrasals' && Array.isArray(def)) {
        ch.phrasals = def;
      } else if (key === 'desc' && typeof def === 'string') {
        ch.desc = def;
      } else if (key === 'sub' && typeof def === 'string') {
        ch.sub = def;
      } else if (key === 'title' && typeof def === 'string') {
        ch.title = def;
      } else if (key === 'tree' && Array.isArray(def)) {
        // Cascading schema: col 1 → col 2 personalizada → col 3 personalizada.
        // Cells dos cols 2/3 são derivadas no momento via getColCells().
        ch.tree = def;
        ch.cols = [[], [], []];
      } else if (def && def.replace && Array.isArray(def.items)) {
        ch.cols[+key] = def.items.map(it => ({ ...it }));
      } else if (Array.isArray(def)) {
        def.forEach((meta, idx) => {
          if (ch.cols[+key] && ch.cols[+key][idx]) Object.assign(ch.cols[+key][idx], meta);
        });
      }
    });
  });

  const mount = document.getElementById('chapters-mount');
  const tocGrid = document.getElementById('toc-grid');
  const tocOverlayGrid = document.getElementById('toc-overlay-grid');
  const startPageNum = 4;
  const totalPages = 3 + chapters.length + 1;

  // ---------- Render chapters ----------
  chapters.forEach((ch, i) => {
    const pageNum = startPageNum + i;
    const numStr = String(pageNum).padStart(2, '0');
    const chNum = String(i + 1).padStart(2, '0');

    const tabsHTML = `
      <div class="ssf-mobile-tabs" data-tabs="${ch.id}">
        <div class="grid">
          ${ROMAN.map((r, ci) => `
            <button type="button" data-tab="${ci}" class="${ci===0?'tab-active':''}${ci>0 && ch.tree?' locked':''}">
              <span class="roman">${r}</span>
              <span class="lbl">Coluna</span>
              <span class="filled-dot"></span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const colHeadsHTML = ROMAN.map(r => `
      <div class="ssf-col-head"><span>Coluna</span><span class="roman">${r}</span></div>
    `).join('');

    // Empty containers — populated by renderCol() after DOM insertion.
    const colsHTML = ROMAN.map((r, ci) => `
      <div class="ssf-col ${ci===0?'tab-active':''}" data-col="${ci}"></div>
    `).join('');

    const builderHTML = `
      <div class="builder" data-builder="${ch.id}">
        <div class="builder-head">
          <span class="builder-label">Sua frase</span>
          <span class="builder-progress">
            <strong class="b-count">0</strong> de ${COL_COUNT} ·
            <span class="b-status">monte uma frase</span>
            <span class="builder-warn">— escolhas que não combinam</span>
          </span>
        </div>
        <div class="builder-slots">
          ${ROMAN.map((r, ci) => `
            <div class="builder-slot empty" data-slot="${ci}" role="button" tabindex="0">
              <span class="slot-roman">${r}</span>
              <span class="slot-empty-mark">— escolha —</span>
            </div>
          `).join('')}
        </div>
        <div class="builder-actions">
          <button type="button" class="builder-btn primary listen" disabled>▶︎ <span class="btn-label">Ouvir</span></button>
          <button type="button" class="builder-btn save" disabled>↘ <span class="btn-label">Salvar na prática</span></button>
          <button type="button" class="builder-btn clear">✕ <span class="btn-label">Limpar</span></button>
        </div>
      </div>
    `;

    const examplesHTML = `
      <div class="examples">
        <h4>Frases de exemplo <span class="script-bit">it works like this</span></h4>
        <ul>
          ${ch.examples.map(ex => `
            <li><div><span class="en">${escape(ex.en)}</span><span class="pt">${escape(ex.pt)}</span></div></li>
          `).join('')}
        </ul>
      </div>
    `;

    const phrasalsHTML = `
      <div class="pv-block">
        ${ch.phrasals.map(pv => `
          <div class="pv-card">
            <div class="head"><span class="term">${escape(pv.term)}</span></div>
            <div class="desc">${escape(pv.desc)}</div>
            <div class="ex-label">Exemplos</div>
            <ul class="ex">
              ${pv.ex.map(e => `<li>${escape(e.en)}<span class="pt">${escape(e.pt)}</span></li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;

    const practiceHTML = `
      <div class="divider-cyan"></div>
      <div class="cyan-strip" style="margin-top:8px;">it's time to practice</div>
      <h2 class="practice-title">Sua vez<span class="script">— escreva 5 frases novas usando o SSF acima</span></h2>
      <p class="practice-intro">Combine I + II + III e teste no espelho. Em voz alta. Out loud.</p>
      <div class="practice-lines">
        ${[1,2,3,4,5,6,7,8].map(n => `
          <div class="practice-line">
            <span class="num">${String(n).padStart(2,'0')}</span>
            <input class="field" type="text" placeholder="—" data-practice="${ch.id}-${n}">
          </div>
        `).join('')}
      </div>
    `;

    mount.insertAdjacentHTML('beforeend', `
      <section class="page chapter-page" data-page="ch-${ch.id}" data-screen-label="${numStr} ${ch.title}" data-chapter="${ch.id}">
        <span class="page-tag">Capítulo ${chNum}</span>
        <span class="page-marker"><span class="num">${numStr}</span> / ${String(totalPages).padStart(2,'0')}</span>

        <div class="chap-head">
          <div class="chap-num">CAP. ${chNum} · SSF</div>
          <h1 class="chap-title">${escape(ch.title)}<span class="accent">.</span></h1>
          <p class="chap-sub">${escape(ch.sub)}</p>
          <p class="chap-desc">${escape(ch.desc)}</p>
        </div>

        <div class="ssf-wrap" data-ssf="${ch.id}">
          ${tabsHTML}
          <div class="ssf-cols">${colHeadsHTML}</div>
          <div class="ssf-table">${colsHTML}</div>
          ${builderHTML}
        </div>

        ${examplesHTML}

        <h3 style="font-family:var(--font-head); font-weight:700; font-size:18px; letter-spacing:.18em; text-transform:uppercase; color:var(--cyan); margin:48px 0 20px;">Expressões-chave <span style="color:var(--gray-mid); font-weight:500; letter-spacing:.05em;">— em detalhe</span></h3>
        ${phrasalsHTML}

        ${practiceHTML}
      </section>
    `);
  });

  function escape(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------- TOC entries ----------
  function buildToc(target) {
    target.innerHTML = chapters.map((ch, i) => {
      const pn = startPageNum + i;
      return `<a class="toc-item" href="#" data-goto="ch-${ch.id}">
        <span class="idx">${String(i+1).padStart(2,'0')}</span>
        <span class="name">${escape(ch.title)} <span style="color:var(--gray-mid); font-weight:400; font-style:italic; letter-spacing:0; text-transform:none; font-family:var(--font-body); margin-left:8px;">${escape(ch.sub)}</span></span>
        <span class="pg">pg. ${String(pn).padStart(2,'0')}</span>
      </a>`;
    }).join('');
  }
  buildToc(tocGrid);
  buildToc(tocOverlayGrid);

  // ---------- Page navigation ----------
  const pages = Array.from(document.querySelectorAll('#book .page, #book > .cover, #book > .closing'));
  const pageNames = pages.map(p => {
    const t = p.dataset.page;
    if (t === 'cover') return 'Capa';
    if (t === 'howto') return 'Como usar';
    if (t === 'toc') return 'Sumário';
    if (t === 'closing') return 'Encerramento';
    const ch = chapters.find(c => 'ch-'+c.id === t);
    return ch ? ch.title : t;
  });

  document.getElementById('page-total').textContent = pages.length;

  let cur = 0;
  function goTo(idx) {
    cur = Math.max(0, Math.min(pages.length-1, idx));
    pages.forEach((p, i) => p.classList.toggle('active', i === cur));
    document.getElementById('page-now').textContent = cur + 1;
    document.getElementById('page-name').textContent = pageNames[cur];
    document.getElementById('prev').disabled = cur === 0;
    document.getElementById('next').disabled = cur === pages.length-1;
    document.getElementById('track').style.setProperty('--p', ((cur)/(pages.length-1)*100)+'%');
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    window.scrollTo({top:0, behavior:'instant'});
    onPageChange();
  }
  function goToId(id) {
    const idx = pages.findIndex(p => p.dataset.page === id);
    if (idx >= 0) goTo(idx);
  }

  document.getElementById('prev').addEventListener('click', () => goTo(cur-1));
  document.getElementById('next').addEventListener('click', () => goTo(cur+1));
  document.getElementById('start-btn').addEventListener('click', (e) => { e.preventDefault(); goTo(1); });

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('toc-overlay').classList.contains('open')) {
      if (e.key === 'Escape') closeToc();
      return;
    }
    if (document.getElementById('onboard').classList.contains('open')) {
      if (e.key === 'Escape') hideOnboard();
      return;
    }
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goTo(cur+1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(cur-1); }
  });

  // TOC links
  document.querySelectorAll('[data-goto]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      goToId(a.dataset.goto);
      closeToc();
    });
  });

  // TOC overlay
  const overlay = document.getElementById('toc-overlay');
  function openToc() { overlay.classList.add('open'); }
  function closeToc() { overlay.classList.remove('open'); }
  document.getElementById('toc-btn').addEventListener('click', openToc);
  document.getElementById('toc-close').addEventListener('click', closeToc);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeToc(); });

  // ---------- SSF interaction ----------
  const builderState = {};
  const tabState = {};

  function emptyState() {
    const s = {};
    for (let i = 0; i < COL_COUNT; i++) s[i] = null;
    return s;
  }

  // Cell lookup that works for both legacy single-frame and new tree schema.
  function getColCells(ch, state, ci) {
    if (ch.tree) {
      if (ci === 0) return ch.tree;
      if (ci === 1) {
        if (state[0] === null) return [];
        return ch.tree[state[0]].colII || [];
      }
      if (ci === 2) {
        if (state[0] === null || state[1] === null) return [];
        const colII = ch.tree[state[0]].colII || [];
        return (colII[state[1]] && colII[state[1]].colIII) || [];
      }
    }
    return ch.cols[ci] || [];
  }

  function getCellAt(ch, state, ci) {
    const cells = getColCells(ch, state, ci);
    return state[ci] !== null ? cells[state[ci]] : null;
  }

  function renderCol(wrap, ch, ci) {
    const colEl = wrap.querySelector(`.ssf-col[data-col="${ci}"]`);
    if (!colEl) return;
    const state = builderState[ch.id];
    const cells = getColCells(ch, state, ci);
    if (cells.length === 0) {
      colEl.classList.remove('populated');
      const msg = ci === 1 ? 'Escolha I primeiro' : 'Escolha II primeiro';
      colEl.innerHTML = `<div class="ssf-cell placeholder"><div class="en">${msg}</div></div>`;
      return;
    }
    colEl.classList.add('populated');
    colEl.innerHTML = cells.map((cell, idx) => {
      const isActive = state[ci] === idx;
      const symIdx = (cell.s !== undefined) ? cell.s : null;
      return `<div class="ssf-cell${isActive?' active':''}" data-col="${ci}" data-idx="${idx}" style="--idx:${idx}"${symIdx!==null?` data-sym="${symIdx}"`:''}>
        <div class="en">${escape(cell.en)}</div>
        <div class="pt">${escape(cell.pt)}</div>
      </div>`;
    }).join('');
  }

  function renderAllCols(wrap, ch) {
    for (let ci = 0; ci < COL_COUNT; ci++) renderCol(wrap, ch, ci);
  }

  // Initial populate of every chapter's columns
  chapters.forEach(ch => {
    builderState[ch.id] = emptyState();
    tabState[ch.id] = 0;
    const wrap = document.querySelector(`.ssf-wrap[data-ssf="${ch.id}"]`);
    if (wrap) renderAllCols(wrap, ch);
  });

  document.querySelectorAll('.ssf-wrap').forEach(wrap => {
    const id = wrap.dataset.ssf;
    const ch = chapters.find(c => c.id === id);
    const builder = wrap.querySelector('.builder');

    // Delegated cell clicks (cells get re-rendered, so we listen on the wrap)
    wrap.addEventListener('click', (e) => {
      const cell = e.target.closest('.ssf-cell');
      if (!cell || !wrap.contains(cell)) return;
      if (cell.classList.contains('placeholder')) return;
      const col = +cell.dataset.col;
      const idx = +cell.dataset.idx;

      if (cell.classList.contains('incompatible')) {
        // Legacy reset behavior: start over with this option.
        builderState[id] = emptyState();
        builderState[id][col] = idx;
        renderAllCols(wrap, ch);
        autoAdvanceTab(id, col);
        applyCompass(id);
        renderBuilder(id);
        return;
      }

      const curSel = builderState[id][col];
      if (curSel === idx) {
        builderState[id][col] = null;
        if (ch.tree) {
          for (let c = col + 1; c < COL_COUNT; c++) builderState[id][c] = null;
        }
      } else {
        builderState[id][col] = idx;
        if (ch.tree) {
          for (let c = col + 1; c < COL_COUNT; c++) builderState[id][c] = null;
        }
        autoAdvanceTab(id, col);
      }
      renderAllCols(wrap, ch);
      applyCompass(id);
      renderBuilder(id);
    });

    // Mobile tab clicks
    wrap.querySelectorAll('.ssf-mobile-tabs button').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(id, +btn.dataset.tab);
      });
    });

    // Builder controls
    builder.querySelector('.clear').addEventListener('click', () => {
      builderState[id] = emptyState();
      renderAllCols(wrap, ch);
      applyCompass(id);
      renderBuilder(id);
    });

    builder.querySelector('.listen').addEventListener('click', () => {
      const sentence = currentSentence(id);
      if (!sentence || !('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sentence);
      u.lang = 'en-US';
      u.rate = 0.92;
      u.pitch = 1;
      const voices = speechSynthesis.getVoices();
      const en = voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|joanna|google us english/i.test(v.name))
              || voices.find(v => /en[-_]US/i.test(v.lang))
              || voices.find(v => /en/i.test(v.lang));
      if (en) u.voice = en;
      speechSynthesis.speak(u);
    });

    builder.querySelector('.save').addEventListener('click', () => {
      const sentence = currentSentence(id);
      if (!sentence) return;
      const inputs = document.querySelectorAll(`input[data-practice^="${id}-"]`);
      for (const inp of inputs) {
        if (!inp.value.trim()) {
          inp.value = sentence;
          inp.dispatchEvent(new Event('input'));
          showToast('Frase salva na prática');
          return;
        }
      }
      showToast('Prática completa');
    });

    // Slot click → unselect that column (and dependent columns in tree mode)
    wrap.querySelectorAll('.builder-slot').forEach(slot => {
      const handler = () => {
        const ci = +slot.dataset.slot;
        if (builderState[id][ci] !== null) {
          builderState[id][ci] = null;
          if (ch.tree) {
            for (let c = ci + 1; c < COL_COUNT; c++) builderState[id][c] = null;
          }
          renderAllCols(wrap, ch);
          applyCompass(id);
          renderBuilder(id);
        }
      };
      slot.addEventListener('click', handler);
      slot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
      });
    });
  });

  function switchTab(id, ci) {
    tabState[id] = ci;
    const wrap = document.querySelector(`.ssf-wrap[data-ssf="${id}"]`);
    wrap.querySelectorAll('.ssf-mobile-tabs button').forEach(b => {
      b.classList.toggle('tab-active', +b.dataset.tab === ci);
    });
    wrap.querySelectorAll('.ssf-table .ssf-col').forEach(c => {
      c.classList.toggle('tab-active', +c.dataset.col === ci);
    });
  }

  function autoAdvanceTab(id, justFilledCol) {
    if (!window.matchMedia || !window.matchMedia('(max-width: 768px)').matches) return;
    const state = builderState[id];
    const ch = chapters.find(c => c.id === id);
    if (ch && ch.tree) {
      // Tree mode: only advance forward (cascade). Don't wrap.
      const target = justFilledCol + 1;
      if (target < COL_COUNT && state[target] === null) {
        setTimeout(() => switchTab(id, target), 320);
      }
      return;
    }
    for (let off = 1; off < COL_COUNT; off++) {
      const target = (justFilledCol + off) % COL_COUNT;
      if (state[target] === null) {
        setTimeout(() => switchTab(id, target), 320);
        return;
      }
    }
  }

  function getActiveSymbols(id) {
    const ch = chapters.find(c => c.id === id);
    const state = builderState[id];
    const syms = new Set();
    for (let col = 0; col < COL_COUNT; col++) {
      const cell = getCellAt(ch, state, col);
      if (cell && cell.s !== undefined) syms.add(cell.s);
    }
    return syms;
  }

  // Compatibility = which cells in the OTHER columns can still combine
  // with what's already selected. Uses the `s` field as a compatibility tag
  // (cells with the same `s` form a valid sentence). Chapters designed as a
  // single coherent frame share one `s` value so all combinations are
  // valid → no dimming. Multi-pattern legacy chapters still work.
  function applyCompass(id) {
    const ch = chapters.find(c => c.id === id);
    if (ch.tree) return; // tree chapters use cascade-based filtering, no compass needed
    const wrap = document.querySelector(`.ssf-wrap[data-ssf="${id}"]`);
    const activeSyms = getActiveSymbols(id);

    wrap.querySelectorAll('.ssf-cell').forEach(cell => {
      cell.classList.remove('compatible', 'incompatible');
      if (activeSyms.size === 0) return;
      if (cell.classList.contains('active')) return;
      const cellSym = cell.dataset.sym !== undefined ? +cell.dataset.sym : null;
      if (cellSym !== null && activeSyms.has(cellSym)) cell.classList.add('compatible');
      else cell.classList.add('incompatible');
    });
  }

  function currentSentence(id) {
    const ch = chapters.find(c => c.id === id);
    const state = builderState[id];
    const parts = [];
    for (let col = 0; col < COL_COUNT; col++) {
      const cell = getCellAt(ch, state, col);
      if (cell) parts.push(cell.en);
    }
    return parts.join(' ').replace(/\s+([.,!?;:])/g, '$1');
  }

  function renderBuilder(id) {
    const ch = chapters.find(c => c.id === id);
    const state = builderState[id];
    const wrap = document.querySelector(`.ssf-wrap[data-ssf="${id}"]`);
    const builder = wrap.querySelector('.builder');
    const slotsContainer = builder.querySelector('.builder-slots');

    let count = 0;
    const symbolsPicked = new Set();
    for (let col = 0; col < COL_COUNT; col++) {
      const slot = slotsContainer.querySelector(`.builder-slot[data-slot="${col}"]`);
      if (!slot) continue;
      const cell = getCellAt(ch, state, col);
      if (cell) {
        slot.classList.add('filled');
        slot.classList.remove('empty');
        slot.innerHTML = `
          <span class="slot-roman">${ROMAN[col]}</span>
          <span class="slot-en">${escape(cell.en)}</span>
          <span class="slot-pt">${escape(cell.pt)}</span>
        `;
        count++;
        if (cell.s !== undefined) symbolsPicked.add(cell.s);
      } else {
        slot.classList.add('empty');
        slot.classList.remove('filled');
        slot.innerHTML = `
          <span class="slot-roman">${ROMAN[col]}</span>
          <span class="slot-empty-mark">— escolha —</span>
        `;
      }
    }

    builder.querySelector('.b-count').textContent = count;
    const status = builder.querySelector('.b-status');
    // Tree mode never produces conflicting symbols (cascade enforces validity).
    const isComplete = count === COL_COUNT && (ch.tree || symbolsPicked.size <= 1);
    const isSaveable = count >= 2 && (ch.tree || symbolsPicked.size <= 1);
    const isWarning = !ch.tree && symbolsPicked.size > 1;
    const remaining = COL_COUNT - count;

    builder.classList.toggle('complete', isComplete);
    builder.classList.toggle('warning', isWarning);

    if (isWarning) {
      status.textContent = 'escolhas não combinam';
    } else if (isComplete) {
      status.textContent = 'frase completa — toque em ouvir';
    } else if (count === 0) {
      status.textContent = 'monte uma frase';
    } else if (count >= 2) {
      status.textContent = `${remaining} restante${remaining > 1 ? 's' : ''} — já dá pra salvar`;
    } else {
      status.textContent = `falta${remaining > 1 ? 'm' : ''} ${remaining}`;
    }

    builder.querySelector('.listen').disabled = count === 0;
    builder.querySelector('.save').disabled = !isSaveable;

    wrap.querySelectorAll('.ssf-mobile-tabs button').forEach(btn => {
      const ci = +btn.dataset.tab;
      btn.classList.toggle('has-pick', state[ci] !== null);
      if (ch.tree) {
        const locked =
          (ci === 1 && state[0] === null) ||
          (ci === 2 && (state[0] === null || state[1] === null));
        btn.classList.toggle('locked', locked);
      }
    });
  }

  // ---------- Persist practice ----------
  const STORAGE_KEY = 'ssf-practice-v1';
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  document.querySelectorAll('input[data-practice]').forEach(inp => {
    const k = inp.dataset.practice;
    if (stored[k]) inp.value = stored[k];
    inp.addEventListener('input', () => {
      stored[k] = inp.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    });
  });

  // ---------- Toast ----------
  const toast = document.getElementById('toast');
  let toastTm;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTm);
    toastTm = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ---------- Onboarding ----------
  // Bumped key to v4 because cascade UX was added. Returning users will
  // see the new tour once.
  const ONBOARD_KEY = 'ssf-onboarded-v4';
  const onboard = document.getElementById('onboard');
  const onboardSteps = [
    {
      step: 'PASSO 01 / 03',
      title: 'Comece pela coluna I',
      body: 'Escolha como você quer <strong>abrir a frase</strong>. Cada opção desbloqueia continuações específicas pra aquele jeito de falar.'
    },
    {
      step: 'PASSO 02 / 03',
      title: 'A coluna II revela suas opções',
      body: 'Depois da sua primeira escolha, a <strong>coluna II abre opções personalizadas</strong> — só o que faz sentido com o que você começou.'
    },
    {
      step: 'PASSO 03 / 03',
      title: 'Coluna III fecha com detalhe',
      body: 'A última coluna mostra <strong>detalhes específicos</strong> daquele item. Frase pronta? Toque em <strong>▶︎ Ouvir</strong> e repita em voz alta.'
    },
  ];
  let onboardIdx = 0;
  let onboardShown = false;

  function showOnboard() {
    onboardIdx = 0;
    renderOnboardStep();
    onboard.classList.add('open');
  }
  function renderOnboardStep() {
    const s = onboardSteps[onboardIdx];
    document.getElementById('onboard-step').textContent = s.step;
    document.getElementById('onboard-title').textContent = s.title;
    document.getElementById('onboard-body').innerHTML = s.body;
    document.getElementById('onboard-dots').innerHTML = onboardSteps.map((_, i) =>
      `<span class="${i <= onboardIdx ? 'on' : ''}"></span>`).join('');
    document.getElementById('onboard-next').textContent =
      onboardIdx === onboardSteps.length - 1 ? 'Bora começar →' : 'Próximo →';
  }
  function hideOnboard() {
    onboard.classList.remove('open');
    localStorage.setItem(ONBOARD_KEY, '1');
  }
  document.getElementById('onboard-next').addEventListener('click', () => {
    if (onboardIdx < onboardSteps.length - 1) {
      onboardIdx++; renderOnboardStep();
    } else {
      hideOnboard();
    }
  });
  document.getElementById('onboard-skip').addEventListener('click', hideOnboard);
  onboard.addEventListener('click', (e) => { if (e.target === onboard) hideOnboard(); });

  function onPageChange() {
    if (onboardShown) return;
    if (localStorage.getItem(ONBOARD_KEY)) return;
    const p = pages[cur];
    if (p && p.dataset.page && p.dataset.page.startsWith('ch-')) {
      onboardShown = true;
      setTimeout(showOnboard, 500);
    }
  }

  // Init
  goTo(0);

  // Warm-up TTS voices on first interaction (some browsers need this)
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
})();
