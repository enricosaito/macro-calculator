import { useMemo } from "react";
import { ingredients } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import IngredientsSelection from "./ingredients-selection";

const ProteinSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  // Get protein ingredients
  const proteinIngredients = useMemo(
    () =>
      ingredients
        .filter((ing) => ing.category === "protein")
        .sort((a, b) => (b.commonality || 0) - (a.commonality || 0)),
    []
  );

  return (
    <IngredientsSelection
      ingredients={proteinIngredients}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
      stepNumber={1}
      title="Selecione suas proteínas"
      description="Proteínas são a base da sua refeição. Selecione as que você tem disponíveis:"
    />
  );
};

export default ProteinSelection;
