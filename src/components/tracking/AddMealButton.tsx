import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MEAL_TYPES } from "@/types/tracking";

interface AddMealButtonProps {
  onAddMeal: (mealType: string) => void;
}

const AddMealButton: React.FC<AddMealButtonProps> = ({ onAddMeal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddMeal = (mealType: string) => {
    onAddMeal(mealType);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} className="w-full mb-4">
        <Plus className="h-4 w-4 mr-1" />
        Adicionar Refeição
      </Button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background shadow-lg rounded-lg border border-border overflow-hidden">
          <ul className="py-1">
            {MEAL_TYPES.map((type) => (
              <li key={type.id}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-accent text-sm"
                  onClick={() => handleAddMeal(type.id)}
                >
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddMealButton;
