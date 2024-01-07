import { Stage, TilingSprite } from "@pixi/react";
import { useEffect, useReducer, useCallback } from "react";
import {
    MAP_SIZE,
    TILE_SIZE,
    BLOCKS,
    BRICKS,
    BOMB_DELAY,
    EXPLOSION_DELAY,
    DIFFICULTY,
    BOT_MOVES,
    API_CALL_DELAY,
} from "../constants";
import Block from "./Block";
import Brick from "./Brick";
import Bomb from "./Bomb";
import Explosion from "./Explosion";
import Player from "./Player";
import Bot from "./Bot";
import getBotMovement from "../http/getBotMovement";
import { Action, Coords, State } from "../types";
import "../styles/game.css"
import { formatMapForBack } from "../utils/map";
import useInterval from "../hooks/useInterval";
import useOnInit from "../hooks/useOnInit";
import getBotMovements from "../http/getBotMovements";

const initialState = {
    coords: { x: 0, y: 0 },
    botCoords: { x: MAP_SIZE - TILE_SIZE, y: MAP_SIZE - TILE_SIZE },
    bombs: [],
    explosions: [],
    gameOver: false,
    wonGame: false,
    bricks: BRICKS,
};

const botActionType = {
    MOVE_BOT: "MOVE_BOT",
};

function reducer(state: State, action: Action) {
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
            return { ...state, explosions: state.explosions.filter(explosion => !action.payload.some((zone: Coords) => zone.x === explosion.x && zone.y === explosion.y)) };
        case "REMOVE_BRICKS":
            return { ...state, bricks: state.bricks.filter(brick => !action.payload.some((zone: Coords) => zone.x === brick.x && zone.y === brick.y)) };
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

    const resetGame = useCallback(() => {
        dispatch({ type: "RESET_GAME" });
    }, []);

    const checkCollision = useCallback(
        (coords: Coords) => {
            return (
                BLOCKS.some(
                    (block) => block.x === coords.x && block.y === coords.y
                ) ||
                state.bricks.some(
                    (block) => block.x === coords.x && block.y === coords.y
                ) ||
                state.bombs.some(
                    (bomb) => bomb.x === coords.x && bomb.y === coords.y
                )
            );
        },
        [BLOCKS, state.bricks, state.bombs]
    );

    const moveBot = useCallback(() => {
        getBotMovements({ state, map: formatMapForBack(state) }).then((payload: any) => {
            let nextMoves = payload.nextMoves;
            let latestCoords = state.botCoords;
            
            const botMoveInterval = setInterval(() => {
                const { x, y } = latestCoords;
                let newCoords = null;

                switch (nextMoves[0]) {
                    case BOT_MOVES.UP:
                        newCoords = { x, y: y - TILE_SIZE };
                        break;
                    case BOT_MOVES.DOWN:
                        newCoords = { x, y: y + TILE_SIZE };
                        break;
                    case BOT_MOVES.LEFT:
                        newCoords = { x: x - TILE_SIZE, y };
                        break;
                    case BOT_MOVES.RIGHT:
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
                    latestCoords = newCoords;
                    dispatch({ type: "MOVE_BOT", payload: newCoords });
                }

                nextMoves = nextMoves.slice(1);
                
                if (nextMoves.length === 0) {
                    clearInterval(botMoveInterval);
                    
                    // Plant bomb randomly
                    const plantsBomb = Math.random() < (1 / 8);
                    if (plantsBomb) {
                        console.log('PLANTING BOMB')
                        const newBomb = { ...latestCoords };
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
                    }
                }
            }, (API_CALL_DELAY / 3) - 100);
        });
    }, [state, checkCollision]);

    const handleMove = useCallback(
        (e: KeyboardEvent) => {
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
        },
        [state.coords, checkCollision]
    );

    const handlePlantBomb = useCallback(
        (e: KeyboardEvent) => {
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
        },
        [state.coords]
    );

    useInterval(() => {
        if (state.gameOver || state.wonGame) return;
        moveBot();
    }, API_CALL_DELAY);

    // Set the game difficulty and grid size, calling the API
    const { id: gameId } = useOnInit();

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
                    explosion.x === state.coords.x &&
                    explosion.y === state.coords.y
            )
        ) {
            dispatch({ type: "SET_GAME_OVER" });
            return;
        }

        // Check if brick is in explosion zone
        const explodedBricks = state.bricks.filter((brick) =>
            state.explosions.some(
                (explosion) =>
                    explosion.x === brick.x && explosion.y === brick.y
            )
        );

        // Remove exploded bricks
        if (explodedBricks.length > 0) {
            dispatch({
                type: "REMOVE_BRICKS",
                payload: explodedBricks.map((brick) => ({
                    x: brick.x,
                    y: brick.y,
                })),
            });
        }

        if (
            state.explosions.some(
                (explosion) =>
                    explosion.x === state.botCoords.x &&
                    explosion.y === state.botCoords.y
            )
        ) {
            dispatch({ type: "SET_GAME_WIN" });
        }
    }, [state.coords, state.explosions, state.botCoords]);

    return (
        <>
            <Stage width={MAP_SIZE} height={MAP_SIZE}>
                <TilingSprite
                    image={"/damier.png"}
                    width={MAP_SIZE}
                    height={MAP_SIZE}
                    tilePosition={{ x: 0, y: 0 }}
                    tileScale={{ x: 1, y: 1 }}
                />
                {state.bombs.map((bomb, index) => (
                    <Bomb key={index} x={bomb.x} y={bomb.y} />
                ))}
                <Player x={state.coords.x} y={state.coords.y} />
                <Bot x={state.botCoords.x} y={state.botCoords.y} />
                {state.explosions.map((explosion, index) => (
                    <Explosion key={index} x={explosion.x} y={explosion.y} />
                ))}
                {BLOCKS.map((block, index) => (
                    <Block key={index} x={block.x} y={block.y} />
                ))}
                {state.bricks.map((brick, index) => (
                    <Brick key={index} x={brick.x} y={brick.y} />
                ))}
            </Stage>
            <div className="result-container">
                {state.gameOver && (
                    <div className="game-over">
                        <h1>Game over</h1>
                        <button onClick={resetGame}>Restart</button>
                    </div>
                )}
                {state.wonGame && (
                    <div className="game-over">
                        <h1>You win</h1>
                        <button onClick={resetGame}>Restart</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Game;
