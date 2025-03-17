"use client";

// src/components/macro-calculator/bmr-calculation.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ptBR, enUS } from "@/locales";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Weight, Ruler, CalendarClock, User } from "lucide-react";

interface BMRCalculationProps {
  userData: {
    weight: string;
    height: string;
    age: string;
    sex: "male" | "female" | null;
  };
  updateUserData: (data: Partial<{ weight: string; height: string; age: string; sex: "male" | "female" }>) => void;
  onNext: () => void;
}

const BMRCalculation: React.FC<BMRCalculationProps> = ({ userData, updateUserData, onNext }) => {
  const { language } = useLanguage();
  const t = language === "pt-BR" ? ptBR : enUS; // Get the correct translations

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const weight = Number.parseFloat(userData.weight);
    const height = Number.parseFloat(userData.height);
    const age = Number.parseInt(userData.age);

    if (isNaN(weight) || weight < 30 || weight > 300) {
      newErrors.weight =
        language === "pt-BR" ? "O peso deve estar entre 30 e 300 kg" : "Weight must be between 30 and 300 kg";
    }
    if (isNaN(height) || height < 100 || height > 250) {
      newErrors.height =
        language === "pt-BR" ? "A altura deve estar entre 100 e 250 cm" : "Height must be between 100 and 250 cm";
    }
    if (isNaN(age) || age < 18 || age > 120) {
      newErrors.age =
        language === "pt-BR" ? "A idade deve estar entre 18 e 120 anos" : "Age must be between 18 and 120 years";
    }
    if (userData.sex === null) {
      newErrors.sex = language === "pt-BR" ? "Por favor, selecione seu sexo" : "Please select your sex";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched on submit
    setTouched({
      weight: true,
      height: true,
      age: true,
      sex: true,
    });

    if (validateInputs()) {
      onNext();
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateInputs();
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <motion.div variants={item} className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {language === "pt-BR" ? "Vamos Calcular Seu Metabolismo Basal" : "Let's Calculate Your Basal Metabolic Rate"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {language === "pt-BR"
            ? "Sua Taxa de Metabolismo Basal (TMB) é o número de calorias que seu corpo queima em repouso."
            : "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at rest."}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight Field */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-primary" /> {/* Changed from Scale to Weight */}
              {t.weightLabel}
            </Label>
            <Input
              id="weight"
              type="number"
              value={userData.weight}
              onChange={(e) => updateUserData({ weight: e.target.value })}
              onBlur={() => handleBlur("weight")}
              placeholder={t.weightPlaceholder}
              min={30}
              max={300}
              required
              className={`${touched.weight && errors.weight ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {touched.weight && errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
          </div>

          {/* Height Field */}
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-primary" />
              {t.heightLabel}
            </Label>
            <Input
              id="height"
              type="number"
              value={userData.height}
              onChange={(e) => updateUserData({ height: e.target.value })}
              onBlur={() => handleBlur("height")}
              placeholder={t.heightPlaceholder}
              min={100}
              max={250}
              required
              className={`${touched.height && errors.height ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {touched.height && errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              {t.ageLabel}
            </Label>
            <Input
              id="age"
              type="number"
              value={userData.age}
              onChange={(e) => updateUserData({ age: e.target.value })}
              onBlur={() => handleBlur("age")}
              placeholder={t.agePlaceholder}
              min={18}
              max={120}
              required
              className={`${touched.age && errors.age ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            {touched.age && errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>

          {/* Sex Field */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> {/* Changed from Male to User */}
              {t.sexLabel}
            </Label>
            <div className="pt-2">
              <RadioGroup
                value={userData.sex || undefined}
                onValueChange={(value: "male" | "female") => {
                  updateUserData({ sex: value });
                  setTouched((prev) => ({ ...prev, sex: true }));
                }}
                className="flex gap-4"
              >
                <div
                  className={`flex-1 border rounded-md p-3 transition-all ${
                    userData.sex === "male" ? "bg-primary/10 border-primary" : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                      {t.male}
                    </Label>
                  </div>
                </div>
                <div
                  className={`flex-1 border rounded-md p-3 transition-all ${
                    userData.sex === "female" ? "bg-primary/10 border-primary" : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                      {t.female}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              {touched.sex && errors.sex && <p className="text-sm text-red-500 mt-1">{errors.sex}</p>}
            </div>
          </div>
        </motion.div>

        {Object.keys(errors).length > 0 && Object.values(touched).some((t) => t) && (
          <motion.div variants={item}>
            <Alert variant="destructive">
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {Object.entries(errors).map(([key, error]) => (touched[key] ? <li key={key}>{error}</li> : null))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div variants={item} className="pt-4">
          <Button type="submit" className="w-full py-6 text-lg">
            {language === "pt-BR" ? "Próximo" : "Next"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default BMRCalculation;
