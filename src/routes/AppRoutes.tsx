// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import MacroCalculator from "@/pages/macro-calculator";
import RecipePlanner from "@/pages/recipe-planner";
import Navbar from "@/components/ui/navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/macro-calculator" element={<MacroCalculator />} />
        <Route path="/recipe-planner" element={<RecipePlanner />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
