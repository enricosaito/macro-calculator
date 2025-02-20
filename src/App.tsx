// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/ui/navbar";
import MacroCalculator from "@/pages/macro-calculator";
import RecipePlanner from "@/pages/recipe-planner";
import SettingsToggle from "@/components/ui/SettingsToggle";

const App = () => {
  return (
    <Router>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <Navbar />
            <main className="max-w-4xl mx-auto p-4">
              <SettingsToggle />
              <Routes>
                <Route path="/" element={<MacroCalculator />} />
                <Route path="/recipes" element={<RecipePlanner />} />
              </Routes>
            </main>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
