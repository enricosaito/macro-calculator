import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import type { MacroCalculation } from "@/types/calculations";

export const useCalculations = () => {
  const [calculations, setCalculations] = useState<MacroCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchCalculations = async () => {
    if (!currentUser) return;

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
    } finally {
      setLoading(false);
    }
  };

  const saveCalculation = async (calculationData: Omit<MacroCalculation, "id" | "userId" | "timestamp">) => {
    if (!currentUser) return;

    try {
      const newCalc = {
        userId: currentUser.uid,
        timestamp: new Date(),
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
  }, [currentUser]);

  return {
    calculations,
    loading,
    saveCalculation,
    refreshCalculations: fetchCalculations,
  };
};
