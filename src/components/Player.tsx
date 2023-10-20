import { Sprite } from "@pixi/react";
import { TILE_SIZE } from "../constants";

function Player({ x, y }: { x: number; y: number }) {
    return (
        <Sprite
            image={"/Singe_1.png"}
            x={x}
            y={y}
            width={TILE_SIZE}
            height={TILE_SIZE}
            anchor={{ x: 0, y: 0 }}
        />
    );
}

export default Player;
