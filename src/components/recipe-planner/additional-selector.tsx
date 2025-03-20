import { additionalGroups } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import AdditionalIngredientsSelection from "./additional-ingredients-selection";

const AdditionalSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  return (
    <AdditionalIngredientsSelection
      additionalGroups={additionalGroups}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
    />
  );
};

export default AdditionalSelection;
