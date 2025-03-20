import { useState, useEffect, useCallback } from "react";
import {
  saveCalculationToStorage,
  getCalculationFromStorage,
  clearCalculationFromStorage,
  StoredCalculation,
} from "@/lib/storage-utils";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import type { MacroCalculation } from "@/types/calculations";

export interface UserData {
  weight: string;
  height: string;
  age: string;
  sex: "male" | "female" | null;
  activityLevel: string;
  goal: string;
}

interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const useMacroCalculator = (initialData?: MacroCalculation) => {
  const { currentUser } = useAuth();

  // Initialize with either provided data, stored data, or empty defaults
  const getInitialData = useCallback(async (): Promise<{ userData: UserData; currentStep: number }> => {
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

    // If user is authenticated, try to get data from Firestore first
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().latestMacros) {
          const firestoreData = userDoc.data().latestMacros;
          return {
            userData: firestoreData.data,
            currentStep: 0, // Always start at step 0 when loading saved data
          };
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    }

    // Fall back to local storage if no Firestore data or not authenticated
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
  }, [currentUser, initialData]);

  const [initialState, setInitialState] = useState<{ userData: UserData; currentStep: number }>({
    userData: {
      weight: "",
      height: "",
      age: "",
      sex: null,
      activityLevel: "",
      goal: "",
    },
    currentStep: 0,
  });
  const [userData, setUserData] = useState<UserData>(initialState.userData);
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data asynchronously
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const data = await getInitialData();
      setInitialState(data);
      setUserData(data.userData);
      setCurrentStep(data.currentStep);
      setIsLoading(false);
    };

    loadInitialData();
  }, [getInitialData]);

  // Save calculation to storage and/or Firestore when data changes
  const saveCalculation = useCallback(
    async (step: number, data: UserData, results?: MacroResults) => {
      // Always save to local storage for consistency
      const calculationData: StoredCalculation = {
        currentStep: step,
        userData: data,
        timestamp: Date.now(),
        results,
      };
      saveCalculationToStorage(calculationData);

      // If user is authenticated, also save to Firestore
      if (currentUser && step === 4) {
        // Only save completed calculations to Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          await setDoc(
            userDocRef,
            {
              latestMacros: {
                data,
                results,
                updatedAt: new Date(),
              },
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error saving to Firestore:", error);
        }
      }
    },
    [currentUser]
  );

  // Update storage whenever calculation state changes
  useEffect(() => {
    if (currentStep > 0 && !isLoading) {
      saveCalculation(currentStep, userData);
    }
  }, [currentStep, userData, isLoading, currentUser, saveCalculation]);

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

  const saveResults = (results: MacroResults) => {
    saveCalculation(currentStep, userData, results);
  };

  return {
    userData,
    currentStep,
    handleNext,
    handlePrevious,
    updateUserData,
    handleStartOver,
    saveResults,
    isLoading,
  };
};

export default useMacroCalculator;
