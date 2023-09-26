import {Sprite, Stage, TilingSprite} from '@pixi/react';
import React, {useEffect, useState} from 'react';

export const Pixi = () => {

    //Position du joueur
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    //Taille d'un côté de la map (cxc)
    const [cMap, setcMap] = useState(416);

    // Gère les mouvements du joueurs
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'z') {
                setY(y => {
                        if (y > 0)
                            return y - 16;
                        return y;
                    }
                );
            }
            if (e.key === 's') {
                setY(y => {
                        if (y < cMap - 32)
                            return y + 16
                        return y
                    }
                );
            }
            if (e.key === 'q')
                setX(x => {
                    if (x > 0)
                        return x - 16
                    return x
                });
            if (e.key === 'd')
                setX(x => {
                    if (x < cMap - 32)
                        return x + 16
                    return x
                });
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