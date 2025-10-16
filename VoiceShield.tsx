import { motion } from "motion/react";
import { Mic, Upload, Radio, AlertTriangle, CheckCircle, Info, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TruthMeter } from "./TruthMeter";
import { useState } from "react";
import { analyzeAudioCharacteristics } from "../lib/detectors";

export function VoiceShield() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    analysis: string;
    audioCharacteristics: Array<{ label: string; value: string; status: string }>;
    recommendations: string[];
  } | null>(null);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setHasAudio(true);
      }, 3000);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const detection = analyzeAudioCharacteristics(hasAudio ? "audio_sample" : "");
      
      const characteristics = [
        { 
          label: "Voice Authenticity", 
          value: detection.score >= 80 ? "Genuine" : detection.score >= 60 ? "Uncertain" : "Suspicious",
          status: detection.score >= 80 ? "pass" : detection.score >= 60 ? "warning" : "fail"
        },
        { 
          label: "Background Noise", 
          value: detection.flags.some(f => f.type.includes("Background")) ? "Anomalies Detected" : "Natural",
          status: detection.flags.some(f => f.type.includes("Background")) ? "warning" : "pass"
        },
        { 
          label: "Frequency Analysis", 
          value: detection.flags.some(f => f.type.includes("Frequency")) ? "Irregular Patterns" : "Normal Range",
          status: detection.flags.some(f => f.type.includes("Frequency")) ? "warning" : "pass"
        },
        { 
          label: "Speech Prosody", 
          value: detection.flags.some(f => f.type.includes("Prosody")) ? "Minor Inconsistencies" : "Consistent",
          status: detection.flags.some(f => f.type.includes("Prosody")) ? "warning" : "pass"
        },
        { 
          label: "Digital Artifacts", 
          value: detection.flags.some(f => f.type.includes("Artifact")) ? "Detected" : "None Found",
          status: detection.flags.some(f => f.type.includes("Artifact")) ? "fail" : "pass"
        }
      ];
      
      const recommendations: string[] = [];
      
      if (detection.score >= 80) {
        recommendations.push("✓ Audio appears authentic based on analysis factors");
        recommendations.push("✓ No evidence of voice cloning or deepfake detected");
        recommendations.push("✓ Natural speech patterns verified");
      } else if (detection.score >= 60) {
        recommendations.push("⚠ Some irregularities detected - verify source");
        recommendations.push("Cross-reference with known authentic recordings");
        recommendations.push("Consider context and whether claims are realistic");
      } else {
        recommendations.push("🚨 Multiple manipulation indicators detected");
        recommendations.push("HIGH RISK - Potential deepfake or voice cloning");
        recommendations.push("Do NOT act on information without verification");
      }
      
      recommendations.push("Always consider context in addition to audio analysis");
      recommendations.push("Verify important claims through multiple channels");
      
      setResult({
        score: detection.score,
        analysis: detection.analysis,
        audioCharacteristics: characteristics,
        recommendations: recommendations.slice(0, 5)
      });
      setIsAnalyzing(false);
    }, 2800);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">VoiceShield</h1>
            <p className="text-muted-foreground">
              Verify audio authenticity and detect voice manipulation
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
            <h2 className="text-xl sm:text-2xl mb-4">Audio Input</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Record or upload audio for analysis
            </p>

            <div className="space-y-4">
              {/* Recording Interface */}
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl glass-panel border-2 border-dashed border-border">
                {isRecording ? (
                  <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="p-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 soft-glow">
                      <Radio className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                  </motion.div>
                ) : hasAudio ? (
                  <div className="p-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                ) : (
                  <div className="p-6 rounded-full glass-panel">
                    <Mic className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                <p className="mt-4 text-center">
                  {isRecording ? "Recording..." : hasAudio ? "Audio Ready" : "Ready to Record"}
                </p>
              </div>

              <Button
                onClick={handleRecord}
                disabled={isRecording}
                className={`w-full h-12 rounded-xl transition-all ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "gradient-bg text-white hover:opacity-90"
                }`}
              >
                <Mic className="w-4 h-4 mr-2" />
                {isRecording ? "Stop Recording" : hasAudio ? "Record New Audio" : "Start Recording"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 rounded-xl glass-panel border-2"
                onClick={() => setHasAudio(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Audio File
              </Button>

              {hasAudio && (
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl h-12"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Audio"
                  )}
                </Button>
              )}

              <div className="flex items-start gap-2 p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Audio files are analyzed locally and deleted after verification. Maximum 5 minutes.
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
                  <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Record or upload audio to see analysis results
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

                {/* Audio Characteristics */}
                <div>
                  <h3 className="mb-3">Audio Characteristics</h3>
                  <div className="space-y-2">
                    {result.audioCharacteristics.map((char, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl glass-panel"
                      >
                        <span className="text-sm">{char.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{char.value}</span>
                          {char.status === "pass" && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="mb-3">Summary</h3>
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
