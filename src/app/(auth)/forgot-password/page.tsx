import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';

export default function ForgotPasswordPage() {
  return (
    <AuthCard subtitle="비밀번호 찾기 페이지 준비 중">
      <div className="w-95 flex flex-col items-center gap-4">
        <p className="text-center text-sm text-text-secondary">
          아직 시안 없음
        </p>
        <Link
          href="/login"
          className="text-sm text-primary-500 hover:underline"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    </AuthCard>
  );
}
