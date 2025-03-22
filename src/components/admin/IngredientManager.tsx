// src/components/admin/IngredientManager.tsx
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, Search, RefreshCw } from "lucide-react";
import { Ingredient } from "@/utils/ingredients/seedIngredients";

const IngredientManager = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter ingredients by search term
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "ingredients"));
      const ingredientList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Ingredient));
      setIngredients(ingredientList);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este ingrediente?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "ingredients", id));
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      alert("Erro ao excluir o ingrediente");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciador de Ingredientes</h2>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Importar Básicos
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Novo Ingrediente
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando ingredientes...</p>
        </div>
      ) : filteredIngredients.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Categoria</th>
                <th className="text-left p-4">Calorias (100g)</th>
                <th className="text-left p-4">Macros</th>
                <th className="text-right p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((ingredient) => (
                <tr key={ingredient.id} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="p-4 font-medium">{ingredient.name}</td>
                  <td className="p-4">{ingredient.category}</td>
                  <td className="p-4">{ingredient.macrosPerServing.calories}</td>
                  <td className="p-4">
                    <div className="text-xs space-y-1">
                      <div>P: {ingredient.macrosPerServing.protein}g</div>
                      <div>C: {ingredient.macrosPerServing.carbs}g</div>
                      <div>G: {ingredient.macrosPerServing.fats}g</div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-2">Nenhum ingrediente encontrado.</p>
            <p className="text-sm text-muted-foreground">Adicione ingredientes ao banco de dados para começar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IngredientManager;
