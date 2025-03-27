import { useState } from "react";
import { Meal, FoodEntry } from "@/types/tracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Clock } from "lucide-react";
import FoodEntryForm from "./FoodEntryForm";

interface MealCardProps {
  meal: Meal;
  onAddFood: (mealId: string, food: Omit<FoodEntry, "id">) => void;
  onRemoveFood: (mealId: string, foodId: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onAddFood, onRemoveFood }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFood = (food: Omit<FoodEntry, "id">) => {
    onAddFood(meal.id, food);
    setShowAddForm(false);
  };

  const formatTime = (date: Date | { seconds: number; nanoseconds: number } | undefined) => {
    if (!date) return "";

    if (date instanceof Date) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // If it's a Firestore timestamp object
    if ("seconds" in date) {
      return new Date(date.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "";
  };

  return (
    <Card className="mb-4 border-border/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            {meal.name}
            {meal.time && (
              <span className="text-xs ml-2 text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(meal.time instanceof Date ? meal.time : new Date(meal.time.seconds * 1000))}
              </span>
            )}
          </CardTitle>
          <div className="text-sm text-muted-foreground">{Math.round(meal.macros.calories)} kcal</div>
        </div>
      </CardHeader>
      <CardContent>
        {meal.foods.length > 0 ? (
          <div className="space-y-2 mb-4">
            {meal.foods.map((food) => (
              <div
                key={food.id}
                className="flex justify-between items-center py-1 border-b border-border/30 last:border-0"
              >
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm">{food.calories} kcal</div>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      {food.amount} {food.unit}
                    </span>
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>G: {food.fats}g</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveFood(meal.id, food.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">Nenhum alimento adicionado</div>
        )}

        {showAddForm ? (
          <FoodEntryForm onAdd={handleAddFood} onCancel={() => setShowAddForm(false)} />
        ) : (
          <Button variant="outline" className="w-full mt-2" onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Alimento
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MealCard;
