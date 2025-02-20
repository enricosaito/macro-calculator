// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import MacroCalculator from "@/pages/MacroCalculator";
import RecipePlanner from "@/pages/RecipePlanner";
import Navbar from "@/components/ui/Navbar";

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
