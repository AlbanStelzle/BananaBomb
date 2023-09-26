import {Sprite, Stage, TilingSprite} from '@pixi/react';
import React, {useEffect, useState} from 'react';

export const Pixi = () => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [cMap, setcMap] = useState(416);


    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'z' && y >= 16)
                setY(y => y - 16);
            if (e.key === 's' && y <= cMap)
                setY(y => y + 16);
            if (e.key === 'q' && x >= 0)
                setX(x => x - 16);
            if (e.key === 'd' && x <= cMap)
                setX(x => x + 16);
        });
    }, []);


    return (
        <Stage
            width={cMap}
            height={cMap}>

            <TilingSprite
                image={'/src/assets/Text_tile.png'}
                width={cMap}
                height={cMap}
                tilePosition={{x: 0, y: 0}}
                tileScale={{x: 1, y: 1}}
            />
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
                x={x}
                y={y}
                width={32}
                height={32}
                anchor={{x: 0, y: 0}}
            />
        </Stage>
    );
};