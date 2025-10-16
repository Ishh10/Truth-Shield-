import { motion } from "motion/react";
import { MessageSquare, Mic, DollarSign, Globe, Compass, TrendingUp, Activity, AlertCircle, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigateToModule?: (module: string) => void;
}

export function Dashboard({ onNavigateToModule }: DashboardProps) {
  const modules = [
    {
      id: "chatshield",
      icon: MessageSquare,
      title: "ChatShield",
      description: "Analyze conversations for misinformation",
      gradient: "from-purple-500 to-blue-500",
      stats: { scans: 1234, accuracy: 94 }
    },
    {
      id: "voiceshield",
      icon: Mic,
      title: "VoiceShield",
      description: "Verify audio authenticity",
      gradient: "from-blue-500 to-cyan-500",
      stats: { scans: 567, accuracy: 91 }
    },
    {
      id: "moneyshield",
      icon: DollarSign,
      title: "MoneyShield",
      description: "Detect fraud and scams",
      gradient: "from-cyan-500 to-green-500",
      stats: { scans: 891, accuracy: 96 }
    },
    {
      id: "communityshield",
      icon: Globe,
      title: "CommunityShield",
      description: "Verify news and social posts",
      gradient: "from-green-500 to-yellow-500",
      stats: { scans: 2345, accuracy: 93 }
    },
    {
      id: "truthquest",
      icon: Compass,
      title: "TruthQuest",
      description: "AI-powered insights",
      gradient: "from-yellow-500 to-red-500",
      stats: { scans: 678, accuracy: 89 }
    }
  ];

  const recentActivity = [
    { type: "ChatShield", content: "Analyzed WhatsApp message", score: 87, time: "2 min ago" },
    { type: "MoneyShield", content: "Scam email detected", score: 23, time: "15 min ago" },
    { type: "CommunityShield", content: "News article verified", score: 92, time: "1 hour ago" },
  ];

  const handleModuleClick = (moduleId: string) => {
    console.log("Module card clicked:", moduleId);
    if (onNavigateToModule) {
      onNavigateToModule(moduleId);
    } else {
      console.error("onNavigateToModule is not defined!");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl mb-2">Welcome back!</h1>
        <p className="text-muted-foreground text-lg">
          Your truth verification dashboard
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total Scans", value: "5,715", icon: Activity, change: "+12.5%" },
          { label: "Avg Accuracy", value: "93%", icon: TrendingUp, change: "+2.1%" },
          { label: "Alerts Prevented", value: "47", icon: AlertCircle, change: "+8%" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 sm:p-6 glass-panel hover:soft-glow transition-all">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl">{stat.value}</p>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                {stat.change} from last month
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">Protection Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <motion.button
              key={module.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => handleModuleClick(module.id)}
              className="text-left w-full"
            >
              <Card className="p-6 glass-panel hover:soft-glow transition-all cursor-pointer group h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${module.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {module.description}
                </p>
                <div className="space-y-3 pointer-events-none">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Scans</span>
                    <span>{module.stats.scans.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span>{module.stats.accuracy}%</span>
                    </div>
                    <Progress value={module.stats.accuracy} className="h-2" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6">Recent Activity</h2>
        <Card className="glass-panel overflow-hidden">
          <div className="divide-y divide-border/50">
            {recentActivity.map((activity, index) => {
              const scoreColor = activity.score >= 80 ? "text-green-600 dark:text-green-400" :
                                activity.score >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                                "text-red-600 dark:text-red-400";
              
              return (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 sm:p-6 hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">
                        {activity.type}
                      </p>
                      <p className="truncate">{activity.content}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center">
                        <p className={`text-xl sm:text-2xl ${scoreColor}`}>
                          {activity.score}
                        </p>
                        <p className="text-xs text-muted-foreground">score</p>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
