import { motion } from "motion/react";
import { ArrowLeft, Construction } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  onBack: () => void;
}

export function PlaceholderPage({ title, description, onBack }: PlaceholderPageProps) {
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
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="p-12 glass-panel">
            <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mb-6">
              <Construction className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl mb-4">{title}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {description || "This feature is coming soon! We're working hard to bring you the best experience."}
            </p>

            <div className="p-6 rounded-xl glass-panel bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Want to be notified when this feature launches? Sign up for our newsletter or follow us on social media for updates.
              </p>
            </div>

            <Button
              onClick={onBack}
              className="mt-8 gradient-bg text-white hover:opacity-90 rounded-xl px-8"
            >
              Return Home
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
