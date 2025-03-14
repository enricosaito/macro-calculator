import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, TrendingDown, ArrowRight, TrendingUp } from "lucide-react";
import { UserData } from "@/types/calculations";

interface GoalSelectionProps {
  userData: UserData;
  updateUserData: (data: { goal: string }) => void;
}

const goals = [
  {
    value: "lose",
    label: "Perder Peso",
    description: "Reduzir gordura corporal enquanto mantenho músculos",
    icon: TrendingDown,
  },
  {
    value: "maintain",
    label: "Manter Peso",
    description: "Manter seu peso e composição corporal atual",
    icon: ArrowRight,
  },
  {
    value: "gain",
    label: "Ganhar Peso",
    description: "Ganhar músculos e aumentar a massa corporal",
    icon: TrendingUp,
  },
];

const GoalSelection: React.FC<GoalSelectionProps> = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Qual é o Seu Objetivo?</h2>
      <p className="mb-6 text-center text-muted-foreground">
        Escolha a opção que se alinha com seus objetivos de fitness:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          return (
            <motion.div
              key={goal.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all h-full hover:border-primary ${
                  userData.goal === goal.value
                    ? "border-2 border-primary bg-accent/50"
                    : "border border-border/50 hover:bg-accent/30"
                }`}
                onClick={() => updateUserData({ goal: goal.value })}
              >
                <CardContent className="p-4 flex flex-col items-center text-center h-full">
                  <div
                    className={`mt-4 mb-2 w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      userData.goal === goal.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{goal.label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{goal.description}</p>

                  {userData.goal === goal.value && (
                    <div className="mt-4 text-primary text-sm font-medium flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Selecionado
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalSelection;
