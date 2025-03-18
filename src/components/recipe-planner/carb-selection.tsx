import { useMemo } from "react";
import { ingredients } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import IngredientsSelection from "./ingredients-selection";

const CarbSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  // Get carb ingredients
  const carbIngredients = useMemo(
    () =>
      ingredients.filter((ing) => ing.category === "carb").sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  return (
    <IngredientsSelection
      ingredients={carbIngredients}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
      stepNumber={2}
      title="Adicione carboidratos"
      description="Carboidratos dão energia e complementam seu prato:"
    />
  );
};

export default CarbSelection;
