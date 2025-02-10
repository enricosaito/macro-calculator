"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Flame, Utensils } from "lucide-react";

const MacroCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "male",
    activityLevel: "1.2",
    goal: "maintain",
  });
  const [result, setResult] = useState(null);

  const activityMultipliers = {
    1.2: "Sedentary (little to no exercise)",
    1.375: "Light (1-3 days of exercise)",
    1.55: "Moderate (3-5 days of exercise)",
    1.725: "Active (6-7 days of exercise)",
    1.9: "Very Active (Athlete, intense exercise)",
  };

  const calculateMacros = () => {
    const { weight, height, age, sex, activityLevel, goal } = formData;
    if (!weight || !height || !age) return;

    const weightKg = Number.parseFloat(weight);
    const heightCm = Number.parseFloat(height);
    const ageYears = Number.parseInt(age);
    const activityFactor = Number.parseFloat(activityLevel);

    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityFactor;

    // Adjust calories based on goal
    let calorieIntake = tdee;
    if (goal === "cut") calorieIntake -= 500; // Deficit for fat loss
    if (goal === "bulk") calorieIntake += 500; // Surplus for muscle gain

    // Macronutrient breakdown (40% carbs, 30% protein, 30% fats)
    const protein = (calorieIntake * 0.3) / 4;
    const carbs = (calorieIntake * 0.4) / 4;
    const fats = (calorieIntake * 0.3) / 9;

    setResult({ tdee, calorieIntake, protein, carbs, fats });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Macro Calculator</CardTitle>
            <CardDescription>
              Calculate your daily macronutrient needs based on your goals and activity level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateMacros();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter your height"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex</Label>
                  <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                    <SelectTrigger id="sex">
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(activityMultipliers).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintain">Maintain</SelectItem>
                      <SelectItem value="cut">Cut (Fat Loss)</SelectItem>
                      <SelectItem value="bulk">Bulk (Muscle Gain)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Calculate Macros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {result && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold">Your Results:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">TDEE</CardTitle>
                      <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.tdee.toFixed(0)} kcal/day</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Calories</CardTitle>
                      <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.calorieIntake.toFixed(0)} kcal/day</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Protein</CardTitle>
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.protein.toFixed(0)}g</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Carbs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.carbs.toFixed(0)}g</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Fats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.fats.toFixed(0)}g</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MacroCalculator;
