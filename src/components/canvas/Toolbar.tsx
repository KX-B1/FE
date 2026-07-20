import { ToolType } from '@/components/canvas/CanvasArea';
import Image from 'next/image';

interface ToolbarProps {
  onToolSelect: (tool: ToolType) => void;
  activeTool: ToolType;
}

export default function Toolbar({ onToolSelect, activeTool }: ToolbarProps) {
  return (
    <div className="flex h-[58px] w-[290px] absolute bottom-4 left-1/2 -translate-x-1/2 rounded-[20px] border border-border bg-card items-center justify-center gap-2 px-4">
      <button
        className={`w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer ${activeTool === 'pointer' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500`}
        onClick={() => onToolSelect('pointer')}
      >
        <Image
          src="/toolbar-pointer.svg"
          alt="툴바 포인터"
          width={20}
          height={20}
        />
      </button>
      <button
        className={`w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer ${activeTool === 'move' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500 `}
        onClick={() => onToolSelect('move')}
      >
        <Image src="/toolbar-move.svg" alt="툴바 이동" width={20} height={20} />
      </button>
      <button
        className={`w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer ${activeTool === 'arrow' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500 `}
        onClick={() => onToolSelect('arrow')}
      >
        <Image
          src="/toolbar-arrow.svg"
          alt="툴바 화살표"
          width={20}
          height={20}
        />
      </button>
      <button
        className={`w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer ${activeTool === 'pen' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500`}
        onClick={() => onToolSelect('pen')}
      >
        <Image src="/toolbar-pen.svg" alt="툴바 펜" width={20} height={20} />
      </button>
      <button
        className={`w-9 h-9 rounded-xl flex justify-center items-center cursor-pointer ${activeTool === 'note' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500`}
        onClick={() => onToolSelect('note')}
      >
        <Image src="/toolbar-note.svg" alt="툴바 메모" width={20} height={20} />
      </button>
      <button
        className={`w-9 h-9 flex justify-center items-center rounded-xl cursor-pointer ${activeTool === 'text' ? 'bg-primary-500' : ''} hover:border-2 hover:border-primary-500`}
        onClick={() => onToolSelect('text')}
      >
        <Image
          src="/toolbar-text.svg"
          alt="툴바 텍스트"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
