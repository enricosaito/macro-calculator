import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useMacroCalculator from "../useMacroCalculator";
import * as storageUtils from "@/lib/storage-utils";

// Mock the storage utils
vi.mock("@/lib/storage-utils", () => ({
  saveCalculationToStorage: vi.fn(),
  getCalculationFromStorage: vi.fn(() => null),
  clearCalculationFromStorage: vi.fn(),
}));

describe("useMacroCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default values when no data is provided", () => {
    const { result } = renderHook(() => useMacroCalculator());

    expect(result.current.userData).toEqual({
      weight: "",
      height: "",
      age: "",
      sex: null,
      activityLevel: "",
      goal: "",
    });

    expect(result.current.currentStep).toBe(0);
  });

  it("updates user data correctly", () => {
    const { result } = renderHook(() => useMacroCalculator());

    act(() => {
      result.current.updateUserData({ weight: "70", height: "175" });
    });

    expect(result.current.userData.weight).toBe("70");
    expect(result.current.userData.height).toBe("175");
  });

  it("handles next and previous steps correctly", () => {
    const { result } = renderHook(() => useMacroCalculator());

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentStep).toBe(2);

    act(() => {
      result.current.handlePrevious();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it("resets to initial state when starting over", () => {
    const { result } = renderHook(() => useMacroCalculator());

    // Set some data and advance steps
    act(() => {
      result.current.updateUserData({ weight: "70", height: "175" });
      result.current.handleNext();
      result.current.handleNext();
    });

    // Verify state is changed
    expect(result.current.userData.weight).toBe("70");
    expect(result.current.currentStep).toBe(2);

    // Start over
    act(() => {
      result.current.handleStartOver();
    });

    // Verify state is reset
    expect(result.current.userData).toEqual({
      weight: "",
      height: "",
      age: "",
      sex: null,
      activityLevel: "",
      goal: "",
    });
    expect(result.current.currentStep).toBe(0);
    expect(storageUtils.clearCalculationFromStorage).toHaveBeenCalled();
  });

  it("saves to storage when currentStep changes", () => {
    const { result } = renderHook(() => useMacroCalculator());

    act(() => {
      result.current.handleNext();
    });

    expect(storageUtils.saveCalculationToStorage).toHaveBeenCalled();
  });
});
