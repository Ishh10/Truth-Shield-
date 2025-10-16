// Advanced Misinformation Detection Algorithms

interface DetectionResult {
  score: number;
  confidence: number;
  flags: Array<{
    type: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    weight: number;
  }>;
  analysis: string;
}

// Comprehensive fake news and misinformation patterns database
const FAKE_NEWS_PATTERNS = {
  // Common fake news phrases and claims
  fabricatedClaims: [
    "government hiding", "secret cure", "they discovered", "scientists discovered",
    "new study reveals", "recent research shows", "experts confirm",
    "leaked document", "insider reveals", "confidential report",
    "banned in", "suppressed by", "censored information"
  ],
  
  // Emotional manipulation
  extremeEmotions: [
    "horrifying truth", "shocking revelation", "you won't believe",
    "mind-blowing", "jaw-dropping", "absolutely devastating",
    "miracle breakthrough", "game-changing", "life-changing",
    "terrifying reality", "scary truth", "frightening discovery"
  ],
  
  // Urgency and fear tactics
  urgencyTactics: [
    "act now", "share immediately", "before it's deleted", "being removed",
    "they're hiding this", "won't see this again", "limited time",
    "urgent warning", "breaking news", "just in", "developing story",
    "share before", "hurry", "don't wait", "time sensitive"
  ],
  
  // Conspiracy rhetoric
  conspiracyLanguage: [
    "wake up", "sheeple", "open your eyes", "think for yourself",
    "mainstream media lies", "fake news media", "deep state",
    "new world order", "illuminati", "they don't want you to know",
    "cover up", "conspiracy", "hidden agenda", "puppet masters",
    "controlled by", "brainwashed"
  ],
  
  // Unverifiable sources
  vagueAuthority: [
    "experts say", "studies show", "research proves", "scientists warn",
    "doctors recommend", "they say", "some people", "many believe",
    "it is said", "rumor has it", "word on the street", "sources say",
    "anonymous source", "undisclosed", "confidential source"
  ],
  
  // Political misinformation
  politicalDisinfo: [
    "rigged election", "voter fraud", "stolen votes", "fake ballots",
    "deep state operative", "crisis actor", "false flag",
    "government experiment", "controlled opposition"
  ],
  
  // Health misinformation
  healthDisinfo: [
    "miracle cure", "doctors hate this", "big pharma hiding",
    "natural remedy cures", "pharmaceutical conspiracy",
    "vaccine injury", "toxins in", "chemical in",
    "causes cancer", "prevents all diseases", "100% effective",
    "government poisoning", "deadly ingredient"
  ],
  
  // Clickbait patterns
  clickbait: [
    "you won't believe", "what happened next", "number 7 will",
    "this one trick", "hate him", "one simple trick",
    "doctors hate", "trainers hate", "this weird trick",
    "shocking result", "incredible transformation"
  ]
};

// ChatShield: Text Misinformation Detection
export function analyzeChatMessage(message: string): DetectionResult {
  const flags: DetectionResult["flags"] = [];
  let score = 100;
  let deductionReasons: string[] = [];
  
  const lowerMessage = message.toLowerCase();
  const messageLength = message.length;
  
  // Too short to analyze properly
  if (messageLength < 10) {
    return {
      score: 50,
      confidence: 30,
      flags: [{
        type: "Insufficient Content",
        description: "Message too short for reliable analysis",
        severity: "low",
        weight: 0
      }],
      analysis: "Message is too brief for comprehensive analysis. Please provide more context."
    };
  }
  
  // Check for fabricated claims
  let fabricatedCount = 0;
  FAKE_NEWS_PATTERNS.fabricatedClaims.forEach(pattern => {
    if (lowerMessage.includes(pattern)) {
      fabricatedCount++;
      deductionReasons.push(pattern);
    }
  });
  
  if (fabricatedCount > 0) {
    const weight = fabricatedCount * 12;
    flags.push({
      type: "Fabricated Claims Pattern",
      description: `Contains ${fabricatedCount} phrase(s) commonly found in fabricated news (e.g., "${deductionReasons[0]}")`,
      severity: fabricatedCount >= 3 ? "critical" : fabricatedCount >= 2 ? "high" : "medium",
      weight
    });
    score -= weight;
  }
  
  // Check for extreme emotional manipulation
  let emotionCount = 0;
  FAKE_NEWS_PATTERNS.extremeEmotions.forEach(pattern => {
    if (lowerMessage.includes(pattern)) emotionCount++;
  });
  
  if (emotionCount > 0) {
    const weight = emotionCount * 10;
    flags.push({
      type: "Extreme Emotional Manipulation",
      description: `Uses ${emotionCount} sensationalist phrase(s) designed to bypass critical thinking`,
      severity: emotionCount >= 3 ? "high" : "medium",
      weight
    });
    score -= weight;
  }
  
  // Check for urgency tactics
  let urgencyCount = 0;
  FAKE_NEWS_PATTERNS.urgencyTactics.forEach(pattern => {
    if (lowerMessage.includes(pattern)) urgencyCount++;
  });
  
  if (urgencyCount > 0) {
    const weight = urgencyCount * 9;
    flags.push({
      type: "Urgency & Fear Tactics",
      description: `Pressures immediate action with ${urgencyCount} urgency phrase(s) - common manipulation technique`,
      severity: urgencyCount >= 3 ? "critical" : urgencyCount >= 2 ? "high" : "medium",
      weight
    });
    score -= weight;
  }
  
  // Check for conspiracy rhetoric
  let conspiracyCount = 0;
  FAKE_NEWS_PATTERNS.conspiracyLanguage.forEach(pattern => {
    if (lowerMessage.includes(pattern)) conspiracyCount++;
  });
  
  if (conspiracyCount > 0) {
    const weight = conspiracyCount * 14;
    flags.push({
      type: "Conspiracy Theory Rhetoric",
      description: `Contains ${conspiracyCount} conspiracy theory indicator(s) - highly unreliable pattern`,
      severity: conspiracyCount >= 2 ? "critical" : "high",
      weight
    });
    score -= weight;
  }
  
  // Check for vague authority claims
  let vagueAuthorityCount = 0;
  let hasSpecificSource = false;
  
  FAKE_NEWS_PATTERNS.vagueAuthority.forEach(pattern => {
    if (lowerMessage.includes(pattern)) vagueAuthorityCount++;
  });
  
  // Check for specific sources
  const specificSources = [
    /https?:\/\/[^\s]+/g, // URLs
    /doi:\s*10\.\d+/i, // DOI numbers
    /according to (dr\.|professor|the|a specific)/i,
    /(university of|institute of|journal of)/i,
    /published in/i,
    /\b\d{4}\b.*study/i // Year + study
  ];
  
  specificSources.forEach(pattern => {
    if (pattern.test(message)) hasSpecificSource = true;
  });
  
  if (vagueAuthorityCount > 1 && !hasSpecificSource) {
    const weight = vagueAuthorityCount * 11;
    flags.push({
      type: "Vague Authority Claims",
      description: `Makes ${vagueAuthorityCount} unverifiable claim(s) without citing specific sources or studies`,
      severity: "high",
      weight
    });
    score -= weight;
  }
  
  // Check for political disinformation
  let politicalDisinfoCount = 0;
  FAKE_NEWS_PATTERNS.politicalDisinfo.forEach(pattern => {
    if (lowerMessage.includes(pattern)) politicalDisinfoCount++;
  });
  
  if (politicalDisinfoCount > 0) {
    const weight = politicalDisinfoCount * 18;
    flags.push({
      type: "Political Disinformation Markers",
      description: `Contains ${politicalDisinfoCount} phrase(s) associated with documented disinformation campaigns`,
      severity: "critical",
      weight
    });
    score -= weight;
  }
  
  // Check for health misinformation (extremely dangerous)
  let healthDisinfoCount = 0;
  FAKE_NEWS_PATTERNS.healthDisinfo.forEach(pattern => {
    if (lowerMessage.includes(pattern)) healthDisinfoCount++;
  });
  
  if (healthDisinfoCount > 0) {
    const weight = healthDisinfoCount * 20;
    flags.push({
      type: "CRITICAL: Health Misinformation",
      description: `Contains ${healthDisinfoCount} medically dangerous claim(s) - could cause serious harm`,
      severity: "critical",
      weight
    });
    score -= weight;
  }
  
  // Check for clickbait
  let clickbaitCount = 0;
  FAKE_NEWS_PATTERNS.clickbait.forEach(pattern => {
    if (lowerMessage.includes(pattern)) clickbaitCount++;
  });
  
  if (clickbaitCount > 0) {
    const weight = clickbaitCount * 8;
    flags.push({
      type: "Clickbait Patterns",
      description: `Uses ${clickbaitCount} clickbait phrase(s) - reduces credibility`,
      severity: "medium",
      weight
    });
    score -= weight;
  }
  
  // Check for excessive capitalization (shouting)
  const capsLetters = (message.match(/[A-Z]/g) || []).length;
  const totalLetters = (message.match(/[a-zA-Z]/g) || []).length;
  const capsRatio = totalLetters > 0 ? capsLetters / totalLetters : 0;
  
  if (capsRatio > 0.3 && messageLength > 30) {
    flags.push({
      type: "Excessive Capitalization",
      description: `${Math.round(capsRatio * 100)}% capitalization - manipulative formatting tactic`,
      severity: "medium",
      weight: 10
    });
    score -= 10;
  }
  
  // Check for excessive punctuation
  const exclamationCount = (message.match(/!/g) || []).length;
  const questionCount = (message.match(/\?/g) || []).length;
  const totalPunctuation = exclamationCount + questionCount;
  
  if (exclamationCount > 4 || totalPunctuation > 8) {
    flags.push({
      type: "Excessive Punctuation",
      description: "Overuse of exclamation marks/questions creates false urgency",
      severity: exclamationCount > 6 ? "medium" : "low",
      weight: 7
    });
    score -= 7;
  }
  
  // Check for lack of credible sources on factual claims
  const factualClaimIndicators = [
    "fact", "proven", "research", "study", "evidence", "data shows",
    "statistics", "according to", "found that", "demonstrates"
  ];
  
  const hasFactualClaim = factualClaimIndicators.some(indicator => 
    lowerMessage.includes(indicator)
  );
  
  if (hasFactualClaim && !hasSpecificSource && messageLength > 100) {
    flags.push({
      type: "Unsupported Factual Claims",
      description: "Makes factual claims without providing verifiable sources or citations",
      severity: "high",
      weight: 16
    });
    score -= 16;
  }
  
  // Check for contradictions or logical inconsistencies
  const contradictionPairs = [
    ["always", "never"],
    ["everyone", "no one"],
    ["100%", "guaranteed"],
    ["all", "none"],
    ["every", "any"]
  ];
  
  let absoluteStatements = 0;
  contradictionPairs.forEach(([word1, word2]) => {
    if (lowerMessage.includes(word1) || lowerMessage.includes(word2)) {
      absoluteStatements++;
    }
  });
  
  if (absoluteStatements >= 3) {
    flags.push({
      type: "Absolute Statements",
      description: "Uses absolute language (always/never/everyone) - oversimplification red flag",
      severity: "medium",
      weight: 8
    });
    score -= 8;
  }
  
  // Check for sensationalist numbers
  const sensationalNumbers = [
    /\d+0{2,}%/, // 1000%, 10000%
    /\d{4,}x/, // 1000x, 10000x
    /millions? of people/i,
    /billions? of/i,
    /100% (effective|proven|guaranteed)/i
  ];
  
  let sensationalNumberCount = 0;
  sensationalNumbers.forEach(pattern => {
    if (pattern.test(message)) sensationalNumberCount++;
  });
  
  if (sensationalNumberCount > 0) {
    flags.push({
      type: "Sensationalist Statistics",
      description: "Uses exaggerated or unverifiable statistics for shock value",
      severity: "medium",
      weight: 9
    });
    score -= 9;
  }
  
  // Positive indicators (boost score)
  let positiveIndicators = 0;
  
  if (hasSpecificSource) {
    positiveIndicators++;
    score = Math.min(100, score + 8);
  }
  
  // Check for balanced language
  const balancedPhrases = ["however", "although", "on the other hand", "conversely", "while"];
  const hasBalancedLanguage = balancedPhrases.some(phrase => lowerMessage.includes(phrase));
  
  if (hasBalancedLanguage) {
    positiveIndicators++;
    score = Math.min(100, score + 5);
  }
  
  // Check for uncertainty acknowledgment
  const uncertaintyPhrases = ["may", "might", "could", "possibly", "potentially", "suggests"];
  const acknowledgesUncertainty = uncertaintyPhrases.filter(phrase => 
    lowerMessage.includes(phrase)
  ).length;
  
  if (acknowledgesUncertainty >= 2) {
    positiveIndicators++;
    score = Math.min(100, score + 5);
  }
  
  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));
  
  // Calculate confidence based on multiple factors
  const flagDiversity = new Set(flags.map(f => f.type)).size;
  const contentDepth = Math.min(30, messageLength / 10);
  const confidence = Math.min(95, 50 + contentDepth + (flagDiversity * 3));
  
  // Generate comprehensive analysis
  let analysis = "";
  
  if (score >= 90) {
    analysis = "✅ HIGHLY CREDIBLE: This message appears trustworthy with minimal red flags detected. ";
  } else if (score >= 80) {
    analysis = "✅ GENERALLY CREDIBLE: This message is largely trustworthy with only minor concerns. ";
  } else if (score >= 70) {
    analysis = "⚠️ MODERATELY TRUSTWORTHY: This message has some concerns but isn't necessarily false. Verify key claims before sharing. ";
  } else if (score >= 60) {
    analysis = "⚠️ MULTIPLE CONCERNS: This message exhibits several warning signs. Exercise significant caution. ";
  } else if (score >= 50) {
    analysis = "🚨 HIGH RISK: This message shows multiple misinformation indicators. High skepticism advised. ";
  } else if (score >= 30) {
    analysis = "🛑 VERY HIGH RISK: This message shows extensive misinformation patterns. Likely false or manipulated content. ";
  } else {
    analysis = "🛑 CRITICAL ALERT: This message is almost certainly misinformation. Do NOT share or act on this content. ";
  }
  
  // Add severity-specific warnings
  const criticalFlags = flags.filter(f => f.severity === "critical");
  const highFlags = flags.filter(f => f.severity === "high");
  
  if (criticalFlags.length > 0) {
    analysis += `CRITICAL ISSUES DETECTED (${criticalFlags.length}): This content may be dangerous. `;
  } else if (highFlags.length >= 2) {
    analysis += `Multiple high-priority concerns identified. `;
  }
  
  // Add specific warnings based on content type
  if (healthDisinfoCount > 0) {
    analysis += "⚕️ HEALTH WARNING: Never make medical decisions based on unverified online content. Consult qualified healthcare professionals. ";
  }
  
  if (politicalDisinfoCount > 0) {
    analysis += "🗳️ POLITICAL CONTENT: Verify with multiple reputable news sources and official government channels. ";
  }
  
  if (conspiracyCount > 0) {
    analysis += "This content uses conspiracy theory rhetoric. Extraordinary claims require extraordinary evidence. ";
  }
  
  // Final recommendation
  if (score < 60) {
    analysis += "⛔ Recommendation: DO NOT SHARE this content without verification from credible sources.";
  } else if (score < 80) {
    analysis += "⚠️ Recommendation: Cross-reference with established fact-checking organizations before sharing.";
  } else {
    analysis += "ℹ️ Recommendation: Still verify important claims through multiple independent sources.";
  }
  
  return {
    score: Math.round(score),
    confidence: Math.round(confidence),
    flags,
    analysis
  };
}

// MoneyShield: Fraud Detection
export function analyzeFraudContent(content: string): DetectionResult {
  const flags: DetectionResult["flags"] = []  ;
  let score = 100;
  
  const lowerContent = content.toLowerCase();
  
  // Investment scam indicators
  const investmentScams = [
    "guaranteed returns", "risk-free", "double your money",
    "get rich quick", "financial freedom", "passive income",
    "limited spots", "exclusive opportunity", "insider trading",
    "secret formula", "tested strategy", "autopilot income"
  ];
  
  const investmentCount = investmentScams.filter(phrase => lowerContent.includes(phrase)).length;
  if (investmentCount > 0) {
    flags.push({
      type: "Investment Scam Indicators",
      description: `Contains ${investmentCount} phrase(s) promising unrealistic returns - major red flag`,
      severity: "critical",
      weight: investmentCount * 20
    });
    score -= investmentCount * 20;
  }
  
  // Phishing indicators
  const phishingPhrases = [
    "verify your account", "suspended account", "unusual activity",
    "confirm your identity", "update your information", "click here immediately",
    "your account will be closed", "security alert", "unauthorized access",
    "verify now", "action required", "confirm payment"
  ];
  
  const phishingCount = phishingPhrases.filter(phrase => lowerContent.includes(phrase)).length;
  if (phishingCount > 0) {
    flags.push({
      type: "Phishing Attack Detected",
      description: `${phishingCount} phishing tactic(s) detected - attempting to steal credentials`,
      severity: "critical",
      weight: phishingCount * 18
    });
    score -= phishingCount * 18;
  }
  
  // Personal information requests
  const sensitiveRequests = [
    "social security", "ssn", "credit card", "bank account",
    "routing number", "password", "pin number", "cvv",
    "card number", "security code", "mother's maiden", "date of birth"
  ];
  
  const sensitiveCount = sensitiveRequests.filter(req => lowerContent.includes(req)).length;
  if (sensitiveCount > 0) {
    flags.push({
      type: "🚨 REQUESTS SENSITIVE INFORMATION",
      description: `Asks for ${sensitiveCount} type(s) of personal/financial data - NEVER share this info`,
      severity: "critical",
      weight: 25
    });
    score -= 25;
  }
  
  // Romance scam indicators
  const romanceScams = [
    "my love", "my dear", "stranded", "hospital emergency",
    "wire transfer", "western union", "gift card", "help me please",
    "send money", "financial emergency", "visa problems"
  ];
  
  const romanceCount = romanceScams.filter(phrase => lowerContent.includes(phrase)).length;
  if (romanceCount > 1) {
    flags.push({
      type: "Romance Scam Pattern",
      description: `${romanceCount} indicators of romance/relationship scam tactics`,
      severity: "high",
      weight: romanceCount * 12
    });
    score -= romanceCount * 12;
  }
  
  // Lottery/prize scams
  const prizeScams = [
    "you've won", "claim your prize", "lottery winner",
    "congratulations you", "selected winner", "tax fee", "processing fee",
    "claim fee", "transfer fee", "you're a winner"
  ];
  
  const prizeCount = prizeScams.filter(phrase => lowerContent.includes(phrase)).length;
  if (prizeCount > 0) {
    flags.push({
      type: "Prize/Lottery Scam",
      description: `${prizeCount} lottery scam marker(s) - you can't win what you didn't enter`,
      severity: "high",
      weight: prizeCount * 15
    });
    score -= prizeCount * 15;
  }
  
  // Tech support scams
  const techScams = [
    "virus detected", "computer infected", "microsoft support",
    "apple support", "refund owed", "call immediately",
    "tech support", "system alert", "infected device"
  ];
  
  const techCount = techScams.filter(phrase => lowerContent.includes(phrase)).length;
  if (techCount > 0) {
    flags.push({
      type: "Tech Support Scam",
      description: `${techCount} tech support scam indicator(s) - legitimate companies don't contact you this way`,
      severity: "high",
      weight: techCount * 14
    });
    score -= techCount * 14;
  }
  
  // Cryptocurrency scams
  const cryptoScams = [
    "crypto giveaway", "send bitcoin", "double your crypto",
    "elon musk", "free bitcoin", "cryptocurrency investment",
    "send eth", "wallet address", "guaranteed crypto", "bitcoin doubler"
  ];
  
  const cryptoCount = cryptoScams.filter(phrase => lowerContent.includes(phrase)).length;
  if (cryptoCount > 0) {
    flags.push({
      type: "Cryptocurrency Scam",
      description: `${cryptoCount} crypto scam pattern(s) - never send crypto to strangers`,
      severity: "critical",
      weight: cryptoCount * 16
    });
    score -= cryptoCount * 16;
  }
  
  // Check for poor grammar (common in scams)
  const grammarIssues = [
    "kindly", "do the needful", "revert back", "prepone",
    "regards to", "looking forward for", "same will be"
  ];
  const grammarCount = grammarIssues.filter(issue => lowerContent.includes(issue)).length;
  if (grammarCount > 0) {
    flags.push({
      type: "Suspicious Language Patterns",
      description: `${grammarCount} unusual phrase(s) common in scam communications`,
      severity: "medium",
      weight: grammarCount * 8
    });
    score -= grammarCount * 8;
  }
  
  // Check for impersonation
  const impersonation = [
    "irs", "social security administration", "amazon customer",
    "paypal security", "bank of america", "wells fargo",
    "federal", "government agency"
  ];
  
  const impersonationCount = impersonation.filter(entity => lowerContent.includes(entity)).length;
  if (impersonationCount > 0 && (phishingCount > 0 || sensitiveCount > 0)) {
    flags.push({
      type: "🚨 IMPERSONATION ATTEMPT",
      description: "Impersonating legitimate organization - report immediately",
      severity: "critical",
      weight: 20
    });
    score -= 20;
  }
  
  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));
  
  const confidence = Math.min(95, 65 + (content.length / 25) + (flags.length * 4));
  
  // Generate analysis
  let analysis = "";
  if (score >= 85) {
    analysis = "✅ APPEARS SAFE: This content shows minimal fraud indicators. Standard caution advised. ";
  } else if (score >= 70) {
    analysis = "⚠️ SOME CONCERNS: This content has some suspicious characteristics. Exercise caution. ";
  } else if (score >= 50) {
    analysis = "🚨 HIGH RISK: Multiple fraud indicators detected. Very likely a scam attempt. ";
  } else if (score >= 30) {
    analysis = "🛑 EXTREME DANGER: Strong fraud pattern match. Almost certainly a scam. ";
  } else {
    analysis = "🛑 CONFIRMED SCAM PATTERN: This is definitely a fraud attempt. DO NOT ENGAGE. ";
  }
  
  const criticalFlags = flags.filter(f => f.severity === "critical");
  if (criticalFlags.length > 0) {
    analysis += `⛔ CRITICAL WARNING: ${criticalFlags.length} critical threat(s) detected. NEVER share personal/financial information. `;
  }
  
  if (sensitiveCount > 0) {
    analysis += "🔐 Legitimate organizations NEVER ask for passwords, PINs, or full account numbers via message. ";
  }
  
  if (score < 60) {
    analysis += "📞 ACTION: Block sender, delete message, and report to authorities if you've shared any information.";
  } else {
    analysis += "⚠️ Verify sender identity through official channels before responding.";
  }
  
  return {
    score: Math.round(score),
    confidence: Math.round(confidence),
    flags,
    analysis
  };
}

// VoiceShield: Audio Analysis Simulation
export function analyzeAudioCharacteristics(audioData: string): DetectionResult {
  const flags: DetectionResult["flags"] = [];
  let score = 85; // Start with assumption of authenticity
  
  // Simulate various audio analysis checks
  // In a real implementation, this would use actual audio processing
  
  // Random variation to simulate real analysis
  const randomFactor = Math.random();
  
  // Simulate background noise analysis
  if (randomFactor < 0.3) {
    flags.push({
      type: "Unnatural Background Noise",
      description: "Background noise pattern inconsistent with claimed environment",
      severity: "medium",
      weight: 8
    });
    score -= 8;
  }
  
  // Simulate frequency analysis
  if (randomFactor > 0.7) {
    flags.push({
      type: "Frequency Anomalies",
      description: "Detected unusual frequency patterns that may indicate synthesis",
      severity: "high",
      weight: 15
    });
    score -= 15;
  }
  
  // Simulate prosody analysis
  if (randomFactor > 0.5 && randomFactor < 0.6) {
    flags.push({
      type: "Prosody Inconsistencies",
      description: "Speech rhythm and intonation show minor irregularities",
      severity: "low",
      weight: 5
    });
    score -= 5;
  }
  
  // Simulate artifact detection
  if (randomFactor < 0.2) {
    flags.push({
      type: "Digital Artifacts Detected",
      description: "Found traces of digital manipulation or compression artifacts",
      severity: "high",
      weight: 12
    });
    score -= 12;
  }
  
  score = Math.max(0, Math.min(100, score));
  
  const confidence = 78 + Math.floor(randomFactor * 17);
  
  let analysis = "";
  if (score >= 80) {
    analysis = "Audio analysis indicates authentic speech with natural characteristics. ";
  } else if (score >= 60) {
    analysis = "Some irregularities detected that warrant further verification. ";
  } else {
    analysis = "Multiple indicators suggest potential audio manipulation or synthesis. ";
  }
  
  analysis += "Consider the context and source when evaluating authenticity.";
  
  return {
    score: Math.round(score),
    confidence: Math.round(confidence),
    flags,
    analysis
  };
}

// Image verification helper
export function analyzeImageClaims(description: string): {
  suggestions: string[];
  riskLevel: "low" | "medium" | "high";
} {
  const lowerDesc = description.toLowerCase();
  const suggestions: string[] = [];
  let riskLevel: "low" | "medium" | "high" = "low";
  
  // Check for disaster/emergency claims
  if (lowerDesc.includes("disaster") || lowerDesc.includes("emergency") || lowerDesc.includes("breaking")) {
    suggestions.push("Use reverse image search (Google, TinEye) to verify when/where photo was taken");
    suggestions.push("Check if major news outlets are reporting the same event");
    riskLevel = "high";
  }
  
  // Check for political claims
  if (lowerDesc.includes("politician") || lowerDesc.includes("president") || lowerDesc.includes("government")) {
    suggestions.push("Verify with official government or news sources");
    suggestions.push("Check for image manipulation or out-of-context usage");
    riskLevel = "high";
  }
  
  // Check for viral social media content
  if (lowerDesc.includes("viral") || lowerDesc.includes("trending") || lowerDesc.includes("share")) {
    suggestions.push("Verify the original source before sharing");
    suggestions.push("Check fact-checking websites for debunking");
    riskLevel = "medium";
  }
  
  if (suggestions.length === 0) {
    suggestions.push("Always verify image sources and context");
    suggestions.push("Look for original publication date and location");
  }
  
  return { suggestions, riskLevel };
}
