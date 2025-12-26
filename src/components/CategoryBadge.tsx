import { motion } from 'framer-motion';

interface CategoryBadgeProps {
  category: string;
  confidence: number;
}

const categoryIcons: Record<string, string> = {
  technology: '💻',
  business: '📊',
  politics: '🏛️',
  sports: '⚽',
  entertainment: '🎬',
  health: '🏥',
  science: '🔬',
  general: '📰',
};

const categoryColors: Record<string, string> = {
  technology: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  business: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  politics: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  sports: 'from-green-500/20 to-lime-500/20 border-green-500/30',
  entertainment: 'from-pink-500/20 to-purple-500/20 border-pink-500/30',
  health: 'from-rose-500/20 to-red-500/20 border-rose-500/30',
  science: 'from-violet-500/20 to-indigo-500/20 border-violet-500/30',
  general: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

export function CategoryBadge({ category, confidence }: CategoryBadgeProps) {
  const icon = categoryIcons[category] || '📰';
  const colorClass = categoryColors[category] || categoryColors.general;

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={`inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r ${colorClass} border backdrop-blur-sm`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-lg font-semibold capitalize text-foreground">{category}</span>
      </motion.div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-mono text-primary">{confidence}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
