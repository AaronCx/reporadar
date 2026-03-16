import { describe, it, expect, beforeEach } from "bun:test";
import { getCached, setCache } from "../lib/cache";

// We need a fresh cache for each test — the module caches a Map
// So we'll use unique keys per test to avoid cross-contamination

describe("cache", () => {
  it("returns cached value after setCache", () => {
    setCache("test-key-1", { name: "Alice" });
    const result = getCached<{ name: string }>("test-key-1");
    expect(result).toEqual({ name: "Alice" });
  });

  it("returns null for cache miss", () => {
    const result = getCached("nonexistent-key");
    expect(result).toBeNull();
  });

  it("returns null after TTL expiration", async () => {
    setCache("expire-key", "hello", 50); // 50ms TTL
    expect(getCached("expire-key")).toBe("hello");

    // Wait past TTL
    await new Promise((r) => setTimeout(r, 100));
    expect(getCached("expire-key")).toBeNull();
  });

  it("uses default TTL (value available immediately)", () => {
    setCache("default-ttl", 42);
    expect(getCached("default-ttl")).toBe(42);
  });

  it("overwrites existing cache entry", () => {
    setCache("overwrite-key", "first");
    setCache("overwrite-key", "second");
    expect(getCached("overwrite-key")).toBe("second");
  });
});
