import { useEffect, useState } from "react";
import { Play, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getDefaultInput } from "../data/visualization";

interface InputSectionProps {
  algorithm: string;
  initialData: number[];
  onVisualize: (data: number[]) => void;
}

function randomArray(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);
}

export const InputSection = ({
  algorithm,
  initialData,
  onVisualize,
}: InputSectionProps) => {
  const [inputValue, setInputValue] = useState(initialData.join(", "));

  useEffect(() => {
    setInputValue(initialData.join(", "));
  }, [initialData]);

  const handleVisualize = () => {
    const parsedData = inputValue
      .split(",")
      .map((value) => Number.parseInt(value.trim(), 10))
      .filter((value) => !Number.isNaN(value));

    onVisualize(parsedData);
  };

  const handleRandomize = () => {
    const randomized = algorithm.includes("Search")
      ? randomArray(8).sort((a, b) => a - b)
      : randomArray(7);

    setInputValue(randomized.join(", "));
    onVisualize(randomized);
  };

  const handleResetTemplate = () => {
    const defaults = getDefaultInput(algorithm);
    setInputValue(defaults.join(", "));
    onVisualize(defaults);
  };

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/75 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-none">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
              Input Playground
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {algorithm}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Use comma-separated values, then play the algorithm one step at a
              time. Search algorithms use sorted data automatically so the demo
              stays meaningful.
            </p>
          </div>

          <div className="flex flex-col gap-3 xl:flex-row">
            <Input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleVisualize();
              }}
              placeholder="64, 34, 25, 12, 22, 11, 90"
              className="h-12 flex-1 rounded-2xl border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRandomize}
                className="h-12 rounded-2xl border-slate-200 px-5 dark:border-slate-700"
              >
                <Sparkles className="size-4" />
                Random
              </Button>
              <Button
                onClick={handleVisualize}
                className="h-12 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-400 px-5 text-white hover:from-sky-600 hover:via-cyan-600 hover:to-orange-500"
              >
                <Play className="size-4" />
                Visualize
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-2 text-cyan-300">
            <RefreshCw className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Fast Setup
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Reset to a ready-made dataset if you want to jump back into a clean
            demo state without editing the input manually.
          </p>
          <Button
            variant="outline"
            onClick={handleResetTemplate}
            className="mt-4 h-11 rounded-2xl border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
          >
            Use Recommended Example
          </Button>
        </div>
      </div>
    </section>
  );
};
