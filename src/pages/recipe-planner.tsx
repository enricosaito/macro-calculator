import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CookingPot } from "lucide-react";
import { ingredients } from "@/lib/ingredients-data";
import { Recipe } from "@/lib/recipes-data";
import { suggestRecipes } from "@/lib/recipe-suggestions";
import IngredientCategory from "@/components/recipe-planner/ingredient-category";
import RecipeCard from "@/components/recipe-planner/recipe-card";
import RecipeDetailModal from "@/components/recipe-planner/recipe-detail-modal";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { useAuth } from "@/context/AuthContext";

const RecipePlanner = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [hasGeneratedRecipes, setHasGeneratedRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const { savedRecipeIds, toggleSavedRecipe, isSaved } = useSavedRecipes();
  const { currentUser } = useAuth();

  // Filter ingredients by category
  const proteinIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "protein"), []);

  const carbIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "carb"), []);

  const fatIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "fat"), []);

  // Filter ingredients by search term
  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return ingredients.filter((ing) => ing.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Generate recipe suggestions
  const handleGenerateRecipes = () => {
    const suggestions = suggestRecipes(selectedIngredients);
    setSuggestedRecipes(suggestions);
    setHasGeneratedRecipes(true);
  };

  // View recipe details
  const handleViewRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  // Toggle saved recipe
  const handleToggleSavedRecipe = (recipe: Recipe) => {
    toggleSavedRecipe(recipe.id);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Planejador de Receitas</h1>
      <p className="text-center text-muted-foreground mb-8">
        Selecione os ingredientes que você tem e nós sugeriremos receitas compatíveis com seus objetivos de macros.
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar ingredientes adicionais..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {searchTerm.trim() !== "" && filteredIngredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Resultados da Busca</h3>
          <div className="flex flex-wrap gap-2">
            {filteredIngredients.map((ingredient) => (
              <Button
                key={ingredient.id}
                variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleIngredient(ingredient.id)}
                className="h-auto py-1 px-3"
              >
                {ingredient.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Ingredient Categories */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-8">
            <IngredientCategory
              title="Proteínas"
              ingredients={proteinIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />

            <IngredientCategory
              title="Carboidratos"
              ingredients={carbIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />

            <IngredientCategory
              title="Gorduras"
              ingredients={fatIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Ingredients Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ingredientes Selecionados ({selectedIngredients.length})</h3>
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((id) => {
            const ingredient = ingredients.find((ing) => ing.id === id);
            return (
              <Button
                key={id}
                variant="default"
                size="sm"
                className="h-auto py-1 px-3"
                onClick={() => toggleIngredient(id)}
              >
                {ingredient?.name} ✕
              </Button>
            );
          })}
          {selectedIngredients.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum ingrediente selecionado</p>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center mb-8">
        <Button size="lg" disabled={selectedIngredients.length === 0} className="px-8" onClick={handleGenerateRecipes}>
          <CookingPot className="mr-2 h-5 w-5" />
          Gerar Ideias de Receitas
        </Button>
      </div>

      {/* Recipe Results Section */}
      {hasGeneratedRecipes && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Receitas Sugeridas</h2>

          {suggestedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onViewDetails={handleViewRecipeDetails} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="mb-2">Não encontramos receitas que correspondam a esses ingredientes.</p>
                <p className="text-sm text-muted-foreground">
                  Tente selecionar outros ingredientes ou uma combinação diferente.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onSave={currentUser ? handleToggleSavedRecipe : undefined}
        isSaved={selectedRecipe ? isSaved(selectedRecipe.id) : false}
      />
    </div>
  );
};

export default RecipePlanner;
