import {
  categories,
  getMasterForDirection,
  portfolio,
  type DirectionId,
  type ServiceItem,
} from "./content";
import type { SiteCopy } from "@/lib/i18n/types";

type QuizCopy = SiteCopy["quiz"];

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

function pack(
  serviceId: string,
  direction: DirectionId,
  headline: string,
  summary: string,
  details: string[],
  extras?: Record<string, string>,
  alternatives?: QuizResult["alternatives"],
): QuizResult {
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

function fromResult(
  serviceId: string,
  direction: DirectionId,
  result: QuizCopy["results"][string],
  extras?: Record<string, string>,
) {
  return pack(serviceId, direction, result.headline, result.summary, result.details, extras, result.alternatives);
}

export function recommendHair(
  input: {
    goal: HairGoal;
    concern: HairConcern;
    time: StyleTime;
    duration: EffectDuration;
    special: HairSpecial;
  },
  q: QuizCopy,
): QuizResult {
  if (input.goal === "length") return fromResult("capsule", "extensions", q.results.hairLength);
  if (input.goal === "restore" || input.concern === "breakage") {
    const result = q.results.hairRestore;
    return pack(
      "restore",
      "hair",
      result.headline,
      result.summary,
      result.details,
      undefined,
      input.special === "gentle" || input.special === "no-formaldehyde" ? result.alternatives : undefined,
    );
  }
  if (input.special === "no-formaldehyde" || input.special === "gentle") return fromResult("bio", "hair", q.results.hairBio);
  if (input.goal === "protect") return fromResult("care", "hair", q.results.hairCareProtect);
  if (input.goal === "volume" && input.concern === "thin") {
    return fromResult("microcapsule", "extensions", q.results.hairMicrocapsule);
  }
  if (input.duration === "long" && (input.goal === "smooth" || input.goal === "all") && input.time === "none") {
    return fromResult("nanoplastia", "hair", q.results.hairNano);
  }
  if (input.duration === "short") return fromResult("care", "hair", q.results.hairCareShort);
  return fromResult("keratin", "hair", q.results.hairKeratin);
}

export function recommendExtensions(
  input: {
    current: ExtLength;
    density: ExtDensity;
    desired: ExtDesiredLength;
    volume: ExtVolume;
    look: ExtLook;
  },
  q: QuizCopy,
): QuizResult {
  let method = "capsule";
  let headline = q.results.extCapsule.headline;
  let volumeNote = q.extVolume.default;
  let lengthNote = q.extLength.default;

  if (input.look === "hollywood" || input.volume === "max") {
    method = "hollywood";
    headline = q.results.extHollywood.headline;
    volumeNote = q.extVolume.hollywood;
  } else if (input.density === "thin" || input.look === "natural") {
    method = input.density === "thin" ? "microcapsule" : "capsule";
    headline = method === "microcapsule" ? q.results.extMicro.headline : q.results.extCapsule.headline;
    volumeNote = input.density === "thin" ? q.extVolume.thin : q.extVolume.natural;
  } else if (input.look === "noticeable" && input.volume === "fuller") {
    method = "tape";
    headline = q.results.extTape.headline;
    volumeNote = q.extVolume.fuller;
  }

  if (input.desired === "very-long" && (input.current === "short" || input.current === "bob")) {
    lengthNote = q.extLength.jump;
  } else if (input.desired === "medium") {
    lengthNote = q.extLength.medium;
  } else {
    lengthNote = q.extLength.long;
  }

  return pack(method, "extensions", headline, q.extSummary, [volumeNote, lengthNote, q.extPriceLine, q.extCorrectionLine], {
    method: headline.replace(q.extMethodPrefix, ""),
    volume: volumeNote,
    length: lengthNote,
    priceRange: "[ДИАПАЗОН СТОИМОСТИ]",
  });
}

export function recommendLashes(
  input: {
    mood: LashMood;
    lifestyle: LashLifestyle;
    material: LashMaterial;
  },
  q: QuizCopy,
): QuizResult {
  if (input.material === "own" || (input.lifestyle === "no-makeup" && input.mood === "everyday")) {
    return fromResult("lamination-lashes", "lashes", q.results.lashLamination);
  }
  if (input.mood === "textured") return fromResult("wet", "lashes", q.results.lashWet);
  if (input.mood === "creative") return fromResult("creative", "lashes", q.results.lashCreative);
  if (input.mood === "bold" || input.lifestyle === "statement") return fromResult("volume-lashes", "lashes", q.results.lashVolume);
  if (input.mood === "open") return fromResult("natural-effects", "lashes", q.results.lashNatural);
  return fromResult("natural-effects", "lashes", q.results.lashClassic);
}

export function recommendBrows(
  input: {
    state: BrowState;
    shape: BrowShape;
    intensity: BrowIntensity;
    makeup: BrowMakeup;
  },
  q: QuizCopy,
): QuizResult {
  const shape = q.browShape[input.shape] ?? q.browShape.soft;
  const intensity = q.browIntensity[input.intensity] ?? q.browIntensity.medium;
  let key: "browCare" | "browTint" | "browLamination" | "browArchitecture" = "browArchitecture";
  let serviceId = "architecture";

  if (input.makeup === "none" && (input.shape === "soft" || input.shape === "full")) {
    serviceId = "brow-care";
    key = "browCare";
  } else if (input.state === "ok" && input.shape === "soft") {
    serviceId = "tint";
    key = "browTint";
  } else if (input.shape === "full" && input.state !== "overplucked") {
    serviceId = "lamination-brows";
    key = "browLamination";
  }

  const result = q.results[key];
  return pack(serviceId, "brows", result.headline, result.summary.replace("{shape}", shape).replace("{intensity}", intensity), [
    input.state === "overplucked" ? q.overplucked : q.buildFromHair,
    q.intensityLine.replace("{intensity}", intensity),
    input.makeup === "none" ? q.noMakeupLine : q.withMakeupLine,
  ]);
}

export function recommendComplex(
  input: {
    keep: ComplexKeep[];
    change: ComplexChange[];
    style: ComplexStyle;
  },
  q: QuizCopy,
): QuizResult {
  const plan: string[] = [];
  let main = "care";
  let direction: DirectionId = "hair";

  if (input.change.includes("hair")) {
    main = input.style === "natural" ? "bio" : "nanoplastia";
    direction = "hair";
    plan.push(input.style === "natural" ? q.complexPlan.hairNatural : q.complexPlan.hairBold);
  }
  if (input.change.includes("lashes")) {
    if (!input.change.includes("hair")) {
      main = input.style === "natural" ? "lamination-lashes" : "volume-lashes";
      direction = "lashes";
    }
    plan.push(input.style === "natural" ? q.complexPlan.lashesNatural : q.complexPlan.lashesBold);
  }
  if (input.change.includes("brows")) {
    if (!input.change.includes("hair") && !input.change.includes("lashes")) {
      main = "brow-care";
      direction = "brows";
    }
    plan.push(q.complexPlan.brows);
  }
  if (plan.length === 0) plan.push(q.complexEmptyPlan);

  const keepText =
    input.keep.length > 0
      ? q.complexKeepPrefix.replace("{items}", input.keep.map((item) => q.keepLabels[item]).join(", "))
      : q.complexKeepEmpty;

  const result = q.results.complex;
  return pack(main, direction, result.headline, result.summary, [keepText, ...plan, q.complexPhotoLine]);
}
