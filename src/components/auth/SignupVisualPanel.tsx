import Image from 'next/image';

export default function SignupVisualPanel() {
  return (
    <div className="relative flex w-full max-w-143 flex-col items-center gap-16.25 text-center min-[1440px]:w-142.5 min-[1440px]:items-start min-[1440px]:gap-0 min-[1440px]:text-left">
      <Image
        src="/logo-wordmark.svg"
        alt="로고"
        width={200}
        height={50}
        className="min-[1440px]:absolute min-[1440px]:bottom-full min-[1440px]:left-0 min-[1440px]:mb-23.5"
      />

      <div className="flex w-full flex-col gap-5">
        <p className="text-xl text-primary-300">계정 생성</p>

        <h1 className="text-6xl leading-snug text-text-primary">
          Story AI와 함께
          <br />
          <span className="font-semibold break-keep min-[1440px]:whitespace-nowrap text-primary-300">
            스토리보드를 시작하세요
          </span>
        </h1>

        <p className="text-[22px] text-text-placeholder">
          AI의 힘으로 아이디어를 시각화하고
          <br />더 빠르고 효율적으로 스토리를 완성하세요
        </p>
      </div>
    </div>
  );
}
