// Lightweight NLP utilities - fully client-side, no external APIs

// Common English stopwords
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
  'shall', 'can', 'need', 'dare', 'ought', 'used', 'it', 'its', 'this', 'that',
  'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which', 'who',
  'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  'than', 'too', 'very', 'just', 'also', 'now', 'here', 'there', 'then', 'once'
]);

// Category keywords for classification
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  technology: [
    'ai', 'artificial', 'intelligence', 'software', 'hardware', 'computer', 'tech',
    'digital', 'internet', 'app', 'application', 'smartphone', 'device', 'data',
    'algorithm', 'machine', 'learning', 'cloud', 'cyber', 'robot', 'automation',
    'startup', 'silicon', 'valley', 'innovation', 'blockchain', 'crypto', 'virtual',
    'programming', 'code', 'developer', 'engineering', 'semiconductor', 'chip'
  ],
  business: [
    'market', 'stock', 'economy', 'economic', 'company', 'business', 'corporate',
    'investment', 'investor', 'trade', 'trading', 'finance', 'financial', 'bank',
    'banking', 'profit', 'revenue', 'earnings', 'quarterly', 'ceo', 'executive',
    'merger', 'acquisition', 'ipo', 'shares', 'dividend', 'growth', 'recession',
    'inflation', 'gdp', 'unemployment', 'industry', 'retail', 'manufacturing'
  ],
  politics: [
    'government', 'president', 'congress', 'senate', 'parliament', 'election',
    'vote', 'voter', 'democracy', 'republican', 'democrat', 'political', 'policy',
    'legislation', 'law', 'bill', 'administration', 'campaign', 'candidate',
    'governor', 'mayor', 'minister', 'prime', 'diplomatic', 'foreign', 'domestic',
    'bipartisan', 'conservative', 'liberal', 'progressive', 'reform'
  ],
  sports: [
    'game', 'match', 'team', 'player', 'score', 'win', 'won', 'lose', 'lost',
    'championship', 'tournament', 'league', 'season', 'coach', 'athlete', 'olympic',
    'football', 'basketball', 'baseball', 'soccer', 'tennis', 'golf', 'hockey',
    'nba', 'nfl', 'mlb', 'fifa', 'world cup', 'medal', 'record', 'stadium'
  ],
  entertainment: [
    'movie', 'film', 'actor', 'actress', 'celebrity', 'music', 'album', 'song',
    'concert', 'tour', 'netflix', 'streaming', 'tv', 'television', 'show', 'series',
    'hollywood', 'broadway', 'award', 'grammy', 'oscar', 'emmy', 'star', 'fame',
    'viral', 'trending', 'social media', 'influencer', 'tiktok', 'youtube'
  ],
  health: [
    'health', 'medical', 'medicine', 'doctor', 'hospital', 'patient', 'disease',
    'treatment', 'vaccine', 'virus', 'covid', 'pandemic', 'symptom', 'diagnosis',
    'therapy', 'drug', 'pharmaceutical', 'fda', 'clinical', 'trial', 'research',
    'cancer', 'heart', 'mental', 'wellness', 'nutrition', 'diet', 'exercise'
  ],
  science: [
    'research', 'study', 'scientist', 'discovery', 'experiment', 'laboratory',
    'physics', 'chemistry', 'biology', 'astronomy', 'space', 'nasa', 'planet',
    'climate', 'environment', 'species', 'evolution', 'genome', 'quantum',
    'particle', 'energy', 'renewable', 'sustainable', 'ecosystem', 'ocean'
  ]
};

// Sentiment words
const POSITIVE_WORDS = new Set([
  'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive',
  'success', 'successful', 'win', 'winning', 'happy', 'joy', 'love', 'best',
  'better', 'improve', 'improved', 'growth', 'growing', 'gain', 'gains', 'rise',
  'rising', 'up', 'increase', 'increased', 'profit', 'profitable', 'strong',
  'strength', 'boost', 'boosted', 'surge', 'surging', 'outstanding', 'impressive',
  'remarkable', 'breakthrough', 'innovative', 'revolutionary', 'exciting', 'hope',
  'hopeful', 'optimistic', 'confident', 'celebrate', 'celebration', 'achievement'
]);

const NEGATIVE_WORDS = new Set([
  'bad', 'terrible', 'awful', 'horrible', 'negative', 'fail', 'failure', 'failed',
  'lose', 'losing', 'loss', 'losses', 'sad', 'angry', 'hate', 'worst', 'worse',
  'decline', 'declining', 'drop', 'dropped', 'fall', 'falling', 'down', 'decrease',
  'decreased', 'crisis', 'crash', 'crashed', 'weak', 'weakness', 'poor', 'risk',
  'risky', 'danger', 'dangerous', 'threat', 'threatening', 'concern', 'concerning',
  'worried', 'worry', 'fear', 'afraid', 'tragic', 'tragedy', 'disaster', 'problem',
  'issue', 'struggle', 'struggling', 'recession', 'unemployment', 'inflation'
]);

// Text preprocessing
export function preprocessText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

// Classify text into categories
export function classifyText(text: string): { category: string; confidence: number; scores: Record<string, number> } {
  const words = preprocessText(text);
  const scores: Record<string, number> = {};
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const word of words) {
      if (keywords.includes(word)) {
        score += 1;
      }
      // Partial matching for compound words
      for (const keyword of keywords) {
        if (word.includes(keyword) || keyword.includes(word)) {
          score += 0.5;
        }
      }
    }
    scores[category] = score;
  }
  
  // Normalize scores
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total > 0) {
    for (const category in scores) {
      scores[category] = Math.round((scores[category] / total) * 100) / 100;
    }
  }
  
  // Find best category
  let bestCategory = 'general';
  let bestScore = 0;
  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  
  // If no strong match, default to general
  if (bestScore < 0.15) {
    bestCategory = 'general';
    bestScore = 0.5;
  }
  
  return {
    category: bestCategory,
    confidence: Math.min(Math.round(bestScore * 100 + 50), 95),
    scores
  };
}

// Analyze sentiment
export function analyzeSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; score: number; details: { positive: number; negative: number } } {
  const words = preprocessText(text);
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (const word of words) {
    if (POSITIVE_WORDS.has(word)) positiveCount++;
    if (NEGATIVE_WORDS.has(word)) negativeCount++;
  }
  
  const total = positiveCount + negativeCount;
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  let score = 0;
  
  if (total > 0) {
    score = (positiveCount - negativeCount) / total;
    if (score > 0.2) sentiment = 'positive';
    else if (score < -0.2) sentiment = 'negative';
  }
  
  return {
    sentiment,
    score: Math.round((score + 1) * 50), // Convert to 0-100 scale
    details: {
      positive: positiveCount,
      negative: negativeCount
    }
  };
}

// Extractive summarization using TextRank-inspired algorithm
export function summarizeText(text: string, sentenceCount: number = 3): string {
  // Split into sentences
  const sentences = text
    .replace(/([.!?])\s+/g, '$1|')
    .split('|')
    .map(s => s.trim())
    .filter(s => s.length > 20);
  
  if (sentences.length <= sentenceCount) {
    return sentences.join(' ');
  }
  
  // Score sentences based on keyword frequency and position
  const wordFreq: Record<string, number> = {};
  const allWords = preprocessText(text);
  
  for (const word of allWords) {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  }
  
  const scoredSentences = sentences.map((sentence, index) => {
    const sentenceWords = preprocessText(sentence);
    let score = 0;
    
    // Word frequency score
    for (const word of sentenceWords) {
      score += wordFreq[word] || 0;
    }
    
    // Normalize by length
    score = score / (sentenceWords.length || 1);
    
    // Position bonus (first and last sentences often important)
    if (index === 0) score *= 1.5;
    else if (index === sentences.length - 1) score *= 1.2;
    else if (index < 3) score *= 1.1;
    
    // Length penalty for very short sentences
    if (sentence.length < 40) score *= 0.8;
    
    return { sentence, score, index };
  });
  
  // Sort by score and take top sentences
  scoredSentences.sort((a, b) => b.score - a.score);
  const topSentences = scoredSentences.slice(0, sentenceCount);
  
  // Reorder by original position for coherence
  topSentences.sort((a, b) => a.index - b.index);
  
  return topSentences.map(s => s.sentence).join(' ');
}

// Main analysis function
export interface AnalysisResult {
  category: {
    name: string;
    confidence: number;
    allScores: Record<string, number>;
  };
  summary: string;
  sentiment: {
    label: 'positive' | 'negative' | 'neutral';
    score: number;
    positiveWords: number;
    negativeWords: number;
  };
  stats: {
    wordCount: number;
    sentenceCount: number;
    avgWordsPerSentence: number;
  };
}

export function analyzeArticle(text: string): AnalysisResult {
  const classification = classifyText(text);
  const sentimentResult = analyzeSentiment(text);
  const summary = summarizeText(text, 3);
  
  // Calculate stats
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return {
    category: {
      name: classification.category,
      confidence: classification.confidence,
      allScores: classification.scores
    },
    summary,
    sentiment: {
      label: sentimentResult.sentiment,
      score: sentimentResult.score,
      positiveWords: sentimentResult.details.positive,
      negativeWords: sentimentResult.details.negative
    },
    stats: {
      wordCount: words.length,
      sentenceCount: sentences.length,
      avgWordsPerSentence: Math.round(words.length / (sentences.length || 1))
    }
  };
}
