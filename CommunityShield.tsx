import { motion } from "motion/react";
import { Globe, CheckCircle, AlertTriangle, HelpCircle, ThumbsUp, MessageSquare, Share2, Flag } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { toast } from "sonner";

export function CommunityShield() {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleSubmitForReview = () => {
    toast.success("Feature coming soon! Submit your content for verification.");
    setShowSubmitDialog(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      toast.info("More articles loaded!");
      setLoadingMore(false);
    }, 1000);
  };

  const newsItems = [
    {
      id: 1,
      title: "Local Government Announces New Infrastructure Project",
      source: "City News Network",
      image: "https://images.unsplash.com/photo-1606567111509-3989810b24f7?w=400",
      verificationStatus: "verified",
      truthScore: 94,
      votes: 1247,
      comments: 89,
      timestamp: "2 hours ago",
      summary: "Official announcement confirmed through multiple government sources. Project details match public records."
    },
    {
      id: 2,
      title: "Miracle Diet Pill Helps You Lose 50 Pounds in One Week",
      source: "Unknown Wellness Blog",
      image: "https://images.unsplash.com/photo-1501023956373-055b874f2929?w=400",
      verificationStatus: "false",
      truthScore: 12,
      votes: 2341,
      comments: 234,
      timestamp: "5 hours ago",
      summary: "Claim contradicts medical consensus. No scientific evidence supports these results. Multiple red flags detected."
    },
    {
      id: 3,
      title: "Tech Company Announces Major Product Update",
      source: "Tech Industry Times",
      image: "https://images.unsplash.com/photo-1686749115331-e117fb58b46c?w=400",
      verificationStatus: "uncertain",
      truthScore: 67,
      votes: 892,
      comments: 156,
      timestamp: "1 day ago",
      summary: "Some details confirmed by official sources, but specific claims require additional verification. Awaiting company statement."
    },
    {
      id: 4,
      title: "Study Shows Exercise Improves Mental Health",
      source: "Health Research Journal",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400",
      verificationStatus: "verified",
      truthScore: 91,
      votes: 3156,
      comments: 445,
      timestamp: "2 days ago",
      summary: "Peer-reviewed research published in reputable journal. Findings align with established medical knowledge."
    }
  ];

  const getStatusBadge = (status: string, score: number) => {
    switch (status) {
      case "verified":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-900 dark:text-green-100">Verified</span>
          </div>
        );
      case "false":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm text-red-900 dark:text-red-100">False</span>
          </div>
        );
      case "uncertain":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <HelpCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm text-yellow-900 dark:text-yellow-100">Uncertain</span>
          </div>
        );
      default:
        return null;
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-yellow-500">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">CommunityShield</h1>
            <p className="text-muted-foreground">
              Community-powered news verification and fact-checking
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Articles Verified", value: "12,847" },
          { label: "Active Fact-Checkers", value: "3,421" },
          { label: "False Claims Flagged", value: "1,893" },
          { label: "Accuracy Rate", value: "96%" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="p-4 sm:p-6 glass-panel text-center">
              <p className="text-2xl sm:text-3xl mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* News Feed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl">Recent Verifications</h2>
          <Button 
            variant="outline" 
            className="rounded-xl glass-panel border-2"
            onClick={handleSubmitForReview}
          >
            <Flag className="w-4 h-4 mr-2" />
            Submit for Review
          </Button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden glass-panel hover:soft-glow transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="lg:col-span-3">
                    <div className="aspect-video lg:aspect-square w-full bg-muted rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-9 p-4 sm:p-6 pt-0 lg:pt-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.source} • {item.timestamp}
                        </p>
                      </div>
                      {getStatusBadge(item.verificationStatus, item.truthScore)}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <div className={`text-lg sm:text-xl ${
                            item.truthScore >= 80 ? "text-green-600 dark:text-green-400" :
                            item.truthScore >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                            "text-red-600 dark:text-red-400"
                          }`}>
                            {item.truthScore}
                          </div>
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            Truth Score
                          </span>
                        </div>

                        <div className="h-6 w-px bg-border" />

                        <button className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">{item.votes}</span>
                        </button>

                        <button className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">{item.comments}</span>
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl hover:bg-white/10"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl glass-panel border-2"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
