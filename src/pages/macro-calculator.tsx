import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageTransition from "@/components/ui/page-transition";
import LandingPage from "@/components/macro-calculator/landing-page";
import BMRCalculation from "@/components/macro-calculator/bmr-calculation";
import ActivityLevel from "@/components/macro-calculator/activity-level";
import GoalSelection from "@/components/macro-calculator/goal-selection";
import ResultsPage from "@/components/macro-calculator/results-page";
import EducationalContent from "@/components/macro-calculator/educational-content";
import useMacroCalculator from "@/hooks/useMacroCalculator";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MacroCalculator = () => {
  const {
    userData,
    currentStep,
    calculationResults,
    isLoading,
    handleNext,
    handlePrevious,
    updateUserData,
    handleStartOver,
    saveResultsToFirestore,
  } = useMacroCalculator();

  const [stepErrors, setStepErrors] = useState<{ [key: number]: boolean }>({});

  // Save results to Firestore when we load the results page
  useEffect(() => {
    if (currentStep === 4 && calculationResults) {
      saveResultsToFirestore();
    }
  }, [currentStep, calculationResults, saveResultsToFirestore]);

  // Function to validate BMR step
  const validateBMRStep = () => {
    const { weight, height, age, sex } = userData;

    const weightNum = Number.parseFloat(weight);
    const heightNum = Number.parseFloat(height);
    const ageNum = Number.parseInt(age);

    if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
      return false;
    }
    if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      return false;
    }
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      return false;
    }
    if (sex === null) {
      return false;
    }

    return true;
  };

  // Function to validate specific step
  const validateStep = (step: number) => {
    switch (step) {
      case 1: // BMR step
        return validateBMRStep();
      case 2: // Activity level
        return userData.activityLevel !== "";
      case 3: // Goal selection
        return userData.goal !== "";
      default:
        return true;
    }
  };

  // Handle next with validation
  const handleNextWithValidation = () => {
    const isValid = validateStep(currentStep);
    setStepErrors({ ...stepErrors, [currentStep]: !isValid });

    if (isValid) {
      handleNext();
    }
  };

  const steps = ["landing", "bmr", "activity", "goal", "results"];

  // Calculate progress percentage (excluding the first and last steps)
  const progress =
    currentStep === 0
      ? 0 // No progress on the landing page
      : currentStep === 1
      ? 33
      : currentStep === 2
      ? 66
      : currentStep === 3
      ? 99
      : 100;

  // Calculate current step for display (excluding landing page)
  const displayStep = currentStep === 0 ? 0 : currentStep;
  const totalSteps = steps.length - 2; // Exclude landing and results pages

  // Show loading state while checking for existing calculations
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "landing":
        return <LandingPage onStart={handleNext} />;
      case "bmr":
        return (
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                1
              </div>
            </div>
            <BMRCalculation
              userData={userData}
              updateUserData={updateUserData}
              onNext={() => {}} // Removed individual step next functionality
              showErrors={stepErrors[1]}
            />
          </div>
        );
      case "activity":
        return (
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                2
              </div>
            </div>
            <ActivityLevel userData={userData} updateUserData={updateUserData} />
          </div>
        );
      case "goal":
        return (
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold">
                3
              </div>
            </div>
            <GoalSelection userData={userData} updateUserData={updateUserData} />
          </div>
        );
      case "results":
        return (
          <ResultsPage userData={userData} onStartOver={handleStartOver} calculationResults={calculationResults} />
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto shadow-sm border border-border/50 min-h-[600px]">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex flex-col h-full">
              {/* Progress indicator */}
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">
                      Passo {displayStep} de {totalSteps}
                    </p>
                    <p className="text-sm font-medium text-primary">{progress}% completo</p>
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
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    size="lg"
                    className="min-w-32 py-6 text-lg flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNextWithValidation}
                    size="lg"
                    className="min-w-32 py-6 text-lg flex items-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
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
