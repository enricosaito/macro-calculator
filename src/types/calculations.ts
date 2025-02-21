export interface MacroCalculation {
  id?: string;
  userId: string;
  timestamp: Date;
  data: {
    weight: number;
    height: number;
    age: number;
    sex: "male" | "female";
    activityLevel: string;
    goal: string;
  };
  results: {
    bmr: number;
    tdee: number;
    macros: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
  };
}
