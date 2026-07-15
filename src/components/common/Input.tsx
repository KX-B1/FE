'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { InputProps } from '@/types/common';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: InputProps) {
  const [readOnly, setReadOnly] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative flex flex-col gap-2">
      <label className="px-5 text-sm text-text-primary">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          readOnly={readOnly}
          onMouseDown={() => setReadOnly(false)}
          onFocus={() => {
            setReadOnly(false);
            setIsFocused(true);
          }}
          className={`w-full h-13 rounded-[10px] bg-surface border text-sm text-text-primary placeholder:text-text-placeholder outline-none focus:outline-none px-5 ${
            isFocused
              ? 'border-primary-500 shadow-[0_0_2px_2px] shadow-primary-500/30'
              : 'border-border'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute right-5 top-1/2 -translate-y-1/2 ${
              showPassword ? 'text-text-placeholder' : 'text-text-primary'
            }`}
          >
            <Eye size={24} />
          </button>
        )}
      </div>
      {error && <p className="px-5 text-xs text-status-error">{error}</p>}
    </div>
  );
}
