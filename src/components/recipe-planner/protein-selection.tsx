import { proteinGroups } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import ProteinGroupSelection from "./protein-group-selection";

const ProteinSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  return (
    <ProteinGroupSelection
      proteinGroups={proteinGroups.filter((group) => group.id !== "supplements")} // Exclude supplements
      selectedIngredients={selectedIngredients}
      toggleIngredient={toggleIngredient}
    />
  );
};

export default ProteinSelection;
