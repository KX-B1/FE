'use client';

import ShotCard from '@/components/canvas/ShotCard';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';

export default function CanvasArea() {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const shots = [
    { id: 1, x: 20, y: 20, imageUrl: '/canvas-shotcard.svg' },
    { id: 2, x: 220, y: 20, imageUrl: '' },
    { id: 3, x: 420, y: 20, imageUrl: '' },
    { id: 4, x: 20, y: 160, imageUrl: '' },
    { id: 5, x: 220, y: 160, imageUrl: '' },
    { id: 6, x: 420, y: 160, imageUrl: '' },
    { id: 7, x: 20, y: 300, imageUrl: '' },
    { id: 8, x: 220, y: 300, imageUrl: '' },
    { id: 9, x: 420, y: 300, imageUrl: '' },
  ];

  return (
    <>
      {/* 최상위 wrapper → 제목 입력 영역 + stage 영역 + 툴바 */}
      <div className="flex flex-col h-full px-8 gap-6 pt-8 border border-border">
        {/* 1. 캔버스 - 제목 입력 영역 */}
        <div className="inline-flex items-center gap-1">
          <input
            className="[field-sizing:content] placeholder:text-placeholder"
            placeholder="제목을 입력하세요"
          />
          <Image
            src="/canvas-title-pen.svg"
            alt="제목 편집"
            width={20}
            height={20}
          />
        </div>
        {/* 2. 캔버스 - Stage 영역 */}
        <div ref={containerRef} className="flex-1 relative">
          <Stage width={size.width} height={size.height}>
            {/* ㄴ 2-a. 격자 배경 레이어 */}
            <Layer id="background">
              <Text
                text="background"
                x={50}
                y={50}
                fontSize={24}
                fill="white"
              />
            </Layer>
            {/* ㄴ 2-b. 카드 슬롯 레이어 */}
            <Layer id="assets">
              {shots.map((shot, index) => (
                <ShotCard
                  key={shot.id}
                  imageUrl={shot.imageUrl}
                  x={shot.x}
                  y={shot.y}
                  label={`shot ${index + 1}`}
                />
              ))}
            </Layer>
            {/* ㄴ 2-c. 화살표 그리기 등 기능 적용 레이어 */}
            <Layer id="annotation">
              <Text
                text="annotation"
                x={50}
                y={50}
                fontSize={24}
                fill="white"
              />
            </Layer>
          </Stage>
          {/* 3. 캔버스 - 툴바 영역 */}
          <div className="flex h-[58px] w-[246px] absolute bottom-4 left-1/2 -translate-x-1/2 rounded-[20px] border border-border bg-card items-center justify-center gap-2 px-4">
            <button
              className="w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: '#c255ff' }}
            >
              <Image
                src="/toolbar-pointer.svg"
                alt="툴바 포인터"
                width={20}
                height={20}
              />
            </button>
            <button className="w-9 h-9 flex justify-center items-center cursor-pointer">
              <Image
                src="/toolbar-move.svg"
                alt="툴바 이동"
                width={20}
                height={20}
              />
            </button>
            <button className="w-9 h-9 flex justify-center items-center cursor-pointer">
              <Image
                src="/toolbar-pen.svg"
                alt="툴바 펜"
                width={20}
                height={20}
              />
            </button>
            <button className="w-9 h-9 flex justify-center items-center cursor-pointer">
              <Image
                src="/toolbar-note.svg"
                alt="툴바 메모"
                width={20}
                height={20}
              />
            </button>
            <button className="w-9 h-9 flex justify-center items-center rounded-xl cursor-pointer">
              <Image
                src="/toolbar-text.svg"
                alt="툴바 텍스트"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
