import { useState } from "react";
import type { MacroCalculation } from "@/types/calculations";

export const useCalculations = () => {
  const [calculations, setCalculations] = useState<MacroCalculation[]>([]);
  const [loading, setLoading] = useState(false);

  // These functions are now stubs that do nothing
  const fetchCalculations = async () => {
    // Just return empty array
    setCalculations([]);
    setLoading(false);
  };

  const saveCalculation = async () => {
    // Do nothing
    console.log("Calculation saving is disabled");
  };

  const deleteCalculation = async () => {
    // Do nothing
    console.log("Calculation deletion is disabled");
  };

  return {
    calculations,
    loading,
    saveCalculation,
    deleteCalculation,
    refreshCalculations: fetchCalculations,
  };
};
