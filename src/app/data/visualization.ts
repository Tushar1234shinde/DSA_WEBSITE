export interface VisualizationStep {
  array: number[];
  currentLine: number;
  message: string;
  activeIndices?: number[];
  comparedIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
  foundIndex?: number;
  searchRange?: [number, number];
  renderMode?: "boxes" | "tree" | "graph";
  nodeLabels?: string[];
  edges?: Array<[number, number]>;
}

const defaultData = [64, 34, 25, 12, 22, 11, 90];
const treeData = [8, 3, 10, 1, 6, 14, 4];
const graphData = [0, 1, 2, 3, 4, 5];
const queueData = [12, 24, 36, 48, 60];
const stackData = [10, 20, 30, 40];
const graphEdges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [4, 5],
];

const clone = (step: VisualizationStep): VisualizationStep => ({
  ...step,
  array: [...step.array],
  activeIndices: step.activeIndices ? [...step.activeIndices] : [],
  comparedIndices: step.comparedIndices ? [...step.comparedIndices] : [],
  sortedIndices: step.sortedIndices ? [...step.sortedIndices] : [],
  searchRange: step.searchRange ? ([...step.searchRange] as [number, number]) : undefined,
  nodeLabels: step.nodeLabels ? [...step.nodeLabels] : undefined,
  edges: step.edges ? step.edges.map(([a, b]) => [a, b]) : undefined,
});

const push = (steps: VisualizationStep[], step: VisualizationStep) => steps.push(clone(step));

const init = (array: number[], message: string, extra?: Partial<VisualizationStep>): VisualizationStep => ({
  array,
  currentLine: 0,
  message,
  activeIndices: [],
  comparedIndices: [],
  sortedIndices: [],
  renderMode: "boxes",
  ...extra,
});

const unique = (input: number[]) => Array.from(new Set(input));
const treeStep = (array: number[], currentLine: number, message: string, extra?: Partial<VisualizationStep>): VisualizationStep => ({
  array,
  currentLine,
  message,
  renderMode: "tree",
  ...extra,
});
const graphStep = (
  array: number[],
  currentLine: number,
  message: string,
  nodeLabels: string[],
  extra?: Partial<VisualizationStep>,
): VisualizationStep => ({
  array,
  currentLine,
  message,
  renderMode: "graph",
  nodeLabels,
  edges: graphEdges,
  ...extra,
});

function bubbleSortSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const sorted = new Set<number>();
  push(steps, init(arr, "Starting Bubble Sort."));
  for (let i = 0; i < arr.length; i += 1) {
    let swapped = false;
    push(steps, { array: arr, currentLine: 1, message: `Pass ${i + 1}: scan adjacent values.`, sortedIndices: [...sorted], activeIndices: [i] });
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      push(steps, { array: arr, currentLine: 2, message: `Compare ${arr[j]} and ${arr[j + 1]}.`, sortedIndices: [...sorted], comparedIndices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        push(steps, { array: arr, currentLine: 4, message: `Swap ${arr[j + 1]} with ${arr[j]}.`, sortedIndices: [...sorted], activeIndices: [j, j + 1] });
      }
    }
    sorted.add(arr.length - i - 1);
    push(steps, { array: arr, currentLine: swapped ? 4 : 5, message: swapped ? `Largest value is fixed at index ${arr.length - i - 1}.` : "No swaps happened, so the array is already sorted.", sortedIndices: [...sorted] });
    if (!swapped) break;
  }
  push(steps, { array: arr, currentLine: 5, message: "Bubble Sort finished.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function insertionSortSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Starting Insertion Sort."));
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    push(steps, { array: arr, currentLine: 1, message: `Pick ${key} and insert it into the sorted left side.`, activeIndices: [i], sortedIndices: Array.from({ length: i }, (_, k) => k) });
    while (j >= 0 && arr[j] > key) {
      push(steps, { array: arr, currentLine: 3, message: `Shift ${arr[j]} right because it is greater than ${key}.`, comparedIndices: [j, j + 1], sortedIndices: Array.from({ length: i }, (_, k) => k) });
      arr[j + 1] = arr[j];
      push(steps, { array: arr, currentLine: 4, message: `Moved ${arr[j + 1]} to index ${j + 1}.`, activeIndices: [j + 1] });
      j -= 1;
    }
    arr[j + 1] = key;
    push(steps, { array: arr, currentLine: 6, message: `${key} is now in the correct position.`, activeIndices: [j + 1], sortedIndices: Array.from({ length: i + 1 }, (_, k) => k) });
  }
  push(steps, { array: arr, currentLine: 6, message: "Insertion Sort finished.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function selectionSortSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const sorted = new Set<number>();
  push(steps, init(arr, "Starting Selection Sort."));
  for (let i = 0; i < arr.length; i += 1) {
    let min = i;
    push(steps, { array: arr, currentLine: 1, message: `Assume index ${i} holds the minimum value.`, activeIndices: [i], sortedIndices: [...sorted] });
    for (let j = i + 1; j < arr.length; j += 1) {
      push(steps, { array: arr, currentLine: 2, message: `Compare current minimum ${arr[min]} with ${arr[j]}.`, comparedIndices: [min, j], sortedIndices: [...sorted] });
      if (arr[j] < arr[min]) {
        min = j;
        push(steps, { array: arr, currentLine: 3, message: `${arr[min]} is the new minimum.`, activeIndices: [min], sortedIndices: [...sorted] });
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    sorted.add(i);
    push(steps, { array: arr, currentLine: 4, message: `Place the minimum value at index ${i}.`, activeIndices: [i, min], sortedIndices: [...sorted] });
  }
  push(steps, { array: arr, currentLine: 4, message: "Selection Sort finished.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function quickSortSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const sorted = new Set<number>();
  push(steps, init(arr, "Starting Quick Sort."));
  const sort = (low: number, high: number) => {
    push(steps, { array: arr, currentLine: 0, message: `Quick Sort range [${low}, ${high}].`, sortedIndices: [...sorted], searchRange: [low, high] });
    if (low >= high) {
      if (low === high) sorted.add(low);
      push(steps, { array: arr, currentLine: 1, message: "This partition is already resolved.", sortedIndices: [...sorted], searchRange: [low, high] });
      return;
    }
    const pivot = arr[high];
    let i = low;
    push(steps, { array: arr, currentLine: 2, message: `Choose ${pivot} as the pivot.`, pivotIndex: high, sortedIndices: [...sorted], searchRange: [low, high] });
    for (let j = low; j < high; j += 1) {
      push(steps, { array: arr, currentLine: 2, message: `Compare ${arr[j]} with pivot ${pivot}.`, comparedIndices: [j, high], pivotIndex: high, sortedIndices: [...sorted], searchRange: [low, high] });
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        push(steps, { array: arr, currentLine: 2, message: `Move ${arr[i]} into the left partition.`, activeIndices: [i, j], pivotIndex: high, sortedIndices: [...sorted], searchRange: [low, high] });
        i += 1;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    sorted.add(i);
    push(steps, { array: arr, currentLine: 3, message: `Place pivot ${arr[i]} at its final index ${i}.`, activeIndices: [i, high], pivotIndex: i, sortedIndices: [...sorted], searchRange: [low, high] });
    sort(low, i - 1);
    sort(i + 1, high);
  };
  sort(0, arr.length - 1);
  push(steps, { array: arr, currentLine: 4, message: "Quick Sort finished.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function mergeSortSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Starting Merge Sort."));
  const sort = (left: number, right: number) => {
    push(steps, { array: arr, currentLine: 0, message: `Split range [${left}, ${right}].`, searchRange: [left, right] });
    if (left >= right) {
      push(steps, { array: arr, currentLine: 1, message: "Single value ranges are already sorted.", searchRange: [left, right] });
      return;
    }
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    const merged: number[] = [];
    let i = left;
    let j = mid + 1;
    while (i <= mid && j <= right) {
      push(steps, { array: arr, currentLine: 4, message: `Merge by comparing ${arr[i]} and ${arr[j]}.`, comparedIndices: [i, j], searchRange: [left, right] });
      if (arr[i] <= arr[j]) merged.push(arr[i++]);
      else merged.push(arr[j++]);
    }
    while (i <= mid) merged.push(arr[i++]);
    while (j <= right) merged.push(arr[j++]);
    merged.forEach((value, offset) => {
      arr[left + offset] = value;
      push(steps, { array: arr, currentLine: 4, message: `Write ${value} back into the merged range.`, activeIndices: [left + offset], searchRange: [left, right] });
    });
  };
  sort(0, arr.length - 1);
  push(steps, { array: arr, currentLine: 4, message: "Merge Sort finished.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function binarySearchSteps(input: number[]) {
  const arr = [...input].sort((a, b) => a - b);
  const steps: VisualizationStep[] = [];
  const target = arr[Math.floor(arr.length / 2)];
  let left = 0;
  let right = arr.length - 1;
  push(steps, init(arr, `Search for target ${target} in the sorted array.`));
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    push(steps, { array: arr, currentLine: 2, message: `Check the middle value ${arr[mid]} at index ${mid}.`, activeIndices: [mid], searchRange: [left, right] });
    if (arr[mid] === target) {
      push(steps, { array: arr, currentLine: 3, message: `Target ${target} found at index ${mid}.`, foundIndex: mid, activeIndices: [mid], searchRange: [left, right] });
      return steps;
    }
    if (arr[mid] < target) {
      left = mid + 1;
      push(steps, { array: arr, currentLine: 4, message: `Target is larger, so move left to ${left}.`, activeIndices: [mid], searchRange: [left, right] });
    } else {
      right = mid - 1;
      push(steps, { array: arr, currentLine: 5, message: `Target is smaller, so move right to ${right}.`, activeIndices: [mid], searchRange: [left, right] });
    }
  }
  push(steps, init(arr, "Target not found."));
  return steps;
}

function linearSearchSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const target = arr[arr.length - 1];
  push(steps, init(arr, `Search for target ${target} from left to right.`));
  for (let i = 0; i < arr.length; i += 1) {
    push(steps, { array: arr, currentLine: 1, message: `Check index ${i}.`, activeIndices: [i] });
    if (arr[i] === target) {
      push(steps, { array: arr, currentLine: 2, message: `Found ${target} at index ${i}.`, foundIndex: i, activeIndices: [i] });
      return steps;
    }
  }
  push(steps, init(arr, "Target not found."));
  return steps;
}

function jumpSearchSteps(input: number[]) {
  const arr = [...input].sort((a, b) => a - b);
  const steps: VisualizationStep[] = [];
  const target = arr[arr.length - 2] ?? arr[0];
  const jump = Math.max(1, Math.floor(Math.sqrt(arr.length)));
  let prev = 0;
  let current = jump;
  push(steps, init(arr, `Search for ${target} using jump size ${jump}.`));
  while (prev < arr.length && arr[Math.min(current, arr.length) - 1] < target) {
    const idx = Math.min(current, arr.length) - 1;
    push(steps, { array: arr, currentLine: 1, message: `Jump to index ${idx} and compare ${arr[idx]}.`, activeIndices: [idx], searchRange: [prev, idx] });
    prev = current;
    current += jump;
    if (prev >= arr.length) break;
  }
  for (let i = prev; i < Math.min(current, arr.length); i += 1) {
    push(steps, { array: arr, currentLine: 2, message: `Linear scan inside the block at index ${i}.`, activeIndices: [i], searchRange: [prev, Math.min(current, arr.length) - 1] });
    if (arr[i] === target) {
      push(steps, { array: arr, currentLine: 3, message: `Found ${target} at index ${i}.`, activeIndices: [i], foundIndex: i });
      return steps;
    }
  }
  push(steps, init(arr, "Target not found."));
  return steps;
}

function arrayTraversalSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Start at the first array cell."));
  arr.forEach((value, i) => {
    push(steps, { array: arr, currentLine: 1, message: `Visit index ${i} and read value ${value}.`, activeIndices: [i], sortedIndices: Array.from({ length: i }, (_, k) => k) });
  });
  push(steps, { array: arr, currentLine: 2, message: "Array traversal complete.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function arrayRotationSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const shift = arr.length > 1 ? 2 : 0;
  push(steps, init(arr, `Rotate the array right by ${shift} positions.`));
  for (let i = 0; i < shift; i += 1) {
    const last = arr[arr.length - 1];
    arr.pop();
    arr.unshift(last);
    push(steps, { array: arr, currentLine: 1, message: `Move ${last} from the end to the front.`, activeIndices: [0] });
  }
  push(steps, { array: arr, currentLine: 2, message: "Rotation complete.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function kadaneSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  let current = arr[0] ?? 0;
  let best = arr[0] ?? 0;
  push(steps, init(arr, "Start Kadane's Algorithm with the first value."));
  for (let i = 0; i < arr.length; i += 1) {
    if (i > 0) {
      current = Math.max(arr[i], current + arr[i]);
      best = Math.max(best, current);
    }
    push(steps, { array: arr, currentLine: 1, message: `At index ${i}, current sum is ${current} and best sum is ${best}.`, activeIndices: [i] });
  }
  push(steps, { array: arr, currentLine: 2, message: `Maximum subarray sum found: ${best}.`, sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function insertNodeSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const at = Math.min(2, arr.length);
  push(steps, init(arr, "Traverse the list to the insertion point."));
  for (let i = 0; i < at; i += 1) push(steps, { array: arr, currentLine: 1, message: `Move to node ${i} with value ${arr[i]}.`, activeIndices: [i] });
  arr.splice(at, 0, 99);
  push(steps, { array: arr, currentLine: 2, message: `Insert new node 99 at position ${at}.`, activeIndices: [at] });
  push(steps, { array: arr, currentLine: 3, message: "Reconnect pointers around the new node.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function deleteNodeSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const at = Math.min(2, arr.length - 1);
  push(steps, init(arr, "Find the node to remove."));
  for (let i = 0; i <= at; i += 1) push(steps, { array: arr, currentLine: 1, message: `Visit node ${i} with value ${arr[i]}.`, activeIndices: [i] });
  const [removed] = arr.splice(at, 1);
  push(steps, { array: arr, currentLine: 2, message: `Delete node ${removed} and bypass it.`, activeIndices: [Math.max(0, at - 1)] });
  push(steps, { array: arr, currentLine: 3, message: "Linked list updated after deletion.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function reverseListSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  let left = 0;
  let right = arr.length - 1;
  push(steps, init(arr, "Reverse the linked list by rewiring ends inward."));
  while (left < right) {
    push(steps, { array: arr, currentLine: 1, message: `Swap the direction around nodes ${arr[left]} and ${arr[right]}.`, comparedIndices: [left, right] });
    [arr[left], arr[right]] = [arr[right], arr[left]];
    push(steps, { array: arr, currentLine: 2, message: `The segment between indices ${left} and ${right} is reversed outward.`, activeIndices: [left, right] });
    left += 1;
    right -= 1;
  }
  push(steps, { array: arr, currentLine: 3, message: "Reverse list complete.", sortedIndices: arr.map((_, i) => i) });
  return steps;
}

function pushOperationSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "The current top is the last element."));
  arr.push(55);
  push(steps, { array: arr, currentLine: 1, message: "Push 55 on top of the stack.", activeIndices: [arr.length - 1] });
  push(steps, { array: arr, currentLine: 2, message: "The new top now points to the pushed value.", sortedIndices: [arr.length - 1] });
  return steps;
}

function popOperationSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Identify the current top element."));
  push(steps, { array: arr, currentLine: 1, message: `Top element is ${arr[arr.length - 1]}.`, activeIndices: [arr.length - 1] });
  const removed = arr.pop();
  push(steps, { array: arr, currentLine: 2, message: `Pop ${removed} from the stack.`, activeIndices: [arr.length - 1] });
  push(steps, { array: arr, currentLine: 3, message: "Top moves to the previous element." });
  return steps;
}

function stackApplicationsSteps(input: number[]) {
  const arr = [...input];
  const reversed: number[] = [];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Push each value to simulate a stack-based reversal."));
  arr.forEach((value, i) => push(steps, { array: arr, currentLine: 1, message: `Push ${value} onto the helper stack.`, activeIndices: [i] }));
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    reversed.push(arr[i]);
    push(steps, { array: reversed, currentLine: 2, message: `Pop ${arr[i]} and place it in reversed output.`, activeIndices: [reversed.length - 1] });
  }
  push(steps, { array: reversed, currentLine: 3, message: "Stack application complete: data is reversed.", sortedIndices: reversed.map((_, i) => i) });
  return steps;
}

function enqueueSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "The rear of the queue is the last slot."));
  arr.push(72);
  push(steps, { array: arr, currentLine: 1, message: "Enqueue 72 at the rear.", activeIndices: [arr.length - 1] });
  push(steps, { array: arr, currentLine: 2, message: "Queue state updated after enqueue.", searchRange: [0, arr.length - 1] });
  return steps;
}

function dequeueSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "The front of the queue is the first slot."));
  push(steps, { array: arr, currentLine: 1, message: `Front value ${arr[0]} is ready to leave the queue.`, activeIndices: [0] });
  const removed = arr.shift();
  push(steps, { array: arr, currentLine: 2, message: `Dequeue ${removed} and shift the front forward.`, activeIndices: [0] });
  push(steps, { array: arr, currentLine: 3, message: "Queue state updated after dequeue." });
  return steps;
}

function circularQueueSteps(input: number[]) {
  const arr = [...input];
  const steps: VisualizationStep[] = [];
  const first = arr.shift();
  push(steps, init(arr, "In a circular queue, the front wraps around."));
  if (typeof first === "number") {
    push(steps, { array: [first, ...arr], currentLine: 1, message: `Remove ${first} from the front.`, activeIndices: [0] });
    arr.push(first);
    push(steps, { array: arr, currentLine: 2, message: `Wrap ${first} to the rear to show circular movement.`, activeIndices: [arr.length - 1] });
  }
  push(steps, { array: arr, currentLine: 3, message: "Front and rear continue in a circular manner.", searchRange: [0, arr.length - 1] });
  return steps;
}

function binaryTreeTraversalSteps(input: number[]) {
  const arr = unique(input);
  const order = [0, 1, 3, 4, 2, 5, 6].filter((i) => i < arr.length);
  const steps: VisualizationStep[] = [];
  push(steps, init(arr, "Use preorder traversal: root, left, right.", { renderMode: "tree" }));
  order.forEach((index, visited) => {
    push(steps, treeStep(arr, 1, `Visit node ${arr[index]} as traversal step ${visited + 1}.`, { activeIndices: [index], sortedIndices: order.slice(0, visited) }));
  });
  push(steps, treeStep(arr, 2, "Binary tree traversal complete.", { sortedIndices: order }));
  return steps;
}

function bstInsertSteps(input: number[]) {
  const arr = unique(input);
  const steps: VisualizationStep[] = [];
  const value = 9;
  push(steps, init(arr, `Insert ${value} into the BST.`, { renderMode: "tree" }));
  let index = 0;
  while (index < arr.length) {
    push(steps, treeStep(arr, 1, `Compare ${value} with node ${arr[index]}.`, { activeIndices: [index] }));
    if (value < arr[index]) {
      const next = index * 2 + 1;
      if (next >= arr.length) break;
      index = next;
    } else {
      const next = index * 2 + 2;
      if (next >= arr.length) break;
      index = next;
    }
  }
  const nextIndex = value < arr[index] ? index * 2 + 1 : index * 2 + 2;
  while (arr.length < nextIndex) arr.push(Number.NaN);
  if (nextIndex >= arr.length) arr.push(value);
  else arr.splice(nextIndex, 0, value);
  const finalTree = arr.filter((node) => !Number.isNaN(node));
  push(steps, treeStep(finalTree, 2, `Insert ${value} as a new BST node.`, { activeIndices: [finalTree.indexOf(value)] }));
  push(steps, treeStep(finalTree, 3, "BST structure updated after insertion.", { sortedIndices: finalTree.map((_, i) => i) }));
  return steps;
}

function bstSearchSteps(input: number[]) {
  const arr = unique(input);
  const steps: VisualizationStep[] = [];
  const target = arr[Math.min(4, arr.length - 1)] ?? arr[0];
  push(steps, init(arr, `Search for ${target} in the BST.`, { renderMode: "tree" }));
  let index = 0;
  while (index < arr.length) {
    push(steps, treeStep(arr, 1, `Check node ${arr[index]}.`, { activeIndices: [index] }));
    if (arr[index] === target) {
      push(steps, treeStep(arr, 2, `Found ${target} in the BST.`, { activeIndices: [index], foundIndex: index }));
      return steps;
    }
    index = target < arr[index] ? index * 2 + 1 : index * 2 + 2;
  }
  push(steps, treeStep(arr, 3, "Target not found in the BST."));
  return steps;
}

function breadthFirstSearchSteps(input: number[]) {
  const nodes = unique(input);
  const labels = nodes.map(String);
  const order = [0, 1, 2, 3, 4, 5].filter((i) => i < nodes.length);
  const steps: VisualizationStep[] = [];
  push(steps, graphStep(nodes, 0, "Start BFS from node 0 and expand level by level.", labels));
  order.forEach((index, visited) => {
    push(steps, graphStep(nodes, 1, `Dequeue node ${labels[index]} and visit it.`, labels, { activeIndices: [index], sortedIndices: order.slice(0, visited) }));
  });
  push(steps, graphStep(nodes, 2, "Breadth-first traversal complete.", labels, { sortedIndices: order }));
  return steps;
}

function depthFirstSearchSteps(input: number[]) {
  const nodes = unique(input);
  const labels = nodes.map(String);
  const order = [0, 1, 3, 4, 2, 5].filter((i) => i < nodes.length);
  const steps: VisualizationStep[] = [];
  push(steps, graphStep(nodes, 0, "Start DFS and follow one branch deeply before backtracking.", labels));
  order.forEach((index, visited) => {
    push(steps, graphStep(nodes, 1, `Visit node ${labels[index]} using the stack.`, labels, { activeIndices: [index], sortedIndices: order.slice(0, visited) }));
  });
  push(steps, graphStep(nodes, 2, "Depth-first traversal complete.", labels, { sortedIndices: order }));
  return steps;
}

function dijkstraSteps(input: number[]) {
  const nodes = unique(input).slice(0, 6);
  const labels = nodes.map(String);
  const dist = nodes.map((_, i) => (i === 0 ? 0 : i * 3 + 1));
  const steps: VisualizationStep[] = [];
  push(steps, graphStep(dist, 0, "Initialize source distance to 0 and others to tentative values.", labels));
  dist.forEach((value, i) => {
    push(steps, graphStep(dist, 1, `Choose node ${labels[i]} with current shortest distance ${value}.`, labels, { activeIndices: [i], sortedIndices: Array.from({ length: i }, (_, k) => k) }));
  });
  push(steps, graphStep(dist, 2, "Dijkstra's relaxation process finishes with shortest distances.", labels, { sortedIndices: dist.map((_, i) => i) }));
  return steps;
}

function fallbackSteps(input: number[], algorithm: string) {
  return [init([...input], `${algorithm} is loaded and ready, but its custom visualization flow has not been modeled yet.`)];
}

export function getDefaultInput(algorithm: string | null) {
  switch (algorithm) {
    case "Binary Search":
    case "Linear Search":
    case "Jump Search":
      return [4, 8, 15, 16, 23, 42, 108];
    case "Binary Tree Traversal":
    case "BST Insert":
    case "BST Search":
      return treeData;
    case "Breadth-First Search":
    case "Depth-First Search":
    case "Dijkstra's Algorithm":
      return graphData;
    case "Push Operation":
    case "Pop Operation":
    case "Stack Applications":
      return stackData;
    case "Enqueue":
    case "Dequeue":
    case "Circular Queue":
      return queueData;
    default:
      return defaultData;
  }
}

export function generateVisualizationSteps(algorithm: string | null, input: number[]) {
  const safeInput = input.length > 0 ? input : getDefaultInput(algorithm);
  switch (algorithm) {
    case "Bubble Sort": return bubbleSortSteps(safeInput);
    case "Insertion Sort": return insertionSortSteps(safeInput);
    case "Selection Sort": return selectionSortSteps(safeInput);
    case "Quick Sort": return quickSortSteps(safeInput);
    case "Merge Sort": return mergeSortSteps(safeInput);
    case "Binary Search": return binarySearchSteps(safeInput);
    case "Linear Search": return linearSearchSteps(safeInput);
    case "Jump Search": return jumpSearchSteps(safeInput);
    case "Array Traversal": return arrayTraversalSteps(safeInput);
    case "Array Rotation": return arrayRotationSteps(safeInput);
    case "Kadane's Algorithm": return kadaneSteps(safeInput);
    case "Insert Node": return insertNodeSteps(safeInput);
    case "Delete Node": return deleteNodeSteps(safeInput);
    case "Reverse List": return reverseListSteps(safeInput);
    case "Push Operation": return pushOperationSteps(safeInput);
    case "Pop Operation": return popOperationSteps(safeInput);
    case "Stack Applications": return stackApplicationsSteps(safeInput);
    case "Enqueue": return enqueueSteps(safeInput);
    case "Dequeue": return dequeueSteps(safeInput);
    case "Circular Queue": return circularQueueSteps(safeInput);
    case "Binary Tree Traversal": return binaryTreeTraversalSteps(safeInput);
    case "BST Insert": return bstInsertSteps(safeInput);
    case "BST Search": return bstSearchSteps(safeInput);
    case "Breadth-First Search": return breadthFirstSearchSteps(safeInput);
    case "Depth-First Search": return depthFirstSearchSteps(safeInput);
    case "Dijkstra's Algorithm": return dijkstraSteps(safeInput);
    default: return fallbackSteps(safeInput, algorithm ?? "Algorithm");
  }
}
