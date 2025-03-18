import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CookingPot, ShoppingBasket, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ingredients, Ingredient } from "@/lib/ingredients-data";
import { Recipe } from "@/lib/recipes-data";
import { suggestRecipes } from "@/lib/recipe-suggestions";
import RecipeCard from "@/components/recipe-planner/recipe-card";
import RecipeDetailModal from "@/components/recipe-planner/recipe-detail-modal";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import { useAuth } from "@/context/AuthContext";
import LoginPrompt from "@/components/recipe-planner/login-prompt";

// Create a new type for the steps
type RecipeStep = "landing" | "proteins" | "carbs" | "fats" | "spices" | "results";

// Define a type for spice ingredients
interface SpiceIngredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  commonality: number;
}

const GuidedRecipePlanner = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<RecipeStep>("landing");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [recipeSearchTerm] = useState("");
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { toggleSavedRecipe, isSaved } = useSavedRecipes();
  const { currentUser } = useAuth();

  // Define number of free recipes for demo mode
  const FREE_RECIPE_LIMIT = 3;

  // Filter ingredients by category
  const proteinIngredients = useMemo(
    () =>
      ingredients
        .filter((ing) => ing.category === "protein")
        .sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  const carbIngredients = useMemo(
    () =>
      ingredients.filter((ing) => ing.category === "carb").sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  const fatIngredients = useMemo(
    () =>
      ingredients.filter((ing) => ing.category === "fat").sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  // Define a special "spices" category (ingredients that should be considered spices or flavorings)
  const spiceIngredients = useMemo<SpiceIngredient[]>(
    () => [
      { id: "salt", name: "Sal", category: "spice", emoji: "🧂", commonality: 99 },
      { id: "pepper", name: "Pimenta", category: "spice", emoji: "🌶️", commonality: 95 },
      { id: "garlic", name: "Alho", category: "spice", emoji: "🧄", commonality: 96 },
      { id: "onion", name: "Cebola", category: "spice", emoji: "🧅", commonality: 95 },
      { id: "herbs", name: "Ervas Frescas", category: "spice", emoji: "🌿", commonality: 75 },
      { id: "olive-oil", name: "Azeite", category: "spice", emoji: "🫒", commonality: 92 },
      { id: "lemon", name: "Limão", category: "spice", emoji: "🍋", commonality: 88 },
      { id: "tomato", name: "Tomate", category: "spice", emoji: "🍅", commonality: 92 },
      { id: "red-pepper", name: "Pimentão", category: "spice", emoji: "🫑", commonality: 85 },
      { id: "basil", name: "Manjericão", category: "spice", emoji: "🌱", commonality: 70 },
      { id: "oregano", name: "Orégano", category: "spice", emoji: "🌱", commonality: 85 },
      { id: "parsley", name: "Salsinha", category: "spice", emoji: "🌿", commonality: 80 },
      { id: "cilantro", name: "Coentro", category: "spice", emoji: "🌿", commonality: 75 },
      { id: "bay-leaf", name: "Folha de Louro", category: "spice", emoji: "🍃", commonality: 70 },
      { id: "cinnamon", name: "Canela", category: "spice", emoji: "🧂", commonality: 65 },
    ],
    []
  );

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

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Handle next step
  const handleNext = () => {
    if (step === "landing") setStep("proteins");
    else if (step === "proteins") setStep("carbs");
    else if (step === "carbs") setStep("fats");
    else if (step === "fats") setStep("spices");
    else if (step === "spices") {
      setIsGeneratingRecipes(true);
      // Generate recipes
      setTimeout(() => {
        const suggestions = suggestRecipes(selectedIngredients);
        setSuggestedRecipes(suggestions);
        setStep("results");
        setIsGeneratingRecipes(false);
      }, 1500);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (step === "carbs") setStep("proteins");
    else if (step === "fats") setStep("carbs");
    else if (step === "spices") setStep("fats");
    else if (step === "results") setStep("spices");
  };

  // Handle start over
  const handleStartOver = () => {
    setSelectedIngredients([]);
    setStep("landing");
    setSuggestedRecipes([]);
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

  // Calculate progress percentage
  const getProgress = () => {
    switch (step) {
      case "landing":
        return 0;
      case "proteins":
        return 20;
      case "carbs":
        return 40;
      case "fats":
        return 60;
      case "spices":
        return 80;
      case "results":
        return 100;
      default:
        return 0;
    }
  };

  // Get step number (for display)
  const getStepNumber = () => {
    switch (step) {
      case "proteins":
        return 1;
      case "carbs":
        return 2;
      case "fats":
        return 3;
      case "spices":
        return 4;
      default:
        return 0;
    }
  };

  // Get step title
  const getStepTitle = () => {
    switch (step) {
      case "landing":
        return "Comece sua jornada culinária";
      case "proteins":
        return "Selecione suas proteínas";
      case "carbs":
        return "Adicione carboidratos";
      case "fats":
        return "Escolha suas gorduras";
      case "spices":
        return "Finalize com temperos";
      case "results":
        return "Suas receitas personalizadas";
      default:
        return "";
    }
  };

  // Get step description
  const getStepDescription = () => {
    switch (step) {
      case "landing":
        return "Vamos criar receitas baseadas nos ingredientes que você tem disponíveis.";
      case "proteins":
        return "Proteínas são a base da sua refeição. Selecione as que você tem disponíveis:";
      case "carbs":
        return "Carboidratos dão energia e complementam seu prato:";
      case "fats":
        return "Gorduras saudáveis adicionam sabor e são essenciais para seu corpo:";
      case "spices":
        return "Temperos e condimentos que transformam seu prato:";
      case "results":
        return `Encontramos ${suggestedRecipes.length} receitas baseadas nos seus ${selectedIngredients.length} ingredientes:`;
      default:
        return "";
    }
  };

  // Render the ingredients selection step
  const renderIngredientsSelection = (
    ingredientsList: (Ingredient | SpiceIngredient)[],
    title: string,
    description: string
  ) => {
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
              {getStepNumber()}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ingredientsList.map((ingredient) => (
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
            {selectedIngredients.filter((id) => ingredientsList.some((ing) => ing.id === id)).length}{" "}
            {title.toLowerCase()} selecionados
          </p>
        </div>
      </motion.div>
    );
  };

  // Render landing page
  const renderLanding = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12 max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Descubra receitas com os <span className="text-primary">ingredientes que você tem</span>
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          Sem precisar ir ao supermercado—encontre receitas deliciosas usando o que já está na sua cozinha.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Como funciona:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              1
            </div>
            <h3 className="font-medium mb-2">Selecione ingredientes</h3>
            <p className="text-sm text-muted-foreground">Informe o que você tem disponível em sua cozinha.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              2
            </div>
            <h3 className="font-medium mb-2">Descubra receitas</h3>
            <p className="text-sm text-muted-foreground">Nosso sistema encontrará as melhores combinações.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              3
            </div>
            <h3 className="font-medium mb-2">Cozinhe e desfrute</h3>
            <p className="text-sm text-muted-foreground">Receitas detalhadas com macros e informações nutricionais.</p>
          </div>
        </div>
      </div>

      <Button onClick={handleNext} size="lg" className="text-lg px-8 py-6">
        Começar
      </Button>
    </motion.div>
  );

  // Render results page
  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="mb-8 text-center">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{getStepTitle()}</h2>
        <p className="text-muted-foreground">{getStepDescription()}</p>
      </div>

      {/* Selected Ingredients Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl mb-10 border border-primary/10">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <ShoppingBasket className="h-5 w-5 mr-2 text-primary" />
          Ingredientes Selecionados ({selectedIngredients.length})
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((id) => {
            const ingredient = [...proteinIngredients, ...carbIngredients, ...fatIngredients, ...spiceIngredients].find(
              (ing) => ing.id === id
            );
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
              onViewDetails={() => handleViewRecipeDetails(recipe, recipe.isPremium)}
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
        <Button onClick={handleStartOver} variant="outline" size="lg" className="text-lg px-8">
          Começar Novamente
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto py-6">
      {/* Main Content */}
      <div>
        {step !== "landing" && step !== "results" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Passo {getStepNumber()} de 4</p>
              <p className="text-sm font-medium text-primary">{getProgress()}% completo</p>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>
        )}

        <div className="flex-grow flex items-center justify-center">
          {step === "landing" && renderLanding()}
          {step === "proteins" && renderIngredientsSelection(proteinIngredients, getStepTitle(), getStepDescription())}
          {step === "carbs" && renderIngredientsSelection(carbIngredients, getStepTitle(), getStepDescription())}
          {step === "fats" && renderIngredientsSelection(fatIngredients, getStepTitle(), getStepDescription())}
          {step === "spices" && renderIngredientsSelection(spiceIngredients, getStepTitle(), getStepDescription())}
          {step === "results" && renderResults()}
        </div>

        {/* Navigation buttons */}
        {step !== "landing" && step !== "results" && (
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              className="min-w-32 py-6 text-lg flex items-center gap-2"
              disabled={step === "proteins"}
            >
              <ArrowLeft className="h-5 w-5" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              className="min-w-32 py-6 text-lg flex items-center gap-2"
              disabled={isGeneratingRecipes}
            >
              {step === "spices" ? (
                isGeneratingRecipes ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <CookingPot className="h-5 w-5 mr-2" />
                    Gerar Receitas
                  </>
                )
              ) : (
                <>
                  Próximo
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

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

export default GuidedRecipePlanner;
