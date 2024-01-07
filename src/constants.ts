import { generateBricks } from "./utils/map";

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

export const CORNERS = [
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
];

export const BRICKS = generateBricks();

export const CELL_VALUE = {
    BRICK: 0,
    DANGER: 0,
    BOT: 1,
    EMPTY: 4,
    PLAYER: 5,
};

export const DIFFICULTY = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD'
};

export const API_URL = 'http://localhost:3000';

export const GET_BOT_MOVEMENT_API_URL = `${API_URL}/bot-movement`;
export const POST_INIT_GAME_API_URL = `${API_URL}/set-game`;

export const BOT_MOVES = {
    LEFT: "L",
    RIGHT: "R",
    UP: "U",
    DOWN: "D",
}

export const API_CALL_DELAY = 3000;
