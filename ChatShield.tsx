import { motion } from "motion/react";
import { Send, MessageSquare, AlertTriangle, CheckCircle, Info, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TruthMeter } from "./TruthMeter";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { analyzeChatMessage } from "../lib/detectors";

export function ChatShield() {
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    analysis: string;
    recommendations: string[];
    flags: Array<{ type: string; description: string }>;
  } | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Real AI analysis using detection algorithms
    setTimeout(() => {
      const detection = analyzeChatMessage(message);
      
      const recommendations: string[] = [];
      
      if (detection.score >= 90) {
        recommendations.push("This message appears highly credible");
        recommendations.push("Still verify important claims before making decisions");
      } else if (detection.score >= 80) {
        recommendations.push("Generally trustworthy but verify any important claims");
        recommendations.push("Check for original sources if sharing widely");
      } else if (detection.score >= 70) {
        recommendations.push("Moderately trustworthy - verify key claims before sharing");
        recommendations.push("Cross-check important facts with reputable sources");
      } else if (detection.score >= 60) {
        recommendations.push("Several concerns detected - exercise caution");
        recommendations.push("Cross-reference claims with established fact-checking sources");
      } else if (detection.score < 50) {
        recommendations.push("🚨 DO NOT share this message - high risk of misinformation");
        recommendations.push("Report to platform moderators if received as spam");
      } else {
        recommendations.push("⚠️ High risk - verify before trusting or sharing");
        recommendations.push("Be very cautious about sharing until verification is complete");
      }
      
      recommendations.push("Look for original sources and primary documentation");
      recommendations.push("Check reputable news outlets for similar stories");
      recommendations.push("Consider the sender's credibility and track record");
      
      if (detection.flags.some(f => f.severity === "critical")) {
        recommendations.unshift("⚠️ CRITICAL: This content may be dangerous - verify before acting");
      }
      
      setResult({
        score: detection.score,
        analysis: detection.analysis,
        recommendations: recommendations.slice(0, 5),
        flags: detection.flags.map(f => ({
          type: f.type,
          description: f.description
        }))
      });
      setIsAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">ChatShield</h1>
            <p className="text-muted-foreground">
              Detect misinformation in messages and conversations
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 sm:p-8 glass-panel h-full">
            <h2 className="text-xl sm:text-2xl mb-4">Enter Message</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Paste the message or conversation you want to verify
            </p>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] sm:min-h-[300px] glass-panel border-2 rounded-xl resize-none"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!message || isAnalyzing}
                className="w-full gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl h-12"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Analyze Message
                  </>
                )}
              </Button>

              <div className="flex items-start gap-2 p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  All messages are analyzed using AI and are not stored permanently. Your privacy is protected.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 sm:p-8 glass-panel h-full">
            <h2 className="text-xl sm:text-2xl mb-6">Analysis Result</h2>

            {!result ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="p-6 rounded-2xl glass-panel mb-6">
                  <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Enter a message and click analyze to see results
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Truth Score */}
                <div className="flex justify-center">
                  <TruthMeter score={result.score} size={180} />
                </div>

                {/* Analysis */}
                <div>
                  <h3 className="mb-3">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.analysis}
                  </p>
                </div>

                {/* Flags */}
                {result.flags.length > 0 && (
                  <div>
                    <h3 className="mb-3">Detected Issues ({result.flags.length})</h3>
                    <div className="space-y-2">
                      {result.flags.map((flag, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-yellow-100/50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                        >
                          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-yellow-900 dark:text-yellow-100 mb-1">
                              {flag.type}
                            </p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300">
                              {flag.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h3 className="mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl glass-panel"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm flex-1">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
