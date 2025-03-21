// src/utils/recipe/seedDatabase.ts
import { seedRecipes } from "@/data/seedRecipes";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore";
import { createRecipe } from "@/services/recipeService";

const RECIPES_COLLECTION = "recipes";

/**
 * Seeds the database with initial recipes
 * This should be called once to initialize the database
 */
export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Check how many recipes already exist in the database
    const existingRecipesSnapshot = await getDocs(collection(db, RECIPES_COLLECTION));
    const existingCount = existingRecipesSnapshot.size;

    console.log(`Found ${existingCount} existing recipes in the database.`);

    // If we already have recipes, check if we need to add more
    if (existingCount > 0) {
      console.log("Checking for new seed recipes to add...");

      // Get existing recipe slugs
      const existingSlugs = new Set(existingRecipesSnapshot.docs.map((doc) => doc.data().slug));

      // Filter seed recipes that don't exist yet
      const newSeedRecipes = seedRecipes.filter((recipe) => !existingSlugs.has(recipe.slug));

      if (newSeedRecipes.length === 0) {
        console.log("All seed recipes already exist. No new recipes to add.");
        return {
          status: "success",
          message: "All seed recipes already exist.",
          added: 0,
          total: existingCount,
        };
      }

      console.log(`Adding ${newSeedRecipes.length} new seed recipes...`);

      // Add new seed recipes
      for (const recipe of newSeedRecipes) {
        await createRecipe(recipe);
      }

      return {
        status: "success",
        message: `Added ${newSeedRecipes.length} new seed recipes.`,
        added: newSeedRecipes.length,
        total: existingCount + newSeedRecipes.length,
      };
    } else {
      // Database is empty, add all seed recipes
      console.log(`Adding all ${seedRecipes.length} seed recipes...`);

      for (const recipe of seedRecipes) {
        await createRecipe(recipe);
      }

      return {
        status: "success",
        message: `Initialized database with ${seedRecipes.length} seed recipes.`,
        added: seedRecipes.length,
        total: seedRecipes.length,
      };
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    return {
      status: "error",
      message: `Error seeding database: ${error}`,
      added: 0,
      total: 0,
    };
  }
};
