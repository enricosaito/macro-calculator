import { Ingredient } from "@/lib/ingredients-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [showAll, setShowAll] = useState(false);

  // Sort ingredients by commonality (highest first)
  const sortedIngredients = [...ingredients].sort((a, b) => (b.commonality || 0) - (a.commonality || 0));

  // If we have many ingredients, only show the top 12 initially
  const displayedIngredients = showAll ? sortedIngredients : sortedIngredients.slice(0, 12);

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {displayedIngredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
              size="lg" // Increased button size
              onClick={() => onToggleIngredient(ingredient.id)}
              className={`h-auto py-3 px-4 rounded-xl transition-all ${
                selectedIngredients.includes(ingredient.id)
                  ? "border-2 border-primary bg-primary/90 hover:bg-primary/80 hover:scale-105"
                  : "border border-border/50 hover:bg-accent/50 hover:scale-105"
              }`}
            >
              <span className="text-lg mr-2">{ingredient.emoji}</span>
              <span>{ingredient.name}</span>
            </Button>
          </motion.div>
        ))}

        {sortedIngredients.length > 12 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="h-auto py-3 border border-dashed border-border/40 hover:border-primary/40"
          >
            {showAll ? "Mostrar menos ↑" : `Ver mais +${sortedIngredients.length - 12} ingredientes ↓`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IngredientCategory;
