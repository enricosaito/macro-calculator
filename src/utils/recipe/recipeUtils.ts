import { Recipe } from "@/types/recipe";

/**
 * Generate a slug from a recipe name
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD") // Normalize diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Generate a unique recipe ID with category prefix and counter
 */
export const generateRecipeId = (category: string, counter: number): string => {
  // Format: recipe-{category}-{counter}
  return `recipe-${category}-${String(counter).padStart(3, "0")}`;
};

/**
 * Validate recipe data
 * Returns array of error messages, empty if valid
 */
export const validateRecipe = (recipe: Partial<Recipe>): string[] => {
  const errors: string[] = [];

  if (!recipe.name || recipe.name.trim().length < 3) {
    errors.push("Nome da receita deve ter pelo menos 3 caracteres");
  }

  if (!recipe.description || recipe.description.trim().length < 10) {
    errors.push("Descrição da receita deve ter pelo menos 10 caracteres");
  }

  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    errors.push("A receita deve ter pelo menos um ingrediente");
  }

  if (!recipe.steps || recipe.steps.length === 0) {
    errors.push("A receita deve ter pelo menos um passo de preparo");
  }

  return errors;
};
