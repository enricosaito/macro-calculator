import { motion } from "framer-motion";
import { useCalculations } from "@/hooks/useCalculations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Dumbbell, Croissant, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import HistoryDisplay from "./history-display";

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

  // Calculate percentages for the progress bars
  const totalCalories = macros.calories;
  const proteinCalories = protein * 4;
  const carbsCalories = carbs * 4;
  const fatsCalories = fats * 9;

  const proteinPercentage = (proteinCalories / totalCalories) * 100;
  const carbsPercentage = (carbsCalories / totalCalories) * 100;
  const fatsPercentage = (fatsCalories / totalCalories) * 100;

  const macroIcons = {
    calories: Flame,
    protein: Dumbbell,
    carbs: Croissant,
    fats: Droplet,
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Seu Plano de Macros Atual</h2>
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

      {/* Main Macro Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Resumo Diário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-primary">{Math.round(macros.calories)} kcal</p>
          </div>

          <div className="space-y-4">
            {/* Protein */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Proteína</span>
                </div>
                <span className="text-sm">
                  {Math.round(protein)}g ({Math.round(proteinPercentage)}%)
                </span>
              </div>
              <Progress value={proteinPercentage} className="h-2 bg-blue-100">
                <div className="h-full bg-blue-500" style={{ width: `${proteinPercentage}%` }}></div>
              </Progress>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Croissant className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Carboidratos</span>
                </div>
                <span className="text-sm">
                  {Math.round(carbs)}g ({Math.round(carbsPercentage)}%)
                </span>
              </div>
              <Progress value={carbsPercentage} className="h-2 bg-yellow-100">
                <div className="h-full bg-yellow-500" style={{ width: `${carbsPercentage}%` }}></div>
              </Progress>
            </div>

            {/* Fats */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Droplet className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Gorduras</span>
                </div>
                <span className="text-sm">
                  {Math.round(fats)}g ({Math.round(fatsPercentage)}%)
                </span>
              </div>
              <Progress value={fatsPercentage} className="h-2 bg-green-100">
                <div className="h-full bg-green-500" style={{ width: `${fatsPercentage}%` }}></div>
              </Progress>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={onNewCalculation} variant="outline">
              Recalcular Macros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Display */}
      <HistoryDisplay />
    </div>
  );
};

export default Dashboard;
