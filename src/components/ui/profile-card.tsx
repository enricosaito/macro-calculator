import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, ChevronDown, ChevronUp, User, Award, Flame, Dumbbell, Croissant, Droplet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCalculationFromStorage } from "@/lib/storage-utils";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Add a new interface for macro data
interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface ProfileCardProps {
  onLogout: () => Promise<void>;
}

const ProfileCard = ({ onLogout }: ProfileCardProps) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [macroData, setMacroData] = useState<MacroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Add a ref to track the last update time
  const lastUpdateRef = useRef<number>(0);
  // Add a cache for the data
  const dataCache = useRef<{ data: MacroData | null; timestamp: number }>({
    data: null,
    timestamp: 0,
  });

  // Wrap fetchMacroData in useCallback to prevent it from changing on every render
  const fetchMacroData = useCallback(
    async (showLoading = true) => {
      // If we have cached data that's less than 10 seconds old, use it
      const now = Date.now();
      if (dataCache.current.data && now - dataCache.current.timestamp < 10000) {
        setMacroData(dataCache.current.data);
        setIsLoading(false);
        return;
      }

      // Only show loading if requested (avoid it when opening the dropdown)
      if (showLoading) {
        setIsLoading(true);
      }

      try {
        let newMacroData: MacroData | null = null;

        if (currentUser) {
          // First try to get data from Firestore for authenticated users
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().latestMacros) {
            const firestoreData = userDoc.data().latestMacros;

            // Check if we have macros data in the results structure
            if (firestoreData.results && firestoreData.results.macros) {
              // This matches the structure we saw in your Firestore screenshot
              const macros = firestoreData.results.macros;
              newMacroData = {
                calories: Math.round(macros.calories || 0),
                protein: Math.round(macros.protein || 0),
                carbs: Math.round(macros.carbs || 0),
                fats: Math.round(macros.fats || 0),
              };
            } else if (firestoreData.results) {
              // Fallback if the structure is different
              const results = firestoreData.results;
              newMacroData = {
                calories: Math.round(results.calories || 0),
                protein: Math.round(results.protein || 0),
                carbs: Math.round(results.carbs || 0),
                fats: Math.round(results.fats || 0),
              };
            }
          }
        }

        // Fall back to local storage if no Firestore data or not logged in
        if (!newMacroData) {
          const storedCalculation = getCalculationFromStorage();
          if (storedCalculation && storedCalculation.results) {
            newMacroData = {
              calories: Math.round(storedCalculation.results.calories || 0),
              protein: Math.round(storedCalculation.results.protein || 0),
              carbs: Math.round(storedCalculation.results.carbs || 0),
              fats: Math.round(storedCalculation.results.fats || 0),
            };

            // Update lastUpdateRef to match storage timestamp
            lastUpdateRef.current = storedCalculation.timestamp;
          }
        }

        // Update state and cache
        setMacroData(newMacroData);
        dataCache.current = {
          data: newMacroData,
          timestamp: now,
        };
      } catch (error) {
        console.error("Error fetching macro data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser]
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchMacroData(true);
  }, [fetchMacroData]);

  // Background data refresh
  useEffect(() => {
    // Periodically check for changes in local storage
    const checkForUpdates = () => {
      const storedCalculation = getCalculationFromStorage();
      if (storedCalculation && storedCalculation.timestamp > lastUpdateRef.current) {
        // The data has been updated since our last fetch
        fetchMacroData(false); // Don't show loading for background updates
        lastUpdateRef.current = storedCalculation.timestamp;
      }
    };

    // Check every 2 seconds
    const intervalId = setInterval(checkForUpdates, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchMacroData]);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prefetch data before showing dropdown
  const handleOpenDropdown = useCallback(() => {
    // If not already open
    if (!isOpen) {
      // First open the dropdown with cached data
      setIsOpen(true);
      // Then fetch fresh data in background
      fetchMacroData(false);
    } else {
      // Just close if already open
      setIsOpen(false);
    }
  }, [isOpen, fetchMacroData]);

  if (!currentUser) return null;

  // Get user's first name for greeting
  const firstName = currentUser.displayName ? currentUser.displayName.split(" ")[0] : "Usuário";

  return (
    <div className="relative" ref={cardRef}>
      <Button variant="ghost" className="flex items-center gap-2 px-3" onClick={handleOpenDropdown}>
        {currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt={firstName} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <User className="h-4 w-4" />
          </div>
        )}
        <span className="max-w-[150px] truncate">{firstName}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-72 z-50"
          >
            <Card className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-medium">Olá, {firstName}!</h3>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>

                {macroData ? (
                  <div className="bg-primary/10 rounded-lg p-3 mb-3 relative">
                    {isLoading && (
                      <div className="absolute top-1 right-1">
                        <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Seus macros:</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/");
                        }}
                      >
                        Recalcular
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="font-medium text-foreground">
                          {macroData.calories ? macroData.calories : 0}
                        </span>{" "}
                        kcal
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Dumbbell className="h-3 w-3 text-blue-500" />
                        <span className="font-medium text-primary">
                          {macroData.protein ? macroData.protein : 0}g
                        </span>{" "}
                        proteína
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Croissant className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium text-yellow-500">
                          {macroData.carbs ? macroData.carbs : 0}g
                        </span>{" "}
                        carbs
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Droplet className="h-3 w-3 text-red-500" />
                        <span className="font-medium text-red-500">{macroData.fats ? macroData.fats : 0}g</span>{" "}
                        gorduras
                      </div>
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="bg-secondary/30 rounded-lg p-3 mb-3 text-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mx-auto mb-1"></div>
                    <p className="text-sm text-muted-foreground">Carregando dados...</p>
                  </div>
                ) : (
                  <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                    <p className="text-sm text-center">
                      Você ainda não calculou seus macros.{" "}
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm"
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/");
                        }}
                      >
                        Calcular agora
                      </Button>
                    </p>
                  </div>
                )}

                <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mr-2 flex items-center justify-center">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Plano Gratuito</p>
                      <p className="text-xs text-muted-foreground">Acesso básico</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileCard;
