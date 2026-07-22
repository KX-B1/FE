import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
import { Line, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface PenLineProps {
  id: number;
  points: number[]; // [x1,y1,x2,y2,...]
  color: string; // '#FFFFFF' | '#CA6180' | '#0055DA'
  strokeWidth: number; // 고정 2
  activeTool: ToolType;
  onDelete: (id: number) => void;
  onArrowConnect: (id: number, type: ElementType) => void;
  onClick: (id: number) => void;
  isSelected: boolean;
}

export default function PenLine({
  id,
  points,
  color,
  strokeWidth,
  activeTool,
  onDelete,
  onArrowConnect,
  onClick,
  isSelected,
}: PenLineProps) {
  const [deleteIcon] = useImage('/canvas-delete-button.svg');
  const lastX = points[points.length - 2];
  const lastY = points[points.length - 1];

  return (
    <>
      <Line
        points={points}
        stroke={color}
        strokeWidth={isSelected ? strokeWidth + 2 : strokeWidth}
        lineCap="round"
        lineJoin="round"
        onClick={() => {
          if (activeTool === 'arrow') {
            onArrowConnect(id, 'pen');
          } else {
            onClick(id);
          }
        }}
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
            onDelete(id);
          }}
        />
      )}
    </>
  );
}
