import { useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CookingPot } from "lucide-react";
import { motion } from "framer-motion";
import { ingredients } from "@/lib/ingredients-data";
import { suggestRecipes } from "@/lib/recipe-suggestions";
import RecipeDetailModal from "./recipe-detail-modal";
import { useAuth } from "@/context/AuthContext";
import { useSavedRecipes } from "@/hooks/useSavedRecipes";
import LoginPrompt from "./login-prompt";
import { RecipeStep, SpiceIngredient } from "./types";
import { Recipe } from "@/lib/recipes-data";

// Import step components
import LandingPage from "./landing-page";
import ProteinSelection from "./protein-selection";
import CarbSelection from "./carb-selection";
import FatSelection from "./fat-selection";
import SpiceSelection from "./spice-selection";
import ResultsPage from "./results-page";

const GuidedRecipePlanner = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<RecipeStep>("landing");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { currentUser } = useAuth();
  const { toggleSavedRecipe, isSaved } = useSavedRecipes();

  // Get filtered ingredients for different categories
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

  // Define spice ingredients
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

  // View recipe details with premium check
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

  // Get step number for display
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

  // Render the current step component
  const renderStep = () => {
    switch (step) {
      case "landing":
        return <LandingPage onStart={handleNext} />;
      case "proteins":
        return (
          <ProteinSelection
            selectedIngredients={selectedIngredients}
            toggleIngredient={toggleIngredient}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "carbs":
        return (
          <CarbSelection
            selectedIngredients={selectedIngredients}
            toggleIngredient={toggleIngredient}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "fats":
        return (
          <FatSelection
            selectedIngredients={selectedIngredients}
            toggleIngredient={toggleIngredient}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "spices":
        return (
          <SpiceSelection
            selectedIngredients={selectedIngredients}
            toggleIngredient={toggleIngredient}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "results":
        return (
          <ResultsPage
            selectedIngredients={selectedIngredients}
            suggestedRecipes={suggestedRecipes}
            proteinIngredients={proteinIngredients}
            carbIngredients={carbIngredients}
            fatIngredients={fatIngredients}
            spiceIngredients={spiceIngredients}
            onStartOver={handleStartOver}
            onViewRecipeDetails={handleViewRecipeDetails}
            currentUser={currentUser}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* Progress indicator */}
      {step !== "landing" && step !== "results" && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Passo {getStepNumber()} de 4</p>
            <p className="text-sm font-medium text-primary">{getProgress()}% completo</p>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderStep()}
        </motion.div>
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
