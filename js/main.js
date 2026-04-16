const language = {
  en: {
    loarderPage: {
      heading: "Welcome",
      subheading: "Learn Indonesian with our language course",
    },
    header: {
      label: "language",
    },
    hero: {
      title: "Discover Your<br />New World Through<br />Bahasa Indonesia.",
      btn: "Get Started",
    },
    aboutProduct: {
      title: "Curriculum",
      weeks: [
        {
          label: "Week 1",
          topics: [
            "Letters",
            "SPOK Concept (Subject–Predicate–Object–Complement)",
            "Present tense",
            "Examination of the Subject (S) concept (formal and informal usage)",
          ],
        },
        {
          label: "Week 2",
          topics: [
            "Examination of the Predicate (P) concept (verbs and adjectives)",
            "Prepositions",
            "Examination of the Object (O) concept",
          ],
        },
        {
          label: "Week 3",
          topics: ["Prepositions (continued)", "Past tense"],
        },
        {
          label: "Week 4",
          topics: ["Future tense", "Demonstratives", "Possessive suffixes"],
        },
        {
          label: "Week 5",
          topics: ["Conversation practice"],
        },
        {
          label: "Week 6",
          topics: ["Listening practice", "Conjunctions"],
        },
        {
          label: "Week 7",
          topics: ["Writing short stories and presenting them"],
        },
        {
          label: "Week 8",
          topics: [
            "Integrated development of reading, writing, speaking, and listening skills",
          ],
        },
      ],
    },
    aboutOwner: {
      paragraphs:
        "Hello everyone, nice to meet you. My name is Hilmy, and I am originally from Indonesia. Naturally, I have a strong grasp of the Indonesian language. At the same time, I also hold a C1 Turkish language certificate from Sakarya University.<br />My experience in public speaking includes performing stand‑up comedy in Istanbul, particularly among Indonesian communities.",
    },
    pricing: {
      title: "Course Package",
      packages: [
        {
          name: "Main Package",
          info: [
            "Sessions: 8 meetings",
            "Total Hours: 16 hours (2 hours each)",
            "Include: E‑book",
          ],
          price: "Price: 2.500 TL",
          btn: "Buy Now",
        },
        {
          name: "Flexible Package",
          info: [
            "Sessions: 1 meeting",
            "Total Hours: 2 hours",
            "Include: E‑book",
          ],
          price: "Price: 400 TL",
          btn: "Buy Now",
        },
      ],
    },
    billingForm: {},
    footer: {
      titles: ["Contact us", "Follow us"],
    },
  },
  tr: {
    loarderPage: {
      heading: "Hoş Geldiniz",
      subheading: "Dil kursumuzla Endonezce öğrenin",
    },
    header: {
      label: "dil seçimi",
    },
    hero: {
      title: "Bahasa Endonezya<br />ile Yeni Dünyanızı<br />Keşfedin.",
      btn: "Hemen Başla",
    },
    aboutProduct: {
      title: "Öğretim programı",
      weeks: [
        {
          label: "1. Hafta",
          topics: [
            "Harfler",
            "SPOK Kavramı (Özne–Yüklem–Nesne–Tümleç)",
            "Şimdiki zaman/Geniş zaman",
            "Özne (S) kavramının incelenmesi (resmi ve gayri resmi kullanım)",
          ],
        },
        {
          label: "2. Hafta",
          topics: [
            "Yüklem (P) kavramının incelenmesi (fiiller ve sıfatlar)",
            "Edatlar",
            "Nesne (O) kavramının incelenmesi",
          ],
        },
        {
          label: "3. Hafta",
          topics: ["Edatlar (devam)", "Geçmiş zaman"],
        },
        {
          label: "4. Hafta",
          topics: ["Gelecek zaman", "İşaret sıfatları", "İyelik ekleri"],
        },
        {
          label: "5. Hafta",
          topics: ["Konuşma pratiği"],
        },
        {
          label: "6. Hafta",
          topics: ["Dinleme pratiği", "Bağlaçlar"],
        },
        {
          label: "7. Hafta",
          topics: ["Kısa hikayeler yazma ve sunma"],
        },
        {
          label: "8. Hafta",
          topics: [
            "Okuma, yazma, konuşma ve dinleme becerilerinin entegre gelişimi",
          ],
        },
      ],
    },
    aboutOwner: {
      paragraphs:
        "Herkese merhaba, tanıştığımıza memnun oldum. Benim adım Hilmy ve aslen Endonezya’dan geliyorum. Doğal olarak Endonezce diline güçlü bir hâkimiyetim var. Aynı zamanda Sakarya Üniversitesi’nden C1 seviyesinde Türkçe dil sertifikasına sahibim.<br />Topluluk önünde konuşma deneyimlerim arasında İstanbul’da, özellikle Endonezya toplulukları arasında stand‑up komedi yapmak da bulunmaktadır.",
    },
    pricing: {
      title: "Kurs Paketi",
      packages: [
        {
          name: "Ana Paket",
          info: [
            "Oturumlar: 8 buluşma",
            "Toplam Süre: 16 saat (her biri 2 saat)",
            "Dahil: E‑kitap",
          ],
          price: "Fiyat: 2.500 TL",
          btn: "Satın Al",
        },
        {
          name: "Esnek Paket",
          info: [
            "Oturumlar: 1 buluşma",
            "Toplam Süre: 2 saat",
            "Dahil: E‑kitap",
          ],
          price: "Fiyat: 400 TL",
          btn: "Satın Al",
        },
      ],
    },
    footer: {
      titles: ["İletişim", "Takip edin"],
    },
  },
};

function setLanguage(lang) {
  currentlang = lang;
  /* Loader-page section */
  document.querySelector(".fade-text h1").innerHTML =
    language[lang].loarderPage.heading;
  document.querySelector(".fade-text h2").innerHTML =
    language[lang].loarderPage.subheading;

  /* header section */
  document.getElementById("header-label").innerText =
    language[lang].header.label;

  /* hero section */
  document.getElementById("hero-title").innerHTML = language[lang].hero.title;
  document.getElementById("hero-btn").innerText = language[lang].hero.btn;

  /* About-Product section */
  document.getElementById("about-Product-title").innerText =
    language[lang].aboutProduct.title;

  language[lang].aboutProduct.weeks.forEach((week, i) => {
    const weekBox = document.querySelectorAll(".about-Product-box-week")[i];

    if (weekBox) {
      weekBox.querySelector("h3").innerText = week.label;
      weekBox.querySelector("ul").innerHTML = week.topics
        .map((topic) => `<li>${topic}</li>`)
        .join("");
    }
  });

  /* about-owner section */
  document.getElementById("about-owner-paragraph").innerHTML =
    language[lang].aboutOwner.paragraphs;

  /* pricing section */
  document.getElementById("pricing-title").innerText =
    language[lang].pricing.title;

  language[lang].pricing.packages.forEach((package, i) => {
    const packagesName = document.querySelectorAll(".pricing-box")[i];
    const packagesInfo = document.querySelectorAll(".pricing-box")[i + 2];

    if (packagesName) {
      packagesName.querySelector(".pricing-box-name").innerText = package.name;
    }

    if (packagesInfo) {
      packagesInfo.querySelector("ul").innerHTML = package.info
        .map((inf) => `<li>${inf}</li>`)
        .join("");

      packagesInfo.querySelector(".price").innerText = package.price;
      packagesInfo.querySelector(".pricing .btn").innerText = package.btn;
    }
  });

  /* footer section */
  document.querySelectorAll(".footer-title").forEach((el, i) => {
    el.innerText = language[lang].footer.titles[i];
  });

  if (lang == "tr") {
    document.getElementById("lang-tr").classList.add("lang-active");
    document.getElementById("lang-en").classList.remove("lang-active");
  } else {
    document.getElementById("lang-en").classList.add("lang-active");
    document.getElementById("lang-tr").classList.remove("lang-active");
  }

  lastSetLanguage(lang);
}

function defaultLanguage() {
  const savedLang = localStorage.getItem("preferredLang");

  if (savedLang) {
    setLanguage(savedLang);
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split("-")[0];
    let currentlang = shortLang === "tr" ? "tr" : "en";

    setLanguage(currentlang);
  }
}

function lastSetLanguage(lang) {
  localStorage.setItem("preferredLang", lang);
}

function slowScrollTo(targetId, duration) {
  const target = document.querySelector(targetId);
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime == null) {
      startTime = currentTime;
    }

    const timeElapsed = currentTime - startTime;

    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return (c / 2) * t * t + b;
    }

    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("open-modal");
  document.body.classList.add("lockScroll");
}

function modalContentSlideInUp(modalContentId) {
  document
    .getElementById(modalContentId)
    .classList.add("modal-content-slide-in-up");
}

function modalContentSlideInDown(modalContentId) {
  document
    .getElementById(modalContentId)
    .classList.add("modal-content-slide-in-down");
}

function modalContentSlideOutUp() {
  const activeModalContent = document.querySelector(
    ".modal-content.modal-content-slide-in-up, .modal-content.modal-content-slide-in-down",
  );

  if (activeModalContent) {
    activeModalContent.classList.remove(
      "modal-content-slide-in-up",
      "modal-content-slide-in-down",
    );
    activeModalContent.classList.add("modal-content-slide-out-up");
    setTimeout(() => {
      activeModalContent.classList.remove("modal-content-slide-out-up");
    }, 600);
  }
}

function modalContentSlideOutDown() {
  const activeModalContent = document.querySelector(
    ".modal-content.modal-content-slide-in-up, .modal-content.modal-content-slide-in-down",
  );

  if (activeModalContent) {
    activeModalContent.classList.remove(
      "modal-content-slide-in-up",
      "modal-content-slide-in-down",
    );
    activeModalContent.classList.add("modal-content-slide-out-down");
    setTimeout(() => {
      activeModalContent.classList.remove("modal-content-slide-out-down");
    }, 600);
  }
}

function openModalContent(modalContent) {
  document
    .getElementById(modalContent)
    .classList.add("modal-content-slide-in-up");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("open-modal");
  document.body.classList.remove("lockScroll");
}

function closeModalContent() {
  const activeModalContent = document.querySelector(
    ".modal-content.modal-content-slide-in-up, .modal-content.modal-content-slide-in-down",
  );

  if (activeModalContent) {
    activeModalContent.classList.remove(
      "modal-content-slide-in-up",
      "modal-content-slide-in-down",
    );
    activeModalContent.classList.add("modal-content-slide-out-down");
    setTimeout(() => {
      activeModalContent.classList.remove("modal-content-slide-out-down");
    }, 600);
  }
}

function billingFowardModalContent() {
  const activeModalContent = document.querySelector(
    ".modal-content.modal-content-slide-in-up, .modal-content.modal-content-slide-in-down",
  );

  if (activeModalContent) {
    activeModalContent.classList.remove(
      "modal-content-slide-in-up",
      "modal-content-slide-in-down",
    );
    activeModalContent.classList.add("modal-content-slide-out-up");
    setTimeout(() => {
      activeModalContent.classList.remove("modal-content-slide-out-up");
    }, 600);
  }
}

function billingReturnModalContent() {
  closeModalContent();
  setTimeout(() => {
    document
      .getElementById("checkout")
      .classList.add("modal-content-slide-in-down");
  }, 580);
}

defaultLanguage();

document.body.classList.add("lockScroll");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("slide-up");
    setTimeout(() => {
      document.body.classList.remove("lockScroll");
    }, 900);
  }, 4000);
});

const pill = document.getElementById("scroll-pill");
const track = document.getElementById("scroll-track");
const modalContainer = document.querySelector(".checkout-content");

let fadeTimeout;

const updatePill = () => {
  track.classList.add("visible");

  clearTimeout(fadeTimeout);

  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll > 0) {
    const scrollPercent = scrolled / maxScroll;
    const travelDistance = track.offsetHeight - pill.offsetHeight;
    const finalPos = scrollPercent * travelDistance;
    pill.style.transform = `translateY(${finalPos}px)`;
  }

  fadeTimeout = setTimeout(() => {
    track.classList.remove("visible");
  }, 1500);
};

window.addEventListener("scroll", updatePill, { passive: true });
modalContainer.addEventListener("scroll", updatePill);

document
  .getElementById("lang-en")
  .addEventListener("click", () => setLanguage("en"));
document
  .getElementById("lang-tr")
  .addEventListener("click", () => setLanguage("tr"));

const heroBtn = document.getElementById("hero-btn");

heroBtn.addEventListener("click", () => {
  const screenWidth = window.innerWidth;
  const targetId = "#pricing";
  const targetElement = document.querySelector(targetId);

  if (screenWidth < 1024) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    slowScrollTo(targetId, 1600);
  }
});

const pricingBtn = document.querySelectorAll(".pricing-btn");
const modalCloseBtn = document.querySelectorAll(".modal-close-btn");
const modalReturnBtn = document.querySelectorAll(".modal-return-btn");
const checkoutForm = document.getElementById("checkout-form");
const checkoutTotal = document.getElementById("checkout-price");
const havaleEftPaymentMethodConfirmBtn = document.getElementById(
  "havale-eft-payment-method-confirm-btn",
);

let checkoutPrice = 0;
let checkoutCurrency = "TL";

pricingBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let price = btn.getAttribute("data-price");
    checkoutPrice = price;
    checkoutTotal.innerText =
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      " " +
      checkoutCurrency;

    openModal();
    modalContentSlideInUp("checkout");
  });
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userOption = document.querySelector(
    "input[name='payment-method']:checked",
  );

  billingFowardModalContent();
  setTimeout(() => {
    modalContentSlideInUp(userOption.value);
  }, 580);
});

modalReturnBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    billingReturnModalContent();
  });
});

modalCloseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal();
    setTimeout(() => {
      checkoutForm.reset();
      checkoutPrice = 0;
      checkoutTotal.innerText = "0 " + checkoutCurrency;
    }, 600);
  });
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
    setTimeout(() => {
      checkoutPrice = 0;
      checkoutTotal.innerText = "0 " + checkoutCurrency;
    }, 600);
  }
});

const scroller = document.querySelector(".scroller");
const links = scroller.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    scroller.classList.add("paused");
  });
  link.addEventListener("mouseleave", () => {
    scroller.classList.remove("paused");
  });
});
