// src/services/mockRecipeService.ts
import { createRecipe } from "./recipeService";
// import { serverTimestamp } from "firebase/firestore";

// Function to add sample recipes to database
export const addSampleRecipe = async (userId: string) => {
  try {
    const sampleRecipe = {
      name: "Bowl de Frango com Batata Doce",
      description: "Um prato repleto de proteínas e carboidratos complexos, perfeito para o pós-treino.",
      createdBy: userId,
      category: "lunch" as const,
      cuisineType: "brasileira",
      tags: ["alto em proteína", "pós-treino", "saudável"],
      difficulty: "easy" as const,
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
        {
          id: "salt",
          name: "Sal",
          amount: 2,
          unit: "g",
        },
        {
          id: "pepper",
          name: "Pimenta",
          amount: 1,
          unit: "g",
        },
      ],
      steps: [
        {
          order: 1,
          instruction: "Pré-aqueça o forno a 200°C.",
        },
        {
          order: 2,
          instruction: "Corte a batata doce em cubos de 2cm e tempere com um pouco de azeite, sal e pimenta.",
          duration: 5,
        },
        {
          order: 3,
          instruction: "Disponha a batata doce em uma assadeira e asse por 15 minutos até que esteja macia.",
        },
        {
          order: 4,
          instruction: "Tempere o peito de frango com sal e pimenta dos dois lados.",
        },
        {
          order: 5,
          instruction:
            "Em uma frigideira, aqueça o restante do azeite e grelhe o frango por cerca de 6-7 minutos de cada lado, até que esteja bem cozido.",
          duration: 15,
        },
        {
          order: 6,
          instruction: "Enquanto isso, cozinhe o brócolis no vapor por 5 minutos, até que esteja al dente.",
          duration: 5,
        },
        {
          order: 7,
          instruction: "Monte o bowl com a batata doce na base, o frango fatiado por cima e o brócolis ao lado.",
        },
      ],
      tips: [
        "Você pode adicionar um molho de iogurte com ervas para dar mais sabor.",
        "Este prato pode ser preparado com antecedência e armazenado na geladeira por até 2 dias.",
      ],
      nutrition: {
        calories: 420,
        protein: 40,
        carbs: 35,
        fats: 12,
        fiber: 6,
        sugar: 5,
      },
      isPublic: true,
      isPremium: false,
      isFeatured: true,
      isNew: true,
    };

    // Create the recipe
    const recipeId = await createRecipe(sampleRecipe);
    console.log("Sample recipe created with ID:", recipeId);

    return recipeId;
  } catch (error) {
    console.error("Error creating sample recipe:", error);
    throw error;
  }
};
