import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface PlaybackControlsProps {
  currentStep: number;
  isPlaying: boolean;
  onNext: () => void;
  onPlayPause: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  totalSteps: number;
}

export const PlaybackControls = ({
  currentStep,
  isPlaying,
  onNext,
  onPlayPause,
  onPrevious,
  onReset,
  onSpeedChange,
  speed,
  totalSteps,
}: PlaybackControlsProps) => {
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <section className="rounded-[2rem] border border-white/40 bg-white/75 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-none">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            className="size-11 rounded-2xl border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            className="size-11 rounded-2xl border-slate-200 dark:border-slate-700"
          >
            <SkipBack className="size-4" />
          </Button>
          <Button
            size="icon"
            onClick={onPlayPause}
            className="size-12 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-400 text-white hover:from-sky-600 hover:via-cyan-600 hover:to-orange-500"
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            className="size-11 rounded-2xl border-slate-200 dark:border-slate-700"
          >
            <SkipForward className="size-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:max-w-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {progress.toFixed(0)}% complete
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:w-72">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
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
          <span className="w-10 text-right text-sm font-semibold text-slate-800 dark:text-slate-200">
            {speed.toFixed(1)}x
          </span>
        </div>
      </div>
    </section>
  );
};
