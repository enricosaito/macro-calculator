import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AdditionalGroup } from "@/lib/ingredients-data";

interface AdditionalIngredientsSelectionProps {
  additionalGroups: AdditionalGroup[];
  selectedIngredients: string[];
  toggleIngredient: (id: string) => void;
}

const AdditionalIngredientsSelection = ({
  additionalGroups,
  selectedIngredients,
  toggleIngredient,
}: AdditionalIngredientsSelectionProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Toggle group expansion
  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]));
  };

  // Get all selected ingredients from all groups
  const allSelectedIngredients = additionalGroups
    .flatMap((group) => group.ingredients)
    .filter((ing) => selectedIngredients.includes(ing.id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Ingredientes Adicionais</h2>
      <p className="mb-6 text-center text-muted-foreground">
        Finalize sua receita com estes ingredientes complementares:
      </p>

      <div className="space-y-4">
        {additionalGroups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-border/50 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/20"
              onClick={() => toggleGroupExpansion(group.id)}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{group.emoji}</div>
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Show count of selected ingredients from this group */}
                {group.ingredients.filter((ing) => selectedIngredients.includes(ing.id)).length > 0 && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {group.ingredients.filter((ing) => selectedIngredients.includes(ing.id)).length} selecionado(s)
                  </span>
                )}
                {expandedGroups.includes(group.id) ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {expandedGroups.includes(group.id) && (
              <div className="p-4 pt-0 border-t border-border/30 bg-accent/10">
                <div className="flex flex-wrap gap-2 mt-3">
                  {group.ingredients.map((ingredient) => (
                    <motion.div
                      key={ingredient.id}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-2 rounded-full text-sm flex items-center cursor-pointer transition-all ${
                        selectedIngredients.includes(ingredient.id)
                          ? "bg-primary/20 border border-primary/30"
                          : "bg-background border border-border/50 hover:border-primary/30"
                      }`}
                      onClick={() => toggleIngredient(ingredient.id)}
                    >
                      <span className="mr-2">{ingredient.emoji}</span>
                      {ingredient.name}
                      {selectedIngredients.includes(ingredient.id) && (
                        <Check className="h-3.5 w-3.5 ml-2 text-primary" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {allSelectedIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-accent/20 p-4 rounded-lg border border-border/30"
        >
          <h3 className="text-lg font-medium mb-3">Adicionais selecionados:</h3>
          <div className="flex flex-wrap gap-2">
            {allSelectedIngredients.map((ingredient) => (
              <motion.span
                key={ingredient.id}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-background border border-border/50 px-3 py-1 rounded-full text-sm flex items-center shadow-sm"
              >
                <span className="mr-2">{ingredient.emoji}</span>
                {ingredient.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleIngredient(ingredient.id);
                  }}
                  className="ml-2 hover:bg-accent rounded-full p-1 -mr-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdditionalIngredientsSelection;
