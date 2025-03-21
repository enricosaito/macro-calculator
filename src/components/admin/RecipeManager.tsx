// src/components/admin/RecipeManager.tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRecipes, deleteRecipe, RecipeFilterParams } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { seedDatabase } from "@/utils/recipe/seedDatabase";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Search, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const RecipeManager = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchRecipes();
  });

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const filters: RecipeFilterParams = {};

      if (filterCategory) {
        filters.category = filterCategory;
      }

      const result = await getRecipes(filters);
      setRecipes(result.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm("Tem certeza que deseja inicializar o banco de dados com receitas de exemplo?")) {
      return;
    }

    try {
      setLoading(true);
      const result = await seedDatabase();
      alert(`${result.message}`);
      await fetchRecipes();
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Erro ao inicializar o banco de dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      await deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Erro ao excluir a receita");
    }
  };

  // Filter recipes by search term
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Acesso Restrito</h2>
          <p className="mb-4">Você precisa estar logado para acessar esta área.</p>
          <Link to="/login">
            <Button>Fazer Login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciador de Receitas</h2>

        <div className="flex gap-2">
          <Button onClick={handleSeedDatabase} variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Inicializar DB
          </Button>
          <Link to="/admin/recipes/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Nova Receita
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar receitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={filterCategory}
          onValueChange={(value) => {
            setFilterCategory(value);
            // Trigger re-fetch when changing filter
            setTimeout(fetchRecipes, 0);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas</SelectItem>
            <SelectItem value="breakfast">Café da Manhã</SelectItem>
            <SelectItem value="lunch">Almoço</SelectItem>
            <SelectItem value="dinner">Jantar</SelectItem>
            <SelectItem value="snack">Lanche</SelectItem>
            <SelectItem value="dessert">Sobremesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando receitas...</p>
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Categoria</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{recipe.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{recipe.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {recipe.category === "breakfast"
                      ? "Café da Manhã"
                      : recipe.category === "lunch"
                      ? "Almoço"
                      : recipe.category === "dinner"
                      ? "Jantar"
                      : recipe.category === "snack"
                      ? "Lanche"
                      : recipe.category === "dessert"
                      ? "Sobremesa"
                      : recipe.category}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {recipe.isPublic && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          Público
                        </span>
                      )}
                      {recipe.isPremium && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                          Premium
                        </span>
                      )}
                      {recipe.isFeatured && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                          Destaque
                        </span>
                      )}
                      {recipe.isNew && (
                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full">
                          Novo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/recipes/edit/${recipe.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecipe(recipe.id)}
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
            <p className="text-muted-foreground">Nenhuma receita encontrada.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipeManager;
