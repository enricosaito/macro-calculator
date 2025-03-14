import { Recipe, recipes } from "./recipes-data";

// Function to suggest recipes based on selected ingredients
export const suggestRecipes = (selectedIngredientIds: string[]): Recipe[] => {
  if (selectedIngredientIds.length === 0) return [];

  // Score recipes based on how many selected ingredients they use
  const scoredRecipes = recipes.map((recipe) => {
    const recipeIngredientIds = recipe.ingredients.map((item) => item.ingredientId);

    // Count how many selected ingredients the recipe uses
    const matchedIngredients = recipeIngredientIds.filter((id) => selectedIngredientIds.includes(id));

    // Calculate percentage of recipe ingredients that are selected
    const recipeMatchPercentage = (matchedIngredients.length / recipeIngredientIds.length) * 100;

    // Calculate percentage of selected ingredients that are used
    const selectedMatchPercentage = (matchedIngredients.length / selectedIngredientIds.length) * 100;

    // Combine scores, giving more weight to recipes that use more of the selected ingredients
    const score = recipeMatchPercentage * 0.4 + selectedMatchPercentage * 0.6;

    return {
      recipe,
      score,
      matchedIngredientCount: matchedIngredients.length,
    };
  });

  // Filter recipes that use at least one selected ingredient
  const relevantRecipes = scoredRecipes.filter((item) => item.matchedIngredientCount > 0);

  // Sort by score (highest first)
  relevantRecipes.sort((a, b) => b.score - a.score);

  // Return just the recipe objects
  return relevantRecipes.map((item) => item.recipe);
};
