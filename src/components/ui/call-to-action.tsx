import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface CallToActionProps {
  variant?: "default" | "compact";
  className?: string;
}

const CallToAction = ({ variant = "default", className = "" }: CallToActionProps) => {
  return variant === "compact" ? (
    <div className={`p-4 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 ${className}`}>
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Resultados Melhores e Mais Rápidos
      </h3>
      <p className="mb-4 text-sm">
        Desbloqueie planos personalizados e suporte de especialistas para acelerar seu progresso.
      </p>
      <Button size="sm" className="gap-1">
        Conhecer Planos <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  ) : (
    <div
      className={`p-6 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent ${className}`}
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Zap className="h-6 w-6 text-primary" />
        Maximize Seus Resultados com Orientação Especializada
      </h3>
      <p className="mb-6">
        Nossa calculadora é apenas o começo. Para resultados verdadeiramente transformadores, conte com planos
        personalizados e suporte contínuo de especialistas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-zinc-800 p-4 rounded border border-border/50 shadow-sm"
        >
          <h4 className="font-medium mb-1">Plano Personalizado</h4>
          <p className="text-sm text-muted-foreground">
            Macros ajustados precisamente para seu corpo e objetivos específicos.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="bg-white dark:bg-zinc-800 p-4 rounded border border-border/50 shadow-sm"
        >
          <h4 className="font-medium mb-1">Planejamento de Refeições</h4>
          <p className="text-sm text-muted-foreground">
            Receitas deliciosas e práticas que se encaixam perfeitamente nos seus macros.
          </p>
        </motion.div>
      </div>

      <div className="text-center">
        <Button size="lg" className="px-8 gap-2">
          Conhecer Nossos Planos <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">A partir de R$97/mês • Garantia de satisfação de 14 dias</p>
      </div>
    </div>
  );
};

export default CallToAction;
