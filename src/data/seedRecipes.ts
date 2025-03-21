import type { Recipe } from "@/types/recipe";
import { generateSlug } from "@/utils/recipe/recipeUtils";

/**
 * Seed recipes for the application
 * These are high-quality recipes with proper structure that will be used
 * to populate the database initially.
 */
export const seedRecipes: Omit<Recipe, "id" | "createdAt" | "updatedAt">[] = [
  // Recipe 1: Chicken Bowl
  {
    name: "Bowl de Frango com Batata Doce",
    slug: generateSlug("Bowl de Frango com Batata Doce"),
    description:
      "Um prato completo e balanceado, rico em proteínas e carboidratos complexos, perfeito para o pós-treino.",
    createdBy: "system",
    category: "lunch",
    cuisineType: "brasileira",
    dietaryRestrictions: [], // Contains meat, no specific restrictions
    mealTypes: ["pos-treino", "almoco", "jantar"],
    tags: ["alto em proteína", "pós-treino", "saudável", "simples"],
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
  },

  // Recipe 2: Quinoa Salad
  {
    name: "Salada de Quinoa com Legumes",
    slug: generateSlug("Salada de Quinoa com Legumes"),
    description:
      "Uma salada nutritiva e refrescante, rica em proteínas vegetais e fibras, perfeita para refeições leves.",
    createdBy: "system",
    category: "lunch",
    cuisineType: "outras",
    dietaryRestrictions: ["vegetariano", "vegano", "sem-gluten"],
    mealTypes: ["almoco", "jantar", "lanche"],
    tags: ["vegetariano", "vegano", "sem glúten", "salada", "leve", "rico em fibras"],
    difficulty: "easy",
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    ingredients: [
      {
        id: "quinoa",
        name: "Quinoa",
        amount: 100,
        unit: "g",
      },
      {
        id: "cucumber",
        name: "Pepino",
        amount: 100,
        unit: "g",
      },
      {
        id: "tomato",
        name: "Tomate",
        amount: 150,
        unit: "g",
      },
      {
        id: "red-onion",
        name: "Cebola Roxa",
        amount: 50,
        unit: "g",
      },
      {
        id: "lemon",
        name: "Limão",
        amount: 1,
        unit: "unidade",
      },
      {
        id: "olive-oil",
        name: "Azeite de Oliva",
        amount: 15,
        unit: "ml",
      },
      {
        id: "mint",
        name: "Hortelã",
        amount: 10,
        unit: "g",
      },
      {
        id: "salt",
        name: "Sal",
        amount: 2,
        unit: "g",
      },
    ],
    steps: [
      {
        order: 1,
        instruction: "Lave bem a quinoa em água corrente, utilizando uma peneira fina.",
      },
      {
        order: 2,
        instruction:
          "Cozinhe a quinoa em 200ml de água com um pouco de sal, por cerca de 15 minutos ou até que a água seja absorvida e a quinoa esteja macia.",
        duration: 15,
      },
      {
        order: 3,
        instruction: "Enquanto a quinoa cozinha, corte o pepino, o tomate e a cebola roxa em cubos pequenos.",
      },
      {
        order: 4,
        instruction: "Pique as folhas de hortelã.",
      },
      {
        order: 5,
        instruction: "Após cozida, deixe a quinoa esfriar por 10 minutos.",
        duration: 10,
      },
      {
        order: 6,
        instruction: "Em uma tigela grande, misture a quinoa, os legumes e a hortelã.",
      },
      {
        order: 7,
        instruction: "Tempere com o suco do limão, azeite e sal a gosto.",
      },
      {
        order: 8,
        instruction: "Sirva a salada fria ou em temperatura ambiente.",
      },
    ],
    tips: [
      "A salada fica ainda mais saborosa se preparada com antecedência, permitindo que os sabores se incorporem.",
      "Experimente adicionar outras verduras e legumes da sua preferência.",
      "Para aumentar o teor proteico, adicione grão-de-bico ou tofu.",
      "Conserve na geladeira por até 3 dias em recipiente hermeticamente fechado.",
    ],
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 45,
      fats: 13,
      fiber: 8,
      sugar: 3,
    },
    isPublic: true,
    isPremium: false,
    isFeatured: true,
    isNew: true,
  },

  // Recipe 3: Protein Pancakes
  {
    name: "Panquecas Proteicas",
    slug: generateSlug("Panquecas Proteicas"),
    description: "Panquecas ricas em proteínas, perfeitas para um café da manhã nutritivo que combina sabor e saúde.",
    createdBy: "system",
    category: "breakfast",
    cuisineType: "americana",
    dietaryRestrictions: ["sem-gluten"],
    mealTypes: ["cafe-da-manha", "lanche", "pre-treino"],
    tags: ["café da manhã", "alto em proteína", "pré-treino", "sem glúten", "doce"],
    difficulty: "easy",
    prepTime: 10,
    cookTime: 10,
    servings: 1,
    ingredients: [
      {
        id: "banana",
        name: "Banana Madura",
        amount: 1,
        unit: "unidade",
      },
      {
        id: "eggs",
        name: "Ovos",
        amount: 2,
        unit: "unidades",
      },
      {
        id: "oats",
        name: "Aveia em Flocos",
        amount: 40,
        unit: "g",
      },
      {
        id: "whey-protein",
        name: "Whey Protein (sabor baunilha)",
        amount: 30,
        unit: "g",
      },
      {
        id: "cinnamon",
        name: "Canela em Pó",
        amount: 2,
        unit: "g",
      },
      {
        id: "coconut-oil",
        name: "Óleo de Coco",
        amount: 5,
        unit: "ml",
      },
    ],
    steps: [
      {
        order: 1,
        instruction: "No liquidificador, adicione a banana, os ovos, a aveia, o whey protein e a canela.",
      },
      {
        order: 2,
        instruction: "Bata todos os ingredientes até obter uma massa homogênea.",
        duration: 2,
      },
      {
        order: 3,
        instruction: "Aqueça uma frigideira antiaderente em fogo médio e adicione um pouco de óleo de coco.",
      },
      {
        order: 4,
        instruction: "Despeje cerca de 2 colheres de sopa da massa para cada panqueca.",
      },
      {
        order: 5,
        instruction: "Cozinhe por aproximadamente 2 minutos ou até que formem bolhas na superfície.",
        duration: 2,
      },
      {
        order: 6,
        instruction: "Vire com cuidado e cozinhe por mais 1-2 minutos do outro lado.",
        duration: 2,
      },
      {
        order: 7,
        instruction: "Sirva quente, com frutas frescas ou uma colher de pasta de amendoim por cima, se desejar.",
      },
    ],
    tips: [
      "Adicione uma colher de pasta de amendoim à massa para um sabor extra e mais proteínas.",
      "Frutas vermelhas, mel ou iogurte grego são ótimos acompanhamentos.",
      "Para uma versão sem lactose, substitua o whey protein por proteína vegetal.",
    ],
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 40,
      fats: 10,
      fiber: 5,
      sugar: 15,
    },
    isPublic: true,
    isPremium: false,
    isFeatured: false,
    isNew: true,
  },

  // Recipe 4: Salmon with Asparagus
  {
    name: "Salmão Grelhado com Aspargos",
    slug: generateSlug("Salmão Grelhado com Aspargos"),
    description:
      "Um prato sofisticado e nutritivo, rico em ômega-3 e proteínas de alta qualidade. Perfeito para uma refeição especial e saudável.",
    createdBy: "system",
    category: "dinner",
    cuisineType: "outras",
    dietaryRestrictions: ["sem-gluten", "sem-lactose"],
    mealTypes: ["jantar", "almoco"],
    tags: ["rico em ômega-3", "low-carb", "premium", "sofisticado", "jantar"],
    difficulty: "medium",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    ingredients: [
      {
        id: "salmon",
        name: "Filé de Salmão",
        amount: 300,
        unit: "g",
      },
      {
        id: "asparagus",
        name: "Aspargos",
        amount: 200,
        unit: "g",
      },
      {
        id: "lemon",
        name: "Limão",
        amount: 1,
        unit: "unidade",
      },
      {
        id: "olive-oil",
        name: "Azeite de Oliva Extra Virgem",
        amount: 20,
        unit: "ml",
      },
      {
        id: "garlic",
        name: "Alho",
        amount: 2,
        unit: "dentes",
      },
      {
        id: "salt",
        name: "Sal Marinho",
        amount: 3,
        unit: "g",
      },
      {
        id: "black-pepper",
        name: "Pimenta-do-Reino",
        amount: 2,
        unit: "g",
      },
      {
        id: "dill",
        name: "Endro Fresco",
        amount: 5,
        unit: "g",
        optional: true,
      },
    ],
    steps: [
      {
        order: 1,
        instruction: "Pré-aqueça o forno a 180°C.",
      },
      {
        order: 2,
        instruction:
          "Tempere o filé de salmão com sal, pimenta e suco de metade do limão. Deixe marinar por 10 minutos.",
        duration: 10,
      },
      {
        order: 3,
        instruction: "Lave os aspargos e corte a parte branca e dura da base. Seque-os bem.",
      },
      {
        order: 4,
        instruction:
          "Em uma tigela, misture o azeite, o alho picado e o suco da outra metade do limão. Tempere com sal e pimenta.",
      },
      {
        order: 5,
        instruction:
          "Coloque os aspargos em uma assadeira, regue com metade da mistura de azeite e alho, e mexa para cobrir uniformemente.",
      },
      {
        order: 6,
        instruction:
          "Em uma frigideira pesada, aqueça um pouco de azeite em fogo médio-alto. Coloque o salmão com a pele para baixo e sele por 3-4 minutos até que a pele esteja crocante.",
        duration: 4,
      },
      {
        order: 7,
        instruction: "Transfira o salmão para a assadeira junto com os aspargos, com a pele para cima.",
      },
      {
        order: 8,
        instruction: "Regue o salmão com o restante da mistura de azeite e alho.",
      },
      {
        order: 9,
        instruction: "Leve ao forno por 10-12 minutos, até que o salmão esteja cozido e os aspargos estejam macios.",
        duration: 12,
      },
      {
        order: 10,
        instruction: "Se estiver usando endro, polvilhe sobre o prato antes de servir.",
      },
    ],
    tips: [
      "O salmão está pronto quando a carne se desfaz facilmente com um garfo, mas ainda mantém umidade.",
      "Você pode substituir os aspargos por brócolis ou vagem francesa.",
      "Para um toque extra de sabor, adicione um pouco de raspas de limão ao servir.",
    ],
    nutrition: {
      calories: 480,
      protein: 42,
      carbs: 10,
      fats: 30,
      fiber: 4,
      sugar: 2,
    },
    isPublic: true,
    isPremium: true,
    isFeatured: true,
    isNew: false,
  },

  // Add more seed recipes here as needed
];
