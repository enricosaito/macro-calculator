import { useMemo } from "react";
import { ingredients } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import IngredientsSelection from "./ingredients-selection";

const FatSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  // Get fat ingredients
  const fatIngredients = useMemo(
    () =>
      ingredients.filter((ing) => ing.category === "fat").sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  return (
    <IngredientsSelection
      ingredients={fatIngredients}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
      stepNumber={3}
      title="Escolha suas gorduras"
      description="Gorduras saudáveis adicionam sabor e são essenciais para seu corpo:"
    />
  );
};

export default FatSelection;
