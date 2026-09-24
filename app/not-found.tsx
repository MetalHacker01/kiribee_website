import Link from "next/link";

// 404 for paths outside /sq and /en. The root layout is a pass-through,
// so this page renders its own document.
export default function NotFound() {
  return (
    <html lang="sq">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          margin: 0,
          background: "#f7efe2",
          color: "#221810",
          fontFamily: "Georgia, serif",
          textAlign: "center",
        }}
      >
        <main>
          <h1 style={{ fontSize: 40, fontWeight: 400 }}>Faqja nuk u gjet · Page not found</h1>
          <p style={{ marginTop: 16 }}>
            <Link href="/sq" style={{ color: "#8a4f0c" }}>
              kiribee.com
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
