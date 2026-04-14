// ===================== CONFIG =====================
// Set this to your Google Apps Script deployment URL after deploying google-apps-script.js
// Leave empty to use console.log only (for testing)
const SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxUBNhx9t37NwqctRn052ObsLTCKV8OlgvcMQyfG6MWV1nxY8JOSUL90oz1mB-Dcm81EQ/exec';

// State
const state = {
  screen: 0,
  uid: new URLSearchParams(window.location.search).get('uid') || 'anon_' + Date.now(),
  country: null,
  countryName: '',
  flow: 0,
  responses: {},
  startTime: Date.now(),
  screenTimes: {}
};

const TOTAL_SCREENS = 9; // 0-8

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Replace {country} in text
function c(text) {
  return text.replace(/\{country\}/g, state.countryName);
}

// Render progress dots
function dots(active) {
  return `<div class="progress">${Array.from({length: TOTAL_SCREENS}, (_, i) =>
    `<div class="dot ${i === active ? 'active' : i < active ? 'done' : ''}"></div>`
  ).join('')}</div>`;
}

// Save response and timing
function save(key, value) {
  state.responses[key] = value;
  state.responses._uid = state.uid;
  state.responses._flow = state.flow;
  state.responses._country = state.countryName;
  state.responses._timestamp = new Date().toISOString();
  localStorage.setItem('visa_survey_state', JSON.stringify(state));
}

// Track screen time
function trackScreen(screenId) {
  const now = Date.now();
  if (state._lastScreen) {
    state.screenTimes[state._lastScreen] = (now - state._lastScreenTime) / 1000;
  }
  state._lastScreen = screenId;
  state._lastScreenTime = now;
}

// Navigate
function goTo(screenNum) {
  state.screen = screenNum;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function goBack() {
  if (state.screen > 0) {
    state.screen--;
    render();
    window.scrollTo(0, 0);
  }
}

// Back button HTML (empty string for screen 0)
function backBtn(screen) {
  if (screen === 0) return '';
  return '<button class="btn-back" id="btnBack">Back</button>';
}

// Bind back button after render
function bindBack() {
  const btn = document.getElementById('btnBack');
  if (btn) btn.addEventListener('click', goBack);
}

// Submit data to backend
// Submit partial or final data to Google Sheets
function submitData(isFinal) {
  state.responses._screenTimes = state.screenTimes;
  state.responses._totalTime = (Date.now() - state.startTime) / 1000;
  state.responses._lastScreen = state.screen;
  state.responses._completed = isFinal ? true : false;

  // POST to Google Sheets if endpoint is configured
  if (SHEETS_ENDPOINT) {
    fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.responses)
    }).catch(err => console.warn('Failed to POST to sheets:', err));
  }

  // Also log to console
  if (isFinal) console.log('Survey COMPLETE:', JSON.stringify(state.responses, null, 2));
}

// Save + submit at every screen transition (captures drop-offs)
function saveAndSubmit(key, value) {
  save(key, value);
  submitData(false); // partial submission
}

// ===================== SCREEN RENDERERS =====================

function renderScreen0() {
  trackScreen('country_pick');
  const popular = COUNTRIES.filter(c => c.popular);
  const rest = COUNTRIES.filter(c => !c.popular).sort((a,b) => a.name.localeCompare(b.name));

  return `
    <div class="screen">
      ${dots(state.screen)}
      <div class="screen-question">Where are you planning your next trip?</div>
      <div class="screen-sub">Pick a destination.</div>
      <div class="label-small" style="margin-bottom:4px;">Your mobile number <span style="color:#B5AFA6">(so we can share what we learn)</span></div>
      <input type="tel" class="country-search" placeholder="e.g. 9876543210" id="mobileInput" autocomplete="tel" style="margin-bottom:16px;" maxlength="10" inputmode="numeric">
      <input type="text" class="country-search" placeholder="Search countries..." id="countrySearch" autocomplete="off">
      <div id="countryList">
        <div class="country-section-label">Popular</div>
        <div class="country-grid" id="popularGrid">
          ${popular.map(c => `
            <div class="country-card" data-name="${c.name}" data-flow="${c.flow}" data-flag="${c.flag}">
              <span class="flag">${c.flag}</span>
              <span class="name">${c.name}</span>
            </div>
          `).join('')}
        </div>
        <div class="country-section-label" style="margin-top:20px">More destinations</div>
        <div class="country-grid" id="restGrid">
          ${rest.map(c => `
            <div class="country-card" data-name="${c.name}" data-flow="${c.flow}" data-flag="${c.flag}">
              <span class="flag">${c.flag}</span>
              <span class="name">${c.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderScreen1() {
  trackScreen('first_move');
  const options = shuffle(FIRST_MOVE_OPTIONS);
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="screen-question">${c('{country}')} is on your mind.</div>
      <div class="screen-sub">What's the FIRST thing you do about the visa?</div>
      ${options.map(o => `
        <div class="move-card" data-id="${o.id}">
          <span class="move-icon">${o.icon}</span>
          <span class="move-label">${c(o.label)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderScreen2() {
  trackScreen('planning_sequence');
  const items = shuffle(PLANNING_ITEMS[state.flow]);
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="screen-question">Planning your ${c('{country}')} trip</div>
      <div class="screen-sub">Tap each step in order. Tap again to undo.</div>
      <div id="tapList">
        ${items.map((item, i) => `
          <div class="tap-item" data-index="${i}" data-text="${item}">
            <span class="tap-badge"></span>
            <span class="tap-text">${item}</span>
          </div>
        `).join('')}
      </div>
      <div style="height:20px"></div>
      <button class="btn-next" id="btnNext" disabled>Next</button>
    </div>
  `;
}

function renderScreen3() {
  trackScreen('pick_agent');
  const agents = shuffle(AGENTS[state.flow]);
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="screen-question">You need a ${c('{country}')} visa</div>
      <div class="screen-sub">Six people are offering to help. Pick the ONE you'd actually go with.</div>
      <div class="agent-list">
        ${agents.map((a, idx) => `
          <div class="agent-card-v3" data-id="${a.id}" data-play="${a.play}" data-name="${a.name}">
            <div class="ac3-header">
              <div class="ac3-avatar" style="background:${a.color}">${a.icon}</div>
              <div class="ac3-info">
                <div class="ac3-name">${a.name}</div>
                <div class="ac3-promise">${c(a.promise)}</div>
              </div>
              <div class="ac3-price-col">
                <div class="ac3-price">${a.price}</div>
                <div class="ac3-time">${a.time}</div>
              </div>
            </div>
            <div class="ac3-claim">${c(a.claim)}</div>
            <div class="ac3-toggle" data-target="details-${idx}">
              <span class="ac3-toggle-text">What you get & don't get</span>
              <span class="ac3-chevron">\u25BC</span>
            </div>
            <div class="ac3-details" id="details-${idx}" style="display:none;">
              <div class="ac3-gets">
                <div class="ac3-col-label ac3-col-green">What you get</div>
                ${a.gets.map(g => `<div class="ac3-get-item">${g}</div>`).join('')}
              </div>
              <div class="ac3-donts">
                <div class="ac3-col-label ac3-col-red">What you don't get</div>
                ${a.donts.map(d => `<div class="ac3-dont-item">${d}</div>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="btn-sticky-wrap">
        <button class="btn-next" id="btnNext" disabled>Pick one to continue</button>
      </div>
    </div>
  `;
}

function renderScreen4() {
  trackScreen('why_never');
  const chosen = state.responses.agent_name || 'your choice';
  const chosenIcon = state.responses.agent_icon || '';
  const agents = AGENTS[state.flow].filter(a => a.id !== state.responses.agent_id);

  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="selected-agent-display">
        <span class="icon">${chosenIcon}</span>
        <span class="info">You picked: ${chosen}</span>
      </div>
      <div class="label-small">Why this one? <span style="color:#D4CFC7">(optional)</span></div>
      <textarea id="whyText" rows="2" placeholder="In one sentence..." style="margin-bottom:24px"></textarea>

      <div class="screen-question" style="font-size:16px;">Which would you NEVER choose?</div>
      <div class="never-list">
        ${agents.map((a, idx) => `
          <div class="never-card" data-id="${a.id}" data-name="${a.name}">
            <span class="nc-icon">${a.icon}</span>
            <div class="nc-info">
              <div class="nc-name">${a.name} \u2022 ${a.price} \u2022 ${a.time}</div>
              <div class="nc-tagline">${c(a.promise)}</div>
            </div>
            <span class="nc-expand" data-target="never-details-${idx}">\u25BC</span>
          </div>
          <div class="nc-details" id="never-details-${idx}" style="display:none;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:8px 16px 12px; background:#F9F7F4; border-radius:0 0 10px 10px; margin-top:-8px; margin-bottom:6px;">
              <div>
                <div class="ac3-col-label ac3-col-green" style="font-size:9px;">What you get</div>
                ${a.gets.map(g => `<div class="ac3-get-item" style="font-size:10px;">${g}</div>`).join('')}
              </div>
              <div>
                <div class="ac3-col-label ac3-col-red" style="font-size:9px;">What you don't get</div>
                ${a.donts.map(d => `<div class="ac3-dont-item" style="font-size:10px;">${d}</div>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="label-small" style="margin-top:16px">Why not? <span style="color:#D4CFC7">(optional)</span></div>
      <textarea id="whyNotText" rows="2" placeholder="One sentence..."></textarea>

      <div class="btn-sticky-wrap">
        <button class="btn-next" id="btnNext" disabled>Next</button>
      </div>
    </div>
  `;
}

function renderScreen5() {
  trackScreen('moment_of_truth');
  const moment = MOMENT_SCENARIOS[state.flow];
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="scenario-box">${c(moment.scenario)}</div>
      <div class="screen-question">${moment.question}</div>
      <div style="height:12px"></div>
      ${moment.options.map(o => `
        <div class="radio-option" data-id="${o.id}">
          <div class="radio-dot"></div>
          <div class="radio-text">${o.text}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderScreen6() {
  trackScreen('trust_gate');
  const signals = shuffle(TRUST_SIGNALS[state.flow]);
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="screen-question">You need to share your passport, bank details, and personal documents.</div>
      <div class="screen-sub">What ONE thing would make you feel safe doing that?</div>
      ${signals.map(s => `
        <div class="trust-card" data-id="${s.id}">
          <div class="trust-icon">${s.icon}</div>
          <div class="trust-label">${s.text}</div>
        </div>
      `).join('')}
      <div style="height:20px"></div>
      <button class="btn-next" id="btnNext" disabled>Next</button>
    </div>
  `;
}

function renderScreen7() {
  trackScreen('crisis');
  const scenario = c(CRISIS_SCENARIOS[state.flow]);
  const options = shuffle(CRISIS_OPTIONS);
  return `
    <div class="screen">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="scenario-box">${scenario}</div>
      <div class="screen-question">What do you do?</div>
      <div style="height:12px"></div>
      ${options.map(o => `
        <div class="move-card" data-id="${o.id}">
          <span class="move-icon">${o.icon}</span>
          <span class="move-label">${o.text}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderScreen8() {
  trackScreen('one_thing');
  return `
    <div class="screen" style="justify-content:center;">
      ${backBtn(state.screen)}
      ${dots(state.screen)}
      <div class="screen-question" style="font-size:24px; line-height:1.25; margin-bottom:20px;">
        If you could snap your fingers and fix ONE thing about getting visas, what would it be?
      </div>
      <textarea class="big-textarea" id="oneThingText" placeholder="Type anything..."></textarea>
      <div style="height:20px"></div>
      <button class="btn-next" id="btnNext" disabled>Submit</button>
    </div>
  `;
}

function renderThankYou() {
  trackScreen('thankyou');
  submitData(true); // final submission
  return `
    <div class="screen" style="justify-content:center; text-align:center;">
      <div style="font-size:48px; margin-bottom:16px;">\u2708\uFE0F</div>
      <div class="screen-question" style="font-size:22px; margin-bottom:8px;">Thanks for sharing!</div>
      <div class="screen-sub" style="margin-bottom:32px;">Your input helps us make visas simpler for everyone.</div>

      <div class="thankyou-card" style="text-align:left;">
        <h4>Did you know?</h4>
        <p>Scapia also helps with visas. Get your ${state.countryName} visa starting from the best price.</p>
        <a href="https://scapia.onelink.me/OTN6/06t60rfv" class="cta-link" target="_blank">Explore Scapia Visas \u2192</a>
      </div>
    </div>
  `;
}

// ===================== RENDER + EVENT BINDING =====================

function render() {
  const app = document.getElementById('app');
  // Order: Country → Planning Sequence → First Move → Agent → Why → Moment → Trust → Crisis → One Thing
  const renderers = [
    renderScreen0, renderScreen2, renderScreen1, renderScreen3,
    renderScreen4, renderScreen5, renderScreen6, renderScreen7,
    renderScreen8
  ];

  if (state.screen >= renderers.length) {
    app.innerHTML = renderThankYou();
    bindThankYou();
    return;
  }

  app.innerHTML = renderers[state.screen]();
  bindEvents();
  bindBack();
}

// Auto-advance helper: select, show feedback briefly, then advance
function autoAdvance(saveKey, value, nextScreen, delay = 400) {
  save(saveKey, value);
  setTimeout(() => goTo(nextScreen), delay);
}

function bindEvents() {
  const s = state.screen;
  // Renderer order: [screen0, screen2, screen1, screen3, screen4, screen5, screen6, screen7, screen8]
  // So s=0→country, s=1→planning, s=2→firstmove, s=3→agent, s=4→why, s=5→moment, s=6→trust, s=7→crisis, s=8→onething

  // Screen 0: Country pick (auto-advance on tap)
  if (s === 0) {
    const cards = document.querySelectorAll('.country-card');
    const search = document.getElementById('countrySearch');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.countryName = card.dataset.name;
        state.flow = parseInt(card.dataset.flow);
        const mobile = document.getElementById('mobileInput')?.value?.trim();
        if (mobile) save('mobile', mobile);
        saveAndSubmit('country', state.countryName);
        save('flow', state.flow);
        setTimeout(() => goTo(1), 300);
      });
    });

    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(q) ? '' : 'none';
      });
      // Hide section labels if all cards in that section are hidden
      document.querySelectorAll('.country-section-label').forEach(label => {
        const grid = label.nextElementSibling;
        if (grid) {
          const visibleCards = grid.querySelectorAll('.country-card:not([style*="display: none"])');
          label.style.display = visibleCards.length ? '' : 'none';
        }
      });
    });
  }

  // Screen 1 (planning sequence — tap-to-number, keep button)
  if (s === 1) {
    const list = document.getElementById('tapList');
    const items = list.querySelectorAll('.tap-item');
    const btn = document.getElementById('btnNext');
    let sequence = [];

    items.forEach(item => {
      item.addEventListener('click', () => {
        const idx = sequence.indexOf(item);
        if (idx >= 0) {
          // Undo: remove this and everything after it
          for (let i = sequence.length - 1; i >= idx; i--) {
            sequence[i].classList.remove('numbered');
            sequence[i].querySelector('.tap-badge').textContent = '';
          }
          sequence = sequence.slice(0, idx);
        } else {
          // Add to sequence
          sequence.push(item);
          item.classList.add('numbered');
          item.querySelector('.tap-badge').textContent = sequence.length;
        }
        // Enable next when all items are numbered
        btn.disabled = sequence.length < items.length;
      });
    });

    btn.addEventListener('click', () => {
      const order = sequence.map(el => el.dataset.text);
      save('planning_sequence', order);
      saveAndSubmit('visa_position', order.findIndex(t => t.toLowerCase().includes('visa')) + 1);
      goTo(2);
    });
  }

  // Screen 2: First move (AUTO-ADVANCE on tap)
  if (s === 2) {
    const cards = document.querySelectorAll('.move-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        save('first_move', card.dataset.id); submitData(false); setTimeout(() => goTo(3), 400); return; //, card.dataset.id, 3);
      });
    });
  }

  // Screen 3: Pick agent (keep button — important deliberate choice)
  if (s === 3) {
    const cards = document.querySelectorAll('.agent-card-v3');
    const btn = document.getElementById('btnNext');

    // Chevron toggles
    document.querySelectorAll('.ac3-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = toggle.dataset.target;
        const details = document.getElementById(targetId);
        if (details.style.display === 'none') {
          details.style.display = 'block';
          toggle.classList.add('open');
        } else {
          details.style.display = 'none';
          toggle.classList.remove('open');
        }
      });
    });

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.ac3-toggle')) return; // Don't select when toggling details
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.responses.agent_id = card.dataset.id;
        state.responses.agent_play = card.dataset.play;
        state.responses.agent_name = card.dataset.name;
        state.responses.agent_icon = card.querySelector('.ac3-avatar').textContent.trim();
        btn.disabled = false;
        btn.textContent = "That's my pick";
      });
    });
    btn.addEventListener('click', () => {
      save('agent_id', state.responses.agent_id);
      save('agent_play', state.responses.agent_play);
      saveAndSubmit('agent_name', state.responses.agent_name);
      const positions = [...cards].map(c => c.dataset.id);
      save('agent_card_positions', positions);
      goTo(4);
    });
  }

  // Screen 4: Why + Never (keep button — has text input)
  if (s === 4) {
    const btn = document.getElementById('btnNext');
    const neverCards = document.querySelectorAll('.never-card');
    let neverSelected = false;

    // Expand/collapse on never cards
    document.querySelectorAll('.nc-expand').forEach(chevron => {
      chevron.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = chevron.dataset.target;
        const details = document.getElementById(targetId);
        if (details.style.display === 'none') {
          details.style.display = 'block';
          chevron.classList.add('open');
        } else {
          details.style.display = 'none';
          chevron.classList.remove('open');
        }
      });
    });

    neverCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.nc-expand')) return;
        neverCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        neverSelected = true;
        btn.disabled = false;
      });
    });

    btn.addEventListener('click', () => {
      save('why_text', document.getElementById('whyText').value);
      const neverCard = document.querySelector('.never-card.selected');
      save('never_agent', neverCard?.dataset.id);
      save('never_name', neverCard?.dataset.name);
      saveAndSubmit('why_not_text', document.getElementById('whyNotText').value);
      goTo(5);
    });
  }

  // Screen 5: Moment of truth (AUTO-ADVANCE on tap)
  if (s === 5) {
    const options = document.querySelectorAll('.radio-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        save('moment_response', opt.dataset.id); submitData(false); setTimeout(() => goTo(6), 400); return; //, opt.dataset.id, 6);
      });
    });
  }

  // Screen 6: Trust gate (keep button — important deliberate choice)
  if (s === 6) {
    const cards = document.querySelectorAll('.trust-card');
    const btn = document.getElementById('btnNext');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        btn.disabled = false;
      });
    });
    btn.addEventListener('click', () => {
      const selected = document.querySelector('.trust-card.selected');
      saveAndSubmit('trust_signal', selected?.dataset.id);
      goTo(7);
    });
  }

  // Screen 7: Crisis (AUTO-ADVANCE on tap)
  if (s === 7) {
    const cards = document.querySelectorAll('.move-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        save('crisis_response', card.dataset.id); submitData(false); setTimeout(() => goTo(8), 400); return; //, card.dataset.id, 8);
      });
    });
  }

  // Screen 8: One thing (mandatory text input)
  if (s === 8) {
    const btn = document.getElementById('btnNext');
    const textarea = document.getElementById('oneThingText');

    textarea.addEventListener('input', () => {
      btn.disabled = textarea.value.trim().length < 3;
    });

    btn.addEventListener('click', () => {
      saveAndSubmit('one_thing', textarea.value);
      goTo(9);
    });
  }
}

function bindThankYou() {
  const btn = document.getElementById('contactBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const contact = document.getElementById('contactInput').value;
      if (contact) {
        save('contact_info', contact);
        btn.textContent = 'Saved! We\'ll reach out.';
        btn.disabled = true;
      }
    });
  }
}

// ===================== INIT =====================

// Check for saved state
const saved = localStorage.getItem('visa_survey_state');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    // Only restore if same uid and recent (within 1 hour)
    if (parsed.uid === state.uid && (Date.now() - parsed.startTime) < 3600000) {
      Object.assign(state, parsed);
    }
  } catch(e) {}
}

render();
