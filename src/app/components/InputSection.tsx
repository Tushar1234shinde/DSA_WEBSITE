import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Play, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onVisualize: (data: number[]) => void;
  algorithm: string | null;
}

export const InputSection = ({ onVisualize, algorithm }: InputSectionProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleVisualize = () => {
    const numbers = inputValue
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length > 0) {
      onVisualize(numbers);
    }
  };

  const generateRandomData = () => {
    const randomNumbers = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 1
    );
    setInputValue(randomNumbers.join(', '));
  };

  const getPlaceholder = () => {
    if (algorithm?.includes('Graph')) {
      return 'e.g., 0-1, 1-2, 2-3 (graph edges)';
    } else if (algorithm?.includes('Tree')) {
      return 'e.g., 50, 30, 70, 20, 40 (tree values)';
    } else {
      return 'e.g., 64, 34, 25, 12, 22, 11, 90';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
        />
        <Button
          variant="outline"
          onClick={generateRandomData}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Random
        </Button>
        <Button
          onClick={handleVisualize}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500"
        >
          <Play className="w-4 h-4" />
          Visualize
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        Enter comma-separated numbers to visualize the algorithm
      </p>
    </div>
  );
};
