import { db } from "@/lib/firebase";
import { collection, writeBatch, doc } from "firebase/firestore";

export interface Ingredient {
  id: string;
  name: string;
  category: "protein" | "carb" | "fat" | "vegetable" | "fruit" | "dairy" | "spice" | "other";
  macrosPerServing: {
    servingSize: number; // in grams
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
    sugar?: number;
  };
  commonMeasurements: {
    type: string; // e.g., "colher de sopa"
    gramsEquivalent: number;
  }[];
  alternatives?: string[]; // IDs of alternative ingredients
}

export const seedIngredients = async (ingredients: Ingredient[]) => {
  try {
    const batch = writeBatch(db);
    let count = 0;

    for (const ingredient of ingredients) {
      const ingredientRef = doc(collection(db, "ingredients"), ingredient.id);
      batch.set(ingredientRef, ingredient);
      count++;
    }

    await batch.commit();
    return {
      status: "success",
      message: `${count} ingredientes adicionados com sucesso.`,
      count,
    };
  } catch (error) {
    console.error("Erro ao adicionar ingredientes:", error);
    return {
      status: "error",
      message: `Erro: ${error}`,
      count: 0,
    };
  }
};
