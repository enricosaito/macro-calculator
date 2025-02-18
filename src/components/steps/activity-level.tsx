"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const activityLevels = [
  { value: "1.2", label: "Sedentary", description: "Little to no exercise" },
  { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
  { value: "1.9", label: "Extra Active", description: "Very hard exercise & physical job or 2x training" },
];

const ActivityLevel = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What's Your Activity Level?</h2>
      <p className="mb-6">Select the option that best describes your typical week:</p>
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
