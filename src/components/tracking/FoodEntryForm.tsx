// src/components/tracking/FoodEntryForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodEntry } from "@/types/tracking";
import { Plus } from "lucide-react";

interface FoodEntryFormProps {
  onAdd: (food: Omit<FoodEntry, "id">) => void;
  onCancel: () => void;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Quantidade válida é obrigatória";
    }
    if (!unit.trim()) newErrors.unit = "Unidade é obrigatória";
    if (!calories.trim() || isNaN(Number(calories)) || Number(calories) < 0) {
      newErrors.calories = "Calorias válidas são obrigatórias";
    }
    if (!protein.trim() || isNaN(Number(protein)) || Number(protein) < 0) {
      newErrors.protein = "Proteína válida é obrigatória";
    }
    if (!carbs.trim() || isNaN(Number(carbs)) || Number(carbs) < 0) {
      newErrors.carbs = "Carboidratos válidos são obrigatórios";
    }
    if (!fats.trim() || isNaN(Number(fats)) || Number(fats) < 0) {
      newErrors.fats = "Gorduras válidas são obrigatórias";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAdd({
      name,
      amount: Number(amount),
      unit,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
    });

    // Reset form
    setName("");
    setAmount("");
    setUnit("g");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-accent/20 p-4 rounded-lg border border-border/40">
      <h3 className="font-medium">Adicionar Alimento</h3>

      <div className="space-y-2">
        <Label htmlFor="name">Nome do Alimento</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Frango Grelhado"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Quantidade</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className={errors.amount ? "border-destructive" : ""}
          />
          {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unidade</Label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="unidade">unidade</option>
            <option value="porção">porção</option>
            <option value="colher">colher</option>
          </select>
          {errors.unit && <p className="text-xs text-destructive">{errors.unit}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calories">Calorias</Label>
          <Input
            id="calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="150"
            className={errors.calories ? "border-destructive" : ""}
          />
          {errors.calories && <p className="text-xs text-destructive">{errors.calories}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="protein">Proteína (g)</Label>
          <Input
            id="protein"
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            placeholder="25"
            className={errors.protein ? "border-destructive" : ""}
          />
          {errors.protein && <p className="text-xs text-destructive">{errors.protein}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="carbs">Carboidratos (g)</Label>
          <Input
            id="carbs"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            placeholder="0"
            className={errors.carbs ? "border-destructive" : ""}
          />
          {errors.carbs && <p className="text-xs text-destructive">{errors.carbs}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fats">Gorduras (g)</Label>
          <Input
            id="fats"
            type="number"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
            placeholder="8"
            className={errors.fats ? "border-destructive" : ""}
          />
          {errors.fats && <p className="text-xs text-destructive">{errors.fats}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default FoodEntryForm;
