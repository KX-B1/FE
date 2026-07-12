'use client';

import { useEffect, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';

export default function CanvasArea() {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
    });
  }, []);

  return (
    <Stage width={size.width} height={size.height}>
      <Layer id="background">
        <Text text="background" x={50} y={50} fontSize={24} />
      </Layer>
      <Layer id="assets">
        <Text text="assets" x={50} y={50} fontSize={24} />
      </Layer>
      <Layer id="annotation">
        <Text text="annotation" x={50} y={50} fontSize={24} />
      </Layer>
    </Stage>
  );
}
