import SignupCard from '@/components/auth/SignupCard';
import SignupForm from '@/components/auth/forms/SignupForm';
import SignupVisualPanel from '@/components/auth/SignupVisualPanel';
import { AUTH_PAGE_BACKGROUND } from '@/components/auth/AuthCard';

export default function SignupPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-16 min-[1440px]:flex-row min-[1440px]:gap-52 min-[1440px]:p-30"
      style={{ backgroundImage: AUTH_PAGE_BACKGROUND }}
    >
      <SignupVisualPanel />
      <SignupCard>
        <SignupForm />
      </SignupCard>
    </div>
  );
}
