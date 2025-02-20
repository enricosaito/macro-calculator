// src/components/ui/navbar.tsx
import { Calculator, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Calculadora de Macros",
      path: "/",
      icon: Calculator,
    },
    {
      label: "Planejador de Receitas",
      path: "/recipes",
      icon: Utensils,
    },
  ];

  return (
    <nav className="border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={cn("gap-2", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
