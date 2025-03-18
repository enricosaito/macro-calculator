import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IngredientsSelectionProps } from "./types";

const IngredientsSelection = ({
  ingredients,
  selectedIngredients,
  toggleIngredient,
  stepNumber,
  title,
  description,
}: IngredientsSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
            {stepNumber}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ingredients.map((ingredient) => (
              <Button
                key={ingredient.id}
                variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
                size="lg"
                onClick={() => toggleIngredient(ingredient.id)}
                className={`h-auto py-3 px-4 rounded-xl transition-all justify-start ${
                  selectedIngredients.includes(ingredient.id)
                    ? "border-2 border-primary bg-primary/90 hover:bg-primary/80"
                    : "border border-border/50 hover:bg-accent/50"
                }`}
              >
                <span className="text-lg mr-2">{ingredient.emoji}</span>
                <span className="truncate">{ingredient.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected count */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground">
          {selectedIngredients.filter((id) => ingredients.some((ing) => ing.id === id)).length} {title.toLowerCase()}{" "}
          selecionados
        </p>
      </div>
    </motion.div>
  );
};

export default IngredientsSelection;
