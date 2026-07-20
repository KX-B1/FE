import { Line, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface PenLineProps {
  id: number;
  points: number[]; // [x1,y1,x2,y2,...]
  color: string; // '#FFFFFF' | '#CA6180' | '#0055DA'
  strokeWidth: number; // 고정 2
  onDelete: (id: number) => void;
}

export default function PenLine({
  id,
  points,
  color,
  strokeWidth,
  onDelete,
}: PenLineProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  const lastX = points[points.length - 2];
  const lastY = points[points.length - 1];

  return (
    <>
      <Line
        points={points}
        stroke={color}
        strokeWidth={strokeWidth}
        lineCap="round"
        lineJoin="round"
      />
      {deleteIcon && (
        <KonvaImage
          image={deleteIcon}
          width={12}
          height={12}
          x={lastX}
          y={lastY}
          onMouseDown={(e) => {
            e.cancelBubble = true;
          }}
          onMouseEnter={(e) => {
            const stage = e.target.getStage();
            if (stage) stage.container().style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            const stage = e.target.getStage();
            if (stage) stage.container().style.cursor = '';
          }}
          onClick={(e) => {
            e.cancelBubble = true;
            const confirmed = confirm('정말 삭제하시겠습니까?');
            if (confirmed) onDelete(id);
          }}
        />
      )}
    </>
  );
}
