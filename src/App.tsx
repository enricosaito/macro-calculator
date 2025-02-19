"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import LandingPage from "@/components/steps/landing-page";
import BMRCalculation from "@/components/steps/bmr-calculation";
import ActivityLevel from "@/components/steps/activity-level";
import GoalSelection from "@/components/steps/goal-selection";
import ResultsPage from "@/components/steps/results-page";
import useMacroCalculator from "@/hooks/useMacroCalculator";

const App = () => {
  const { userData, currentStep, handleNext, handlePrevious, updateUserData, handleStartOver } = useMacroCalculator();

  const steps = ["landing", "bmr", "activity", "goal", "results"];

  // Calculate progress percentage (excluding the first and last steps)
  const progress =
    currentStep === 0
      ? 0 // No progress on the landing page
      : (currentStep / (steps.length - 1)) * 100; // Exclude the results page

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "landing":
        return <LandingPage onStart={handleNext} />;
      case "bmr":
        return <BMRCalculation userData={userData} updateUserData={updateUserData} onNext={handleNext} />;
      case "activity":
        return <ActivityLevel userData={userData} updateUserData={updateUserData} />;
      case "goal":
        return <GoalSelection userData={userData} updateUserData={updateUserData} />;
      case "results":
        return <ResultsPage userData={userData} onStartOver={handleStartOver} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          {/* Show the Progress component only after the landing page and before the results page */}
          {currentStep > 0 && currentStep < steps.length - 1 && <Progress value={progress} className="mb-6 h-2" />}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-6">
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
