import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RecipeManager from "@/components/admin/RecipeManager";
import PageTransition from "@/components/ui/page-transition";

const AdminRecipesPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <RecipeManager />
      </div>
    </PageTransition>
  );
};

export default AdminRecipesPage;
