import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Recipe, RecipeCategory, CuisineType, RecipeDifficulty } from "@/types/recipe";
import { batchImportRecipes } from "@/utils/recipe/batchImport";
import { AlertCircle, Upload } from "lucide-react";
import { simplifiedRecipes } from "@/data/simplifiedRecipes";

// Define a more accurate type for the simplified recipe data
type SimplifiedRecipe = Omit<Recipe, "id" | "slug" | "createdBy" | "createdAt" | "updatedAt">;

// Update the function to use the correct type
const prepareRecipesForImport = (rawRecipes: SimplifiedRecipe[]) => {
  return rawRecipes.map((recipe) => ({
    ...recipe,
    // Type assertions for enum fields
    category: recipe.category as RecipeCategory,
    cuisineType: recipe.cuisineType as CuisineType,
    difficulty: recipe.difficulty as RecipeDifficulty,
    // Arrays remain as string arrays and will be cast as needed
    dietaryRestrictions: recipe.dietaryRestrictions || [],
    mealTypes: recipe.mealTypes || [],
    tags: recipe.tags || [],
  }));
};

const BatchRecipeImport = () => {
  const [jsonData, setJsonData] = useState("");
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    try {
      setIsLoading(true);
      setStatus({ message: "", type: "" });

      // Parse JSON data
      const recipes = JSON.parse(jsonData) as SimplifiedRecipe[];

      if (!Array.isArray(recipes)) {
        setStatus({
          message: "Formato inválido. O JSON deve ser um array de receitas.",
          type: "error",
        });
        return;
      }

      // Import recipes
      const preparedRecipes = prepareRecipesForImport(recipes);
      const result = await batchImportRecipes(preparedRecipes);

      if (result.status === "success") {
        setStatus({ message: result.message, type: "success" });
        setJsonData("");
      } else {
        setStatus({ message: result.message, type: "error" });
      }
    } catch (error) {
      setStatus({
        message: `Erro ao processar JSON: ${error instanceof Error ? error.message : String(error)}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update the simplified import function
  const handleImportSimplified = async () => {
    try {
      setIsLoading(true);
      setStatus({ message: "", type: "" });

      // Import simplified recipes with proper type casting
      const preparedRecipes = prepareRecipesForImport(simplifiedRecipes as unknown as SimplifiedRecipe[]);
      const result = await batchImportRecipes(preparedRecipes);

      setStatus({
        message: `Importadas ${result.count} receitas simplificadas.`,
        type: result.status === "error" ? "error" : "success",
      });
    } catch (error) {
      setStatus({
        message: `Erro ao importar receitas simplificadas: ${error instanceof Error ? error.message : String(error)}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonData(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Importação em Lote de Receitas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Carregue um arquivo JSON ou cole um array de receitas diretamente:
            </p>

            <div className="mb-4">
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Carregar Arquivo JSON
              </Button>
              <input id="file-upload" type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            </div>

            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='[{"name": "Nome da Receita", "description": "Descrição", ...}]'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {status.message && (
            <Alert variant={status.type === "success" ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleImport} disabled={!jsonData.trim() || isLoading} className="w-full">
            {isLoading ? "Importando..." : "Importar Receitas"}
          </Button>
          <Button onClick={handleImportSimplified} variant="outline" disabled={isLoading} className="w-full mt-2">
            Importar Receitas Simplificadas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchRecipeImport;
