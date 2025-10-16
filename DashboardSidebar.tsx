import { MessageSquare, Mic, DollarSign, Globe, Compass, Settings, Shield, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";

interface DashboardSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function DashboardSidebar({ activeModule, onModuleChange }: DashboardSidebarProps) {
  const modules = [
    { id: "dashboard", icon: Shield, label: "Dashboard", gradient: "from-purple-500 to-blue-500" },
    { id: "chatshield", icon: MessageSquare, label: "ChatShield", gradient: "from-purple-500 to-blue-500" },
    { id: "voiceshield", icon: Mic, label: "VoiceShield", gradient: "from-blue-500 to-cyan-500" },
    { id: "moneyshield", icon: DollarSign, label: "MoneyShield", gradient: "from-cyan-500 to-green-500" },
    { id: "communityshield", icon: Globe, label: "CommunityShield", gradient: "from-green-500 to-yellow-500" },
    { id: "truthquest", icon: Compass, label: "TruthQuest", gradient: "from-yellow-500 to-red-500" },
    { id: "milboard", icon: Gamepad2, label: "MILBoard", gradient: "from-pink-500 to-purple-500" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 glass-panel border-r border-border/50 p-4 gap-2">
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="p-2 rounded-xl gradient-bg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl tracking-tight">TruthShield</span>
      </div>

      <nav className="flex-1 space-y-1">
        {modules.map((module) => {
          const isActive = activeModule === module.id;
          return (
            <motion.button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? "glass-panel soft-glow"
                  : "hover:bg-white/5 dark:hover:bg-white/5"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${module.gradient} ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              >
                <module.icon className="w-5 h-5 text-white" />
              </div>
              <span className={isActive ? "" : "text-muted-foreground"}>{module.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <button
        onClick={() => onModuleChange("settings")}
        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
          activeModule === "settings"
            ? "glass-panel soft-glow"
            : "hover:bg-white/5 dark:hover:bg-white/5"
        }`}
      >
        <Settings className="w-5 h-5" />
        <span className={activeModule === "settings" ? "" : "text-muted-foreground"}>
          Settings
        </span>
      </button>
    </aside>
  );
}
