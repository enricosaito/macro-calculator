"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Flame, Utensils } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [errors, setErrors] = useState({});

  const activityMultipliers = {
    1.2: "Sedentário (pouco ou nenhum exercício)",
    1.375: "Leve (1-3 dias de exercício)",
    1.55: "Moderado (3-5 dias de exercício)",
    1.725: "Ativo (6-7 dias de exercício)",
    1.9: "Muito Ativo (Atleta, exercício intenso)",
  };

  const validateForm = () => {
    const newErrors = {};
    if (Number(formData.age) < 10) newErrors.age = "A idade deve ser no mínimo 10 anos";
    if (Number(formData.age) > 100) newErrors.age = "A idade deve ser menor que 100 anos";
    if (Number(formData.height) < 60) newErrors.height = "A altura deve ser no mínimo 60 cm";
    if (Number(formData.height) > 300) newErrors.height = "A altura deve ser menor que 300 cm";
    if (Number(formData.weight) < 30) newErrors.weight = "O peso deve ser no mínimo 30 kg";
    if (Number(formData.weight) > 750) newErrors.weight = "O peso deve ser menor que 750 kg";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMacros = () => {
    if (!validateForm()) return;

    const { weight, height, age, sex, activityLevel, goal } = formData;
    if (!weight || !height || !age) return;

    const weightKg = Number.parseFloat(weight);
    const heightCm = Number.parseFloat(height);
    const ageYears = Number.parseInt(age);
    const activityFactor = Number.parseFloat(activityLevel);

    let bmr;
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    const tdee = bmr * activityFactor;

    let calorieIntake = tdee;
    if (goal === "cut") calorieIntake -= 500;
    if (goal === "bulk") calorieIntake += 500;

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
            <CardTitle>Calculadora de Macronutrientes</CardTitle>
            <CardDescription>
              Calcule suas necessidades diárias de macronutrientes com base em seus objetivos e nível de atividade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-sm text-muted-foreground">
              <p>
                Nossa calculadora de macronutrientes é uma ferramenta poderosa para ajudar você a atingir seus objetivos
                de saúde e fitness. Ela calcula suas necessidades calóricas diárias e divide-as em macronutrientes
                (proteínas, carboidratos e gorduras) com base no seu metabolismo, nível de atividade e objetivos.
              </p>
              <p className="mt-2">Use esta calculadora para:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Entender suas necessidades calóricas diárias</li>
                <li>Obter uma distribuição equilibrada de macronutrientes</li>
                <li>
                  Ajustar sua dieta de acordo com seus objetivos de perda de peso, manutenção ou ganho de massa muscular
                </li>
              </ul>
              <p className="mt-2">
                Preencha o formulário abaixo com suas informações para obter seu plano personalizado de macronutrientes.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateMacros();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Digite seu peso"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    min={30}
                    max={750}
                    required
                  />
                  {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Digite sua altura"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    min={60}
                    max={300}
                    required
                  />
                  {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Digite sua idade"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    min={10}
                    max={100}
                    required
                  />
                  {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Metabolismo</Label>
                  <RadioGroup
                    defaultValue={formData.sex}
                    onValueChange={(value) => setFormData({ ...formData, sex: value })}
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
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Nível de Atividade</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Selecione seu nível de atividade" />
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
                  <Label htmlFor="goal">Objetivo</Label>
                  <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Selecione seu objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintain">Manter</SelectItem>
                      <SelectItem value="cut">Perder Gordura</SelectItem>
                      <SelectItem value="bulk">Ganhar Massa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Calcular Macros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {result && (
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold">Seus Resultados:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">TDEE</CardTitle>
                      <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.tdee.toFixed(0)} kcal/dia</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Calorias</CardTitle>
                      <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.calorieIntake.toFixed(0)} kcal/dia</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Proteína</CardTitle>
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
                      <CardTitle className="text-sm font-medium">Carboidratos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{result.carbs.toFixed(0)}g</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Gorduras</CardTitle>
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
