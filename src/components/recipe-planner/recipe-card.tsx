import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recipe, calculateRecipeMacros } from "@/lib/recipes-data";
import { ingredients } from "@/lib/ingredients-data";
import { Clock, ChefHat, Flame, Dumbbell, Croissant, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onViewDetails }: RecipeCardProps) => {
  const macros = calculateRecipeMacros(recipe, ingredients);

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{recipe.name}</CardTitle>
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
                    {ingredient?.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={() => onViewDetails(recipe)}>
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
