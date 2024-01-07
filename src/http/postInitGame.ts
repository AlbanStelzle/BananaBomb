import { POST_INIT_GAME_API_URL } from "../constants";

interface PostInitGameProps {
    body: {
        id: number;
        difficulty: string;
        gridSize: number;
    };
}

export default async function postInitGame({ body }: PostInitGameProps) {
    try {
        const response = await fetch(POST_INIT_GAME_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        return !!response?.ok;
    } catch (error) {}
}