import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/forms/LoginForm';

export default function LoginPage() {
  return (
    <AuthCard subtitle="시나리오를 입력하고 9컷 스토리보드를 생성하세요">
      <LoginForm />
    </AuthCard>
  );
}
