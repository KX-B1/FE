import Image from 'next/image';
import { AuthCardProps } from '@/types/auth';

export default function AuthCard({ subtitle, children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-105 flex flex-col items-center gap-7.5 border border-border rounded-2xl bg-card px-5 py-10">
        <div className="w-95 h-35 flex flex-col items-center gap-4 py-2.5">
          <Image src="/logo.svg" alt="로고" width={64} height={64} />
          <p className="text-center text-sm text-text-placeholder py-2.5">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
