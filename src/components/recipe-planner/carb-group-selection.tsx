// src/components/recipe-planner/carb-group-selection.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { CarbGroup } from "@/lib/ingredients-data";
import { useState, useEffect } from "react";

interface CarbGroupSelectionProps {
  carbGroups: CarbGroup[];
  selectedIngredients: string[];
  toggleIngredient: (id: string) => void;
}

const CarbGroupSelection = ({ carbGroups, selectedIngredients, toggleIngredient }: CarbGroupSelectionProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Get all ingredients from all carb groups
  const allGroupIngredients = carbGroups.flatMap((group) => group.ingredients);

  // Determine which groups should be marked as selected
  useEffect(() => {
    const newSelectedGroups = carbGroups
      .filter((group) => {
        // If any ingredient from this group is selected, consider the group selected
        return group.ingredients.some((ing) => selectedIngredients.includes(ing.id));
      })
      .map((group) => group.id);

    setSelectedGroups(newSelectedGroups);
  }, [selectedIngredients, carbGroups]);

  // Toggle a group and select/deselect all its ingredients
  const toggleGroup = (groupId: string) => {
    const group = carbGroups.find((g) => g.id === groupId);

    if (!group) return;

    if (selectedGroups.includes(groupId)) {
      // Deselect all ingredients in this group
      group.ingredients.forEach((ing) => {
        if (selectedIngredients.includes(ing.id)) {
          toggleIngredient(ing.id);
        }
      });
    } else {
      // Select all ingredients in this group
      group.ingredients.forEach((ing) => {
        if (!selectedIngredients.includes(ing.id)) {
          toggleIngredient(ing.id);
        }
      });
    }
  };

  // Get all selected carb ingredients
  const selectedCarbIngredients = allGroupIngredients.filter((ing) => selectedIngredients.includes(ing.id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Escolha seus carboidratos</h2>
      <p className="mb-6 text-center text-muted-foreground">Selecione os carboidratos que você tem disponíveis:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {carbGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all h-full hover:border-primary ${
                selectedGroups.includes(group.id)
                  ? "border-2 border-primary bg-accent/50"
                  : "border border-border/50 hover:bg-accent/30"
              }`}
              onClick={() => toggleGroup(group.id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center h-full">
                <div
                  className={`mt-4 mb-2 w-16 h-16 rounded-full flex items-center justify-center text-3xl
                  ${
                    selectedGroups.includes(group.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-muted-foreground"
                  }`}
                >
                  {group.emoji}
                </div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{group.description}</p>

                {selectedGroups.includes(group.id) && (
                  <div className="mt-4 text-primary text-sm font-medium flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Selecionado
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedCarbIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-accent/20 p-4 rounded-lg border border-border/30"
        >
          <h3 className="text-lg font-medium mb-3">Ingredientes selecionados:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCarbIngredients.map((ingredient) => (
              <motion.span
                key={ingredient.id}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-background border border-border/50 px-3 py-1 rounded-full text-sm flex items-center shadow-sm"
              >
                <span className="mr-2">{ingredient.emoji}</span>
                {ingredient.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleIngredient(ingredient.id);
                  }}
                  className="ml-2 hover:bg-accent rounded-full p-1 -mr-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CarbGroupSelection;
