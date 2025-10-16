import { Shield, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  showAuth?: boolean;
  onLoginClick?: () => void;
}

export function Navbar({ isDark, onToggleDark, showAuth = false, onLoginClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 rounded-xl gradient-bg soft-glow">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl tracking-tight">
              TruthShield
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {showAuth && (
              <Button
                onClick={onLoginClick}
                variant="ghost"
                className="hidden sm:inline-flex hover:bg-white/10"
              >
                Sign In
              </Button>
            )}
            
            <Button
              onClick={onToggleDark}
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-white/10"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
