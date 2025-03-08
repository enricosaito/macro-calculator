import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const RecipePlanner = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Planejador de Receitas</h1>
      <p className="text-center text-muted-foreground mb-8">
        Selecione os ingredientes que você tem e nós sugeriremos receitas compatíveis com seus objetivos de macros.
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input type="text" placeholder="Buscar ingredientes adicionais..." className="pl-10" />
      </div>

      {/* Ingredient Categories */}
      <div className="space-y-8 mb-8">{/* Will add category sections here */}</div>

      {/* Generate Button */}
      <div className="flex justify-center mb-8">
        <Button size="lg" disabled={selectedIngredients.length === 0} className="px-8">
          Gerar Ideias de Receitas
        </Button>
      </div>

      {/* Recipe Results Section */}
      <div className="mt-8">{/* Recipe cards will go here */}</div>
    </div>
  );
};

export default RecipePlanner;
