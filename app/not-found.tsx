import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "var(--bg)",
        textAlign: "center",
      }}
    >
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h-1" style={{ marginTop: 18 }}>
          This page clocked out.
        </h1>
        <p className="lead" style={{ marginTop: 18, maxWidth: 420 }}>
          The link may be old, or the page moved. Either way, our agents left
          a note in the audit log.
        </p>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/docs" className="btn btn-secondary">
            Read the docs
          </Link>
        </div>
      </div>
    </div>
  );
}
