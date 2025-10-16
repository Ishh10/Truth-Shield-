import { motion } from "motion/react";
import { Compass, Sparkles, TrendingUp, AlertCircle, Brain, Target } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

export function TruthQuest() {
  const insights = [
    {
      category: "Trending Misinformation",
      icon: TrendingUp,
      gradient: "from-red-500 to-orange-500",
      items: [
        { topic: "Health misinformation surge", impact: "High", trend: "+23%" },
        { topic: "Political deepfakes detected", impact: "Critical", trend: "+45%" },
        { topic: "Investment scam variations", impact: "High", trend: "+12%" }
      ]
    },
    {
      category: "AI Insights",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      items: [
        { topic: "Pattern recognition improved", impact: "Medium", trend: "+15%" },
        { topic: "New detection algorithms deployed", impact: "High", trend: "New" },
        { topic: "Cross-platform analysis enhanced", impact: "Medium", trend: "+8%" }
      ]
    },
    {
      category: "Risk Alerts",
      icon: AlertCircle,
      gradient: "from-yellow-500 to-red-500",
      items: [
        { topic: "Phishing attempts increasing", impact: "Critical", trend: "+67%" },
        { topic: "Romance scams on the rise", impact: "High", trend: "+34%" },
        { topic: "Crypto fraud variants detected", impact: "High", trend: "+28%" }
      ]
    }
  ];

  const userStats = [
    { label: "Total Queries", value: 847, max: 1000 },
    { label: "Accuracy Rate", value: 94, max: 100 },
    { label: "Insights Unlocked", value: 23, max: 50 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "High":
        return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20";
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
      default:
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-red-500">
            <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">TruthQuest</h1>
            <p className="text-muted-foreground">
              AI-powered insights and misinformation trends
            </p>
          </div>
        </div>
      </motion.div>

      {/* User Progress */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 sm:p-8 glass-panel soft-glow bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl gradient-bg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl">Your Truth Journey</h2>
              <p className="text-sm text-muted-foreground">Track your verification progress</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {userStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-xl sm:text-2xl">
                    {stat.value}
                    <span className="text-sm text-muted-foreground">/{stat.max}</span>
                  </span>
                </div>
                <Progress value={(stat.value / stat.max) * 100} className="h-3" />
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Insights Sections */}
      <div className="space-y-6">
        {insights.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + sectionIndex * 0.1 }}
          >
            <Card className="p-6 sm:p-8 glass-panel">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${section.gradient}`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl">{section.category}</h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl glass-panel hover:soft-glow transition-all cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="mb-1">{item.topic}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(item.impact)}`}>
                          {item.impact} Impact
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg text-purple-600 dark:text-purple-400">
                        {item.trend}
                      </div>
                      <p className="text-xs text-muted-foreground">change</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 sm:p-8 glass-panel">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl">Personalized Recommendations</h2>
              <p className="text-sm text-muted-foreground">AI-generated tips based on your activity</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Expand Your Verification Skills",
                description: "Try using VoiceShield to analyze audio content and improve your multimedia verification abilities.",
                action: "Explore VoiceShield"
              },
              {
                title: "Stay Alert on Financial Scams",
                description: "Recent trends show increased sophistication in investment fraud. Review your MoneyShield settings.",
                action: "Review Settings"
              },
              {
                title: "Join Community Verification",
                description: "Your accuracy rate qualifies you to become a trusted fact-checker. Help verify community content.",
                action: "Apply Now"
              }
            ].map((rec, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 sm:p-6 rounded-xl glass-panel hover:soft-glow transition-all"
              >
                <h3 className="mb-2">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  {rec.action} →
                </button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
