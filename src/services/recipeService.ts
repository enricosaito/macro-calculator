import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Recipe } from "@/types/recipe";

// Collection references
const RECIPES_COLLECTION = "recipes";

// Type for Firestore recipe (with Timestamp instead of Date)
interface FirestoreRecipe extends Omit<Recipe, "createdAt" | "updatedAt"> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Convert Firestore recipe to app Recipe
const convertFromFirestore = (doc: FirestoreRecipe): Recipe => ({
  ...doc,
  createdAt: doc.createdAt.toDate(),
  updatedAt: doc.updatedAt.toDate(),
});

// Get a single recipe by ID
export const getRecipe = async (recipeId: string): Promise<Recipe | null> => {
  try {
    console.log("Fetching recipe with ID:", recipeId);
    const recipeDoc = await getDoc(doc(db, RECIPES_COLLECTION, recipeId));

    if (!recipeDoc.exists()) {
      console.log("Recipe not found");
      return null;
    }

    const data = recipeDoc.data();
    console.log("Recipe data:", data);

    // Convert from Firestore format to Recipe type
    return {
      id: recipeDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// Get recipes with filtering options
export const getRecipes = async ({
  category,
  tags,
  isPremium,
  isFeatured,
  isNew,
  createdBy,
  maxResults = 20,
}: {
  category?: string;
  tags?: string[];
  isPremium?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  createdBy?: string;
  maxResults?: number;
}): Promise<Recipe[]> => {
  try {
    // Start with the collection reference
    let q = query(collection(db, RECIPES_COLLECTION), where("isPublic", "==", true));

    // Add filters
    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (tags && tags.length > 0) {
      // Note: Firestore has limitations with array-contains-any (max 10 values)
      q = query(q, where("tags", "array-contains-any", tags.slice(0, 10)));
    }

    if (isPremium !== undefined) {
      q = query(q, where("isPremium", "==", isPremium));
    }

    if (isFeatured !== undefined) {
      q = query(q, where("isFeatured", "==", isFeatured));
    }

    if (isNew !== undefined) {
      q = query(q, where("isNew", "==", isNew));
    }

    if (createdBy) {
      q = query(q, where("createdBy", "==", createdBy));
    }

    // Order by updatedAt (newest first) and limit results
    q = query(q, orderBy("updatedAt", "desc"), limit(maxResults));

    const recipeDocs = await getDocs(q);
    return recipeDocs.docs.map((doc) => {
      const data = doc.data() as FirestoreRecipe;
      return convertFromFirestore({
        ...data,
        id: doc.id,
      });
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Admin functions

// Create a new recipe
export const createRecipe = async (recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, RECIPES_COLLECTION), {
      ...recipe,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

// Update an existing recipe
export const updateRecipe = async (
  recipeId: string,
  recipe: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt">>
): Promise<void> => {
  try {
    await updateDoc(doc(db, RECIPES_COLLECTION, recipeId), {
      ...recipe,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

// Delete a recipe
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, RECIPES_COLLECTION, recipeId));
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
