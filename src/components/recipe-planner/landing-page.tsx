import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LandingPageProps } from "./types";

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12 max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Descubra receitas com os <span className="text-primary">ingredientes que você tem</span>
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          Sem precisar ir ao supermercado—encontre receitas deliciosas usando o que já está na sua cozinha.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Como funciona:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              1
            </div>
            <h3 className="font-medium mb-2">Selecione ingredientes</h3>
            <p className="text-sm text-muted-foreground">Informe o que você tem disponível em sua cozinha.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              2
            </div>
            <h3 className="font-medium mb-2">Descubra receitas</h3>
            <p className="text-sm text-muted-foreground">Nosso sistema encontrará as melhores combinações.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              3
            </div>
            <h3 className="font-medium mb-2">Cozinhe e desfrute</h3>
            <p className="text-sm text-muted-foreground">Receitas detalhadas com macros e informações nutricionais.</p>
          </div>
        </div>
      </div>

      <Button onClick={onStart} size="lg" className="text-lg px-8 py-6">
        Começar
      </Button>
    </motion.div>
  );
};

export default LandingPage;
