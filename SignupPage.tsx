import { motion } from "motion/react";
import { Shield, Mail, Lock, User, Briefcase, GraduationCap, Users, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Card } from "./ui/card";

interface SignupPageProps {
  onSignup: (userData: { name: string; email: string; password: string; profileType: string }) => void;
  onSwitchToLogin: () => void;
}

const profileTypes = [
  {
    id: "individual",
    icon: User,
    title: "Individual",
    description: "Personal use and fact-checking",
    color: "from-purple-500 to-blue-500"
  },
  {
    id: "educator",
    icon: GraduationCap,
    title: "Educator",
    description: "Teaching media literacy",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "journalist",
    icon: Briefcase,
    title: "Journalist",
    description: "Professional news verification",
    color: "from-cyan-500 to-green-500"
  },
  {
    id: "organization",
    icon: Globe,
    title: "Organization",
    description: "Business or NGO use",
    color: "from-green-500 to-yellow-500"
  }
];

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileType, setProfileType] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!profileType) {
      alert("Please select a profile type");
      return;
    }
    onSignup({ name, email, password, profileType });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 relative overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 text-white text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-6 rounded-3xl bg-white/20 backdrop-blur-xl mb-8"
          >
            <Shield className="w-16 h-16" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl mb-4"
          >
            Join TruthShield
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg opacity-90"
          >
            Start your journey towards a more informed digital life
          </motion.p>

          {/* Step Indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center gap-3"
          >
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? "w-12 bg-white" : "w-8 bg-white/40"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden text-center">
            <div className="inline-flex p-4 rounded-2xl gradient-bg mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl">Join TruthShield</h2>
          </div>

          {step === 1 ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl mb-2 hidden lg:block">Create Account</h2>
                <p className="text-muted-foreground">
                  Sign up to start verifying information with AI
                </p>
                <div className="flex gap-2 mt-4 lg:hidden">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full flex-1 transition-all ${
                        s === step ? "bg-purple-600" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 rounded-xl glass-panel border-2 focus:soft-glow transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-xl glass-panel border-2 focus:soft-glow transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 rounded-xl glass-panel border-2 focus:soft-glow transition-all"
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">At least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-12 rounded-xl glass-panel border-2 focus:soft-glow transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="text-sm">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border mt-1" required />
                    <span className="text-muted-foreground">
                      I agree to the{" "}
                      <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity"
                >
                  Continue
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="mb-4 -ml-2"
                >
                  ← Back
                </Button>
                <h2 className="text-3xl mb-2">Choose Your Profile</h2>
                <p className="text-muted-foreground">
                  Select the profile type that best describes you
                </p>
                <div className="flex gap-2 mt-4 lg:hidden">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full flex-1 transition-all ${
                        s === step ? "bg-purple-600" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {profileTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        profileType === type.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                          : "border-border hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                      onClick={() => setProfileType(type.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${type.color}`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            profileType === type.id
                              ? "border-purple-500 bg-purple-500"
                              : "border-border"
                          }`}
                        >
                          {profileType === type.id && (
                            <svg
                              className="w-full h-full text-white p-0.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!profileType}
                className="w-full h-12 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Create Account
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
