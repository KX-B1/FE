import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  required?: boolean;
  onViewClick?: () => void;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  required,
  onViewClick,
}: CheckboxProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-primary-500 bg-transparent checked:border-primary-500 checked:bg-primary-500"
          />
          <Check
            strokeWidth={3}
            className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        {label}
        {required && <span className="text-text-secondary">(필수)</span>}
      </label>
      {onViewClick && (
        <button
          type="button"
          onClick={onViewClick}
          className="text-[10px] text-text-secondary hover:underline"
        >
          자세히 보기
        </button>
      )}
    </div>
  );
}
