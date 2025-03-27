import { Timestamp } from "firebase/firestore";

export interface TrackingEntry {
  id: string;
  userId: string;
  date: Timestamp | Date;
  meals: Meal[];
  totals: MacroTotals;
  notes?: string;
}

export interface Meal {
  id: string;
  name: string; // Café da manhã, Almoço, Jantar, Lanche, etc.
  time?: Timestamp | Date;
  foods: FoodEntry[];
  macros: MacroTotals;
}

export interface FoodEntry {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  recipeId?: string; // optional reference to a recipe if this food is a recipe
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

// Predefined meal types
export const MEAL_TYPES = [
  { id: "breakfast", name: "Café da manhã" },
  { id: "lunch", name: "Almoço" },
  { id: "dinner", name: "Jantar" },
  { id: "snack_morning", name: "Lanche da manhã" },
  { id: "snack_afternoon", name: "Lanche da tarde" },
  { id: "snack_evening", name: "Lanche da noite" },
  { id: "pre_workout", name: "Pré-treino" },
  { id: "post_workout", name: "Pós-treino" },
];
