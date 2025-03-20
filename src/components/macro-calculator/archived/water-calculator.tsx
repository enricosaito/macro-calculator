// "use client";

// import { motion } from "framer-motion";
// import { useLanguage } from "@/context/LanguageContext";
// import { ptBR, enUS } from "@/locales";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Droplet } from "lucide-react";

// interface WaterCalculatorProps {
//   weight: string;
//   activityLevel: string;
// }

// const WaterCalculator = ({ weight, activityLevel }: WaterCalculatorProps) => {
//   const { language } = useLanguage();
//   const t = language === "pt-BR" ? ptBR : enUS;

//   const calculateWaterIntake = () => {
//     const weightKg = parseFloat(weight);
//     if (isNaN(weightKg)) return null;

//     // Base calculation: 35ml per kg of body weight
//     let waterIntakeML = weightKg * 35;

//     // Adjust based on activity level
//     const activityMultiplier = parseFloat(activityLevel);
//     if (!isNaN(activityMultiplier)) {
//       if (activityMultiplier >= 1.55) {
//         waterIntakeML += 500; // Add 500ml for moderate to very active
//       }
//       if (activityMultiplier >= 1.725) {
//         waterIntakeML += 500; // Add another 500ml for very to extremely active
//       }
//     }

//     const waterIntakeL = (waterIntakeML / 1000).toFixed(1);
//     return waterIntakeL;
//   };

//   const waterIntake = calculateWaterIntake();

//   return (
//     <Card className="mb-6">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg flex items-center gap-2">
//           <Droplet className="h-5 w-5 text-blue-500" />
//           {t.waterIntakeTitle}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {waterIntake ? (
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//             <p className="text-3xl font-bold text-blue-500">{waterIntake} L</p>
//             <p className="text-sm text-muted-foreground mt-2">{t.waterIntakeDescription}</p>
//           </motion.div>
//         ) : (
//           <p className="text-muted-foreground">{t.enterDataForWater}</p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default WaterCalculator;
