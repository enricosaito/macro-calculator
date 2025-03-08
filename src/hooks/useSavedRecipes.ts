import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export const useSavedRecipes = () => {
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Fetch saved recipes
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!currentUser) {
        setSavedRecipeIds([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const q = query(collection(db, "savedRecipes"), where("userId", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        const recipeIds = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data.recipeId;
        });

        setSavedRecipeIds(recipeIds);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [currentUser]);

  // Save recipe
  const saveRecipe = async (recipeId: string) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, "savedRecipes"), {
        userId: currentUser.uid,
        recipeId,
        savedAt: new Date(),
      });

      setSavedRecipeIds((prev) => [...prev, recipeId]);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  // Unsave recipe
  const unsaveRecipe = async (recipeId: string) => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "savedRecipes"),
        where("userId", "==", currentUser.uid),
        where("recipeId", "==", recipeId)
      );

      const querySnapshot = await getDocs(q);
      const docToDelete = querySnapshot.docs[0];

      if (docToDelete) {
        await deleteDoc(doc(db, "savedRecipes", docToDelete.id));
      }

      setSavedRecipeIds((prev) => prev.filter((id) => id !== recipeId));
    } catch (error) {
      console.error("Error unsaving recipe:", error);
    }
  };

  // Toggle saved status
  const toggleSavedRecipe = async (recipeId: string) => {
    if (savedRecipeIds.includes(recipeId)) {
      await unsaveRecipe(recipeId);
    } else {
      await saveRecipe(recipeId);
    }
  };

  return {
    savedRecipeIds,
    loading,
    toggleSavedRecipe,
    isSaved: (recipeId: string) => savedRecipeIds.includes(recipeId),
  };
};
