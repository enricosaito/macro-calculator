import { Ingredient } from "./ingredients-data";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    ingredientId: string;
    amount: number; // in grams
  }[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string; // placeholder for now
}

export const recipes: Recipe[] = [
  {
    id: "chicken-rice-bowl",
    name: "Bowl de Frango com Arroz",
    description: "Uma refeição simples e balanceada rica em proteínas e carboidratos complexos.",
    ingredients: [
      { ingredientId: "chicken-breast", amount: 150 },
      { ingredientId: "rice", amount: 100 },
      { ingredientId: "olive-oil", amount: 10 },
    ],
    instructions: [
      "Tempere o peito de frango com sal e pimenta a gosto.",
      "Aqueça o azeite em uma frigideira em fogo médio.",
      "Cozinhe o frango por 6-7 minutos de cada lado até dourar e cozinhar completamente.",
      "Cozinhe o arroz conforme instruções da embalagem.",
      "Sirva o frango fatiado sobre o arroz.",
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    difficulty: "easy",
  },
  {
    id: "salmon-sweet-potato",
    name: "Salmão com Batata Doce",
    description: "Uma refeição rica em proteínas e ômega-3, perfeita para saúde do coração e músculos.",
    ingredients: [
      { ingredientId: "salmon", amount: 150 },
      { ingredientId: "sweet-potato", amount: 150 },
      { ingredientId: "olive-oil", amount: 15 },
    ],
    instructions: [
      "Pré-aqueça o forno a 200°C.",
      "Corte a batata doce em cubos, tempere com azeite, sal e pimenta.",
      "Asse a batata doce por 15 minutos.",
      "Tempere o filé de salmão e adicione à assadeira.",
      "Asse por mais 12-15 minutos até que o salmão esteja cozido.",
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 1,
    difficulty: "medium",
  },
  {
    id: "avocado-toast-eggs",
    name: "Torrada de Abacate com Ovos",
    description: "Um café da manhã saudável rico em gorduras boas e proteínas.",
    ingredients: [
      { ingredientId: "bread", amount: 60 },
      { ingredientId: "avocado", amount: 100 },
      { ingredientId: "eggs", amount: 100 },
    ],
    instructions: [
      "Toste o pão.",
      "Amasse o abacate com um garfo e tempere com sal e pimenta.",
      "Espalhe o abacate no pão torrado.",
      "Frite os ovos do jeito que preferir.",
      "Coloque os ovos por cima do abacate.",
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    difficulty: "easy",
  },
  {
    id: "beef-potato-stir-fry",
    name: "Refogado de Carne com Batata",
    description: "Uma refeição rápida e saborosa, rica em proteínas e carboidratos.",
    ingredients: [
      { ingredientId: "beef", amount: 150 },
      { ingredientId: "potato", amount: 200 },
      { ingredientId: "olive-oil", amount: 15 },
    ],
    instructions: [
      "Corte a carne e a batata em cubos pequenos.",
      "Aqueça o azeite em uma frigideira grande.",
      "Refogue a batata por 10 minutos até quase macia.",
      "Adicione a carne e cozinhe até dourar.",
      "Tempere com sal, pimenta e ervas a gosto.",
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "medium",
  },
  {
    id: "oatmeal-banana-nuts",
    name: "Mingau de Aveia com Banana e Castanhas",
    description: "Um café da manhã nutritivo rico em fibras, carboidratos complexos e gorduras saudáveis.",
    ingredients: [
      { ingredientId: "oats", amount: 50 },
      { ingredientId: "banana", amount: 100 },
      { ingredientId: "nuts", amount: 30 },
    ],
    instructions: [
      "Cozinhe a aveia com água ou leite conforme instruções da embalagem.",
      "Fatie a banana.",
      "Pique as castanhas grosseiramente.",
      "Sirva a aveia em uma tigela e adicione a banana e as castanhas por cima.",
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    difficulty: "easy",
  },
];

// Function to calculate macros for a recipe
export const calculateRecipeMacros = (recipe: Recipe, ingredientsData: Ingredient[]) => {
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalCalories = 0;

  recipe.ingredients.forEach((item) => {
    const ingredient = ingredientsData.find((ing) => ing.id === item.ingredientId);
    if (ingredient) {
      // Convert from per 100g to actual amount
      const ratio = item.amount / 100;
      totalProtein += ingredient.protein * ratio;
      totalCarbs += ingredient.carbs * ratio;
      totalFats += ingredient.fats * ratio;
      totalCalories += ingredient.calories * ratio;
    }
  });

  return {
    protein: Math.round(totalProtein),
    carbs: Math.round(totalCarbs),
    fats: Math.round(totalFats),
    calories: Math.round(totalCalories),
  };
};
