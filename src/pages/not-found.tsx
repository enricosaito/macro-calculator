import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import PageTransition from "@/components/ui/page-transition";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Oops! Parece que você encontrou uma página que não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <Button className="flex items-center gap-2" onClick={() => navigate("/")}>
            <Home className="h-4 w-4" />
            Ir para a Página Inicial
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
