"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";
import s from "../sub.module.css";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // Simulated send — wire to your endpoint in production.
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  }

  if (sent) {
    return (
      <div className={`${s.contactForm} ${s.formSuccess}`}>
        <div className={s.successRing}>
          <IconCheck size={22} />
        </div>
        <h2 className="h-3">Message sent.</h2>
        <p className="body-s" style={{ maxWidth: 320 }}>
          Thanks for reaching out — a real person will reply within one
          business day, usually faster.
        </p>
        <button className="btn btn-secondary btn-sm" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={s.contactForm} onSubmit={onSubmit}>
      <div className={s.formRow}>
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input className="input" id="name" name="name" placeholder="Ada Lovelace" required autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input className="input" id="email" name="email" type="email" placeholder="ada@company.com" required autoComplete="email" />
        </div>
      </div>
      <div className={s.formRow}>
        <div>
          <label className="label" htmlFor="company">Company</label>
          <input className="input" id="company" name="company" placeholder="Analytical Engines Inc." />
        </div>
        <div>
          <label className="label" htmlFor="topic">Topic</label>
          <select className="select" id="topic" name="topic" defaultValue="sales">
            <option value="sales">Talk to sales</option>
            <option value="support">Product support</option>
            <option value="security">Security review</option>
            <option value="press">Press & partnerships</option>
            <option value="careers">Careers</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="message">How can we help?</label>
        <textarea
          className="textarea"
          id="message"
          name="message"
          placeholder="Tell us about your team, your stack, and what you'd like to automate…"
          required
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span className="caption">We reply within one business day.</span>
        <button type="submit" className="btn btn-primary" disabled={sending} style={{ minWidth: 140 }}>
          {sending ? (
            <>
              <span className="spinner" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
