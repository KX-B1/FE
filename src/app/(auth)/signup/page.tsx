import SignupCard from '@/components/auth/SignupCard';
import SignupForm from '@/components/auth/SignupForm';
import SignupVisualPanel from '@/components/auth/SignupVisualPanel';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-linear-to-br from-[#0C0D18] via-[#110828] to-[#0A0C1A] px-6 py-16 lg:flex-row lg:gap-52 lg:p-30">
      <SignupVisualPanel />
      <SignupCard>
        <SignupForm />
      </SignupCard>
    </div>
  );
}
