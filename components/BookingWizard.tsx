"use client";

import { Button } from "@/components/Button";
import { OptionGrid, QuizStep } from "@/components/QuizStep";
import { masters, site } from "@/lib/content";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { translatedMaster, useTranslatedCategories } from "@/lib/i18n/resolve";
import { hasUsableLink } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const times = ["10:00", "11:30", "13:00", "15:00", "17:00", "19:00"];

function upcomingDates() {
  return Array.from({ length: 8 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return date.toISOString().slice(0, 10);
  });
}

export function BookingWizard({
  initialService,
  initialMaster,
}: {
  initialService?: string;
  initialMaster?: string;
}) {
  const { copy } = useLanguage();
  const searchParams = useSearchParams();
  const categories = useTranslatedCategories();
  const services = useMemo(
    () => categories.flatMap((category) => category.services.map((service) => ({ ...service, category: category.title }))),
    [categories],
  );
  const dates = useMemo(() => upcomingDates(), []);
  const localizedMasters = masters.map((item) => translatedMaster(copy, item.id) ?? item);

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(initialService ?? searchParams.get("service") ?? "");
  const [masterId, setMasterId] = useState(initialMaster ?? searchParams.get("master") ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const service = services.find((item) => item.id === serviceId);
  const master = localizedMasters.find((item) => item.id === masterId);

  const next = () => setStep((value) => value + 1);
  const back = () => setStep((value) => Math.max(0, value - 1));

  const submit = async () => {
    setError("");
    if (!name.trim() || !contact.trim() || !consent) {
      setError(copy.wizard.error);
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "booking",
        serviceId,
        masterId,
        date,
        time,
        name,
        contact,
      }),
    }).catch(() => undefined);
    setDone(true);
  };

  if (hasUsableLink(site.booking.embedUrl)) {
    return (
      <iframe
        title={copy.wizard.iframeTitle}
        src={site.booking.embedUrl}
        className="min-h-[720px] w-full rounded-[1.6rem] border-0"
      />
    );
  }

  if (done) {
    const masterPart = master ? copy.wizard.masterLabel.replace("{name}", master.name) : "";
    return (
      <div className="rounded-[1.6rem] bg-cream p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{copy.wizard.acceptedEyebrow}</p>
        <h2 className="mt-4 font-serif text-4xl text-ink">{copy.wizard.acceptedTitle}</h2>
        <p className="mt-4 max-w-xl text-muted">
          {copy.wizard.acceptedText
            .replace("{name}", name)
            .replace("{service}", service?.name ?? copy.wizard.consultationFallback)
            .replace("{master}", masterPart)
            .replace("{date}", date)
            .replace("{time}", time)}
        </p>
        <p className="mt-4 text-sm text-mist">{copy.wizard.acceptedNote}</p>
        {hasUsableLink(site.booking.url) ? (
          <Button href={site.booking.url} className="mt-6">
            {copy.wizard.openBooking}
          </Button>
        ) : null}
      </div>
    );
  }

  const questions = [
    {
      title: copy.wizard.serviceStep,
      node: (
        <OptionGrid
          options={services.map((item) => ({ value: item.id, label: `${item.name} · ${item.category}` }))}
          value={serviceId}
          onChange={setServiceId}
        />
      ),
      can: Boolean(serviceId),
    },
    {
      title: copy.wizard.masterStep,
      node: (
        <OptionGrid
          options={localizedMasters.map((item) => ({ value: item.id, label: `${item.name} · ${item.specialization}` }))}
          value={masterId}
          onChange={setMasterId}
        />
      ),
      can: Boolean(masterId),
    },
    {
      title: copy.wizard.dateStep,
      node: (
        <OptionGrid
          options={dates.map((item) => ({ value: item, label: item }))}
          value={date}
          onChange={setDate}
        />
      ),
      can: Boolean(date),
    },
    {
      title: copy.wizard.timeStep,
      node: (
        <OptionGrid
          options={times.map((item) => ({ value: item, label: item }))}
          value={time}
          onChange={setTime}
        />
      ),
      can: Boolean(time),
    },
    {
      title: copy.wizard.contactStep,
      node: (
        <div className="grid gap-4">
          <label className="text-sm">
            <span className="mb-2 block text-mist">{copy.quiz.name}</span>
            <input
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block text-mist">{copy.quiz.phone}</span>
            <input
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-gold"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              autoComplete="tel"
            />
          </label>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" className="mt-1" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>
              {copy.quiz.consent}{" "}
              <Link href="/politika-konfidencialnosti" className="underline decoration-gold/50">
                {copy.ui.privacyLink}
              </Link>
              .
            </span>
          </label>
          {error ? <p className="text-sm text-burgundy">{error}</p> : null}
        </div>
      ),
      can: true,
    },
  ];

  const current = questions[step];

  return (
    <QuizStep
      title={copy.wizard.iframeTitle}
      question={copy.wizard.questions[step]}
      step={step + 1}
      total={questions.length}
    >
      {hasUsableLink(site.booking.url) ? (
        <p className="mb-6 text-sm text-muted">
          {copy.wizard.canOpenService}{" "}
          <a className="underline" href={site.booking.url}>
            {copy.wizard.openOnline}
          </a>
          .
        </p>
      ) : (
        <p className="mb-6 text-sm text-mist">{copy.wizard.placeholderNote}</p>
      )}
      {current.node}
      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <Button variant="secondary" onClick={back}>
            {copy.ui.back}
          </Button>
        ) : null}
        {step < questions.length - 1 ? (
          <Button onClick={next} disabled={!current.can}>
            {copy.ui.next}
          </Button>
        ) : (
          <Button onClick={submit}>{copy.wizard.confirm}</Button>
        )}
      </div>
    </QuizStep>
  );
}
