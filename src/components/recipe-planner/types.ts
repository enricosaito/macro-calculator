import { Ingredient } from "@/lib/ingredients-data";
import { Recipe } from "@/lib/recipes-data";
import { User } from "firebase/auth";

export type RecipeStep = "landing" | "proteins" | "carbs" | "fats" | "spices" | "results";

export interface SpiceIngredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  commonality: number;
}

export interface IngredientsSelectionProps {
  ingredients: (Ingredient | SpiceIngredient)[];
  selectedIngredients: string[];
  toggleIngredient: (id: string) => void;
  stepNumber: number;
  title: string;
  description: string;
}

export interface RecipePlannerStepProps {
  selectedIngredients: string[];
  toggleIngredient: (id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export interface ResultsPageProps {
  selectedIngredients: string[];
  suggestedRecipes: Recipe[];
  proteinIngredients: Ingredient[];
  carbIngredients: Ingredient[];
  fatIngredients: Ingredient[];
  spiceIngredients: SpiceIngredient[];
  onStartOver: () => void;
  onViewRecipeDetails: (recipe: Recipe, isPremium: boolean) => void;
  currentUser: User | null;
}

export interface LandingPageProps {
  onStart: () => void;
}
