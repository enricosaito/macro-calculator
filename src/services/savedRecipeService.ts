import { collection, query, where, addDoc, deleteDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SAVED_RECIPES_COLLECTION = "savedRecipes";

// Save a recipe to the user's saved recipes
export const saveRecipe = async (userId: string, recipeId: string): Promise<string> => {
  try {
    // Check if already saved
    const existing = await getSavedRecipeDoc(userId, recipeId);
    if (existing) {
      return existing.id;
    }

    // If not saved, add it
    const docRef = await addDoc(collection(db, SAVED_RECIPES_COLLECTION), {
      userId,
      recipeId,
      savedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

// Remove a recipe from user's saved recipes
export const unsaveRecipe = async (userId: string, recipeId: string): Promise<void> => {
  try {
    const existingDoc = await getSavedRecipeDoc(userId, recipeId);

    if (existingDoc) {
      await deleteDoc(existingDoc.ref);
    }
  } catch (error) {
    console.error("Error unsaving recipe:", error);
    throw error;
  }
};

// Check if a recipe is saved by user
export const isRecipeSaved = async (userId: string, recipeId: string): Promise<boolean> => {
  try {
    const doc = await getSavedRecipeDoc(userId, recipeId);
    return !!doc;
  } catch (error) {
    console.error("Error checking if recipe is saved:", error);
    throw error;
  }
};

// Get all saved recipe IDs for a user
export const getSavedRecipeIds = async (userId: string): Promise<string[]> => {
  try {
    const q = query(collection(db, SAVED_RECIPES_COLLECTION), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data().recipeId);
  } catch (error) {
    console.error("Error getting saved recipes:", error);
    throw error;
  }
};

// Helper function to get a saved recipe document
const getSavedRecipeDoc = async (userId: string, recipeId: string) => {
  const q = query(
    collection(db, SAVED_RECIPES_COLLECTION),
    where("userId", "==", userId),
    where("recipeId", "==", recipeId)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty
    ? null
    : {
        id: querySnapshot.docs[0].id,
        ref: querySnapshot.docs[0].ref,
        data: querySnapshot.docs[0].data(),
      };
};
