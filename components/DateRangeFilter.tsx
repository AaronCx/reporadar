"use client";

import { useState } from "react";

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  filterField: "created_at" | "updated_at";
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  onFilterFieldChange: (field: "created_at" | "updated_at") => void;
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  filterField,
  onFromDateChange,
  onToDateChange,
  onFilterFieldChange,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);

  const hasFilter = fromDate || toDate;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
          hasFilter
            ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
            : "border-[var(--card-border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        }`}
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
          <rect x="2" y="3" width="12" height="11" rx="1" />
          <path d="M2 6h12" />
          <path d="M5 1v3" />
          <path d="M11 1v3" />
        </svg>
        Date Filter
        {hasFilter && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onFromDateChange("");
              onToDateChange("");
            }}
            className="ml-1 text-xs hover:text-white cursor-pointer"
          >
            ✕
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-lg min-w-[280px] space-y-3">
          <div className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-2">
            Filter by
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onFilterFieldChange("created_at")}
              className={`flex-1 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                filterField === "created_at"
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--bg)] text-[var(--text-dim)] border border-[var(--card-border)] hover:border-[var(--accent)]"
              }`}
            >
              Created
            </button>
            <button
              onClick={() => onFilterFieldChange("updated_at")}
              className={`flex-1 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                filterField === "updated_at"
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--bg)] text-[var(--text-dim)] border border-[var(--card-border)] hover:border-[var(--accent)]"
              }`}
            >
              Updated
            </button>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="text-xs text-[var(--text-dim)]">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-[var(--bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors [color-scheme:dark]"
              />
            </label>
            <label className="block">
              <span className="text-xs text-[var(--text-dim)]">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-[var(--bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors [color-scheme:dark]"
              />
            </label>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-full px-3 py-2 bg-[var(--accent)] text-black text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
