import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/navbar";
import MacroCalculator from "@/pages/macro-calculator";
import RecipePlanner from "@/pages/recipe-planner";
import AboutPage from "@/pages/about";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import SettingsToggle from "@/components/ui/SettingsToggle";

const App = () => {
  return (
    <Router>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-background flex flex-col">
              <Navbar />
              <main className="flex-1">
                <SettingsToggle />
                <Routes>
                  <Route path="/" element={<MacroCalculator />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<AboutPage />} /> {/* Add the new route */}
                  <Route
                    path="/recipes"
                    element={
                      <ProtectedRoute>
                        <RecipePlanner />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
