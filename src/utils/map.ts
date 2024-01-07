import { BLOCKS, CELL_VALUE, CORNERS, GRID_SIZE, TILE_SIZE } from "../constants";
import { State } from "../types";

export function generateBricks() {
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

export function formatMapForBack({
    coords: playerCoords,
    botCoords,
    bombs,
    explosions,
    bricks,
}: State) {
    const map = [];

    const player = {
        x: playerCoords.x / TILE_SIZE,
        y: playerCoords.y / TILE_SIZE,
        value: CELL_VALUE.PLAYER,
    };

    const bot = {
        x: botCoords.x / TILE_SIZE,
        y: botCoords.y / TILE_SIZE,
        value: CELL_VALUE.BOT,
    };

    const dangers = [...bombs, ...explosions].map(({ x, y }) => ({
        x: x / TILE_SIZE,
        y: y / TILE_SIZE,
        value: CELL_VALUE.DANGER,
    }));

    const bricksFormatted = bricks.map(({ x, y }) => ({
        x: x / TILE_SIZE,
        y: y / TILE_SIZE,
        value: CELL_VALUE.BRICK,
    }));

    const blocksFormatted = BLOCKS.map(({ x, y }) => ({
        x: x / TILE_SIZE,
        y: y / TILE_SIZE,
        value: CELL_VALUE.BRICK,
    }));

    map.push(player, bot, ...dangers, ...bricksFormatted, ...blocksFormatted);

    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            if (map.some((coord) => coord.x === x && coord.y === y)) continue;
            map.push({ 
                x: x, 
                y: y, 
                value: CELL_VALUE.EMPTY 
            });
        }
    }

    return map;
}