import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResultCard } from '@/components/ResultCard';
import { CategoryBadge } from '@/components/CategoryBadge';
import { SentimentDisplay } from '@/components/SentimentDisplay';
import { StatsDisplay } from '@/components/StatsDisplay';
import { SampleArticles } from '@/components/SampleArticles';
import { analyzeArticle, type AnalysisResult } from '@/lib/nlp';
import { useToast } from '@/hooks/use-toast';

const loadingMessages = [
  'Preprocessing text...',
  'Analyzing content...',
  'Classifying category...',
  'Extracting summary...',
  'Evaluating sentiment...',
  'Finalizing results...',
];

export default function Index() {
  const [articleText, setArticleText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = useCallback(async () => {
    if (articleText.length < 100) {
      toast({
        title: 'Text too short',
        description: 'Please enter at least 100 characters for accurate analysis.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate processing steps with loading messages
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingMessage(loadingMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      // Run the actual analysis
      const analysisResult = analyzeArticle(articleText);
      setResult(analysisResult);
      
      toast({
        title: 'Analysis complete!',
        description: `Article classified as ${analysisResult.category.name} with ${analysisResult.category.confidence}% confidence.`,
      });
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: 'An error occurred while analyzing the article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [articleText, toast]);

  const handleClear = useCallback(() => {
    setArticleText('');
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(hsl(222 30% 15% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(222 30% 15% / 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 pb-16">
        <Header />

        <main className="space-y-8">
          {/* Input Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <TextInput
              value={articleText}
              onChange={setArticleText}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
            />

            {!articleText && !result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <SampleArticles onSelect={setArticleText} />
              </motion.div>
            )}
          </motion.section>

          {/* Loading State */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-2xl"
              >
                <LoadingSpinner message={loadingMessage} />
              </motion.section>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {result && !isAnalyzing && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Stats Overview */}
                <ResultCard
                  title="Article Statistics"
                  icon={<BarChart3 className="w-5 h-5" />}
                  delay={0}
                  accentColor="cyan"
                >
                  <StatsDisplay
                    wordCount={result.stats.wordCount}
                    sentenceCount={result.stats.sentenceCount}
                    avgWordsPerSentence={result.stats.avgWordsPerSentence}
                  />
                </ResultCard>

                {/* Main results grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Category */}
                  <ResultCard
                    title="Category Classification"
                    icon={<Layers className="w-5 h-5" />}
                    delay={0.1}
                    accentColor="purple"
                  >
                    <CategoryBadge
                      category={result.category.name}
                      confidence={result.category.confidence}
                    />
                  </ResultCard>

                  {/* Sentiment */}
                  <ResultCard
                    title="Sentiment Analysis"
                    icon={<TrendingUp className="w-5 h-5" />}
                    delay={0.2}
                    accentColor="green"
                  >
                    <SentimentDisplay
                      sentiment={result.sentiment.label}
                      score={result.sentiment.score}
                      positiveWords={result.sentiment.positiveWords}
                      negativeWords={result.sentiment.negativeWords}
                    />
                  </ResultCard>
                </div>

                {/* Summary */}
                <ResultCard
                  title="AI Summary"
                  icon={<FileText className="w-5 h-5" />}
                  delay={0.3}
                  accentColor="orange"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-foreground/90 leading-relaxed"
                  >
                    {result.summary}
                  </motion.p>
                </ResultCard>

                {/* How it works */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center py-8 border-t border-border/50"
                >
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    <span className="text-primary font-medium">How it works:</span> This tool uses 
                    client-side NLP techniques including TF-IDF keyword matching for classification, 
                    TextRank-inspired algorithms for extractive summarization, and lexicon-based 
                    sentiment analysis. All processing happens in your browser – no data is sent to any server.
                  </p>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 mt-12 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Framer Motion
          </p>
        </footer>
      </div>
    </div>
  );
}
