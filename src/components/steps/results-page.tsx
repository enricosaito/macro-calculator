"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Dumbbell, Croissant, Droplet } from "lucide-react";

interface ResultsPageProps {
  userData: {
    weight: string;
    height: string;
    age: string;
    sex: "male" | "female" | null;
    activityLevel: string;
    goal: string;
  };
  onStartOver: () => void;
}

const ResultsPage = ({ userData, onStartOver }: ResultsPageProps) => {
  // Calculate BMR
  const calculateBMR = () => {
    const { weight, height, age, sex } = userData;
    const w = Number.parseFloat(weight);
    const h = Number.parseFloat(height);
    const a = Number.parseFloat(age);

    if (sex === "male") {
      return 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * a - 161;
    }
  };

  // Calculate TDEE
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    return bmr * Number.parseFloat(userData.activityLevel);
  };

  // Calculate macros
  const calculateMacros = () => {
    let tdee = calculateTDEE();

    if (userData.goal === "lose") {
      tdee -= 500; // Calorie deficit for weight loss
    } else if (userData.goal === "gain") {
      tdee += 500; // Calorie surplus for weight gain
    }

    const protein = (tdee * 0.3) / 4; // 30% of calories from protein
    const fats = (tdee * 0.3) / 9; // 30% of calories from fats
    const carbs = (tdee * 0.4) / 4; // 40% of calories from carbs

    return { calories: tdee, protein, carbs, fats };
  };

  const macros = calculateMacros();

  const macroIcons = {
    calories: Flame,
    protein: Dumbbell,
    carbs: Croissant,
    fats: Droplet,
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">Your Personalized Macro Plan</h2>
      <p className="text-lg mb-8 text-center text-muted-foreground">
        Based on your information, here’s your recommended daily intake:
      </p>

      {/* Macro Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(macros).map(([key, value], index) => {
          const Icon = macroIcons[key as keyof typeof macroIcons];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {Math.round(value)}
                    {key === "calories" ? " kcal" : "g"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Message */}
      <motion.p
        className="mt-6 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Remember, these are general guidelines. Adjust your intake based on your progress and consult with a
        nutritionist for personalized advice.
      </motion.p>

      {/* Subtle CTA for Future Upsells */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-lg mb-4">
          Want to take your nutrition to the next level?{" "}
          <span className="font-semibold text-primary">Unlock personalized meal plans and expert coaching!</span>
        </p>
        <Button variant="outline" className="mr-4">
          Learn More
        </Button>
        <Button onClick={onStartOver}>Start Over</Button>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
