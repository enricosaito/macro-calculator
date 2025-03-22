import { useState, useEffect } from "react";
import { Search, ChevronRight, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import PageTransition from "@/components/ui/page-transition";
import { getAllPublicRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [newRecipes, setNewRecipes] = useState<Recipe[]>([]);
  const [breakfastRecipes, setBreakfastRecipes] = useState<Recipe[]>([]);
  const [lunchDinnerRecipes, setLunchDinnerRecipes] = useState<Recipe[]>([]);
  const [snackRecipes, setSnackRecipes] = useState<Recipe[]>([]);
  const [highProteinRecipes, setHighProteinRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all public recipes once
        const allPublicRecipes = await getAllPublicRecipes(50); // Get a reasonable amount

        // Then filter in memory for the different categories
        if (allPublicRecipes.length > 0) {
          // Featured recipes
          const featured = allPublicRecipes.filter((recipe) => recipe.isFeatured);
          setFeaturedRecipes(featured.slice(0, 5));

          // New recipes
          const newRecs = allPublicRecipes.filter((recipe) => recipe.isNew);
          setNewRecipes(newRecs.slice(0, 10));

          // Category recipes
          const breakfast = allPublicRecipes.filter((recipe) => recipe.category === "breakfast");
          setBreakfastRecipes(breakfast.slice(0, 6));

          const lunch = allPublicRecipes.filter((recipe) => recipe.category === "lunch");
          setLunchDinnerRecipes(lunch.slice(0, 6));

          const snack = allPublicRecipes.filter((recipe) => recipe.category === "snack");
          setSnackRecipes(snack.slice(0, 6));

          // High protein recipes
          const highProtein = allPublicRecipes.filter((recipe) =>
            recipe.tags?.some((tag) => tag.toLowerCase().includes("proteína") || tag.toLowerCase().includes("proteico"))
          );
          setHighProteinRecipes(highProtein.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Erro ao carregar receitas. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Handle searching recipes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement search functionality later
    console.log("Searching for:", searchQuery);
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-6 px-4">
        {/* Search Header */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <Input
            type="text"
            placeholder="Buscar receitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border-2 shadow-sm focus-visible:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Button type="submit" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">
            Buscar
          </Button>
        </form>

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
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Mais Filtros
          </Button>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="space-y-8">
            {/* Featured Recipes */}
            {featuredRecipes.length > 0 && (
              <RecipeCarousel title="Destaques da Semana" recipes={featuredRecipes} featured />
            )}

            {/* New Recipes */}
            {newRecipes.length > 0 && <RecipeCarousel title="Novidades" recipes={newRecipes} />}

            {/* Categorized Recipe Carousels */}
            {breakfastRecipes.length > 0 && <RecipeCarousel title="Café da Manhã" recipes={breakfastRecipes} />}

            {lunchDinnerRecipes.length > 0 && <RecipeCarousel title="Almoço e Jantar" recipes={lunchDinnerRecipes} />}

            {snackRecipes.length > 0 && <RecipeCarousel title="Lanches" recipes={snackRecipes} />}

            {highProteinRecipes.length > 0 && <RecipeCarousel title="Alto em Proteína" recipes={highProteinRecipes} />}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

const LoadingState = () => (
  <div className="space-y-8">
    <div>
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="flex-none w-64 h-52 rounded-md" />
        ))}
      </div>
    </div>
    <div>
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="flex-none w-40 h-48 rounded-md" />
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-lg font-medium mb-2">Ops! Algo deu errado.</p>
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
    </CardContent>
  </Card>
);

interface RecipeCarouselProps {
  title: string;
  recipes: Recipe[];
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
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.slug}`}
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

                    {recipe.isPremium && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>

                  <CardContent className={`p-3 ${featured ? "" : "space-y-0.5"}`}>
                    <h3 className={`${featured ? "text-base font-medium" : "text-sm font-medium"} line-clamp-1`}>
                      {recipe.name}
                    </h3>

                    {featured && (
                      <p className="text-sm text-muted-foreground line-clamp-2 my-1">{recipe.description}</p>
                    )}

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{(recipe.prepTime || 0) + (recipe.cookTime || 0)} min</span>
                      <span>
                        {recipe.difficulty === "easy" ? "Fácil" : recipe.difficulty === "medium" ? "Médio" : "Difícil"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="flex-1 py-12 text-center text-muted-foreground">Nenhuma receita encontrada.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for recipe visual
function getEmojiFromRecipe(recipe: Recipe): string {
  // First check category
  if (recipe.category === "breakfast") return "🍳";
  if (recipe.category === "lunch") return "🍲";
  if (recipe.category === "dinner") return "🍽️";
  if (recipe.category === "snack") return "🥪";
  if (recipe.category === "dessert") return "🍰";

  // Then check meal types
  if (recipe.mealTypes?.includes("cafe-da-manha")) return "☕";
  if (recipe.mealTypes?.includes("pos-treino")) return "💪";
  if (recipe.mealTypes?.includes("pre-treino")) return "🏋️";

  // Check by main ingredient if available
  const mainIngredient = recipe.ingredients?.[0]?.id;

  if (mainIngredient?.includes("chicken")) return "🍗";
  if (mainIngredient?.includes("beef")) return "🥩";
  if (mainIngredient?.includes("fish") || mainIngredient?.includes("tuna") || mainIngredient?.includes("salmon"))
    return "🐟";
  if (mainIngredient?.includes("rice")) return "🍚";
  if (mainIngredient?.includes("pasta")) return "🍝";
  if (mainIngredient?.includes("egg")) return "🥚";
  if (mainIngredient?.includes("avocado")) return "🥑";
  if (mainIngredient?.includes("banana") || mainIngredient?.includes("fruit")) return "🍎";
  if (mainIngredient?.includes("quinoa")) return "🌾";

  // Default if nothing else matches
  return "🍲";
}

export default RecipeExplorer;
