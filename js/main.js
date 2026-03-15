const language = {
  en: {
    header: {
      label: "language",
    },
    hero: {
      title: "Discover Your<br />New World Through<br />Bahasa Indonesia.",
      btn: "Get Started",
    },
    aboutProduct: {
      title: "Curriculum",
      weeks: {
        week1: {
          label: "Week 1",
          topics: [
            "Letters",
            "SPOK Concept (Subject–Predicate–Object–Complement)",
            "Present tense",
            "Examination of the Subject (S) concept (formal and informal usage)",
          ],
        },
        week2: {
          label: "Week 2",
          topics: [
            "Examination of the Predicate (P) concept (verbs and adjectives)",
            "Prepositions",
            "Examination of the Object (O) concept",
          ],
        },
        week3: {
          label: "Week 3",
          topics: ["Prepositions (continued)", "Past tense"],
        },
        week4: {
          label: "Week 4",
          topics: ["Future tense", "Demonstratives", "Possessive suffixes"],
        },
        week5: {
          label: "Week 5",
          topics: ["Conversation practice"],
        },
        week6: {
          label: "Week 6",
          topics: ["Listening practice", "Conjunctions"],
        },
        week7: {
          label: "Week 7",
          topics: ["Writing short stories and presenting them"],
        },
        week8: {
          label: "Week 8",
          topics: [
            "Integrated development of reading, writing, speaking, and listening skills",
          ],
        },
      },
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
          duration: "Sessions: 8 meetings",
          hours: "Total Hours: 16 hours (2 hours each)",
          include: {
            label: "Include:",
            topic: "E‑book",
          },
          price: "Price: 2,500 TL",
        },
        {
          name: "Flexible Package",
          duration: "Sessions: 1 meeting",
          hours: "Total Hours: 2 hours",
          include: {
            label: "Include:",
            topic: "E‑book",
          },
          price: "Price: 400 TL",
          btn: "Buy Now",
        },
      ],
    },
    footer: {
      titles: ["Follow us", "Contact"],
    },
  },
  tr: {
    header: {
      label: "dil seçimi",
    },
    hero: {
      title: "Bahasa Endonezya<br />ile Yeni Dünyanızı<br />Keşfedin.",
      btn: "Hemen Başla",
    },
    aboutProduct: {
      title: "Öğretim programı",
      weeks: {
        week1: {
          label: "1. Hafta",
          topics: [
            "Harfler",
            "SPOK Kavramı (Özne–Yüklem–Nesne–Tümleç)",
            "Şimdiki zaman/Geniş zaman",
            "Özne (S) kavramının incelenmesi (resmi ve gayri resmi kullanım)",
          ],
        },
        week2: {
          label: "2. Hafta",
          topics: [
            "Yüklem (P) kavramının incelenmesi (fiiller ve sıfatlar)",
            "Edatlar",
            "Nesne (O) kavramının incelenmesi",
          ],
        },
        week3: {
          label: "3. Hafta",
          topics: ["Edatlar (devam)", "Geçmiş zaman"],
        },
        week4: {
          label: "4. Hafta",
          topics: ["Gelecek zaman", "İşaret sıfatları", "İyelik ekleri"],
        },
        week5: {
          label: "5. Hafta",
          topics: ["Konuşma pratiği"],
        },
        week6: {
          label: "6. Hafta",
          topics: ["Dinleme pratiği", "Bağlaçlar"],
        },
        week7: {
          label: "7. Hafta",
          topics: ["Kısa hikayeler yazma ve sunma"],
        },
        week8: {
          label: "8. Hafta",
          topics: [
            "Okuma, yazma, konuşma ve dinleme becerilerinin entegre gelişimi",
          ],
        },
      },
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
          duration: "Oturumlar: 8 buluşma",
          hours: "Toplam Süre: 16 saat (her biri 2 saat)",
          include: {
            label: "Dahil:",
            topic: "E‑kitap",
          },
          price: "Fiyat: 2.500 TL",
        },
        {
          name: "Esnek Paket",
          duration: "Oturumlar: 1 buluşma",
          hours: "Toplam Süre: 2 saat",
          include: {
            label: "Dahil:",
            topic: "E‑kitap",
          },
          price: "Fiyat: 400 TL",
          btn: "Satın Al",
        },
      ],
    },
    footer: {
      titles: ["Takip edin", "İletişim"],
    },
  },
};

document.body.classList.add("loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("slide-up");
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 900);
  }, 4000);
});

const pill = document.getElementById("scroll-pill");
const track = document.getElementById("scroll-track");

let fadeTimeout; // This holds our timer

const updatePill = () => {
  // 1. Show the track immediately when scrolling starts
  track.classList.add("visible");

  // 2. Clear the previous timer (so it doesn't fade while we are still moving)
  clearTimeout(fadeTimeout);

  // 3. Do the math we did before
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll > 0) {
    const scrollPercent = scrolled / maxScroll;
    const travelDistance = track.offsetHeight - pill.offsetHeight;
    const finalPos = scrollPercent * travelDistance;
    pill.style.transform = `translateY(${finalPos}px)`;
  }

  // 4. Set a new timer to hide the track after 1.5 seconds of no scrolling
  fadeTimeout = setTimeout(() => {
    track.classList.remove("visible");
  }, 1500); // 1500ms = 1.5 seconds
};

window.addEventListener("scroll", updatePill, { passive: true });

let currentlang = "en";

function setLanguage(lang) {
  currentlang = lang;
  /*header*/
  document.getElementById("header-label").innerText =
    language[lang].header.label;

  /*hero*/
  document.getElementById("hero-title").innerHTML = language[lang].hero.title;
  document.getElementById("hero-btn").innerText = language[lang].hero.btn;

  /*About-Product*/
  document.getElementById("about-Product-title").innerText =
    language[lang].aboutProduct.title;
  Object.keys(language[lang].aboutProduct.weeks).forEach((key, i) => {
    document.querySelectorAll("#about-Product h3")[i].innerText =
      language[lang].aboutProduct.weeks[key].label;

    document
      .querySelectorAll("#about-Product ul")
      [i].querySelectorAll("li")
      .forEach((el, i) => {
        el.innerText = language[lang].aboutProduct.weeks[key].topics[i];
      });
  });

  /*about-owner*/
  document.getElementById("about-owner-paragraph").innerHTML =
    language[lang].aboutOwner.paragraphs;

  /*pricing*/
  document.getElementById("pricing-title").innerText =
    language[lang].pricing.title;
  document.querySelectorAll(".pricing-box-name").forEach((el, i) => {
    el.innerText = language[lang].pricing.packages[i].name;
  });

  /*footer*/
  document.querySelectorAll(".footer-title").forEach((el, i) => {
    el.innerText = language[lang].footer.titles[i];
  });
}

document
  .getElementById("lang-en")
  .addEventListener("click", () => setLanguage("en"));
document
  .getElementById("lang-tr")
  .addEventListener("click", () => setLanguage("tr"));

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
