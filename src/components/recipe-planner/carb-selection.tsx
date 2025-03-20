import { carbGroups } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import CarbGroupSelection from "./carb-group-selection";

const CarbSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  return (
    <CarbGroupSelection
      carbGroups={carbGroups}
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
    />
  );
};

export default CarbSelection;
