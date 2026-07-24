import { ElementType, ToolType } from '@/components/canvas/CanvasArea';
import { Group, Image as KonvaImage, Rect } from 'react-konva';
import useImage from 'use-image';

interface AssetImageProps {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
  activeTool: ToolType;
  onDragEnd: (id: number, x: number, y: number) => void;
  onArrowConnect: (id: number, type: ElementType) => void;
  onClick: (id: number) => void;
  isSelected: boolean;
}

export default function AssetImage({
  id,
  x,
  y,
  imageUrl,
  activeTool,
  onDragEnd,
  onArrowConnect,
  onClick,
  isSelected,
}: AssetImageProps) {
  const [img] = useImage(imageUrl);

  return (
    <Group
      x={x}
      y={y}
      draggable={activeTool === 'pointer'}
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (activeTool === 'arrow') {
          onArrowConnect(id, 'asset');
        } else {
          onClick(id);
        }
      }}
      clipFunc={(ctx) => {
        const width = 96;
        const height = 96;
        const radius = 10;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(width - radius, 0);
        ctx.quadraticCurveTo(width, 0, width, radius);
        ctx.lineTo(width, height - radius);
        ctx.quadraticCurveTo(width, height, width - radius, height);
        ctx.lineTo(radius, height);
        ctx.quadraticCurveTo(0, height, 0, height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
      }}
    >
      {isSelected && (
        <Rect
          width={96}
          height={96}
          cornerRadius={10}
          stroke="#394257"
          strokeWidth={2}
        />
      )}
      {imageUrl && img && (
        <KonvaImage image={img} width={96} height={96} x={0} y={0} />
      )}
    </Group>
  );
}
