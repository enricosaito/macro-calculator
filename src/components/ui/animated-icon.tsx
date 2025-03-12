import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

const AnimatedIcon = ({ icon: Icon, size = 24, color, className }: AnimatedIconProps) => {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className={className}>
      <Icon size={size} color={color} />
    </motion.div>
  );
};

export default AnimatedIcon;
