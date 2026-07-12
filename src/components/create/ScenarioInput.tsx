'use client';

import { MAX_SCENARIO_LENGTH } from '@/types/create';

interface ScenarioInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function ScenarioInput({
  value,
  onChange,
  maxLength = MAX_SCENARIO_LENGTH,
}: ScenarioInputProps) {
  return (
    <div className="p-2.5">
      <div className="px-2.5 pb-2 flex items-center justify-between">
        <p className="text-sm text-text-secondary">시나리오 입력</p>
        <span className="text-xs text-text-placeholder">
          ({value.length}/{maxLength})
        </span>
      </div>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder="스토리보드로 만들 시나리오를 입력해주세요..."
        className="h-55 w-full resize-none rounded-[20px] border border-border bg-surface py-5 px-7.5 text-sm text-text-primary placeholder:text-text-placeholder focus:border-primary-500 focus:outline-none"
      />
    </div>
  );
}
