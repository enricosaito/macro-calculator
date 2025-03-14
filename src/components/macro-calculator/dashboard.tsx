// src/components/macro-calculator/dashboard.tsx
import { motion } from "framer-motion";
import { useCalculations } from "@/hooks/useCalculations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Dumbbell, Croissant, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HistoryDisplay from "./history-display";
import MealTimingCalculator from "./meal-timing-calculator";

const Dashboard = ({ onNewCalculation }: { onNewCalculation: () => void }) => {
  const { calculations, loading } = useCalculations();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!calculations || calculations.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo à Calculadora de Macros</h2>
        <p className="mb-6">Você ainda não tem cálculos salvos. Vamos criar o seu primeiro plano de macros!</p>
        <Button onClick={onNewCalculation} size="lg">
          Calcular Seus Macros
        </Button>
      </div>
    );
  }

  const mostRecent = calculations[0];
  const macros = mostRecent.results.macros;
  const { protein, carbs, fats } = macros;

  // Calculate percentages for display
  const totalCalories = macros.calories;
  const proteinCalories = protein * 4;
  const carbsCalories = carbs * 4;
  const fatsCalories = fats * 9;

  const proteinPercentage = Math.round((proteinCalories / totalCalories) * 100);
  const carbsPercentage = Math.round((carbsCalories / totalCalories) * 100);
  const fatsPercentage = Math.round((fatsCalories / totalCalories) * 100);

  // Calculate water intake recommendation
  const calculateWaterIntake = () => {
    const weightKg = mostRecent.data.weight;
    if (isNaN(weightKg)) return null;

    // Base calculation: 35ml per kg of body weight
    let waterIntakeML = weightKg * 35;

    // Adjust based on activity level
    const activityMultiplier = parseFloat(mostRecent.data.activityLevel);
    if (!isNaN(activityMultiplier)) {
      if (activityMultiplier >= 1.55) {
        waterIntakeML += 500; // Add 500ml for moderate to very active
      }
      if (activityMultiplier >= 1.725) {
        waterIntakeML += 500; // Add another 500ml for very to extremely active
      }
    }

    const waterIntakeL = (waterIntakeML / 1000).toFixed(1);
    return waterIntakeL;
  };

  const waterIntake = calculateWaterIntake();

  // Define colors for the macro cards
  const macroColors = {
    calories: "bg-gradient-to-br from-orange-100 to-red-50 border-orange-200",
    protein: "bg-gradient-to-br from-blue-100 to-indigo-50 border-blue-200",
    carbs: "bg-gradient-to-br from-yellow-100 to-amber-50 border-yellow-200",
    fats: "bg-gradient-to-br from-green-100 to-emerald-50 border-green-200",
    water: "bg-gradient-to-br from-sky-100 to-blue-50 border-sky-200",
  };

  // Define icons and their colors
  const macroIcons = {
    calories: { icon: Flame, color: "text-orange-500" },
    protein: { icon: Dumbbell, color: "text-blue-500" },
    carbs: { icon: Croissant, color: "text-yellow-500" },
    fats: { icon: Droplet, color: "text-green-500" },
    water: { icon: Droplet, color: "text-sky-500" },
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Seu Plano de Macros Ideal</h2>
        <p className="text-muted-foreground mb-6">
          Baseado no seu último cálculo ({mostRecent.data.weight}kg,{" "}
          {mostRecent.data.goal === "lose"
            ? "Perder Peso"
            : mostRecent.data.goal === "maintain"
            ? "Manter Peso"
            : "Ganhar Peso"}
          )
        </p>
      </div>

      {/* Main Calories Card */}
      <Card className={`shadow-md ${macroColors.calories}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className={`h-8 w-8 ${macroIcons.calories.color}`} />
              <h3 className="text-xl font-semibold">Calorias Diárias Recomendadas</h3>
            </div>
            <p className="text-4xl font-bold">
              {Math.round(macros.calories)} <span className="text-xl">kcal</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrient Cards - 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Protein Card */}
        <Card className={`shadow-md ${macroColors.protein}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className={`h-6 w-6 ${macroIcons.protein.color}`} />
              <h3 className="text-lg font-semibold">Proteína</h3>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{Math.round(protein)}g</p>
              <p className="text-sm text-muted-foreground">{proteinPercentage}% das calorias</p>
            </div>
          </CardContent>
        </Card>

        {/* Carbs Card */}
        <Card className={`shadow-md ${macroColors.carbs}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Croissant className={`h-6 w-6 ${macroIcons.carbs.color}`} />
              <h3 className="text-lg font-semibold">Carboidratos</h3>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{Math.round(carbs)}g</p>
              <p className="text-sm text-muted-foreground">{carbsPercentage}% das calorias</p>
            </div>
          </CardContent>
        </Card>

        {/* Fats Card */}
        <Card className={`shadow-md ${macroColors.fats}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className={`h-6 w-6 ${macroIcons.fats.color}`} />
              <h3 className="text-lg font-semibold">Gorduras</h3>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{Math.round(fats)}g</p>
              <p className="text-sm text-muted-foreground">{fatsPercentage}% das calorias</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Water Intake Card */}
      {waterIntake && (
        <Card className={`shadow-md ${macroColors.water}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet className={`h-6 w-6 ${macroIcons.water.color}`} />
                <h3 className="text-lg font-semibold">Consumo Diário de Água</h3>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{waterIntake} L</p>
                <p className="text-sm text-muted-foreground">Recomendado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meal Timing Calculator */}
      <MealTimingCalculator goal={mostRecent.data.goal} activityLevel={mostRecent.data.activityLevel} />

      {/* Action Buttons */}
      <div className="flex justify-center mt-4">
        <Button onClick={onNewCalculation} variant="outline" className="mx-2">
          Recalcular Macros
        </Button>
      </div>

      {/* History Display */}
      <HistoryDisplay />
    </div>
  );
};

export default Dashboard;
