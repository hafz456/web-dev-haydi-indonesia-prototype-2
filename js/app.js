const modal = document.getElementById('modal');
const views = modal.querySelectorAll('.modal-content');
const checkoutPrice = document.getElementById('checkout-price');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opener = null;

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
    if (opener) opener.focus();
  }, reduceMotion.matches ? 0 : 160);
}

// Buy Now buttons: open the modal with that package's price
document.querySelectorAll('.pricing-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    opener = btn;
    openModal(btn.dataset.price);
  });
});

// Close with the X buttons, a click on the grey area, the thank-you card, or Escape
document.querySelectorAll('.modal-close-btn').forEach((btn) => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.getElementById('payment-confirmation').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

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
  try { localStorage.setItem('lang', lang); } catch (e) { /* storage unavailable */ }
}

Object.entries(langButtons).forEach(([code, btn]) => btn.addEventListener('click', () => applyLang(code)));

let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
if (savedLang === 'tr') applyLang('tr');

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
  const groups = ['.section-title', '.intro', '.week', '#about-owner-paragraph', '.about-owner-container h2', '.pricing-box'];
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

// ---------- Checkout form validation ----------
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const checkoutForm = document.getElementById('checkout-form');

const messages = {
  en: {
    firstName: 'Please enter your first name.',
    lastName: 'Please enter your last name.',
    emailEmpty: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
  },
  tr: {
    firstName: 'Lütfen adınızı girin.',
    lastName: 'Lütfen soyadınızı girin.',
    emailEmpty: 'Lütfen e-posta adresinizi girin.',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin.',
  },
};

// validate() returns the key of the error message, or null when the value is fine
const fields = [
  { input: document.getElementById('firstName'), tip: document.getElementById('firstNameTooltip'),
    validate: (v) => (v ? null : 'firstName') },
  { input: document.getElementById('lastName'), tip: document.getElementById('lastNameTooltip'),
    validate: (v) => (v ? null : 'lastName') },
  { input: document.getElementById('email'), tip: document.getElementById('emailTooltip'),
    validate: (v) => (!v ? 'emailEmpty' : EMAIL_PATTERN.test(v) ? null : 'emailInvalid') },
];

let activeError = null; // the one warning currently shown: { field, key }

function hideTooltips() {
  fields.forEach((f) => f.tip.classList.add('hidden'));
  activeError = null;
}

function showTooltip(field, key) {
  hideTooltips();
  field.tip.querySelector('.tooltip-text').textContent = messages[currentLang][key];
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

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstError = null;

  fields.forEach((f) => {
    const key = f.validate(f.input.value.trim());
    setInvalid(f, Boolean(key));
    if (key && !firstError) firstError = { field: f, key };
  });

  if (firstError) {
    showTooltip(firstError.field, firstError.key); // one warning at a time, on the first problem
    firstError.field.input.focus();
    return;
  }

  hideTooltips();
  showView('havale-eft-payment-method'); // next step (emailing the instructions comes later)
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
    const key = value ? f.validate(value) : null;
    if (key) {
      setInvalid(f, true);
      showTooltip(f, key);
    }
  });
});

// start clean every time the checkout opens, and keep the warning in the right language
document.querySelectorAll('.pricing-btn').forEach((btn) => btn.addEventListener('click', clearAllErrors));
Object.values(langButtons).forEach((btn) => btn.addEventListener('click', () => {
  if (activeError) {
    activeError.field.tip.querySelector('.tooltip-text').textContent = messages[currentLang][activeError.key];
  }
}));

// ---------- Welcome intro (first visit, or back after 2+ hours: the <head> script decides) ----------
const loader = document.getElementById('loader');
const rootEl = document.documentElement;
let introDone = false;

function finishIntro() {
  if (introDone || !loader) return;
  introDone = true;
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
    .map((el, i) => ({ el, speed: i % 2 ? 0.06 : 0, dy: 0 })); // every second card drifts, so rows move out of step
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
      if (!c.speed) return 0;
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
      if (c.speed) c.el.style.transform = `translate3d(0, ${c.dy}px, 0)`;
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
