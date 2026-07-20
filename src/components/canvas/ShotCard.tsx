import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
import { Group, Rect, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';

interface ShotCardProps {
  id: number;
  imageUrl: string;
  x: number;
  y: number;
  label: string;
  activeTool: ToolType;
  onDragEnd: (id: number, x: number, y: number) => void;
  onArrowConnect: (id: number, type: ElementType) => void;
}

export default function ShotCard({
  id,
  imageUrl,
  x,
  y,
  label,
  activeTool,
  onDragEnd,
  onArrowConnect,
}: ShotCardProps) {
  const [img] = useImage(imageUrl);

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (activeTool === 'arrow') {
          onArrowConnect(id, 'shot');
        }
      }}
    >
      <Rect
        width={180}
        height={120}
        fill="#1c1f2a"
        opacity={0.6}
        stroke="#394257"
        strokeWidth={1}
        cornerRadius={10}
      />
      {imageUrl && img && (
        <KonvaImage image={img} width={168} height={108} x={6} y={6} />
      )}
      <Text text={label} x={10} y={10} fontSize={16} fill="#ffffff" />
    </Group>
  );
}
