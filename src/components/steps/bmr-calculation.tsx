"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    const weight = Number.parseFloat(userData.weight);
    const height = Number.parseFloat(userData.height);
    const age = Number.parseInt(userData.age);

    if (isNaN(weight) || weight < 30 || weight > 300) {
      newErrors.weight = "Peso deve estar entre 30 e 300 kg";
    }
    if (isNaN(height) || height < 100 || height > 250) {
      newErrors.height = "Altura deve estar entre 100 e 250 cm";
    }
    if (isNaN(age) || age < 18 || age > 120) {
      newErrors.age = "Idade deve estar entre 18 e 120 anos";
    }
    if (userData.sex === null) {
      newErrors.sex = "Por favor escolha o seu sexo";
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
      <h2 className="text-2xl font-bold text-center">Vamos Calcular Seu Metabolismo Basal (BMR)</h2>
      <p className="text-center">
        Sua Taxa de Metabolismo Basal (TMB ou BMR) é o número de calorias que você queima em repouso.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={userData.weight}
            onChange={(e) => updateUserData({ weight: e.target.value })}
            placeholder="Enter your weight"
            min={30}
            max={300}
            required
          />
        </div>
        <div>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            value={userData.height}
            onChange={(e) => updateUserData({ height: e.target.value })}
            placeholder="Enter your height"
            min={100}
            max={250}
            required
          />
        </div>
        <div>
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            type="number"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            placeholder="Enter your age"
            min={18}
            max={120}
            required
          />
        </div>
        <div>
          <Label>Sexo</Label>
          <RadioGroup
            value={userData.sex || undefined}
            onValueChange={(value: "male" | "female") => updateUserData({ sex: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Homem</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Mulher</Label>
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
        Next
      </Button>
    </form>
  );
};

export default BMRCalculation;
