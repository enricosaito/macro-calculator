"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageTransition from "@/components/ui/page-transition";
import SettingsToggle from "@/components/ui/SettingsToggle";
import LandingPage from "@/components/macro-calculator/landing-page";
import BMRCalculation from "@/components/macro-calculator/bmr-calculation";
import ActivityLevel from "@/components/macro-calculator/activity-level";
import GoalSelection from "@/components/macro-calculator/goal-selection";
import ResultsPage from "@/components/macro-calculator/results-page";
import Dashboard from "@/components/macro-calculator/dashboard";
import EducationalContent from "@/components/macro-calculator/educational-content";
import useMacroCalculator from "@/hooks/useMacroCalculator";
import { useAuth } from "@/context/AuthContext";
import { useCalculations } from "@/hooks/useCalculations";

const MacroCalculator = () => {
  const { userData, currentStep, handleNext, handlePrevious, updateUserData, handleStartOver } = useMacroCalculator();
  const { currentUser } = useAuth();
  const { calculations, loading } = useCalculations();
  const [showCalculator, setShowCalculator] = useState(false);

  // Decide whether to show the dashboard or calculator on initial load
  useEffect(() => {
    if (!loading && currentUser && calculations && calculations.length > 0 && currentStep === 0) {
      setShowCalculator(false);
    } else {
      setShowCalculator(true);
    }
  }, [loading, currentUser, calculations, currentStep]);

  const steps = ["landing", "bmr", "activity", "goal", "results"];

  // Calculate progress percentage (excluding the first and last steps)
  const progress =
    currentStep === 0
      ? 0 // No progress on the landing page
      : (currentStep / (steps.length - 1)) * 100; // Exclude the results page

  // Calculate current step for display (excluding landing page)
  const displayStep = currentStep === 0 ? 0 : currentStep;
  const totalSteps = steps.length - 2; // Exclude landing and results pages

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

  const handleNewCalculation = () => {
    setShowCalculator(true);
    handleStartOver();
    handleNext(); // Skip the landing page
  };

  return (
    <PageTransition>
      <div className="py-8 px-4">
        <SettingsToggle />
        <Card className="w-full max-w-4xl mx-auto shadow-sm border border-border/50 min-h-[600px]">
          <CardContent className="p-6 flex flex-col h-full">
            {!showCalculator && currentUser && calculations && calculations.length > 0 ? (
              <Dashboard onNewCalculation={handleNewCalculation} />
            ) : (
              <div className="flex flex-col h-full">
                {/* Progress indicator */}
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">
                        Passo {displayStep} de {totalSteps}
                      </p>
                      <p className="text-sm font-medium text-primary">{Math.round(progress)}% completo</p>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Main content */}
                <div className="flex-grow flex items-center justify-center">
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
                </div>

                {/* Navigation buttons */}
                {currentStep > 0 && currentStep < steps.length - 1 && (
                  <div className="flex justify-between mt-6">
                    <Button onClick={handlePrevious} variant="outline" className="w-28">
                      Anterior
                    </Button>
                    <Button onClick={handleNext} className="w-28">
                      Próximo
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Educational content */}
        <div className="max-w-4xl mx-auto">
          <EducationalContent />
        </div>
      </div>
    </PageTransition>
  );
};

export default MacroCalculator;
