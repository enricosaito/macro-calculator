import { useState } from "react";
import { useCalculations } from "@/hooks/useCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const HistoryDisplay = () => {
  const { calculations, loading, deleteCalculation } = useCalculations();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCalculation(deleteId);
      setDeleteId(null);
    }
  };

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
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                <span>
                  {format(
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(calc.id)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cálculo? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HistoryDisplay;
