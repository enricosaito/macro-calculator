// src/components/macro-calculator/landing-page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="text-center py-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Descubra seus <span className="text-primary">Macros Ideais</span>
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          Pare de adivinhar—obtenha um plano nutricional personalizado que funciona para
          <span className="text-foreground font-medium"> os seus objetivos.</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-card border border-border/50 rounded-xl p-6 mb-10 shadow-sm"
      >
        <h2 className="text-xl font-medium mb-4">É mais fácil do que você imagina!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              1
            </div>
            <h3 className="font-medium mb-2">Insira seus dados</h3>
            <p className="text-sm text-muted-foreground">Altura, peso, idade e nível de atividade física.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              2
            </div>
            <h3 className="font-medium mb-2">Defina seu objetivo</h3>
            <p className="text-sm text-muted-foreground">Perder peso, ganhar massa ou manter seu peso atual.</p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold">
              3
            </div>
            <h3 className="font-medium mb-2">Receba seu plano</h3>
            <p className="text-sm text-muted-foreground">Calorias e macronutrientes personalizados para você.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button onClick={onStart} size="lg" className="text-lg px-8 py-6">
          Comece Sua Jornada
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Não é preciso um PhD em nutrição. Nós fazemos todos os cálculos para você!
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
