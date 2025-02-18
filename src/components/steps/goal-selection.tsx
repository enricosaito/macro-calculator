"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const goals = [
  { value: "lose", label: "Lose Weight", description: "Reduce body fat while maintaining muscle" },
  { value: "maintain", label: "Maintain Weight", description: "Keep your current weight and body composition" },
  { value: "gain", label: "Gain Weight", description: "Build muscle and increase overall body mass" },
];

const GoalSelection = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What's Your Goal?</h2>
      <p className="mb-6">Choose the option that aligns with your fitness objectives:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all ${userData.goal === goal.value ? "border-primary" : ""}`}
              onClick={() => updateUserData({ goal: goal.value })}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{goal.label}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
