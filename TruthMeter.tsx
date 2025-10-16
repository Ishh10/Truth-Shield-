import { motion } from "motion/react";

interface TruthMeterProps {
  score: number;
  size?: number;
}

export function TruthMeter({ score, size = 200 }: TruthMeterProps) {
  const getScoreColor = () => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-green-600 dark:text-green-500";
    if (score >= 70) return "text-blue-600 dark:text-blue-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 50) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getGradientColor = () => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 80) return "from-green-500 to-cyan-500";
    if (score >= 70) return "from-blue-500 to-cyan-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 50) return "from-orange-500 to-red-500";
    return "from-red-600 to-red-800";
  };

  const getRating = () => {
    if (score >= 90) return "Highly Credible";
    if (score >= 80) return "Generally Credible";
    if (score >= 70) return "Moderately Trustworthy";
    if (score >= 60) return "Some Concerns";
    if (score >= 50) return "High Risk";
    if (score >= 30) return "Very High Risk";
    return "Critical Risk";
  };

  const getColor = (score: number) => {
    if (score >= 90) return { from: "#10b981", to: "#059669" };
    if (score >= 80) return { from: "#10b981", to: "#06b6d4" };
    if (score >= 70) return { from: "#3b82f6", to: "#06b6d4" };
    if (score >= 60) return { from: "#f59e0b", to: "#d97706" };
    if (score >= 50) return { from: "#f97316", to: "#ef4444" };
    return { from: "#ef4444", to: "#dc2626" };
  };

  const colors = getColor(score);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/20"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            fill="none"
            stroke={`url(#gradient-${score})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className={`text-5xl mb-1 ${getScoreColor()}`}>
              {score}
            </div>
            <div className="text-sm text-muted-foreground">Truth Score</div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className={`px-4 py-2 rounded-full glass-panel bg-gradient-to-r ${getGradientColor()} bg-opacity-10`}
      >
        <span className={getScoreColor()}>{getRating()}</span>
      </motion.div>
    </div>
  );
}
