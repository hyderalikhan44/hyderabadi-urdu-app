/* Hyderabadi Urdu trainer — app logic
   Plain vanilla JS, no build step, all state in localStorage. */

const STORAGE_KEYS = {
  progress: "hu_progress_v1",
  custom: "hu_custom_cards_v1",
  stats: "hu_stats_v1"
};

const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 16, 35]; // index = box-1
const MAX_BOX = BOX_INTERVALS_DAYS.length;
const NEW_CARDS_PER_DAY = 10;

// ---------- persistence ----------

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let progress = loadJSON(STORAGE_KEYS.progress, {});
let customCards = loadJSON(STORAGE_KEYS.custom, []);
let stats = loadJSON(STORAGE_KEYS.stats, {
  streak: 0,
  lastStudyDate: null,
  totalReviews: 0,
  newIntroducedDate: null,
  newIntroducedCount: 0
});

function persistAll() {
  saveJSON(STORAGE_KEYS.progress, progress);
  saveJSON(STORAGE_KEYS.custom, customCards);
  saveJSON(STORAGE_KEYS.stats, stats);
}

// ---------- card model ----------
// Every card gets a stable id: "<categoryId>:<index>" for built-ins, "custom:<createdAt>" for custom.

function allCategories() {
  const cats = CONTENT.categories.map(c => ({ ...c, cards: c.cards.slice() }));
  cats.push({
    id: "custom",
    title: "My Words",
    blurb: "Words and phrases you've added yourself.",
    cards: customCards.map(c => ({ hu: c.hu, en: c.en, note: c.note || "" }))
  });
  return cats;
}

function allCardsFlat() {
  const out = [];
  for (const cat of CONTENT.categories) {
    cat.cards.forEach((card, i) => {
      out.push({ id: `${cat.id}:${i}`, categoryId: cat.id, categoryTitle: cat.title, ...card });
    });
  }
  customCards.forEach(c => {
    out.push({ id: `custom:${c.createdAt}`, categoryId: "custom", categoryTitle: "My Words", hu: c.hu, en: c.en, note: c.note || "" });
  });
  return out;
}

function getCardProgress(id) {
  return progress[id] || null;
}

function isMastered(id) {
  const p = progress[id];
  return !!p && p.box >= MAX_BOX;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.getTime();
}

// ---------- SRS queue ----------

function buildReviewQueue() {
  const now = Date.now();
  const all = allCardsFlat();

  const due = all.filter(c => {
    const p = progress[c.id];
    return p && p.due <= now;
  });

  const unseen = all.filter(c => !progress[c.id]);

  // cap new cards introduced per day
  if (stats.newIntroducedDate !== todayStr()) {
    stats.newIntroducedDate = todayStr();
    stats.newIntroducedCount = 0;
  }
  const newBudget = Math.max(0, NEW_CARDS_PER_DAY - stats.newIntroducedCount);
  const newBatch = unseen.slice(0, newBudget);

  const queue = shuffle(due).concat(newBatch);
  return queue;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rateCard(cardId, rating) {
  const now = Date.now();
  let p = progress[cardId];
  const isNew = !p;
  if (!p) p = { box: 0, due: now, lastSeen: now };

  if (rating === "again") {
    p.box = 1;
  } else if (rating === "good") {
    p.box = Math.min(MAX_BOX, p.box + 1);
  } else if (rating === "easy") {
    p.box = Math.min(MAX_BOX, p.box + 2);
  }
  const intervalDays = BOX_INTERVALS_DAYS[p.box - 1] ?? BOX_INTERVALS_DAYS[BOX_INTERVALS_DAYS.length - 1];
  p.due = daysFromNow(intervalDays);
  p.lastSeen = now;
  progress[cardId] = p;

  if (isNew) stats.newIntroducedCount++;
  stats.totalReviews++;

  // streak
  const today = todayStr();
  if (stats.lastStudyDate !== today) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yesterday = y.toISOString().slice(0, 10);
    stats.streak = stats.lastStudyDate === yesterday ? stats.streak + 1 : 1;
    stats.lastStudyDate = today;
  }

  persistAll();
}

// ---------- TTS ----------

let cachedVoice = null;
let voicesReady = false;

function pickVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  if (!voices.length) return null;
  return (
    voices.find(v => /^ur/i.test(v.lang)) ||
    voices.find(v => /^hi/i.test(v.lang)) ||
    voices.find(v => /^en/i.test(v.lang)) ||
    voices[0]
  );
}

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = pickVoice();
    voicesReady = true;
  };
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = cachedVoice || pickVoice();
  if (voice) utter.voice = voice;
  utter.rate = 0.85;
  utter.pitch = 1.0;
  window.speechSynthesis.speak(utter);
}

// ---------- routing ----------

const screens = ["home", "review", "browse", "category", "add", "stats"];
let currentCategoryId = null;
let reviewQueue = [];
let reviewIndex = 0;
let reviewTotal = 0;

function navigate(screen, opts = {}) {
  screens.forEach(s => {
    document.getElementById(`screen-${s}`).classList.toggle("active", s === screen);
  });
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.nav === screen);
  });

  const titles = { home: "Hyderabadi Urdu", review: "Review", browse: "Topics", category: opts.title || "Topic", add: "Add a Word", stats: "Progress" };
  document.getElementById("topbarTitle").textContent = titles[screen] || "Hyderabadi Urdu";

  if (screen === "home") renderHome();
  if (screen === "review" && !opts.keepQueue) startReviewSession();
  if (screen === "browse") renderBrowse();
  if (screen === "add") renderAdd();
  if (screen === "stats") renderStats();

  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-nav]").forEach(el => {
  el.addEventListener("click", () => navigate(el.dataset.nav));
});

// ---------- HOME ----------

function renderHome() {
  const all = allCardsFlat();
  const now = Date.now();
  const due = all.filter(c => progress[c.id] && progress[c.id].due <= now).length;
  const unseen = all.filter(c => !progress[c.id]).length;
  const dueOrNew = due + Math.min(unseen, Math.max(0, NEW_CARDS_PER_DAY - (stats.newIntroducedDate === todayStr() ? stats.newIntroducedCount : 0)));
  const mastered = all.filter(c => isMastered(c.id)).length;

  document.getElementById("statDue").textContent = dueOrNew;
  document.getElementById("statStreak").textContent = stats.streak || 0;
  document.getElementById("statMastered").textContent = mastered;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Subah bakhair!" : hour < 17 ? "Adaab!" : "Shaam bakhair!";
  document.getElementById("homeGreeting").textContent = greeting;
}

document.getElementById("startReviewBtn").addEventListener("click", () => navigate("review"));

// ---------- REVIEW ----------

function startReviewSession() {
  reviewQueue = buildReviewQueue();
  reviewIndex = 0;
  reviewTotal = reviewQueue.length;
  showReviewCard();
}

function startTopicSession(categoryId) {
  const all = allCardsFlat().filter(c => c.categoryId === categoryId);
  reviewQueue = shuffle(all);
  reviewIndex = 0;
  reviewTotal = reviewQueue.length;
  navigate("review", { keepQueue: true });
  showReviewCard();
}

function showReviewCard() {
  const empty = document.getElementById("reviewEmpty");
  const wrap = document.getElementById("reviewCardWrap");
  const done = document.getElementById("reviewDone");
  const progressEl = document.getElementById("reviewProgress");

  if (reviewTotal === 0) {
    empty.hidden = false;
    wrap.hidden = true;
    done.hidden = true;
    progressEl.textContent = "";
    return;
  }

  if (reviewIndex >= reviewQueue.length) {
    empty.hidden = true;
    wrap.hidden = true;
    done.hidden = false;
    document.getElementById("reviewDoneText").textContent = `Session complete — ${reviewTotal} card${reviewTotal === 1 ? "" : "s"} reviewed.`;
    progressEl.textContent = "";
    renderHome();
    return;
  }

  empty.hidden = true;
  done.hidden = true;
  wrap.hidden = false;
  progressEl.textContent = `${reviewIndex + 1} / ${reviewTotal}`;

  const card = reviewQueue[reviewIndex];
  document.getElementById("cardCategory").textContent = card.categoryTitle;
  document.getElementById("cardHu").textContent = card.hu;
  document.getElementById("cardEn").textContent = card.en;
  document.getElementById("cardNote").textContent = card.note || "";
  document.getElementById("cardBack").hidden = true;
  document.getElementById("revealBtn").hidden = false;
  document.getElementById("rateRow").hidden = true;
}

document.getElementById("hearBtn").addEventListener("click", () => {
  const card = reviewQueue[reviewIndex];
  if (card) speak(card.hu);
});

document.getElementById("revealBtn").addEventListener("click", () => {
  document.getElementById("cardBack").hidden = false;
  document.getElementById("revealBtn").hidden = true;
  document.getElementById("rateRow").hidden = false;
});

document.getElementById("rateRow").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-rate]");
  if (!btn) return;
  const card = reviewQueue[reviewIndex];
  rateCard(card.id, btn.dataset.rate);
  reviewIndex++;
  showReviewCard();
});

// ---------- BROWSE ----------

function renderBrowse() {
  const container = document.getElementById("categoryList");
  container.innerHTML = "";
  allCategories().forEach(cat => {
    const total = cat.cards.length;
    const row = document.createElement("div");
    row.className = "topic-row";
    row.innerHTML = `
      <div>
        <div class="topic-row-title">${escapeHtml(cat.title)}</div>
        <div class="topic-row-sub">${escapeHtml(cat.blurb || "")}</div>
      </div>
      <div class="topic-row-count">${total} card${total === 1 ? "" : "s"}</div>
    `;
    row.addEventListener("click", () => openCategory(cat.id));
    container.appendChild(row);
  });
}

function openCategory(categoryId) {
  currentCategoryId = categoryId;
  const cat = allCategories().find(c => c.id === categoryId);
  navigate("category", { title: cat.title });
  document.getElementById("categoryTitle").textContent = cat.title;
  document.getElementById("categoryBlurb").textContent = cat.blurb || "";

  const list = document.getElementById("categoryCardList");
  list.innerHTML = "";
  cat.cards.forEach(card => {
    const el = document.createElement("div");
    el.className = "mini-card";
    el.innerHTML = `
      <div>
        <div class="mini-card-hu">${escapeHtml(card.hu)}</div>
        <div class="mini-card-en">${escapeHtml(card.en)}</div>
        ${card.note ? `<div class="mini-card-note">${escapeHtml(card.note)}</div>` : ""}
      </div>
    `;
    el.addEventListener("click", () => speak(card.hu));
    list.appendChild(el);
  });
}

document.getElementById("practiceTopicBtn").addEventListener("click", () => {
  if (currentCategoryId) startTopicSession(currentCategoryId);
});

// ---------- ADD WORD ----------

function renderAdd() {
  document.getElementById("myWordsCount").textContent = customCards.length;
  const list = document.getElementById("myWordsList");
  list.innerHTML = "";
  customCards.slice().reverse().forEach(c => {
    const el = document.createElement("div");
    el.className = "mini-card";
    el.innerHTML = `
      <div>
        <div class="mini-card-hu">${escapeHtml(c.hu)}</div>
        <div class="mini-card-en">${escapeHtml(c.en)}</div>
        ${c.note ? `<div class="mini-card-note">${escapeHtml(c.note)}</div>` : ""}
      </div>
      <button class="mini-card-del" data-del="${c.createdAt}" aria-label="Delete">✕</button>
    `;
    list.appendChild(el);
  });
}

document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const hu = document.getElementById("inputHu").value.trim();
  const en = document.getElementById("inputEn").value.trim();
  const note = document.getElementById("inputNote").value.trim();
  if (!hu || !en) return;

  customCards.push({ hu, en, note, createdAt: Date.now() });
  persistAll();
  e.target.reset();
  renderAdd();
});

document.getElementById("myWordsList").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-del]");
  if (!btn) return;
  const createdAt = Number(btn.dataset.del);
  customCards = customCards.filter(c => c.createdAt !== createdAt);
  delete progress[`custom:${createdAt}`];
  persistAll();
  renderAdd();
});

// ---------- STATS ----------

function renderStats() {
  document.getElementById("statsStreak").textContent = stats.streak || 0;
  document.getElementById("statsTotalReviews").textContent = stats.totalReviews || 0;
  document.getElementById("statsTotalCards").textContent = allCardsFlat().length;

  const container = document.getElementById("statsByCategory");
  container.innerHTML = "";
  allCategories().forEach(cat => {
    const ids = cat.cards.map((_, i) => cat.id === "custom" ? `custom:${customCards[i]?.createdAt}` : `${cat.id}:${i}`);
    const total = ids.length;
    const mastered = ids.filter(id => isMastered(id)).length;
    const pct = total ? Math.round((mastered / total) * 100) : 0;

    const row = document.createElement("div");
    row.className = "card";
    row.style.marginBottom = "10px";
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-size:14px;">
        <strong>${escapeHtml(cat.title)}</strong>
        <span>${mastered}/${total}</span>
      </div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    `;
    container.appendChild(row);
  });
}

// ---------- utils ----------

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------- service worker ----------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

// ---------- init ----------

navigate("home");
