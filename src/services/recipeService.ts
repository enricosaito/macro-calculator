// src/services/recipeService.ts
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
  serverTimestamp,
  Timestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  collectionGroup,
  startAfter,
  startAt,
  endAt,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Recipe, RecipeCategory, CuisineType, DietaryRestriction, MealType } from "@/types/recipe";
import { generateSlug } from "@/utils/recipe/recipeUtils";

// Collection references
const RECIPES_COLLECTION = "recipes";
const RECIPES_COUNTER_DOC = "counters/recipes";

// Convert Firestore timestamps to Dates
const convertFromFirestore = (doc: QueryDocumentSnapshot<DocumentData>): Recipe => {
  const data = doc.data();

  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as Recipe;
};

/**
 * Get recipe by ID
 */
export const getRecipeById = async (recipeId: string): Promise<Recipe | null> => {
  try {
    const recipeDoc = await getDoc(doc(db, RECIPES_COLLECTION, recipeId));
    if (!recipeDoc.exists()) return null;

    return convertFromFirestore(recipeDoc as QueryDocumentSnapshot<DocumentData>);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw error;
  }
};

/**
 * Get recipe by slug
 */
export const getRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where("slug", "==", slug),
      where("isPublic", "==", true),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    return convertFromFirestore(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching recipe by slug:", error);
    throw error;
  }
};

/**
 * Interface for recipe filter parameters
 */
export interface RecipeFilterParams {
  category?: RecipeCategory;
  cuisineType?: CuisineType;
  dietaryRestrictions?: DietaryRestriction[];
  mealTypes?: MealType[];
  tags?: string[];
  maxCalories?: number;
  minProtein?: number;
  difficulty?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  createdBy?: string;
  searchText?: string;
  lastVisible?: DocumentSnapshot;
  pageSize?: number;
}

/**
 * Get recipes with filtering and pagination
 */
export const getRecipes = async (
  params: RecipeFilterParams = {}
): Promise<{
  recipes: Recipe[];
  lastVisible: DocumentSnapshot | null;
  hasMore: boolean;
}> => {
  try {
    const {
      category,
      cuisineType,
      dietaryRestrictions,
      mealTypes,
      tags,
      maxCalories,
      minProtein,
      difficulty,
      isPremium,
      isFeatured,
      isNew,
      createdBy,
      searchText,
      lastVisible,
      pageSize = 10,
    } = params;

    // Build query constraints
    const constraints: QueryConstraint[] = [where("isPublic", "==", true), orderBy("updatedAt", "desc")];

    // Add category filter
    if (category) {
      constraints.push(where("category", "==", category));
    }

    // Add cuisine type filter
    if (cuisineType) {
      constraints.push(where("cuisineType", "==", cuisineType));
    }

    // Add dietary restrictions filter - all must match
    if (dietaryRestrictions && dietaryRestrictions.length > 0) {
      dietaryRestrictions.forEach((restriction) => {
        constraints.push(where("dietaryRestrictions", "array-contains", restriction));
      });
    }

    // Add meal type filter - any can match (but we can only use one array-contains-any)
    if (mealTypes && mealTypes.length > 0) {
      constraints.push(where("mealTypes", "array-contains-any", mealTypes));
    }

    // Add tags filter - if we haven't already used array-contains-any
    if (tags && tags.length > 0 && (!mealTypes || mealTypes.length === 0)) {
      constraints.push(where("tags", "array-contains-any", tags.slice(0, 10)));
    }

    // Add nutrition filters
    if (maxCalories) {
      constraints.push(where("nutrition.calories", "<=", maxCalories));
    }

    if (minProtein) {
      constraints.push(where("nutrition.protein", ">=", minProtein));
    }

    // Add difficulty filter
    if (difficulty) {
      constraints.push(where("difficulty", "==", difficulty));
    }

    // Add premium filter
    if (isPremium !== undefined) {
      constraints.push(where("isPremium", "==", isPremium));
    }

    // Add featured filter
    if (isFeatured !== undefined) {
      constraints.push(where("isFeatured", "==", isFeatured));
    }

    // Add new filter
    if (isNew !== undefined) {
      constraints.push(where("isNew", "==", isNew));
    }

    // Add creator filter
    if (createdBy) {
      constraints.push(where("createdBy", "==", createdBy));
    }

    // Add pagination
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    // Limit results
    constraints.push(limit(pageSize + 1)); // +1 to check if there are more

    // Create query
    let q = query(collection(db, RECIPES_COLLECTION), ...constraints);

    // Execute query
    const querySnapshot = await getDocs(q);

    // Check if we have more results
    const hasMore = querySnapshot.docs.length > pageSize;

    // Get the recipes
    const recipes = querySnapshot.docs.slice(0, pageSize).map((doc) => convertFromFirestore(doc));

    // Get the last visible document for pagination
    const newLastVisible =
      querySnapshot.docs.length > 0 ? querySnapshot.docs[Math.min(pageSize - 1, querySnapshot.docs.length - 1)] : null;

    return {
      recipes,
      lastVisible: newLastVisible,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

/**
 * Search recipes by text
 * Note: This requires a special index in Firestore
 */
export const searchRecipes = async (searchText: string, limit: number = 10): Promise<Recipe[]> => {
  try {
    // Create a version of the search text without diacritical marks
    const normalizedText = searchText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // For a proper text search, you'd need Algolia or a similar search service
    // This is a simple approach that searches name and description
    const nameStartQuery = query(
      collection(db, RECIPES_COLLECTION),
      where("isPublic", "==", true),
      where("name", ">=", searchText),
      where("name", "<=", searchText + "\uf8ff"),
      limit(limit)
    );

    const nameNormalizedQuery = query(
      collection(db, RECIPES_COLLECTION),
      where("isPublic", "==", true),
      where("nameNormalized", ">=", normalizedText),
      where("nameNormalized", "<=", normalizedText + "\uf8ff"),
      limit(limit)
    );

    // Execute queries
    const [nameStartSnapshot, nameNormalizedSnapshot] = await Promise.all([
      getDocs(nameStartQuery),
      getDocs(nameNormalizedQuery),
    ]);

    // Combine results and remove duplicates
    const idSet = new Set<string>();
    const recipes: Recipe[] = [];

    for (const snapshot of [nameStartSnapshot, nameNormalizedSnapshot]) {
      snapshot.docs.forEach((doc) => {
        if (!idSet.has(doc.id)) {
          idSet.add(doc.id);
          recipes.push(convertFromFirestore(doc));
        }
      });
    }

    return recipes;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

/**
 * Get featured recipes
 */
export const getFeaturedRecipes = async (limit: number = 6): Promise<Recipe[]> => {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where("isPublic", "==", true),
      where("isFeatured", "==", true),
      orderBy("updatedAt", "desc"),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertFromFirestore(doc));
  } catch (error) {
    console.error("Error fetching featured recipes:", error);
    throw error;
  }
};

/**
 * Get new recipes
 */
export const getNewRecipes = async (limit: number = 6): Promise<Recipe[]> => {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where("isPublic", "==", true),
      where("isNew", "==", true),
      orderBy("updatedAt", "desc"),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertFromFirestore(doc));
  } catch (error) {
    console.error("Error fetching new recipes:", error);
    throw error;
  }
};

/**
 * Get recipes by category
 */
export const getRecipesByCategory = async (category: RecipeCategory, limit: number = 10): Promise<Recipe[]> => {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      where("isPublic", "==", true),
      where("category", "==", category),
      orderBy("updatedAt", "desc"),
      limit(limit)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertFromFirestore(doc));
  } catch (error) {
    console.error(`Error fetching recipes for category ${category}:`, error);
    throw error;
  }
};

/**
 * Admin functions - Create, Update, Delete
 */

/**
 * Create a new recipe
 */
export const createRecipe = async (
  recipeData: Omit<Recipe, "id" | "createdAt" | "updatedAt" | "slug">
): Promise<string> => {
  try {
    // Generate slug from name
    const slug = generateSlug(recipeData.name);

    // Add timestamps and slug
    const recipeWithMetadata = {
      ...recipeData,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Add normalized name for better search
      nameNormalized: recipeData.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    };

    // Create the recipe document
    const docRef = await addDoc(collection(db, RECIPES_COLLECTION), recipeWithMetadata);

    return docRef.id;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

/**
 * Update an existing recipe
 */
export const updateRecipe = async (
  recipeId: string,
  recipeData: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt" | "slug">>
): Promise<void> => {
  try {
    const updateData: any = {
      ...recipeData,
      updatedAt: serverTimestamp(),
    };

    // If the name is being updated, update the slug and normalized name too
    if (recipeData.name) {
      updateData.slug = generateSlug(recipeData.name);
      updateData.nameNormalized = recipeData.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    // Update the recipe document
    await updateDoc(doc(db, RECIPES_COLLECTION, recipeId), updateData);
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

/**
 * Delete a recipe
 */
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, RECIPES_COLLECTION, recipeId));
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
