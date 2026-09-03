function setLanguage(lang) {
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
      billingForm: {
        checkout: {
          title: "Checkout",
          inputLabels: ["First Name", "Last Name", "E-mail"],
          paymentMethodLabel: "Payment Method",
          instruction:
            "Payment will be processed via <strong>Havale / EFT</strong>. Details will be provided after placing your order.",
          totalLabel: "Total:",
          btn: "Confirm",
        },
        validation: {
          firstNameEmpty: "Please enter your first name.",
          lastNameEmpty: "Please enter your last name.",
          emailEmpty: "Please enter your email address.",
          emailInvalid: "Please enter a valid email address.",
          serverError:
            "Could not reach backend server. Make sure Node server is running.",
        },
        havaleEftPaymentMethod: {
          instruction: [
            "Payment instructions have been sent to your <strong>registered email address</strong>.",
            "Check your <strong>spam folder</strong> if it doesn't appear. You can <strong>resend the request</strong> once the <strong>timer below ends</strong>.",
          ],
          resendEmailBtn: "Resend",
          confirmBtn: "Confirm",
        },
        paymentConfirmation: {
          title: "Thank you",
          instruction: "Tap here or the gray area to dismiss",
        },
      },
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
      billingForm: {
        checkout: {
          title: "Ödeme",
          inputLabels: ["Adı", "Soyadı", "E-posta"],
          paymentMethodLabel: "Ödeme Yöntemi",
          instruction:
            "Ödeme <strong>Havale / EFT</strong> ile işlenecektir. Detaylar siparişinizi verdikten sonra verilecektir.",
          totalLabel: "Toplam:",
          btn: "Onayla",
        },
        validation: {
          firstNameEmpty: "Lütfen adınızı giriniz.",
          lastNameEmpty: "Lütfen soyadınızı giriniz.",
          emailEmpty: "Lütfen e-posta adresinizi giriniz.",
          emailInvalid: "Lütfen geçerli bir e-posta adresi giriniz.",
          serverError:
            "Sunucuya ulaşılamadı. Node sunucusunun çalıştığından emin olun.",
        },
        havaleEftPaymentMethod: {
          instruction: [
            "Ödeme talimatları <strong>kayıtlı e-posta adresinize</strong> gönderilmiştir.",
            "E-posta kutunuzda görünmüyorsa <strong>spam klasörünü</strong> kontrol edin. <strong>Aşağıdaki süre</strong> dolduğunda talebi <strong>tekrar gönderebilirsiniz</strong>.",
          ],
          resendEmailBtn: "Tekrar Gönder",
          confirmBtn: "Onayla",
        },
        paymentConfirmation: {
          title: "Teşekkür ederiz",
          instruction: "Kapatmak için buraya veya gri alana dokunun.",
        },
      },
      footer: {
        titles: ["İletişim", "Takip edin"],
      },
    },
  };

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
  document.getElementById("hero-btn-text").innerText = language[lang].hero.btn;

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
      packagesInfo.querySelector(".pricing .pricing-btn-text").innerText =
        package.btn;
    }
  });

  /* billing form section */
  document.querySelector(".checkout h1").innerText =
    language[lang].billingForm.checkout.title;
  document
    .querySelectorAll(".checkout-content-payment-option-input-text-label")
    .forEach((el, i) => {
      el.innerText = language[lang].billingForm.checkout.inputLabels[i];
    });
  document.querySelector(
    ".checkout-content-payment-option-input-option-title h4",
  ).innerText = language[lang].billingForm.checkout.paymentMethodLabel;
  document.querySelector(".checkout-content-total-label h4").innerText =
    language[lang].billingForm.checkout.totalLabel;
  document.querySelector(".payment-method-info").innerHTML =
    language[lang].billingForm.checkout.instruction;
  document.getElementById("checkout-btn-text").innerText =
    language[lang].billingForm.checkout.btn;

  document.querySelector("#firstName ~ .val-empty").innerText =
    language[lang].billingForm.validation.firstNameEmpty;
  document.querySelector("#lastName ~ .val-empty").innerText =
    language[lang].billingForm.validation.lastNameEmpty;
  document.querySelector("#email ~ .val-empty").innerText =
    language[lang].billingForm.validation.emailEmpty;
  document.querySelector("#email ~ .val-invalid").innerText =
    language[lang].billingForm.validation.emailInvalid;

  document
    .querySelectorAll(".havale-eft-payment-method-instruction")
    .forEach((el, i) => {
      el.innerHTML =
        language[lang].billingForm.havaleEftPaymentMethod.instruction[i];
    });
  document.getElementById(
    "havale-eft-payment-method-resend-email-btn-text",
  ).innerText =
    language[lang].billingForm.havaleEftPaymentMethod.resendEmailBtn;
  document.getElementById(
    "havale-eft-payment-method-confirm-btn-text",
  ).innerText = language[lang].billingForm.havaleEftPaymentMethod.confirmBtn;

  document.querySelector(".payment-confirmation h1").innerHTML =
    language[lang].billingForm.paymentConfirmation.title;
  document.querySelector(".payment-confirmation p").innerHTML =
    language[lang].billingForm.paymentConfirmation.instruction;

  /* footer section */
  document.querySelectorAll(".footer-title").forEach((el, i) => {
    el.innerText = language[lang].footer.titles[i];
  });

  if (
    !document.getElementById("firstNameTooltip").classList.contains("hidden")
  ) {
    showTooltip(
      null,
      "firstNameTooltip",
      document.querySelector("#firstName ~ .val-empty").innerText,
    );
  }

  if (
    !document.getElementById("lastNameTooltip").classList.contains("hidden")
  ) {
    showTooltip(
      null,
      "lastNameTooltip",
      document.querySelector("#lastName ~ .val-empty").innerText,
    );
  }

  if (!document.getElementById("emailTooltip").classList.contains("hidden")) {
    // Check whether email field is empty or invalid to show appropriate text
    if (!document.getElementById("email").value.trim()) {
      showTooltip(
        null,
        "emailTooltip",
        document.querySelector("#email ~ .val-empty").innerText,
      );
    } else {
      showTooltip(
        null,
        "emailTooltip",
        document.querySelector("#email ~ .val-invalid").innerText,
      );
    }
  }

  if (
    !document.getElementById("firstNameTooltip").classList.contains("hidden")
  ) {
    showTooltip(
      null,
      "firstNameTooltip",
      document.querySelector("#firstName ~ .val-empty").innerText,
    );
  }

  if (
    !document.getElementById("lastNameTooltip").classList.contains("hidden")
  ) {
    showTooltip(
      null,
      "lastNameTooltip",
      document.querySelector("#lastName ~ .val-empty").innerText,
    );
  }

  if (!document.getElementById("emailTooltip").classList.contains("hidden")) {
    // Check whether email field is empty or invalid to show appropriate text
    if (!document.getElementById("email").value.trim()) {
      showTooltip(
        null,
        "emailTooltip",
        document.querySelector("#email ~ .val-empty").innerText,
      );
    } else {
      showTooltip(
        null,
        "emailTooltip",
        document.querySelector("#email ~ .val-invalid").innerText,
      );
    }
  }

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

function closeModalContent() {
  modalContentSlideOutDown();
  setTimeout(() => {
    closeModal();
  }, 600);
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("open-modal");
  document.body.classList.remove("lockScroll");
}

function startHavaleEftTimer(stateHolder) {
  const timerDisplay = document.getElementById("resend-email-timer");
  const resendBtn = document.getElementById(
    "havale-eft-payment-method-resend-email-btn",
  );

  if (!timerDisplay || !resendBtn) return;

  let timeLeft = 30;
  resendBtn.disabled = true;
  timerDisplay.innerText = "00:30";

  clearInterval(stateHolder.countdownInterval);

  stateHolder.countdownInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `00:${timeLeft < 10 ? "0" : ""}${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(stateHolder.countdownInterval);
      resendBtn.disabled = false;
    }
  }, 1000);
}

function showTooltip(inputElement, tooltipId, message) {
  const tooltip = document.getElementById(tooltipId);
  if (!tooltip) return;

  const tooltipText = tooltip.querySelector(".tooltip-text");
  if (tooltipText) {
    tooltipText.textContent = message;
  }

  tooltip.classList.remove("hidden");
}

function showTooltip(inputElement, tooltipId, message) {
  if (!document.getElementById(tooltipId)) return;

  if (document.querySelector(`#${tooltipId} .tooltip-text`)) {
    document.querySelector(`#${tooltipId} .tooltip-text`).textContent = message;
  }

  document.getElementById(tooltipId).classList.remove("hidden");
}

function hideTooltip(inputElement, tooltipId) {
  if (document.getElementById(tooltipId)) {
    document.getElementById(tooltipId).classList.add("hidden");
  }
}

function resetCheckoutModal() {
  if (document.getElementById("checkout-form")) {
    document.getElementById("checkout-form").reset();
  }

  hideTooltip(null, "firstNameTooltip");
  hideTooltip(null, "lastNameTooltip");
  hideTooltip(null, "emailTooltip");
}

function run() {
  let fadeTimeout;
  let checkoutPrice = 0;

  const checkoutCurrency = "TL";
  const pill = document.getElementById("scroll-pill");
  const track = document.getElementById("scroll-track");
  const modalContainer = document.querySelector(".checkout-content");

  const updatePill = () => {
    track.classList.add("visible");

    clearTimeout(fadeTimeout);

    const scrolled = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

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

  const heroBtn = document.getElementById("hero-btn");
  const pricingBtn = document.querySelectorAll(".pricing-btn");
  const modalCloseBtn = document.querySelectorAll(".modal-close-btn");
  const modalReturnBtn = document.querySelectorAll(".modal-return-btn");
  const checkoutForm = document.getElementById("checkout-form");
  const havaleEftPaymentMethodConfirmBtn = document.getElementById(
    "havale-eft-payment-method-confirm-btn",
  );
  const timerState = { countdownInterval: null };
  const resendEmailBtn = document.getElementById(
    "havale-eft-payment-method-resend-email-btn",
  );
  const scroller = document.querySelector(".scroller");
  const links = scroller ? scroller.querySelectorAll("a") : [];

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

  window.addEventListener("scroll", updatePill, { passive: true });
  if (modalContainer) {
    modalContainer.addEventListener("scroll", updatePill);
  }

  document
    .getElementById("lang-en")
    .addEventListener("click", () => setLanguage("en"));
  document
    .getElementById("lang-tr")
    .addEventListener("click", () => setLanguage("tr"));

  if (heroBtn) {
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
  }

  pricingBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const price = btn.getAttribute("data-price");
      checkoutPrice = price;
      document.getElementById("checkout-price").innerText =
        price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        " " +
        checkoutCurrency;

      openModal();
      modalContentSlideInUp("checkout");
    });
  });

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();

    let hasError = false;

    // 1. Validate First Name (Client-side)
    if (!firstName) {
      showTooltip(
        firstNameInput,
        "firstNameTooltip",
        document.querySelector("#firstName ~ .val-empty").innerText,
      );
      hasError = true;
    } else {
      hideTooltip(firstNameInput, "firstNameTooltip");
    }

    // 2. Validate Last Name (Client-side)
    if (!lastName) {
      showTooltip(
        lastNameInput,
        "lastNameTooltip",
        document.querySelector("#lastName ~ .val-empty").innerText,
      );
      hasError = true;
    } else {
      hideTooltip(lastNameInput, "lastNameTooltip");
    }

    // 3. Validate Empty Email (Client-side)
    if (!email) {
      showTooltip(
        emailInput,
        "emailTooltip",
        document.querySelector("#email ~ .val-empty").innerText,
      );
      hasError = true;
    } else {
      hideTooltip(emailInput, "emailTooltip");
    }

    // Stop here if any field is empty
    if (hasError) return;

    // 4. Send request to Node server
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await response.json();

      // 5. Handle Server Signals
      if (data.code === "EMAIL_INVALID") {
        showTooltip(
          emailInput,
          "emailTooltip",
          document.querySelector("#email ~ .val-invalid").innerText,
        );
      } else if (data.code === "EMAIL_SENT") {
        hideTooltip(emailInput, "emailTooltip");

        // Slide to next modal step and start timer
        modalContentSlideOutDown();
        setTimeout(() => {
          modalContentSlideInUp("havale-eft-payment-method");
          startHavaleEftTimer(timerState);
        }, 580);
      }
    } catch (error) {
      console.error("Network error:", error);
      // Display server connection error tooltip
      showTooltip(
        emailInput,
        "emailTooltip",
        language[currentlang].billingForm.validation.serverError,
      );
    }
  });

  modalReturnBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearInterval(timerState.countdownInterval);
      modalContentSlideOutDown();
      setTimeout(() => {
        modalContentSlideInDown("checkout");
      }, 580);
    });
  });

  modalCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearInterval(timerState.countdownInterval);
      closeModalContent();
      setTimeout(() => {
        resetCheckoutModal();
        checkoutPrice = 0;
      }, 600);
    });
  });

  window.addEventListener("click", (e) => {
    if (typeof modal === "undefined") return;

    const transactionConfirmation = document.querySelector(
      ".payment-confirmation.modal-content.modal-content-slide-in-up",
    );

    if (transactionConfirmation) {
      if (e.target === modal || e.target.closest(".payment-confirmation")) {
        modalContentSlideOutUp();
        setTimeout(() => closeModal(), 600);
      }
    } else {
      if (e.target === modal) {
        clearInterval(timerState.countdownInterval);
        closeModalContent();
        setTimeout(() => {
          resetCheckoutModal();
          checkoutPrice = 0;
        }, 600);
      }
    }
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (scroller) scroller.classList.add("paused");
    });
    link.addEventListener("mouseleave", () => {
      if (scroller) scroller.classList.remove("paused");
    });
  });
}

run();
