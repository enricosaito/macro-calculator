export interface Ingredient {
  id: string;
  name: string;
  category: "protein" | "carb" | "fat";
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fats: number; // grams per 100g
  calories: number; // calories per 100g
}

export const ingredients: Ingredient[] = [
  // Proteins
  {
    id: "chicken-breast",
    name: "Peito de Frango",
    category: "protein",
    protein: 31,
    carbs: 0,
    fats: 3.6,
    calories: 165,
  },
  { id: "beef", name: "Carne Bovina", category: "protein", protein: 26, carbs: 0, fats: 15, calories: 250 },
  { id: "eggs", name: "Ovos", category: "protein", protein: 13, carbs: 1.1, fats: 11, calories: 155 },
  { id: "tuna", name: "Atum", category: "protein", protein: 30, carbs: 0, fats: 1, calories: 130 },
  { id: "salmon", name: "Salmão", category: "protein", protein: 20, carbs: 0, fats: 13, calories: 208 },
  { id: "pork", name: "Carne Suína", category: "protein", protein: 27, carbs: 0, fats: 14, calories: 242 },
  { id: "cheese", name: "Queijo", category: "protein", protein: 25, carbs: 1.3, fats: 33, calories: 402 },
  { id: "yogurt", name: "Iogurte", category: "protein", protein: 10, carbs: 3.6, fats: 0.4, calories: 59 },
  { id: "tofu", name: "Tofu", category: "protein", protein: 8, carbs: 2, fats: 4, calories: 76 },
  { id: "beans", name: "Feijão", category: "protein", protein: 8.7, carbs: 19.9, fats: 0.5, calories: 127 },

  // Carbs
  { id: "rice", name: "Arroz", category: "carb", protein: 2.7, carbs: 28, fats: 0.3, calories: 130 },
  { id: "pasta", name: "Macarrão", category: "carb", protein: 5.8, carbs: 30.9, fats: 0.9, calories: 158 },
  { id: "potato", name: "Batata", category: "carb", protein: 2, carbs: 17, fats: 0.1, calories: 77 },
  { id: "sweet-potato", name: "Batata Doce", category: "carb", protein: 1.6, carbs: 20, fats: 0.1, calories: 86 },
  { id: "bread", name: "Pão", category: "carb", protein: 9, carbs: 49, fats: 3.2, calories: 265 },
  { id: "oats", name: "Aveia", category: "carb", protein: 16.9, carbs: 66.3, fats: 6.9, calories: 389 },
  { id: "quinoa", name: "Quinoa", category: "carb", protein: 4.4, carbs: 21, fats: 1.9, calories: 120 },
  { id: "corn", name: "Milho", category: "carb", protein: 3.2, carbs: 19, fats: 1.5, calories: 106 },
  { id: "banana", name: "Banana", category: "carb", protein: 1.1, carbs: 22.8, fats: 0.3, calories: 89 },
  { id: "apple", name: "Maçã", category: "carb", protein: 0.3, carbs: 14, fats: 0.2, calories: 52 },

  // Fats
  { id: "olive-oil", name: "Azeite", category: "fat", protein: 0, carbs: 0, fats: 100, calories: 884 },
  { id: "avocado", name: "Abacate", category: "fat", protein: 2, carbs: 8.5, fats: 15, calories: 160 },
  { id: "nuts", name: "Castanhas", category: "fat", protein: 15, carbs: 13.8, fats: 60.8, calories: 607 },
  { id: "butter", name: "Manteiga", category: "fat", protein: 0.9, carbs: 0.1, fats: 81.1, calories: 717 },
  { id: "coconut-oil", name: "Óleo de Coco", category: "fat", protein: 0, carbs: 0, fats: 99, calories: 862 },
  { id: "peanut-butter", name: "Pasta de Amendoim", category: "fat", protein: 25, carbs: 20, fats: 50, calories: 588 },
];
