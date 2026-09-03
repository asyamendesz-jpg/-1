/**
 * Редактируемый контент сайта «Бережный уход».
 * Меняйте тексты, цены, мастеров, отзывы, контакты и фото здесь — компоненты подхватят данные сами.
 * Всё в квадратных скобках — placeholder. Не публикуйте эти значения как реальные факты салона.
 */
import type { Metadata } from "next";

export type DirectionId = "hair" | "extensions" | "lashes" | "brows" | "complex";

export type QuizMode = DirectionId | "choice";

export interface ServiceItem {
  id: string;
  name: string;
  short: string;
  difference: string;
  priceFrom: string;
  duration: string;
  priceDependsOn: string[];
  consultationRequired: boolean;
  extra?: string;
  portfolioFilter: DirectionId;
  crossSell: {
    title: string;
    text: string;
    href: string;
    cta: string;
  };
}

export interface ServiceCategory {
  id: DirectionId;
  slug: string;
  navLabel: string;
  title: string;
  desire: string;
  desireLead: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  href: string;
  quizHref: string;
  services: ServiceItem[];
}

export const site = {
  name: "Бережный уход",
  tagline: "Красота, которая остаётся вашей.",
  description:
    "Выпрямление и наращивание волос, ресницы и брови — с индивидуальным подбором процедуры и заботой о естественной красоте.",
  philosophy:
    "Мы не переделываем внешность. Помогаем подчеркнуть естественную красоту или собрать более яркий индивидуальный образ — если вы этого хотите.",
  url: "https://asyamendesz-jpg.github.io/-1",
  seo: {
    title: "Бережный уход — красота, которая остаётся вашей",
    description:
      "Салон бережного ухода: выпрямление и наращивание волос, ресницы и брови. Индивидуальный подбор процедуры без давления и агрессивных обещаний.",
  },
  contacts: {
    address: "[АДРЕС САЛОНА]",
    phone: "[ТЕЛЕФОН]",
    phoneHref: "[ТЕЛЕФОН_HREF, например tel:+7...]",
    whatsapp: "[WHATSAPP]",
    whatsappHref: "[ССЫЛКА НА WHATSAPP]",
    telegram: "[TELEGRAM]",
    telegramHref: "[ССЫЛКА НА TELEGRAM]",
    instagram: "[INSTAGRAM]",
    instagramHref: "[ССЫЛКА НА INSTAGRAM]",
    vk: "[VK]",
    vkHref: "[ССЫЛКА НА VK]",
    hours: "[ЧАСЫ РАБОТЫ]",
    mapEmbedUrl: "[ССЫЛКА НА КАРТУ / EMBED]",
    routeUrl: "[ССЫЛКА НА МАРШРУТ]",
    email: "[EMAIL]",
  },
  booking: {
    provider: "none" as "yclients" | "dikidi" | "custom" | "none",
    url: "[ССЫЛКА НА ОНЛАЙН-ЗАПИСЬ]",
    embedUrl: "[ССЫЛКА НА ВИДЖЕТ ЗАПИСИ]",
    note: "Когда появится ссылка YCLIENTS, DIKIDI или другого сервиса, вставьте её сюда — кнопки записи подхватят её автоматически.",
  },
  leads: {
    webhookUrl: "[WEBHOOK ДЛЯ ЗАЯВОК]",
  },
  legal: {
    legalName: "[НАИМЕНОВАНИЕ]",
    inn: "[ИНН]",
    privacyEmail: "[EMAIL ДЛЯ ЗАПРОСОВ ПО ПДН]",
  },
  installment: "[РАССРОЧКА: укажите условия, если салон её предоставляет. Если нет — удалите или оставьте пустым.]",
};

export const nav = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/raboty", label: "Работы" },
  { href: "/mastera", label: "Мастера" },
  { href: "/tseny", label: "Цены" },
  { href: "/o-salone", label: "О салоне" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
];

export const categories: ServiceCategory[] = [
  {
    id: "hair",
    slug: "volosy",
    navLabel: "Волосы",
    title: "Гладкие и ухоженные волосы",
    desire: "Хочу гладкие волосы",
    desireLead: "Кератин, нанопластика, био-выпрямление или восстановление — подберём по состоянию волос и желаемому результату.",
    description:
      "Подбираем метод не по названию процедуры, а по тому, какой результат вам нужен и в каком состоянии сейчас волосы.",
    cta: "Подобрать метод",
    image: "/images/salon/hair-straight-brunette.jpg",
    imageAlt: "Гладкие прямые волосы — работа салона",
    href: "/uslugi/volosy",
    quizHref: "/podbor?mode=hair",
    services: [
      {
        id: "keratin",
        name: "Кератиновое выпрямление",
        short: "Когда хочется гладкости и более спокойных волос в повседневной укладке.",
        difference:
          "Простым языком: помогает волосам меньше пушиться и проще укладываться. Часто выбирают, если беспокоит пушение и «непослушность», а не максимальная длина эффекта любой ценой.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: [
          "длина и густота волос",
          "исходное состояние",
          "необходимый объём состава",
        ],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "hair",
        crossSell: {
          title: "Поддерживающий уход",
          text: "Чтобы результат держался бережнее, мастер подскажет домашний уход после выпрямления.",
          href: "/uslugi/volosy#care",
          cta: "Посмотреть уход",
        },
      },
      {
        id: "nanoplastia",
        name: "Нанопластика",
        short: "Когда важны гладкость, блеск и более длительное ощущение ухоженности.",
        difference:
          "Простым языком: чаще рассматривают, если хочется более выраженной гладкости и блеска на более долгий срок. Подходит не всем волосам — мастер смотрит исходное состояние и подтверждает состав.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["длина и плотность", "состояние волос", "выбранный состав"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "hair",
        crossSell: {
          title: "Поддерживающий уход",
          text: "После процедуры важно аккуратно поддерживать результат дома.",
          href: "/uslugi/volosy#care",
          cta: "Посмотреть уход",
        },
      },
      {
        id: "bio",
        name: "Био-выпрямление",
        short: "Когда в приоритете более мягкий подход к составу.",
        difference:
          "Простым языком: к этому методу чаще приходят, если хочется более бережного состава и спокойного результата. Финальный выбор всегда после диагностики — названия сами по себе ничего не гарантируют.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["длина волос", "состояние", "особенности состава"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "hair",
        crossSell: {
          title: "Поддерживающий уход",
          text: "Мягкий результат тоже нуждается в правильном домашнем уходе.",
          href: "/uslugi/volosy#care",
          cta: "Посмотреть уход",
        },
      },
      {
        id: "restore",
        name: "Восстановление волос",
        short: "Когда важнее качество волос, чем эффект выпрямления.",
        difference:
          "Простым языком: фокус не на «сделать прямыми», а на том, чтобы волосы стали плотнее, мягче и спокойнее на ощупь. Иногда это первый шаг перед другими процедурами.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["степень повреждения", "длина", "протокол ухода"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "hair",
        crossSell: {
          title: "Домашний уход",
          text: "Мастер поможет собрать уход, который не перегружает волосы.",
          href: "/uslugi/volosy#care",
          cta: "Посмотреть уход",
        },
      },
      {
        id: "care",
        name: "Уходовые процедуры",
        short: "Для блеска, мягкости и более лёгкой укладки без долговременного выпрямления.",
        difference:
          "Простым языком: это ритуал ухода, а не метод «на месяцы вперёд». Подходит, если хочется освежить качество волос или аккуратно поддержать результат другой процедуры.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["длина", "выбранный протокол", "состояние волос"],
        consultationRequired: false,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "hair",
        crossSell: {
          title: "Подбор метода",
          text: "Если хочется более длительного эффекта, можно отдельно подобрать метод выпрямления.",
          href: "/podbor?mode=hair",
          cta: "Подобрать метод",
        },
      },
    ],
  },
  {
    id: "extensions",
    slug: "narashchivanie",
    navLabel: "Наращивание",
    title: "Длиннее и гуще",
    desire: "Хочу длиннее и гуще",
    desireLead: "Капсульное, микрокапсульное, ленточное или голливудское — метод зависит от ваших волос и желаемого образа.",
    description:
      "Наращивание подбираем так, чтобы длина и объём выглядели как ваши волосы, а не как отдельная конструкция.",
    cta: "Подобрать наращивание",
    image: "/images/salon/extensions-before-after-dark.jpg",
    imageAlt: "Наращивание волос — работа салона",
    href: "/uslugi/narashchivanie",
    quizHref: "/podbor?mode=extensions",
    services: [
      {
        id: "capsule",
        name: "Капсульное наращивание",
        short: "Классический метод, когда нужен естественный объём и подвижность.",
        difference:
          "Простым языком: пряди крепятся небольшими капсулами. Часто выбирают за естественность в движении и возможность собирать волосы.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["объём прядей", "длина", "густота своих волос"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Домашний уход и коррекция",
          text: "После наращивания мастер объяснит, как расчёсывать волосы и когда планировать коррекцию.",
          href: "/uslugi/narashchivanie#correction",
          cta: "О коррекции",
        },
      },
      {
        id: "microcapsule",
        name: "Микрокапсульное наращивание",
        short: "Когда свои волосы тонкие и важна максимально незаметная фиксация.",
        difference:
          "Простым языком: капсулы меньше обычных. Этот метод часто рассматривают для тонких волос, где хочется аккуратного стыка и лёгкости.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["объём", "длина", "особенности своих волос"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Домашний уход",
          text: "Для тонких волос особенно важен бережный уход и своевременная коррекция.",
          href: "/uslugi/narashchivanie#correction",
          cta: "О коррекции",
        },
      },
      {
        id: "tape",
        name: "Ленточное наращивание",
        short: "Когда хочется быстрее получить длину и объём с аккуратными лентами.",
        difference:
          "Простым языком: пряди крепятся на тонкие ленты. Часто выбирают за скорость процедуры и ровный объём. Не для каждого исходного состояния и не для каждого образа.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["количество лент", "длина", "густота"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Коррекция",
          text: "Ленты тоже требуют своевременного обслуживания — мастер подскажет ритм.",
          href: "/uslugi/narashchivanie#correction",
          cta: "О коррекции",
        },
      },
      {
        id: "hollywood",
        name: "Голливудское наращивание",
        short: "Когда нужен заметный объём и более выразительная длина.",
        difference:
          "Простым языком: метод для более эффектного результата. Подходит не всегда: мастер оценивает свои волосы, желаемый объём и то, насколько «невидимым» должен быть стык.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["объём", "длина", "техника укладки результата"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Домашний уход",
          text: "Выразительный объём дольше выглядит ухоженным, если за ним правильно ухаживать.",
          href: "/uslugi/narashchivanie#correction",
          cta: "О коррекции",
        },
      },
      {
        id: "correction",
        name: "Коррекция наращивания",
        short: "Чтобы длина и объём оставались аккуратными по мере отрастания.",
        difference:
          "Простым языком: свои волосы отрастают, крепления смещаются. Коррекция возвращает аккуратность и комфорт. Срок зависит от метода и ваших волос.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["метод наращивания", "объём", "состояние креплений"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Домашний уход",
          text: "Между коррекциями результат сильно зависит от того, как вы ухаживаете за волосами.",
          href: "/faq",
          cta: "Читать об уходе",
        },
      },
      {
        id: "removal",
        name: "Снятие наращивания",
        short: "Бережно снимаем пряди, если хотите паузу или сменить метод.",
        difference:
          "Простым языком: снятие — отдельная процедура, а не «просто убрать». Важно сделать это аккуратно по отношению к своим волосам.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["метод", "объём", "состояние креплений"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "extensions",
        crossSell: {
          title: "Восстановление волос",
          text: "После снятия можно обсудить уход за своими волосами.",
          href: "/uslugi/volosy",
          cta: "К уходу за волосами",
        },
      },
    ],
  },
  {
    id: "lashes",
    slug: "resnitsy",
    navLabel: "Ресницы",
    title: "Выразительный взгляд",
    desire: "Хочу выразительный взгляд",
    desireLead: "Наращивание или ламинирование — в зависимости от того, насколько естественным или заметным вы хотите видеть результат.",
    description:
      "Эффект подбираем под форму глаз и ваш ритм жизни: от едва заметного до более графичного, включая креативные акценты.",
    cta: "Подобрать эффект",
    image: "/images/salon/lashes-volume-closeup.jpg",
    imageAlt: "Наращивание ресниц — работа салона",
    href: "/uslugi/resnitsy",
    quizHref: "/podbor?mode=lashes",
    services: [
      {
        id: "classic-lashes",
        name: "Классическое наращивание",
        short: "Один к одному: аккуратный, естественный объём.",
        difference:
          "Простым языком: к каждой своей реснице крепится одна искусственная. Результат обычно самый «свой» и спокойный.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["состояние своих ресниц", "изгиб", "длина"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Если взгляд уже выразительный, брови часто становятся следующим логичным акцентом.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "volume-lashes",
        name: "Объёмное наращивание",
        short: "Когда хочется более плотного, заметного взгляда.",
        difference:
          "Простым языком: к своей реснице крепится пучок. Объём может быть мягким или более насыщенным — это обсуждается, а не ставится «по максимуму».",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["объём", "эффект", "состояние своих ресниц"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Выразительные ресницы лучше смотрятся в паре с аккуратной формой бровей.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "natural-effects",
        name: "Натуральные эффекты",
        short: "Когда хочется «как свои, только лучше».",
        difference:
          "Простым языком: схема длин и изгибов повторяет природный рост ресниц. Часто выбирают для повседневного образа без макияжа.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["эффект", "изгиб", "длина"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Натуральный взгляд обычно завершает мягкая архитектура бровей.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "wet",
        name: "Мокрый эффект",
        short: "Текстура, как будто ресницы чуть собраны после туши.",
        difference:
          "Простым языком: более собранные пучки и характерный «влажный» рисунок. Выглядит живее классики, но не обязательно драматично.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["насыщенность эффекта", "изгиб"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Текстурным ресницам хорошо подходят спокойные, чистые брови.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "rays",
        name: "Лучики",
        short: "Когда хочется воздуха, редких акцентов и живого рисунка.",
        difference:
          "Простым языком: отдельные более длинные ресницы создают «лучи». Эффект лёгкий и характерный, если не перегружать схему.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["схема", "длина акцентов"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Лучики хорошо живут в естественном образе — брови можно оставить мягкими.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "color",
        name: "Цветные акценты",
        short: "Для тех, кто хочет индивидуальность, а не только классику.",
        difference:
          "Простым языком: цвет можно добавить точечно — у внешнего края или внутри ряда. Это не обязательно «яркий образ на каждый день».",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["количество цвета", "эффект основы"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Цветной акцент лучше держит рамку, если брови собраны спокойно.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "creative",
        name: "Креативные эффекты",
        short: "Индивидуальная схема, если хочется новый образ, а не только натуральность.",
        difference:
          "Простым языком: мастер собирает рисунок под ваш запрос. Важно заранее понять, для какой жизни этот взгляд: на каждый день или для особенного случая.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["сложность схемы", "объём", "декор"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "К смелым ресницам брови обычно оставляют чистыми, чтобы образ не спорил сам с собой.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "lamination-lashes",
        name: "Ламинирование ресниц",
        short: "Когда хочется своих ресниц, только более заметных и ухоженных.",
        difference:
          "Простым языком: это работа с вашими ресницами, без наращивания. Часто выбирают, если не хочется коррекции наращивания, но нужен более открытый взгляд.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["исходная длина и жёсткость ресниц"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "Ламинирование ресниц часто сочетают с мягким оформлением бровей.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "lash-correction",
        name: "Коррекция наращивания ресниц",
        short: "Чтобы ряд оставался ровным по мере естественного обновления ресниц.",
        difference:
          "Простым языком: свои ресницы обновляются, поэтому ряд со временем редеет. Коррекция возвращает плотность. Срок индивидуален.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["состояние ряда", "эффект"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Оформление бровей",
          text: "На коррекции удобно сразу обновить и брови, если это вам близко.",
          href: "/uslugi/brovi",
          cta: "К бровям",
        },
      },
      {
        id: "lash-removal",
        name: "Снятие наращивания ресниц",
        short: "Аккуратно снимаем материал, если хотите паузу или сменить эффект.",
        difference:
          "Простым языком: самостоятельное снятие травматично для своих ресниц. В салоне материал снимают специально предназначенным способом.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["объём материала"],
        consultationRequired: false,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "lashes",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "После снятия можно обсудить уход за своими ресницами или ламинирование.",
          href: "/uslugi/resnitsy",
          cta: "К ламинированию",
        },
      },
    ],
  },
  {
    id: "brows",
    slug: "brovi",
    navLabel: "Брови",
    title: "Аккуратные брови",
    desire: "Хочу аккуратные брови без ежедневного макияжа",
    desireLead: "Архитектура, окрашивание, ламинирование или комплекс — в зависимости от исходной формы и желаемой интенсивности.",
    description:
      "Ищем форму, которая принадлежит вашему лицу. Не рисуем чужие брови и не обещаем одну «идеальную» схему для всех.",
    cta: "Подобрать форму и процедуру",
    image: "/images/salon/portrait-brows.jpg",
    imageAlt: "Оформление бровей — работа салона",
    href: "/uslugi/brovi",
    quizHref: "/podbor?mode=brows",
    services: [
      {
        id: "architecture",
        name: "Архитектура бровей",
        short: "Форма, которая учитывает ваши черты, а не тренд «для всех».",
        difference:
          "Простым языком: мастер собирает форму из того, что уже есть, а не навязывает чужой шаблон. Это основа, от которой зависят и окрашивание, и ламинирование.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["исходная форма", "необходимость коррекции"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "brows",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "Когда брови собраны, взгляд часто хочется поддержать мягким эффектом на ресницах.",
          href: "/uslugi/resnitsy",
          cta: "К ресницам",
        },
      },
      {
        id: "shape",
        name: "Коррекция формы",
        short: "Аккуратно убрать лишнее и сохранить характер бровей.",
        difference:
          "Простым языком: это не «выщипать всё». Коррекция поддерживает форму и чистоту контура, не ломая ваш естественный рисунок.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["исходная густота и форма"],
        consultationRequired: false,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "brows",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "Чистые брови хорошо сочетаются с ухоженными своими ресницами.",
          href: "/uslugi/resnitsy",
          cta: "К ресницам",
        },
      },
      {
        id: "tint",
        name: "Окрашивание бровей",
        short: "Мягкая или более насыщенная плотность цвета — по вашему запросу.",
        difference:
          "Простым языком: цвет помогает бровям читаться без карандаша. Интенсивность подбираем: от едва заметной до более графичной.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["исходный цвет", "желаемая интенсивность"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "brows",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "Окрашенные брови часто дополняют ламинированием ресниц, если не хочется наращивания.",
          href: "/uslugi/resnitsy",
          cta: "К ресницам",
        },
      },
      {
        id: "lamination-brows",
        name: "Ламинирование бровей",
        short: "Когда хочется уложить направление волосков и добавить плотности виду.",
        difference:
          "Простым языком: волоски фиксируются в более собранном направлении. Хорошо работает, если брови есть, но они «разъезжаются» в течение дня.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["жёсткость волосков", "исходная форма"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "brows",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "Комплекс «брови + свои ресницы» часто выбирают те, кто хочет меньше макияжа.",
          href: "/uslugi/resnitsy",
          cta: "К ресницам",
        },
      },
      {
        id: "brow-care",
        name: "Комплексный уход за бровями",
        short: "Форма, цвет и уход в одном визите — если хочется законченного результата.",
        difference:
          "Простым языком: мастер собирает несколько шагов в одну логичную процедуру, а не делает «всё подряд». Состав комплекса зависит от исходных бровей.",
        priceFrom: "[ЦЕНА ОТ]",
        duration: "[ДЛИТЕЛЬНОСТЬ]",
        priceDependsOn: ["какие этапы войдут в комплекс", "исходное состояние"],
        consultationRequired: true,
        extra: "[ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ]",
        portfolioFilter: "brows",
        crossSell: {
          title: "Ламинирование ресниц",
          text: "Если собираете образ без ежедневного макияжа, ресницы — естественное продолжение.",
          href: "/uslugi/resnitsy",
          cta: "К ресницам",
        },
      },
    ],
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Диагностика состояния волос",
    text: "Подбираем метод индивидуально. Сначала смотрим, что уже есть, и только потом говорим о процедуре.",
  },
  {
    num: "02",
    title: "Используем профессиональные составы",
    text: "Работаем с проверенными брендами и составами. [УТОЧНИТЬ ИСПОЛЬЗУЕМЫЕ БРЕНДЫ, КОГДА БУДЕТ СПИСОК]",
  },
  {
    num: "03",
    title: "Работаем бережно",
    text: "Подбираем процедуру с учётом состояния и особенностей клиента. Если метод не подходит — говорим об этом прямо.",
  },
  {
    num: "04",
    title: "Поддерживаем после процедуры",
    text: "Даём рекомендации и помогаем подобрать домашний уход, чтобы результат жил спокойно, а не «до первой мойки».",
  },
];

export interface PortfolioItem {
  id: string;
  category: DirectionId;
  title: string;
  caption: string;
  before: string;
  after: string;
  pair?: boolean;
  compare?: boolean;
  objectPosition?: string;
  afterObjectPosition?: string;
  afterScale?: number;
  isPlaceholder: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    id: "p1",
    category: "hair" as DirectionId,
    title: "Гладкость и блеск",
    caption: "До и после: выпрямление и уход за волосами.",
    before: "/images/ba-hair-before.jpg",
    after: "/images/ba-hair-after.jpg",
    afterObjectPosition: "28% 0%",
    afterScale: 1.28,
    isPlaceholder: false,
  },
  {
    id: "p2",
    category: "extensions" as DirectionId,
    title: "Длина и объём",
    caption: "До и после: наращивание светлых волос.",
    before: "/images/salon/extensions-before-after-blonde.jpg",
    after: "/images/salon/extensions-before-after-blonde.jpg",
    compare: false,
    isPlaceholder: false,
  },
  {
    id: "p8",
    category: "extensions" as DirectionId,
    title: "Длина и густота",
    caption: "До и после: наращивание тёмных волос.",
    before: "/images/salon/extensions-before-after-dark.jpg",
    after: "/images/salon/extensions-before-after-dark.jpg",
    compare: false,
    isPlaceholder: false,
  },
  {
    id: "p3",
    category: "lashes" as DirectionId,
    title: "Выразительный взгляд",
    caption: "До и после: взгляд до и после оформления.",
    before: "/images/salon/lashes-work-before.jpg",
    after: "/images/salon/lashes-work-after.jpg",
    isPlaceholder: false,
  },
  {
    id: "p6",
    category: "lashes" as DirectionId,
    title: "Объём ресниц",
    caption: "До и после: наращивание ресниц, один взгляд.",
    before: "/images/salon/lashes-before-after.jpg",
    after: "/images/salon/lashes-before-after.jpg",
    compare: false,
    isPlaceholder: false,
  },
  {
    id: "p4",
    category: "brows" as DirectionId,
    title: "Аккуратная форма",
    caption: "До и после: оформление бровей.",
    before: "/images/salon/brows-work-before.jpg",
    after: "/images/salon/brows-work-after.jpg",
    isPlaceholder: false,
  },
];

export const masters = [
  {
    id: "master-1",
    name: "[ИМЯ МАСТЕРА]",
    experience: "[ОПЫТ: например, 10 лет в работе с волосами]",
    specialization:
      "[СПЕЦИАЛИЗАЦИЯ: например, тонкие и повреждённые волосы, микро- и нанокапсульное наращивание]",
    quote: "[ПРИНЦИП РАБОТЫ МАСТЕРА: короткая человеческая цитата]",
    photo: "/images/process-care.jpg",
    photoAlt: "[ФОТО МАСТЕРА] Заменить на профессиональный портрет",
    directions: ["hair", "extensions"] as DirectionId[],
    works: [
      { src: "/images/salon/hair-straight-brunette.jpg", alt: "Работа мастера: волосы" },
      { src: "/images/salon/extensions-before-after-dark.jpg", alt: "Работа мастера: наращивание" },
    ],
    isPlaceholder: true,
  },
  {
    id: "master-2",
    name: "[ИМЯ МАСТЕРА]",
    experience: "[ОПЫТ: например, 7 лет в работе с ресницами]",
    specialization: "[СПЕЦИАЛИЗАЦИЯ: натуральные и креативные эффекты наращивания ресниц]",
    quote: "[ПРИНЦИП РАБОТЫ МАСТЕРА]",
    photo: "/images/salon/lashes-volume-macro.png",
    photoAlt: "[ФОТО МАСТЕРА] Заменить на профессиональный портрет",
    directions: ["lashes"] as DirectionId[],
    works: [
      { src: "/images/salon/lashes-volume-closeup.jpg", alt: "Работа мастера: ресницы" },
      { src: "/images/salon/lashes-volume-macro.png", alt: "Работа мастера: объём ресниц" },
    ],
    isPlaceholder: true,
  },
  {
    id: "master-3",
    name: "[ИМЯ МАСТЕРА]",
    experience: "[ОПЫТ: например, 6 лет в бровистике]",
    specialization: "[СПЕЦИАЛИЗАЦИЯ: архитектура, окрашивание, ламинирование бровей]",
    quote: "[ПРИНЦИП РАБОТЫ МАСТЕРА]",
    photo: "/images/salon/portrait-brows.jpg",
    photoAlt: "[ФОТО МАСТЕРА] Заменить на профессиональный портрет",
    directions: ["brows"] as DirectionId[],
    works: [
      { src: "/images/salon/brows-after.jpg", alt: "Работа мастера: брови" },
      { src: "/images/salon/brows-before.jpg", alt: "Работа мастера: брови до оформления" },
    ],
    isPlaceholder: true,
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "[ИМЯ КЛИЕНТА]",
    procedure: "[ПРОЦЕДУРА]",
    photo: "/images/salon/hair-straight-brunette.jpg",
    isPlaceholder: true,
    problem: "[ИСХОДНАЯ ПРОБЛЕМА: например, волосы пушились и долго укладывались]",
    result: "[РЕЗУЛЬТАТ: что изменилось после процедуры]",
    impression: "[ВПЕЧАТЛЕНИЕ КЛИЕНТА: живой текст отзыва, не «всё понравилось»]",
  },
  {
    id: "t2",
    name: "[ИМЯ КЛИЕНТА]",
    procedure: "[ПРОЦЕДУРА]",
    photo: "/images/salon/extensions-before-after-blonde.jpg",
    isPlaceholder: true,
    problem: "[ИСХОДНАЯ ПРОБЛЕМА]",
    result: "[РЕЗУЛЬТАТ]",
    impression: "[ВПЕЧАТЛЕНИЕ КЛИЕНТА]",
  },
  {
    id: "t3",
    name: "[ИМЯ КЛИЕНТА]",
    procedure: "[ПРОЦЕДУРА]",
    photo: "/images/salon/lashes-volume-closeup.jpg",
    isPlaceholder: true,
    problem: "[ИСХОДНАЯ ПРОБЛЕМА]",
    result: "[РЕЗУЛЬТАТ]",
    impression: "[ВПЕЧАТЛЕНИЕ КЛИЕНТА]",
  },
];

export const faq = [
  {
    q: "Испортит ли выпрямление волосы?",
    a: "Результат зависит от исходного состояния волос, выбранного состава и ухода после процедуры. Поэтому мы не предлагаем один метод всем и начинаем с диагностики. Если волосам сейчас нужен другой формат — восстановление или уход — мастер скажет об этом до начала работы. [УТОЧНИТЬ НЮАНСЫ ПО ИСПОЛЬЗУЕМЫМ СОСТАВАМ]",
  },
  {
    q: "Как понять, какая процедура мне подходит?",
    a: "Не обязательно знать названия. Достаточно описать, какой результат вы хотите и что беспокоит сейчас. На сайте можно пройти Beauty-подбор, а в салоне мастер сверит рекомендацию с реальным состоянием волос, ресниц или бровей.",
  },
  {
    q: "Можно ли делать процедуру на окрашенные волосы?",
    a: "Часто можно, но решение принимается после осмотра: важны свежесть окрашивания, качество волос и выбранный состав. Иногда мастер предложит сначала паузу или другой протокол. [УТОЧНИТЬ ПРОТОКОЛ САЛОНА ДЛЯ ОКРАШЕННЫХ ВОЛОС]",
  },
  {
    q: "Можно ли красить волосы после процедуры?",
    a: "Обычно да, но не сразу и не любым способом. Срок и формат зависят от процедуры и состояния волос. Точные рекомендации даёт мастер после работы. [УТОЧНИТЬ СРОК ДО ОКРАШИВАНИЯ]",
  },
  {
    q: "Сколько держится эффект?",
    a: "Срок индивидуален: он зависит от метода, исходных данных, домашнего ухода и того, как часто вы моете и укладываете волосы, обновляете ресницы или брови. На сайте мы не ставим одну цифру «для всех». Мастер сориентирует после диагностики. [УТОЧНИТЬ ОРИЕНТИРЫ ПО КАЖДОМУ МЕТОДУ]",
  },
  {
    q: "Как ухаживать за волосами после?",
    a: "После процедуры вы получите понятные рекомендации: чем мыть, чего избегать в первые дни и какой уход поможет результату жить спокойнее. Универсального списка «для всех составов» нет. [ВСТАВИТЬ ПАМЯТКУ САЛОНА]",
  },
  {
    q: "Как подготовиться к наращиванию?",
    a: "Обычно приходят с чистыми волосами без тяжёлых масел и стайлинга, но точная подготовка зависит от метода. Перед визитом мастер или администратор подскажут, что сделать именно вам. [УТОЧНИТЬ ПАМЯТКУ ПОДГОТОВКИ]",
  },
  {
    q: "Как часто нужна коррекция?",
    a: "Для наращивания волос и ресниц коррекция нужна по мере отрастания и естественного обновления. Интервал зависит от метода, исходной густоты и того, как вы ухаживаете за результатом. [УТОЧНИТЬ ИНТЕРВАЛЫ ПО МЕТОДАМ]",
  },
  {
    q: "Как ухаживать за ресницами?",
    a: "Главное — не тереть, не снимать материал самостоятельно и соблюдать рекомендации первых суток. Дальше уход зависит от эффекта и клея. [ВСТАВИТЬ ПАМЯТКУ ПО РЕСНИЦАМ]",
  },
  {
    q: "Что выбрать: ламинирование или наращивание?",
    a: "Ламинирование работает с вашими ресницами и даёт более ухоженный «свой» взгляд. Наращивание добавляет длину и объём, которых нет исходно. Если не хотите коррекции и искусственный материал — чаще смотрят ламинирование. Если нужен более заметный эффект — наращивание. Точный выбор помогает сделать короткий тест на сайте и консультация мастера.",
  },
  {
    q: "Почему цены указаны «от»?",
    a: "Итоговая стоимость зависит от длины, густоты, исходного состояния, объёма материала и выбранного эффекта. Поэтому честнее показать старт и объяснить, от чего зависит сумма, чем обещать одну цифру всем. Точную стоимость мастер называет после диагностики.",
  },
  {
    q: "Нужна ли консультация перед процедурой?",
    a: "Для большинства долговременных процедур — да. Это не формальность: так мы не подбираем метод «по фото из интернета», а смотрим ваши исходные данные.",
  },
];

export function getCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function getService(id: string) {
  for (const category of categories) {
    const service = category.services.find((item) => item.id === id);
    if (service) return { category, service };
  }
  return null;
}

export function getMasterForDirection(direction: DirectionId) {
  return masters.find((master) => master.directions.includes(direction)) ?? masters[0];
}

export function buildMetadata(title?: string, description?: string): Metadata {
  const pageTitle = title ?? site.seo.title;
  const fullTitle = title ? `${title} — ${site.name}` : site.seo.title;
  const pageDescription = description ?? site.seo.description;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      type: "website",
      locale: "ru_RU",
      siteName: site.name,
      images: [{ url: "/images/hero-hair.jpg", width: 1200, height: 675, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
    },
  };
}
