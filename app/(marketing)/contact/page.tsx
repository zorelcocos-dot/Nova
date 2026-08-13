import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import { IconMail, IconChat, IconGlobe, IconClock } from "@/components/icons";
import s from "../sub.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the NOVA team — sales, support, security reviews, and press. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <section className={s.pageHero} style={{ paddingBottom: 110 }}>
      <div className="container">
        <div className={s.contactGrid}>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="h-1" style={{ marginTop: 18 }}>
              Let&rsquo;s talk about your workload.
            </h1>
            <p className="lead" style={{ marginTop: 18 }}>
              Sales conversations that behave like support conversations:
              quick, technical, and honest about fit.
            </p>

            <div style={{ marginTop: 40 }}>
              <div className={s.contactItem}>
                <div className={s.contactItemIcon}><IconMail size={16} /></div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>Email</div>
                  <div className="body-s">hello@nova.build — for everything that isn&rsquo;t urgent.</div>
                </div>
              </div>
              <div className={s.contactItem}>
                <div className={s.contactItemIcon}><IconChat size={16} /></div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>Live chat</div>
                  <div className="body-s">In your dashboard, bottom right. Median first response: 3 minutes.</div>
                </div>
              </div>
              <div className={s.contactItem}>
                <div className={s.contactItemIcon}><IconGlobe size={16} /></div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>Offices</div>
                  <div className="body-s">San Francisco · Lisbon · Tokyo</div>
                </div>
              </div>
              <div className={s.contactItem} style={{ borderBottom: "1px solid var(--line)" }}>
                <div className={s.contactItemIcon}><IconClock size={16} /></div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>Support hours</div>
                  <div className="body-s">Scale plans: 24/7. Everyone else: weekdays, follow-the-sun.</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
