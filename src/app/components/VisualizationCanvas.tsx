import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface VisualizationCanvasProps {
  data: number[];
  isPlaying: boolean;
  currentStep: number;
  algorithm: string;
}

export const VisualizationCanvas = ({
  data,
  isPlaying,
  currentStep,
  algorithm
}: VisualizationCanvasProps) => {
  const [animatedData, setAnimatedData] = useState(data);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [comparedIndices, setComparedIndices] = useState<number[]>([]);

  useEffect(() => {
    setAnimatedData(data);
  }, [data]);

  useEffect(() => {
    if (isPlaying && algorithm.includes('Sort')) {
      // Simulate sorting animation steps
      const interval = setInterval(() => {
        const randomIndices = [
          Math.floor(Math.random() * data.length),
          Math.floor(Math.random() * data.length)
        ];
        setHighlightedIndices(randomIndices);
        setComparedIndices(randomIndices);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, data.length, algorithm]);

  const maxValue = Math.max(...data, 1);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 flex items-end justify-center gap-2">
      {animatedData.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-600">
          <p>Enter data and click "Visualize" to start</p>
        </div>
      ) : (
        animatedData.map((value, index) => {
          const height = (value / maxValue) * 300;
          const isHighlighted = highlightedIndices.includes(index);
          const isCompared = comparedIndices.includes(index);

          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-t-lg min-w-[40px] flex items-end justify-center pb-2 ${
                isHighlighted
                  ? 'bg-gradient-to-t from-green-500 to-green-400 dark:from-green-600 dark:to-green-400 shadow-lg shadow-green-500/50 dark:shadow-green-500/30'
                  : isCompared
                  ? 'bg-gradient-to-t from-yellow-500 to-yellow-400 dark:from-yellow-600 dark:to-yellow-400 shadow-lg shadow-yellow-500/50 dark:shadow-yellow-500/30'
                  : 'bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-purple-500'
              }`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-semibold text-white drop-shadow-md"
              >
                {value}
              </motion.span>
            </motion.div>
          );
        })
      )}
    </div>
  );
};
