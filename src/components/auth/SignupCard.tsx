import type { SignupCardProps } from '@/types/auth';

export default function SignupCard({ children }: SignupCardProps) {
  return (
    <div className="w-full max-w-105 flex flex-col items-center border border-border rounded-[20px] bg-background px-5 py-9">
      {children}
    </div>
  );
}
