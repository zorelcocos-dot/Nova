"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandGoogle, BrandGitHub } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import s from "./auth.module.css";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  function forgotPassword() {
    const email = (document.getElementById("email") as HTMLInputElement | null)?.value.trim();
    if (!email || !email.includes("@")) {
      toast("Enter your work email above first — then we can send a reset link.", "danger");
      document.getElementById("email")?.focus();
      return;
    }
    toast(`Reset link sent to ${email} — it expires in 30 minutes.`, "success");
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <>
      <div className={s.ssoRow}>
        <button type="button" className="btn btn-secondary" onClick={() => router.push("/dashboard")}>
          <BrandGoogle size={16} /> Google
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => router.push("/dashboard")}>
          <BrandGitHub size={16} /> GitHub
        </button>
      </div>

      <div className={s.divider}>or continue with email</div>

      <form className={s.form} onSubmit={submit}>
        {isSignup && (
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <input className="input" id="name" name="name" placeholder="Maya Chen" required autoComplete="name" />
          </div>
        )}
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input className="input" id="email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder={isSignup ? "8+ characters" : "Your password"}
            minLength={8}
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </div>
        {!isSignup && (
          <button type="button" className={s.forgot} onClick={forgotPassword}>
            Forgot password?
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 4 }}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden />
              One moment…
            </>
          ) : isSignup ? (
            "Create workspace"
          ) : (
            "Log in"
          )}
        </button>
      </form>

      {isSignup ? (
        <>
          <p className={s.legal}>
            By creating an account you agree to NOVA&rsquo;s{" "}
            <Link href="/terms">Terms of Service</Link> and acknowledge the{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <p className={s.microcopy}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </>
      ) : (
        <p className={s.microcopy}>
          New to NOVA? <Link href="/signup">Create an account</Link>
        </p>
      )}
    </>
  );
}
