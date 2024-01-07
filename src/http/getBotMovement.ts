import { MAP_SIZE, TILE_SIZE } from "../constants";
import { State } from "../types";

interface Props {
    state: State;
    checkCollision: (coords: { x: number; y: number }) => boolean;
}

// TODO : to remove
async function getBotMovement({ state, checkCollision }: Props) {
    return new Promise((resolve) => {
        const plantBomb = Math.random() < 0.2;
        if (plantBomb) {
            return resolve({ action: "BOMB" });
        }
        
        const { x: botX, y: botY } = state.botCoords;
        const possibleMoves = [
            { x: botX, y: botY - TILE_SIZE },
            { x: botX, y: botY + TILE_SIZE },
            { x: botX - TILE_SIZE, y: botY },
            { x: botX + TILE_SIZE, y: botY },
        ];

        const validMoves = possibleMoves.filter(move =>
            !checkCollision(move) &&
            move.x >= 0 &&
            move.y >= 0 &&
            move.x <= MAP_SIZE - TILE_SIZE &&
            move.y <= MAP_SIZE - TILE_SIZE
        );

        if (validMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * validMoves.length);
            const newBotCoords = validMoves[randomIndex];
            return resolve({ action: "MOVE", newBotCoords });
        }
    });
}

export default getBotMovement;