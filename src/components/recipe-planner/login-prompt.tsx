import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LoginPromptProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  message: string;
}

const LoginPrompt = ({ open, onOpenChange, message }: LoginPromptProps) => {
  const navigate = useNavigate();
  const isModal = open !== undefined && onOpenChange !== undefined;

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  if (isModal) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <AlertDialogTitle className="text-center">Conteúdo Premium</AlertDialogTitle>
            <AlertDialogDescription className="text-center">{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col gap-2">
            <AlertDialogAction asChild>
              <Button className="w-full" onClick={handleLogin}>
                Entrar na Minha Conta
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button variant="outline" className="w-full" onClick={handleRegister}>
                Criar Conta
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleLogin}>Entrar</Button>
        <Button variant="outline" onClick={handleRegister}>
          Criar Conta
        </Button>
      </div>
    </div>
  );
};

export default LoginPrompt;
