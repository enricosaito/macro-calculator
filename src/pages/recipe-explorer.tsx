// src/pages/recipe-explorer.tsx
import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { recipes } from "@/lib/recipes-data";
import PageTransition from "@/components/ui/page-transition";

import { createSampleRecipe } from "@/utils/createSampleRecipe";

const RecipeExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Group recipes by categories (meal type)
  const breakfastRecipes = recipes.filter((recipe) => recipe.tags?.includes("café da manhã")).slice(0, 10);

  const lunchDinnerRecipes = recipes
    .filter((recipe) => !recipe.tags?.includes("café da manhã") && !recipe.tags?.includes("lanche"))
    .slice(0, 10);

  const snackRecipes = recipes.filter((recipe) => recipe.tags?.includes("lanche")).slice(0, 10);

  const highProteinRecipes = recipes.filter((recipe) => recipe.tags?.includes("alto em proteína")).slice(0, 10);

  const quickRecipes = recipes.filter((recipe) => recipe.prepTime + recipe.cookTime <= 20).slice(0, 10);

  // Then add this function in the RecipeExplorer component
  const handleCreateSampleRecipe = async () => {
    try {
      const recipeId = await createSampleRecipe();
      alert(`Receita de exemplo criada com ID: ${recipeId}`);
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      alert("Erro ao criar receita de exemplo");
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-6 px-4">
        {/* Search Header */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Buscar receitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border-2 shadow-sm focus-visible:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        {/* Test Add Recipe */}
        <Button onClick={handleCreateSampleRecipe} variant="outline" className="mb-4">
          Criar Receita de Exemplo
        </Button>

        {/* Quick Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            Alto em Proteína
          </Button>
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            Baixa Caloria
          </Button>
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            Rápido (15min)
          </Button>
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            Vegetariano
          </Button>
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            Low Carb
          </Button>
        </div>

        {/* Featured Recipes */}
        <div className="mb-8">
          <RecipeCarousel title="Destaques da Semana" recipes={recipes.filter((r) => r.isNew).slice(0, 5)} featured />
        </div>

        {/* Categorized Recipe Carousels */}
        <div className="space-y-8">
          <RecipeCarousel title="Café da Manhã" recipes={breakfastRecipes} />
          <RecipeCarousel title="Almoço e Jantar" recipes={lunchDinnerRecipes} />
          <RecipeCarousel title="Lanches" recipes={snackRecipes} />
          <RecipeCarousel title="Alto em Proteína" recipes={highProteinRecipes} />
          <RecipeCarousel title="Pronto em 20 minutos" recipes={quickRecipes} />
        </div>
      </div>
    </PageTransition>
  );
};

interface RecipeCarouselProps {
  title: string;
  recipes: typeof recipes;
  featured?: boolean;
}

const RecipeCarousel = ({ title, recipes, featured = false }: RecipeCarouselProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
          Ver mais <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="flex-none"
              style={{ width: featured ? 280 : 160 }}
            >
              <Card className="h-full overflow-hidden border-border/40 hover:border-primary/40 transition-colors">
                <div className={`relative bg-muted ${featured ? "h-36" : "h-28"}`}>
                  {/* Placeholder for recipe image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-3xl">{getEmojiFromRecipe(recipe)}</span>
                  </div>

                  {recipe.isNew && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      Novo
                    </span>
                  )}
                </div>

                <CardContent className={`p-3 ${featured ? "" : "space-y-0.5"}`}>
                  <h3 className={`${featured ? "text-base font-medium" : "text-sm font-medium"} line-clamp-1`}>
                    {recipe.name}
                  </h3>

                  {featured && <p className="text-sm text-muted-foreground line-clamp-2 my-1">{recipe.description}</p>}

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{recipe.prepTime + recipe.cookTime} min</span>
                    <span>
                      {recipe.difficulty === "easy" ? "Fácil" : recipe.difficulty === "medium" ? "Médio" : "Difícil"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {recipes.length === 0 && (
            <div className="flex-1 py-12 text-center text-muted-foreground">Nenhuma receita encontrada.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for recipe visual
function getEmojiFromRecipe(recipe: (typeof recipes)[0]): string {
  if (recipe.tags?.includes("café da manhã")) return "🍳";
  if (recipe.tags?.includes("lanche")) return "🥪";
  if (recipe.tags?.includes("salada")) return "🥗";
  if (recipe.tags?.includes("pós-treino")) return "💪";

  // Default by main ingredient
  const mainIngredient = recipe.ingredients[0]?.ingredientId;

  if (mainIngredient?.includes("chicken")) return "🍗";
  if (mainIngredient?.includes("beef")) return "🥩";
  if (mainIngredient?.includes("fish") || mainIngredient?.includes("salmon")) return "🐟";
  if (mainIngredient?.includes("rice")) return "🍚";
  if (mainIngredient?.includes("pasta")) return "🍝";
  if (mainIngredient?.includes("egg")) return "🥚";
  if (mainIngredient?.includes("avocado")) return "🥑";
  if (mainIngredient?.includes("fruit")) return "🍎";

  return "🍲"; // Default
}

export default RecipeExplorer;
