import { motion } from 'framer-motion';
import { FileText, Hash, BarChart3 } from 'lucide-react';

interface StatsDisplayProps {
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
}

export function StatsDisplay({ wordCount, sentenceCount, avgWordsPerSentence }: StatsDisplayProps) {
  const stats = [
    { icon: Hash, label: 'Words', value: wordCount, color: 'text-primary' },
    { icon: FileText, label: 'Sentences', value: sentenceCount, color: 'text-secondary' },
    { icon: BarChart3, label: 'Avg Words/Sentence', value: avgWordsPerSentence, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index }}
          className="text-center p-4 rounded-lg bg-muted/50 border border-border/50"
        >
          <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
