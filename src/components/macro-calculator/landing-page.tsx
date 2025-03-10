"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Descubra os seus Macros Ideais
      </motion.h1>
      <motion.p
        className="text-xl mb-8 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Pare de adivinhar—obtenha um plano nutricional personalizado que funciona para seus objetivos.{" "}
        <span className="font-semibold text-foreground">É mais fácil do que você imagina!</span>
      </motion.p>
      <motion.p
        className="text-lg mb-8 text-muted-foreground italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Não é preciso um PhD em nutrição. Basta responder algumas perguntas, e nós fazemos as contas para você!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Button onClick={onStart} size="lg" className="text-lg">
          Comece Sua Jornada
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
