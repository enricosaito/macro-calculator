import { useState } from "react";

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
    "1.2": "Sedentary (little to no exercise)",
    "1.375": "Light (1-3 days of exercise)",
    "1.55": "Moderate (3-5 days of exercise)",
    "1.725": "Active (6-7 days of exercise)",
    "1.9": "Very Active (Athlete, intense exercise)",
  };

  const calculateMacros = () => {
    const { weight, height, age, sex, activityLevel, goal } = formData;
    if (!weight || !height || !age) return;

    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseInt(age);
    const activityFactor = parseFloat(activityLevel);

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
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Macro Calculator</h2>
      <div className="grid gap-2">
        <input type="number" placeholder="Weight (kg)" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="p-2 border rounded" />
        <input type="number" placeholder="Height (cm)" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="p-2 border rounded" />
        <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="p-2 border rounded" />
        <select value={formData.sex} onChange={(e) => setFormData({ ...formData, sex: e.target.value })} className="p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select value={formData.activityLevel} onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })} className="p-2 border rounded">
          {Object.entries(activityMultipliers).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} className="p-2 border rounded">
          <option value="maintain">Maintain</option>
          <option value="cut">Cut (Fat Loss)</option>
          <option value="bulk">Bulk (Muscle Gain)</option>
        </select>
        <button onClick={calculateMacros} className="bg-blue-500 text-white p-2 rounded">Calculate</button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Results:</h3>
          <p><strong>TDEE:</strong> {result.tdee.toFixed(0)} kcal/day</p>
          <p><strong>Calories:</strong> {result.calorieIntake.toFixed(0)} kcal/day</p>
          <p><strong>Protein:</strong> {result.protein.toFixed(0)}g</p>
          <p><strong>Carbs:</strong> {result.carbs.toFixed(0)}g</p>
          <p><strong>Fats:</strong> {result.fats.toFixed(0)}g</p>
        </div>
      )}
    </div>
  );
};

export default MacroCalculator;
