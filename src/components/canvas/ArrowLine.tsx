import { Arrow, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface ArrowLineProps {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
  isSelected: boolean;
}

export default function ArrowLine({
  id,
  fromX,
  fromY,
  toX,
  toY,
  onDelete,
  onClick,
  isSelected,
}: ArrowLineProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  return (
    <>
      <Arrow
        points={[fromX, fromY, toX, toY]}
        fill={isSelected ? '#394257' : '#ffffff'}
        stroke={isSelected ? '#394257' : '#ffffff'}
        strokeWidth={2}
        pointerLength={10}
        pointerWidth={10}
        onClick={() => onClick(id)}
      />
      {deleteIcon && (
        <KonvaImage
          image={deleteIcon}
          width={12}
          height={12}
          x={fromX}
          y={fromY}
          onClick={(e) => {
            e.cancelBubble = true;
            onDelete(id);
          }}
        />
      )}
    </>
  );
}
