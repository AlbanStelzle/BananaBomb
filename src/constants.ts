export const GRID_SIZE = 13;
export const TILE_SIZE = 32;
export const MAP_SIZE = GRID_SIZE * TILE_SIZE;
export const BOMB_DELAY = 2000;
export const EXPLOSION_DELAY = 1000;
export const BLOCKS = [
    { x: TILE_SIZE * 1, y: TILE_SIZE },
    { x: TILE_SIZE * 3, y: TILE_SIZE },
    { x: TILE_SIZE * 5, y: TILE_SIZE },
    { x: TILE_SIZE * 7, y: TILE_SIZE },
    { x: TILE_SIZE * 9, y: TILE_SIZE },
    { x: TILE_SIZE * 11, y: TILE_SIZE },

    { x: TILE_SIZE * 1, y: TILE_SIZE * 3 },
    { x: TILE_SIZE * 3, y: TILE_SIZE * 3 },
    { x: TILE_SIZE * 5, y: TILE_SIZE * 3 },
    { x: TILE_SIZE * 7, y: TILE_SIZE * 3 },
    { x: TILE_SIZE * 9, y: TILE_SIZE * 3 },
    { x: TILE_SIZE * 11, y: TILE_SIZE * 3 },

    { x: TILE_SIZE * 1, y: TILE_SIZE * 5 },
    { x: TILE_SIZE * 3, y: TILE_SIZE * 5 },
    { x: TILE_SIZE * 5, y: TILE_SIZE * 5 },
    { x: TILE_SIZE * 7, y: TILE_SIZE * 5 },
    { x: TILE_SIZE * 9, y: TILE_SIZE * 5 },
    { x: TILE_SIZE * 11, y: TILE_SIZE * 5 },

    { x: TILE_SIZE * 1, y: TILE_SIZE * 7 },
    { x: TILE_SIZE * 3, y: TILE_SIZE * 7 },
    { x: TILE_SIZE * 5, y: TILE_SIZE * 7 },
    { x: TILE_SIZE * 7, y: TILE_SIZE * 7 },
    { x: TILE_SIZE * 9, y: TILE_SIZE * 7 },
    { x: TILE_SIZE * 11, y: TILE_SIZE * 7 },

    { x: TILE_SIZE * 1, y: TILE_SIZE * 9 },
    { x: TILE_SIZE * 3, y: TILE_SIZE * 9 },
    { x: TILE_SIZE * 5, y: TILE_SIZE * 9 },
    { x: TILE_SIZE * 7, y: TILE_SIZE * 9 },
    { x: TILE_SIZE * 9, y: TILE_SIZE * 9 },
    { x: TILE_SIZE * 11, y: TILE_SIZE * 9 },

    { x: TILE_SIZE * 1, y: TILE_SIZE * 11 },
    { x: TILE_SIZE * 3, y: TILE_SIZE * 11 },
    { x: TILE_SIZE * 5, y: TILE_SIZE * 11 },
    { x: TILE_SIZE * 7, y: TILE_SIZE * 11 },
    { x: TILE_SIZE * 9, y: TILE_SIZE * 11 },
    { x: TILE_SIZE * 11, y: TILE_SIZE * 11 },
];

export enum BlockType {
    Empty,
    Unbreakable,
    Breakable
}

function initializeBoard(): BlockType[][] {
    const size = 13;
    const board: BlockType[][] = Array.from({ length: size }, () => Array(size).fill(BlockType.Empty));

    /* Placement des blocs inamovibles
    for (let i = 0; i < size; i += 2) {
        for (let j = 0; j < size; j += 2) {
            board[i][j] = BlockType.Unbreakable;
        }
    } */

    // Zones vides autour des coins pour les personnages
    const clearAround = (x: number, y: number) => {
        board[x][y] = BlockType.Empty;
        board[x + 1][y] = BlockType.Empty;
        board[x][y + 1] = BlockType.Empty;
    }
    clearAround(0, 0);
    clearAround(0, size - 1);
    clearAround(size - 1, 0);
    clearAround(size - 1, size - 1);

    // Placement aléatoire des blocs cassables
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === BlockType.Empty) {
                const random = Math.random();
                if (random < 0.5) {
                    board[i][j] = BlockType.Breakable;
                }
            }
        }
    }

    return board;
}

export const board = initializeBoard();