"use client";

import { useState, useRef, useEffect } from "react";
import { GitHubRepo } from "@/lib/github";

interface ExportButtonProps {
  repos: GitHubRepo[];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportCSV(repos: GitHubRepo[]) {
  const headers = [
    "name",
    "description",
    "language",
    "stars",
    "forks",
    "created_at",
    "updated_at",
  ];
  const escapeCSV = (val: string | null | number): string => {
    const str = val === null ? "" : String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = repos.map((r) =>
    [
      r.name,
      r.description,
      r.language,
      r.stargazers_count,
      r.forks_count,
      r.created_at,
      r.updated_at,
    ]
      .map(escapeCSV)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, "reporadar-export.csv");
}

function exportJSON(repos: GitHubRepo[]) {
  const json = JSON.stringify(repos, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  downloadBlob(blob, "reporadar-export.json");
}

export default function ExportButton({ repos }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border border-[var(--card-border)] text-[var(--text-dim)] rounded-lg text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2v8" />
          <path d="M4 7l4 4 4-4" />
          <path d="M2 13h12" />
        </svg>
        Export
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-lg overflow-hidden min-w-[160px]">
          <button
            onClick={() => {
              exportCSV(repos);
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="1" width="12" height="12" rx="1" />
              <path d="M1 5h12" />
              <path d="M5 1v12" />
              <path d="M9 1v12" />
              <path d="M1 9h12" />
            </svg>
            Export CSV
          </button>
          <button
            onClick={() => {
              exportJSON(repos);
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-[var(--text)] hover:bg-[var(--accent-dim)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 border-t border-[var(--card-border)]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 2C3 2 2 3 2 4v1c0 1-1 1.5-1 2s1 1 1 2v1c0 1 1 2 2 2" />
              <path d="M10 2c1 0 2 1 2 2v1c0 1 1 1.5 1 2s-1 1-1 2v1c0 1-1 2-2 2" />
            </svg>
            Export JSON
          </button>
        </div>
      )}
    </div>
  );
}
