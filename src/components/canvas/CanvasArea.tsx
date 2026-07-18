'use client';

import MemoBox from '@/components/canvas/MemoBox';
import ProjectName from '@/components/canvas/ProjectName';
import ShotCard from '@/components/canvas/ShotCard';
import Toolbar from '@/components/canvas/Toolbar';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';

interface Memo {
  id: number;
  x: number;
  y: number;
  content: string;
}

interface Shot {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
}

export type ToolType = 'pointer' | 'move' | 'pen' | 'note' | 'text';

export default function CanvasArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleDragEnd = (id: number, x: number, y: number) => {
    setShots((prevShots) =>
      prevShots.map((shot) => (shot.id === id ? { ...shot, x, y } : shot))
    );
  };

  const handleMemoDragEnd = (id: number, x: number, y: number) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) => (memo.id === id ? { ...memo, x, y } : memo))
    );
  };

  const handleMemoContentChange = (id: number, content: string) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) => (memo.id === id ? { ...memo, content } : memo))
    );
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const droppedAsset = JSON.parse(e.dataTransfer.getData('application/json'));
    const dropPosition = {
      x: e.clientX - containerRef.current.getBoundingClientRect().left,
      y: e.clientY - containerRef.current.getBoundingClientRect().top,
    };
    const SLOT_WIDTH = 180;
    const SLOT_HEIGHT = 120;
    const matchedShot = shots.find((shot) => {
      return (
        shot.x <= dropPosition.x &&
        dropPosition.x <= shot.x + SLOT_WIDTH &&
        shot.y <= dropPosition.y &&
        dropPosition.y <= shot.y + SLOT_HEIGHT
      );
    });
    if (!matchedShot) return;
    setShots((prev) =>
      prev.map((shot) =>
        shot.id === matchedShot.id
          ? { ...shot, imageUrl: droppedAsset.imageUrl }
          : shot
      )
    );
  };

  const handleToolSelect = (tool: ToolType) => {
    setActiveTool(tool);
  };

  const handleCreateMemo = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'note') return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newMemo = {
      id: nextId.current++,
      x: pointerPosition.x,
      y: pointerPosition.y,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setActiveTool('pointer');
  };

  const handleMemoClick = (id: number) => {
    setEditingMemoId(id);
  };

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

  const [shots, setShots] = useState<Shot[]>([
    { id: 1, x: 20, y: 20, imageUrl: '/canvas-shotcard.svg' },
    { id: 2, x: 220, y: 20, imageUrl: '' },
    { id: 3, x: 420, y: 20, imageUrl: '' },
    { id: 4, x: 20, y: 160, imageUrl: '' },
    { id: 5, x: 220, y: 160, imageUrl: '' },
    { id: 6, x: 420, y: 160, imageUrl: '' },
    { id: 7, x: 20, y: 300, imageUrl: '' },
    { id: 8, x: 220, y: 300, imageUrl: '' },
    { id: 9, x: 420, y: 300, imageUrl: '' },
  ]);

  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const editingMemo = memos.find((memo) => memo.id === editingMemoId);
  const [activeTool, setActiveTool] = useState<ToolType>('pointer');
  const nextId = useRef(0);

  console.log('editingMemoId:', editingMemoId);

  return (
    <>
      {/* 최상위 wrapper → 제목 입력 영역 + stage 영역 + 툴바 */}
      <div className="flex flex-col h-full px-8 gap-6 pt-8 border border-border">
        {/* ■ 1. 캔버스 - 제목 입력 영역 */}
        <ProjectName />
        {/* ■ 2. 캔버스 - Stage 영역 */}
        <div
          ref={containerRef}
          className={`flex-1 relative ${activeTool === 'note' ? 'cursor-crosshair' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleCanvasDrop}
        >
          {editingMemo && (
            <textarea
              value={editingMemo.content}
              className="absolute"
              style={{
                left: editingMemo.x,
                top: editingMemo.y,
                width: 160,
                height: 160,
                resize: 'none',
                zIndex: 10,
              }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleMemoContentChange(editingMemo.id, e.target.value)
              }
              onBlur={() => setEditingMemoId(null)}
            />
          )}
          <Stage
            width={size.width}
            height={size.height}
            onClick={handleCreateMemo}
          >
            {/* 2-a. 격자 배경 레이어 */}
            <Layer id="background"></Layer>
            {/* 2-b. 카드 슬롯 레이어 */}
            <Layer id="assets">
              {shots.map((shot, index) => (
                <ShotCard
                  id={shot.id}
                  key={shot.id}
                  imageUrl={shot.imageUrl}
                  x={shot.x}
                  y={shot.y}
                  label={`shot ${index + 1}`}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </Layer>
            {/* 2-c. 화살표 그리기 등 기능 적용 레이어 */}
            <Layer id="annotation">
              {memos.map((memo) => (
                <MemoBox
                  id={memo.id}
                  key={memo.id}
                  x={memo.x}
                  y={memo.y}
                  content={memo.content}
                  onDragEnd={handleMemoDragEnd}
                  activeTool={activeTool}
                  isEditing={editingMemoId === memo.id}
                  onClick={handleMemoClick}
                />
              ))}
            </Layer>
          </Stage>
          {/* ■ 3. 캔버스 - 툴바 영역 */}
          <Toolbar onToolSelect={handleToolSelect} activeTool={activeTool} />
        </div>
      </div>
    </>
  );
}
