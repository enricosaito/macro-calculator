export interface StoredCalculation {
  currentStep: number;
  userData: {
    weight: string;
    height: string;
    age: string;
    sex: "male" | "female" | null;
    activityLevel: string;
    goal: string;
  };
  timestamp: number;
}

export const saveCalculationToStorage = (data: StoredCalculation): void => {
  try {
    localStorage.setItem("nutri-macros-calculation", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving calculation to localStorage:", error);
  }
};

export const getCalculationFromStorage = (): StoredCalculation | null => {
  try {
    const storedData = localStorage.getItem("nutri-macros-calculation");
    if (!storedData) return null;

    const calculation = JSON.parse(storedData) as StoredCalculation;

    // Check if calculation is older than 24 hours (86400000 ms)
    if (Date.now() - calculation.timestamp > 86400000) {
      localStorage.removeItem("nutri-macros-calculation");
      return null;
    }

    return calculation;
  } catch (error) {
    console.error("Error retrieving calculation from localStorage:", error);
    return null;
  }
};

export const clearCalculationFromStorage = (): void => {
  try {
    localStorage.removeItem("nutri-macros-calculation");
  } catch (error) {
    console.error("Error clearing calculation from localStorage:", error);
  }
};
