"use client";

import { useState, type FormEvent } from "react";
import { rsvp, wedding } from "@/data/wedding";
import { Rule } from "./Divider";
import { Emblem } from "./Ornament";
import { Reveal } from "./Reveal";

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false);

  // TODO(backend): POST to the RSVP endpoint. Held locally for now.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="section ground--cream">
      <div className="container container--narrow center stack">
        <Reveal className="stack-sm">
          <Emblem name="crest" />
          <p className="eyebrow">Will you join us?</p>
          <h2 className="heading">R.S.V.P.</h2>
          <Rule />
          <p className="body-text body-text--muted">{rsvp.deadline}</p>
        </Reveal>

        <Reveal delay={120}>
          {submitted ? (
            <div className="card stack-sm">
              <p className="heading heading--sm">Thank you</p>
              <p className="body-text body-text--muted">
                Your reply is with us. We cannot wait to celebrate together on{" "}
                {wedding.dateShort}.
              </p>
            </div>
          ) : (
            <form className="card stack" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="rsvp-name">
                  Your name
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="rsvp-contact">
                  Phone or email
                </label>
                <input
                  id="rsvp-contact"
                  name="contact"
                  type="text"
                  className="input"
                  placeholder="So we can reach you"
                  required
                />
              </div>

              <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="label">Will you attend?</legend>
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
                      Joyfully accept
                    </label>
                  </div>
                  <div className="choice">
                    <input id="rsvp-no" type="radio" name="attending" value="no" />
                    <label className="choice__label" htmlFor="rsvp-no">
                      Regretfully decline
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="field">
                <label className="label" htmlFor="rsvp-guests">
                  Number of guests
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
                <label className="label" htmlFor="rsvp-message">
                  A note for us
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  className="textarea"
                  placeholder="Your wishes for the couple"
                />
              </div>

              <button type="submit" className="btn btn--wine btn--block">
                Send my reply
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
