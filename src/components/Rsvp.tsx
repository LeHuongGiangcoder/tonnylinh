"use client";

import { useState, type FormEvent } from "react";
import { wedding } from "@/data/wedding";
import { useCopy } from "@/lib/lang";
import { Rule } from "./Divider";
import { Drape } from "./Drape";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

export function Rsvp() {
  const t = useCopy();
  const [submitted, setSubmitted] = useState(false);

  // TODO(backend): POST to the RSVP endpoint. Held locally for now.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="section ground--cream section--draped">
      <Drape from="red" />

      <div className="container container--narrow center stack">
        <Reveal className="stack-sm">
          <Emblem name="crest" />
          <p className="eyebrow">{t.rsvp.eyebrow}</p>
          <h2 className="heading">{t.rsvp.heading}</h2>
          <Rule />
          <p className="body-text body-text--muted">{t.rsvp.deadline}</p>
        </Reveal>

        <Reveal delay={120}>
          {submitted ? (
            <div className="card stack-sm">
              <p className="heading heading--sm">{t.rsvp.thanksTitle}</p>
              <p className="body-text body-text--muted">
                {t.rsvp.thanksBody} {wedding.dateShort}.
              </p>
            </div>
          ) : (
            <form className="card stack" onSubmit={handleSubmit}>
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
                      defaultChecked
                    />
                    <label className="choice__label" htmlFor="rsvp-yes">
                      {t.rsvp.yes}
                    </label>
                  </div>
                  <div className="choice">
                    <input id="rsvp-no" type="radio" name="attending" value="no" />
                    <label className="choice__label" htmlFor="rsvp-no">
                      {t.rsvp.no}
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="field">
                <label className="label" htmlFor="rsvp-guests">
                  {t.rsvp.guests}
                </label>
                <select id="rsvp-guests" name="guests" className="select" defaultValue="1">
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
                      />
                      <label className="choice__label" htmlFor={`rsvp-help-${option.id}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <label className="label" htmlFor="rsvp-message">
                  {t.rsvp.message}
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  className="textarea"
                  placeholder={t.rsvp.messagePlaceholder}
                />
              </div>

              <button type="submit" className="btn btn--wine btn--block">
                {t.rsvp.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
