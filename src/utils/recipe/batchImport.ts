import { db } from "@/lib/firebase";
import { collection, addDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { Recipe } from "@/types/recipe";
import { generateSlug } from "./recipeUtils";

export const batchImportRecipes = async (recipeData: Partial<Recipe>[]) => {
  try {
    const batch = writeBatch(db);
    const recipesRef = collection(db, "recipes");
    let importedCount = 0;

    for (const recipe of recipeData) {
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

      // Add to batch
      const newRecipeRef = collection(db, "recipes");
      batch.set(newRecipeRef, recipeWithMetadata);
      importedCount++;
    }

    // Commit the batch
    await batch.commit();

    return {
      status: "success",
      message: `Importados ${importedCount} receitas com sucesso.`,
      count: importedCount,
    };
  } catch (error) {
    console.error("Erro na importação em lote:", error);
    return {
      status: "error",
      message: `Erro na importação: ${error}`,
      count: 0,
    };
  }
};
