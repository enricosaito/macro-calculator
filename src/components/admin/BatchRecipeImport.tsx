import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { batchImportRecipes } from "@/utils/recipe/batchImport";
import { AlertCircle, Upload } from "lucide-react";
import { simplifiedRecipes } from "@/data/simplifiedRecipes";

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
      const recipes = JSON.parse(jsonData);

      if (!Array.isArray(recipes)) {
        setStatus({
          message: "Formato inválido. O JSON deve ser um array de receitas.",
          type: "error",
        });
        return;
      }

      // Import recipes
      const result = await batchImportRecipes(recipes);

      if (result.status === "success") {
        setStatus({ message: result.message, type: "success" });
        setJsonData("");
      } else {
        setStatus({ message: result.message, type: "error" });
      }
    } catch (error) {
      setStatus({
        message: `Erro ao processar JSON: ${error}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function inside the component
  const handleImportSimplified = async () => {
    try {
      setIsLoading(true);
      setStatus({ message: "", type: "" });

      // Import simplified recipes
      const result = await batchImportRecipes(simplifiedRecipes);

      setStatus({
        message: `Importadas ${result.count} receitas simplificadas.`,
        type: result.status === "error" ? "error" : "success",
      });
    } catch (error) {
      setStatus({
        message: `Erro ao importar receitas simplificadas: ${error}`,
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
