// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { CardHeightProvider } from "@/context/CardHeightContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/navbar"; // Note the lowercase 'n'
import LoadingScreen from "@/components/ui/loading";
import MacroCalculator from "@/pages/macro-calculator";
import RecipePlanner from "@/pages/recipe-planner";
import AboutPage from "@/pages/about";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import NotFoundPage from "@/pages/not-found";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import SettingsToggle from "@/components/ui/SettingsToggle";
import Footer from "@/components/ui/footer";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or initialization tasks
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <AuthProvider>
            <CardHeightProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <SettingsToggle />
                  <Routes>
                    <Route path="/" element={<MacroCalculator />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    {/* Changed from ProtectedRoute to a regular Route */}
                    <Route path="/recipes" element={<RecipePlanner />} />
                    {/* Catch all route for 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CardHeightProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
