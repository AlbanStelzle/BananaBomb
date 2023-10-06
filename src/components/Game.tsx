import { Stage, TilingSprite } from "@pixi/react";
import { useEffect, useReducer, useCallback, useMemo } from "react";
import {
    MAP_SIZE,
    TILE_SIZE,
    BLOCKS,
    BOMB_DELAY,
    EXPLOSION_DELAY,
} from "../constants";
import Block from "./Block";
import Bomb from "./Bomb";
import Explosion from "./Explosion";
import Player from "./Player";
import Bot from "./Bot";
import getBotMovement from "../http/getBotMovement";

const initialState = {
    coords: { x: 0, y: 0 },
    botCoords: { x: MAP_SIZE - TILE_SIZE, y: MAP_SIZE - TILE_SIZE },
    bombs: [],
    explosions: [],
    gameOver: false
};

const botActionType = {
    MOVE_BOT: "MOVE_BOT"
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_COORDS":
            return { ...state, coords: action.payload };
        case botActionType.MOVE_BOT:
            return { ...state, botCoords: action.payload };
        case "ADD_BOMB":
            return { ...state, bombs: [...state.bombs, action.payload] };
        case "REMOVE_BOMB":
            return { ...state, bombs: state.bombs.filter(bomb => !(bomb.x === action.payload.x && bomb.y === action.payload.y)) };
        case "ADD_EXPLOSION":
            return { ...state, explosions: [...state.explosions, ...action.payload] };
        case "REMOVE_EXPLOSIONS":
            return { ...state, explosions: state.explosions.filter(explosion => !action.payload.some(zone => zone.x === explosion.x && zone.y === explosion.y)) };
        case "SET_GAME_OVER":
            return { ...state, gameOver: true };
        case "SET_GAME_WIN":
            return { ...state, wonGame: true };
        case "RESET_GAME":
            return initialState;
        default:
            throw new Error();
    }
}

function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const blocks = useMemo(() => BLOCKS, []);

    const resetGame = useCallback(() => {
        dispatch({ type: "RESET_GAME" });
    }, []);

    const checkCollision = useCallback(
        (coords) => {
            return (
                blocks.some(
                    (block) => block.x === coords.x && block.y === coords.y
                ) ||
                state.bombs.some(
                    (bomb) => bomb.x === coords.x && bomb.y === coords.y
                )
            );
        },
        [blocks, state.bombs]
    );

    const moveBot = useCallback(() => {
        const { x: botX, y: botY } = state.botCoords;
        const possibleMoves = [
            { x: botX, y: botY - TILE_SIZE },
            { x: botX, y: botY + TILE_SIZE },
            { x: botX - TILE_SIZE, y: botY },
            { x: botX + TILE_SIZE, y: botY },
        ];

        

        // const validMoves = possibleMoves.filter(move =>
        //     !checkCollision(move) &&
        //     move.x >= 0 &&
        //     move.y >= 0 &&
        //     move.x <= MAP_SIZE - TILE_SIZE &&
        //     move.y <= MAP_SIZE - TILE_SIZE
        // );

        // if (validMoves.length > 0) {
        //     const randomIndex = Math.floor(Math.random() * validMoves.length);
        //     const newBotCoords = validMoves[randomIndex];
        //     dispatch({ type: botActionType.MOVE_BOT, payload: newBotCoords });
        // }
        getBotMovement({ state, checkCollision }).then((payload) => {
            const { action } = payload;

            if (action === "BOMB") {
                const newBomb = { ...state.botCoords };
                dispatch({ type: "ADD_BOMB", payload: newBomb });
                setTimeout(() => {
                    dispatch({ type: "REMOVE_BOMB", payload: newBomb });
                    const zones = [
                        { x: newBomb.x, y: newBomb.y },
                        { x: newBomb.x + TILE_SIZE, y: newBomb.y },
                        { x: newBomb.x - TILE_SIZE, y: newBomb.y },
                        { x: newBomb.x, y: newBomb.y + TILE_SIZE },
                        { x: newBomb.x, y: newBomb.y - TILE_SIZE },
                    ];
                    dispatch({ type: "ADD_EXPLOSION", payload: zones });
                    setTimeout(() => {
                        dispatch({ type: "REMOVE_EXPLOSIONS", payload: zones });
                    }, EXPLOSION_DELAY);
                }, BOMB_DELAY);
            } else if (action === "MOVE") {
                dispatch({ type: botActionType.MOVE_BOT, payload: payload.newBotCoords });
            }
        });
    }, [state.botCoords, checkCollision]);

    const handleMove = useCallback((e) => {
        const { x, y } = state.coords;
        let newCoords = null;
        switch (e.key) {
            case "ArrowUp":
                newCoords = { x, y: y - TILE_SIZE };
                break;
            case "ArrowDown":
                newCoords = { x, y: y + TILE_SIZE };
                break;
            case "ArrowLeft":
                newCoords = { x: x - TILE_SIZE, y };
                break;
            case "ArrowRight":
                newCoords = { x: x + TILE_SIZE, y };
                break;
            default:
                return;
        }
        if (
            newCoords &&
            !checkCollision(newCoords) &&
            newCoords.x >= 0 &&
            newCoords.y >= 0 &&
            newCoords.x <= MAP_SIZE - TILE_SIZE &&
            newCoords.y <= MAP_SIZE - TILE_SIZE
        ) {
            dispatch({ type: "SET_COORDS", payload: newCoords });
        }
    }, [state.coords, checkCollision]);

    const handlePlantBomb = useCallback((e) => {
        if (e.key !== " ") return;
        const newBomb = { ...state.coords };
        dispatch({ type: "ADD_BOMB", payload: newBomb });
        setTimeout(() => {
            dispatch({ type: "REMOVE_BOMB", payload: newBomb });
            const zones = [
                { x: newBomb.x, y: newBomb.y },
                { x: newBomb.x + TILE_SIZE, y: newBomb.y },
                { x: newBomb.x - TILE_SIZE, y: newBomb.y },
                { x: newBomb.x, y: newBomb.y + TILE_SIZE },
                { x: newBomb.x, y: newBomb.y - TILE_SIZE },
            ];
            dispatch({ type: "ADD_EXPLOSION", payload: zones });
            setTimeout(() => {
                dispatch({ type: "REMOVE_EXPLOSIONS", payload: zones });
            }, EXPLOSION_DELAY);
        }, BOMB_DELAY);
    }, [state.coords]);

    useEffect(() => {
        if (state.gameOver || state.wonGame) return;
        const botMoveInterval = setInterval(() => {
            moveBot();
        }, 1000); // Adjust the interval as needed
        return () => clearInterval(botMoveInterval);
    }, [moveBot, state.gameOver, state.wonGame]);

    useEffect(() => {
        if (state.gameOver || state.wonGame) return;
        window.addEventListener("keydown", handleMove);
        window.addEventListener("keypress", handlePlantBomb);
        return () => {
            window.removeEventListener("keypress", handlePlantBomb);
            window.removeEventListener("keydown", handleMove);
        };
    }, [handleMove, handlePlantBomb, state.gameOver, state.wonGame]);

    useEffect(() => {
        if (
            state.explosions.some(
                (explosion) =>
                    explosion.x === state.coords.x && explosion.y === state.coords.y
            )
        ) {
            dispatch({ type: "SET_GAME_OVER" });
            return;
        }

        if (state.explosions.some(
            (explosion) =>
                explosion.x === state.botCoords.x && explosion.y === state.botCoords.y
        )) {
            dispatch({ type: "SET_GAME_WIN" });
        }
    }, [state.coords, state.explosions, state.botCoords]);

    if (state.gameOver) {
        return (
            <div>
                <h1>Game Over</h1>
                <button onClick={resetGame}>Rejouer</button>
            </div>
        );
    }

    if (state.wonGame) {
        return (
            <div>
                <h1>Vous avez gagné</h1>
                <button onClick={resetGame}>Rejouer</button>
            </div>
        );
    }

    return (
        <Stage width={MAP_SIZE} height={MAP_SIZE}>
            <TilingSprite
                image={"/src/assets/damier.png"}
                width={MAP_SIZE}
                height={MAP_SIZE}
                tilePosition={{x: 0, y: 0}}
                tileScale={{x: 1, y: 1}}
            />
            {state.bombs.map((bomb, index) => (
                <Bomb key={index} x={bomb.x} y={bomb.y} />
            ))}
            <Player x={state.coords.x} y={state.coords.y} />
            <Bot x={state.botCoords.x} y={state.botCoords.y} />
            {state.explosions.map((explosion, index) => (
                <Explosion key={index} x={explosion.x} y={explosion.y} />
            ))}
            {blocks.map((block, index) => (
                <Block key={index} x={block.x} y={block.y} />
            ))}
        </Stage>
    );
}

export default Game;
