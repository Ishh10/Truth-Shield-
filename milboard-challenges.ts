export interface Challenge {
  id: string;
  type: "quiz" | "scenario" | "true-false";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
}

export const challenges: Challenge[] = [
  // BEGINNER LEVEL
  {
    id: "b1",
    type: "quiz",
    question: "Before sharing a shocking headline on social media, what should you do first?",
    options: [
      "Share it immediately to warn others",
      "Verify the source and check multiple outlets",
      "Add your opinion and then share",
      "Only share if it has many likes"
    ],
    correctAnswer: 1,
    explanation: "Always verify information from credible sources before sharing. Check if reputable news outlets are reporting the same story and look for the original source.",
    category: "Source Verification",
    difficulty: "beginner",
    points: 10
  },
  {
    id: "b2",
    type: "true-false",
    question: "TRUE or FALSE: If many people are sharing a post, it must be true.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "FALSE. Popularity doesn't equal accuracy. Misinformation often spreads rapidly because it's sensational or confirms people's biases. Always verify independently.",
    category: "Critical Thinking",
    difficulty: "beginner",
    points: 10
  },
  {
    id: "b3",
    type: "scenario",
    question: "You receive a message claiming a celebrity died. The message says 'Share this before it's deleted!' What's the red flag?",
    options: [
      "Nothing suspicious, celebrities die",
      "The urgency to share before deletion",
      "The celebrity's name",
      "It came from a friend"
    ],
    correctAnswer: 1,
    explanation: "Urgency tactics ('share before deleted', 'act now') are classic signs of misinformation. Legitimate news doesn't need this pressure. Always pause and verify.",
    category: "Emotional Manipulation",
    difficulty: "beginner",
    points: 10
  },
  {
    id: "b4",
    type: "quiz",
    question: "Which of these is the MOST reliable source for breaking news?",
    options: [
      "A viral social media post",
      "Established news organization with citations",
      "Anonymous blog post",
      "WhatsApp forward"
    ],
    correctAnswer: 1,
    explanation: "Established news organizations follow journalistic standards, fact-check, and cite sources. Social media posts and forwards lack verification and accountability.",
    category: "Source Credibility",
    difficulty: "beginner",
    points: 10
  },
  {
    id: "b5",
    type: "true-false",
    question: "TRUE or FALSE: Websites with .org domains are always trustworthy.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "FALSE. Anyone can register a .org domain. Always evaluate content quality, author credentials, citations, and cross-reference with other sources.",
    category: "Digital Literacy",
    difficulty: "beginner",
    points: 10
  },

  // INTERMEDIATE LEVEL
  {
    id: "i1",
    type: "scenario",
    question: "An image shows a natural disaster with text saying it happened yesterday in your country. What should you check?",
    options: [
      "If the image has good quality",
      "How many people shared it",
      "Reverse image search to verify when/where it was taken",
      "The emotional impact of the image"
    ],
    correctAnswer: 2,
    explanation: "Reverse image search (Google Images, TinEye) helps verify if images are real, recent, or taken from different contexts. Old images are often recycled for false stories.",
    category: "Image Verification",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: "i2",
    type: "quiz",
    question: "A post claims '9 out of 10 doctors agree!' but doesn't cite a study. This is an example of:",
    options: [
      "Expert opinion",
      "Statistical manipulation without evidence",
      "Medical advice",
      "Scientific consensus"
    ],
    correctAnswer: 1,
    explanation: "Vague claims without source citations are used to appear authoritative without actual evidence. Always ask: which study? which doctors? where was it published?",
    category: "False Authority",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: "i3",
    type: "scenario",
    question: "You see a video that makes you very angry about a political issue. Before reacting, you should:",
    options: [
      "Share it immediately so others know",
      "Comment your angry feelings",
      "Pause, fact-check, and consider the source's bias",
      "Tag all your friends"
    ],
    correctAnswer: 2,
    explanation: "Emotional content is designed to provoke immediate reactions and bypass critical thinking. Pausing to verify and considering bias prevents spreading misinformation.",
    category: "Emotional Response",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: "i4",
    type: "quiz",
    question: "What does 'confirmation bias' mean in the context of misinformation?",
    options: [
      "Confirming facts before sharing",
      "Believing information that supports your existing views",
      "Getting confirmation from multiple sources",
      "Bias against certain news confirmations"
    ],
    correctAnswer: 1,
    explanation: "Confirmation bias makes us more likely to believe and share information that confirms what we already think, even if it's false. Be extra skeptical of information you want to be true.",
    category: "Cognitive Biases",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: "i5",
    type: "scenario",
    question: "A headline reads 'Study Proves Coffee Cures Cancer!' What should you investigate?",
    options: [
      "Just believe it - it says 'study proves'",
      "Check the actual study, sample size, and peer review",
      "Share it because you like coffee",
      "Only read the headline"
    ],
    correctAnswer: 1,
    explanation: "Sensational headlines often misrepresent studies. Check: Was it peer-reviewed? What was the sample size? Does the study actually support the headline's claim?",
    category: "Scientific Literacy",
    difficulty: "intermediate",
    points: 15
  },
  {
    id: "i6",
    type: "quiz",
    question: "Which is a sign of a potentially biased news source?",
    options: [
      "Presents multiple perspectives",
      "Uses charged emotional language consistently",
      "Cites specific sources and data",
      "Clearly separates news from opinion"
    ],
    correctAnswer: 1,
    explanation: "Consistent use of charged emotional language, one-sided reporting, and lack of diverse perspectives indicate bias. Quality sources strive for balanced, factual reporting.",
    category: "Media Bias",
    difficulty: "intermediate",
    points: 15
  },

  // ADVANCED LEVEL
  {
    id: "a1",
    type: "scenario",
    question: "You find a deepfake video of a politician. The video quality is excellent and looks real. How can you verify it's fake?",
    options: [
      "You can't - if it looks real, it is real",
      "Check for unnatural blinking, lighting inconsistencies, and verify with official sources",
      "Just assume all political videos are fake",
      "Share it and let others decide"
    ],
    correctAnswer: 1,
    explanation: "Deepfakes can be detected through: unnatural facial movements, lighting/shadow inconsistencies, audio sync issues, and verification with official sources and fact-checkers.",
    category: "Deepfake Detection",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a2",
    type: "quiz",
    question: "What is 'astroturfing' in the context of online misinformation?",
    options: [
      "Planting fake grass in photos",
      "Creating fake grassroots movements using bots and paid accounts",
      "Environmental misinformation",
      "A type of gardening forum"
    ],
    correctAnswer: 1,
    explanation: "Astroturfing creates the illusion of widespread public support using fake accounts, bots, and coordinated campaigns. It manipulates perception of public opinion.",
    category: "Coordinated Manipulation",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a3",
    type: "scenario",
    question: "You notice 50 similar accounts posting the exact same message about a product. This suggests:",
    options: [
      "The product is really good",
      "Coordinated bot activity or paid campaign",
      "Coincidence - people just agree",
      "Viral marketing success"
    ],
    correctAnswer: 1,
    explanation: "Identical messages from multiple accounts indicate bot networks or coordinated campaigns. Real users express opinions differently. This is a manipulation tactic.",
    category: "Bot Detection",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a4",
    type: "quiz",
    question: "What is the primary goal of 'prebunking' in fighting misinformation?",
    options: [
      "Debunking false claims after they spread",
      "Preparing people to recognize manipulation tactics before exposure",
      "Blocking all suspicious content",
      "Reporting fake news to authorities"
    ],
    correctAnswer: 1,
    explanation: "Prebunking inoculates people against misinformation by teaching them manipulation tactics in advance, making them less susceptible when they encounter false claims.",
    category: "Advanced Prevention",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a5",
    type: "scenario",
    question: "An AI-generated article has perfect grammar and cites real studies out of context. How do you identify this?",
    options: [
      "Good grammar means it's trustworthy",
      "Verify study conclusions match their actual findings and check author credentials",
      "If it cites studies, it must be accurate",
      "AI can't write that well"
    ],
    correctAnswer: 1,
    explanation: "AI can generate convincing text and cite real studies misleadingly. Verify: Do study conclusions match the claims? Are quotes in context? Does the author exist and have expertise?",
    category: "AI-Generated Content",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a6",
    type: "quiz",
    question: "What is 'context collapse' in social media misinformation?",
    options: [
      "When servers crash from too much content",
      "When content meant for one audience is shared with others, changing its meaning",
      "Losing context in long threads",
      "Compressing images loses quality"
    ],
    correctAnswer: 1,
    explanation: "Context collapse occurs when content intended for specific contexts is shared widely, losing important nuance or being misinterpreted entirely. Always consider original context.",
    category: "Social Media Dynamics",
    difficulty: "advanced",
    points: 20
  },
  {
    id: "a7",
    type: "scenario",
    question: "You see a graph supporting a political claim, but the Y-axis doesn't start at zero, exaggerating differences. This is:",
    options: [
      "Standard graphing practice",
      "Data visualization manipulation",
      "Not important if the data is real",
      "Just a stylistic choice"
    ],
    correctAnswer: 1,
    explanation: "Manipulated Y-axis scales, cherry-picked date ranges, and misleading chart types are common tactics to distort data. Always examine graph scales and methodology.",
    category: "Data Literacy",
    difficulty: "advanced",
    points: 20
  },

  // EXPERT LEVEL
  {
    id: "e1",
    type: "quiz",
    question: "In the context of disinformation campaigns, what is 'SEO poisoning'?",
    options: [
      "Using toxic language in search results",
      "Manipulating search rankings to promote false information",
      "Poisoning search algorithms with viruses",
      "Environmental misinformation about SEO"
    ],
    correctAnswer: 1,
    explanation: "SEO poisoning manipulates search engine rankings to make false information appear at the top of results, exploiting trust in search engines to spread misinformation.",
    category: "Information Warfare",
    difficulty: "advanced",
    points: 25
  },
  {
    id: "e2",
    type: "scenario",
    question: "A news story has been updated 5 times in 24 hours with major changes to key facts. This indicates:",
    options: [
      "Excellent real-time journalism",
      "Possible initial misinformation or breaking story with emerging facts - approach with caution",
      "Definitely fake news",
      "Normal news cycle"
    ],
    correctAnswer: 1,
    explanation: "Frequent major updates may indicate: rushed initial reporting, emerging story complexity, or correction of errors. Wait for story stabilization and compare multiple sources.",
    category: "News Cycle Analysis",
    difficulty: "advanced",
    points: 25
  }
];

export function getChallengesByDifficulty(difficulty: Challenge["difficulty"]): Challenge[] {
  return challenges.filter(c => c.difficulty === difficulty);
}

export function getRandomChallenge(difficulty?: Challenge["difficulty"]): Challenge {
  const pool = difficulty ? getChallengesByDifficulty(difficulty) : challenges;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id);
}
