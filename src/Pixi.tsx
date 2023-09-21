import {BlurFilter} from 'pixi.js';
import {Container, Sprite, Stage, Text} from '@pixi/react';
import {useEffect, useMemo, useState} from 'react';

export const Pixi = () => {
    const blurFilter = useMemo(() => new BlurFilter(4), []);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(330);

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'z')
                setY(y => y - 10);
            if (e.key === 's')
                setY(y => y + 10);
            if (e.key === 'q')
                setX(x => x - 10);
            if (e.key === 'd')
                setX(x => x + 10);
        });
    }, []);


    return (
        <Stage>
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
                x={x}
                y={y}
                anchor={{x: 0.5, y: 0.5}}
            />
            <Container x={width} y={height}>
                <Text text="Hello World" anchor={{x: 0.5, y: 0.5}} filters={[blurFilter]}/>
            </Container>
        </Stage>
    );
};