/* ============================================================
   DBD 10th Anniversary — Cake Tracker scripts
   ============================================================ */

const LOADER_MESSAGES = [
  "Waking the Entity…",
  "Fetching cakes…",
  "Checking item count…",
  "Counting flashlights…",
  "Tallying medkits…",
  "Raiding toolboxes…",
  "Consulting the Fog…",
  "Almost there — one more trial…",
];

const MILESTONES = [
  100, 200, 300,          // tier 1 — subtle
  400, 500, 600,          // tier 2 — pulsing
  700, 800, 900,          // tier 3 — scanlines
  1000,                   // tier 4 — awakening
  2000, 3000, 4000, 5000, // tier 5 — catastrophe
];

const MILESTONE_LABELS = {
  100:  "☩ Milestone Reached: 100 ☩",
  200:  "☩ Milestone Reached: 200 ☩",
  300:  "☩ Milestone Reached: 300 ☩",
  400:  "⚰ Milestone Reached: 400 ⚰",
  500:  "⚰ Milestone Reached: 500 ⚰",
  600:  "⚰ Milestone Reached: 600 ⚰",
  700:  "☠ Milestone Reached: 700 ☠",
  800:  "☠ Milestone Reached: 800 ☠",
  900:  "☠ Milestone Reached: 900 ☠",
  1000: "✦ The Entity Awakens — 1,000 ✦",
  2000: "⛧ THE FOG THICKENS — 2,000 ⛧",
  3000: "⛧ THE ENTITY HUNGERS — 3,000 ⛧",
  4000: "⛧ NO ESCAPE — 4,000 ⛧",
  5000: "⛧⛧ THE ENTITY IS ALL — 5,000 ⛧⛧",
};

function getMilestoneTier(total) {
  if (total >= 2000) return 5;
  if (total >= 1000) return 4;
  if (total >= 700)  return 3;
  if (total >= 400)  return 2;
  if (total >= 100)  return 1;
  return 0;
}

function getHighestMilestone(total) {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (total >= MILESTONES[i]) return MILESTONES[i];
  }
  return null;
}

/* ── LOADER ─────────────────────────────────────────────── */

function runLoader() {
  const loader    = document.getElementById('loader');
  const bar       = document.getElementById('loaderBar');
  const msgEl     = document.getElementById('loaderMsg');
  const app       = document.getElementById('app');
  const DURATION  = 5000; // ms
  const STEPS     = LOADER_MESSAGES.length;
  let   step      = 0;
  let   start     = null;

  msgEl.textContent = LOADER_MESSAGES[0];

  function tick(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / DURATION, 1);
    bar.style.width = (progress * 100) + '%';

    const nextStep = Math.floor(progress * STEPS);
    if (nextStep !== step && nextStep < STEPS) {
      step = nextStep;
      msgEl.textContent = LOADER_MESSAGES[step];
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Done — reveal app
      loader.classList.add('fade-out');
      app.classList.remove('hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      initTables();
    }
  }

  requestAnimationFrame(tick);
}

/* ── MILESTONE EVALUATION ───────────────────────────────── */

function evaluateTable(tableWrapId, bannerId) {
  const wrap    = document.getElementById(tableWrapId);
  const banner  = document.getElementById(bannerId);
  const cells   = wrap.querySelectorAll('.stat-cell');

  let total = 0;
  cells.forEach(cell => {
    const v = parseInt(cell.dataset.val, 10) || 0;
    total += v;
    // Highlight individual cells that hit a milestone exactly
    if (MILESTONES.includes(v)) {
      cell.classList.add('is-milestone');
    } else {
      cell.classList.remove('is-milestone');
    }
  });

  // Remove all tier classes
  wrap.classList.remove('milestone-t1','milestone-t2','milestone-t3','milestone-t4','milestone-t5');

  const tier = getMilestoneTier(total);
  if (tier > 0) wrap.classList.add('milestone-t' + tier);

  const hit = getHighestMilestone(total);
  if (hit) {
    banner.textContent = MILESTONE_LABELS[hit];
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }
}

/* ── TABLE INIT ─────────────────────────────────────────── */

function initTables() {
  evaluateTable('table-kevin',  'milestone-kevin');
  evaluateTable('table-rensora','milestone-rensora');
}

/* ── BOOT ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', runLoader);