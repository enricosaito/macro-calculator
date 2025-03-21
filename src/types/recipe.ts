export interface RecipeIngredient {
  id: string; // Reference to ingredient in ingredients collection
  name: string; // For display purposes
  amount: number; // Amount in grams or other unit
  unit: string; // g, ml, tbsp, etc.
  optional?: boolean; // Is this ingredient optional?
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  image?: string; // Optional image for this step
  duration?: number; // Optional duration in minutes
}

export type RecipeDifficulty = "easy" | "medium" | "hard";
export type RecipeCategory = "breakfast" | "lunch" | "dinner" | "snack" | "dessert" | "side";
export type CuisineType =
  | "brasileira"
  | "italiana"
  | "japonesa"
  | "mexicana"
  | "chinesa"
  | "indiana"
  | "americana"
  | "outras";
export type DietaryRestriction =
  | "vegetariano"
  | "vegano"
  | "sem-gluten"
  | "sem-lactose"
  | "low-carb"
  | "keto"
  | "paleo";
export type MealType = "pre-treino" | "pos-treino" | "cafe-da-manha" | "almoco" | "jantar" | "lanche";

export interface Recipe {
  id: string;
  name: string;
  slug: string; // URL-friendly version of name for nice URLs
  description: string;

  // Metadata
  createdBy: string; // User ID of creator
  createdAt: Date;
  updatedAt: Date;

  // Classification - important for filtering
  category: RecipeCategory;
  cuisineType: CuisineType;
  dietaryRestrictions: DietaryRestriction[]; // Can match multiple restrictions
  mealTypes: MealType[]; // Can be suitable for multiple meal times
  tags: string[]; // General purpose tags

  // Recipe details
  difficulty: RecipeDifficulty;
  prepTime: number; // In minutes
  cookTime: number; // In minutes
  servings: number;

  // Recipe content
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips?: string[];

  // Nutrition information
  nutrition: RecipeNutrition;

  // Media
  mainImage?: string; // URL to Firebase Storage
  gallery?: string[]; // Additional images

  // Access control
  isPublic: boolean; // Is this recipe publicly visible?
  isPremium: boolean; // Is this a premium recipe?

  // Engagement metrics
  averageRating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}
