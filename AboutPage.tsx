import { motion } from "motion/react";
import { Shield, Users, Target, Heart, ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex p-4 rounded-2xl gradient-bg mb-6">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl mb-6">About TruthShield</h1>
            <p className="text-xl text-muted-foreground">
              Empowering truth in the digital age through AI-powered verification
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 glass-panel">
              <h2 className="text-2xl mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TruthShield was founded on the belief that everyone deserves access to accurate information. 
                In an era of widespread misinformation, we're building AI-powered tools to help people 
                verify content, detect fraud, and make informed decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines advanced machine learning with media literacy education to create 
                a comprehensive solution for digital safety and information integrity.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Our Vision",
                  description: "A world where misinformation cannot thrive and truth is accessible to all"
                },
                {
                  icon: Users,
                  title: "Our Team",
                  description: "AI researchers, fact-checkers, and educators working together"
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  description: "Transparency, accuracy, education, and user privacy"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="p-6 glass-panel h-full hover:soft-glow transition-all">
                    <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 inline-flex mb-4">
                      <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-8 glass-panel bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <h2 className="text-2xl mb-4">Join Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for passionate individuals to join our team and help us combat misinformation.
              </p>
              <Button className="gradient-bg text-white hover:opacity-90 rounded-xl">
                View Open Positions
              </Button>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
