import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getTrackingEntry,
  saveTrackingEntry,
  addFoodToMeal,
  removeFoodFromMeal,
  getTrackingEntries,
  getTrackingStats,
} from "@/services/trackingService";
import { TrackingEntry, Meal, FoodEntry, MacroTotals, MEAL_TYPES } from "@/types/tracking";
import { v4 as uuidv4 } from "uuid";

export function useTracking() {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [todayEntry, setTodayEntry] = useState<TrackingEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    averageCalories: number;
    averageProtein: number;
    averageCarbs: number;
    averageFats: number;
    daysTracked: number;
    streakDays: number;
  } | null>(null);

  // Function to load today's entry
  const loadTodayEntry = useCallback(async () => {
    if (!currentUser) {
      setTodayEntry(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const entry = await getTrackingEntry(currentUser.uid, currentDate);

      if (entry) {
        setTodayEntry(entry);
      } else {
        // Create an empty entry structure for today
        setTodayEntry({
          id: `${currentUser.uid}_${currentDate.toISOString().split("T")[0]}`,
          userId: currentUser.uid,
          date: currentDate,
          meals: [],
          totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
          notes: "",
        });
      }
    } catch (err) {
      console.error("Error loading tracking entry:", err);
      setError("Erro ao carregar registros alimentares");
    } finally {
      setLoading(false);
    }
  }, [currentUser, currentDate]);

  // Load stats for the past 30 days
  const loadStats = useCallback(async () => {
    if (!currentUser) {
      setStats(null);
      return;
    }

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const stats = await getTrackingStats(currentUser.uid, startDate, endDate);
      setStats(stats);
    } catch (err) {
      console.error("Error loading tracking stats:", err);
    }
  }, [currentUser]);

  // Load data on component mount or when date/user changes
  useEffect(() => {
    loadTodayEntry();
    loadStats();
  }, [loadTodayEntry, loadStats]);

  // Change the current date
  const changeDate = (date: Date) => {
    setCurrentDate(date);
  };

  // Add a new meal
  const addMeal = async (mealType: string) => {
    if (!currentUser || !todayEntry) return;

    try {
      setLoading(true);

      // Find meal type from predefined types
      const mealTypeInfo = MEAL_TYPES.find((type) => type.id === mealType);

      if (!mealTypeInfo) {
        throw new Error("Tipo de refeição inválido");
      }

      // Create a new meal
      const newMeal: Meal = {
        id: uuidv4(),
        name: mealTypeInfo.name,
        time: new Date(),
        foods: [],
        macros: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      };

      // Add to entry and save
      const updatedMeals = [...todayEntry.meals, newMeal];

      await saveTrackingEntry({
        userId: currentUser.uid,
        date: currentDate,
        meals: updatedMeals,
        totals: todayEntry.totals,
        notes: todayEntry.notes || "",
      });

      // Reload data
      await loadTodayEntry();
    } catch (err) {
      console.error("Error adding meal:", err);
      setError("Erro ao adicionar refeição");
    } finally {
      setLoading(false);
    }
  };

  // Add food to a meal
  const addFood = async (mealId: string, food: Omit<FoodEntry, "id">) => {
    if (!currentUser) return null;

    try {
      setLoading(true);

      const foodId = await addFoodToMeal(currentUser.uid, currentDate, mealId, food);

      // Reload data
      await loadTodayEntry();

      return foodId;
    } catch (err) {
      console.error("Error adding food:", err);
      setError("Erro ao adicionar alimento");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Remove food from a meal
  const removeFood = async (mealId: string, foodId: string) => {
    if (!currentUser) return;

    try {
      setLoading(true);

      await removeFoodFromMeal(currentUser.uid, currentDate, mealId, foodId);

      // Reload data
      await loadTodayEntry();
    } catch (err) {
      console.error("Error removing food:", err);
      setError("Erro ao remover alimento");
    } finally {
      setLoading(false);
    }
  };

  // Update entry notes
  const updateNotes = async (notes: string) => {
    if (!currentUser || !todayEntry) return;

    try {
      setLoading(true);

      await saveTrackingEntry({
        userId: currentUser.uid,
        date: currentDate,
        meals: todayEntry.meals,
        totals: todayEntry.totals,
        notes,
      });

      // Reload data
      await loadTodayEntry();
    } catch (err) {
      console.error("Error updating notes:", err);
      setError("Erro ao atualizar notas");
    } finally {
      setLoading(false);
    }
  };

  // Get entries for a date range
  const getEntries = async (startDate: Date, endDate: Date) => {
    if (!currentUser) return [];

    try {
      return await getTrackingEntries(currentUser.uid, startDate, endDate);
    } catch (err) {
      console.error("Error getting entries:", err);
      setError("Erro ao buscar registros");
      return [];
    }
  };

  // Calculate remaining macros for the day
  const calculateRemaining = useCallback(
    (goalMacros: MacroTotals): MacroTotals => {
      if (!todayEntry) {
        return goalMacros;
      }

      return {
        calories: Math.max(0, goalMacros.calories - todayEntry.totals.calories),
        protein: Math.max(0, goalMacros.protein - todayEntry.totals.protein),
        carbs: Math.max(0, goalMacros.carbs - todayEntry.totals.carbs),
        fats: Math.max(0, goalMacros.fats - todayEntry.totals.fats),
      };
    },
    [todayEntry]
  );

  return {
    currentDate,
    todayEntry,
    loading,
    error,
    stats,
    changeDate,
    addMeal,
    addFood,
    removeFood,
    updateNotes,
    getEntries,
    calculateRemaining,
    refresh: loadTodayEntry,
  };
}
