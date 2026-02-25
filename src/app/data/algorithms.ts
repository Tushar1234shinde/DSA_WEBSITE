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

export const algorithmCategories = [
  {
    name: 'Arrays',
    items: ['Array Traversal', 'Array Rotation', 'Kadane\'s Algorithm']
  },
  {
    name: 'Linked List',
    items: ['Insert Node', 'Delete Node', 'Reverse List']
  },
  {
    name: 'Stack',
    items: ['Push Operation', 'Pop Operation', 'Stack Applications']
  },
  {
    name: 'Queue',
    items: ['Enqueue', 'Dequeue', 'Circular Queue']
  },
  {
    name: 'Trees',
    items: ['Binary Tree Traversal', 'BST Insert', 'BST Search']
  },
  {
    name: 'Graphs',
    items: ['BFS', 'DFS', 'Dijkstra\'s Algorithm']
  },
  {
    name: 'Sorting Algorithms',
    items: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort']
  },
  {
    name: 'Searching Algorithms',
    items: ['Linear Search', 'Binary Search', 'Jump Search']
  }
];

export const algorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting Algorithms',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function bubbleSort(arr):',
      '  n = length(arr)',
      '  for i = 0 to n-1:',
      '    for j = 0 to n-i-1:',
      '      if arr[j] > arr[j+1]:',
      '        swap(arr[j], arr[j+1])',
      '  return arr'
    ]
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting Algorithms',
    description: 'An efficient, divide-and-conquer sorting algorithm that picks a pivot element and partitions the array around it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    pseudoCode: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    pivot = partition(arr, low, high)',
      '    quickSort(arr, low, pivot - 1)',
      '    quickSort(arr, pivot + 1, high)',
      '',
      'function partition(arr, low, high):',
      '  pivot = arr[high]',
      '  i = low - 1',
      '  for j = low to high - 1:',
      '    if arr[j] < pivot:',
      '      i++',
      '      swap(arr[i], arr[j])',
      '  swap(arr[i + 1], arr[high])',
      '  return i + 1'
    ]
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting Algorithms',
    description: 'A divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    pseudoCode: [
      'function mergeSort(arr):',
      '  if length(arr) <= 1:',
      '    return arr',
      '  mid = length(arr) / 2',
      '  left = mergeSort(arr[0...mid])',
      '  right = mergeSort(arr[mid...end])',
      '  return merge(left, right)',
      '',
      'function merge(left, right):',
      '  result = []',
      '  while left and right not empty:',
      '    if left[0] <= right[0]:',
      '      result.append(left[0])',
      '      left.remove_first()',
      '    else:',
      '      result.append(right[0])',
      '      right.remove_first()',
      '  return result + left + right'
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching Algorithms',
    description: 'An efficient searching algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    pseudoCode: [
      'function binarySearch(arr, target):',
      '  left = 0',
      '  right = length(arr) - 1',
      '  while left <= right:',
      '    mid = (left + right) / 2',
      '    if arr[mid] == target:',
      '      return mid',
      '    else if arr[mid] < target:',
      '      left = mid + 1',
      '    else:',
      '      right = mid - 1',
      '  return -1'
    ]
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graphs',
    description: 'A graph traversal algorithm that explores vertices level by level, visiting all neighbors before moving to the next level.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    pseudoCode: [
      'function BFS(graph, start):',
      '  queue = [start]',
      '  visited = set()',
      '  visited.add(start)',
      '  while queue not empty:',
      '    vertex = queue.dequeue()',
      '    process(vertex)',
      '    for neighbor in graph[vertex]:',
      '      if neighbor not in visited:',
      '        visited.add(neighbor)',
      '        queue.enqueue(neighbor)'
    ]
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graphs',
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)'
    },
    spaceComplexity: 'O(V)',
    pseudoCode: [
      'function DFS(graph, start):',
      '  stack = [start]',
      '  visited = set()',
      '  while stack not empty:',
      '    vertex = stack.pop()',
      '    if vertex not in visited:',
      '      visited.add(vertex)',
      '      process(vertex)',
      '      for neighbor in graph[vertex]:',
      '        if neighbor not in visited:',
      '          stack.push(neighbor)'
    ]
  }
];
