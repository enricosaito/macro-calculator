import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, CheckCircle } from "lucide-react";
import RecipeCard from "./recipe-card";
import { ResultsPageProps } from "./types";

const ResultsPage = ({
  selectedIngredients,
  suggestedRecipes,
  proteinIngredients,
  carbIngredients,
  fatIngredients,
  spiceIngredients,
  onStartOver,
  onViewRecipeDetails,
  currentUser,
}: ResultsPageProps) => {
  // Mark recipes as free or premium
  const processedRecipes = useMemo(() => {
    const FREE_RECIPE_LIMIT = 3;
    return suggestedRecipes.map((recipe, index) => ({
      ...recipe,
      isPremium: !currentUser && index >= FREE_RECIPE_LIMIT,
    }));
  }, [suggestedRecipes, currentUser]);

  // Find the ingredient object for a given id
  const findIngredient = (id: string) => {
    return [...proteinIngredients, ...carbIngredients, ...fatIngredients, ...spiceIngredients].find(
      (ing) => ing.id === id
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="mb-8 text-center">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Suas receitas personalizadas</h2>
        <p className="text-muted-foreground">
          Encontramos {suggestedRecipes.length} receitas baseadas nos seus {selectedIngredients.length} ingredientes:
        </p>
      </div>

      {/* Selected Ingredients Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl mb-10 border border-primary/10">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <ShoppingBasket className="h-5 w-5 mr-2 text-primary" />
          Ingredientes Selecionados ({selectedIngredients.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((id) => {
            const ingredient = findIngredient(id);
            return ingredient ? (
              <Button
                key={id}
                variant="outline"
                size="sm"
                className="h-auto py-2 px-4 bg-background hover:bg-accent/30"
              >
                <span className="text-base mr-2">{ingredient.emoji}</span>
                {ingredient.name}
              </Button>
            ) : null;
          })}
        </div>
      </div>

      {/* Recipe Results Section */}
      {processedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isPremium={recipe.isPremium}
              onViewDetails={() => onViewRecipeDetails(recipe, recipe.isPremium)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-2">Não encontramos receitas que correspondam aos seus ingredientes.</p>
            <p className="text-sm text-muted-foreground">
              Tente selecionar mais ingredientes ou ingredientes diferentes para obter melhores sugestões.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center mt-10">
        <Button onClick={onStartOver} variant="outline" size="lg" className="text-lg px-8">
          Começar Novamente
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
