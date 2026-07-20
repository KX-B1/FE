import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
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
  activeTool: ToolType;
  isEditing: boolean;
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
  activeTool,
  isEditing,
}: TextBoxProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
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
    >
      <Rect
        width={120}
        height={28}
        fill="transparent"
        stroke={isEditing ? '#394257' : undefined}
        dash={isEditing ? [4, 4] : undefined}
      />
      {!isEditing && (
        <Text
          text={content}
          width={120}
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
          x={102}
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
