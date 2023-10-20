export interface Coords {
    x: number;
    y: number;
}

export interface State {
    coords: Coords;
    botCoords: Coords;
    bombs: Coords[];
    explosions: Coords[];
    gameOver: boolean;
    wonGame: boolean;
    bricks: Coords[];
}

export interface Action {
    type: string;
    payload?: any;
}