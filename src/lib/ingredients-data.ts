// src/lib/ingredients-data.ts
export interface Ingredient {
  id: string;
  name: string;
  category: "protein" | "carb" | "fat";
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fats: number; // grams per 100g
  calories: number; // calories per 100g
  emoji: string; // emoji representing the ingredient
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
    emoji: "🍗",
  },
  {
    id: "beef",
    name: "Carne Bovina",
    category: "protein",
    protein: 26,
    carbs: 0,
    fats: 15,
    calories: 250,
    emoji: "🥩",
  },
  {
    id: "eggs",
    name: "Ovos",
    category: "protein",
    protein: 13,
    carbs: 1.1,
    fats: 11,
    calories: 155,
    emoji: "🥚",
  },
  {
    id: "tuna",
    name: "Atum",
    category: "protein",
    protein: 30,
    carbs: 0,
    fats: 1,
    calories: 130,
    emoji: "🐟",
  },
  {
    id: "salmon",
    name: "Salmão",
    category: "protein",
    protein: 20,
    carbs: 0,
    fats: 13,
    calories: 208,
    emoji: "🐠",
  },
  {
    id: "pork",
    name: "Carne Suína",
    category: "protein",
    protein: 27,
    carbs: 0,
    fats: 14,
    calories: 242,
    emoji: "🥓",
  },
  {
    id: "cheese",
    name: "Queijo",
    category: "protein",
    protein: 25,
    carbs: 1.3,
    fats: 33,
    calories: 402,
    emoji: "🧀",
  },
  {
    id: "yogurt",
    name: "Iogurte",
    category: "protein",
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    calories: 59,
    emoji: "🥛",
  },
  {
    id: "tofu",
    name: "Tofu",
    category: "protein",
    protein: 8,
    carbs: 2,
    fats: 4,
    calories: 76,
    emoji: "🧊",
  },
  {
    id: "beans",
    name: "Feijão",
    category: "protein",
    protein: 8.7,
    carbs: 19.9,
    fats: 0.5,
    calories: 127,
    emoji: "🫘",
  },
  {
    id: "lentils",
    name: "Lentilha",
    category: "protein",
    protein: 9,
    carbs: 20,
    fats: 0.4,
    calories: 116,
    emoji: "🫛",
  },
  {
    id: "chickpeas",
    name: "Grão de Bico",
    category: "protein",
    protein: 8.9,
    carbs: 27.4,
    fats: 2.6,
    calories: 164,
    emoji: "🌱",
  },
  {
    id: "turkey",
    name: "Peru",
    category: "protein",
    protein: 29,
    carbs: 0,
    fats: 7,
    calories: 189,
    emoji: "🦃",
  },
  {
    id: "cottage-cheese",
    name: "Queijo Cottage",
    category: "protein",
    protein: 11,
    carbs: 3.4,
    fats: 4.3,
    calories: 98,
    emoji: "🥫",
  },
  {
    id: "whey-protein",
    name: "Whey Protein",
    category: "protein",
    protein: 80,
    carbs: 10,
    fats: 3,
    calories: 400,
    emoji: "💪",
  },

  // Carbs
  {
    id: "rice",
    name: "Arroz",
    category: "carb",
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    calories: 130,
    emoji: "🍚",
  },
  {
    id: "pasta",
    name: "Macarrão",
    category: "carb",
    protein: 5.8,
    carbs: 30.9,
    fats: 0.9,
    calories: 158,
    emoji: "🍝",
  },
  {
    id: "potato",
    name: "Batata",
    category: "carb",
    protein: 2,
    carbs: 17,
    fats: 0.1,
    calories: 77,
    emoji: "🥔",
  },
  {
    id: "sweet-potato",
    name: "Batata Doce",
    category: "carb",
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    calories: 86,
    emoji: "🍠",
  },
  {
    id: "bread",
    name: "Pão",
    category: "carb",
    protein: 9,
    carbs: 49,
    fats: 3.2,
    calories: 265,
    emoji: "🍞",
  },
  {
    id: "oats",
    name: "Aveia",
    category: "carb",
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
    calories: 389,
    emoji: "🌾",
  },
  {
    id: "quinoa",
    name: "Quinoa",
    category: "carb",
    protein: 4.4,
    carbs: 21,
    fats: 1.9,
    calories: 120,
    emoji: "🌿",
  },
  {
    id: "corn",
    name: "Milho",
    category: "carb",
    protein: 3.2,
    carbs: 19,
    fats: 1.5,
    calories: 106,
    emoji: "🌽",
  },
  {
    id: "banana",
    name: "Banana",
    category: "carb",
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    calories: 89,
    emoji: "🍌",
  },
  {
    id: "apple",
    name: "Maçã",
    category: "carb",
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    calories: 52,
    emoji: "🍎",
  },
  {
    id: "broccoli",
    name: "Brócolis",
    category: "carb",
    protein: 2.8,
    carbs: 6.6,
    fats: 0.4,
    calories: 34,
    emoji: "🥦",
  },
  {
    id: "spinach",
    name: "Espinafre",
    category: "carb",
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    calories: 23,
    emoji: "🍃",
  },
  {
    id: "orange",
    name: "Laranja",
    category: "carb",
    protein: 0.9,
    carbs: 11.8,
    fats: 0.1,
    calories: 47,
    emoji: "🍊",
  },
  {
    id: "strawberry",
    name: "Morango",
    category: "carb",
    protein: 0.7,
    carbs: 7.7,
    fats: 0.3,
    calories: 32,
    emoji: "🍓",
  },
  {
    id: "blueberry",
    name: "Mirtilo",
    category: "carb",
    protein: 0.7,
    carbs: 14.5,
    fats: 0.3,
    calories: 57,
    emoji: "🫐",
  },
  {
    id: "brown-rice",
    name: "Arroz Integral",
    category: "carb",
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    calories: 112,
    emoji: "🍚",
  },
  {
    id: "yam",
    name: "Inhame",
    category: "carb",
    protein: 1.5,
    carbs: 27.9,
    fats: 0.1,
    calories: 118,
    emoji: "🍠",
  },

  // Fats
  {
    id: "olive-oil",
    name: "Azeite",
    category: "fat",
    protein: 0,
    carbs: 0,
    fats: 100,
    calories: 884,
    emoji: "🫒",
  },
  {
    id: "avocado",
    name: "Abacate",
    category: "fat",
    protein: 2,
    carbs: 8.5,
    fats: 15,
    calories: 160,
    emoji: "🥑",
  },
  {
    id: "nuts",
    name: "Castanhas",
    category: "fat",
    protein: 15,
    carbs: 13.8,
    fats: 60.8,
    calories: 607,
    emoji: "🌰",
  },
  {
    id: "butter",
    name: "Manteiga",
    category: "fat",
    protein: 0.9,
    carbs: 0.1,
    fats: 81.1,
    calories: 717,
    emoji: "🧈",
  },
  {
    id: "coconut-oil",
    name: "Óleo de Coco",
    category: "fat",
    protein: 0,
    carbs: 0,
    fats: 99,
    calories: 862,
    emoji: "🥥",
  },
  {
    id: "peanut-butter",
    name: "Pasta de Amendoim",
    category: "fat",
    protein: 25,
    carbs: 20,
    fats: 50,
    calories: 588,
    emoji: "🥜",
  },
  {
    id: "almonds",
    name: "Amêndoas",
    category: "fat",
    protein: 21,
    carbs: 22,
    fats: 49,
    calories: 575,
    emoji: "🥜",
  },
  {
    id: "walnuts",
    name: "Nozes",
    category: "fat",
    protein: 15,
    carbs: 14,
    fats: 65,
    calories: 654,
    emoji: "🌰",
  },
  {
    id: "flaxseed",
    name: "Linhaça",
    category: "fat",
    protein: 18,
    carbs: 29,
    fats: 42,
    calories: 534,
    emoji: "🌱",
  },
  {
    id: "chia-seeds",
    name: "Sementes de Chia",
    category: "fat",
    protein: 17,
    carbs: 42,
    fats: 31,
    calories: 486,
    emoji: "⚫",
  },
  {
    id: "dark-chocolate",
    name: "Chocolate Amargo",
    category: "fat",
    protein: 7.8,
    carbs: 45.9,
    fats: 43.1,
    calories: 598,
    emoji: "🍫",
  },
  {
    id: "coconut-milk",
    name: "Leite de Coco",
    category: "fat",
    protein: 2.3,
    carbs: 6.3,
    fats: 23.8,
    calories: 230,
    emoji: "🥥",
  },
];
