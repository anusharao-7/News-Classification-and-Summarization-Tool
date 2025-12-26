import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
  accentColor?: 'cyan' | 'purple' | 'green' | 'orange';
}

const accentStyles = {
  cyan: {
    border: 'border-primary/30 hover:border-primary/50',
    glow: 'hover:shadow-[0_0_30px_hsl(186_100%_50%_/_0.15)]',
    icon: 'text-primary',
    badge: 'bg-primary/10 text-primary',
  },
  purple: {
    border: 'border-secondary/30 hover:border-secondary/50',
    glow: 'hover:shadow-[0_0_30px_hsl(270_60%_55%_/_0.15)]',
    icon: 'text-secondary',
    badge: 'bg-secondary/10 text-secondary',
  },
  green: {
    border: 'border-emerald-500/30 hover:border-emerald-500/50',
    glow: 'hover:shadow-[0_0_30px_hsl(160_84%_39%_/_0.15)]',
    icon: 'text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  orange: {
    border: 'border-orange-500/30 hover:border-orange-500/50',
    glow: 'hover:shadow-[0_0_30px_hsl(25_95%_53%_/_0.15)]',
    icon: 'text-orange-400',
    badge: 'bg-orange-500/10 text-orange-400',
  },
};

export function ResultCard({ title, icon, children, delay = 0, accentColor = 'cyan' }: ResultCardProps) {
  const styles = accentStyles[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card rounded-xl p-6 transition-all duration-300 ${styles.border} ${styles.glow}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${styles.badge}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
