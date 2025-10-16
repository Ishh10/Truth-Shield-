import { motion } from "motion/react";
import { DollarSign, Send, AlertTriangle, Shield, Info, ExternalLink, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TruthMeter } from "./TruthMeter";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { analyzeFraudContent } from "../lib/detectors";

export function MoneyShield() {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: string;
    analysis: string;
    redFlags: Array<{ type: string; description: string; severity: string }>;
    safeguards: string[];
  } | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const detection = analyzeFraudContent(content);
      
      let riskLevel = "Safe";
      if (detection.score >= 85) {
        riskLevel = "Appears Safe";
      } else if (detection.score >= 70) {
        riskLevel = "Some Concerns";
      } else if (detection.score >= 50) {
        riskLevel = "High Risk";
      } else if (detection.score >= 30) {
        riskLevel = "Very High Risk";
      } else {
        riskLevel = "CRITICAL RISK";
      }
      
      const safeguards: string[] = [];
      
      if (detection.score >= 85) {
        safeguards.push("✅ Minimal fraud indicators detected");
        safeguards.push("Still verify sender through official channels if requesting action");
        safeguards.push("Never share sensitive information via unsolicited messages");
      } else if (detection.score >= 70) {
        safeguards.push("⚠️ Some concerns detected - proceed with caution");
        safeguards.push("Independently verify sender identity before responding");
        safeguards.push("Never share sensitive information via email or messages");
      } else if (detection.score >= 50) {
        safeguards.push("🚨 HIGH RISK - Exercise extreme caution");
        safeguards.push("Do NOT share any personal or financial information");
        safeguards.push("Verify through official channels only");
      } else {
        safeguards.push("🛑 STOP - This is almost certainly a scam");
        safeguards.push("Do NOT respond or engage in any way");
        safeguards.push("Do NOT share ANY personal or financial information");
        safeguards.push("Block sender immediately and report as fraud");
      }
      
      safeguards.push("Consult with trusted advisors before taking action");
      safeguards.push("Report suspicious content to FTC.gov or IC3.gov");
      safeguards.push("Check with the real company through official contacts");
      
      setResult({
        score: detection.score,
        riskLevel,
        analysis: detection.analysis,
        redFlags: detection.flags.map(f => ({
          type: f.type,
          description: f.description,
          severity: f.severity
        })),
        safeguards: safeguards.slice(0, 6)
      });
      setIsAnalyzing(false);
    }, 2200);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100";
      case "high":
        return "bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100";
      default:
        return "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100";
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-green-500">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">MoneyShield</h1>
            <p className="text-muted-foreground">
              Detect financial fraud and protect against scams
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
            <h2 className="text-xl sm:text-2xl mb-4">Enter Suspicious Content</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Paste emails, messages, or offers that seem suspicious
            </p>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste the suspicious message or offer here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] sm:min-h-[300px] glass-panel border-2 rounded-xl resize-none"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!content || isAnalyzing}
                className="w-full gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl h-12"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Analyze for Fraud
                  </>
                )}
              </Button>

              <div className="space-y-3 p-4 rounded-xl glass-panel">
                <h4 className="text-sm">Common Scam Types We Detect:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Phishing", "Investment Fraud", "Romance Scams", "Job Scams", "Tech Support", "Prize Scams"].map((type) => (
                    <Badge key={type} variant="outline" className="justify-center py-2">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Content is analyzed using advanced fraud detection algorithms. Never share real financial data here.
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
            <h2 className="text-xl sm:text-2xl mb-6">Fraud Analysis</h2>

            {!result ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="p-6 rounded-2xl glass-panel mb-6">
                  <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Enter suspicious content to check for fraud indicators
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Truth Score */}
                <div className="flex justify-center">
                  <TruthMeter score={result.score} size={180} />
                </div>

                {/* Risk Level Alert */}
                <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    <span className="text-red-900 dark:text-red-100">
                      {result.riskLevel}
                    </span>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    This content shows strong indicators of fraudulent activity
                  </p>
                </div>

                {/* Analysis */}
                <div>
                  <h3 className="mb-3">Detailed Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.analysis}
                  </p>
                </div>

                {/* Red Flags */}
                <div>
                  <h3 className="mb-3">Detected Red Flags</h3>
                  <div className="space-y-2">
                    {result.redFlags.map((flag, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl border ${getSeverityColor(flag.severity)}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm">
                                {flag.type}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {flag.severity}
                              </Badge>
                            </div>
                            <p className="text-xs opacity-80">
                              {flag.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safeguards */}
                <div>
                  <h3 className="mb-3">Recommended Actions</h3>
                  <div className="space-y-2">
                    {result.safeguards.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl glass-panel"
                      >
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm flex-1">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Button */}
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl glass-panel border-2"
                  onClick={() => window.open("https://reportfraud.ftc.gov/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Report to Authorities
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
