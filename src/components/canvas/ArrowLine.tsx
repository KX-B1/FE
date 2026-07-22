import { Arrow, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface ArrowLineProps {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onDelete: (id: number) => void;
}

export default function ArrowLine({
  id,
  fromX,
  fromY,
  toX,
  toY,
  onDelete,
}: ArrowLineProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  return (
    <>
      <Arrow
        points={[fromX, fromY, toX, toY]}
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth={2}
        pointerLength={10}
        pointerWidth={10}
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
