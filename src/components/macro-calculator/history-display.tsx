import { useCalculations } from "@/hooks/useCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const HistoryDisplay = () => {
  const { calculations, loading } = useCalculations();

  if (loading) {
    return <div className="text-center">Carregando histórico...</div>;
  }

  if (!calculations || calculations.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Nenhum cálculo salvo ainda. Complete o formulário para ver seus resultados aqui!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold">Seu Histórico</h3>
      {calculations.map((calc) => (
        <Card key={calc.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              <span>
                {format(
                  // Handle both Date objects and Firestore Timestamps
                  calc.timestamp instanceof Date ? calc.timestamp : new Date(calc.timestamp.seconds * 1000),
                  "dd 'de' MMMM 'de' yyyy",
                  { locale: ptBR }
                )}
              </span>
              <span className="text-muted-foreground">
                {calc.data.goal === "lose"
                  ? "Perder Peso"
                  : calc.data.goal === "maintain"
                  ? "Manter Peso"
                  : "Ganhar Peso"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Calorias</p>
                <p className="font-semibold">{Math.round(calc.results.macros.calories)} kcal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proteína</p>
                <p className="font-semibold">{Math.round(calc.results.macros.protein)}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carboidratos</p>
                <p className="font-semibold">{Math.round(calc.results.macros.carbs)}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gorduras</p>
                <p className="font-semibold">{Math.round(calc.results.macros.fats)}g</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HistoryDisplay;
