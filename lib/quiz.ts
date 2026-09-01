import {
  categories,
  getMasterForDirection,
  portfolio,
  type DirectionId,
  type ServiceItem,
} from "./content";

export type HairGoal = "smooth" | "restore" | "volume" | "length" | "protect" | "all";
export type HairConcern = "frizz" | "breakage" | "thin" | "colored" | "hard-style" | "other";
export type StyleTime = "none" | "short" | "when-needed";
export type EffectDuration = "short" | "medium" | "long";
export type HairSpecial = "gentle" | "no-formaldehyde" | "hypoallergenic" | "other";

export type ExtLength = "short" | "bob" | "medium" | "long";
export type ExtDensity = "thin" | "medium" | "thick";
export type ExtDesiredLength = "medium" | "long" | "very-long";
export type ExtVolume = "natural" | "fuller" | "max";
export type ExtLook = "natural" | "noticeable" | "hollywood";

export type LashMood = "everyday" | "open" | "textured" | "bold" | "creative";
export type LashLifestyle = "no-makeup" | "light" | "statement";
export type LashMaterial = "own" | "extensions" | "unsure";

export type BrowState = "sparse" | "uneven" | "overplucked" | "ok" | "other";
export type BrowShape = "soft" | "graphic" | "full";
export type BrowIntensity = "sheer" | "medium" | "saturated";
export type BrowMakeup = "none" | "light" | "full";

export type ComplexKeep = "hair" | "lashes" | "brows" | "natural-all";
export type ComplexChange = "hair" | "lashes" | "brows";
export type ComplexStyle = "natural" | "new-look";

export interface ContactLead {
  name: string;
  contact: string;
  consent: boolean;
  photoName?: string;
}

export interface QuizResult {
  headline: string;
  serviceId: string;
  serviceName: string;
  direction: DirectionId;
  summary: string;
  details: string[];
  alternatives?: { name: string; reason: string }[];
  priceFrom: string;
  duration: string;
  masterId: string;
  portfolioIds: string[];
  extras?: Record<string, string>;
}

function serviceById(id: string): ServiceItem {
  for (const category of categories) {
    const found = category.services.find((item) => item.id === id);
    if (found) return found;
  }
  return categories[0].services[0];
}

function pack(serviceId: string, direction: DirectionId, headline: string, summary: string, details: string[], extras?: Record<string, string>, alternatives?: QuizResult["alternatives"]): QuizResult {
  const service = serviceById(serviceId);
  const master = getMasterForDirection(direction);
  const related = portfolio.filter((item) => item.category === direction).map((item) => item.id);

  return {
    headline,
    serviceId,
    serviceName: service.name,
    direction,
    summary,
    details,
    alternatives,
    priceFrom: service.priceFrom,
    duration: service.duration,
    masterId: master.id,
    portfolioIds: related,
    extras,
  };
}

export function recommendHair(input: {
  goal: HairGoal;
  concern: HairConcern;
  time: StyleTime;
  duration: EffectDuration;
  special: HairSpecial;
}): QuizResult {
  if (input.goal === "length") {
    return pack(
      "capsule",
      "extensions",
      "Ваш вариант — подобрать наращивание",
      "По ответам вам важна длина. Выпрямление и уход меняют качество волос, но не добавляют недостающую длину. Дальше мастер подберёт метод наращивания под густоту и желаемый объём.",
      [
        "Сначала смотрим исходную длину и плотность своих волос.",
        "Метод выбираем так, чтобы стык выглядел естественно.",
        "Если волосам нужен уход, его можно обсудить отдельно — не вместо длины.",
      ],
    );
  }

  if (input.goal === "restore" || input.concern === "breakage") {
    return pack(
      "restore",
      "hair",
      "Ваш вариант — восстановление волос",
      "Сейчас важнее качество волос, чем эффект выпрямления. Восстановление помогает сделать волосы спокойнее на ощупь; мастер подтвердит протокол после осмотра.",
      [
        "Выпрямление не всегда первый шаг, если волосы ломкие.",
        "После диагностики можно решить, нужен ли следующий этап.",
        "Домашний уход будет частью рекомендации, а не дополнением «на всякий случай».",
      ],
      undefined,
      input.special === "gentle" || input.special === "no-formaldehyde"
        ? [{ name: "Био-выпрямление", reason: "Можно обсудить позже, если захотите гладкость более мягким составом." }]
        : undefined,
    );
  }

  if (input.special === "no-formaldehyde" || input.special === "gentle") {
    return pack(
      "bio",
      "hair",
      "Ваш вариант — био-выпрямление",
      "Вам важны гладкость и более бережный состав. Био-выпрямление часто рассматривают в таких запросах, но мастер всё равно сверит метод с исходным состоянием волос.",
      [
        "Состав подтверждаем только после диагностики.",
        "Если волосам сейчас нужен другой протокол, мастер предложит его до начала работы.",
        "Эффект и срок зависят от ваших волос и ухода после процедуры.",
      ],
    );
  }

  if (input.goal === "protect") {
    return pack(
      "care",
      "hair",
      "Ваш вариант — уходовая процедура",
      "Вам важнее защита и качество волос, чем долговременное выпрямление. Начнём с ухода, а более длительный метод обсудим, если он действительно нужен.",
      [
        "Уход не заменяет выпрямление и не обещает эффект «на месяцы».",
        "Это спокойный способ понять, как волосы отвечают на профессиональный протокол.",
        "Если позже захотите гладкость на срок, подберём метод отдельно.",
      ],
    );
  }

  if (input.goal === "volume" && input.concern === "thin") {
    return pack(
      "microcapsule",
      "extensions",
      "Ваш вариант — обсудить микрокапсульное наращивание",
      "По ответам вам важны объём и плотность, а свои волосы скорее тонкие. Наращивание может дать густоту, которой нельзя честно обещать от выпрямления.",
      [
        "Мастер оценит, достаточно ли своих волос для аккуратного наращивания.",
        "Если нужнее качество, а не объём, можно начать с восстановления.",
        "Метод и объём прядей подтверждаем только после осмотра.",
      ],
    );
  }

  if (input.duration === "long" && (input.goal === "smooth" || input.goal === "all") && input.time === "none") {
    return pack(
      "nanoplastia",
      "hair",
      "Ваш вариант — нанопластика",
      "По вашим ответам вам важны гладкость, более спокойная укладка и длительный эффект. Перед процедурой мастер дополнительно оценит состояние волос и подтвердит подходящий состав.",
      [
        "Нанопластику не ставим «по умолчанию» — только если волосы к ней готовы.",
        "Окрашенные волосы не запрет, но требуют отдельного взгляда мастера.",
        "После процедуры вы получите рекомендации по домашнему уходу.",
      ],
    );
  }

  if (input.duration === "short") {
    return pack(
      "care",
      "hair",
      "Ваш вариант — уходовая процедура",
      "Вам ближе результат на ближайшее время, без долгого «послевкусия» процедуры. Уход даёт ощущение ухоженности здесь и сейчас.",
      [
        "Если позже понадобится более длительная гладкость, метод можно подобрать отдельно.",
        "Мастер подскажет, чего ждать от конкретного протокола.",
      ],
    );
  }

  return pack(
    "keratin",
    "hair",
    "Ваш вариант — кератиновое выпрямление",
    "По ответам вам важны гладкость и более послушные волосы в повседневной укладке. Кератин часто рассматривают именно для такого запроса. Мастер подтвердит состав после диагностики.",
    [
      "Метод подбираем под пушение, окрашивание и то, сколько времени вы готовы тратить на укладку.",
      "Если волосам нужен более мягкий состав или сначала восстановление — скажем до начала работы.",
      "Итоговая длительность эффекта зависит от ваших волос и ухода.",
    ],
  );
}

export function recommendExtensions(input: {
  current: ExtLength;
  density: ExtDensity;
  desired: ExtDesiredLength;
  volume: ExtVolume;
  look: ExtLook;
}): QuizResult {
  let method: string = "capsule";
  let headline = "Ваш вариант — капсульное наращивание";
  let volumeNote = "Ориентировочный объём мастер подтвердит по густоте своих волос.";
  let lengthNote = "Желаемую длину сверяем с тем, насколько естественно будет выглядеть переход.";

  if (input.look === "hollywood" || input.volume === "max") {
    method = "hollywood";
    headline = "Ваш вариант — голливудское наращивание";
    volumeNote = "Ориентировочный объём: более выразительный. Точное количество прядей — после осмотра.";
  } else if (input.density === "thin" || input.look === "natural") {
    method = input.density === "thin" ? "microcapsule" : "capsule";
    headline =
      method === "microcapsule"
        ? "Ваш вариант — микрокапсульное наращивание"
        : "Ваш вариант — капсульное наращивание";
    volumeNote =
      input.density === "thin"
        ? "Ориентировочный объём: умеренный, чтобы не перегрузить тонкие волосы."
        : "Ориентировочный объём: натуральная плотность без лишней тяжести.";
  } else if (input.look === "noticeable" && input.volume === "fuller") {
    method = "tape";
    headline = "Ваш вариант — ленточное наращивание";
    volumeNote = "Ориентировочный объём: заметно гуще своих волос, с ровной линией длины.";
  }

  if (input.desired === "very-long" && (input.current === "short" || input.current === "bob")) {
    lengthNote =
      "Запрос на очень большую длину с коротких волос требует особенно аккуратного подбора: мастер скажет, какой переход будет выглядеть естественно.";
  } else if (input.desired === "medium") {
    lengthNote = "Желаемая длина: средняя. Обычно это самый спокойный и естественный переход.";
  } else {
    lengthNote = "Желаемая длина: длинные волосы. Стык и объём подбираем так, чтобы длина не выглядела отдельной конструкцией.";
  }

  return pack(
    method,
    "extensions",
    headline,
    "Калькулятор показывает ориентир, а не готовый рецепт. Финальный метод, объём и стоимость мастер подтвердит по вашим волосам.",
    [
      volumeNote,
      lengthNote,
      `Предварительный диапазон стоимости: [ДИАПАЗОН СТОИМОСТИ] — зависит от объёма, длины и метода.`,
      "Коррекцию планируем заранее, чтобы результат оставался аккуратным.",
    ],
    {
      method: headline.replace("Ваш вариант — ", ""),
      volume: volumeNote,
      length: lengthNote,
      priceRange: "[ДИАПАЗОН СТОИМОСТИ]",
    },
  );
}

export function recommendLashes(input: {
  mood: LashMood;
  lifestyle: LashLifestyle;
  material: LashMaterial;
}): QuizResult {
  if (input.material === "own" || (input.lifestyle === "no-makeup" && input.mood === "everyday")) {
    return pack(
      "lamination-lashes",
      "lashes",
      "Вам могут подойти ламинирование и натуральный эффект",
      "По ответам вам ближе свои ресницы и спокойный повседневный взгляд. Ниже — 2–3 направления, которые обычно обсуждают в таком запросе.",
      [
        "Ламинирование: ухоженный взгляд без наращивания.",
        "Натуральный эффект наращивания: если своих ресниц мало, но хочется «как свои».",
        "Классика: самый тихий вариант наращивания, если ламинирования окажется недостаточно.",
      ],
      undefined,
      [
        { name: "Натуральные эффекты", reason: "Если захотите чуть больше длины, сохранив естественность." },
        { name: "Классическое наращивание", reason: "Если нужен аккуратный ряд без объёмных пучков." },
      ],
    );
  }

  const alternatives: { name: string; reason: string }[] = [];
  let main = "natural-effects";
  let headline = "Вам могут подойти натуральный и лисий эффекты";

  if (input.mood === "textured") {
    main = "wet";
    headline = "Вам могут подойти мокрый эффект и лучики";
    alternatives.push(
      { name: "Лучики", reason: "Если хочется воздуха и живого рисунка, а не плотного ряда." },
      { name: "Натуральный эффект", reason: "Если текстуру захочется сделать спокойнее." },
    );
  } else if (input.mood === "creative") {
    main = "creative";
    headline = "Вам могут подойти креативный эффект и цветные акценты";
    alternatives.push(
      { name: "Цветные акценты", reason: "Цвет можно добавить точечно, не собирая весь взгляд в яркий образ." },
      { name: "Мокрый эффект", reason: "Если хочется характер, но без цвета." },
    );
  } else if (input.mood === "bold" || input.lifestyle === "statement") {
    main = "volume-lashes";
    headline = "Вам могут подойти объёмный и более графичный эффекты";
    alternatives.push(
      { name: "Мокрый эффект", reason: "Если объём хочется, но с текстурой, а не с плотным полотном." },
      { name: "Креативный эффект", reason: "Если это образ, а не ежедневная норма." },
    );
  } else if (input.mood === "open") {
    main = "natural-effects";
    headline = "Вам могут подойти натуральный и лисий эффекты";
    alternatives.push(
      { name: "Лисий эффект", reason: "Часто выбирают, чтобы взгляд казался более вытянутым и открытым." },
      { name: "Лучики", reason: "Если хочется лёгкости, а не сплошной линии." },
    );
  } else {
    alternatives.push(
      { name: "Классическое наращивание", reason: "Самый спокойный объём." },
      { name: "Ламинирование", reason: "Если решите остаться на своих ресницах." },
    );
  }

  return pack(
    main,
    "lashes",
    headline,
    "Эффект ресниц подбирается по форме глаз и вашему ритму, а не только по красивому названию. Мастер сверит схему с исходными ресницами.",
    [
      "Не обязательно выбирать один вариант заранее — на консультации можно сравнить 2–3 схемы.",
      "Состояние своих ресниц важнее желаемого «максимума».",
      "После процедуры вы получите короткие правила ухода.",
    ],
    undefined,
    alternatives,
  );
}

export function recommendBrows(input: {
  state: BrowState;
  shape: BrowShape;
  intensity: BrowIntensity;
  makeup: BrowMakeup;
}): QuizResult {
  const shapeLabel =
    input.shape === "graphic" ? "более собранную, графичную форму" : input.shape === "full" ? "более плотную, наполненную форму" : "мягкую естественную форму";

  const intensityLabel =
    input.intensity === "sheer" ? "лёгкую" : input.intensity === "saturated" ? "более насыщенную" : "среднюю";

  let serviceId = "architecture";
  let headline = "Ваш вариант — архитектура бровей";

  if (input.makeup === "none" && (input.shape === "soft" || input.shape === "full")) {
    serviceId = "brow-care";
    headline = "Ваш вариант — комплексный уход за бровями";
  } else if (input.state === "ok" && input.shape === "soft") {
    serviceId = "tint";
    headline = "Ваш вариант — окрашивание с мягкой коррекцией";
  } else if (input.shape === "full" && input.state !== "overplucked") {
    serviceId = "lamination-brows";
    headline = "Ваш вариант — ламинирование и оформление формы";
  }

  return pack(
    serviceId,
    "brows",
    headline,
    `По ответам вам близка ${shapeLabel} и ${intensityLabel} интенсивность цвета. Процедуру подтверждаем по исходным бровям, а не по референсу «идеальных бровей».`,
    [
      input.state === "overplucked"
        ? "Если брови сильно прорежены, форма собирается постепенно — без обещания «сразу как на фото»."
        : "Форму строим из ваших волосков, а не рисуем чужой шаблон.",
      `Рекомендуемая интенсивность: ${intensityLabel}. Её можно сделать спокойнее прямо на процедуре.`,
      input.makeup === "none"
        ? "Если не хотите ежедневный макияж, обычно собирают форму + цвет, иногда с ламинированием."
        : "Если макияж остаётся в жизни, можно сделать более лёгкий салонный результат.",
    ],
  );
}

export function recommendComplex(input: {
  keep: ComplexKeep[];
  change: ComplexChange[];
  style: ComplexStyle;
}): QuizResult {
  const plan: string[] = [];
  let main: string = "care";
  let direction: DirectionId = "hair";

  if (input.change.includes("hair")) {
    main = input.style === "natural" ? "bio" : "nanoplastia";
    direction = "hair";
    plan.push(input.style === "natural" ? "Волосы: мягкий метод или уход — без радикальной смены характера." : "Волосы: более заметная гладкость или объём, если исходные данные позволяют.");
  }
  if (input.change.includes("lashes")) {
    if (!input.change.includes("hair")) {
      main = input.style === "natural" ? "lamination-lashes" : "volume-lashes";
      direction = "lashes";
    }
    plan.push(input.style === "natural" ? "Ресницы: ламинирование или натуральный эффект." : "Ресницы: более выразительный эффект, который всё равно должен жить с вашим лицом.");
  }
  if (input.change.includes("brows")) {
    if (!input.change.includes("hair") && !input.change.includes("lashes")) {
      main = "brow-care";
      direction = "brows";
    }
    plan.push("Брови: архитектура и цвет, чтобы лицо читалось без ежедневного карандаша.");
  }

  if (plan.length === 0) {
    plan.push("Похоже, вы хотите понять, что оставить. Beauty-подбор в салоне как раз про это: не менять всё сразу.");
  }

  const keepText =
    input.keep.length > 0
      ? `Оставляем без лишнего вмешательства: ${input.keep
          .map((item) => (item === "natural-all" ? "общий естественный характер" : item === "hair" ? "волосы" : item === "lashes" ? "ресницы" : "брови"))
          .join(", ")}.`
      : "Отметьте на консультации, что вам важно сохранить.";

  return pack(
    main,
    direction,
    "Ваш план — персональный Beauty-подбор",
    "Ниже — черновик из 2–3 шагов. Это не пакет со скидкой и не обязательный список. Мастер поможет решить, что менять, а что оставить.",
    [keepText, ...plan, "Фото, если вы его загрузили, поможет мастеру подготовиться. Если нет — достаточно ответов и живой диагностики."],
  );
}

export const hairQuestions = {
  title: "Что подойдёт именно моим волосам?",
  steps: [
    {
      key: "goal",
      question: "Какой результат вы хотите?",
      options: [
        { value: "smooth", label: "Гладкость" },
        { value: "restore", label: "Восстановление" },
        { value: "volume", label: "Объём" },
        { value: "length", label: "Длина" },
        { value: "protect", label: "Защита" },
        { value: "all", label: "Всё вместе" },
      ],
    },
    {
      key: "concern",
      question: "Что сейчас больше всего беспокоит?",
      options: [
        { value: "frizz", label: "Волосы пушатся" },
        { value: "breakage", label: "Ломаются" },
        { value: "thin", label: "Тонкие" },
        { value: "colored", label: "Окрашенные" },
        { value: "hard-style", label: "Сложно укладывать" },
        { value: "other", label: "Другое" },
      ],
    },
    {
      key: "time",
      question: "Сколько времени готовы тратить на укладку?",
      options: [
        { value: "none", label: "0 минут" },
        { value: "short", label: "10–15 минут" },
        { value: "when-needed", label: "Готова укладывать при необходимости" },
      ],
    },
    {
      key: "duration",
      question: "На какой срок хотите эффект?",
      options: [
        { value: "short", label: "1–2 месяца" },
        { value: "medium", label: "3–6 месяцев" },
        { value: "long", label: "Максимально надолго" },
      ],
    },
    {
      key: "special",
      question: "Есть ли особые пожелания?",
      options: [
        { value: "gentle", label: "Максимально бережный состав" },
        { value: "no-formaldehyde", label: "Без формальдегида" },
        { value: "hypoallergenic", label: "Гипоаллергенность" },
        { value: "other", label: "Другое" },
      ],
    },
  ],
};

export const extensionQuestions = {
  title: "Калькулятор идеального наращивания",
  steps: [
    {
      key: "current",
      question: "Какая у вас исходная длина?",
      options: [
        { value: "short", label: "Короткие" },
        { value: "bob", label: "Каре / до плеч" },
        { value: "medium", label: "Средние" },
        { value: "long", label: "Длинные" },
      ],
    },
    {
      key: "density",
      question: "Какая густота своих волос?",
      options: [
        { value: "thin", label: "Редкие / тонкие" },
        { value: "medium", label: "Средние" },
        { value: "thick", label: "Густые" },
      ],
    },
    {
      key: "desired",
      question: "Какой длины хотите?",
      options: [
        { value: "medium", label: "Средняя" },
        { value: "long", label: "Длинные" },
        { value: "very-long", label: "Очень длинные" },
      ],
    },
    {
      key: "volume",
      question: "Какой объём хотите?",
      options: [
        { value: "natural", label: "Как свои, только чуть плотнее" },
        { value: "fuller", label: "Заметно гуще" },
        { value: "max", label: "Максимально плотные" },
      ],
    },
    {
      key: "look",
      question: "Какой результат вам ближе?",
      options: [
        { value: "natural", label: "Чтобы не было видно, что это наращивание" },
        { value: "noticeable", label: "Хочу явно больше длины и густоты" },
        { value: "hollywood", label: "Хочу эффектный, «голливудский» объём" },
      ],
    },
  ],
};

export const lashQuestions = {
  title: "Какой эффект ресниц — ваш?",
  steps: [
    {
      key: "mood",
      question: "Какой взгляд вам ближе?",
      options: [
        { value: "everyday", label: "Как свои, только ухоженнее" },
        { value: "open", label: "Более открытый и собранный" },
        { value: "textured", label: "С текстурой: мокрый эффект или лучики" },
        { value: "bold", label: "Более плотный и заметный" },
        { value: "creative", label: "Хочу характер или цвет" },
      ],
    },
    {
      key: "lifestyle",
      question: "Как этот взгляд будет жить в вашей повседневности?",
      options: [
        { value: "no-makeup", label: "Почти без макияжа" },
        { value: "light", label: "Лёгкий макияж по настроению" },
        { value: "statement", label: "Хочу, чтобы ресницы были главным акцентом" },
      ],
    },
    {
      key: "material",
      question: "С чем вам спокойнее работать?",
      options: [
        { value: "own", label: "Со своими ресницами" },
        { value: "extensions", label: "Готова к наращиванию" },
        { value: "unsure", label: "Пока не знаю" },
      ],
    },
  ],
};

export const browQuestions = {
  title: "Подбор идеальной формы бровей",
  steps: [
    {
      key: "state",
      question: "Что описывает ваши брови сейчас?",
      options: [
        { value: "sparse", label: "Редкие" },
        { value: "uneven", label: "Неровные / разной формы" },
        { value: "overplucked", label: "Перещипанные" },
        { value: "ok", label: "Форма в целом есть" },
        { value: "other", label: "Другое" },
      ],
    },
    {
      key: "shape",
      question: "Какая форма вам ближе?",
      options: [
        { value: "soft", label: "Мягкая, естественная" },
        { value: "graphic", label: "Более графичная и собранная" },
        { value: "full", label: "Более плотная и широкая" },
      ],
    },
    {
      key: "intensity",
      question: "Какая интенсивность цвета нужна?",
      options: [
        { value: "sheer", label: "Едва заметная" },
        { value: "medium", label: "Средняя, чтобы брови читались" },
        { value: "saturated", label: "Более насыщенная" },
      ],
    },
    {
      key: "makeup",
      question: "Сколько времени готовы тратить на брови утром?",
      options: [
        { value: "none", label: "Не хочу ежедневный макияж бровей" },
        { value: "light", label: "Могу слегка подправить" },
        { value: "full", label: "Всё равно рисую сама" },
      ],
    },
  ],
};
