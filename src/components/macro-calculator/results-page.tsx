"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Dumbbell, Croissant, Droplet, ArrowLeft, Share2, Info, BookOpen } from "lucide-react";
import { useCalculations } from "@/hooks/useCalculations";
import { useAuth } from "@/context/AuthContext";

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

  const macros = calculateMacros();
  const bmr = calculateBMR();
  const tdee = calculateTDEE();

  // Handle sharing results
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Meus Resultados NutriMacros",
          text: `Minhas necessidades diárias: ${Math.round(macros.calories)} calorias, ${macros.protein}g proteína, ${
            macros.carbs
          }g carboidratos, ${macros.fats}g gorduras`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(
          `Minhas necessidades diárias: ${Math.round(macros.calories)} calorias, ${macros.protein}g proteína, ${
            macros.carbs
          }g carboidratos, ${macros.fats}g gorduras`
        )
        .then(() => {
          alert("Resultados copiados para a área de transferência!");
        });
    }
  };

  const scrollToEducationalContent = () => {
    const educationPoint = document.getElementById("education-point-1");
    if (educationPoint) {
      // Get the position of the element
      const elementPosition = educationPoint.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 120; // Position it 120px from the top

      // Scroll to that position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const saveResults = async () => {
      if (!currentUser) return;

      try {
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

  const goalText =
    userData.goal === "lose" ? "perder peso" : userData.goal === "maintain" ? "manter peso" : "ganhar massa muscular";

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const scale = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  return (
    <motion.div className="w-full max-w-2xl mx-auto" initial="hidden" animate="show" variants={container}>
      <motion.div variants={item} className="text-center mb-8">
        <div className="inline-block p-3 bg-primary/20 rounded-full mb-4">
          <Flame className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Seu Plano de Macros Personalizado</h2>
        <p className="text-muted-foreground">Baseado no seu perfil para {goalText}</p>
      </motion.div>

      {/* Main Calories Card */}
      <motion.div variants={scale} className="mb-8">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground uppercase text-sm tracking-wide mb-1">Calorias Diárias</p>
              <h3 className="text-5xl font-bold text-primary mb-1">{Math.round(macros.calories)}</h3>
              <p className="text-lg">kcal</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Macronutrient Cards */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4 mb-8">
        {/* Carbs Card */}
        <Card className="shadow-sm bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Croissant className="h-6 w-6 text-yellow-500 mb-1" />
            <h4 className="text-sm font-medium mb-1">Carboidratos</h4>
            <p className="text-2xl font-bold">{macros.carbs}g</p>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card className="shadow-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Dumbbell className="h-6 w-6 text-blue-500 mb-1" />
            <h4 className="text-sm font-medium mb-1">Proteínas</h4>
            <p className="text-2xl font-bold">{macros.protein}g</p>
          </CardContent>
        </Card>

        {/* Fats Card - Changed to red */}
        <Card className="shadow-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Droplet className="h-6 w-6 text-red-500 mb-1" />
            <h4 className="text-sm font-medium mb-1">Gorduras</h4>
            <p className="text-2xl font-bold">{macros.fats}g</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={item} className="flex flex-col gap-3 mt-8">
        <Button onClick={handleShare} variant="outline" size="lg" className="gap-2 w-full">
          <Share2 className="h-4 w-4" />
          Compartilhar Resultados
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onStartOver} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Recalcular
          </Button>

          {!currentUser && (
            <Button onClick={() => navigate("/login")} size="lg">
              Salvar Resultados
            </Button>
          )}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={item} className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
        <h3 className="font-medium mb-1 flex items-center justify-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Importante!
        </h3>
        <p>
          Dedique <strong>3 minutos</strong> para ler as anotações abaixo 👇
        </p>
        <Button onClick={scrollToEducationalContent} variant="outline" className="mt-4 gap-2">
          <BookOpen className="h-4 w-4" />
          Ler mais ↓
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPage;
