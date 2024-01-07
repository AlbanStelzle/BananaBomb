import { BOT_MOVES, GET_BOT_MOVEMENT_API_URL, MAP_SIZE, TILE_SIZE } from "../constants";
import { Coords, State } from "../types";

interface CoordsValue extends Coords {
    value: number;
}

interface Props {
    map: CoordsValue[];
}

export default async function getBotMovements({ map }: Props) {
    // TODO : to remove and call api
    return new Promise((resolve) => {
        const randomMoves = Object.values(BOT_MOVES)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        return resolve({ nextMoves: randomMoves.join('') });
    })

    // TODO : to call
    try {
        const response = await fetch(GET_BOT_MOVEMENT_API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(map),
        });
        const data = await response.json();
        return data;
    } catch (error) {}
}