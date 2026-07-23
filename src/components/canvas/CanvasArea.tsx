'use client';

import ArrowLine from '@/components/canvas/ArrowLine';
import AssetImage from '@/components/canvas/AssetImage';
import MemoBox from '@/components/canvas/MemoBox';
import PenLine from '@/components/canvas/PenLine';
import ProjectName from '@/components/canvas/ProjectName';
import ShotCard from '@/components/canvas/ShotCard';
import TextBox from '@/components/canvas/TextBox';
import Toolbar from '@/components/canvas/Toolbar';
import { useCanvasExportStore } from '@/stores/canvasExportStore';
import { useCanvasNameStore } from '@/stores/canvasStore';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';

interface Shot {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
}

interface Memo {
  id: number;
  x: number;
  y: number;
  content: string;
}

interface TextBoxData {
  id: number;
  x: number;
  y: number;
  content: string;
  fontSize: number;
}

interface PenLine {
  id: number;
  points: number[]; // [x1,y1,x2,y2,...]
  color: string; // '#FFFFFF' | '#CA6180' | '#0055DA'
  strokeWidth: number; // 고정 2
}

interface Asset {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
}

export type ElementType = 'shot' | 'memo' | 'text' | 'pen' | 'asset' | 'arrow';

interface Arrow {
  id: number;
  fromId: number;
  fromType: ElementType; // 'shot' | 'memo' | 'text' | 'pen' 중 하나만 들어올 수 있음
  toId: number;
  toType: ElementType; // 'shot' | 'memo' | 'text' | 'pen' 중 하나만 들어올 수 있음
}

export type ToolType = 'pointer' | 'move' | 'arrow' | 'pen' | 'note' | 'text';

export default function CanvasArea() {
  const [selectedElement, setSelectedElement] = useState<{
    id: number;
    type: ElementType;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const canvasName = useCanvasNameStore((state) => state.canvasName);
  const setExportFn = useCanvasExportStore((state) => state.setExportFn);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const SLOT_WIDTH = 180;
  const SLOT_HEIGHT = 120;

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
  const [activeTool, setActiveTool] = useState<ToolType>('pointer');

  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemoId, setEditingMemoId] = useState<number | null>(null);
  const editingMemo = memos.find((memo) => memo.id === editingMemoId);
  const memoNextId = useRef(0);

  const [texts, setTexts] = useState<TextBoxData[]>([]);
  const [editingTextId, setEditingTextId] = useState<number | null>(null);
  const editingText = texts.find((text) => text.id === editingTextId);
  const textNextId = useRef(0);

  const [penLines, setPenLines] = useState<PenLine[]>([]);
  const [currentLine, setCurrentLine] = useState<Omit<PenLine, 'id'> | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const penNextId = useRef(0);

  const [arrows, setArrows] = useState<Arrow[]>([]);
  const arrowNextId = useRef(0);
  const [connectingFrom, setConnectingFrom] = useState<{
    id: number;
    type: ElementType;
  } | null>(null);

  const [assets, setAssets] = useState<Asset[]>([]);
  const assetNextId = useRef(0);

  const [stagePos, setStagePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDraggingStage, setIsDraggingStage] = useState<boolean>(false);

  const handleExportCanvas = useCallback(() => {
    const shotPoints = shots.flatMap((shot) => [
      { x: shot.x, y: shot.y },
      { x: shot.x + SLOT_WIDTH, y: shot.y + SLOT_HEIGHT },
    ]);

    const memoPoints = memos.flatMap((memo) => [
      { x: memo.x, y: memo.y },
      { x: memo.x + 125, y: memo.y + 125 },
    ]);

    const textPoints = texts.flatMap((text) => [
      { x: text.x, y: text.y },
      { x: text.x + 120, y: text.y + 28 },
    ]);

    const assetPoints = assets.flatMap((asset) => [
      { x: asset.x, y: asset.y },
      { x: asset.x + 96, y: asset.y + 96 },
    ]);

    const penPoints = penLines.flatMap((pen) =>
      pen.points
        .map((val, i) =>
          i % 2 === 0 ? { x: val, y: pen.points[i + 1] } : null
        )
        .filter((p) => p !== null)
    );

    const allPoints = [
      ...shotPoints,
      ...memoPoints,
      ...textPoints,
      ...assetPoints,
      ...penPoints,
    ];

    if (allPoints.length < 1) return;

    const minX = Math.min(...allPoints.map((p) => p.x));
    const maxX = Math.max(...allPoints.map((p) => p.x));
    const minY = Math.min(...allPoints.map((p) => p.y));
    const maxY = Math.max(...allPoints.map((p) => p.y));

    const stage = stageRef.current;
    if (!stage) return;

    const dataUrl = stage.toDataURL({
      x: minX + stagePos.x,
      y: minY + stagePos.y,
      width: maxX - minX,
      height: maxY - minY,
      pixelRatio: 2,
    });

    const link = document.createElement('a');

    link.href = dataUrl;
    link.download = `${canvasName || 'canvas'}.png`;
    link.click();
  }, [shots, memos, texts, assets, penLines, stagePos, canvasName]);

  useEffect(() => {
    setExportFn(handleExportCanvas);
    return () => setExportFn(null);
  }, [handleExportCanvas, setExportFn]);

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const droppedAsset = JSON.parse(e.dataTransfer.getData('application/json'));
    const dropPosition = {
      x: e.clientX - containerRef.current.getBoundingClientRect().left,
      y: e.clientY - containerRef.current.getBoundingClientRect().top,
    };

    const matchedShot = shots.find((shot) => {
      return (
        shot.x <= dropPosition.x &&
        dropPosition.x <= shot.x + SLOT_WIDTH &&
        shot.y <= dropPosition.y &&
        dropPosition.y <= shot.y + SLOT_HEIGHT
      );
    });
    if (matchedShot) return;

    const newAsset = {
      id: assetNextId.current++,
      x: dropPosition.x,
      y: dropPosition.y,
      imageUrl: droppedAsset.imageUrl,
    };
    setAssets([...assets, newAsset]);
  };

  const handleDragEnd = (id: number, x: number, y: number) => {
    setShots((prevShots) =>
      prevShots.map((shot) => (shot.id === id ? { ...shot, x, y } : shot))
    );
  };

  const handleToolSelect = (tool: ToolType) => {
    setActiveTool(tool);
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool === 'note') {
      handleCreateMemo(e);
    } else if (activeTool === 'text') {
      handleCreateTextBox(e);
    } else if (activeTool === 'pointer' && e.target === e.target.getStage()) {
      setSelectedElement(null);
    }
  };

  const handleCreateMemo = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'note') return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newMemo = {
      id: memoNextId.current++,
      x: pointerPosition.x,
      y: pointerPosition.y,
      content: '',
    };
    setMemos([...memos, newMemo]);
    setEditingMemoId(newMemo.id);
    setActiveTool('pointer');
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

  const handleMemoDelete = (id: number) => {
    setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id));
  };

  const handleMemoClick = (id: number) => {
    setSelectedElement({ id, type: 'memo' });
  };

  const handleCreateTextBox = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'text') return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newText = {
      id: textNextId.current++,
      x: pointerPosition.x,
      y: pointerPosition.y,
      content: '',
      fontSize: 20,
    };
    setTexts([...texts, newText]);
    setEditingTextId(newText.id);
    setActiveTool('pointer');
  };

  const handleTextDragEnd = (id: number, x: number, y: number) => {
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === id ? { ...text, x, y } : text))
    );
  };

  const handleTextContentChange = (id: number, content: string) => {
    if (content.length > 6) return;
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === id ? { ...text, content } : text))
    );
  };

  const handleTextClick = (id: number) => {
    setSelectedElement({ id, type: 'text' });
  };

  const handleTextDelete = (id: number) => {
    setTexts((prevTexts) => prevTexts.filter((text) => text.id !== id));
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'pen') return;
    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const numberedPosition = [pointerPosition.x, pointerPosition.y];

    setCurrentLine({
      color: selectedColor,
      points: numberedPosition,
      strokeWidth: 2,
    });

    setIsDrawing(true);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (activeTool !== 'pen') return;
    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    if (!isDrawing || !currentLine) return;
    setCurrentLine({
      ...currentLine,
      points: [...currentLine.points, pointerPosition.x, pointerPosition.y],
    });
  };

  const handleMouseUp = () => {
    if (activeTool !== 'pen') return;
    if (!currentLine) return;

    setPenLines((prev) => [
      ...prev,
      { ...currentLine, id: penNextId.current++ },
    ]);
    setCurrentLine(null);
    setIsDrawing(false);
  };

  const handlePenClick = (id: number) => {
    setSelectedElement({ id, type: 'pen' });
  };

  const handlePenDelete = (id: number) => {
    setPenLines((prevPens) => prevPens.filter((pen) => pen.id !== id));
  };

  const handleElementClick = (id: number, type: ElementType) => {
    console.log('clicked:', id, type, 'connectingFrom:', connectingFrom);
    if (connectingFrom) {
      const newArrow: Arrow = {
        id: arrowNextId.current++,
        fromId: connectingFrom.id,
        fromType: connectingFrom.type,
        toId: id,
        toType: type,
      };
      setArrows((prev) => [...prev, newArrow]);
      setConnectingFrom(null);
    } else {
      setConnectingFrom({ id, type });
    }
  };

  const getAnchorPosition = (
    id: number,
    type: ElementType
  ): { x: number; y: number } | null => {
    switch (type) {
      case 'shot': {
        const shot = shots.find((s) => s.id === id);
        if (!shot) return null;
        return { x: shot.x + 90, y: shot.y + 60 };
      }
      case 'memo': {
        const memo = memos.find((m) => m.id === id);
        if (!memo) return null;
        return { x: memo.x + 62.5, y: memo.y + 62.5 };
      }
      case 'text': {
        const text = texts.find((t) => t.id === id);
        if (!text) return null;
        return { x: text.x + 60, y: text.y + 14 };
      }
      case 'pen': {
        const pen = penLines.find((p) => p.id === id);
        if (!pen) return null;
        const lastX = pen.points[pen.points.length - 2];
        const lastY = pen.points[pen.points.length - 1];
        return { x: lastX, y: lastY };
      }
      case 'asset': {
        const asset = assets.find((a) => a.id === id);
        if (!asset) return null;
        return { x: asset.x + 48, y: asset.y + 48 };
      }
      default:
        return null;
    }
  };

  const handleArrowClick = (id: number) => {
    setSelectedElement({ id, type: 'arrow' });
  };

  const handleArrowDelete = (id: number) => {
    setArrows((prevArrows) => prevArrows.filter((arrow) => arrow.id !== id));
  };

  const stageHandleDragEnd = (x: number, y: number) => {
    setStagePos({ x, y });
  };

  const stageDragBoundFunc = (pos: { x: number; y: number }) => {
    return {
      x: Math.max(-1000, Math.min(1000, pos.x)),
      y: Math.max(-1000, Math.min(1000, pos.y)),
    };
  };

  const handleAssetClick = (id: number) => {
    setSelectedElement({ id, type: 'asset' });
  };

  const handleAssetDragEnd = (id: number, x: number, y: number) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => (asset.id === id ? { ...asset, x, y } : asset))
    );
  };

  const handleAssetDelete = (id: number) => {
    setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Backspace') return;

      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;

      if (!selectedElement) return;

      if (selectedElement.type === 'memo') handleMemoDelete(selectedElement.id);
      else if (selectedElement.type === 'text')
        handleTextDelete(selectedElement.id);
      else if (selectedElement.type === 'pen')
        handlePenDelete(selectedElement.id);
      else if (selectedElement.type === 'asset')
        handleAssetDelete(selectedElement.id);
      else if (selectedElement.type === 'arrow')
        handleArrowDelete(selectedElement.id);

      setSelectedElement(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement]);

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

  return (
    <>
      {/* 최상위 wrapper → 제목 입력 영역 + stage 영역 + 툴바 */}
      <div className="flex flex-col h-full px-8 gap-6 pt-8 border border-border">
        {/* ■ 1. 캔버스 - 제목 입력 영역 */}
        <ProjectName />
        {/* ■ 2. 캔버스 - Stage 영역 */}
        <div
          ref={containerRef}
          className={`flex-1 relative ${activeTool === 'note' || activeTool === 'text' || activeTool === 'pen' || activeTool === 'arrow' ? 'cursor-crosshair' : activeTool === 'move' ? (isDraggingStage ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleCanvasDrop}
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundPosition: `${stagePos.x}px ${stagePos.y}px`,
            backgroundSize: '16px 16px',
          }}
        >
          {editingMemo && (
            <textarea
              autoFocus
              spellCheck={false}
              value={editingMemo.content}
              className="absolute"
              style={{
                left: editingMemo.x + stagePos.x,
                top: editingMemo.y + stagePos.y,
                width: 160,
                height: 160,
                resize: 'none',
                zIndex: 10,
                outline: 'none',
                border: 'none',
                padding: 0,
                caretColor: 'var(--color-surface)',
              }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleMemoContentChange(editingMemo.id, e.target.value)
              }
              onBlur={() => {
                setEditingMemoId(null);
                setSelectedElement({ id: editingMemo.id, type: 'memo' });
              }}
            />
          )}

          {editingText && (
            <textarea
              autoFocus
              spellCheck={false}
              value={editingText.content}
              className="absolute"
              style={{
                left: editingText.x + stagePos.x,
                top: editingText.y + stagePos.y,
                width: 120,
                height: 28,
                resize: 'none',
                zIndex: 10,
                outline: 'none',
                border: 'none',
                padding: 0,
              }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleTextContentChange(editingText.id, e.target.value)
              }
              onBlur={() => {
                setEditingTextId(null);
                setSelectedElement({ id: editingText!.id, type: 'text' });
              }}
            />
          )}

          <Stage
            ref={stageRef}
            width={size.width}
            height={size.height}
            onClick={handleStageClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            x={stagePos.x}
            y={stagePos.y}
            draggable={activeTool === 'move'}
            onDragEnd={(e) => {
              if (e.target !== e.target.getStage()) return;
              stageHandleDragEnd(e.target.x(), e.target.y());
              setIsDraggingStage(false);
            }}
            onDragStart={() => setIsDraggingStage(true)}
            dragBoundFunc={stageDragBoundFunc}
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
                  activeTool={activeTool}
                  onDragEnd={handleDragEnd}
                  onArrowConnect={handleElementClick}
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
                  onDelete={handleMemoDelete}
                  onArrowConnect={handleElementClick}
                  isSelected={
                    selectedElement !== null &&
                    selectedElement.id === memo.id &&
                    selectedElement.type === 'memo'
                  }
                  onEditStart={() => setEditingMemoId(memo.id)}
                />
              ))}
              {texts.map((text) => (
                <TextBox
                  id={text.id}
                  key={text.id}
                  x={text.x}
                  y={text.y}
                  content={text.content}
                  onDragEnd={handleTextDragEnd}
                  activeTool={activeTool}
                  isEditing={editingTextId === text.id}
                  onClick={handleTextClick}
                  onDelete={handleTextDelete}
                  onArrowConnect={handleElementClick}
                  fontSize={20}
                  isSelected={
                    selectedElement !== null &&
                    selectedElement.id === text.id &&
                    selectedElement.type === 'text'
                  }
                  onEditStart={() => setEditingTextId(text.id)}
                />
              ))}
              {penLines.map((line) => (
                <PenLine
                  key={line.id}
                  id={line.id}
                  points={line.points}
                  color={line.color}
                  strokeWidth={line.strokeWidth}
                  activeTool={activeTool}
                  onDelete={handlePenDelete}
                  onArrowConnect={handleElementClick}
                  onClick={handlePenClick}
                  isSelected={
                    selectedElement !== null &&
                    selectedElement.id === line.id &&
                    selectedElement.type === 'pen'
                  }
                />
              ))}
              {currentLine && (
                <Line
                  points={currentLine.points}
                  stroke={currentLine.color}
                  strokeWidth={currentLine.strokeWidth}
                  lineCap="round"
                  lineJoin="round"
                />
              )}
              {assets.map((asset) => {
                return (
                  <AssetImage
                    id={asset.id}
                    key={asset.id}
                    x={asset.x}
                    y={asset.y}
                    activeTool={activeTool}
                    imageUrl={asset.imageUrl}
                    onDragEnd={handleAssetDragEnd}
                    onArrowConnect={handleElementClick}
                    onClick={handleAssetClick}
                    isSelected={
                      selectedElement !== null &&
                      selectedElement.id === asset.id &&
                      selectedElement.type === 'asset'
                    }
                  />
                );
              })}
              {arrows.map((arrow) => {
                const from = getAnchorPosition(arrow.fromId, arrow.fromType);
                const to = getAnchorPosition(arrow.toId, arrow.toType);
                if (!from || !to) return null;

                return (
                  <ArrowLine
                    id={arrow.id}
                    key={arrow.id}
                    fromX={from.x}
                    fromY={from.y}
                    toX={to.x}
                    toY={to.y}
                    onDelete={handleArrowDelete}
                    onClick={handleArrowClick}
                    isSelected={
                      selectedElement !== null &&
                      selectedElement.id === arrow.id &&
                      selectedElement.type === 'arrow'
                    }
                  />
                );
              })}
            </Layer>
          </Stage>
          {/* ■ 3. 캔버스 - 툴바 영역 */}
          <Toolbar onToolSelect={handleToolSelect} activeTool={activeTool} />
        </div>
      </div>
    </>
  );
}
