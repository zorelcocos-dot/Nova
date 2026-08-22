"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCheck } from "@/components/icons";
import { plans } from "@/lib/data";
import styles from "./pricing.module.css";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      {/* Billing toggle — segmented control with a sliding thumb */}
      <div className={styles.toggleRow} role="group" aria-label="Billing period">
        <span
          className={`${styles.toggleThumb} ${yearly ? styles.toggleThumbRight : ""}`}
          aria-hidden
        />
        <button
          className={`${styles.toggleOpt} ${!yearly ? styles.toggleActive : ""}`}
          onClick={() => setYearly(false)}
          aria-pressed={!yearly}
        >
          Monthly
        </button>
        <button
          className={`${styles.toggleOpt} ${yearly ? styles.toggleActive : ""}`}
          onClick={() => setYearly(true)}
          aria-pressed={yearly}
        >
          Yearly
          <span
            className={`${styles.saveChip} ${yearly ? styles.saveChipOn : ""}`}
          >
            Save 20%
          </span>
        </button>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const href = plan.id === "scale" ? "/contact" : "/signup";
          return (
            <article
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.featured : ""}`}
            >
              {plan.featured && (
                <span className={styles.featuredChip}>Most popular</span>
              )}
              <h2 className={styles.planName}>{plan.name}</h2>
              <p className={styles.blurb}>{plan.blurb}</p>

              <div className={styles.priceRow}>
                <span
                  key={`${plan.id}-${yearly}`}
                  className={styles.price}
                >
                  ${price}
                </span>
                <span className={styles.per}>
                  {plan.monthly === 0
                    ? "free forever"
                    : `per seat / month${yearly ? ", billed yearly" : ""}`}
                </span>
              </div>

              <Link
                href={href}
                className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"} btn-block`}
              >
                {plan.cta}
              </Link>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <IconCheck size={14} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className={styles.note}>
        All plans include unlimited viewers, version history, and bank-grade
        encryption. Yearly pricing reflects a 20% discount.
      </p>
    </div>
  );
}
