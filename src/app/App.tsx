import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { InputSection } from "./components/InputSection";
import { VisualizationCanvas } from "./components/VisualizationCanvas";
import { PlaybackControls } from "./components/PlaybackControls";
import { AlgorithmInfo } from "./components/AlgorithmInfo";
import { algorithms } from "./data/algorithms";
import {
  generateVisualizationSteps,
  getDefaultInput,
  type VisualizationStep,
} from "./data/visualization";

function AppContent() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble Sort");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputData, setInputData] = useState<number[]>(getDefaultInput("Bubble Sort"));
  const [steps, setSteps] = useState<VisualizationStep[]>(
    generateVisualizationSteps("Bubble Sort", getDefaultInput("Bubble Sort")),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const currentAlgorithmData = useMemo(
    () => algorithms.find((algorithm) => algorithm.name === selectedAlgorithm) ?? null,
    [selectedAlgorithm],
  );

  useEffect(() => {
    const defaultInput = getDefaultInput(selectedAlgorithm);
    setInputData(defaultInput);
    setSteps(generateVisualizationSteps(selectedAlgorithm, defaultInput));
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedAlgorithm]);

  useEffect(() => {
    if (!isPlaying || steps.length <= 1) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setCurrentStep((previousStep) =>
        Math.min(previousStep + 1, steps.length - 1),
      );
    }, 900 / speed);

    return () => window.clearTimeout(timeout);
  }, [currentStep, isPlaying, speed, steps.length]);

  const activeStep = steps[currentStep] ?? null;

  const handleVisualize = (data: number[]) => {
    const normalizedData = data.length > 0 ? data : getDefaultInput(selectedAlgorithm);
    setInputData(normalizedData);
    setSteps(generateVisualizationSteps(selectedAlgorithm, normalizedData));
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (steps.length <= 1) return;
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying((previousValue) => !previousValue);
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentStep((previousStep) => Math.max(0, previousStep - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((previousStep) => Math.min(steps.length - 1, previousStep + 1));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(251,146,60,0.14),_transparent_30%),linear-gradient(180deg,_#f7fafc_0%,_#eef2ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] dark:text-slate-100">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        <Sidebar
          searchQuery={searchQuery}
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
        />

        <main className="flex-1 p-4 md:p-6 xl:p-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6">
            <InputSection
              algorithm={selectedAlgorithm}
              initialData={inputData}
              onVisualize={handleVisualize}
            />

            <VisualizationCanvas
              algorithm={selectedAlgorithm}
              currentStep={currentStep}
              step={activeStep}
              totalSteps={steps.length}
            />

            <PlaybackControls
              currentStep={currentStep}
              isPlaying={isPlaying}
              onNext={handleNext}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              speed={speed}
              totalSteps={steps.length}
            />
          </div>
        </main>

        <AlgorithmInfo
          algorithm={currentAlgorithmData}
          currentStep={activeStep?.currentLine ?? 0}
          currentStepIndex={currentStep}
          message={activeStep?.message ?? "Pick an algorithm to begin."}
          totalSteps={steps.length}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
