import { useState } from "react";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { Recipe, recipes } from "@/lib/recipes-data";
import RecipeCard from "./recipe-card";
import RecipeDetailModal from "./recipe-detail-modal";
import { Card, CardContent } from "@/components/ui/card";

const SavedRecipes = () => {
  const { savedRecipeIds, toggleSavedRecipe, isSaved, loading } = useSavedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Get full recipe objects for saved recipes
  const savedRecipes = recipes.filter((recipe) => savedRecipeIds.includes(recipe.id));

  // Handle viewing recipe details
  const handleViewRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Carregando suas receitas salvas...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Suas Receitas Salvas</h2>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onViewDetails={handleViewRecipeDetails} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-2">Você ainda não salvou nenhuma receita.</p>
            <p className="text-sm text-muted-foreground">
              Explore receitas baseadas nos seus ingredientes e salve suas favoritas aqui!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onSave={(recipeId) => toggleSavedRecipe(recipeId)} // Updated to pass the recipeId
        isSaved={selectedRecipe ? isSaved(selectedRecipe.id) : false}
      />
    </div>
  );
};

export default SavedRecipes;
