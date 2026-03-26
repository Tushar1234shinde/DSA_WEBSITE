# DSA Website

A modern Data Structures and Algorithms visualizer built with React, Vite, Tailwind CSS, and Motion. The project is designed to help learners understand algorithm flow through step-by-step playback, animated transitions, pseudo-code highlighting, and topic-specific visual layouts.

## Live Demo

Deployed app: https://dsawebsite-six.vercel.app/

## Project Overview

This project turns common DSA topics into interactive visual explanations. Users can choose an algorithm from the sidebar, provide custom input data, and play each step of the algorithm using animation controls.

The application includes:

- Sorting algorithm playback with animated comparisons and swaps
- Searching algorithm playback with step-by-step target tracking
- Array, linked list, stack, and queue demonstrations
- Tree visualizations with hierarchy-style rendering
- Graph visualizations with node-edge layouts
- Pseudo-code highlighting synchronized with the current step
- Light and dark theme support

## Supported Topics

### Arrays

- Array Traversal
- Array Rotation
- Kadane's Algorithm

### Linked List

- Insert Node
- Delete Node
- Reverse List

### Stack

- Push Operation
- Pop Operation
- Stack Applications

### Queue

- Enqueue
- Dequeue
- Circular Queue

### Trees

- Binary Tree Traversal
- BST Insert
- BST Search

### Graphs

- Breadth-First Search
- Depth-First Search
- Dijkstra's Algorithm

### Sorting Algorithms

- Bubble Sort
- Quick Sort
- Merge Sort
- Insertion Sort
- Selection Sort

### Searching Algorithms

- Linear Search
- Binary Search
- Jump Search

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Motion
- Radix UI
- Lucide React

## Key Features

- Interactive playback controls for play, pause, next, previous, reset, and speed adjustment
- Dynamic input handling with manual input and random dataset generation
- Responsive layout for desktop and smaller screens
- Visual differentiation for active, compared, visited, found, pivot, and sorted states
- Dedicated render modes for box-based, tree-based, and graph-based visualizations

## Project Structure

```text
src/
  app/
    components/      UI and visualization components
    contexts/        Theme context
    data/            Algorithm metadata and visualization step generation
  styles/            Global theme and Tailwind styling
  main.tsx           App entry point
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## How It Works

Each supported algorithm is mapped to a step generator inside the project data layer. These generators produce a sequence of visualization states. Every state includes the current data snapshot, active indices, highlighted nodes, explanatory message, and pseudo-code line number. The UI consumes those steps and animates the selected structure accordingly.

## Use Cases

- Learning DSA concepts visually
- Teaching algorithms in classrooms or presentations
- Practicing step-by-step algorithm tracing
- Demonstrating the difference between data structures and algorithm behavior

## Deployment

This project is deployed on Vercel:

https://dsawebsite-six.vercel.app/

## Future Improvements

- More advanced linked list rendering with arrow-based node connections
- More accurate tree insertion and balancing visuals
- Richer graph edge weights and path highlighting
- Additional algorithms and traversal modes
- User-selected targets for searching algorithms

## Author Notes

This project started as a UI-based DSA platform idea and was expanded into a working educational visualizer with playable algorithm flows and structure-aware rendering.
