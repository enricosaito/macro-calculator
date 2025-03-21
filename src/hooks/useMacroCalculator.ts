import { useState, useEffect, useCallback } from "react";
import { saveCalculationToStorage, getCalculationFromStorage } from "@/lib/storage-utils";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export interface UserData {
  weight: string;
  height: string;
  age: string;
  sex: "male" | "female" | null;
  activityLevel: string;
  goal: string;
}

export interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const useMacroCalculator = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    weight: "",
    height: "",
    age: "",
    sex: null,
    activityLevel: "",
    goal: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [calculationResults, setCalculationResults] = useState<MacroResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      setIsLoading(true);
      let savedResults: MacroResults | null = null;
      let savedData: Partial<UserData> | null = null;
      let savedStep = 0;

      try {
        // First try to get data from Firestore for logged-in users
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().latestMacros) {
            const firestoreData = userDoc.data().latestMacros;

            if (firestoreData.data) {
              savedData = {
                weight: String(firestoreData.data.weight || ""),
                height: String(firestoreData.data.height || ""),
                age: String(firestoreData.data.age || ""),
                sex: firestoreData.data.sex || null,
                activityLevel: firestoreData.data.activityLevel || "",
                goal: firestoreData.data.goal || "",
              };
            }

            if (firestoreData.results && firestoreData.results.macros) {
              savedResults = {
                calories: firestoreData.results.macros.calories,
                protein: firestoreData.results.macros.protein,
                carbs: firestoreData.results.macros.carbs,
                fats: firestoreData.results.macros.fats,
              };
              // If we have results, we should show the results page
              savedStep = 4;
            }
          }
        }

        // Fall back to localStorage if no Firestore data or not logged in
        if (!savedData || !savedResults) {
          const storedCalc = getCalculationFromStorage();
          if (storedCalc) {
            if (!savedData) {
              savedData = storedCalc.userData;
            }

            if (!savedResults && storedCalc.results) {
              savedResults = {
                calories: storedCalc.results.calories,
                protein: storedCalc.results.protein,
                carbs: storedCalc.results.carbs,
                fats: storedCalc.results.fats,
              };
              // If we have results, we should show the results page
              savedStep = 4;
            }

            // Only use stored step if we don't have results yet
            if (!savedResults && storedCalc.currentStep > 0) {
              savedStep = storedCalc.currentStep;
            }
          }
        }

        // Update state with the loaded data
        if (savedData) {
          setUserData((prev) => ({ ...prev, ...savedData }));
        }

        if (savedResults) {
          setCalculationResults(savedResults);
        }

        // Set the step unless we're recalculating
        if (!isRecalculating) {
          setCurrentStep(savedStep);
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [currentUser, isRecalculating]);

  // Calculate BMR
  const calculateBMR = useCallback(() => {
    const { weight, height, age, sex } = userData;
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height);
    const a = Number.parseFloat(age);

    if (sex === "male") {
      return 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * a - 161;
    }
  }, [userData]);

  // Calculate TDEE
  const calculateTDEE = useCallback(() => {
    const bmr = calculateBMR();
    return bmr * Number.parseFloat(userData.activityLevel);
  }, [calculateBMR, userData.activityLevel]);

  // Calculate macros
  const calculateMacros = useCallback(() => {
    let tdee = calculateTDEE();
    const weight = parseFloat(userData.weight);

    // Adjust TDEE based on goal
    if (userData.goal === "lose") {
      tdee -= 500; // Caloric deficit
    } else if (userData.goal === "gain") {
      tdee += 500; // Caloric surplus
    }

    // Calculate protein (2.2g per kg of body weight)
    const protein = weight * 2.2;

    // Calculate fats based on goal
    let fatPercentage;
    if (userData.goal === "lose") {
      fatPercentage = 0.2; // 20% (middle of 15-25% range for cutting)
    } else if (userData.goal === "gain") {
      fatPercentage = 0.25; // 25% (middle of 20-30% range for bulking)
    } else {
      fatPercentage = 0.225; // 22.5% (middle ground for maintenance)
    }

    const fats = (tdee * fatPercentage) / 9; // 9 calories per gram of fat

    // Calculate remaining calories for carbs
    const proteinCalories = protein * 4; // 4 calories per gram of protein
    const fatCalories = fats * 9;
    const remainingCalories = tdee - proteinCalories - fatCalories;
    const carbs = remainingCalories / 4; // 4 calories per gram of carbs

    const results = {
      calories: tdee,
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };

    return results;
  }, [calculateTDEE, userData.goal, userData.weight]);

  // Handle starting over / recalculating
  const handleStartOver = useCallback(() => {
    setIsRecalculating(true);
    setCurrentStep(1); // Go directly to step 1 with data pre-filled

    // Save current step to storage
    saveCalculationToStorage({
      currentStep: 1,
      userData,
      timestamp: Date.now(),
    });
  }, [userData]);

  // Handle next step
  const handleNext = useCallback(() => {
    const nextStep = Math.min(currentStep + 1, 4);
    setCurrentStep(nextStep);

    // If moving to results page, calculate and save results
    if (nextStep === 4) {
      const results = calculateMacros();
      setCalculationResults(results);

      // Save to storage with results
      saveCalculationToStorage({
        currentStep: nextStep,
        userData,
        timestamp: Date.now(),
        results,
      });
    } else {
      // Save to storage without results
      saveCalculationToStorage({
        currentStep: nextStep,
        userData,
        timestamp: Date.now(),
      });
    }

    // Reset recalculating flag if we were recalculating
    if (isRecalculating) {
      setIsRecalculating(false);
    }
  }, [currentStep, userData, calculateMacros, isRecalculating]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);

    // Save to storage
    saveCalculationToStorage({
      currentStep: prevStep,
      userData,
      timestamp: Date.now(),
    });
  }, [currentStep, userData]);

  // Update user data
  const updateUserData = useCallback(
    (data: Partial<UserData>) => {
      setUserData((prev) => {
        const newUserData = { ...prev, ...data };

        // Save to storage
        saveCalculationToStorage({
          currentStep,
          userData: newUserData,
          timestamp: Date.now(),
        });

        return newUserData;
      });
    },
    [currentStep]
  );

  // Save results to Firestore (for ResultsPage component)
  const saveResultsToFirestore = useCallback(async () => {
    if (!currentUser || !calculationResults) return;

    try {
      const bmr = calculateBMR();
      const tdee = calculateTDEE();

      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userDocRef,
        {
          latestMacros: {
            data: {
              weight: Number(userData.weight),
              height: Number(userData.height),
              age: Number(userData.age),
              sex: userData.sex,
              activityLevel: userData.activityLevel,
              goal: userData.goal,
            },
            results: {
              bmr,
              tdee,
              macros: calculationResults,
            },
            updatedAt: new Date(),
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  }, [currentUser, userData, calculationResults, calculateBMR, calculateTDEE]);

  return {
    userData,
    currentStep,
    calculationResults,
    isLoading,
    isRecalculating,
    handleNext,
    handlePrevious,
    updateUserData,
    handleStartOver,
    calculateBMR,
    calculateTDEE,
    calculateMacros,
    saveResultsToFirestore,
  };
};

export default useMacroCalculator;
