import { useState } from "react";

interface UserData {
  weight: string;
  height: string;
  age: string;
  sex: "male" | "female" | null;
  activityLevel: string;
  goal: string;
}

const useMacroCalculator = () => {
  const [userData, setUserData] = useState<UserData>({
    weight: "",
    height: "",
    age: "",
    sex: null,
    activityLevel: "",
    goal: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4)); // 4 steps total (landing, bmr, activity, goal, results)
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
