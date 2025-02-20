"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages } from "lucide-react"; // Import the Languages icon
import { useTheme } from "next-themes";

const SettingsToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === "pt-BR" ? "en-US" : "pt-BR");
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Change language">
        <Languages className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SettingsToggle;
