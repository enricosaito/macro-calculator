export interface RecipeIngredient {
  id: string; // Reference to ingredient in ingredients collection
  name: string; // For display purposes
  amount: number; // Amount in grams
  unit?: string; // Optional unit (g, ml, etc.)
  optional?: boolean; // Is this ingredient optional?
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number; // Optional additional nutrition data
  sugar?: number;
  sodium?: number;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  image?: string; // Optional image for this step
  duration?: number; // Optional duration in minutes
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  // Classification
  category: "breakfast" | "lunch" | "dinner" | "snack" | "dessert" | "side";
  cuisineType?: string;
  tags: string[];

  // Recipe details
  difficulty: "easy" | "medium" | "hard";
  prepTime: number;
  cookTime: number;
  servings: number;

  // Recipe content
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips?: string[];

  // Nutrition information
  nutrition: RecipeNutrition;

  // Media
  mainImage?: string;
  gallery?: string[];

  // Access control
  isPublic: boolean;
  isPremium: boolean;

  // Metadata
  averageRating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}
