import { useRef } from "react";
import { API_URL, DIFFICULTY, GRID_SIZE } from "../constants";
import postInitGame from "../http/postInitGame";

export default function useOnInit() {
    const hasRun = useRef(false);
    
    const body = {
        id: Date.now(),
        difficulty: DIFFICULTY.EASY,
        gridSize: GRID_SIZE,
    };

    const setGame = () => postInitGame({ body });
    
    if (!hasRun.current) {
        setGame();
        hasRun.current = true;
    }

    return body;
}