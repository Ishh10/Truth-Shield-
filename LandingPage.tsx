import { motion } from "motion/react";
import { Shield, Scan, Brain, CheckCircle, MessageSquare, Mic, DollarSign, Globe, Compass, ArrowRight, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
}

export function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: "ChatShield",
      description: "Detect misinformation in conversations and messages with AI-powered analysis.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Mic,
      title: "VoiceShield",
      description: "Analyze speech patterns and verify audio authenticity in real-time.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "MoneyShield",
      description: "Protect yourself from fraud and scams with advanced detection algorithms.",
      gradient: "from-cyan-500 to-green-500"
    },
    {
      icon: Globe,
      title: "CommunityShield",
      description: "Verify news and social media posts with community-powered fact-checking.",
      gradient: "from-green-500 to-yellow-500"
    },
    {
      icon: Compass,
      title: "TruthQuest",
      description: "Navigate the information landscape with AI-powered insights and guidance.",
      gradient: "from-yellow-500 to-red-500"
    }
  ];

  const steps = [
    {
      icon: Scan,
      title: "Scan",
      description: "Input text, upload files, or record audio for analysis"
    },
    {
      icon: Brain,
      title: "Analyze",
      description: "Our AI processes and evaluates the content using advanced algorithms"
    },
    {
      icon: CheckCircle,
      title: "Verify",
      description: "Receive a detailed truth score and actionable recommendations"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Journalist",
      content: "TruthShield has become an essential tool in my workflow. It helps me verify sources quickly and accurately.",
      avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1OTU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Marcus Johnson",
      role: "Educator",
      content: "A game-changer for teaching media literacy. My students love the intuitive interface and clear explanations.",
      avatar: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MDU1OTg2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      content: "Finally, a reliable way to fact-check information before sharing. TruthShield gives me confidence in what I post.",
      avatar: "https://images.unsplash.com/photo-1606567111509-3989810b24f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwY2xlYW58ZW58MXx8fHwxNzYwNjI0NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-pink-100/50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-pink-950/30" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Powered by Advanced AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-tight">
              Detect Truth.
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Defend Clarity.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Navigate the digital world with confidence. TruthShield uses cutting-edge AI to help you identify misinformation and make informed decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl px-8 group w-full sm:w-auto"
              >
                Start Verifying
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => onNavigate("about")}
                variant="outline"
                size="lg"
                className="rounded-xl px-8 glass-panel border-2 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="relative mt-16 sm:mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Shield, label: "AI-Powered" },
                  { icon: Zap, label: "Real-time" },
                  { icon: Lock, label: "Secure" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="p-4 sm:p-6 glass-panel hover:soft-glow transition-all duration-300 cursor-pointer">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-purple-600 dark:text-purple-400" />
                      <p className="text-sm sm:text-base">{item.label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Comprehensive Protection Suite
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Five powerful AI modules designed to keep you safe from misinformation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 sm:p-8 glass-panel hover:soft-glow transition-all duration-300 h-full group cursor-pointer">
                  <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">How It Works</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to verify any information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 -z-10" />
                )}
                <div className="inline-flex p-4 sm:p-6 rounded-2xl glass-panel soft-glow mb-4 sm:mb-6">
                  <step.icon className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Trusted by Thousands</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about TruthShield
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 sm:p-8 glass-panel hover:soft-glow transition-all duration-300 h-full">
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl gradient-bg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl tracking-tight">TruthShield</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering truth in the digital age with AI-powered verification.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("features")} className="hover:text-foreground transition-colors">Features</button></li>
                <li><button onClick={() => onNavigate("pricing")} className="hover:text-foreground transition-colors">Pricing</button></li>
                <li><button onClick={() => onNavigate("api")} className="hover:text-foreground transition-colors">API</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("about")} className="hover:text-foreground transition-colors">About</button></li>
                <li><button onClick={() => onNavigate("blog")} className="hover:text-foreground transition-colors">Blog</button></li>
                <li><button onClick={() => onNavigate("careers")} className="hover:text-foreground transition-colors">Careers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("privacy")} className="hover:text-foreground transition-colors">Privacy</button></li>
                <li><button onClick={() => onNavigate("terms")} className="hover:text-foreground transition-colors">Terms</button></li>
                <li><button onClick={() => onNavigate("security")} className="hover:text-foreground transition-colors">Security</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 TruthShield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
