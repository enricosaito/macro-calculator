import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginPromptProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  message: string;
}

const LoginPrompt = ({ open, onOpenChange, message }: LoginPromptProps) => {
  const navigate = useNavigate();
  const isModal = open !== undefined && onOpenChange !== undefined;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isModal || !open) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange?.(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isModal, open, onOpenChange]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    // If clicking on the overlay directly (not the content)
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onOpenChange?.(false);
    }
  };

  if (isModal) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={handleOverlayClick}>
        <div
          ref={contentRef}
          className="bg-background border rounded-lg w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">Conteúdo Premium</h2>
            <p className="text-center text-muted-foreground mb-4">{message}</p>

            <div className="py-4">
              <h3 className="text-sm font-medium mb-3">Ao fazer login você desbloqueia:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Acesso a todas as +20 receitas premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Salve suas receitas favoritas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Acompanhe seu histórico de cálculos de macros</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <Button className="w-full" onClick={handleLogin}>
                Entrar na Minha Conta
              </Button>
              <Button variant="outline" className="w-full" onClick={handleRegister}>
                Criar Conta Grátis
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Non-modal version for tab content
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center">
        <Lock className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">Acesso Exclusivo para Usuários</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>

      <div className="bg-primary/5 rounded-lg p-4 mb-6 max-w-md">
        <h4 className="font-medium mb-2">Ao criar uma conta você desbloqueia:</h4>
        <ul className="text-left space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Acesso a todas as +20 receitas premium</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Salve suas receitas favoritas</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Acompanhe seu histórico de cálculos de macros</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleLogin}>Entrar</Button>
        <Button variant="outline" onClick={handleRegister}>
          Criar Conta Grátis
        </Button>
      </div>
    </div>
  );
};

export default LoginPrompt;
