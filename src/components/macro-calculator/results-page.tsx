import { useCallback, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Dumbbell, Croissant, Droplet, ArrowLeft, Share2, Info, BookOpen, UtensilsCrossed } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  calculationResults: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null;
}

const ResultsPage = ({ userData, onStartOver, calculationResults }: ResultsPageProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const hasSavedRef = useRef(false);

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

  // Use calculation results from props, or fallback to zeros
  // Use useMemo to avoid re-creating the object on each render
  const macros = useMemo(
    () =>
      calculationResults || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      },
    [calculationResults]
  );

  const bmr = calculateBMR();
  const tdee = calculateTDEE();

  // Save to user profile
  const saveToUserProfile = useCallback(async () => {
    // Guard against multiple saves and ensure user is logged in
    if (!currentUser || hasSavedRef.current) return;

    try {
      // Save to user profile document
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
              macros,
            },
            updatedAt: new Date(),
          },
        },
        { merge: true }
      );

      // Mark as saved to prevent subsequent saves
      hasSavedRef.current = true;
    } catch (error) {
      console.error("Error saving to user profile:", error);
    }
  }, [
    currentUser,
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

  // Save to user profile when component mounts
  useEffect(() => {
    saveToUserProfile();
  }, [saveToUserProfile]);

  // Navigate to recipe planner
  const goToRecipePlanner = () => {
    navigate("/recipes");
  };

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

  const goalText = useMemo(
    () =>
      userData.goal === "lose" ? "perder peso" : userData.goal === "maintain" ? "manter peso" : "ganhar massa muscular",
    [userData.goal]
  );

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
        {/* New Recipe Planner Button */}
        <Button
          onClick={goToRecipePlanner}
          size="lg"
          className="gap-2 w-full bg-gradient-to-r from-primary to-primary/80 shadow-md"
        >
          <UtensilsCrossed className="h-4 w-4" />
          Explorar Receitas para Seus Macros
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleShare} variant="outline" size="lg" className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>

          <Button onClick={onStartOver} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Recalcular
          </Button>
        </div>

        {!currentUser && (
          <Button onClick={() => navigate("/login")} variant="outline" size="lg">
            Salvar Resultados
          </Button>
        )}
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
