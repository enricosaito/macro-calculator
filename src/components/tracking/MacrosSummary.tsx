import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MacroTotals } from "@/types/tracking";
import { Flame, Dumbbell, Croissant, Droplet } from "lucide-react";

interface MacrosSummaryProps {
  consumed: MacroTotals;
  goal: MacroTotals;
}

const MacrosSummary: React.FC<MacrosSummaryProps> = ({ consumed, goal }) => {
  // Calculate percentages for the progress bars
  const calculatePercentage = (consumed: number, goal: number): number => {
    if (goal <= 0) return 0;
    return Math.min(Math.round((consumed / goal) * 100), 100);
  };

  const caloriesPercentage = calculatePercentage(consumed.calories, goal.calories);
  const proteinPercentage = calculatePercentage(consumed.protein, goal.protein);
  const carbsPercentage = calculatePercentage(consumed.carbs, goal.carbs);
  const fatsPercentage = calculatePercentage(consumed.fats, goal.fats);

  // Calculate remaining values
  const remaining = {
    calories: Math.max(0, goal.calories - consumed.calories),
    protein: Math.max(0, goal.protein - consumed.protein),
    carbs: Math.max(0, goal.carbs - consumed.carbs),
    fats: Math.max(0, goal.fats - consumed.fats),
  };

  return (
    <Card className="mb-6 border-border/50">
      <CardContent className="p-4">
        <h2 className="font-medium mb-4">Resumo de Macros</h2>

        <div className="space-y-4">
          {/* Calories */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Flame className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm font-medium">Calorias</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{Math.round(consumed.calories)}</span>
                <span className="text-muted-foreground"> / {goal.calories}</span>
                <span className="text-xs text-muted-foreground ml-1">({remaining.calories} restantes)</span>
              </div>
            </div>
            <Progress value={caloriesPercentage} className="h-2" />
          </div>

          {/* Protein */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Dumbbell className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">Proteínas</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{Math.round(consumed.protein)}g</span>
                <span className="text-muted-foreground"> / {goal.protein}g</span>
                <span className="text-xs text-muted-foreground ml-1">({remaining.protein}g restantes)</span>
              </div>
            </div>
            <Progress
              value={proteinPercentage}
              className="h-2 bg-blue-100 dark:bg-blue-900/30"
              indicatorClassName="bg-blue-500"
            />
          </div>

          {/* Carbs */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Croissant className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Carboidratos</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{Math.round(consumed.carbs)}g</span>
                <span className="text-muted-foreground"> / {goal.carbs}g</span>
                <span className="text-xs text-muted-foreground ml-1">({remaining.carbs}g restantes)</span>
              </div>
            </div>
            <Progress
              value={carbsPercentage}
              className="h-2 bg-yellow-100 dark:bg-yellow-900/30"
              indicatorClassName="bg-yellow-500"
            />
          </div>

          {/* Fats */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Droplet className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Gorduras</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{Math.round(consumed.fats)}g</span>
                <span className="text-muted-foreground"> / {goal.fats}g</span>
                <span className="text-xs text-muted-foreground ml-1">({remaining.fats}g restantes)</span>
              </div>
            </div>
            <Progress
              value={fatsPercentage}
              className="h-2 bg-green-100 dark:bg-green-900/30"
              indicatorClassName="bg-green-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MacrosSummary;
