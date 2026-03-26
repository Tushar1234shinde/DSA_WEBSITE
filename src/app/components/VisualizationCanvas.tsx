import { motion } from "motion/react";
import { Activity, Goal, Network, ScanSearch } from "lucide-react";
import { type VisualizationStep } from "../data/visualization";

interface VisualizationCanvasProps {
  algorithm: string;
  currentStep: number;
  step: VisualizationStep | null;
  totalSteps: number;
}

const graphPositions = [
  { x: 50, y: 12 },
  { x: 24, y: 35 },
  { x: 76, y: 35 },
  { x: 16, y: 70 },
  { x: 42, y: 72 },
  { x: 78, y: 68 },
];

function getNodeClasses(index: number, step: VisualizationStep) {
  const isSorted = step.sortedIndices?.includes(index);
  const isFound = step.foundIndex === index;
  const isPivot = step.pivotIndex === index;
  const isActive = step.activeIndices?.includes(index);
  const isCompared = step.comparedIndices?.includes(index);
  const isInRange =
    step.searchRange &&
    index >= step.searchRange[0] &&
    index <= step.searchRange[1];

  if (isFound) return "border-emerald-300 bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg shadow-emerald-500/25";
  if (isPivot) return "border-fuchsia-300 bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white shadow-lg shadow-fuchsia-500/20";
  if (isSorted) return "border-cyan-200 bg-gradient-to-br from-cyan-400 to-sky-500 text-white shadow-lg shadow-sky-500/20";
  if (isActive) return "border-orange-200 bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-500/20";
  if (isCompared) return "border-yellow-200 bg-gradient-to-br from-yellow-300 to-orange-400 text-white shadow-lg shadow-yellow-500/20";
  if (isInRange) return "border-slate-300 bg-white text-slate-900 shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";
  return "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300";
}

function getSvgNodePalette(index: number, step: VisualizationStep) {
  const isSorted = step.sortedIndices?.includes(index);
  const isFound = step.foundIndex === index;
  const isPivot = step.pivotIndex === index;
  const isActive = step.activeIndices?.includes(index);
  const isCompared = step.comparedIndices?.includes(index);
  const isInRange =
    step.searchRange &&
    index >= step.searchRange[0] &&
    index <= step.searchRange[1];

  if (isFound) return { fill: "#10b981", stroke: "#6ee7b7", text: "#ffffff" };
  if (isPivot) return { fill: "#a855f7", stroke: "#d8b4fe", text: "#ffffff" };
  if (isSorted) return { fill: "#0ea5e9", stroke: "#7dd3fc", text: "#ffffff" };
  if (isActive) return { fill: "#f97316", stroke: "#fdba74", text: "#ffffff" };
  if (isCompared) return { fill: "#f59e0b", stroke: "#fde68a", text: "#ffffff" };
  if (isInRange) return { fill: "#ffffff", stroke: "#94a3b8", text: "#0f172a" };
  return { fill: "#e2e8f0", stroke: "#cbd5e1", text: "#334155" };
}

function renderBoxes(step: VisualizationStep, currentStep: number) {
  return (
    <div className="relative flex min-h-[300px] flex-wrap items-center justify-center gap-4 rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-950/60">
      {step.array.map((value, index) => (
        <motion.div
          key={`${index}-${value}-${currentStep}`}
          layout
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`flex h-24 w-24 flex-col items-center justify-center rounded-[1.75rem] border text-center ${getNodeClasses(index, step)}`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
            {index}
          </span>
          <span className="mt-1 text-2xl font-semibold">{value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function renderTree(step: VisualizationStep, currentStep: number) {
  const levels = Math.ceil(Math.log2(step.array.length + 1));
  const viewBoxHeight = Math.max(240, levels * 92);
  const radius = 18;

  return (
    <div className="relative min-h-[320px] rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      <svg viewBox={`0 0 100 ${viewBoxHeight}`} className="h-full min-h-[320px] w-full overflow-visible">
        {step.array.map((_, index) => {
          if (index === 0) return null;
          const parent = Math.floor((index - 1) / 2);
          const parentLevel = Math.floor(Math.log2(parent + 1));
          const level = Math.floor(Math.log2(index + 1));
          const parentIndexInLevel = parent - (2 ** parentLevel - 1);
          const indexInLevel = index - (2 ** level - 1);
          const parentX = ((parentIndexInLevel + 1) * 100) / (2 ** parentLevel + 1);
          const x = ((indexInLevel + 1) * 100) / (2 ** level + 1);
          const parentY = 36 + parentLevel * 78;
          const y = 36 + level * 78;
          return (
            <line
              key={`edge-${parent}-${index}-${currentStep}`}
              x1={parentX}
              y1={parentY}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.6"
              className="text-slate-500 dark:text-slate-300"
            />
          );
        })}
        {step.array.map((value, index) => {
          const level = Math.floor(Math.log2(index + 1));
          const indexInLevel = index - (2 ** level - 1);
          const x = ((indexInLevel + 1) * 100) / (2 ** level + 1);
          const y = 36 + level * 78;
          const palette = getSvgNodePalette(index, step);
          return (
            <g key={`node-${index}-${value}-${currentStep}`}>
              <motion.circle
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                cx={x}
                cy={y}
                r={radius}
                fill={palette.fill}
                stroke={palette.stroke}
                strokeWidth="1.2"
              />
              <text x={x} y={y + 2} textAnchor="middle" style={{ fill: palette.text, fontSize: "8px", fontWeight: 700 }}>
                {value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function renderGraph(step: VisualizationStep, currentStep: number) {
  const labels = step.nodeLabels ?? step.array.map(String);
  return (
    <div className="relative min-h-[320px] rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      <svg viewBox="0 0 100 100" className="h-full min-h-[320px] w-full overflow-visible">
        {(step.edges ?? []).map(([from, to], edgeIndex) => {
          const start = graphPositions[from];
          const end = graphPositions[to];
          if (!start || !end) return null;
          return (
            <line
              key={`g-edge-${edgeIndex}-${currentStep}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="0.7"
              className="text-slate-500 dark:text-slate-300"
            />
          );
        })}
        {step.array.map((value, index) => {
          const position = graphPositions[index] ?? { x: 50, y: 50 };
          const palette = getSvgNodePalette(index, step);
          return (
            <g key={`graph-node-${index}-${currentStep}`}>
              <motion.circle
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                cx={position.x}
                cy={position.y}
                r={7.5}
                fill={palette.fill}
                stroke={palette.stroke}
                strokeWidth="1.2"
              />
              <text x={position.x} y={position.y + 1} textAnchor="middle" style={{ fill: palette.text, fontSize: "4px", fontWeight: 700 }}>
                {labels[index]}
              </text>
              <text x={position.x} y={position.y + 13} textAnchor="middle" style={{ fill: "#64748b", fontSize: "3.6px", fontWeight: 700 }}>
                {typeof value === "number" ? value : labels[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export const VisualizationCanvas = ({
  algorithm,
  currentStep,
  step,
  totalSteps,
}: VisualizationCanvasProps) => {
  if (!step) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/60 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
        Select an algorithm and visualize some input to begin.
      </section>
    );
  }

  const focusLabel =
    step.renderMode === "tree"
      ? "Tree path"
      : step.renderMode === "graph"
        ? "Graph traversal"
        : step.activeIndices?.length
          ? "Active box movement"
          : "State review";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/75 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-none">
      <div className="border-b border-slate-200/70 p-6 dark:border-slate-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">
              Visualization Canvas
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {algorithm}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {step.message}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white dark:bg-slate-900">
              <div className="mb-1 flex items-center gap-2 text-cyan-300">
                <Activity className="size-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                  Step
                </span>
              </div>
              <p className="text-lg font-semibold">{currentStep + 1}/{totalSteps}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
              <div className="mb-1 flex items-center gap-2 text-orange-500">
                <Goal className="size-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                  Focus
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {focusLabel}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-slate-900">
              <div className="mb-1 flex items-center gap-2 text-sky-500">
                {step.renderMode === "graph" ? <Network className="size-4" /> : <ScanSearch className="size-4" />}
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                  View
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {step.renderMode === "tree" ? "Hierarchy layout" : step.renderMode === "graph" ? "Node-edge map" : step.searchRange ? `${step.searchRange[0]} to ${step.searchRange[1]}` : "Whole structure"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.12),_transparent_30%)]" />
        {step.renderMode === "tree"
          ? renderTree(step, currentStep)
          : step.renderMode === "graph"
            ? renderGraph(step, currentStep)
            : renderBoxes(step, currentStep)}
      </div>
    </section>
  );
};
