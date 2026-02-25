import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { InputSection } from './components/InputSection';
import { VisualizationCanvas } from './components/VisualizationCanvas';
import { PlaybackControls } from './components/PlaybackControls';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { algorithms } from './data/algorithms';

function AppContent() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [visualizationData, setVisualizationData] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const currentAlgorithmData = selectedAlgorithm
    ? algorithms.find(algo => algo.name === selectedAlgorithm) || null
    : null;

  const handleVisualize = (data: number[]) => {
    setVisualizationData(data);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (currentAlgorithmData) {
      setCurrentStep(prev => Math.min(currentAlgorithmData.pseudoCode.length - 1, prev + 1));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-black">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={setSelectedAlgorithm}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">
              <InputSection
                onVisualize={handleVisualize}
                algorithm={selectedAlgorithm}
              />

              <div className="h-[400px]">
                <VisualizationCanvas
                  data={visualizationData}
                  isPlaying={isPlaying}
                  currentStep={currentStep}
                  algorithm={selectedAlgorithm || ''}
                />
              </div>

              <PlaybackControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            </div>
          </div>
        </main>

        <AlgorithmInfo
          algorithm={currentAlgorithmData}
          currentStep={currentStep}
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
