interface SignupCardProps {
  children: React.ReactNode;
}

export default function SignupCard({ children }: SignupCardProps) {
  return (
    <div className="w-105 flex flex-col items-center border border-border rounded-[20px] bg-card px-5 py-9">
      {children}
    </div>
  );
}
