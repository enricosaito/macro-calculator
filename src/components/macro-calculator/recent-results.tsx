import { useState } from "react";
import { useCalculations } from "@/hooks/useCalculations";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RecentResults = () => {
  const { calculations, loading } = useCalculations();
  const [expanded, setExpanded] = useState(false);

  if (loading || !calculations || calculations.length === 0) {
    return null;
  }

  const mostRecent = calculations[0]; // Calculations are ordered by timestamp desc

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => setExpanded(!expanded)}>
        {Math.round(mostRecent.results.macros.calories)} kcal
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>

      {expanded && (
        <Card className="absolute right-0 mt-2 z-10 w-64 shadow-lg">
          <CardContent className="p-3">
            <div className="text-xs mb-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peso:</span>
                <span className="font-medium">{mostRecent.data.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Objetivo:</span>
                <span className="font-medium">
                  {mostRecent.data.goal === "lose"
                    ? "Perder Peso"
                    : mostRecent.data.goal === "maintain"
                    ? "Manter Peso"
                    : "Ganhar Peso"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Calorias</p>
                <p className="font-medium">{Math.round(mostRecent.results.macros.calories)} kcal</p>
              </div>
              <div>
                <p className="text-muted-foreground">Proteína</p>
                <p className="font-medium">{Math.round(mostRecent.results.macros.protein)}g</p>
              </div>
              <div>
                <p className="text-muted-foreground">Carboidratos</p>
                <p className="font-medium">{Math.round(mostRecent.results.macros.carbs)}g</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gorduras</p>
                <p className="font-medium">{Math.round(mostRecent.results.macros.fats)}g</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecentResults;
