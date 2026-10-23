const modal = document.getElementById('modal');
const views = modal.querySelectorAll('.modal-content');
const checkoutPrice = document.getElementById('checkout-price');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opener = null;
let selectedPackage = null; // 'main' or 'flexible', sent to the server (the server knows the prices)

views.forEach((view) => {
  view.setAttribute('role', 'dialog');
  view.setAttribute('aria-modal', 'true');
});

// Show one step of the modal: 'checkout', 'havale-eft-payment-method' or 'payment-confirmation'
function showView(id) {
  views.forEach((view) => view.classList.toggle('active', view.id === id));
}

function openModal(price) {
  checkoutPrice.textContent = `${Number(price).toLocaleString('tr-TR')} TL`;
  showView('checkout');
  modal.classList.remove('closing');
  modal.classList.add('open');
  // Locking the page removes the scrollbar; add its width as padding so nothing shifts
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.classList.add('modal-open');
  document.getElementById('firstName').focus();
}

function closeModal() {
  if (!modal.classList.contains('open') || modal.classList.contains('closing')) return;
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('open', 'closing');
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    resetCheckout(); // closing always clears what the visitor typed and stops the timer
    if (opener) opener.focus();
  }, reduceMotion.matches ? 0 : 160);
}

// Buy Now buttons: open the modal with that package's price
document.querySelectorAll('.pricing-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    opener = btn;
    selectedPackage = btn.dataset.package;
    openModal(btn.dataset.price);
  });
});

// The checkout and the Havale/EFT step hold personal details, so they close ONLY with the X button.
// A click on the grey area, or Escape, works only on the final thank-you card.
function thankYouIsShowing() {
  const active = modal.querySelector('.modal-content.active');
  return Boolean(active && active.id === 'payment-confirmation');
}
document.querySelectorAll('.modal-close-btn').forEach((btn) => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => { if (e.target === modal && thankYouIsShowing()) closeModal(); });
document.getElementById('payment-confirmation').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && thankYouIsShowing()) closeModal(); });

// Back arrow on the Havale/EFT step
document.querySelector('.modal-return-btn').addEventListener('click', () => showView('checkout'));

// ---------- Language switch (EN / TR) ----------
// Every element with a data-tr attribute holds its Turkish text; the English text is the original HTML.
const langButtons = { en: document.getElementById('lang-en'), tr: document.getElementById('lang-tr') };
const pageTitles = { en: document.title, tr: 'Endonezce Öğren Online | Hilmy Abdullah Azzam' };
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = pageTitles[lang];
  document.querySelectorAll('[data-tr]').forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'tr' ? el.dataset.tr : el.dataset.en;
  });
  Object.entries(langButtons).forEach(([code, btn]) => btn.setAttribute('aria-pressed', String(code === lang)));
}

// A visitor's own choice (the EN / TR buttons) is remembered for one week. After that, or if they never
// chose, the browser's language decides: Turkish browser = Turkish site, any other language = English.
const LANG_KEY = 'langChoice';
const LANG_MEMORY_MS = 7 * 24 * 60 * 60 * 1000;

function rememberLang(lang) {
  try { localStorage.setItem(LANG_KEY, JSON.stringify({ lang, savedAt: Date.now() })); } catch (e) { /* storage unavailable */ }
}

function chosenLang() {
  try {
    const saved = JSON.parse(localStorage.getItem(LANG_KEY));
    if (saved && (saved.lang === 'tr' || saved.lang === 'en') && Date.now() - saved.savedAt < LANG_MEMORY_MS) {
      return saved.lang;
    }
    if (saved) localStorage.removeItem(LANG_KEY); // older than a week: forget it
  } catch (e) { /* nothing saved, or storage unavailable */ }
  return null;
}

function browserLang() {
  const preferred = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  return preferred.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

Object.entries(langButtons).forEach(([code, btn]) => btn.addEventListener('click', () => {
  applyLang(code);
  rememberLang(code); // only a real click is remembered, never the automatic choice
}));

if ((chosenLang() || browserLang()) === 'tr') applyLang('tr');

// ---------- "Get Started" scrolls slowly to the Course Package section ----------
function slowScrollTo(targetId, duration) {
  const target = document.querySelector(targetId);
  const headerHeight = document.getElementById('header').offsetHeight;
  const startPosition = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top + startPosition - headerHeight;
  const distance = targetPosition - startPosition;
  const html = document.documentElement;
  let startTime = null;

  if (reduceMotion.matches) {
    window.scrollTo(0, targetPosition);
    return;
  }

  html.style.scrollBehavior = 'auto'; // the CSS "smooth" setting would fight every frame

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    window.scrollTo(0, ease(Math.min(timeElapsed, duration), startPosition, distance, duration));
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      html.style.scrollBehavior = '';
    }
  }

  requestAnimationFrame(animation);
}

document.getElementById('hero-btn').addEventListener('click', () => slowScrollTo('#pricing', 2000));

// ---------- Remember when the visitor was last here (for the 2-hour animation rule) ----------
function markSeen() {
  try { localStorage.setItem('lastSeen', String(Date.now())); } catch (e) { /* storage unavailable */ }
}
markSeen();
setInterval(() => { if (!document.hidden) markSeen(); }, 30000);
document.addEventListener('visibilitychange', markSeen);
window.addEventListener('pagehide', markSeen);

// ---------- Scroll-in animations (only when the <head> script added the "animate" class) ----------
if (document.documentElement.classList.contains('animate')) {
  const groups = ['.section-title', '.intro', '.week', '#about-owner-paragraph', '.about-owner-container h2', '.pricing-grid'];
  const items = [];
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--d', `${(i % 4) * 90}ms`); // small stagger inside a row
      items.push(el);
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => observer.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }
}

// ---------- Checkout form: validation, order email, resend timer ----------
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER_URL = '/api/order'; // the Netlify function that checks the email and sends the message
const RESEND_SECONDS = 30;

const checkoutForm = document.getElementById('checkout-form');
const checkoutButton = document.getElementById('checkout-btn');
const checkoutButtonText = document.getElementById('checkout-btn-text');
const checkoutStatus = document.getElementById('checkout-status');
const resendStatus = document.getElementById('resend-status');
const timerEl = document.getElementById('resend-email-timer');
const resendButton = document.getElementById('havale-eft-payment-method-resend-email-btn');
const confirmButton = document.getElementById('havale-eft-payment-method-confirm-btn');
const sentToEmail = document.getElementById('sent-to-email'); // shows the address the email went to, so a typo is easy to spot
const placeOrderText = { en: 'Place Order', tr: 'Siparişi Ver' };

// common typing mistakes in the part after the @
const DOMAIN_FIXES = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gnail.com': 'gmail.com',
  'gamil.com': 'gmail.com', 'gmail.con': 'gmail.com', 'gmail.cm': 'gmail.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outlook.con': 'outlook.com',
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yahoo.con': 'yahoo.com',
  'icloud.con': 'icloud.com', 'icoud.com': 'icloud.com',
};

function suggestEmailFix(email) {
  const at = email.lastIndexOf('@');
  const fix = DOMAIN_FIXES[email.slice(at + 1).toLowerCase()];
  return fix ? `${email.slice(0, at)}@${fix}` : null;
}

// Phone number rules (the same check runs in the browser and on the server).
// Strict where we sell (Turkey and Indonesia, mobile numbers only because the number is for WhatsApp),
// and a sensible length check for every other country. This checks the SHAPE of a number;
// no free tool can tell whether a number really belongs to someone.
const PHONE_RULES = {
  '90': /^5\d{9}$/, // Turkish mobile: 5xx xxx xx xx
  '62': /^8\d{8,11}$/, // Indonesian mobile: 8xx ... (9 to 12 digits)
};

function parsePhone(dialRaw, raw) {
  const text = String(raw ?? '').trim();
  if (!/^[+\d\s().-]{5,40}$/.test(text)) return { ok: false };

  let digits = text.replace(/\D/g, '');
  let international = text.startsWith('+');
  if (!international && digits.startsWith('00')) {
    international = true;
    digits = digits.slice(2);
  }

  let full;
  if (international) {
    full = digits; // the visitor typed the whole number with the country code
  } else {
    const dial = String(dialRaw ?? '').replace(/\D/g, '');
    if (!dial) return { ok: false };
    let national = digits.replace(/^0+/, ''); // 0552... becomes 552...
    const rule = PHONE_RULES[dial];
    // the visitor typed the country code again (905522688924): remove it
    if (rule && !rule.test(national) && national.startsWith(dial) && rule.test(national.slice(dial.length))) {
      national = national.slice(dial.length);
    }
    full = dial + national;
  }

  if (full.length < 8 || full.length > 15) return { ok: false };
  for (const [code, rule] of Object.entries(PHONE_RULES)) {
    if (full.startsWith(code) && !rule.test(full.slice(code.length))) return { ok: false };
  }
  return { ok: true, digits: full, e164: `+${full}` };
}

const phoneInput = document.getElementById('phone');
const countrySelect = document.getElementById('phoneCountry');

// [dial code, English name, Turkish name]
const COUNTRIES = [
  ['90', 'Turkey', 'Türkiye'], ['62', 'Indonesia', 'Endonezya'],
  ['43', 'Austria', 'Avusturya'], ['61', 'Australia', 'Avustralya'], ['994', 'Azerbaijan', 'Azerbaycan'],
  ['32', 'Belgium', 'Belçika'], ['673', 'Brunei', 'Brunei'], ['86', 'China', 'Çin'],
  ['357', 'Cyprus', 'Kıbrıs'], ['20', 'Egypt', 'Mısır'], ['33', 'France', 'Fransa'],
  ['49', 'Germany', 'Almanya'], ['91', 'India', 'Hindistan'], ['964', 'Iraq', 'Irak'],
  ['39', 'Italy', 'İtalya'], ['81', 'Japan', 'Japonya'], ['60', 'Malaysia', 'Malezya'],
  ['31', 'Netherlands', 'Hollanda'], ['974', 'Qatar', 'Katar'], ['7', 'Russia', 'Rusya'],
  ['966', 'Saudi Arabia', 'Suudi Arabistan'], ['65', 'Singapore', 'Singapur'], ['82', 'South Korea', 'Güney Kore'],
  ['34', 'Spain', 'İspanya'], ['46', 'Sweden', 'İsveç'], ['41', 'Switzerland', 'İsviçre'],
  ['963', 'Syria', 'Suriye'], ['971', 'United Arab Emirates', 'Birleşik Arap Emirlikleri'],
  ['44', 'United Kingdom', 'Birleşik Krallık'], ['1', 'USA and Canada', 'ABD ve Kanada'],
];
// Turkey is the main market; a browser set to Indonesian starts on Indonesia
const defaultDial = (navigator.language || '').toLowerCase().startsWith('id') ? '62' : '90';

// fills the country list in the visitor's language and keeps their choice
function renderCountryOptions() {
  const chosen = countrySelect.value || defaultDial;
  countrySelect.innerHTML = '';
  COUNTRIES.forEach(([dial, en, tr]) => {
    const option = document.createElement('option');
    option.value = dial;
    option.textContent = `+${dial} ${currentLang === 'tr' ? tr : en}`;
    option.defaultSelected = dial === defaultDial; // what "reset" returns to
    option.selected = dial === chosen;
    countrySelect.appendChild(option);
  });
  countrySelect.setAttribute('aria-label', currentLang === 'tr' ? 'Ülke kodu' : 'Country code');
}

const messages = {
  en: {
    firstName: 'Please enter your first name.',
    lastName: 'Please enter your last name.',
    emailEmpty: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    emailTypo: (hint) => `Did you mean ${hint}?`,
    emailNotFound: "We couldn't find this email address. Please check it.",
    phoneEmpty: 'Please enter your WhatsApp number.',
    phoneInvalid: "This number doesn't look right. Please check the country code and the number.",
    checking: 'Checking…',
    sendFailed: 'Something went wrong. Please try again in a moment.',
    resent: 'The email was sent again.',
    slow: 'Still working… this can take a few seconds.',
    resending: 'Sending the email…',
  },
  tr: {
    firstName: 'Lütfen adınızı girin.',
    lastName: 'Lütfen soyadınızı girin.',
    emailEmpty: 'Lütfen e-posta adresinizi girin.',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin.',
    emailTypo: (hint) => `Bunu mu demek istediniz: ${hint}?`,
    emailNotFound: 'Bu e-posta adresi bulunamadı. Lütfen kontrol edin.',
    phoneEmpty: 'Lütfen WhatsApp numaranızı girin.',
    phoneInvalid: 'Bu numara doğru görünmüyor. Lütfen ülke kodunu ve numarayı kontrol edin.',
    checking: 'Kontrol ediliyor…',
    sendFailed: 'Bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.',
    resent: 'E-posta tekrar gönderildi.',
    slow: 'Hâlâ işleniyor… birkaç saniye sürebilir.',
    resending: 'E-posta gönderiliyor…',
  },
};

function messageFor(key, hint) {
  const message = messages[currentLang][key];
  return typeof message === 'function' ? message(hint) : message;
}

// validate() returns the key of the error message, or null when the value is fine
const fields = [
  { input: document.getElementById('firstName'), tip: document.getElementById('firstNameTooltip'),
    validate: (v) => (v ? null : 'firstName') },
  { input: document.getElementById('lastName'), tip: document.getElementById('lastNameTooltip'),
    validate: (v) => (v ? null : 'lastName') },
  { input: document.getElementById('email'), tip: document.getElementById('emailTooltip'), hint: '',
    validate: (v, f) => {
      if (!v) return 'emailEmpty';
      if (!EMAIL_PATTERN.test(v)) return 'emailInvalid';
      f.hint = suggestEmailFix(v);
      return f.hint ? 'emailTypo' : null;
    } },
  // skipBlur: no warning while the visitor moves to the country list; it is checked on submit
  { input: phoneInput, tip: document.getElementById('phoneTooltip'), skipBlur: true,
    validate: (v) => (!v ? 'phoneEmpty' : parsePhone(countrySelect.value, v).ok ? null : 'phoneInvalid') },
];

let activeError = null; // the one warning currently shown: { field, key }

function hideTooltips() {
  fields.forEach((f) => f.tip.classList.add('hidden'));
  activeError = null;
}

function showTooltip(field, key) {
  hideTooltips();
  field.tip.querySelector('.tooltip-text').textContent = messageFor(key, field.hint);
  field.tip.classList.remove('hidden');
  activeError = { field, key };
}

function setInvalid(field, isInvalid) {
  const wrapper = field.input.closest('.field-wrapper');
  wrapper.classList.remove('invalid');
  if (isInvalid) {
    void wrapper.offsetWidth; // restart the shake animation
    wrapper.classList.add('invalid');
  }
  field.input.setAttribute('aria-invalid', String(isInvalid));
}

function clearAllErrors() {
  fields.forEach((f) => setInvalid(f, false));
  hideTooltips();
}

// a line of text under a button: key = message name, or null to clear it
function setStatus(el, key, isError = true) {
  el.dataset.key = key || '';
  el.textContent = key ? messages[currentLang][key] : '';
  el.classList.toggle('error', Boolean(key) && isError);
}

let sending = false;
let flight = 0; // changes whenever the checkout is reset, so a late answer from the server is ignored
let lastOrder = null; // { key, sentAt, data }: what was sent most recently
let timerId = null;

function setSending(flag) {
  sending = flag;
  checkoutButton.disabled = flag;
  checkoutButton.classList.toggle('is-loading', flag); // spinner next to the text
  checkoutButton.setAttribute('aria-busy', String(flag));
  checkoutButtonText.textContent = flag ? messages[currentLang].checking : placeOrderText[currentLang];
}

async function postOrder(data) {
  try {
    const response = await fetch(ORDER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    return { ok: response.ok && result.ok === true, error: result.error || 'send_failed' };
  } catch (err) {
    return { ok: false, error: 'send_failed' }; // offline, or the server is not running
  }
}

// ----- Resend timer -----
function renderTimer(seconds) {
  timerEl.textContent = `00:${String(seconds).padStart(2, '0')}`;
}

function stopResendTimer() {
  clearInterval(timerId);
  timerId = null;
}

function startResendTimer() {
  stopResendTimer();
  const endAt = Date.now() + RESEND_SECONDS * 1000;
  resendButton.disabled = true;
  renderTimer(RESEND_SECONDS);
  timerId = setInterval(() => {
    const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
    renderTimer(left);
    if (left === 0) {
      stopResendTimer();
      resendButton.disabled = false;
    }
  }, 250);
}

// Closing the checkout (X button) wipes everything the visitor typed and stops the timer
function resetCheckout() {
  flight += 1;
  stopResendTimer();
  checkoutForm.reset();
  clearAllErrors();
  setSending(false);
  setStatus(checkoutStatus, null);
  setStatus(resendStatus, null);
  renderTimer(RESEND_SECONDS);
  resendButton.disabled = true;
  resendButton.classList.remove('is-loading');
  lastOrder = null;
  sentToEmail.textContent = '';
}

// ----- Submit: check the fields, then let the server check the email and send the message -----
checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (sending) return;
  setStatus(checkoutStatus, null);
  let firstError = null;

  fields.forEach((f) => {
    const key = f.validate(f.input.value.trim(), f);
    setInvalid(f, Boolean(key));
    if (key && !firstError) firstError = { field: f, key };
  });

  if (firstError) {
    showTooltip(firstError.field, firstError.key); // one warning at a time, on the first problem
    firstError.field.input.focus();
    return;
  }

  hideTooltips();

  const data = {
    firstName: fields[0].input.value.trim(),
    lastName: fields[1].input.value.trim(),
    email: fields[2].input.value.trim(),
    phoneCountry: countrySelect.value,
    phone: phoneInput.value.trim(),
    packageId: selectedPackage,
    lang: currentLang,
    website: document.getElementById('website').value, // hidden bot-trap field, real visitors leave it empty
  };
  const key = JSON.stringify([data.firstName, data.lastName, data.email.toLowerCase(), data.phoneCountry, data.phone, data.packageId, data.lang]);

  // The same details were sent a moment ago (the visitor used the back arrow and came forward again):
  // do not send a second email.
  if (lastOrder && lastOrder.key === key && Date.now() - lastOrder.sentAt < RESEND_SECONDS * 1000) {
    showView('havale-eft-payment-method');
    return;
  }

  const mine = ++flight;
  setSending(true);
  const slowTimer = setTimeout(() => {
    if (mine === flight && sending) setStatus(checkoutStatus, 'slow', false); // still waiting after 4 seconds
  }, 4000);
  const result = await postOrder(data);
  clearTimeout(slowTimer);
  if (mine !== flight) return; // the checkout was closed while we were waiting
  setSending(false);
  setStatus(checkoutStatus, null);

  if (!result.ok) {
    if (result.error === 'email_not_found') {
      setInvalid(fields[2], true);
      showTooltip(fields[2], 'emailNotFound');
      fields[2].input.focus();
    } else if (result.error === 'phone_invalid') {
      setInvalid(fields[3], true);
      showTooltip(fields[3], 'phoneInvalid');
      fields[3].input.focus();
    } else {
      setStatus(checkoutStatus, 'sendFailed');
    }
    return;
  }

  lastOrder = { key, sentAt: Date.now(), data };
  sentToEmail.textContent = data.email;
  setStatus(resendStatus, null);
  showView('havale-eft-payment-method');
  startResendTimer();
});

fields.forEach((f) => {
  // typing clears that field's warning
  f.input.addEventListener('input', () => {
    setInvalid(f, false);
    if (activeError && activeError.field === f) hideTooltips();
  });
  // leaving a filled field with a wrong value (for example a bad email) warns straight away
  f.input.addEventListener('blur', () => {
    const value = f.input.value.trim();
    const key = value && !f.skipBlur ? f.validate(value, f) : null;
    if (key) {
      setInvalid(f, true);
      showTooltip(f, key);
    }
  });
});

// choosing another country clears an old phone warning
countrySelect.addEventListener('change', () => {
  setInvalid(fields[3], false);
  if (activeError && activeError.field === fields[3]) hideTooltips();
});
renderCountryOptions();

// ----- Resend and Confirm on the Havale/EFT step -----
resendButton.addEventListener('click', async () => {
  if (!lastOrder || resendButton.disabled) return;
  resendButton.disabled = true;
  resendButton.classList.add('is-loading');
  setStatus(resendStatus, 'resending', false);
  const mine = flight;
  const result = await postOrder({ ...lastOrder.data, lang: currentLang, resend: true });
  if (mine !== flight) return;
  resendButton.classList.remove('is-loading');
  if (result.ok) {
    lastOrder.sentAt = Date.now();
    setStatus(resendStatus, 'resent', false);
    startResendTimer();
  } else {
    setStatus(resendStatus, 'sendFailed');
    resendButton.disabled = false;
  }
});

confirmButton.addEventListener('click', () => {
  stopResendTimer();
  showView('payment-confirmation');
});

// start clean every time the checkout opens, and keep every message in the right language
document.querySelectorAll('.pricing-btn').forEach((btn) => btn.addEventListener('click', clearAllErrors));
Object.values(langButtons).forEach((btn) => btn.addEventListener('click', () => {
  if (activeError) {
    activeError.field.tip.querySelector('.tooltip-text').textContent = messageFor(activeError.key, activeError.field.hint);
  }
  [checkoutStatus, resendStatus].forEach((el) => {
    if (el.dataset.key) el.textContent = messages[currentLang][el.dataset.key];
  });
  if (sending) checkoutButtonText.textContent = messages[currentLang].checking;
  renderCountryOptions(); // country names follow the language
}));

// ---------- Welcome intro (first visit, or back after 2+ hours: the <head> script decides) ----------
const loader = document.getElementById('loader');
const rootEl = document.documentElement;
let introDone = false;

function finishIntro() {
  if (introDone || !loader) return;
  introDone = true;
  rootEl.classList.remove('intro-covering'); // the page behind turns red only now, just as the panel starts to slide
  loader.classList.add('leaving');
  setTimeout(() => rootEl.classList.remove('intro-playing'), 350); // header and hero start as the panel slides away
  setTimeout(() => {
    loader.remove();
    document.body.classList.remove('intro-lock');
    document.body.style.paddingRight = '';
  }, 950);
}

if (loader && rootEl.classList.contains('intro-playing')) {
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.body.style.paddingRight = `${window.innerWidth - rootEl.clientWidth}px`; // no shift when the scrollbar hides
  document.body.classList.add('intro-lock');
  setTimeout(finishIntro, 3800);
  loader.addEventListener('click', finishIntro); // click anywhere (or press Escape) to skip
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') finishIntro(); });
} else if (loader) {
  loader.remove();
}

// ---------- Scroll-linked motion (always on, not part of the 2-hour rule) ----------
if (!reduceMotion.matches) {
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const heroTitle = document.getElementById('hero-title');
  const heroButton = document.getElementById('hero-btn');
  const titles = [...document.querySelectorAll('.section-title')].map((el) => ({ el, dx: 0 }));
  const cards = [...document.querySelectorAll('.week'), ...document.querySelectorAll('.pricing-box')]
    .map((el, i) => ({ el, speed: i % 2 ? 0.06 : 0, dy: 0, pkg: el.classList.contains('pricing-box') })); // every second card drifts, so rows move out of step
  const carousel = window.matchMedia('(max-width: 700px)');
  let ticking = false;

  function updateMotion() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const maxShift = Math.min(70, window.innerWidth * 0.08);

    // read first, write after, so the browser lays the page out only once
    const titleShift = titles.map((t) => {
      const r = t.el.getBoundingClientRect();
      return clamp((r.top + r.height / 2 - vh / 2) * 0.1, 0, maxShift);
    });
    const cardShift = cards.map((c) => {
      if (!c.speed || (c.pkg && carousel.matches)) return 0;
      const r = c.el.getBoundingClientRect();
      if (r.bottom < -150 || r.top > vh + 150) return c.dy;
      return clamp((r.top + r.height / 2 - c.dy - vh / 2) * c.speed, -22, 22);
    });

    document.body.style.backgroundPositionY = `${-y * 0.25}px`; // the dots drift slower than the page
    if (y < vh * 1.5) {
      heroTitle.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      heroButton.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
    }
    titles.forEach((t, i) => { t.el.style.transform = `translate3d(${titleShift[i]}px, 0, 0)`; });
    cards.forEach((c, i) => {
      c.dy = cardShift[i];
      if (c.speed) c.el.style.transform = c.pkg && carousel.matches ? '' : `translate3d(0, ${c.dy}px, 0)`;
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateMotion);
    }
  }, { passive: true });
  window.addEventListener('resize', updateMotion);
  updateMotion();
}

// ---------- Course package carousel dots (phones) ----------
const packageGrid = document.querySelector('.pricing-grid');
const packageDots = [...document.querySelectorAll('.pricing-dot')];

function updatePackageDots() {
  const max = packageGrid.scrollWidth - packageGrid.clientWidth;
  const index = max > 0 ? Math.round((packageGrid.scrollLeft / max) * (packageDots.length - 1)) : 0;
  packageDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

packageGrid.addEventListener('scroll', updatePackageDots, { passive: true });
window.addEventListener('resize', updatePackageDots);
packageDots.forEach((dot, i) => dot.addEventListener('click', () => {
  const max = packageGrid.scrollWidth - packageGrid.clientWidth;
  packageGrid.scrollTo({ left: (max * i) / (packageDots.length - 1), behavior: 'smooth' });
}));

// ---------- Custom scrollbar (desktop and laptop only; phones keep the browser's own scrollbar) ----------
// The same bar scrolls the page, and while the checkout is open it scrolls the checkout instead.
const sbDesktop = window.matchMedia('(hover: hover) and (pointer: fine)');
const sbTrack = document.createElement('div');
const sbThumb = document.createElement('div');
sbTrack.id = 'scroll-track';
sbTrack.classList.add('sb-off'); // starts hidden and fades in once the page has been measured
sbThumb.id = 'scroll-thumb';
sbTrack.setAttribute('aria-hidden', 'true');
sbTrack.appendChild(sbThumb);
document.body.appendChild(sbTrack);

let sbFrame = null;
let sbRestTimer = null;
let sbDrag = null; // while the thumb is being dragged: { startY, startScroll, ratio, scroller }

// the welcome screen covers everything, so the bar does nothing while it is up
function sbLocked() {
  return document.body.classList.contains('intro-lock');
}

// what the bar controls right now: the checkout while it is open, otherwise the page
function sbScroller() {
  if (document.body.classList.contains('modal-open')) {
    return {
      top: () => modal.scrollTop,
      view: () => modal.clientHeight,
      total: () => modal.scrollHeight,
      to: (top, behavior) => modal.scrollTo({ top, behavior }),
    };
  }
  return {
    top: () => window.scrollY,
    view: () => window.innerHeight,
    total: () => document.documentElement.scrollHeight,
    to: (top, behavior) => window.scrollTo({ top, behavior }),
  };
}

function sbMetrics() {
  const scroller = sbScroller();
  const track = window.innerHeight; // the track is as tall as the window
  const view = scroller.view();
  const total = scroller.total();
  const thumbHeight = Math.min(track, Math.max(48, (track * view) / total));
  return { scroller, maxScroll: total - view, thumbHeight, maxThumbTop: track - thumbHeight };
}

function sbUpdate() {
  sbFrame = null;
  if (!sbDesktop.matches) return;
  const m = sbMetrics();
  const nothingToScroll = m.maxScroll <= 1; // for example a short checkout step
  sbTrack.classList.toggle('sb-off', nothingToScroll); // fades away instead of vanishing
  if (nothingToScroll) return;
  const top = (m.scroller.top() / m.maxScroll) * m.maxThumbTop;
  sbThumb.style.height = `${m.thumbHeight}px`;
  sbThumb.style.transform = `translateY(${Math.max(0, Math.min(m.maxThumbTop, top))}px)`;
}

function sbSchedule() {
  if (!sbFrame) sbFrame = requestAnimationFrame(sbUpdate);
}

// the thumb is strong while scrolling and fades a little when things rest
function sbWake() {
  sbTrack.classList.add('active');
  clearTimeout(sbRestTimer);
  sbRestTimer = setTimeout(() => { if (!sbDrag) sbTrack.classList.remove('active'); }, 1200);
}

// drag the thumb
sbThumb.addEventListener('pointerdown', (e) => {
  if (sbLocked()) return;
  const m = sbMetrics();
  sbDrag = {
    startY: e.clientY,
    startScroll: m.scroller.top(),
    ratio: m.maxThumbTop ? m.maxScroll / m.maxThumbTop : 0,
    scroller: m.scroller,
  };
  sbThumb.setPointerCapture(e.pointerId);
  sbTrack.classList.add('active', 'dragging');
  document.body.classList.add('sb-dragging');
  e.preventDefault();
});
sbThumb.addEventListener('pointermove', (e) => {
  if (!sbDrag) return;
  sbDrag.scroller.to(sbDrag.startScroll + (e.clientY - sbDrag.startY) * sbDrag.ratio, 'instant');
});
function sbEndDrag() {
  if (!sbDrag) return;
  sbDrag = null;
  sbTrack.classList.remove('dragging');
  document.body.classList.remove('sb-dragging');
  sbWake();
}
sbThumb.addEventListener('pointerup', sbEndDrag);
sbThumb.addEventListener('pointercancel', sbEndDrag);

// click on the empty track: glide there
sbTrack.addEventListener('pointerdown', (e) => {
  if (e.target !== sbTrack || sbLocked()) return;
  const m = sbMetrics();
  if (!m.maxThumbTop) return;
  const thumbTop = Math.max(0, Math.min(m.maxThumbTop, e.clientY - m.thumbHeight / 2));
  m.scroller.to((thumbTop / m.maxThumbTop) * m.maxScroll, 'smooth');
});

window.addEventListener('scroll', () => { sbSchedule(); sbWake(); }, { passive: true });
modal.addEventListener('scroll', () => { sbSchedule(); sbWake(); }, { passive: true }); // the checkout scrolls too
window.addEventListener('resize', sbSchedule);
window.addEventListener('load', sbSchedule);
sbTrack.addEventListener('pointerenter', sbWake);

// the bar must re-measure when the checkout opens or closes, and when content gets taller or shorter
let sbWasInCheckout = false;
new MutationObserver(() => {
  const inCheckout = document.body.classList.contains('modal-open');
  if (inCheckout !== sbWasInCheckout) { // the bar moves between the page and the checkout: glide, do not jump
    sbWasInCheckout = inCheckout;
    sbThumb.classList.add('retarget');
    setTimeout(() => sbThumb.classList.remove('retarget'), 500);
  }
  sbSchedule();
}).observe(document.body, { attributes: true, attributeFilter: ['class'] });
if ('ResizeObserver' in window) {
  const sbResize = new ResizeObserver(sbSchedule);
  [document.body, modal, ...views].forEach((el) => sbResize.observe(el)); // page, checkout, and each checkout step
}

// switch between the custom bar and the browser's own bar when the device type changes
function sbSyncMode() {
  document.documentElement.classList.toggle('custom-scroll', sbDesktop.matches);
  sbSchedule();
}
sbDesktop.addEventListener('change', sbSyncMode);
sbSyncMode();
