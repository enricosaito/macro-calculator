import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recipe, calculateRecipeMacros } from "@/lib/recipes-data";
import { ingredients } from "@/lib/ingredients-data";
import { Clock, ChefHat, Flame, Dumbbell, Croissant, Droplet, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: Recipe;
  isPremium?: boolean;
  onViewDetails: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, isPremium = false, onViewDetails }: RecipeCardProps) => {
  const macros = calculateRecipeMacros(recipe, ingredients);

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
      {isPremium && (
        <div className="absolute inset-0 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center p-6 bg-background/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-primary/10 p-3 rounded-full mb-4"
          >
            <Lock className="h-8 w-8 text-primary" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Receita Premium</h3>
          <p className="text-sm text-center mb-4">
            Esta deliciosa receita está disponível apenas para usuários registrados.
          </p>
          <Button onClick={() => onViewDetails(recipe)} className="bg-primary hover:bg-primary/90">
            Desbloquear
          </Button>
        </div>
      )}

      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          {recipe.name}
          {recipe.isNew && (
            <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Novo</span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-sm mb-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prepTime + recipe.cookTime} min
            </span>
            <span className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.difficulty === "easy" ? "Fácil" : recipe.difficulty === "medium" ? "Médio" : "Difícil"}
            </span>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Calorias</p>
                <p className="font-medium">{macros.calories} kcal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Proteínas</p>
                <p className="font-medium">{macros.protein}g</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Croissant className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Carboidratos</p>
                <p className="font-medium">{macros.carbs}g</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Gorduras</p>
                <p className="font-medium">{macros.fats}g</p>
              </div>
            </div>
          </div>

          {/* Ingredients Preview */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Ingredientes:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.map((item) => {
                const ingredient = ingredients.find((ing) => ing.id === item.ingredientId);
                return (
                  <span key={item.ingredientId} className="text-xs bg-secondary px-2 py-1 rounded-md">
                    {ingredient?.emoji} {ingredient?.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button variant="outline" onClick={() => onViewDetails(recipe)}>
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
