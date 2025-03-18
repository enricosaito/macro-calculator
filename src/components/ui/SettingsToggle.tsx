// src/components/ui/SettingsToggle.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "next-themes";

const SettingsToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Ensure DOM is updated immediately to avoid flashing
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleLanguage}
        aria-label="Change language"
        className="bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-accent"
      >
        <Languages className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        className="bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm hover:bg-accent"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SettingsToggle;
