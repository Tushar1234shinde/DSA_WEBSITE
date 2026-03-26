import { Clock3, Code2, HardDrive, MessageSquareQuote } from "lucide-react";
import { type Algorithm } from "../data/algorithms";
import { ScrollArea } from "./ui/scroll-area";

interface AlgorithmInfoProps {
  algorithm: Algorithm | null;
  currentStep: number;
  currentStepIndex: number;
  message: string;
  totalSteps: number;
}

export const AlgorithmInfo = ({
  algorithm,
  currentStep,
  currentStepIndex,
  message,
  totalSteps,
}: AlgorithmInfoProps) => {
  if (!algorithm) {
    return null;
  }

  return (
    <aside className="border-t border-white/30 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/45 lg:w-[360px] lg:border-t-0 lg:border-l">
      <ScrollArea className="h-[420px] lg:h-[calc(100vh-4rem)]">
        <div className="space-y-6 p-5">
          <section className="rounded-[1.75rem] bg-slate-950 p-5 text-white dark:bg-slate-900">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Active Topic
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">{algorithm.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {algorithm.description}
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
              <div className="mb-3 flex items-center gap-2 text-sky-700 dark:text-sky-300">
                <Clock3 className="size-4" />
                <h3 className="text-sm font-semibold">Time Complexity</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>Best: {algorithm.timeComplexity.best}</p>
                <p>Average: {algorithm.timeComplexity.average}</p>
                <p>Worst: {algorithm.timeComplexity.worst}</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
              <div className="mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <HardDrive className="size-4" />
                <h3 className="text-sm font-semibold">Space Complexity</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {algorithm.spaceComplexity}
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/40 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <MessageSquareQuote className="size-4" />
              <h3 className="text-sm font-semibold">Current Readout</h3>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {message}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Playback {currentStepIndex + 1}/{totalSteps}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/40 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Code2 className="size-4" />
              <h3 className="text-sm font-semibold">Pseudo Code</h3>
            </div>
            <div className="space-y-2">
              {algorithm.pseudoCode.map((line, index) => {
                const isActive = index === currentStep;
                return (
                  <div
                    key={`${algorithm.id}-${index}`}
                    className={`rounded-2xl px-3 py-2 font-mono text-xs leading-6 transition ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-400"
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </ScrollArea>
    </aside>
  );
};
