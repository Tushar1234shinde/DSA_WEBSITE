export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  pseudoCode: string[];
}

export interface AlgorithmCategory {
  name: string;
  items: string[];
}

export const algorithmCategories: AlgorithmCategory[] = [
  {
    name: "Arrays",
    items: ["Array Traversal", "Array Rotation", "Kadane's Algorithm"],
  },
  {
    name: "Linked List",
    items: ["Insert Node", "Delete Node", "Reverse List"],
  },
  {
    name: "Stack",
    items: ["Push Operation", "Pop Operation", "Stack Applications"],
  },
  {
    name: "Queue",
    items: ["Enqueue", "Dequeue", "Circular Queue"],
  },
  {
    name: "Trees",
    items: ["Binary Tree Traversal", "BST Insert", "BST Search"],
  },
  {
    name: "Graphs",
    items: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm"],
  },
  {
    name: "Sorting Algorithms",
    items: [
      "Bubble Sort",
      "Quick Sort",
      "Merge Sort",
      "Insertion Sort",
      "Selection Sort",
    ],
  },
  {
    name: "Searching Algorithms",
    items: ["Linear Search", "Binary Search", "Jump Search"],
  },
];

const algorithmMap: Record<string, Algorithm> = {
  "Bubble Sort": {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting Algorithms",
    description:
      "Repeatedly compares adjacent values and swaps them until larger values bubble to the end.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(1)",
    pseudoCode: [
      "for i from 0 to n - 1",
      "  swapped = false",
      "  for j from 0 to n - i - 2",
      "    if arr[j] > arr[j + 1]",
      "      swap arr[j], arr[j + 1]",
      "      swapped = true",
      "  if swapped is false, break",
    ],
  },
  "Quick Sort": {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting Algorithms",
    description:
      "Chooses a pivot, partitions the array around it, then recursively sorts the two halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(log n)",
    pseudoCode: [
      "quickSort(low, high)",
      "  if low >= high, return",
      "  pivot = partition(low, high)",
      "  quickSort(low, pivot - 1)",
      "  quickSort(pivot + 1, high)",
      "partition places pivot in final position",
    ],
  },
  "Merge Sort": {
    id: "merge-sort",
    name: "Merge Sort",
    category: "Sorting Algorithms",
    description:
      "Splits the array into halves, sorts both halves, and merges them in sorted order.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    pseudoCode: [
      "mergeSort(arr)",
      "  if length <= 1, return arr",
      "  split into left and right halves",
      "  sort left and sort right",
      "  merge the two sorted halves",
    ],
  },
  "Insertion Sort": {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting Algorithms",
    description:
      "Builds a sorted section one value at a time by inserting each element into the right position.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(1)",
    pseudoCode: [
      "for i from 1 to n - 1",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key",
      "    arr[j + 1] = arr[j]",
      "    j = j - 1",
      "  arr[j + 1] = key",
    ],
  },
  "Selection Sort": {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting Algorithms",
    description:
      "Finds the smallest remaining value in each pass and places it at the next sorted position.",
    timeComplexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(1)",
    pseudoCode: [
      "for i from 0 to n - 1",
      "  minIndex = i",
      "  for j from i + 1 to n - 1",
      "    if arr[j] < arr[minIndex]",
      "      minIndex = j",
      "  swap arr[i], arr[minIndex]",
    ],
  },
  "Binary Search": {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching Algorithms",
    description:
      "Searches a sorted array by cutting the search range in half at each step.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    pseudoCode: [
      "left = 0, right = n - 1",
      "while left <= right",
      "  mid = floor((left + right) / 2)",
      "  if arr[mid] == target, return mid",
      "  if arr[mid] < target, left = mid + 1",
      "  else right = mid - 1",
    ],
  },
  "Linear Search": {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching Algorithms",
    description:
      "Scans the array from left to right until the target value is found or the list ends.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    pseudoCode: [
      "for each index i in arr",
      "  if arr[i] == target",
      "    return i",
      "return -1",
    ],
  },
  "Breadth-First Search": {
    id: "breadth-first-search",
    name: "Breadth-First Search",
    category: "Graphs",
    description:
      "Traverses graph nodes level by level using a queue.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    spaceComplexity: "O(V)",
    pseudoCode: [
      "queue = [start]",
      "visited = {start}",
      "while queue not empty",
      "  node = queue.dequeue()",
      "  visit node",
      "  enqueue unvisited neighbors",
    ],
  },
  "Depth-First Search": {
    id: "depth-first-search",
    name: "Depth-First Search",
    category: "Graphs",
    description:
      "Traverses as deep as possible along each branch before backtracking.",
    timeComplexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    spaceComplexity: "O(V)",
    pseudoCode: [
      "stack = [start]",
      "visited = {}",
      "while stack not empty",
      "  node = stack.pop()",
      "  if node not visited, visit it",
      "  push unvisited neighbors",
    ],
  },
};

function createFallbackAlgorithm(name: string, category: string): Algorithm {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    category,
    description:
      "A conceptual learning card for this topic. Add custom input and walkthrough logic to extend the visualizer further.",
    timeComplexity: {
      best: "Varies",
      average: "Varies",
      worst: "Varies",
    },
    spaceComplexity: "Varies",
    pseudoCode: [
      `Understand the core idea behind ${name}`,
      "Pick a representative example input",
      "Trace the state changes step by step",
      "Observe the result and time/space tradeoffs",
    ],
  };
}

export const algorithms: Algorithm[] = algorithmCategories.flatMap((category) =>
  category.items.map(
    (item) => algorithmMap[item] ?? createFallbackAlgorithm(item, category.name),
  ),
);
