import { Sprite, Stage, TilingSprite } from "@pixi/react";
import { useEffect, useMemo, useState } from "react";

import { MAP_SIZE, TILE_SIZE, WALLS } from "../constants";
import Wall from "./Wall";

function checkCollision(coords: { x: number, y: number }) {
    return WALLS.some((wall) => wall.x === coords.x && wall.y === coords.y);
}

function Game() {
    // Position du joueur
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const walls = useMemo(() => WALLS, []);

    // Gère les mouvements du joueurs
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                setCoords((coords) => {
                    const nextTile = { ...coords, y: coords.y - TILE_SIZE };
                    if (checkCollision(nextTile)) return coords;
                    if (coords.y > 0) return { ...coords, y: coords.y - (TILE_SIZE / 2) };
                    return coords;
                });
            }
            if (e.key === "ArrowDown") {
                setCoords((coords) => {
                    const nextTile = { ...coords, y: coords.y + TILE_SIZE };
                    if (checkCollision(nextTile)) return coords;
                    if (coords.y < MAP_SIZE - TILE_SIZE) return { ...coords, y: coords.y + (TILE_SIZE / 2) };
                    return coords;
                });
            }
            if (e.key === "ArrowLeft") {
                setCoords((coords) => {
                    const nextTile = { ...coords, x: coords.x - TILE_SIZE };
                    if (checkCollision(nextTile)) return coords;
                    if (coords.x > 0) return { ...coords, x: coords.x - (TILE_SIZE / 2) };
                    return coords;
                });
            }
            if (e.key === "ArrowRight") {
                setCoords((coords) => {
                    const nextTile = { ...coords, x: coords.x + TILE_SIZE };
                    if (checkCollision(nextTile)) return coords;
                    if (coords.x < MAP_SIZE - TILE_SIZE) return { ...coords, x: coords.x + (TILE_SIZE / 2) };
                    return coords;
                });
            }
        });
    }, []);

    return (
        <Stage
            width={MAP_SIZE} 
            height={MAP_SIZE}
        >
            {/* Grid */}
            <TilingSprite
                image={"/src/assets/damier.png"}
                width={MAP_SIZE}
                height={MAP_SIZE}
                tilePosition={{ x: 0, y: 0 }}
                tileScale={{ x: 1, y: 1 }}
            />

            {walls.map((wall, index) => (
                <Wall key={index} x={wall.x} y={wall.y} />
            ))}

            {/* Player */}
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
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
