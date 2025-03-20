// src/components/recipe-planner/protein-selection.tsx
import { useState } from "react";
import { proteinGroups } from "@/lib/ingredients-data";
import { RecipePlannerStepProps } from "./types";
import ProteinGroupSelection from "./protein-group-selection";

const ProteinSelection = ({ selectedIngredients, toggleIngredient }: RecipePlannerStepProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Toggle a protein group
  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]));
  };

  // Handle selecting multiple ingredients at once
  const handleSelectIngredients = (ingredientIds: string[]) => {
    // First, deselect any currently selected ingredients that are not in the new selection
    selectedIngredients
      .filter((id) => {
        // Find if this ingredient belongs to any protein group
        const belongsToProteinGroup = proteinGroups.some((group) => group.ingredients.some((ing) => ing.id === id));

        // Only filter protein ingredients and those not in the new selection
        return belongsToProteinGroup && !ingredientIds.includes(id);
      })
      .forEach((id) => toggleIngredient(id));

    // Then select any new ingredients that aren't already selected
    ingredientIds.filter((id) => !selectedIngredients.includes(id)).forEach((id) => toggleIngredient(id));
  };

  return (
    <ProteinGroupSelection
      proteinGroups={proteinGroups}
      selectedGroups={selectedGroups}
      toggleGroup={toggleGroup}
      onSelectIngredients={handleSelectIngredients}
    />
  );
};

export default ProteinSelection;
