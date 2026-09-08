export type Locale = "ru" | "en" | "el";

export const LOCALES: Locale[] = ["ru", "en", "el"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  el: "ΕΛ",
};

export const LOCALE_LANG: Record<Locale, string> = {
  ru: "ru",
  en: "en",
  el: "el",
};

export const STORAGE_KEY = "berezhny-locale";

export type NavItemCopy = {
  href: string;
  label: string;
};

export type CrossSellCopy = {
  title: string;
  text: string;
  cta: string;
};

export type CategoryCopy = {
  navLabel: string;
  title: string;
  desire: string;
  desireLead: string;
  description: string;
  cta: string;
  imageAlt: string;
};

export type ServiceCopy = {
  name: string;
  short: string;
  difference: string;
  priceDependsOn: string[];
  extra: string;
  crossSell: CrossSellCopy;
};

export type QuizOptionCopy = {
  value: string;
  label: string;
};

export type QuizStepCopy = {
  key: string;
  question: string;
  options: QuizOptionCopy[];
};

export type QuizPackCopy = {
  title: string;
  steps: QuizStepCopy[];
};

export type QuizResultCopy = {
  headline: string;
  summary: string;
  details: string[];
  alternatives?: { name: string; reason: string }[];
};

export type SiteCopy = {
  skipToContent: string;
  brand: string;
  navAria: string;
  mobileNavAria: string;
  openMenu: string;
  closeMenu: string;
  book: string;
  nav: NavItemCopy[];
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    description: string;
    pickProcedure: string;
    book: string;
    unsureTitle: string;
    unsureText: string;
    pickProcedureArrow: string;
    photoAlt: string;
  };
  ui: {
    pickProcedure: string;
    book: string;
    lookDirection: string;
    more: string;
    back: string;
    next: string;
    consultationNeeded: string;
    priceDepends: string;
    before: string;
    after: string;
    compareAria: string;
    loadingQuiz: string;
    loadingBooking: string;
    privacyLink: string;
    stepOf: string;
    all: string;
    seeAllPrices: string;
    bookConsultation: string;
    bookMaster: string;
    bookMasterNamed: string;
    crossSellEyebrow: string;
    similarWork: string;
    discussWithMaster: string;
    directionHair: string;
    directionExtensions: string;
    directionLashes: string;
    directionBrows: string;
    directionComplex: string;
    photoPlaceholder: string;
    languageSwitchAria: string;
    priceFromPlaceholder: string;
    durationPlaceholder: string;
  };
  desire: {
    eyebrow: string;
    title: string;
    text: string;
    complexDesire: string;
    complexLead: string;
    complexAlt: string;
  };
  directions: {
    eyebrow: string;
    title: string;
  };
  process: {
    eyebrow: string;
    title: string;
    text: string;
    steps: { title: string; text: string }[];
  };
  beautyPick: {
    eyebrow: string;
    title: string;
    text: string;
    note: string;
    cta: string;
    photoAlt: string;
  };
  methods: {
    eyebrow: string;
    title: string;
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    headingDirection: string;
    headingGallery: string;
    text: string;
    filterAria: string;
    items: Record<string, { title: string; caption: string }>;
  };
  transformation: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    photoAlt: string;
  };
  masters: {
    eyebrow: string;
    title: string;
    text: string;
    items: Record<string, { name: string; experience: string; specialization: string; quote: string; photoAlt: string; works: string[] }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    text: string;
    task: string;
    result: string;
    impression: string;
    photoAlt: string;
    items: Record<string, { name: string; procedure: string; problem: string; result: string; impression: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    text: string;
    installment: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  bookingCta: {
    title: string;
    text: string;
    aboutTitle: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    address: string;
    phone: string;
    messengers: string;
    social: string;
    hours: string;
    route: string;
    mapTitle: string;
    mapSoon: string;
    mapHint: string;
  };
  footer: {
    navigation: string;
    contacts: string;
    connect: string;
    privacy: string;
  };
  sticky: {
    pick: string;
    book: string;
  };
  philosophy: string;
  categories: Record<string, CategoryCopy>;
  services: Record<string, ServiceCopy>;
  pages: {
    services: { eyebrow: string; title: string; text: string; imageAlt: string };
    works: { eyebrow: string; title: string; text: string; imageAlt: string };
    masters: { eyebrow: string; title: string; text: string; imageAlt: string };
    prices: { eyebrow: string; title: string; text: string };
    about: { eyebrow: string; title: string; text: string; imageAlt: string; scenariosTitle: string; naturalTitle: string; naturalText: string; newLookTitle: string; newLookText: string; photoAlt: string };
    faq: { eyebrow: string; title: string; text: string };
    contacts: { eyebrow: string; title: string; text: string };
  };
  direction: {
    methodsTitle: string;
    quizTitles: Record<string, string>;
  };
  quiz: {
    eyebrow: string;
    choiceTitle: string;
    choiceText: string;
    complexTitle: string;
    contactQuestion: string;
    contactLead: string;
    name: string;
    phone: string;
    photoOptional: string;
    photoHint: string;
    photoChosen: string;
    consent: string;
    errorContact: string;
    errorConsent: string;
    saving: string;
    showRecommendation: string;
    directionLine: string;
    modes: Record<string, { label: string; text: string }>;
    hair: QuizPackCopy;
    extensions: QuizPackCopy;
    lashes: QuizPackCopy;
    brows: QuizPackCopy;
    complex: QuizPackCopy;
    results: Record<string, QuizResultCopy>;
    browShape: Record<string, string>;
    browIntensity: Record<string, string>;
    keepLabels: Record<string, string>;
    recommendationEyebrow: string;
    thanks: string;
    moreToDiscuss: string;
    cost: string;
    duration: string;
    master: string;
    placeholderNote: string;
    overplucked: string;
    buildFromHair: string;
    intensityLine: string;
    noMakeupLine: string;
    withMakeupLine: string;
    complexKeepEmpty: string;
    complexKeepPrefix: string;
    complexPlan: Record<string, string>;
    complexEmptyPlan: string;
    complexPhotoLine: string;
    extVolume: Record<string, string>;
    extLength: Record<string, string>;
    extSummary: string;
    extPriceLine: string;
    extCorrectionLine: string;
    extMethodPrefix: string;
  };
  wizard: {
    iframeTitle: string;
    acceptedEyebrow: string;
    acceptedTitle: string;
    acceptedText: string;
    acceptedNote: string;
    openBooking: string;
    placeholderNote: string;
    canOpenService: string;
    openOnline: string;
    error: string;
    confirm: string;
    serviceStep: string;
    masterStep: string;
    dateStep: string;
    timeStep: string;
    contactStep: string;
    questions: string[];
    consultationFallback: string;
    masterLabel: string;
    preferredTime: string;
  };
};

export type HeaderHeroCopy = SiteCopy;
