import Image from 'next/image';
import { AuthCardProps } from '@/types/auth';

export const AUTH_PAGE_BACKGROUND =
  'linear-gradient(90deg, rgba(17, 17, 25, 0.8) 0%, rgba(17, 17, 25, 0.8) 100%), linear-gradient(90deg, rgba(234, 251, 47, 0.065) 0%, rgba(234, 251, 47, 0.065) 100%), linear-gradient(122.62386834028354deg, rgb(227, 110, 255) 0%, rgb(17, 8, 40) 44.903%, rgb(255, 91, 115) 98.314%)';

export default function AuthCard({
  subtitle,
  header,
  children,
}: AuthCardProps) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundImage: AUTH_PAGE_BACKGROUND }}
    >
      <div className="w-full max-w-105 flex flex-col items-center gap-7.5 border border-border rounded-2xl bg-background px-5 py-10">
        {header ?? (
          <div className="w-full max-w-95 flex flex-col items-center gap-3">
            <Image src="/logo.svg" alt="로고" width={80} height={80} />
            <p className="text-center text-sm text-text-placeholder py-2.5">
              {subtitle}
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
