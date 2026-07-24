import { Check } from 'lucide-react';
import { CheckboxProps } from '@/types/auth';

export default function Checkbox({
  checked,
  onChange,
  label,
  required,
  onViewClick,
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-text-secondary">
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-primary-300 bg-transparent checked:border-primary-300 checked:bg-background"
          />
          <Check
            strokeWidth={3}
            className="pointer-events-none absolute h-3 w-3 text-primary-300 opacity-0 peer-checked:opacity-100"
          />
        </span>
        <span>{label}</span>
        {required && <span className="shrink-0 text-text-secondary">(필수)</span>}
      </label>
      {onViewClick && (
        <button
          type="button"
          onClick={onViewClick}
          className="shrink-0 text-[10px] text-text-secondary hover:underline"
        >
          자세히 보기
        </button>
      )}
    </div>
  );
}
