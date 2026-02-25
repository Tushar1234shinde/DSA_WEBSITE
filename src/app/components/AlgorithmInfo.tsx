import { Algorithm } from '../data/algorithms';
import { Clock, HardDrive, Code } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface AlgorithmInfoProps {
  algorithm: Algorithm | null;
  currentStep: number;
}

export const AlgorithmInfo = ({ algorithm, currentStep }: AlgorithmInfoProps) => {
  if (!algorithm) {
    return (
      <aside className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-600 text-center">
            Select an algorithm to view details
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {algorithm.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {algorithm.description}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Time Complexity */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Time Complexity
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Best:</span>
                <Badge variant="secondary" className="font-mono text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900">
                  {algorithm.timeComplexity.best}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Average:</span>
                <Badge variant="secondary" className="font-mono text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900">
                  {algorithm.timeComplexity.average}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">Worst:</span>
                <Badge variant="secondary" className="font-mono text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900">
                  {algorithm.timeComplexity.worst}
                </Badge>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-100 dark:border-purple-900">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Space Complexity
              </h3>
            </div>
            <Badge variant="secondary" className="font-mono text-xs bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900">
              {algorithm.spaceComplexity}
            </Badge>
          </div>

          {/* Pseudo Code */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Pseudo Code
              </h3>
            </div>
            <div className="space-y-1">
              {algorithm.pseudoCode.map((line, index) => (
                <div
                  key={index}
                  className={`font-mono text-xs py-1 px-2 rounded transition-colors ${
                    index === currentStep
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
