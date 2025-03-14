// src/components/macro-calculator/activity-level.tsx (update)

// Make sure the component is properly typed
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ActivityLevelProps {
  userData: {
    activityLevel: string;
    [key: string]: string | null;
  };
  updateUserData: (data: { activityLevel: string }) => void;
}

const activityLevels = [
  { value: "1.2", label: "Sedentário(a)", description: "Pouco ou nenhum exercício" },
  { value: "1.375", label: "Levemente Ativo(a)", description: "Exercício leve 1-3 dias/semana" },
  { value: "1.55", label: "Moderadamente Ativo(a)", description: "Exercício moderado 3-5 dias/semana" },
  { value: "1.725", label: "Muito Ativo(a)", description: "Exercício intenso 6-7 dias/semana" },
  {
    value: "1.9",
    label: "Extra Ativo(a)",
    description: "Exercício muito intenso e trabalho físico ou treino 2x ao dia",
  },
];

const ActivityLevel: React.FC<ActivityLevelProps> = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Qual seu Nível de Atividade?</h2>
      <p className="mb-6 text-center text-muted-foreground">Selecione a opção que melhor descreve sua semana típica:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activityLevels.map((level, index) => (
          <motion.div
            key={level.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                userData.activityLevel === level.value
                  ? "border-2 border-primary bg-accent/50"
                  : "border border-border/50 hover:bg-accent/30"
              }`}
              onClick={() => updateUserData({ activityLevel: level.value })}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                  ${
                    userData.activityLevel === level.value
                      ? "bg-primary text-primary-foreground"
                      : "border border-muted-foreground"
                  }`}
                >
                  {userData.activityLevel === level.value && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <h3 className="font-semibold">{level.label}</h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLevel;
