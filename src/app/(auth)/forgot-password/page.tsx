import AuthCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthCard header={<></>}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
