import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full glass hover:glass-strong transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : -180 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: theme === "light" ? 1 : 0, rotate: theme === "light" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
    </Button>
  );
}
