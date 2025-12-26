import { motion } from 'framer-motion';

interface SentimentDisplayProps {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  positiveWords: number;
  negativeWords: number;
}

const sentimentConfig = {
  positive: {
    emoji: '😊',
    label: 'Positive',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    barColor: 'from-emerald-500 to-green-400',
  },
  negative: {
    emoji: '😔',
    label: 'Negative',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    barColor: 'from-red-500 to-orange-400',
  },
  neutral: {
    emoji: '😐',
    label: 'Neutral',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    barColor: 'from-yellow-500 to-amber-400',
  },
};

export function SentimentDisplay({ sentiment, score, positiveWords, negativeWords }: SentimentDisplayProps) {
  const config = sentimentConfig[sentiment];

  return (
    <div className="space-y-4">
      {/* Main sentiment indicator */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex items-center gap-4"
      >
        <div className={`text-4xl p-3 rounded-xl ${config.bgColor}`}>
          {config.emoji}
        </div>
        <div>
          <p className={`text-xl font-semibold ${config.color}`}>{config.label}</p>
          <p className="text-sm text-muted-foreground">Sentiment Score: {score}/100</p>
        </div>
      </motion.div>

      {/* Score bar */}
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.barColor} rounded-full`}
        />
        {/* Center marker for neutral point */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-foreground/30" />
      </div>

      {/* Word counts */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
        >
          <span className="text-emerald-400">👍</span>
          <div>
            <p className="text-xs text-muted-foreground">Positive words</p>
            <p className="text-lg font-semibold text-emerald-400">{positiveWords}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
        >
          <span className="text-red-400">👎</span>
          <div>
            <p className="text-xs text-muted-foreground">Negative words</p>
            <p className="text-lg font-semibold text-red-400">{negativeWords}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
