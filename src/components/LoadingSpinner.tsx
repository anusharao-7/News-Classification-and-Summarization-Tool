import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Analyzing...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      {/* Outer ring */}
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary rounded-full"
            style={{
              top: '50%',
              left: '50%',
              marginTop: -4,
              marginLeft: -4,
            }}
            animate={{
              x: [0, 30 * Math.cos((i * 2 * Math.PI) / 3 + Math.PI / 2), 0],
              y: [0, 30 * Math.sin((i * 2 * Math.PI) / 3 + Math.PI / 2), 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Text with scanning effect */}
      <div className="relative overflow-hidden">
        <motion.p
          className="text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/50"
            animate={{
              backgroundColor: ['hsl(186 100% 50% / 0.3)', 'hsl(186 100% 50%)', 'hsl(186 100% 50% / 0.3)'],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
