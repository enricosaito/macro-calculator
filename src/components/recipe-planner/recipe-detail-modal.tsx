import { useRef, useEffect } from "react";
import { Recipe, calculateRecipeMacros } from "@/lib/recipes-data";
import { ingredients } from "@/lib/ingredients-data";
import { Clock, ChefHat, Flame, Dumbbell, Croissant, Droplet, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (recipeId: string) => void;
  isSaved?: boolean;
}

const RecipeDetailModal = ({ recipe, open, onOpenChange, onSave, isSaved = false }: RecipeDetailModalProps) => {
  // Always define refs at the top level
  const contentRef = useRef<HTMLDivElement>(null);

  // Always run useEffect at the top level
  useEffect(() => {
    if (!open) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [open, onOpenChange]);

  // Return early if no recipe
  if (!recipe) return null;

  const macros = calculateRecipeMacros(recipe, ingredients);

  // Calculate macro percentages
  const proteinCalories = macros.protein * 4;
  const carbsCalories = macros.carbs * 4;
  const fatsCalories = macros.fats * 9;

  const proteinPercentage = Math.round((proteinCalories / macros.calories) * 100);
  const carbsPercentage = Math.round((carbsCalories / macros.calories) * 100);
  const fatsPercentage = Math.round((fatsCalories / macros.calories) * 100);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave(recipe.id);
    }
  };

  // Handle overlay click (backdrop)
  const handleOverlayClick = (e: React.MouseEvent) => {
    // If clicking on the overlay directly (not the content)
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={handleOverlayClick}>
      <div
        ref={contentRef}
        className="bg-background border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rest of your component stays the same */}
        {/* Sticky header with close and save buttons */}
        <div className="sticky top-0 z-10 bg-card pt-4 px-6 pb-2 flex justify-between items-center border-b border-border/20">
          <h2 className="text-2xl font-semibold">{recipe.name}</h2>
          <div className="flex items-center gap-2">
            {onSave && (
              <Button
                variant={isSaved ? "outline" : "default"}
                size="sm"
                onClick={handleSaveClick}
                className="flex items-center gap-2"
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                {isSaved ? "Salvo" : "Salvar"}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 pt-2">
          <p className="text-base text-muted-foreground mt-2">{recipe.description}</p>

          <div className="py-4">
            {/* Recipe Info */}
            <div className="flex justify-between text-sm mb-6">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Tempo Total: {recipe.prepTime + recipe.cookTime} min
              </span>
              <span className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                Dificuldade:{" "}
                {recipe.difficulty === "easy" ? "Fácil" : recipe.difficulty === "medium" ? "Médio" : "Difícil"}
              </span>
            </div>

            {/* Macros with Progress Bars */}
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Informações Nutricionais (por porção)</h3>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-5 w-5 text-orange-500" />
                <div className="flex-grow">
                  <div className="flex justify-between text-sm">
                    <span>Calorias</span>
                    <span className="font-medium">{macros.calories} kcal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Proteínas</span>
                      <span className="font-medium">
                        {macros.protein}g ({proteinPercentage}%)
                      </span>
                    </div>
                    <Progress value={proteinPercentage} className="h-2 bg-blue-100" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Croissant className="h-5 w-5 text-yellow-500" />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carboidratos</span>
                      <span className="font-medium">
                        {macros.carbs}g ({carbsPercentage}%)
                      </span>
                    </div>
                    <Progress value={carbsPercentage} className="h-2 bg-yellow-100" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-green-500" />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gorduras</span>
                      <span className="font-medium">
                        {macros.fats}g ({fatsPercentage}%)
                      </span>
                    </div>
                    <Progress value={fatsPercentage} className="h-2 bg-green-100" />
                  </div>
                </div>
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

            {/* Ingredients */}
            <div className="my-6">
              <h3 className="font-medium mb-2">Ingredientes</h3>
              <ul className="list-disc pl-5 space-y-1">
                {recipe.ingredients.map((item) => {
                  const ingredient = ingredients.find((ing) => ing.id === item.ingredientId);
                  return (
                    <li key={item.ingredientId} className="text-sm">
                      {ingredient?.emoji} {ingredient?.name} ({item.amount}g)
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Instructions */}
            <div className="my-6">
              <h3 className="font-medium mb-2">Modo de Preparo</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
