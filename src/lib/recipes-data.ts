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
  isNew?: boolean; // flag for highlighting new recipes
  tags?: string[]; // for categorizing recipes
}

export const recipes: Recipe[] = [
  // Free Recipes (first 3)
  {
    id: "chicken-rice-bowl",
    name: "Bowl de Frango com Arroz",
    description: "Uma refeição simples e balanceada rica em proteínas e carboidratos complexos.",
    ingredients: [
      { ingredientId: "chicken-breast", amount: 150 },
      { ingredientId: "rice", amount: 100 },
      { ingredientId: "olive-oil", amount: 10 },
      { ingredientId: "broccoli", amount: 80 },
    ],
    instructions: [
      "Tempere o peito de frango com sal e pimenta a gosto.",
      "Aqueça o azeite em uma frigideira em fogo médio.",
      "Cozinhe o frango por 6-7 minutos de cada lado até dourar e cozinhar completamente.",
      "Cozinhe o arroz conforme instruções da embalagem.",
      "Cozinhe o brócolis no vapor por 5 minutos até ficar al dente.",
      "Monte o bowl com o arroz na base, frango fatiado e brócolis ao lado.",
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    difficulty: "easy",
    tags: ["alto em proteína", "pós-treino", "low-carb"],
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
    tags: ["café da manhã", "vegetariano"],
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
    tags: ["café da manhã", "vegetariano", "pré-treino"],
  },

  // Premium Recipes
  {
    id: "salmon-sweet-potato",
    name: "Salmão com Batata Doce",
    description: "Uma refeição rica em proteínas e ômega-3, perfeita para saúde do coração e músculos.",
    ingredients: [
      { ingredientId: "salmon", amount: 150 },
      { ingredientId: "sweet-potato", amount: 150 },
      { ingredientId: "olive-oil", amount: 15 },
      { ingredientId: "broccoli", amount: 100 },
    ],
    instructions: [
      "Pré-aqueça o forno a 200°C.",
      "Corte a batata doce em cubos, tempere com azeite, sal e pimenta.",
      "Asse a batata doce por 15 minutos.",
      "Tempere o filé de salmão e adicione à assadeira.",
      "Cozinhe o brócolis no vapor por 5 minutos.",
      "Asse por mais 12-15 minutos até que o salmão esteja cozido.",
      "Sirva o salmão sobre a batata doce com o brócolis ao lado.",
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 1,
    difficulty: "medium",
    tags: ["rico em ômega-3", "pós-treino", "low-carb"],
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
    tags: ["refeição principal", "alto em proteína"],
  },
  {
    id: "quinoa-bowl",
    name: "Bowl de Quinoa com Legumes",
    description: "Uma refeição vegetariana equilibrada e nutritiva.",
    ingredients: [
      { ingredientId: "quinoa", amount: 80 },
      { ingredientId: "avocado", amount: 50 },
      { ingredientId: "broccoli", amount: 100 },
      { ingredientId: "spinach", amount: 50 },
      { ingredientId: "olive-oil", amount: 10 },
    ],
    instructions: [
      "Cozinhe a quinoa conforme as instruções da embalagem.",
      "Cozinhe o brócolis no vapor por 5 minutos.",
      "Refogue o espinafre em uma frigideira com um pouco de azeite.",
      "Monte o bowl com a quinoa na base, vegetais ao lado e fatias de abacate por cima.",
      "Regue com azeite e tempere a gosto.",
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: "easy",
    isNew: true,
    tags: ["vegetariano", "vegano", "rico em fibras"],
  },
  {
    id: "protein-pancakes",
    name: "Panquecas Proteicas",
    description: "Deliciosas panquecas ricas em proteínas, perfeitas para o café da manhã.",
    ingredients: [
      { ingredientId: "oats", amount: 50 },
      { ingredientId: "eggs", amount: 100 },
      { ingredientId: "banana", amount: 100 },
      { ingredientId: "whey-protein", amount: 30 },
      { ingredientId: "coconut-oil", amount: 5 },
    ],
    instructions: [
      "No liquidificador, bata a aveia até virar farinha.",
      "Adicione os ovos, banana e whey protein. Bata até ficar homogêneo.",
      "Aqueça uma frigideira antiaderente com um pouco de óleo de coco.",
      "Despeje pequenas porções da massa e cozinhe até dourar dos dois lados.",
      "Sirva com frutas frescas ou mel se desejar.",
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "easy",
    isNew: true,
    tags: ["café da manhã", "alto em proteína", "pré-treino"],
  },
  {
    id: "turkey-stuffed-peppers",
    name: "Pimentões Recheados com Peru",
    description: "Pimentões coloridos recheados com peru moído e quinoa, uma refeição completa e nutritiva.",
    ingredients: [
      { ingredientId: "turkey", amount: 200 },
      { ingredientId: "quinoa", amount: 50 },
      { ingredientId: "spinach", amount: 100 },
      { ingredientId: "olive-oil", amount: 10 },
      { ingredientId: "cheese", amount: 30 },
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "Cozinhe a quinoa conforme as instruções da embalagem.",
      "Corte os pimentões ao meio e remova as sementes.",
      "Em uma frigideira, refogue o peru moído em azeite até dourar.",
      "Adicione o espinafre e cozinhe até murchar.",
      "Misture o peru com a quinoa cozida e tempere a gosto.",
      "Recheie os pimentões com a mistura e cubra com queijo ralado.",
      "Asse por 20-25 minutos até os pimentões estarem macios e o queijo dourado.",
    ],
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "medium",
    tags: ["low-carb", "rico em proteínas", "jantar saudável"],
  },
  {
    id: "berry-protein-smoothie",
    name: "Smoothie Proteico de Frutas Vermelhas",
    description: "Um smoothie refrescante e rico em proteínas, perfeito para pós-treino.",
    ingredients: [
      { ingredientId: "whey-protein", amount: 30 },
      { ingredientId: "yogurt", amount: 100 },
      { ingredientId: "blueberry", amount: 100 },
      { ingredientId: "strawberry", amount: 100 },
      { ingredientId: "banana", amount: 50 },
    ],
    instructions: [
      "Coloque todos os ingredientes no liquidificador.",
      "Adicione 100ml de água ou leite.",
      "Bata até ficar homogêneo.",
      "Sirva imediatamente.",
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: "easy",
    isNew: true,
    tags: ["bebida", "pós-treino", "alto em proteína"],
  },
  {
    id: "avocado-chicken-salad",
    name: "Salada de Frango com Abacate",
    description: "Uma salada saudável e satisfatória, rica em proteínas e gorduras boas.",
    ingredients: [
      { ingredientId: "chicken-breast", amount: 150 },
      { ingredientId: "avocado", amount: 100 },
      { ingredientId: "spinach", amount: 100 },
      { ingredientId: "nuts", amount: 20 },
      { ingredientId: "olive-oil", amount: 10 },
    ],
    instructions: [
      "Grelhe o peito de frango temperado com sal e pimenta.",
      "Lave e seque as folhas de espinafre.",
      "Corte o abacate em cubos.",
      "Pique as castanhas grosseiramente.",
      "Monte a salada com o espinafre na base, frango fatiado e abacate por cima.",
      "Finalize com as castanhas e regue com azeite.",
      "Tempere com sal e pimenta a gosto.",
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: "easy",
    tags: ["salada", "low-carb", "keto-friendly"],
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
