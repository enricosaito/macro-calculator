import { db } from "@/lib/firebase";
import { collection, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { generateSlug } from "./recipeUtils";
import { Recipe } from "@/types/recipe";

// Helper function to sanitize data for Firestore
const sanitizeForFirestore = <T>(obj: T): Record<string, unknown> | null | T => {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeForFirestore(item)) as unknown as T;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    // Skip undefined values
    if (value === undefined) continue;
    // Recursively sanitize nested objects
    result[key] = sanitizeForFirestore(value);
  }

  return result;
};

export const batchImportRecipes = async (recipeData: Partial<Recipe>[]) => {
  try {
    // Use multiple batches to avoid Firestore batch size limits
    let importedCount = 0;
    const batchSize = 20; // Firestore has a limit of 500, but we'll use a smaller number to be safe

    for (let i = 0; i < recipeData.length; i += batchSize) {
      const batch = writeBatch(db);
      const recipesToProcess = recipeData.slice(i, i + batchSize);

      for (const recipe of recipesToProcess) {
        // Generate a slug if one doesn't exist
        if (!recipe.slug && recipe.name) {
          recipe.slug = generateSlug(recipe.name);
        }

        // Add timestamps
        const recipeWithMetadata = {
          ...recipe,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          // Add normalized name for better search
          nameNormalized: recipe.name
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        };

        // Sanitize data to remove undefined values
        const sanitizedRecipe = sanitizeForFirestore(recipeWithMetadata);

        // Create a new document reference with an auto-generated ID
        const newRecipeRef = doc(collection(db, "recipes"));

        // Add to batch
        batch.set(newRecipeRef, sanitizedRecipe);
        importedCount++;
      }

      // Commit the batch
      await batch.commit();
    }

    return {
      status: "success",
      message: `Importados ${importedCount} receitas com sucesso.`,
      count: importedCount,
    };
  } catch (error) {
    console.error("Erro na importação em lote:", error);
    return {
      status: "error",
      message: `Erro na importação: ${error instanceof Error ? error.message : String(error)}`,
      count: 0,
    };
  }
};
