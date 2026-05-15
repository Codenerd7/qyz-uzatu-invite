const eventData = {
  brideName: "Liana",
  eventTitle: "Qyz Uzatu",
  date: {
    ru: "02 июля 2026",
    kz: "02 Шілде 2026"
  },
  time: "16:00",
  venue: "Altyn Hall",
  address: {
    ru: "ул. Чокина, 98",
    kz: "Чокина көшесі, 88"
  },
  city: {
    ru: "Павлодар",
    kz: "Павлодар"
  },
  mapLink: "https://2gis.kz/pavlodar/geo/70000001102699747",
  parentsNames: {
    ru: "Родители: Марат и Юлия",
    kz: "Ата-анасы: Марат пен Юлия"
  },
  dressCodeText: {
    ru: "Просим поддержать атмосферу вечера в нежных и элегантных оттенках.",
    kz: "Кештің сәнін келтіру үшін нәзік әрі әсем түстердегі киім үлгісін таңдауыңызды сұраймыз."
  },
  formatText: {
    ru: "✨ Формат мероприятия: 16+\n\nПросим прийти без маленьких детей.\nБлагодарим за понимание.",
    kz: "✨ Іс-шара форматы: 16+\n\nКішкентай балаларсыз келуіңізді сұраймыз.\nТүсіністік танытқандарыңызға рақмет."
  },
  calendar: {
    monthIndex: 5,
    monthNumber: 6,
    year: 2026,
    highlightedDay: 2
  }
};

const translations = {
  ru: {
    choosePrompt: "Чтобы открыть приглашение, выберите язык",
    openHint: "Нажмите, чтобы открыть приглашение",
    mapButton: "Карта",
    openMapButton: "Открыть карту",
    dateLabel: "Дата",
    timeLabel: "Время",
    venueLabel: "Место",
    inviteLine1: "С радостью приглашаем Вас",
    inviteLine2: "на Қыз Ұзату нашей дочери.",
    inviteLine3: "Будем рады разделить с Вами этот особенный день.",
    addressTitle: "Место проведения",
    addressLabel: "Адрес:",
    dressCodeTitle: "Дресс-код",
    formatTitle: "Формат мероприятия",
    finalLine: "С нетерпением ждём Вас!",
    calendarMonth: "Июля",
    weekdayMon: "Пн",
    weekdayTue: "Вт",
    weekdayWed: "Ср",
    weekdayThu: "Чт",
    weekdayFri: "Пт",
    weekdaySat: "Сб",
    weekdaySun: "Вс",
    guestGreeting: (name) => name ? `Уважаемый(ая) ${name}!` : "Уважаемые гости!"
  },
  kz: {
    choosePrompt: "Шақыруды ашу үшін тілді таңдаңыз",
    openHint: "Шақыруды ашу үшін басыңыз",
    mapButton: "Картаны ашу",
    openMapButton: "Картаны ашу",
    dateLabel: "Күні",
    timeLabel: "Уақыты",
    venueLabel: "Өтетін орны",
    inviteLine1: "Сіздерді аяулы қызымыздың",
    inviteLine2: "Қыз Ұзату тойына шақырамыз.",
    inviteLine3: "Қуанышымызды бірге бөлісуге шын жүректен қуаныштымыз.",
    addressTitle: "Өтетін орны",
    addressLabel: "Мекенжайы:",
    dressCodeTitle: "Дресс-код",
    formatTitle: "Іс-шара форматы",
    finalLine: "Сіздерді асыға күтеміз!",
    calendarMonth: "Шілде",
    weekdayMon: "Дс",
    weekdayTue: "Сс",
    weekdayWed: "Ср",
    weekdayThu: "Бс",
    weekdayFri: "Жм",
    weekdaySat: "Сн",
    weekdaySun: "Жс",
    guestGreeting: (name) => name ? `Құрметті ${name}!` : "Құрметті қонақтар!"
  }
};

const state = {
  lang: "ru",
  hasOpenedEnvelope: false,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  guestName: new URLSearchParams(window.location.search).get("name")?.trim() || ""
};

let envelopeFloatTimer = 0;

const elements = {
  html: document.documentElement,
  languageScreen: document.getElementById("language-screen"),
  invitationFlow: document.getElementById("invitation-flow"),
  envelopeStage: document.getElementById("envelopeStage"),
  envelopeButton: document.getElementById("envelopeButton"),
  invitationCard: document.getElementById("invitationCard"),
  scenePortrait: document.getElementById("scenePortrait"),
  greetingText: document.getElementById("greetingText"),
  dressCodeText: document.getElementById("dressCodeText"),
  formatText: document.getElementById("formatText"),
  mapButtons: [
    document.getElementById("envelopeMapBtn"),
    document.getElementById("mapButtonTop"),
    document.getElementById("mapButtonBottom")
  ],
  calendarGrid: document.getElementById("calendarGrid"),
  langButtons: Array.from(document.querySelectorAll("[data-lang]")),
  i18nNodes: Array.from(document.querySelectorAll("[data-i18n]")),
  bindNodes: Array.from(document.querySelectorAll("[data-bind]")),
  revealNodes: Array.from(document.querySelectorAll(".reveal-on-scroll"))
};

function applyLanguage(lang) {
  state.lang = translations[lang] ? lang : "ru";
  elements.html.lang = state.lang;

  elements.i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    const value = translations[state.lang][key];
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  elements.bindNodes.forEach((node) => {
    const key = node.dataset.bind;
    let value = eventData[key];

    if (key === "calendarYear") {
      value = eventData.calendar.year;
    }

    if (value && typeof value === "object" && !Array.isArray(value) && ("ru" in value || "kz" in value)) {
      value = value[state.lang] ?? value.ru ?? value.kz ?? "";
    }

    if (value !== undefined && value !== null) {
      node.textContent = value;
    }
  });

  elements.greetingText.textContent = translations[state.lang].guestGreeting(state.guestName);
  elements.dressCodeText.textContent = eventData.dressCodeText[state.lang];
  elements.formatText.textContent = eventData.formatText[state.lang];

  elements.mapButtons.forEach((button) => {
    if (button) {
      button.href = eventData.mapLink;
    }
  });

  renderCalendar();
}

function renderCalendar() {
  const { monthIndex, year, highlightedDay } = eventData.calendar;
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  elements.calendarGrid.innerHTML = "";

  for (let i = 0; i < startOffset; i += 1) {
    const emptyCell = document.createElement("span");
    emptyCell.className = "calendar-day is-empty";
    emptyCell.textContent = "";
    elements.calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("span");
    cell.className = "calendar-day";
    cell.textContent = day;

    if (day === highlightedDay) {
      cell.classList.add("is-highlighted");
    }

    elements.calendarGrid.appendChild(cell);
  }
}

function revealInvitationFlow() {
  elements.languageScreen.classList.remove("active");
  elements.languageScreen.classList.add("hidden");
  elements.invitationFlow.classList.remove("hidden");

  if (!elements.envelopeButton) {
    return;
  }

  window.clearTimeout(envelopeFloatTimer);
  elements.envelopeButton.classList.remove("is-floating", "is-opening", "is-open");

  if (state.reducedMotion) {
    return;
  }

  elements.envelopeButton.classList.add("is-entering");
  envelopeFloatTimer = window.setTimeout(() => {
    if (state.hasOpenedEnvelope) {
      return;
    }

    elements.envelopeButton.classList.remove("is-entering");
    elements.envelopeButton.classList.add("is-floating");
  }, 900);
}

function openEnvelope() {
  if (state.hasOpenedEnvelope) {
    return;
  }

  state.hasOpenedEnvelope = true;

  window.clearTimeout(envelopeFloatTimer);
  elements.envelopeButton.classList.remove("is-entering", "is-floating");

  elements.envelopeButton.classList.add("is-opening");
  elements.envelopeStage?.classList.add("is-opening");

  elements.invitationCard?.setAttribute("aria-hidden", "false");
  elements.scenePortrait?.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    elements.envelopeButton.classList.add("is-open");
    elements.envelopeStage?.classList.add("is-open");
    elements.envelopeButton.setAttribute("aria-expanded", "true");
  }, state.reducedMotion ? 0 : 180);

  /*
    Даём гостю увидеть открытый конверт:
    flap открылся, карточка и фото торчат из front.
    Только после паузы убираем PNG-слои конверта.
  */
  window.setTimeout(() => {
    elements.envelopeStage?.classList.add("is-settled");
  }, state.reducedMotion ? 0 : 2800);
}

function setupScrollReveal() {
  if (state.reducedMotion || !("IntersectionObserver" in window)) {
    elements.revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15
  });

  elements.revealNodes.forEach((node) => observer.observe(node));
}

function setupEvents() {
  elements.langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
      revealInvitationFlow();
    });
  });

  elements.envelopeButton.addEventListener("click", openEnvelope);

  elements.envelopeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEnvelope();
    }
  });
}

applyLanguage(state.lang);
setupEvents();
setupScrollReveal();
