"use client";

import { Button } from "@/components/Button";
import { OptionGrid, QuizStep } from "@/components/QuizStep";
import { QuizResult } from "@/components/QuizResult";
import { WorkPhoto } from "@/components/WorkPhoto";
import { categories } from "@/lib/content";
import {
  browQuestions,
  extensionQuestions,
  hairQuestions,
  lashQuestions,
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
import { useMemo, useState } from "react";

const modes: { id: DirectionId; label: string; text: string; image: string }[] = [
  { id: "hair", label: "Волосы", text: "Гладкость, восстановление, уход", image: "/images/cat-hair.jpg" },
  { id: "extensions", label: "Наращивание волос", text: "Длина и густота", image: "/images/cat-extensions.jpg" },
  { id: "lashes", label: "Ресницы", text: "Наращивание или ламинирование", image: "/images/cat-lashes.jpg" },
  { id: "brows", label: "Брови", text: "Форма, цвет, ламинирование", image: "/images/cat-brows.jpg" },
  { id: "complex", label: "Хочу комплексный образ", text: "Что изменить, а что оставить", image: "/images/cat-complex.jpg" },
];

const titles: Record<DirectionId, string> = {
  hair: hairQuestions.title,
  extensions: extensionQuestions.title,
  lashes: lashQuestions.title,
  brows: browQuestions.title,
  complex: "Персональный Beauty-подбор",
};

export function BeautyQuiz({ initialMode = "choice" }: { initialMode?: QuizMode }) {
  const [mode, setMode] = useState<QuizMode>(initialMode);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [lead, setLead] = useState<ContactLead>({ name: "", contact: "", consent: false });
  const [photoName, setPhotoName] = useState("");
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const questionPack = useMemo(() => {
    if (mode === "hair") return hairQuestions.steps;
    if (mode === "extensions") return extensionQuestions.steps;
    if (mode === "lashes") return lashQuestions.steps;
    if (mode === "brows") return browQuestions.steps;
    if (mode === "complex") {
      return [
        {
          key: "style",
          question: "Какой сценарий вам ближе?",
          options: [
            { value: "natural", label: "Хочу натурально" },
            { value: "new-look", label: "Хочу новый образ" },
          ],
        },
        {
          key: "change",
          question: "Что хочется изменить?",
          options: [
            { value: "hair", label: "Волосы" },
            { value: "lashes", label: "Ресницы" },
            { value: "brows", label: "Брови" },
          ],
        },
        {
          key: "keep",
          question: "Что важно оставить своим?",
          options: [
            { value: "hair", label: "Характер волос" },
            { value: "lashes", label: "Свои ресницы" },
            { value: "brows", label: "Естественные брови" },
            { value: "natural-all", label: "Общий естественный вид" },
          ],
        },
      ];
    }
    return [];
  }, [mode]);

  const total = questionPack.length + 1;
  const current = questionPack[step];
  const title = mode === "choice" ? "Персональный Beauty-подбор" : titles[mode];

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
    if (mode === "hair") {
      return recommendHair({
        goal: answers.goal as never,
        concern: answers.concern as never,
        time: answers.time as never,
        duration: answers.duration as never,
        special: answers.special as never,
      });
    }
    if (mode === "extensions") {
      return recommendExtensions({
        current: answers.current as never,
        density: answers.density as never,
        desired: answers.desired as never,
        volume: answers.volume as never,
        look: answers.look as never,
      });
    }
    if (mode === "lashes") {
      return recommendLashes({
        mood: answers.mood as never,
        lifestyle: answers.lifestyle as never,
        material: answers.material as never,
      });
    }
    if (mode === "brows") {
      return recommendBrows({
        state: answers.state as never,
        shape: answers.shape as never,
        intensity: answers.intensity as never,
        makeup: answers.makeup as never,
      });
    }
    return recommendComplex({
      keep: (Array.isArray(answers.keep) ? answers.keep : answers.keep ? [answers.keep] : []) as ComplexKeep[],
      change: (Array.isArray(answers.change) ? answers.change : answers.change ? [answers.change] : []) as ComplexChange[],
      style: (answers.style as ComplexStyle) ?? "natural",
    });
  };

  const submitLead = async () => {
    setError("");
    if (!lead.name.trim() || !lead.contact.trim()) {
      setError("Укажите имя и телефон или мессенджер.");
      return;
    }
    if (!lead.consent) {
      setError("Нужно согласие на обработку персональных данных.");
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
      // Рекомендацию всё равно показываем: приём заявок может быть ещё не подключён.
    } finally {
      setSending(false);
      setResult(computed);
    }
  };

  if (result) {
    return <QuizResult result={result} name={lead.name} />;
  }

  if (mode === "choice") {
    return (
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Мини-консультация</p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-6xl">С чего начнём?</h1>
        <p className="mt-4 max-w-xl text-muted">
          Выберите направление. Вопросы короткие, телефон понадобится только перед рекомендацией.
        </p>
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
      <QuizStep title={title} question="Как к вам обращаться?" step={total} total={total}>
        <p className="mb-6 text-sm text-muted">
          Контакт нужен, чтобы сохранить подбор и связаться по рекомендации. Сначала вы уже ответили на вопросы.
        </p>
        <div className="grid gap-4">
          <label className="block text-sm">
            <span className="mb-2 block text-mist">Имя</span>
            <input
              value={lead.name}
              onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-mist">Телефон или мессенджер</span>
            <input
              value={lead.contact}
              onChange={(event) => setLead((prev) => ({ ...prev, contact: event.target.value }))}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              autoComplete="tel"
            />
          </label>
          {mode === "complex" ? (
            <label className="block text-sm">
              <span className="mb-2 block text-mist">Фото — по желанию</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
                className="w-full rounded-2xl border border-line bg-ivory px-4 py-3"
              />
              <span className="mt-2 block text-xs text-mist">
                Можно не прикладывать. {photoName ? `Выбрано: ${photoName}` : "Файл останется только в заявке, когда подключите приём."}
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
              Соглашаюсь на обработку персональных данных и принимаю{" "}
              <a className="underline decoration-gold/50" href="/politika-konfidencialnosti">
                политику конфиденциальности
              </a>
              .
            </span>
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-burgundy">{error}</p> : null}
        <div className="mt-8 flex gap-3">
          <Button variant="secondary" onClick={() => setStep((value) => value - 1)}>
            Назад
          </Button>
          <Button onClick={submitLead} disabled={sending}>
            {sending ? "Сохраняем…" : "Показать рекомендацию"}
          </Button>
        </div>
      </QuizStep>
    );
  }

  const multiple = current.key === "change" || current.key === "keep";
  const value = answers[current.key];
  const canContinue = multiple ? Array.isArray(value) && value.length > 0 : Boolean(value);

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
            setStep((value) => value - 1);
          }}
        >
          Назад
        </Button>
        <Button onClick={() => setStep((value) => value + 1)} disabled={!canContinue}>
          Дальше
        </Button>
      </div>
      <p className="mt-6 text-xs text-mist">
        Направление: {categories.find((item) => item.id === mode)?.navLabel ?? "комплексный образ"}.
      </p>
    </QuizStep>
  );
}

export function HairExtensionCalculator() {
  return <BeautyQuiz initialMode="extensions" />;
}
