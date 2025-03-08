mport { useState } from "react";
import { Ingredient } from "@/lib/ingredients-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface IngredientCategoryProps {
  title: string;
  ingredients: Ingredient[];
  selectedIngredients: string[];
  onToggleIngredient: (id: string) => void;
}

const IngredientCategory = ({
  title,
  ingredients,
  selectedIngredients,
  onToggleIngredient,
}: IngredientCategoryProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleIngredient(ingredient.id)}
              className="h-auto py-2 px-3"
            >
              {ingredient.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IngredientCategory;