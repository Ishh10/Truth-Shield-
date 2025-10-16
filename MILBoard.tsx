import { motion, AnimatePresence } from "motion/react";
import { Gamepad2, QrCode, TrendingUp, TrendingDown, Trophy, Users, Sparkles, CheckCircle, XCircle, Info, Scan, Zap, Target, Award, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { getRandomChallenge, Challenge } from "../lib/milboard-challenges";

type GameState = "setup" | "scanning" | "challenge" | "result" | "leaderboard" | "difficulty";
type Difficulty = "beginner" | "intermediate" | "advanced";

interface Player {
  name: string;
  position: number;
  score: number;
  avatar: string;
  correctAnswers: number;
  totalQuestions: number;
}

export function MILBoard() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [streak, setStreak] = useState(0);
  const [players, setPlayers] = useState<Player[]>([
    { name: "You", position: 0, score: 0, avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400", correctAnswers: 0, totalQuestions: 0 },
    { name: "Player 2", position: 0, score: 0, avatar: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400", correctAnswers: 0, totalQuestions: 0 },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleScanQR = () => {
    setGameState("scanning");
  };

  const handleManualEntry = () => {
    if (qrCode.trim()) {
      loadChallenge();
    }
  };

  const loadChallenge = () => {
    const challenge = getRandomChallenge(difficulty);
    setCurrentChallenge(challenge);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameState("challenge");
  };

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentChallenge) return;

    const correct = selectedAnswer === currentChallenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Update streak
    if (correct) {
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    // Update player stats
    setTimeout(() => {
      const newPlayers = [...players];
      const player = newPlayers[currentPlayer];
      
      player.totalQuestions += 1;
      
      if (correct) {
        player.correctAnswers += 1;
        // Ladder climb - more points for harder questions and streaks
        const baseMove = 3;
        const streakBonus = streak >= 3 ? 2 : streak >= 2 ? 1 : 0;
        const difficultyBonus = currentChallenge.difficulty === "advanced" ? 2 : currentChallenge.difficulty === "intermediate" ? 1 : 0;
        
        player.position += baseMove + streakBonus + difficultyBonus;
        player.score += currentChallenge.points + (streakBonus * 5);
      } else {
        // Snake slide
        player.position = Math.max(0, player.position - 2);
      }
      
      setPlayers(newPlayers);
      setGameState("result");
    }, 1500);
  };

  const handleNextTurn = () => {
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setGameState("setup");
    setCurrentChallenge(null);
    setSelectedAnswer(null);
    setShowResult(false);
    
    // Check for winner
    if (players.some(p => p.position >= 100)) {
      setGameState("leaderboard");
    }
  };

  const handleChangeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setGameState("setup");
  };

  // Setup Screen
  if (gameState === "setup") {
    return (
      <div className="space-y-6 sm:space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl">MILBoard</h1>
                <p className="text-muted-foreground">
                  Media Literacy Board Game
                </p>
              </div>
            </div>
            <Button
              onClick={() => setGameState("difficulty")}
              variant="outline"
              className="rounded-xl glass-panel border-2 self-start sm:self-auto"
            >
              <Target className="w-4 h-4 mr-2" />
              Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          </div>
        </motion.div>

        {/* How to Play */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 sm:p-8 glass-panel bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl sm:text-2xl">How to Play</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  num: 1,
                  title: "Roll & Move",
                  desc: "Roll dice and move on the physical board",
                  gradient: "from-purple-500 to-blue-500"
                },
                {
                  num: 2,
                  title: "Scan QR Code",
                  desc: "Scan the code on your landing square",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  num: 3,
                  title: "Answer Challenge",
                  desc: "Test your media literacy skills",
                  gradient: "from-cyan-500 to-green-500"
                },
                {
                  num: 4,
                  title: "Climb or Slide",
                  desc: "Correct = Ladder ↑ | Wrong = Snake ↓",
                  gradient: "from-green-500 to-yellow-500"
                }
              ].map((step) => (
                <motion.div
                  key={step.num}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + step.num * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl glass-panel hover:soft-glow transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 text-white`}>
                    {step.num}
                  </div>
                  <div>
                    <p className="mb-1">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-100/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-900 dark:text-green-100 mb-1">
                    <strong>Streak Bonus!</strong>
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Answer 2+ correct in a row for extra moves
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-100/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-900 dark:text-purple-100 mb-1">
                    <strong>Difficulty Matters!</strong>
                  </p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Harder questions = more points & moves
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Goal:</strong> First player to reach square 100 wins! Learn critical thinking skills as you play.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Current Players */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 sm:p-8 glass-panel">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <h2 className="text-xl sm:text-2xl">Players</h2>
              </div>
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Streak: {streak}</span>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`p-4 rounded-xl glass-panel ${
                    index === currentPlayer ? "ring-2 ring-purple-500 soft-glow" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p>{player.name}</p>
                        {index === currentPlayer && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                            Turn
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Position: {player.position}/100</span>
                        <span>•</span>
                        <span>Score: {player.score}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={player.position} className="h-2" />
                    {player.totalQuestions > 0 && (
                      <p className="text-xs text-muted-foreground text-center">
                        Accuracy: {Math.round((player.correctAnswers / player.totalQuestions) * 100)}%
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center p-6 rounded-xl glass-panel mb-4">
              <p className="text-lg mb-2">
                <strong>{players[currentPlayer].name}'s Turn</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Roll the dice on the physical board, then scan your square's QR code
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleScanQR}
                className="w-full h-14 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
              >
                <Scan className="w-5 h-5 mr-2" />
                Scan QR Code
              </Button>
              <Button
                onClick={() => setGameState("scanning")}
                variant="outline"
                className="w-full h-14 rounded-xl glass-panel border-2"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Enter Code
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setGameState("leaderboard")}
            variant="outline"
            className="h-12 rounded-xl glass-panel border-2"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>
          <Button
            onClick={loadChallenge}
            variant="outline"
            className="h-12 rounded-xl glass-panel border-2"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Demo
          </Button>
        </div>
      </div>
    );
  }

  // Difficulty Selection
  if (gameState === "difficulty") {
    return (
      <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl mb-2">Choose Difficulty</h1>
            <p className="text-muted-foreground">
              Higher difficulty = more points & bigger moves
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              level: "beginner" as Difficulty,
              icon: Star,
              title: "Beginner",
              desc: "Perfect for learning the basics",
              points: "10 pts",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              level: "intermediate" as Difficulty,
              icon: Target,
              title: "Intermediate",
              desc: "Test your growing knowledge",
              points: "15 pts",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              level: "advanced" as Difficulty,
              icon: Award,
              title: "Advanced",
              desc: "Master-level challenges",
              points: "20-25 pts",
              gradient: "from-purple-500 to-pink-500"
            }
          ].map((diff, index) => (
            <motion.div
              key={diff.level}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleChangeDifficulty(diff.level)}
                className={`w-full p-6 rounded-xl glass-panel border-2 text-left transition-all hover:soft-glow ${
                  difficulty === diff.level ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${diff.gradient}`}>
                    <diff.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl">{diff.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {diff.points}
                      </Badge>
                      {difficulty === diff.level && (
                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{diff.desc}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={() => setGameState("setup")}
          variant="outline"
          className="w-full h-12 rounded-xl glass-panel border-2"
        >
          ← Back to Game
        </Button>
      </div>
    );
  }

  // Scanning Screen
  if (gameState === "scanning") {
    return (
      <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
              <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl">Scan QR Code</h1>
              <p className="text-muted-foreground">
                Load your challenge
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 sm:p-12 glass-panel">
            <div className="max-w-md mx-auto text-center space-y-6">
              {/* QR Scanner Placeholder */}
              <div className="aspect-square rounded-2xl glass-panel border-4 border-dashed border-purple-500 flex items-center justify-center mb-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <QrCode className="w-24 h-24 text-purple-600 dark:text-purple-400 relative z-10" />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-muted-foreground">or</span>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Enter QR code (e.g., MIL-B1)"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  className="h-12 rounded-xl glass-panel border-2 text-center text-lg"
                />
                <Button
                  onClick={handleManualEntry}
                  disabled={!qrCode.trim()}
                  className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
                >
                  Load Challenge
                </Button>
              </div>

              <Button
                onClick={() => setGameState("setup")}
                variant="ghost"
                className="w-full"
              >
                ← Back to Game
              </Button>

              {/* Demo Button */}
              <div className="pt-6">
                <Button
                  onClick={loadChallenge}
                  variant="outline"
                  className="w-full rounded-xl glass-panel border-2"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Demo Challenge
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Challenge Screen - continued in next message due to length
  if (gameState === "challenge") {
    return (
      <div className="space-y-6 sm:space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl">Challenge</h1>
                <p className="text-muted-foreground">
                  {players[currentPlayer].name}'s Turn
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1.5">
                {currentChallenge?.category}
              </Badge>
              <Badge className={`text-sm px-3 py-1.5 ${
                currentChallenge?.difficulty === "advanced" ? "bg-purple-500" :
                currentChallenge?.difficulty === "intermediate" ? "bg-blue-500" :
                "bg-green-500"
              } text-white border-0`}>
                {currentChallenge?.difficulty}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1.5">
                {currentChallenge?.points} pts
              </Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 sm:p-8 glass-panel">
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100 border-0">
                  {currentChallenge?.type === "quiz" ? "Quiz Question" : 
                   currentChallenge?.type === "true-false" ? "True/False" : "Scenario"}
                </Badge>
                {streak > 0 && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    🔥 Streak: {streak}
                  </Badge>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl mb-2">{currentChallenge?.question}</h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentChallenge?.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 sm:p-6 rounded-xl glass-panel border-2 text-left transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentChallenge.correctAnswer
                          ? "border-green-500 bg-green-100/50 dark:bg-green-900/20"
                          : "border-red-500 bg-red-100/50 dark:bg-red-900/20"
                        : "border-purple-500 soft-glow"
                      : showResult && index === currentChallenge.correctAnswer
                      ? "border-green-500 bg-green-100/50 dark:bg-green-900/20"
                      : "border-border hover:border-purple-500/50"
                  } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                  whileHover={!showResult ? { x: 4 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentChallenge.correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-purple-500 text-white"
                        : showResult && index === currentChallenge.correctAnswer
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {showResult && index === currentChallenge.correctAnswer ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : showResult && selectedAnswer === index && index !== currentChallenge.correctAnswer ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        currentChallenge.type === "true-false" ? 
                          (index === 0 ? "T" : "F") :
                          String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className={`p-6 rounded-xl mb-6 ${
                    isCorrect
                      ? "bg-green-100/50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800"
                      : "bg-red-100/50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`mb-2 ${
                        isCorrect ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"
                      }`}>
                        {isCorrect ? "✓ Correct! Well done!" : "✗ Incorrect. Learn from this:"}
                      </p>
                      <p className={`text-sm ${
                        isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
                      }`}>
                        {currentChallenge?.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextTurn}
                className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
              >
                Continue to Next Turn →
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    );
  }

  // Result Screen
  if (gameState === "result") {
    const player = players[currentPlayer];
    const baseMove = isCorrect ? 3 : -2;
    const streakBonus = isCorrect && streak >= 3 ? 2 : isCorrect && streak >= 2 ? 1 : 0;
    const difficultyBonus = isCorrect && currentChallenge?.difficulty === "advanced" ? 2 : 
                           isCorrect && currentChallenge?.difficulty === "intermediate" ? 1 : 0;
    const totalMove = baseMove + streakBonus + difficultyBonus;

    return (
      <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <Card className="p-8 sm:p-12 glass-panel text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              {isCorrect ? (
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 soft-glow mb-4">
                  <TrendingUp className="w-16 h-16 text-white" />
                </div>
              ) : (
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 soft-glow mb-4">
                  <TrendingDown className="w-16 h-16 text-white" />
                </div>
              )}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl mb-4"
            >
              {isCorrect ? "🎉 Climb the Ladder!" : "🐍 Down the Snake!"}
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-xl text-muted-foreground mb-4">
                {isCorrect 
                  ? `${player.name} moves forward ${Math.abs(totalMove)} spaces!`
                  : `${player.name} slides back ${Math.abs(totalMove)} spaces.`
                }
              </p>
              {isCorrect && (streakBonus > 0 || difficultyBonus > 0) && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {streakBonus > 0 && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      🔥 Streak Bonus: +{streakBonus}
                    </Badge>
                  )}
                  {difficultyBonus > 0 && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      ⭐ Difficulty Bonus: +{difficultyBonus}
                    </Badge>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8"
            >
              <div className="p-6 rounded-xl glass-panel">
                <p className="text-3xl mb-2">{player.position}</p>
                <p className="text-sm text-muted-foreground">Position/100</p>
              </div>
              <div className="p-6 rounded-xl glass-panel">
                <p className="text-3xl mb-2">{player.score}</p>
                <p className="text-sm text-muted-foreground">Total Score</p>
              </div>
            </motion.div>

            <Button
              onClick={handleNextTurn}
              className="gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl px-8 h-12"
            >
              Next Player's Turn →
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Leaderboard Screen
  if (gameState === "leaderboard") {
    const sortedPlayers = [...players].sort((a, b) => b.position - a.position || b.score - a.score);
    const winner = sortedPlayers[0].position >= 100 ? sortedPlayers[0] : null;

    return (
      <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl">
                {winner ? "🎉 We Have a Winner!" : "Leaderboard"}
              </h1>
              <p className="text-muted-foreground">
                {winner ? `${winner.name} mastered media literacy!` : "Current game standings"}
              </p>
            </div>
          </div>
        </motion.div>

        {winner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="p-8 rounded-2xl glass-panel bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 text-center mb-6"
          >
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 soft-glow mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl mb-2">{winner.name} Wins!</h2>
            <p className="text-muted-foreground mb-4">
              Final Score: {winner.score} points | Accuracy: {Math.round((winner.correctAnswers / winner.totalQuestions) * 100)}%
            </p>
          </motion.div>
        )}

        <Card className="p-6 sm:p-8 glass-panel">
          <div className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl glass-panel ${
                  index === 0 ? "ring-2 ring-yellow-500 soft-glow" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white" :
                    index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-500 text-white" :
                    index === 2 ? "bg-gradient-to-br from-orange-700 to-orange-800 text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {index === 0 ? <Trophy className="w-6 h-6" /> : `#${index + 1}`}
                  </div>

                  <Avatar className="w-12 h-12">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="mb-1">{player.name}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>Position: {player.position}/100</span>
                      <span>•</span>
                      <span>Score: {player.score}</span>
                      {player.totalQuestions > 0 && (
                        <>
                          <span>•</span>
                          <span>
                            {Math.round((player.correctAnswers / player.totalQuestions) * 100)}% Accuracy
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Button
              onClick={() => setGameState("setup")}
              variant="outline"
              className="w-full h-12 rounded-xl glass-panel border-2"
            >
              ← Back to Game
            </Button>
            {winner && (
              <Button
                onClick={() => {
                  setPlayers(players.map(p => ({
                    ...p,
                    position: 0,
                    score: 0,
                    correctAnswers: 0,
                    totalQuestions: 0
                  })));
                  setCurrentPlayer(0);
                  setStreak(0);
                  setGameState("setup");
                }}
                className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90"
              >
                🎮 Play Again
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
