import { useState, useEffect } from "react";
import {
  saveCalculationToStorage,
  getCalculationFromStorage,
  clearCalculationFromStorage,
  StoredCalculation,
} from "@/lib/storage-utils";
import type { MacroCalculation } from "@/types/calculations";

export interface UserData {
  weight: string;
  height: string;
  age: string;
  sex: "male" | "female" | null;
  activityLevel: string;
  goal: string;
}

const useMacroCalculator = (initialData?: MacroCalculation) => {
  // Initialize with either provided data, stored data, or empty defaults
  const getInitialData = (): { userData: UserData; currentStep: number } => {
    if (initialData) {
      return {
        userData: {
          weight: initialData.data.weight.toString() || "",
          height: initialData.data.height.toString() || "",
          age: initialData.data.age.toString() || "",
          sex: initialData.data.sex || null,
          activityLevel: initialData.data.activityLevel || "",
          goal: initialData.data.goal || "",
        },
        currentStep: 0,
      };
    }

    const storedCalculation = getCalculationFromStorage();
    if (storedCalculation) {
      return {
        userData: storedCalculation.userData,
        currentStep: storedCalculation.currentStep,
      };
    }

    return {
      userData: {
        weight: "",
        height: "",
        age: "",
        sex: null,
        activityLevel: "",
        goal: "",
      },
      currentStep: 0,
    };
  };

  const initialState = getInitialData();
  const [userData, setUserData] = useState<UserData>(initialState.userData);
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);

  // Update storage whenever calculation state changes
  useEffect(() => {
    if (currentStep > 0) {
      const calculationData: StoredCalculation = {
        currentStep,
        userData,
        timestamp: Date.now(),
      };
      saveCalculationToStorage(calculationData);
    }
  }, [currentStep, userData]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const handleStartOver = () => {
    clearCalculationFromStorage();
    setCurrentStep(0);
    setUserData({
      weight: "",
      height: "",
      age: "",
      sex: null,
      activityLevel: "",
      goal: "",
    });
  };

  return {
    userData,
    currentStep,
    handleNext,
    handlePrevious,
    updateUserData,
    handleStartOver,
  };
};

export default useMacroCalculator;
