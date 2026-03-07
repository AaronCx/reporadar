import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepoRadar — Scan Any GitHub Profile",
  description:
    "Analyze any GitHub user's public repos and generate a visual developer profile. No API keys required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col relative z-10">
        <main className="flex-1">{children}</main>
        <footer className="text-center py-6 text-sm text-[var(--text-dim)] border-t border-[var(--card-border)]">
          Built by{" "}
          <a
            href="https://aaroncx.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Aaron Character
          </a>
        </footer>
      </body>
    </html>
  );
}
