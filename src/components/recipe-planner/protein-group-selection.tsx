import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ProteinGroup } from "@/lib/ingredients-data";
import { useState } from "react";

interface ProteinGroupSelectionProps {
  proteinGroups: ProteinGroup[];
  selectedGroups: string[];
  toggleGroup: (id: string) => void;
  onSelectIngredients: (ingredientIds: string[]) => void;
}

const ProteinGroupSelection = ({
  proteinGroups,
  selectedGroups,
  toggleGroup,
  onSelectIngredients,
}: ProteinGroupSelectionProps) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const handleExpandGroup = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);

      // Auto-select all ingredients from this group
      const group = proteinGroups.find((g) => g.id === groupId);
      if (group) {
        onSelectIngredients(group.ingredients.map((ing) => ing.id));
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Selecione suas proteínas</h2>
      <p className="mb-6 text-center text-muted-foreground">
        Escolha o tipo de proteína que você quer usar na sua refeição:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {proteinGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all h-full hover:border-primary ${
                selectedGroups.includes(group.id)
                  ? "border-2 border-primary bg-accent/50"
                  : "border border-border/50 hover:bg-accent/30"
              }`}
              onClick={() => {
                toggleGroup(group.id);
                handleExpandGroup(group.id);
              }}
            >
              <CardContent className="p-4 flex flex-col items-center text-center h-full">
                <div
                  className={`mt-4 mb-2 w-16 h-16 rounded-full flex items-center justify-center text-3xl
                  ${
                    selectedGroups.includes(group.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-muted-foreground"
                  }`}
                >
                  {group.emoji}
                </div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{group.description}</p>

                {selectedGroups.includes(group.id) && (
                  <div className="mt-4 text-primary text-sm font-medium flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Selecionado
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {expandedGroup && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-lg font-medium mb-3">Ingredientes incluídos:</h3>
          <div className="flex flex-wrap gap-2">
            {proteinGroups
              .find((group) => group.id === expandedGroup)
              ?.ingredients.map((ingredient) => (
                <span key={ingredient.id} className="bg-accent px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">{ingredient.emoji}</span>
                  {ingredient.name}
                </span>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProteinGroupSelection;
