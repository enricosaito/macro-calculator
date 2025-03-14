"use client";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Dumbbell, Croissant, Droplet, ChevronDown } from "lucide-react";
import { ptBR } from "@/locales/pt-BR";
import { useCalculations } from "@/hooks/useCalculations";
import { useAuth } from "@/context/AuthContext";
import HistoryDisplay from "./history-display";
import WaterCalculator from "./water-calculator";

interface ResultsPageProps {
  userData: {
    weight: string;
    height: string;
    age: string;
    sex: "male" | "female" | null;
    activityLevel: string;
    goal: string;
  };
  onStartOver: () => void;
}

const ResultsPage = ({ userData, onStartOver }: ResultsPageProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { saveCalculation } = useCalculations();
  const saveAttemptedRef = useRef(false);

  // Calculate BMR
  const calculateBMR = () => {
    const { weight, height, age, sex } = userData;
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height);
    const a = Number.parseFloat(age);

    if (sex === "male") {
      return 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * a - 161;
    }
  };

  // Calculate TDEE
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    return bmr * Number.parseFloat(userData.activityLevel);
  };

  const validateMacros = (macros: { calories: number; protein: number; carbs: number; fats: number }) => {
    const minProteinPercentage = 0.2; // Minimum 20% calories from protein
    const maxProteinPercentage = 0.4; // Maximum 40% calories from protein
    const minFatPercentage = 0.15; // Minimum 15% calories from fat
    const maxFatPercentage = 0.3; // Maximum 30% calories from fat

    const proteinCalories = macros.protein * 4;
    const fatCalories = macros.fats * 9;
    const proteinPercentage = proteinCalories / macros.calories;
    const fatPercentage = fatCalories / macros.calories;

    if (proteinPercentage < minProteinPercentage || proteinPercentage > maxProteinPercentage) {
      console.warn("Protein ratio outside recommended range");
    }

    if (fatPercentage < minFatPercentage || fatPercentage > maxFatPercentage) {
      console.warn("Fat ratio outside recommended range");
    }

    return macros;
  };

  // Calculate macros
  const calculateMacros = () => {
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

    return {
      calories: tdee,
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  };

  const macros = validateMacros(calculateMacros());
  const bmr = calculateBMR();
  const tdee = calculateTDEE();

  const scrollToEducationalContent = () => {
    // Add a small delay to ensure the component is fully rendered
    setTimeout(() => {
      const educationalContent = document.querySelector("#educational-content");
      if (educationalContent) {
        educationalContent.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback if the element isn't found - just scroll down
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    const saveResults = async () => {
      if (!currentUser || saveAttemptedRef.current) return; // Check if we already tried to save

      try {
        saveAttemptedRef.current = true; // Mark that we're attempting to save
        await saveCalculation({
          data: {
            weight: Number(userData.weight),
            height: Number(userData.height),
            age: Number(userData.age),
            sex: userData.sex as "male" | "female",
            activityLevel: userData.activityLevel,
            goal: userData.goal,
          },
          results: {
            bmr,
            tdee,
            macros,
          },
        });
      } catch (error) {
        console.error("Error saving results:", error);
      }
    };

    saveResults();
  }, [
    currentUser,
    saveCalculation,
    bmr,
    tdee,
    macros,
    userData.weight,
    userData.height,
    userData.age,
    userData.sex,
    userData.activityLevel,
    userData.goal,
  ]);

  const macroIcons = {
    calories: Flame,
    protein: Dumbbell,
    carbs: Croissant,
    fats: Droplet,
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">{ptBR.yourPersonalizedMacroPlan}</h2>
      <p className="text-lg mb-8 text-center text-muted-foreground">{ptBR.basedOnYourInfo}</p>

      {/* Macro Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(macros).map(([key, value], index) => {
          const Icon = macroIcons[key as keyof typeof macroIcons];
          const translatedKey = ptBR[key as keyof typeof ptBR];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{translatedKey}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {Math.round(value)}
                    {key === "calories" ? " kcal" : "g"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Water Calculator */}
      <div className="mb-8">
        <WaterCalculator weight={userData.weight} activityLevel={userData.activityLevel} />
      </div>

      {/* Motivational Message */}
      <motion.p
        className="mt-6 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {ptBR.rememberGuidelines}
      </motion.p>

      {/* History Display for authenticated users */}
      {currentUser && <HistoryDisplay />}

      {/* CTA Section */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-lg mb-4">
          {ptBR.takeNutritionToNextLevel}{" "}
          <span className="font-semibold text-primary">{ptBR.unlockPersonalizedPlans}</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={onStartOver} variant="outline">
            {ptBR.calculateAgain}
          </Button>
          {!currentUser && <Button onClick={() => navigate("/login")}>Fazer login para salvar resultados</Button>}
          <Button onClick={scrollToEducationalContent} variant="secondary">
            Saiba Mais <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
