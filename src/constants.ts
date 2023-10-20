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

export const BRICKS = _generateBricks();

function _generateBricks() {
    const CORNERS = [
        { x: TILE_SIZE * 0, y: TILE_SIZE * 0 },
        { x: TILE_SIZE * 0, y: TILE_SIZE * 1 },
        { x: TILE_SIZE * 1, y: TILE_SIZE * 0 },
        
        { x: TILE_SIZE * (GRID_SIZE - 1), y: TILE_SIZE * 0 },
        { x: TILE_SIZE * (GRID_SIZE - 2), y: TILE_SIZE * 0 },
        { x: TILE_SIZE * (GRID_SIZE - 1), y: TILE_SIZE * 1 },

        { x: TILE_SIZE * 0, y: TILE_SIZE * (GRID_SIZE - 1) },
        { x: TILE_SIZE * 0, y: TILE_SIZE * (GRID_SIZE - 2) },
        { x: TILE_SIZE * 1, y: TILE_SIZE * (GRID_SIZE - 1) },

        { x: TILE_SIZE * (GRID_SIZE - 1), y: TILE_SIZE * (GRID_SIZE - 1) },
        { x: TILE_SIZE * (GRID_SIZE - 2), y: TILE_SIZE * (GRID_SIZE - 1) },
        { x: TILE_SIZE * (GRID_SIZE - 1), y: TILE_SIZE * (GRID_SIZE - 2) },
    ]

    const unallowedCoordinates = [...BLOCKS, ...CORNERS]

    const bricks = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (unallowedCoordinates.some((coord) => coord.x === TILE_SIZE * i && coord.y === TILE_SIZE * j)) continue;
            bricks.push({ x: TILE_SIZE * i, y: TILE_SIZE * j });
        }
    }

    return bricks;
}
