// src/components/macro-calculator/history-display.tsx
import { useState } from "react";
import { useCalculations } from "@/hooks/useCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCalculation(deleteId);
      setDeleteId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
              <CardTitle className="text-sm font-medium flex-1">
                <span>
                  {format(
                    calc.timestamp instanceof Date ? calc.timestamp : new Date(calc.timestamp.seconds * 1000),
                    "dd 'de' MMMM 'de' yyyy",
                    { locale: ptBR }
                  )}
                </span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpand(calc.id || "")}
                  className="text-muted-foreground"
                >
                  {expandedId === calc.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(calc.id || "")}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="inline-block mr-4">
                {calc.data.goal === "lose"
                  ? "Perder Peso"
                  : calc.data.goal === "maintain"
                  ? "Manter Peso"
                  : "Ganhar Peso"}
              </span>
              <span>{calc.data.weight} kg</span>
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

            {expandedId === calc.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Detalhes</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Idade:</p>
                    <p>{calc.data.age} anos</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Altura:</p>
                    <p>{calc.data.height} cm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sexo:</p>
                    <p>{calc.data.sex === "male" ? "Masculino" : "Feminino"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nível de Atividade:</p>
                    <p>
                      {parseFloat(calc.data.activityLevel) === 1.2
                        ? "Sedentário"
                        : parseFloat(calc.data.activityLevel) === 1.375
                        ? "Levemente Ativo"
                        : parseFloat(calc.data.activityLevel) === 1.55
                        ? "Moderadamente Ativo"
                        : parseFloat(calc.data.activityLevel) === 1.725
                        ? "Muito Ativo"
                        : "Extra Ativo"}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
