import { Group, Rect, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';

interface ShotCardProps {
  id: number;
  imageUrl: string;
  x: number;
  y: number;
  label: string;
  onDragEnd: (id: number, x: number, y: number) => void;
}

export default function ShotCard({
  id,
  imageUrl,
  x,
  y,
  label,
  onDragEnd,
}: ShotCardProps) {
  const [img] = useImage(imageUrl);

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
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
      {img && <KonvaImage image={img} width={168} height={108} x={6} y={6} />}
      <Text text={label} x={10} y={10} fontSize={16} fill="#ffffff" />
    </Group>
  );
}
