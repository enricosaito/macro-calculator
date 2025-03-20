import { describe, it, expect } from "vitest";
import { calculateRecipeMacros } from "../recipes-data";
import { Ingredient } from "../ingredients-data";

describe("calculateRecipeMacros", () => {
  it("correctly calculates macros for a recipe", () => {
    // Sample recipe
    const recipe = {
      id: "test-recipe",
      name: "Test Recipe",
      description: "Test description",
      ingredients: [
        { ingredientId: "chicken-breast", amount: 150 },
        { ingredientId: "rice", amount: 100 },
      ],
      instructions: ["Step 1", "Step 2"],
      prepTime: 10,
      cookTime: 20,
      servings: 1,
      difficulty: "easy" as const,
    };

    // Sample ingredients
    const ingredients: Ingredient[] = [
      {
        id: "chicken-breast",
        name: "Peito de Frango",
        category: "protein",
        protein: 30,
        carbs: 0,
        fats: 3,
        calories: 165,
        emoji: "🍗",
      },
      {
        id: "rice",
        name: "Arroz",
        category: "carb",
        protein: 3,
        carbs: 28,
        fats: 0,
        calories: 130,
        emoji: "🍚",
      },
    ];

    // Expected results (calculated manually)
    // Chicken: 150g * (30g protein/100g) = 45g protein
    // Chicken: 150g * (0g carbs/100g) = 0g carbs
    // Chicken: 150g * (3g fats/100g) = 4.5g fats
    // Chicken: 150g * (165 calories/100g) = 247.5 calories

    // Rice: 100g * (3g protein/100g) = 3g protein
    // Rice: 100g * (28g carbs/100g) = 28g carbs
    // Rice: 100g * (0g fats/100g) = 0g fats
    // Rice: 100g * (130 calories/100g) = 130 calories

    // Total: 48g protein, 28g carbs, 4.5g fats, 377.5 calories
    // Rounded: 48g protein, 28g carbs, 5g fats, 378 calories

    const expected = {
      protein: 48,
      carbs: 28,
      fats: 5,
      calories: 378,
    };

    const result = calculateRecipeMacros(recipe, ingredients);
    expect(result).toEqual(expected);
  });

  it("handles missing ingredients gracefully", () => {
    const recipe = {
      id: "test-recipe",
      name: "Test Recipe",
      description: "Test description",
      ingredients: [
        { ingredientId: "missing-ingredient", amount: 100 },
        { ingredientId: "rice", amount: 100 },
      ],
      instructions: ["Step 1"],
      prepTime: 10,
      cookTime: 20,
      servings: 1,
      difficulty: "easy" as const,
    };

    const ingredients: Ingredient[] = [
      {
        id: "rice",
        name: "Arroz",
        category: "carb",
        protein: 3,
        carbs: 28,
        fats: 0,
        calories: 130,
        emoji: "🍚",
      },
    ];

    // Should only calculate for the found ingredient (rice)
    const expected = {
      protein: 3,
      carbs: 28,
      fats: 0,
      calories: 130,
    };

    const result = calculateRecipeMacros(recipe, ingredients);
    expect(result).toEqual(expected);
  });
});
