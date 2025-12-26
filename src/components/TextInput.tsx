import { motion } from 'framer-motion';
import { Sparkles, Trash2 } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isAnalyzing: boolean;
  minLength?: number;
}

export function TextInput({
  value,
  onChange,
  onAnalyze,
  onClear,
  isAnalyzing,
  minLength = 100,
}: TextInputProps) {
  const canAnalyze = value.length >= minLength && !isAnalyzing;
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.div
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 blur"
          animate={{ opacity: value.length > 0 ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your news article here... (minimum 100 characters)"
          className="relative w-full h-64 p-6 bg-card rounded-xl border border-border text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-sans text-base leading-relaxed"
          disabled={isAnalyzing}
        />
      </div>

      {/* Character and word count */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <span className="text-muted-foreground">
            <span className={value.length >= minLength ? 'text-primary' : 'text-muted-foreground'}>
              {value.length}
            </span>
            /{minLength} characters
          </span>
          <span className="text-muted-foreground">
            {wordCount} words
          </span>
        </div>
        
        {value.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClear}
            className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Analyze button */}
      <motion.button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        whileHover={canAnalyze ? { scale: 1.02 } : {}}
        whileTap={canAnalyze ? { scale: 0.98 } : {}}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-lg
          flex items-center justify-center gap-3
          transition-all duration-300
          ${canAnalyze
            ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-effect cursor-pointer'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
        `}
      >
        <Sparkles className={`w-5 h-5 ${canAnalyze ? 'animate-pulse' : ''}`} />
        {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
      </motion.button>
    </div>
  );
}
