"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ptBR, enUS } from "@/locales";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    if (validateInputs()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        {language === "pt-BR"
          ? "Vamos Calcular Seu Metabolismo Basal (BMR)"
          : "Let's Calculate Your Basal Metabolic Rate (BMR)"}
      </h2>
      <p className="text-center">
        {language === "pt-BR"
          ? "Sua Taxa de Metabolismo Basal (TMB ou BMR) é o número de calorias que você queima em repouso."
          : "Your Basal Metabolic Rate (BMR) is the number of calories you burn at rest."}
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="weight">{t.weightLabel}</Label>
          <Input
            id="weight"
            type="number"
            value={userData.weight}
            onChange={(e) => updateUserData({ weight: e.target.value })}
            placeholder={t.weightPlaceholder}
            min={30}
            max={300}
            required
          />
        </div>
        <div>
          <Label htmlFor="height">{t.heightLabel}</Label>
          <Input
            id="height"
            type="number"
            value={userData.height}
            onChange={(e) => updateUserData({ height: e.target.value })}
            placeholder={t.heightPlaceholder}
            min={100}
            max={250}
            required
          />
        </div>
        <div>
          <Label htmlFor="age">{t.ageLabel}</Label>
          <Input
            id="age"
            type="number"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            placeholder={t.agePlaceholder}
            min={18}
            max={120}
            required
          />
        </div>
        <div>
          <Label>{t.sexLabel}</Label>
          <RadioGroup
            value={userData.sex || undefined}
            onValueChange={(value: "male" | "female") => updateUserData({ sex: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{t.male}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{t.female}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc pl-4">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">
        {language === "pt-BR" ? "Próximo" : "Next"}
      </Button>
    </form>
  );
};

export default BMRCalculation;
