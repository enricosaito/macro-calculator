import { useState } from "react";
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
  const [userData, setUserData] = useState<UserData>({
    weight: initialData?.data.weight.toString() || "",
    height: initialData?.data.height.toString() || "",
    age: initialData?.data.age.toString() || "",
    sex: initialData?.data.sex || null,
    activityLevel: initialData?.data.activityLevel || "",
    goal: initialData?.data.goal || "",
  });

  const [currentStep, setCurrentStep] = useState(0);

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
