"use client";

import { Button } from "@/components/Button";
import { OptionGrid, QuizStep } from "@/components/QuizStep";
import { QuizResult } from "@/components/QuizResult";
import { WorkPhoto } from "@/components/WorkPhoto";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  recommendBrows,
  recommendComplex,
  recommendExtensions,
  recommendHair,
  recommendLashes,
  type ComplexChange,
  type ComplexKeep,
  type ComplexStyle,
  type ContactLead,
  type QuizResult as QuizResultType,
} from "@/lib/quiz";
import type { DirectionId, QuizMode } from "@/lib/content";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const quizModes: QuizMode[] = ["choice", "hair", "extensions", "lashes", "brows", "complex"];
const modeImages: Record<DirectionId, string> = {
  hair: "/images/salon/hair-straight-brunette.jpg",
  extensions: "/images/salon/extensions-before-after-dark.jpg",
  lashes: "/images/salon/lashes-volume-closeup.jpg",
  brows: "/images/salon/portrait-brows.jpg",
  complex: "/images/salon/makeup-glitter-eyes.jpg",
};

export function BeautyQuiz({ initialMode }: { initialMode?: QuizMode }) {
  const { copy } = useLanguage();
  const searchParams = useSearchParams();
  const modeFromUrl = searchParams.get("mode");
  const startMode =
    initialMode ?? (quizModes.includes(modeFromUrl as QuizMode) ? (modeFromUrl as QuizMode) : "choice");
  const [mode, setMode] = useState<QuizMode>(startMode);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [lead, setLead] = useState<ContactLead>({ name: "", contact: "", consent: false });
  const [photoName, setPhotoName] = useState("");
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const questionPack = useMemo(() => {
    if (mode === "hair") return copy.quiz.hair.steps;
    if (mode === "extensions") return copy.quiz.extensions.steps;
    if (mode === "lashes") return copy.quiz.lashes.steps;
    if (mode === "brows") return copy.quiz.brows.steps;
    if (mode === "complex") return copy.quiz.complex.steps;
    return [];
  }, [mode, copy]);

  const total = questionPack.length + 1;
  const current = questionPack[step];
  const title =
    mode === "choice"
      ? copy.quiz.complexTitle
      : mode === "complex"
        ? copy.quiz.complexTitle
        : copy.quiz[mode].title;

  const selectAnswer = (key: string, value: string, multiple = false) => {
    setAnswers((prev) => {
      if (!multiple) return { ...prev, [key]: value };
      const currentValue = Array.isArray(prev[key]) ? [...(prev[key] as string[])] : [];
      return {
        ...prev,
        [key]: currentValue.includes(value)
          ? currentValue.filter((item) => item !== value)
          : [...currentValue, value],
      };
    });
  };

  const buildResult = (): QuizResultType => {
    const q = copy.quiz;
    if (mode === "hair") {
      return recommendHair(
        {
          goal: answers.goal as never,
          concern: answers.concern as never,
          time: answers.time as never,
          duration: answers.duration as never,
          special: answers.special as never,
        },
        q,
      );
    }
    if (mode === "extensions") {
      return recommendExtensions(
        {
          current: answers.current as never,
          density: answers.density as never,
          desired: answers.desired as never,
          volume: answers.volume as never,
          look: answers.look as never,
        },
        q,
      );
    }
    if (mode === "lashes") {
      return recommendLashes(
        {
          mood: answers.mood as never,
          lifestyle: answers.lifestyle as never,
          material: answers.material as never,
        },
        q,
      );
    }
    if (mode === "brows") {
      return recommendBrows(
        {
          state: answers.state as never,
          shape: answers.shape as never,
          intensity: answers.intensity as never,
          makeup: answers.makeup as never,
        },
        q,
      );
    }
    return recommendComplex(
      {
        keep: (Array.isArray(answers.keep) ? answers.keep : answers.keep ? [answers.keep] : []) as ComplexKeep[],
        change: (Array.isArray(answers.change) ? answers.change : answers.change ? [answers.change] : []) as ComplexChange[],
        style: (answers.style as ComplexStyle) ?? "natural",
      },
      q,
    );
  };

  const submitLead = async () => {
    setError("");
    if (!lead.name.trim() || !lead.contact.trim()) {
      setError(copy.quiz.errorContact);
      return;
    }
    if (!lead.consent) {
      setError(copy.quiz.errorConsent);
      return;
    }
    setSending(true);
    const computed = buildResult();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          mode,
          name: lead.name,
          contact: lead.contact,
          photoName,
          answers,
          recommendation: computed.headline,
        }),
      });
    } catch {
      // show recommendation anyway
    } finally {
      setSending(false);
      setResult(computed);
    }
  };

  if (result) {
    return <QuizResult result={result} name={lead.name} />;
  }

  if (mode === "choice") {
    const modes = (Object.keys(copy.quiz.modes) as DirectionId[]).map((id) => ({
      id,
      ...copy.quiz.modes[id],
      image: modeImages[id],
    }));
    return (
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">{copy.quiz.eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-6xl">{copy.quiz.choiceTitle}</h1>
        <p className="mt-4 max-w-xl text-muted">{copy.quiz.choiceText}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMode(item.id);
                setStep(0);
                setAnswers({});
              }}
              className="group overflow-hidden rounded-[1.5rem] bg-cream text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
            >
              <WorkPhoto src={item.image} alt={item.label} className="aspect-[4/3] w-full" sizes="300px" />
              <div className="p-5">
                <p className="font-serif text-2xl text-ink">{item.label}</p>
                <p className="mt-1 text-sm text-muted">{item.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step >= questionPack.length) {
    return (
      <QuizStep title={title} question={copy.quiz.contactQuestion} step={total} total={total}>
        <p className="mb-6 text-sm text-muted">{copy.quiz.contactLead}</p>
        <div className="grid gap-4">
          <label className="block text-sm">
            <span className="mb-2 block text-mist">{copy.quiz.name}</span>
            <input
              value={lead.name}
              onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-mist">{copy.quiz.phone}</span>
            <input
              value={lead.contact}
              onChange={(event) => setLead((prev) => ({ ...prev, contact: event.target.value }))}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              autoComplete="tel"
            />
          </label>
          {mode === "complex" ? (
            <label className="block text-sm">
              <span className="mb-2 block text-mist">{copy.quiz.photoOptional}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
                className="w-full rounded-2xl border border-line bg-ivory px-4 py-3"
              />
              <span className="mt-2 block text-xs text-mist">
                {photoName ? copy.quiz.photoChosen.replace("{name}", photoName) : copy.quiz.photoHint}
              </span>
            </label>
          ) : null}
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-1"
              checked={lead.consent}
              onChange={(event) => setLead((prev) => ({ ...prev, consent: event.target.checked }))}
            />
            <span>
              {copy.quiz.consent}{" "}
              <Link className="underline decoration-gold/50" href="/politika-konfidencialnosti">
                {copy.ui.privacyLink}
              </Link>
              .
            </span>
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-burgundy">{error}</p> : null}
        <div className="mt-8 flex gap-3">
          <Button variant="secondary" onClick={() => setStep((value) => value - 1)}>
            {copy.ui.back}
          </Button>
          <Button onClick={submitLead} disabled={sending}>
            {sending ? copy.quiz.saving : copy.quiz.showRecommendation}
          </Button>
        </div>
      </QuizStep>
    );
  }

  const multiple = current.key === "change" || current.key === "keep";
  const value = answers[current.key];
  const canContinue = multiple ? Array.isArray(value) && value.length > 0 : Boolean(value);
  const directionName =
    mode === "complex" ? copy.ui.directionComplex : copy.categories[mode]?.navLabel ?? copy.ui.directionComplex;

  return (
    <QuizStep title={title} question={current.question} step={step + 1} total={total}>
      <OptionGrid
        options={current.options}
        value={value}
        multiple={multiple}
        onChange={(item) => selectAnswer(current.key, item, multiple)}
      />
      <div className="mt-8 flex gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            if (step === 0) {
              setMode("choice");
              return;
            }
            setStep((currentStep) => currentStep - 1);
          }}
        >
          {copy.ui.back}
        </Button>
        <Button onClick={() => setStep((currentStep) => currentStep + 1)} disabled={!canContinue}>
          {copy.ui.next}
        </Button>
      </div>
      <p className="mt-6 text-xs text-mist">{copy.quiz.directionLine.replace("{name}", directionName)}</p>
    </QuizStep>
  );
}

export function HairExtensionCalculator() {
  return <BeautyQuiz initialMode="extensions" />;
}
