"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BMRCalculationProps {
  userData: {
    weight: string;
    height: string;
    age: string;
    sex: "male" | "female";
  };
  updateUserData: (data: Partial<{ weight: string; height: string; age: string; sex: "male" | "female" }>) => void;
}

const BMRCalculation: React.FC<BMRCalculationProps> = ({ userData, updateUserData }) => {
  const [errors, setErrors] = useState({
    weight: "",
    height: "",
    age: "",
  });

  useEffect(() => {
    validateInputs();
  }, [userData]); // Updated dependency array

  const validateInputs = () => {
    const newErrors = {
      weight: "",
      height: "",
      age: "",
    };

    if (Number.parseFloat(userData.weight) < 30) {
      newErrors.weight = "Weight must be at least 30 kg";
    }
    if (Number.parseFloat(userData.height) < 100) {
      newErrors.height = "Height must be at least 100 cm";
    }
    if (Number.parseInt(userData.age) < 18) {
      newErrors.age = "Age must be at least 18 years";
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Let's Calculate Your BMR</h2>
      <p className="text-center">Your Basal Metabolic Rate (BMR) is the number of calories you burn at rest.</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={userData.weight}
            onChange={(e) => updateUserData({ weight: e.target.value })}
            placeholder="Enter your weight"
            min={30}
            required
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={userData.height}
            onChange={(e) => updateUserData({ height: e.target.value })}
            placeholder="Enter your height"
            min={100}
            required
          />
          {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            placeholder="Enter your age"
            min={18}
            required
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
        <div>
          <Label>Sex</Label>
          <RadioGroup
            value={userData.sex}
            onValueChange={(value: "male" | "female") => updateUserData({ sex: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculation;
