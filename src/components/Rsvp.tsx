"use client";

import { useState, type FormEvent } from "react";
import { wedding } from "@/data/wedding";
import type { Guest } from "@/lib/guests";
import { useCopy, useLang } from "@/lib/lang";
import { Rule } from "./Divider";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The reply form. On a personal link the guest is already known — the sheet
 * has their name — so they are not asked for it, and whatever they answered
 * last time is filled in: sending again updates their row rather than adding
 * one. On the plain address they type their name and get a row of their own.
 */
export function Rsvp({ guest }: { guest: Guest | null }) {
  const t = useCopy();
  const { lang } = useLang();
  const [attending, setAttending] = useState<"yes" | "no">(
    guest?.attending === false ? "no" : "yes",
  );
  const [status, setStatus] = useState<Status>("idle");

  const helpAsked = guest?.help.split(",").map((h) => h.trim()) ?? [];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "");

    // Questions for a guest who is coming are not rendered for one who isn't,
    // so they arrive empty rather than as stale defaults.
    const reply = {
      slug: guest?.slug,
      name: guest?.name ?? field("name"),
      contact: field("contact"),
      attending: attending === "yes",
      guests: field("guests"),
      diet: field("diet"),
      help: form.getAll("help").join(", "),
      message: field("message"),
      lang,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="section ground--cream section--under-spill">
      <div className="container container--narrow center stack">
        <Reveal className="stack-sm">
          <Emblem name="crest" />
          <p className="eyebrow">{t.rsvp.eyebrow}</p>
          <h2 className="heading">{t.rsvp.heading}</h2>
          <Rule />
          <p className="body-text body-text--muted">{t.rsvp.deadline}</p>
        </Reveal>

        <Reveal delay={120}>
          {status === "sent" ? (
            <div className="card stack-sm">
              <p className="heading heading--sm">{t.rsvp.thanksTitle}</p>
              <p className="body-text body-text--muted">
                {attending === "yes"
                  ? `${t.rsvp.thanksBody} ${wedding.dateShort}.`
                  : t.rsvp.thanksBodyDecline}
              </p>
            </div>
          ) : (
            <form className="card stack" onSubmit={handleSubmit}>
              {/* On a personal link the hero has already named them. */}
              {!guest && (
                <div className="field">
                  <label className="label" htmlFor="rsvp-name">
                    {t.rsvp.name}
                  </label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    className="input"
                    placeholder={t.rsvp.namePlaceholder}
                    autoComplete="name"
                    required
                  />
                </div>
              )}

              <div className="field">
                <label className="label" htmlFor="rsvp-contact">
                  {t.rsvp.contact}
                </label>
                <input
                  id="rsvp-contact"
                  name="contact"
                  type="text"
                  className="input"
                  placeholder={t.rsvp.contactPlaceholder}
                  defaultValue={guest?.contact}
                  required
                />
              </div>

              <fieldset className="fieldset">
                <legend className="label">{t.rsvp.attending}</legend>
                <div className="choice-group">
                  <div className="choice">
                    <input
                      id="rsvp-yes"
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === "yes"}
                      onChange={() => setAttending("yes")}
                    />
                    <label className="choice__label" htmlFor="rsvp-yes">
                      {t.rsvp.yes}
                    </label>
                  </div>
                  <div className="choice">
                    <input
                      id="rsvp-no"
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === "no"}
                      onChange={() => setAttending("no")}
                    />
                    <label className="choice__label" htmlFor="rsvp-no">
                      {t.rsvp.no}
                    </label>
                  </div>
                </div>
              </fieldset>

              {/* A guest who can't come is only asked for a note. */}
              {attending === "yes" && (
                <>
                  <div className="field">
                    <label className="label" htmlFor="rsvp-guests">
                      {t.rsvp.guests}
                    </label>
                    <select
                      id="rsvp-guests"
                      name="guests"
                      className="select"
                      defaultValue={guest?.guests || "1"}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="rsvp-diet">
                      {t.rsvp.diet}
                    </label>
                    <input
                      id="rsvp-diet"
                      name="diet"
                      type="text"
                      className="input"
                      placeholder={t.rsvp.dietPlaceholder}
                      defaultValue={guest?.diet}
                    />
                  </div>

                  {/* Two independent asks, so checkboxes rather than a radio set:
                      a guest can want the hotel list, the directions, or both. */}
                  <fieldset className="fieldset">
                    <legend className="label">{t.rsvp.help}</legend>
                    <div className="choice-group choice-group--stack">
                      {[
                        { id: "hotel", label: t.rsvp.helpHotel },
                        { id: "transport", label: t.rsvp.helpTransport },
                      ].map((option) => (
                        <div className="choice" key={option.id}>
                          <input
                            id={`rsvp-help-${option.id}`}
                            type="checkbox"
                            name="help"
                            value={option.id}
                            defaultChecked={helpAsked.includes(option.id)}
                          />
                          <label className="choice__label" htmlFor={`rsvp-help-${option.id}`}>
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              <div className="field">
                <label className="label" htmlFor="rsvp-message">
                  {t.rsvp.message}
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  className="textarea"
                  placeholder={t.rsvp.messagePlaceholder}
                  defaultValue={guest?.message}
                />
              </div>

              {status === "error" && (
                <p className="body-text body-text--muted" role="alert">
                  {t.rsvp.error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--wine btn--block"
                disabled={status === "sending"}
              >
                {status === "sending" ? t.rsvp.sending : t.rsvp.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
