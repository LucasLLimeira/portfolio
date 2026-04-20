import { describe, expect, it } from "vitest";

import { getLanguageColor } from "./language-colors";

describe("getLanguageColor", () => {
  it("returns mapped color for known language", () => {
    expect(getLanguageColor("TypeScript")).toBe("#2563eb");
  });

  it("returns fallback palette color for unknown language", () => {
    expect(getLanguageColor("unknown", 2)).toBe("#facc15");
  });
});
