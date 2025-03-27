import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTracking } from "@/hooks/useTracking";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import PageTransition from "@/components/ui/page-transition";
import DatePicker from "@/components/tracking/DatePicker";
import MacrosSummary from "@/components/tracking/MacrosSummary";
import MealCard from "@/components/tracking/MealCard";
import AddMealButton from "@/components/tracking/AddMealButton";
import { MacroTotals } from "@/types/tracking";
import { useNavigate } from "react-router-dom";

const TrackingPage = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { currentDate, todayEntry, loading, error, stats, changeDate, addMeal, addFood, removeFood } = useTracking();

  // Default goal macros (should be fetched from the user's profile or calculations)
  const [goalMacros, setGoalMacros] = useState<MacroTotals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 70,
  });

  // Load user's goal macros from saved calculations
  useEffect(() => {
    const loadGoalMacros = () => {
      // Try to get the user's latest calculation from localStorage
      try {
        const storedCalc = localStorage.getItem("nutri-macros-calculation");
        if (storedCalc) {
          const calculation = JSON.parse(storedCalc);
          if (calculation.results) {
            setGoalMacros({
              calories: calculation.results.calories || 2000,
              protein: calculation.results.protein || 150,
              carbs: calculation.results.carbs || 200,
              fats: calculation.results.fats || 70,
            });
          }
        }
      } catch (error) {
        console.error("Error loading goal macros:", error);
      }
    };

    loadGoalMacros();
  }, []);

  // If not authenticated, show login prompt
  if (!authLoading && !currentUser) {
    return (
      <PageTransition>
        <div className="container mx-auto py-8 px-4 max-w-2xl">
          <Card>
            <CardContent className="p-6 text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Faça login para acessar o diário alimentar</h2>
              <p className="mb-6 text-muted-foreground">
                Para rastrear suas refeições e macronutrientes, você precisa estar logado.
              </p>
              <Button onClick={() => navigate("/login")}>Fazer Login</Button>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Diário Alimentar</h1>

        <DatePicker selectedDate={currentDate} onDateChange={changeDate} />

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Carregando...</span>
          </div>
        ) : (
          <>
            {/* Macros Summary */}
            <MacrosSummary
              consumed={todayEntry?.totals || { calories: 0, protein: 0, carbs: 0, fats: 0 }}
              goal={goalMacros}
            />

            {/* Stats Card */}
            {stats && (
              <Card className="mb-6 border-border/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-accent/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Dias Registrados</p>
                      <p className="text-xl font-bold">{stats.daysTracked}</p>
                    </div>
                    <div className="text-center p-2 bg-accent/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Sequência</p>
                      <p className="text-xl font-bold">{stats.streakDays} dias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add Meal Button */}
            <AddMealButton onAddMeal={addMeal} />

            {/* Meals List */}
            {todayEntry?.meals && todayEntry.meals.length > 0 ? (
              <div>
                {todayEntry.meals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} onAddFood={addFood} onRemoveFood={removeFood} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhuma refeição registrada para hoje. Adicione uma refeição para começar a rastrear.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default TrackingPage;
