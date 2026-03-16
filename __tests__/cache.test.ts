import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getCached, setCache } from "@/lib/cache";

describe("cache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns cached value after setCache", () => {
    setCache("test-key", { name: "Alice" });
    const result = getCached<{ name: string }>("test-key");
    expect(result).toEqual({ name: "Alice" });
  });

  it("returns null for cache miss", () => {
    const result = getCached("nonexistent-key");
    expect(result).toBeNull();
  });

  it("returns null after TTL expiration", () => {
    setCache("expire-key", "hello", 1000); // 1 second TTL
    expect(getCached("expire-key")).toBe("hello");

    // Advance time past TTL
    vi.advanceTimersByTime(1500);
    expect(getCached("expire-key")).toBeNull();
  });

  it("uses default 5-minute TTL", () => {
    setCache("default-ttl", 42);
    expect(getCached("default-ttl")).toBe(42);

    // Advance 4 minutes — still valid
    vi.advanceTimersByTime(4 * 60 * 1000);
    expect(getCached("default-ttl")).toBe(42);

    // Advance past 5 minutes total
    vi.advanceTimersByTime(2 * 60 * 1000);
    expect(getCached("default-ttl")).toBeNull();
  });

  it("overwrites existing cache entry", () => {
    setCache("overwrite-key", "first");
    setCache("overwrite-key", "second");
    expect(getCached("overwrite-key")).toBe("second");
  });
});
