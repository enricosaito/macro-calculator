import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold">
              <span className="text-primary">Nutri</span>
              <span className="text-foreground">Macros</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Sua calculadora de macronutrientes personalizada</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos de Serviço
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>&copy; {currentYear} NutriMacros. Todos os direitos reservados.</p>
          <p className="mt-1">
            Criado por <span className="text-foreground">Enrico Saito</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
