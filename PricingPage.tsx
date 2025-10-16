import { motion } from "motion/react";
import { Check, ArrowLeft, Zap, Shield, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface PricingPageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function PricingPage({ onBack, onGetStarted }: PricingPageProps) {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "50 verifications per month",
        "Basic ChatShield access",
        "Community fact-checking",
        "Email support",
        "Educational resources"
      ],
      icon: Shield,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Pro",
      price: "₹749",
      period: "per month",
      description: "For power users and professionals",
      popular: true,
      features: [
        "Unlimited verifications",
        "All Shield modules",
        "Priority support",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "MILBoard advanced challenges"
      ],
      icon: Zap,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For organizations and teams",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "Custom AI models",
        "Team management",
        "White-label options",
        "SLA guarantees",
        "Training & onboarding"
      ],
      icon: Sparkles,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-8 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl mb-6">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground">
              Start fighting misinformation today. Upgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className={`p-8 glass-panel h-full flex flex-col ${
                  plan.popular ? "ring-2 ring-purple-500 soft-glow" : ""
                }`}>
                  {plan.popular && (
                    <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 self-start">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${plan.gradient} mb-6 self-start`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onGetStarted}
                    className={`w-full h-12 rounded-xl ${
                      plan.popular
                        ? "gradient-bg text-white hover:opacity-90"
                        : "glass-panel border-2"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 glass-panel max-w-2xl mx-auto">
              <h3 className="text-2xl mb-4">All plans include:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>No credit card required for Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Privacy-focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Regular updates</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
