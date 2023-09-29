import { Sprite, Stage, TilingSprite } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";

import { MAP_SIZE, TILE_SIZE, WALLS, BOMB_DELAY } from "../constants";
import Wall from "./Wall";
import Bomb from "./Bomb";
import Explosion from "./Explosion";

function Game() {
    // Position du joueur
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [bombs, setBombs] = useState([]);
    const [explosions, setExplosions] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const walls = useMemo(() => WALLS, []);

    const checkCollision = (coords: { x: number; y: number }) => {
        return (
            walls.some((wall) => wall.x === coords.x && wall.y === coords.y) ||
            bombs.some((bomb) => bomb.x === coords.x && bomb.y === coords.y)
        );
    };

    // TODO : check bombs collision
    const moveUp = () => {
        setCoords((coords) => {
            return { ...coords, y: coords.y - TILE_SIZE };
        });
    };

    const moveDown = () => {
        setCoords((coords) => {
            return { ...coords, y: coords.y + TILE_SIZE };
        });
    };

    const moveLeft = () => {
        setCoords((coords) => {
            return { ...coords, x: coords.x - TILE_SIZE };
        });
    };

    const moveRight = () => {
        setCoords((coords) => {
            return { ...coords, x: coords.x + TILE_SIZE };
        });
    };

    // Gère les mouvements du joueurs
    useEffect(() => {
        const handleMove = (e) => {
            if (e.key === "ArrowUp") {
                const nextCoords = { ...coords, y: coords.y - TILE_SIZE };
                if (nextCoords.y < 0 || checkCollision(nextCoords)) return;
                moveUp();
            }
            if (e.key === "ArrowDown") {
                const nextCoords = { ...coords, y: coords.y + TILE_SIZE };
                if (
                    nextCoords.y > MAP_SIZE - TILE_SIZE ||
                    checkCollision(nextCoords)
                )
                    return;
                moveDown();
            }
            if (e.key === "ArrowLeft") {
                const nextCoords = { ...coords, x: coords.x - TILE_SIZE };
                if (nextCoords.x < 0 || checkCollision(nextCoords)) return;
                moveLeft();
            }
            if (e.key === "ArrowRight") {
                const nextCoords = { ...coords, x: coords.x + TILE_SIZE };
                if (
                    nextCoords.x > MAP_SIZE - TILE_SIZE ||
                    checkCollision(nextCoords)
                )
                    return;
                moveRight();
            }
        };

        const handlePlantBomb = (e) => {
            if (e.key !== " ") return;

            setBombs((bombs) => [...bombs, { ...coords }]);

            setTimeout(() => {
                setBombs((bombs) =>
                    bombs.filter(
                        ({ x, y }) => !(x === coords.x && y === coords.y)
                    )
                );
            }, BOMB_DELAY);
        };

        window.addEventListener("keydown", handleMove);
        window.addEventListener("keypress", handlePlantBomb);

        return () => {
            window.removeEventListener("keypress", handlePlantBomb);
            window.removeEventListener("keydown", handleMove);
        };
    }, [coords, coords.x, coords.y, bombs]);

    useEffect(() => {
        if (bombs.length === 0) return;

        const zones = [
            { x: coords.x, y: coords.y },
            { x: coords.x + TILE_SIZE, y: coords.y },
            { x: coords.x - TILE_SIZE, y: coords.y },
            { x: coords.x, y: coords.y + TILE_SIZE },
            { x: coords.x, y: coords.y - TILE_SIZE }
        ];

        setTimeout(() => {
            setExplosions((_explosions) => { 
                // if player is in explosion zone
                if (zones.some(({ x, y }) => x === coords.x && y === coords.y)) {
                    console.log("dead");
                }

                return [..._explosions, ...zones];
            });
        }, BOMB_DELAY);

        // clear explosions
        setTimeout(() => {
            setExplosions((_explosions) => {
                return _explosions.filter(
                    ({ x, y }) =>
                        !zones.some(
                            (zone) => zone.x === x && zone.y === y
                        )
                );
            });
        }, BOMB_DELAY * 1.5);
    }, [bombs]);

    if (gameOver) {
        return (
            <div>
                <h1>Game Over</h1>
                <button onClick={() => setGameOver(false)}>Rejouer</button>
            </div>
        )
    }

    return (
        <Stage width={MAP_SIZE} height={MAP_SIZE}>
            {/* Grid */}
            <TilingSprite
                image={"/src/assets/damier.png"}
                width={MAP_SIZE}
                height={MAP_SIZE}
                tilePosition={{ x: 0, y: 0 }}
                tileScale={{ x: 1, y: 1 }}
            />

            {bombs.map((bomb, index) => (
                <Bomb key={index} x={bomb.x} y={bomb.y} />
            ))}

            {explosions.map((explosion, index) => (
                <Explosion key={index} x={explosion.x} y={explosion.y} />
            ))}

            {walls.map((wall, index) => (
                <Wall key={index} x={wall.x} y={wall.y} />
            ))}

            {/* Player */}
            <Sprite
                image={"/src/assets/Monkey_Front_1.png"}
                x={coords.x}
                y={coords.y}
                width={TILE_SIZE}
                height={TILE_SIZE}
                anchor={{ x: 0, y: 0 }}
            />
        </Stage>
    );
}

export default Game;
