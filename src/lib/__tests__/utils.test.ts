// src/lib/__tests__/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    // Basic class merging
    expect(cn("class-a", "class-b")).toBe("class-a class-b");

    // Handling null and undefined
    expect(cn("class-a", null, undefined, "class-b")).toBe("class-a class-b");

    // Conditional classes - avoid direct && in the test
    const falseCondition = false;
    const trueCondition = true;
    const conditionalClasses = ["class-a", falseCondition ? "class-b" : null, trueCondition ? "class-c" : null];
    expect(cn(...conditionalClasses)).toBe("class-a class-c");
  });
});
