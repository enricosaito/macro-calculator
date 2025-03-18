import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CookingPot, Lock, ShoppingBasket, InfoIcon } from "lucide-react";
import { ingredients } from "@/lib/ingredients-data";
import { Recipe, recipes } from "@/lib/recipes-data";
import { suggestRecipes } from "@/lib/recipe-suggestions";
import IngredientCategory from "@/components/recipe-planner/ingredient-category";
import RecipeCard from "@/components/recipe-planner/recipe-card";
import RecipeDetailModal from "@/components/recipe-planner/recipe-detail-modal";
import SavedRecipes from "@/components/recipe-planner/saved-recipes";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoginPrompt from "@/components/recipe-planner/login-prompt";

const RecipePlanner = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [hasGeneratedRecipes, setHasGeneratedRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toggleSavedRecipe, isSaved } = useSavedRecipes();
  const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
  const { currentUser } = useAuth();
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Define number of free recipes for demo mode
  const FREE_RECIPE_LIMIT = 3;

  // Filter ingredients by category
  const proteinIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "protein"), []);
  const carbIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "carb"), []);
  const fatIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "fat"), []);

  // Filter recipes
  const filteredSuggestedRecipes = useMemo(() => {
    if (!recipeSearchTerm.trim()) return suggestedRecipes;

    return suggestedRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(recipeSearchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(recipeSearchTerm.toLowerCase())
    );
  }, [suggestedRecipes, recipeSearchTerm]);

  // Mark recipes as free or premium
  const processedRecipes = useMemo(() => {
    return filteredSuggestedRecipes.map((recipe, index) => ({
      ...recipe,
      isPremium: !currentUser && index >= FREE_RECIPE_LIMIT,
    }));
  }, [filteredSuggestedRecipes, currentUser]);

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
    setIsGeneratingRecipes(true);

    // Simulate a loading delay for better UX
    setTimeout(() => {
      const suggestions = suggestRecipes(selectedIngredients);
      setSuggestedRecipes(suggestions);
      setHasGeneratedRecipes(true);
      setIsGeneratingRecipes(false);
    }, 1200);
  };

  // View recipe details - now with premium check
  const handleViewRecipeDetails = (recipe: Recipe, isPremium: boolean) => {
    if (isPremium) {
      setShowLoginPrompt(true);
      return;
    }

    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="py-10 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 mb-8 rounded-xl border border-green-100 dark:border-green-900/30">
        <h1 className="text-4xl font-bold mb-4 text-center">Planejador de Receitas</h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto px-4">
          Selecione os ingredientes que você tem disponíveis e descubra receitas deliciosas que combinam perfeitamente
          com seus objetivos de macros!
        </p>
      </div>

      <Tabs defaultValue="explore" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="explore">Explorar Receitas</TabsTrigger>
          <TabsTrigger value="saved" disabled={!currentUser}>
            Receitas Salvas {!currentUser && <Lock className="ml-1 h-3 w-3" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explore">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Alert
              variant="default"
              className="mb-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800/30"
            >
              <InfoIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <AlertDescription>
                Selecione os ingredientes que você tem disponíveis e descubra receitas que se encaixam perfeitamente nos
                seus objetivos de macros!
                {!currentUser && (
                  <span className="block mt-2 font-medium">
                    Modo demonstração: Acesse {FREE_RECIPE_LIMIT} receitas gratuitamente. Faça login para desbloquear
                    todas as receitas!
                  </span>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar ingredientes adicionais..."
                className="pl-12 h-12 text-lg rounded-full border-2 border-border/50 focus:border-primary/50 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Popular Ingredients Quick Select */}
          {searchTerm.trim() === "" && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-center">Ingredientes Populares</h3>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {ingredients
                  .filter((ing) => (ing.commonality || 0) > 85)
                  .sort((a, b) => (b.commonality || 0) - (a.commonality || 0))
                  .slice(0, 8)
                  .map((ingredient) => (
                    <Button
                      key={ingredient.id}
                      variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
                      size="lg"
                      onClick={() => toggleIngredient(ingredient.id)}
                      className="h-auto py-3 px-4 rounded-xl"
                    >
                      <span className="text-lg mr-2">{ingredient.emoji}</span>
                      {ingredient.name}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchTerm.trim() !== "" && filteredIngredients.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Resultados da Busca</h3>
              <div className="flex flex-wrap gap-2">
                {filteredIngredients.map((ingredient) => (
                  <Button
                    key={ingredient.id}
                    variant={selectedIngredients.includes(ingredient.id) ? "default" : "outline"}
                    size="lg"
                    onClick={() => toggleIngredient(ingredient.id)}
                    className="h-auto py-3 px-4 rounded-xl"
                  >
                    <span className="text-lg mr-2">{ingredient.emoji}</span>
                    {ingredient.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Ingredients Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl mb-10 border border-primary/10">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <ShoppingBasket className="h-5 w-5 mr-2 text-primary" />
              Ingredientes Selecionados ({selectedIngredients.length})
            </h3>

            {selectedIngredients.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <p>Selecione ingredientes acima para começar</p>
                <p className="text-sm mt-1">Quanto mais ingredientes você selecionar, melhores serão as sugestões!</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedIngredients.map((id) => {
                  const ingredient = ingredients.find((ing) => ing.id === id);
                  return (
                    <Button
                      key={id}
                      variant="default"
                      size="lg"
                      className="h-auto py-2 px-4 bg-primary/80 hover:bg-primary/70"
                      onClick={() => toggleIngredient(id)}
                    >
                      <span className="text-lg mr-2">{ingredient?.emoji}</span>
                      {ingredient?.name}
                      <span className="ml-2 opacity-70">✕</span>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

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

          {/* Information about total recipes */}
          <div className="flex justify-center mb-8">
            <div className="bg-primary/5 rounded-lg p-3 text-center max-w-lg">
              <p className="text-sm text-muted-foreground">
                Nossa base de dados contém {recipes.length} receitas balanceadas para ajudar você a atingir seus
                objetivos.
                {!currentUser && (
                  <span className="text-primary font-medium"> Faça login para desbloquear todas as receitas!</span>
                )}
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              disabled={selectedIngredients.length === 0 || isGeneratingRecipes}
              className="px-10 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
              onClick={handleGenerateRecipes}
            >
              {isGeneratingRecipes ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Gerando Receitas...
                </>
              ) : (
                <>
                  <CookingPot className="mr-3 h-6 w-6" />
                  Gerar Ideias de Receitas
                </>
              )}
            </Button>
          </div>

          {/* Recipe Results Section */}
          {hasGeneratedRecipes && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Receitas Sugeridas</h2>

              {hasGeneratedRecipes && filteredSuggestedRecipes.length > 0 && (
                <div className="space-y-4">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Buscar entre as receitas sugeridas..."
                      className="pl-10"
                      value={recipeSearchTerm}
                      onChange={(e) => setRecipeSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Recipe Count Info */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-muted-foreground">
                      {filteredSuggestedRecipes.length}{" "}
                      {filteredSuggestedRecipes.length === 1 ? "receita encontrada" : "receitas encontradas"}
                    </p>
                    {!currentUser && processedRecipes.some((r) => r.isPremium) && (
                      <p className="text-sm text-primary font-medium">
                        <Lock className="h-3 w-3 inline mr-1" />
                        {processedRecipes.filter((r) => r.isPremium).length} receitas premium disponíveis após login
                      </p>
                    )}
                  </div>
                </div>
              )}

              {processedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {processedRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isPremium={recipe.isPremium}
                      onViewDetails={() => handleViewRecipeDetails(recipe, recipe.isPremium)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="mb-2">Não encontramos receitas que correspondam a sua busca.</p>
                    <p className="text-sm text-muted-foreground">
                      Tente outros termos ou gere novas receitas com diferentes ingredientes.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved">
          {currentUser ? (
            <SavedRecipes />
          ) : (
            <LoginPrompt message="Faça login para salvar suas receitas favoritas e acessá-las de qualquer dispositivo." />
          )}
        </TabsContent>
      </Tabs>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        onSave={currentUser ? (recipeId) => toggleSavedRecipe(recipeId) : undefined}
        isSaved={selectedRecipe ? isSaved(selectedRecipe.id) : false}
      />

      {/* Login Prompt Modal */}
      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="Faça login para acessar todas as nossas receitas premium e recursos avançados!"
      />
    </div>
  );
};

export default RecipePlanner;
