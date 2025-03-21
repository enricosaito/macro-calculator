import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSavedRecipeStatus } from "@/hooks/useSavedRecipeStatus";
import { getRecipeById as getRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Flame,
  Dumbbell,
  Croissant,
  Droplet,
  Heart,
  Printer,
  Share2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PageTransition from "@/components/ui/page-transition";
import LoginPrompt from "@/components/recipe-planner/login-prompt";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isSaved, toggleSaved } = useSavedRecipeStatus(id || "");

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const recipeData = await getRecipe(id);

        if (!recipeData) {
          setError("Receita não encontrada");
          return;
        }

        // Check if premium recipe and user has access
        if (recipeData.isPremium && !currentUser) {
          setShowLoginPrompt(true);
        }

        setRecipe(recipeData);
      } catch (err) {
        console.error("Erro ao carregar a receita:", err);
        setError("Erro ao carregar a receita. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, currentUser]);

  // Handle printing the recipe
  const handlePrint = () => {
    window.print();
  };

  // Handle sharing the recipe
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe?.name || "NutriMacros - Receita",
          text: recipe?.description || "Confira esta receita incrível!",
          url: window.location.href,
        })
        .catch((err) => console.error("Erro ao compartilhar:", err));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copiado para a área de transferência!"))
        .catch((err) => console.error("Erro ao copiar link:", err));
    }
  };

  const handleSaveToggle = async () => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    await toggleSaved();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">{error || "Receita não encontrada"}</h2>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format the nutrition values to have consistent decimal places
  const formatNutrition = (value: number): string => {
    return value.toFixed(1);
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <Button variant="ghost" className="mb-6 pl-0 -ml-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
              <p className="text-muted-foreground">{recipe.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Compartilhar</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleSaveToggle}>
                <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                <span className="hidden md:inline">{isSaved ? "Salvo" : "Salvar"}</span>
              </Button>
            </div>
          </div>

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.tags.map((tag) => (
                <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Info & Ingredients */}
          <div className="space-y-6 lg:col-span-1">
            {/* Recipe Info Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tempo Total</p>
                      <p className="font-medium">{recipe.prepTime + recipe.cookTime} min</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Porções</p>
                      <p className="font-medium">{recipe.servings}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Preparo</p>
                      <p className="font-medium">{recipe.prepTime} min</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Dificuldade</p>
                      <p className="font-medium">
                        {recipe.difficulty === "easy" ? "Fácil" : recipe.difficulty === "medium" ? "Média" : "Difícil"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informação Nutricional</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p>Calorias</p>
                        <p className="font-semibold">{formatNutrition(recipe.nutrition.calories)} kcal</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Dumbbell className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p>Proteínas</p>
                        <p className="font-semibold">{formatNutrition(recipe.nutrition.protein)} g</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Croissant className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p>Carboidratos</p>
                        <p className="font-semibold">{formatNutrition(recipe.nutrition.carbs)} g</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-red-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p>Gorduras</p>
                        <p className="font-semibold">{formatNutrition(recipe.nutrition.fats)} g</p>
                      </div>
                    </div>
                  </div>

                  {recipe.nutrition.fiber && (
                    <div className="flex items-center gap-3 pl-8">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Fibras</p>
                          <p>{formatNutrition(recipe.nutrition.fiber)} g</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {recipe.nutrition.sugar && (
                    <div className="flex items-center gap-3 pl-8">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Açúcares</p>
                          <p>{formatNutrition(recipe.nutrition.sugar)} g</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">* Valores nutricionais calculados por porção</p>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ingredientes</h3>

                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {index + 1}
                      </div>
                      <span>
                        {ingredient.amount} {ingredient.unit || "g"} de {ingredient.name}
                        {ingredient.optional && <span className="text-sm text-muted-foreground ml-1">(opcional)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Image & Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Image */}
            <div className="rounded-xl overflow-hidden bg-muted h-64 lg:h-80">
              {recipe.mainImage ? (
                <img src={recipe.mainImage} alt={recipe.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <ChefHat className="h-20 w-20 text-primary/40" />
                </div>
              )}
            </div>

            {/* Instructions Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Modo de Preparo</h3>

                <div className="space-y-6">
                  {recipe.steps.map((step) => (
                    <div key={step.order} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                        {step.order}
                      </div>
                      <div className="flex-1">
                        <p>{step.instruction}</p>

                        {step.duration && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{step.duration} minutos</span>
                          </div>
                        )}

                        {step.image && (
                          <div className="mt-2 rounded-lg overflow-hidden">
                            <img
                              src={step.image}
                              alt={`Passo ${step.order}`}
                              className="w-full h-auto max-h-40 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {recipe.tips && recipe.tips.length > 0 && (
                  <div className="mt-8 pt-4 border-t border-border/40">
                    <h4 className="font-medium mb-2">Dicas do Chef</h4>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="text-sm">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Prompt for Premium Recipes */}
      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="Esta é uma receita premium! Faça login ou crie uma conta para ter acesso a todas as receitas premium."
      />
    </PageTransition>
  );
};

export default RecipeDetailPage;
