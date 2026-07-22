import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
import { Group, Rect, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';

interface MemoBoxProps {
  id: number;
  x: number;
  y: number;
  content: string;
  onDragEnd: (id: number, x: number, y: number) => void;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  onArrowConnect: (id: number, type: ElementType) => void;
  onEditStart: (id: number) => void;
  activeTool: ToolType;
  isEditing: boolean;
  isSelected: boolean;
}

export default function MemoBox({
  id,
  x,
  y,
  content,
  onDragEnd,
  onClick,
  onDelete,
  onArrowConnect,
  onEditStart,
  activeTool,
  isEditing,
  isSelected,
}: MemoBoxProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  return (
    <Group
      x={x}
      y={y}
      draggable={activeTool === 'pointer'}
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (activeTool === 'arrow') {
          onArrowConnect(id, 'memo');
        } else {
          onClick(id);
        }
      }}
      onDblClick={() => onEditStart(id)}
    >
      <Rect
        width={125}
        height={125}
        fill="#FEFD99"
        cornerRadius={6}
        stroke={isSelected ? '#394257' : undefined}
        strokeWidth={isSelected ? 2 : undefined}
      />
      {!isEditing && (
        <Text text={content} width={120} x={8} y={8} fontSize={16} />
      )}
      {deleteIcon && (
        <KonvaImage
          image={deleteIcon}
          width={12}
          height={12}
          x={125 - 12 - 6}
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
