// src/components/macro-calculator/__tests__/dashboard.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../dashboard";
import { useCalculations } from "@/hooks/useCalculations";
import { Timestamp } from "firebase/firestore";

// Mock the hooks
vi.mock("@/hooks/useCalculations", () => ({
  useCalculations: vi.fn(),
}));

// Mock firebase/firestore
vi.mock("firebase/firestore", () => ({
  Timestamp: {
    now: () => ({
      seconds: Date.now() / 1000,
      nanoseconds: 0,
      toDate: () => new Date(),
      toMillis: () => Date.now(),
      isEqual: () => false,
      toJSON: () => ({}),
    }),
  },
}));

describe("Dashboard component", () => {
  it("shows loading state when data is loading", () => {
    // Mock the hook to return loading state
    vi.mocked(useCalculations).mockReturnValue({
      calculations: [],
      loading: true,
      saveCalculation: vi.fn(),
      deleteCalculation: vi.fn(),
      refreshCalculations: vi.fn(),
    });

    render(<Dashboard onNewCalculation={() => {}} />);

    // Check if loading spinner is visible
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows welcome message when no calculations exist", () => {
    // Mock the hook to return empty calculations
    vi.mocked(useCalculations).mockReturnValue({
      calculations: [],
      loading: false,
      saveCalculation: vi.fn(),
      deleteCalculation: vi.fn(),
      refreshCalculations: vi.fn(),
    });

    render(<Dashboard onNewCalculation={() => {}} />);

    expect(screen.getByText(/bem-vindo à calculadora de macros/i)).toBeInTheDocument();
    expect(screen.getByText(/você ainda não tem cálculos salvos/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calcular seus macros/i })).toBeInTheDocument();
  });

  it("displays calculation results when data exists", () => {
    // Create a proper timestamp mock
    const timestamp = {
      seconds: Date.now() / 1000,
      nanoseconds: 0,
      toDate: () => new Date(),
      toMillis: () => Date.now(),
      isEqual: () => false,
      toJSON: () => ({}),
    } as unknown as Timestamp;

    // Mock calculation data
    const mockCalculations = [
      {
        id: "1",
        userId: "user123",
        timestamp,
        data: {
          weight: 70,
          height: 175,
          age: 30,
          sex: "male" as const,
          activityLevel: "1.55",
          goal: "maintain",
        },
        results: {
          bmr: 1700,
          tdee: 2635,
          macros: {
            calories: 2635,
            protein: 154,
            carbs: 329,
            fats: 59,
          },
        },
      },
    ];

    vi.mocked(useCalculations).mockReturnValue({
      calculations: mockCalculations,
      loading: false,
      saveCalculation: vi.fn(),
      deleteCalculation: vi.fn(),
      refreshCalculations: vi.fn(),
    });

    render(<Dashboard onNewCalculation={() => {}} />);

    // Check if the calculation results are displayed
    expect(screen.getByText(/seu plano de macros ideal/i)).toBeInTheDocument();
    expect(screen.getByText(/2635/)).toBeInTheDocument(); // Calories
    expect(screen.getByText(/154/)).toBeInTheDocument(); // Protein
    expect(screen.getByText(/329/)).toBeInTheDocument(); // Carbs
    expect(screen.getByText(/59/)).toBeInTheDocument(); // Fats
  });
});
