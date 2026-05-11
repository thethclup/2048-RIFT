export type Direction = 'up' | 'down' | 'left' | 'right';

export function initializeGrid(): number[][] {
  let grid = Array(4).fill(null).map(() => Array(4).fill(0));
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
}

export function getEmptyPositions(grid: number[][]): [number, number][] {
  const positions: [number, number][] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) positions.push([r, c]);
    }
  }
  return positions;
}

export function addRandomTile(grid: number[][]): number[][] {
  const positions = getEmptyPositions(grid);
  if (positions.length === 0) return grid;
  const newGrid = grid.map(row => [...row]);
  const [r, c] = positions[Math.floor(Math.random() * positions.length)];
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
}

export function isGameOver(grid: number[][]): boolean {
  if (getEmptyPositions(grid).length > 0) return false;
  
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = grid[r][c];
      if (r < 3 && grid[r + 1][c] === val) return false;
      if (c < 3 && grid[r][c + 1] === val) return false;
    }
  }
  return true;
}

function rotateRight(grid: number[][]): number[][] {
  const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newGrid[c][3 - r] = grid[r][c];
    }
  }
  return newGrid;
}

function rotateLeft(grid: number[][]): number[][] {
  const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newGrid[3 - c][r] = grid[r][c];
    }
  }
  return newGrid;
}

function shiftLeft(grid: number[][]): { grid: number[][], score: number, moved: boolean } {
  let score = 0;
  const newGrid = grid.map(row => {
    let newRow = row.filter(val => val !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow.splice(i + 1, 1);
        }
    }
    while (newRow.length < 4) newRow.push(0);
    return newRow;
  });
  
  const moved = JSON.stringify(grid) !== JSON.stringify(newGrid);
  return { grid: newGrid, score, moved };
}

export function moveGrid(grid: number[][], direction: Direction): { grid: number[][], score: number, moved: boolean } {
  let rotatedGrid = grid;
  let rotations = 0;
  
  if (direction === 'right') rotations = 2;
  else if (direction === 'down') rotations = 1;
  else if (direction === 'up') rotations = 3;

  for (let i = 0; i < rotations; i++) {
    rotatedGrid = rotateRight(rotatedGrid);
  }

  const { grid: shifted, score, moved } = shiftLeft(rotatedGrid);
  rotatedGrid = shifted;

  for (let i = 0; i < rotations; i++) {
    rotatedGrid = rotateLeft(rotatedGrid); // rotate back
  }

  // Double check moved state as rotating un-rotated might be tricky if not careful, 
  // but since we rely on array equality natively it's sound
  const actualMoved = JSON.stringify(grid) !== JSON.stringify(rotatedGrid);

  return { grid: rotatedGrid, score, moved: actualMoved };
}
