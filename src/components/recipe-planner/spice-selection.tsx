// src/components/recipe-planner/spice-selection.tsx
import { useMemo } from "react";
import { RecipePlannerStepProps, SpiceIngredient } from "./types";
import IngredientsSelection from "./ingredients-selection";

const SpiceSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  // Define spice ingredients
  const spiceIngredients = useMemo<SpiceIngredient[]>(
    () => [
      { id: "salt", name: "Sal", category: "spice", emoji: "🧂", commonality: 99 },
      { id: "pepper", name: "Pimenta", category: "spice", emoji: "🌶️", commonality: 95 },
      { id: "garlic", name: "Alho", category: "spice", emoji: "🧄", commonality: 96 },
      { id: "onion", name: "Cebola", category: "spice", emoji: "🧅", commonality: 95 },
      { id: "herbs", name: "Ervas Frescas", category: "spice", emoji: "🌿", commonality: 75 },
      { id: "olive-oil", name: "Azeite", category: "spice", emoji: "🫒", commonality: 92 },
      { id: "lemon", name: "Limão", category: "spice", emoji: "🍋", commonality: 88 },
      { id: "tomato", name: "Tomate", category: "spice", emoji: "🍅", commonality: 92 },
      { id: "red-pepper", name: "Pimentão", category: "spice", emoji: "🫑", commonality: 85 },
      { id: "basil", name: "Manjericão", category: "spice", emoji: "🌱", commonality: 70 },
      { id: "oregano", name: "Orégano", category: "spice", emoji: "🌱", commonality: 85 },
      { id: "parsley", name: "Salsinha", category: "spice", emoji: "🌿", commonality: 80 },
      { id: "cilantro", name: "Coentro", category: "spice", emoji: "🌿", commonality: 75 },
      { id: "bay-leaf", name: "Folha de Louro", category: "spice", emoji: "🍃", commonality: 70 },
      { id: "cinnamon", name: "Canela", category: "spice", emoji: "🧂", commonality: 65 },
    ],
    []
  );

  return (
    <IngredientsSelection
      ingredients={spiceIngredients}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
      stepNumber={4}
      title="Finalize com temperos"
      description="Temperos e condimentos que transformam seu prato:"
    />
  );
};

export default SpiceSelection;
