'use client';

import { useState } from 'react';

export function useCopyToClipboard(resetDelay = 3000) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  };

  return { copied, copy };
}
