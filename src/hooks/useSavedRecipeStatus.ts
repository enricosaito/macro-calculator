import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveRecipe, unsaveRecipe, isRecipeSaved } from "@/services/savedRecipeService";

export const useSavedRecipeStatus = (recipeId: string) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!currentUser || !recipeId) {
        setIsSaved(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const saved = await isRecipeSaved(currentUser.uid, recipeId);
        setIsSaved(saved);
      } catch (error) {
        console.error("Error checking saved status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSavedStatus();
  }, [currentUser, recipeId]);

  const toggleSaved = async () => {
    if (!currentUser) return false;

    try {
      if (isSaved) {
        await unsaveRecipe(currentUser.uid, recipeId);
        setIsSaved(false);
      } else {
        await saveRecipe(currentUser.uid, recipeId);
        setIsSaved(true);
      }
      return true;
    } catch (error) {
      console.error("Error toggling saved status:", error);
      return false;
    }
  };

  return { isSaved, loading, toggleSaved };
};
