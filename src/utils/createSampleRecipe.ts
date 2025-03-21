// src/utils/createSampleRecipe.ts
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const createSampleRecipe = async () => {
  try {
    const recipeId = "sample-recipe-1"; // Fixed ID for easy reference

    const sampleRecipe = {
      name: "Bowl de Frango com Batata Doce",
      description: "Um prato repleto de proteínas e carboidratos complexos, perfeito para o pós-treino.",
      createdBy: "system",
      createdAt: new Date(),
      updatedAt: new Date(),
      category: "lunch",
      cuisineType: "brasileira",
      tags: ["alto em proteína", "pós-treino", "saudável"],
      difficulty: "easy",
      prepTime: 15,
      cookTime: 20,
      servings: 1,
      ingredients: [
        {
          id: "chicken-breast",
          name: "Peito de Frango",
          amount: 150,
          unit: "g",
        },
        {
          id: "sweet-potato",
          name: "Batata Doce",
          amount: 150,
          unit: "g",
        },
        {
          id: "broccoli",
          name: "Brócolis",
          amount: 100,
          unit: "g",
        },
        {
          id: "olive-oil",
          name: "Azeite de Oliva",
          amount: 10,
          unit: "ml",
        },
      ],
      steps: [
        {
          order: 1,
          instruction: "Pré-aqueça o forno a 200°C.",
        },
        {
          order: 2,
          instruction: "Corte a batata doce em cubos e asse por 15 minutos.",
        },
        {
          order: 3,
          instruction: "Grelhe o frango e cozinhe o brócolis no vapor.",
        },
        {
          order: 4,
          instruction: "Monte o bowl com todos os ingredientes.",
        },
      ],
      nutrition: {
        calories: 420,
        protein: 40,
        carbs: 35,
        fats: 12,
      },
      isPublic: true,
      isPremium: false,
    };

    // Set the recipe with a specific ID
    await setDoc(doc(db, "recipes", recipeId), sampleRecipe);
    console.log("Sample recipe created with ID:", recipeId);
    return recipeId;
  } catch (error) {
    console.error("Error creating sample recipe:", error);
    throw error;
  }
};
