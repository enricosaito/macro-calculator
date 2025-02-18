"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const LandingPage = ({ onStart }) => {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover Your Perfect Macros
      </motion.h1>
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        I'll show you how easy it is to reach your fitness goals!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button onClick={onStart} size="lg">
          Start Your Journey
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
