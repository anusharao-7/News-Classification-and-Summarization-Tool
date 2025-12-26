import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface SampleArticlesProps {
  onSelect: (text: string) => void;
}

const samples = [
  {
    title: 'Technology',
    preview: 'AI breakthrough in healthcare...',
    content: `Artificial intelligence researchers have achieved a remarkable breakthrough in medical diagnostics that could revolutionize healthcare worldwide. The new machine learning algorithm, developed by a team of scientists at leading technology institutions, can detect early signs of cancer with unprecedented accuracy.

The innovative system uses advanced deep learning techniques to analyze medical imaging data, identifying subtle patterns that human doctors might miss. Clinical trials have shown the AI system achieved a 95% accuracy rate in detecting early-stage tumors, significantly outperforming traditional diagnostic methods.

Healthcare experts are optimistic about the potential impact of this technology. "This represents a major step forward in preventive medicine," said Dr. Sarah Chen, a leading oncologist. "Early detection is crucial for successful treatment outcomes, and this AI tool could save countless lives."

The technology is expected to be integrated into hospital systems within the next two years, pending regulatory approval. Several major healthcare providers have already expressed interest in implementing the system.`
  },
  {
    title: 'Business',
    preview: 'Stock market reaches new highs...',
    content: `The stock market reached historic highs today as investors responded positively to strong quarterly earnings reports from major technology companies. The S&P 500 index climbed 2.3%, marking its best performance in six months.

Leading the surge were shares of major tech giants, with several companies reporting revenue growth exceeding analyst expectations. Apple, Microsoft, and Google parent Alphabet all posted impressive gains, driving investor confidence across the sector.

Economic analysts attribute the market rally to several factors, including declining inflation rates, robust consumer spending, and optimistic corporate guidance for the coming quarters. The Federal Reserve's recent decision to pause interest rate hikes has also contributed to positive market sentiment.

However, some market watchers urge caution, noting that valuations in certain sectors may be stretched. "While the fundamentals look strong, investors should maintain diversified portfolios," advised investment strategist Michael Roberts. Trading volume was notably high as institutional investors increased their equity positions.`
  },
  {
    title: 'Sports',
    preview: 'Championship victory celebration...',
    content: `In a thrilling championship final that will be remembered for generations, the hometown team secured a dramatic victory in the closing minutes of the game. The stadium erupted in celebration as fans witnessed one of the most exciting finishes in tournament history.

Star player James Rodriguez delivered an outstanding performance, scoring the winning goal with just two minutes remaining on the clock. The 28-year-old forward has now scored in five consecutive championship matches, cementing his status as one of the greatest players of his generation.

Coach Maria Santos praised her team's resilience and determination throughout the tournament. "This group of players has shown incredible heart and teamwork," she said during the post-match press conference. "They never gave up, even when we were trailing."

The victory marks the team's third championship title in the past decade, further establishing their dynasty in the sport. Thousands of supporters gathered in the city center to celebrate the historic achievement, with celebrations expected to continue throughout the week.`
  }
];

export function SampleArticles({ onSelect }: SampleArticlesProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Or try a sample article:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {samples.map((sample, index) => (
          <motion.button
            key={sample.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSelect(sample.content)}
            className="group p-4 text-left rounded-lg bg-muted/50 border border-border hover:border-primary/50 hover:bg-muted transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{sample.title}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {sample.preview}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
