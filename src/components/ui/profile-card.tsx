// src/components/ui/profile-card.tsx
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, ChevronDown, ChevronUp, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCalculationFromStorage } from "@/lib/storage-utils";

interface ProfileCardProps {
  onLogout: () => Promise<void>;
}

const ProfileCard = ({ onLogout }: ProfileCardProps) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get macro calculation data from storage if available
  const storedCalculation = getCalculationFromStorage();

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

  if (!currentUser) return null;

  // Get user's first name for greeting
  const firstName = currentUser.displayName ? currentUser.displayName.split(" ")[0] : "Usuário";

  return (
    <div className="relative" ref={cardRef}>
      <Button variant="ghost" className="flex items-center gap-2 px-3" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <User className="h-4 w-4" />
        </div>
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

                {storedCalculation && (
                  <div className="bg-primary/10 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-medium mb-2">Seus macros:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-medium text-foreground">2092</span> kcal
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-medium text-primary">225g</span> proteína
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-medium text-yellow-500">170g</span> carbs
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-medium text-red-500">50g</span> gorduras
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mr-2">
                      <div className="w-5 h-5 m-0.5 rounded-full border-2 border-white"></div>
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
