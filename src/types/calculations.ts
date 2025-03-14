// src/types/calculations.ts
import { Timestamp } from "firebase/firestore";

export interface MacroCalculation {
  id?: string;
  userId: string;
  timestamp: Timestamp;
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

export interface UserData {
  weight: string;
  height: string;
  age: string;
  sex: "male" | "female" | null;
  activityLevel: string;
  goal: string;
  [key: string]: string | null;
}
