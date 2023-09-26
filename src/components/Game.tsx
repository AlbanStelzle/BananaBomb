import { Sprite, Stage, TilingSprite } from "@pixi/react";
import { useEffect, useState } from "react";

import { MAP_SIZE, TILE_SIZE } from "../constants";

function Game() {
    // Position du joueur
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    // Gère les mouvements du joueurs
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                setY((y) => {
                    if (y > 0) return y - (TILE_SIZE / 2);
                    return y;
                });
            }
            if (e.key === "s") {
                setY((y) => {
                    if (y < MAP_SIZE - TILE_SIZE) return y + (TILE_SIZE / 2);
                    return y;
                });
            }
            if (e.key === "q")
                setX((x) => {
                    if (x > 0) return x - (TILE_SIZE / 2);
                    return x;
                });
            if (e.key === "d")
                setX((x) => {
                    if (x < MAP_SIZE - TILE_SIZE) return x + (TILE_SIZE / 2);
                    return x;
                });
        });
    }, []);

    return (
        <Stage
            width={MAP_SIZE} 
            height={MAP_SIZE}
        >
            <TilingSprite
                image={"/src/assets/damier.png"}
                width={MAP_SIZE}
                height={MAP_SIZE}
                tilePosition={{ x: 0, y: 0 }}
                tileScale={{ x: 1, y: 1 }}
            />
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
                x={x}
                y={y}
                width={TILE_SIZE}
                height={TILE_SIZE}
                anchor={{ x: 0, y: 0 }}
            />
        </Stage>
    );
}

export default Game;
