"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const activityLevels = [
  { value: "1.2", label: "Sedentário(a)", description: "Pouco ou nenhum exercício" },
  { value: "1.375", label: "Levemente Ativo(a)", description: "Exercício leve 1-3 dias/semana" },
  { value: "1.55", label: "Moderately Ativo(a)", description: "Exercício moderado 3-5 dias/semana" },
  { value: "1.725", label: "Muito Ativo(a)", description: "Exercício intenso 6-7 dias/semana" },
  {
    value: "1.9",
    label: "Extra Ativo(a)",
    description: "Exercício muito intenso e trabalho físico ou treino 2x ao dia",
  },
];

const ActivityLevel = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Qual seu Nível de Atividade?</h2>
      <p className="mb-6">Selecione a opção que melhor descreve sua semana típica:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activityLevels.map((level, index) => (
          <motion.div
            key={level.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                userData.activityLevel === level.value ? "border-primary" : ""
              }`}
              onClick={() => updateUserData({ activityLevel: level.value })}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{level.label}</h3>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLevel;
