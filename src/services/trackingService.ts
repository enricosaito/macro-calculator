// src/services/trackingService.ts
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  updateDoc,
  DocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TrackingEntry, FoodEntry, Meal, MacroTotals } from "@/types/tracking";
import { v4 as uuidv4 } from "uuid";

const TRACKING_COLLECTION = "foodTracking";

/**
 * Convert a Firestore tracking document to a TrackingEntry
 */
const convertFromFirestore = (doc: DocumentSnapshot): TrackingEntry => {
  const data = doc.data();
  if (!data) throw new Error("Document data is undefined");

  return {
    id: doc.id,
    userId: data.userId,
    date: data.date?.toDate() || new Date(),
    meals: data.meals || [],
    totals: data.totals || { calories: 0, protein: 0, carbs: 0, fats: 0 },
    notes: data.notes || "",
  };
};

/**
 * Calculate macro totals for a list of food entries
 */
export const calculateMacroTotals = (foods: FoodEntry[]): MacroTotals => {
  return foods.reduce(
    (totals, food) => {
      return {
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fats: totals.fats + food.fats,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

/**
 * Calculate the total macros for all meals in a tracking entry
 */
export const calculateTotalMacros = (meals: Meal[]): MacroTotals => {
  return meals.reduce(
    (total, meal) => {
      return {
        calories: total.calories + meal.macros.calories,
        protein: total.protein + meal.macros.protein,
        carbs: total.carbs + meal.macros.carbs,
        fats: total.fats + meal.macros.fats,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

/**
 * Get a tracking entry for a specific date
 */
export const getTrackingEntry = async (userId: string, date: Date): Promise<TrackingEntry | null> => {
  try {
    // Format date to YYYY-MM-DD string for storage
    const dateString = date.toISOString().split("T")[0];

    const docRef = doc(db, TRACKING_COLLECTION, `${userId}_${dateString}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertFromFirestore(docSnap);
    }

    return null;
  } catch (error) {
    console.error("Error getting tracking entry:", error);
    throw error;
  }
};

/**
 * Get tracking entries for a date range
 */
export const getTrackingEntries = async (userId: string, startDate: Date, endDate: Date): Promise<TrackingEntry[]> => {
  try {
    const startDateTimestamp = Timestamp.fromDate(startDate);
    const endDateTimestamp = Timestamp.fromDate(endDate);

    const q = query(
      collection(db, TRACKING_COLLECTION),
      where("userId", "==", userId),
      where("date", ">=", startDateTimestamp),
      where("date", "<=", endDateTimestamp),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertFromFirestore(doc));
  } catch (error) {
    console.error("Error getting tracking entries:", error);
    throw error;
  }
};

/**
 * Save or update a tracking entry
 */
export const saveTrackingEntry = async (entry: Omit<TrackingEntry, "id">): Promise<string> => {
  try {
    // Format date to YYYY-MM-DD string for consistent ID format
    const date = entry.date instanceof Date ? entry.date : entry.date.toDate();
    const dateString = date.toISOString().split("T")[0];
    const entryId = `${entry.userId}_${dateString}`;

    // Recalculate meal macros
    const updatedMeals = entry.meals.map((meal) => {
      const macros = calculateMacroTotals(meal.foods);
      return {
        ...meal,
        macros,
      };
    });

    // Calculate totals
    const totals = calculateTotalMacros(updatedMeals);

    // Create or update the document
    await setDoc(doc(db, TRACKING_COLLECTION, entryId), {
      ...entry,
      meals: updatedMeals,
      totals,
      date: Timestamp.fromDate(date),
    });

    return entryId;
  } catch (error) {
    console.error("Error saving tracking entry:", error);
    throw error;
  }
};

/**
 * Add a food entry to a specific meal
 */
export const addFoodToMeal = async (
  userId: string,
  date: Date,
  mealId: string,
  food: Omit<FoodEntry, "id">
): Promise<string> => {
  try {
    // Get existing entry for the date
    const entry = await getTrackingEntry(userId, date);

    // Generate a new ID for the food
    const foodId = uuidv4();

    if (entry) {
      // Find the meal
      const mealIndex = entry.meals.findIndex((m) => m.id === mealId);

      if (mealIndex === -1) {
        throw new Error(`Meal with ID ${mealId} not found`);
      }

      // Add the food to the meal
      const updatedMeals = [...entry.meals];
      updatedMeals[mealIndex].foods.push({
        ...food,
        id: foodId,
      });

      // Recalculate macros and save
      await saveTrackingEntry({
        userId,
        date,
        meals: updatedMeals,
        totals: entry.totals,
        notes: entry.notes,
      });

      return foodId;
    } else {
      // Create a new entry with this meal and food
      const newMeal: Meal = {
        id: mealId,
        name: "", // This should be set based on mealId or passed in
        foods: [
          {
            ...food,
            id: foodId,
          },
        ],
        macros: {
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fats: food.fats,
        },
      };

      await saveTrackingEntry({
        userId,
        date,
        meals: [newMeal],
        totals: newMeal.macros,
        notes: "",
      });

      return foodId;
    }
  } catch (error) {
    console.error("Error adding food to meal:", error);
    throw error;
  }
};

/**
 * Remove a food from a meal
 */
export const removeFoodFromMeal = async (userId: string, date: Date, mealId: string, foodId: string): Promise<void> => {
  try {
    // Get existing entry for the date
    const entry = await getTrackingEntry(userId, date);

    if (!entry) {
      throw new Error("Tracking entry not found");
    }

    // Find the meal
    const mealIndex = entry.meals.findIndex((m) => m.id === mealId);

    if (mealIndex === -1) {
      throw new Error(`Meal with ID ${mealId} not found`);
    }

    // Remove the food from the meal
    const updatedMeals = [...entry.meals];
    updatedMeals[mealIndex].foods = updatedMeals[mealIndex].foods.filter((f) => f.id !== foodId);

    // Recalculate macros and save
    await saveTrackingEntry({
      userId,
      date: entry.date,
      meals: updatedMeals,
      totals: entry.totals,
      notes: entry.notes,
    });
  } catch (error) {
    console.error("Error removing food from meal:", error);
    throw error;
  }
};

/**
 * Get stats for a given period
 */
export const getTrackingStats = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<{
  averageCalories: number;
  averageProtein: number;
  averageCarbs: number;
  averageFats: number;
  daysTracked: number;
  streakDays: number;
}> => {
  try {
    const entries = await getTrackingEntries(userId, startDate, endDate);

    if (entries.length === 0) {
      return {
        averageCalories: 0,
        averageProtein: 0,
        averageCarbs: 0,
        averageFats: 0,
        daysTracked: 0,
        streakDays: 0,
      };
    }

    // Calculate averages
    const totals = entries.reduce(
      (acc, entry) => {
        return {
          calories: acc.calories + entry.totals.calories,
          protein: acc.protein + entry.totals.protein,
          carbs: acc.carbs + entry.totals.carbs,
          fats: acc.fats + entry.totals.fats,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    // Calculate streak by checking consecutive days
    let streakDays = 0;
    const sortedDates = entries
      .map((entry) => (entry.date instanceof Date ? entry.date : entry.date.toDate()))
      .sort((a, b) => b.getTime() - a.getTime()); // Sort descending

    if (sortedDates.length > 0) {
      streakDays = 1; // Start with 1 day
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if streak includes today or starts from yesterday
      const latestDate = new Date(sortedDates[0]);
      latestDate.setHours(0, 0, 0, 0);

      if (latestDate.getTime() === today.getTime() || latestDate.getTime() === today.getTime() - 86400000) {
        // Check consecutive days
        for (let i = 1; i < sortedDates.length; i++) {
          const current = new Date(sortedDates[i - 1]);
          const prev = new Date(sortedDates[i]);

          current.setHours(0, 0, 0, 0);
          prev.setHours(0, 0, 0, 0);

          // Check if dates are consecutive (1 day apart)
          if (current.getTime() - prev.getTime() === 86400000) {
            streakDays++;
          } else {
            break;
          }
        }
      } else {
        // No recent entries to form a streak
        streakDays = 0;
      }
    }

    return {
      averageCalories: Math.round(totals.calories / entries.length),
      averageProtein: Math.round(totals.protein / entries.length),
      averageCarbs: Math.round(totals.carbs / entries.length),
      averageFats: Math.round(totals.fats / entries.length),
      daysTracked: entries.length,
      streakDays,
    };
  } catch (error) {
    console.error("Error getting tracking stats:", error);
    throw error;
  }
};

/**
 * Delete a tracking entry
 */
export const deleteTrackingEntry = async (userId: string, date: Date): Promise<void> => {
  try {
    const dateString = date.toISOString().split("T")[0];
    const entryId = `${userId}_${dateString}`;

    await deleteDoc(doc(db, TRACKING_COLLECTION, entryId));
  } catch (error) {
    console.error("Error deleting tracking entry:", error);
    throw error;
  }
};
