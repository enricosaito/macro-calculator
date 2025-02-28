import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import type { MacroCalculation } from "@/types/calculations";

export const useCalculations = () => {
  const [calculations, setCalculations] = useState<MacroCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchCalculations = useCallback(async () => {
    if (!currentUser) {
      setCalculations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, "calculations"),
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedCalcs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MacroCalculation[];

      setCalculations(fetchedCalcs);
    } catch (error) {
      console.error("Error fetching calculations:", error);
      // Set empty array on error to avoid undefined
      setCalculations([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const saveCalculation = async (calculationData: Omit<MacroCalculation, "id" | "userId" | "timestamp">) => {
    if (!currentUser) return;

    try {
      const newCalc = {
        userId: currentUser.uid,
        timestamp: Timestamp.now(), // Use Firestore Timestamp
        ...calculationData,
      };

      await addDoc(collection(db, "calculations"), newCalc);
      await fetchCalculations();
    } catch (error) {
      console.error("Error saving calculation:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, [fetchCalculations]);

  const deleteCalculation = async (calculationId: string) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, "calculations", calculationId));
      await fetchCalculations(); // Refresh the list
    } catch (error) {
      console.error("Error deleting calculation:", error);
      throw error;
    }
  };

  return {
    calculations,
    loading,
    saveCalculation,
    deleteCalculation,
    refreshCalculations: fetchCalculations,
  };
};
