import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Group, Rect, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';

interface TextBoxProps {
  id: number;
  x: number;
  y: number;
  content: string;
  fontSize: number;
  onDragEnd: (id: number, x: number, y: number) => void;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  onArrowConnect: (id: number, type: ElementType) => void;
  onEditStart: (id: number) => void;
  activeTool: ToolType;
  isEditing: boolean;
  isSelected: boolean;
}

export default function TextBox({
  id,
  x,
  y,
  content,
  fontSize,
  onDragEnd,
  onClick,
  onDelete,
  onArrowConnect,
  onEditStart,
  activeTool,
  isEditing,
  isSelected,
}: TextBoxProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  const textRef = useRef<Konva.Text>(null);
  const MIN_WIDTH = 120;
  const [boxWidth, setBoxWidth] = useState(MIN_WIDTH);

  const MAX_CHARS = 20;
  const MAX_WIDTH = 300; // 20자 캡 도달 시 고정폭 (실측 후 조정)
  const isOverflow = content.length >= MAX_CHARS;

  useEffect(() => {
    if (!textRef.current || isOverflow) return;
    const w = textRef.current.getTextWidth();
    setBoxWidth(Math.max(40, w + 8)); // padding 4+4
  }, [content, isOverflow]);

  const displayWidth = isOverflow ? MAX_WIDTH : boxWidth;

  return (
    <Group
      x={x}
      y={y}
      draggable={activeTool === 'pointer'}
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (activeTool === 'arrow') {
          onArrowConnect(id, 'text');
        } else {
          onClick(id);
        }
      }}
      onDblClick={() => onEditStart(id)}
    >
      <Rect
        width={displayWidth}
        height={28}
        fill="transparent"
        stroke={isEditing ? '#394257' : isSelected ? '#394257' : undefined}
        dash={isEditing ? [4, 4] : undefined}
      />
      {!isEditing && (
        <Text
          ref={textRef}
          text={content}
          width={isOverflow ? MAX_WIDTH : undefined}
          wrap={isOverflow ? 'word' : 'none'}
          x={4}
          y={4}
          fontSize={fontSize}
          fill="#ffffff"
        />
      )}
      {deleteIcon && (
        <KonvaImage
          image={deleteIcon}
          width={12}
          height={12}
          x={displayWidth - 18}
          y={6}
          onClick={(e) => {
            e.cancelBubble = true;
            onDelete(id);
          }}
        />
      )}
    </Group>
  );
}
