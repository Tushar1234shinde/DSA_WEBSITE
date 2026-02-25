import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const PlaybackControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
  speed,
  onSpeedChange
}: PlaybackControlsProps) => {
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            className="rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            className="rounded-lg"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            onClick={onPlayPause}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" fill="white" />
            ) : (
              <Play className="w-4 h-4" fill="white" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            className="rounded-lg"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xs">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Speed
          </span>
          <Slider
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            min={0.5}
            max={2}
            step={0.1}
            className="flex-1"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
            {speed}x
          </span>
        </div>
      </div>
    </div>
  );
};
