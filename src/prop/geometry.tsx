import {CompositeTilemap} from '@pixi/tilemap';
import {Assets} from "pixi.js";

Assets.add('atlas', 'atlas.json');
Assets.load(['atlas']).then(() => {
    const tilemap = new CompositeTilemap();

    // Render your first tile at (0, 0)!
    tilemap.tile('grass.png', 0, 0);
});