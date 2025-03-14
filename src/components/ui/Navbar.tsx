// src/components/ui/navbar.tsx
import { Calculator, Utensils, LogOut, Menu, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RecentResults from "@/components/macro-calculator/recent-results";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    // {
    //   label: "Sobre",
    //   path: "/about",
    //   icon: Info,
    // },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <div className="text-xl cursor-pointer font-bold" onClick={() => navigate("/")}>
              <span className="text-primary">Nutri</span>
              <span className="text-foreground">Macros</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "gap-2",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* User actions / right side */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser && <RecentResults />}

            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{currentUser.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 pb-6 border-b border-border/40 bg-background">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "gap-2 justify-start",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}

            {currentUser ? (
              <Button variant="outline" onClick={handleLogout} className="gap-2 mt-2 justify-start">
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate("/login")} className="mt-2">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
