import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ingredients } from "@/lib/ingredients-data";
import IngredientCategory from "@/components/recipe-planner/ingredient-category";

const RecipePlanner = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter ingredients by category
  const proteinIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "protein"), []);

  const carbIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "carb"), []);

  const fatIngredients = useMemo(() => ingredients.filter((ing) => ing.category === "fat"), []);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Planejador de Receitas</h1>
      <p className="text-center text-muted-foreground mb-8">
        Selecione os ingredientes que você tem e nós sugeriremos receitas compatíveis com seus objetivos de macros.
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar ingredientes adicionais..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Ingredient Categories */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-8">
            <IngredientCategory
              title="Proteínas"
              ingredients={proteinIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />

            <IngredientCategory
              title="Carboidratos"
              ingredients={carbIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />

            <IngredientCategory
              title="Gorduras"
              ingredients={fatIngredients}
              selectedIngredients={selectedIngredients}
              onToggleIngredient={toggleIngredient}
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Ingredients Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ingredientes Selecionados ({selectedIngredients.length})</h3>
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((id) => {
            const ingredient = ingredients.find((ing) => ing.id === id);
            return (
              <Button
                key={id}
                variant="default"
                size="sm"
                className="h-auto py-1 px-3"
                onClick={() => toggleIngredient(id)}
              >
                {ingredient?.name} ✕
              </Button>
            );
          })}
          {selectedIngredients.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum ingrediente selecionado</p>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center mb-8">
        <Button size="lg" disabled={selectedIngredients.length === 0} className="px-8">
          Gerar Ideias de Receitas
        </Button>
      </div>

      {/* Recipe Results Section - will add in next steps */}
      <div className="mt-8">{/* Recipe cards will go here */}</div>
    </div>
  );
};

export default RecipePlanner;
