// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Clock, Coffee, Utensils } from "lucide-react";

// interface MealTimingCalculatorProps {
//   goal: string;
//   activityLevel: string;
// }

// interface MealPlan {
//   mealCount: number;
//   schedule: Array<{
//     time: string;
//     name: string;
//     description: string;
//     icon: React.ReactNode;
//     macroFocus?: string;
//   }>;
// }

// const MealTimingCalculator = ({ goal, activityLevel }: MealTimingCalculatorProps) => {
//   const [wakeUpTime, setWakeUpTime] = useState("06:00");
//   const [bedTime, setBedTime] = useState("22:00");
//   const [expanded, setExpanded] = useState(false);

//   // Convert string time to minutes since midnight for calculations
//   const timeToMinutes = (time: string): number => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

//   // Convert minutes back to formatted time string
//   const minutesToTime = (minutes: number): string => {
//     const hours = Math.floor(minutes / 60) % 24;
//     const mins = minutes % 60;
//     return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
//   };

//   // Calculate meal plan based on user parameters
//   const calculateMealPlan = (): MealPlan => {
//     const wakeMinutes = timeToMinutes(wakeUpTime);
//     const sleepMinutes = timeToMinutes(bedTime);

//     // Calculate active period in minutes
//     let activePeriod = sleepMinutes - wakeMinutes;
//     if (activePeriod < 0) activePeriod += 24 * 60; // Handle bedtime after midnight

//     // Determine optimal meal count based on goal and activity level
//     let mealCount = 3; // Default

//     const activityMultiplier = parseFloat(activityLevel);

//     if (goal === "gain") {
//       mealCount = 5; // More meals for muscle gain
//     } else if (goal === "lose") {
//       mealCount = 4; // Moderate meal count for fat loss
//     } else {
//       mealCount = 3; // Standard for maintenance
//     }

//     // Adjust based on activity level
//     if (activityMultiplier >= 1.725) {
//       mealCount += 1; // Add another meal for very active people
//     }

//     // Create meal schedule
//     const schedule = [];
//     const interval = activePeriod / (mealCount + 1); // +1 to create space before first and after last meal

//     // Morning - First meal 30-45 min after waking up
//     schedule.push({
//       time: minutesToTime(wakeMinutes + 30),
//       name: "Café da Manhã",
//       description: goal === "gain" ? "Rico em proteínas e carboidratos" : "Rico em proteínas",
//       icon: <Coffee className="h-4 w-4" />,
//       macroFocus: goal === "gain" ? "Carboidratos + Proteínas" : "Proteínas",
//     });

//     // Generate remaining meals
//     for (let i = 1; i < mealCount - 1; i++) {
//       const mealTime = wakeMinutes + interval * (i + 1);
//       let mealName = "Lanche";
//       let description = "Balanceado";
//       let macroFocus = "Equilibrado";

//       if (i === Math.floor((mealCount - 2) / 2)) {
//         mealName = "Almoço";
//         description = "Refeição completa";
//         macroFocus = "Completo";
//       }

//       schedule.push({
//         time: minutesToTime(mealTime),
//         name: mealName,
//         description,
//         icon: <Utensils className="h-4 w-4" />,
//         macroFocus,
//       });
//     }

//     // Last meal - At least 2 hours before bed
//     schedule.push({
//       time: minutesToTime(sleepMinutes - 120),
//       name: "Jantar",
//       description: goal === "lose" ? "Baixo em carboidratos" : "Moderado em carboidratos",
//       icon: <Utensils className="h-4 w-4" />,
//       macroFocus: goal === "lose" ? "Proteínas + Gorduras" : "Equilibrado",
//     });

//     return { mealCount, schedule };
//   };

//   const mealPlan = calculateMealPlan();

//   return (
//     <Card className="shadow-md bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
//       <CardHeader className="pb-2">
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-lg flex items-center gap-2">
//             <Clock className="h-5 w-5 text-indigo-500" />
//             Distribuição das Refeições
//           </CardTitle>
//           <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="text-xs">
//             {expanded ? "Simplificar" : "Personalizar"}
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {expanded && (
//           <div className="mb-4 grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-sm text-muted-foreground mb-1 block">Hora de acordar</label>
//               <Select value={wakeUpTime} onValueChange={setWakeUpTime}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="06:00" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from({ length: 12 }).map((_, i) => {
//                     const hour = (i + 4).toString().padStart(2, "0");
//                     return (
//                       <SelectItem key={`wake-${hour}`} value={`${hour}:00`}>
//                         {`${hour}:00`}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label className="text-sm text-muted-foreground mb-1 block">Hora de dormir</label>
//               <Select value={bedTime} onValueChange={setBedTime}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="22:00" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from({ length: 10 }).map((_, i) => {
//                     const hour = (i + 19).toString().padStart(2, "0");
//                     return (
//                       <SelectItem key={`sleep-${hour}`} value={`${hour}:00`}>
//                         {`${hour}:00`}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         )}

//         <div className="space-y-3">
//           <p className="text-sm text-center font-medium">Plano de {mealPlan.mealCount} refeições diárias</p>

//           <div className="relative pt-4 pb-2">
//             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100"></div>

//             {mealPlan.schedule.map((meal, index) => (
//               <div key={index} className="flex mb-4 relative">
//                 <div className="absolute left-4 top-3 w-3 h-3 rounded-full bg-indigo-400 -ml-1.5 z-10"></div>
//                 <div className="ml-8 flex-1">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       {meal.icon}
//                       <span className="font-medium">{meal.name}</span>
//                     </div>
//                     <span className="text-indigo-600 font-mono">{meal.time}</span>
//                   </div>
//                   <p className="text-xs text-muted-foreground">{meal.description}</p>
//                   {expanded && meal.macroFocus && (
//                     <p className="text-xs font-medium mt-1 text-indigo-500">Foco: {meal.macroFocus}</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <p className="text-xs text-center text-muted-foreground italic">
//             Esta distribuição é baseada no seu objetivo e nível de atividade.
//             {expanded ? "" : " Clique em 'Personalizar' para ajustar seus horários."}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default MealTimingCalculator;
