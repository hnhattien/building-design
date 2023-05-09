import React, { FunctionComponent } from 'react';

const CircleMouse: FunctionComponent<{ position: { x: number; y: number } }> = ({ position }) => {
    const { x, y } = position;
    return <div className="bg-blue rounded"></div>;
};

export default CircleMouse;
