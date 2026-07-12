import Image from 'next/image';

export default function SignupVisualPanel() {
  return (
    <div className="relative flex w-full max-w-143 flex-col items-center gap-16.25 text-center lg:w-142.5 lg:items-start lg:gap-0 lg:text-left">
      <Image
        src="/logo.svg"
        alt="로고"
        width={64}
        height={64}
        className="lg:absolute lg:bottom-full lg:left-0 lg:mb-32.5"
      />

      <div className="flex w-full flex-col gap-5">
        <p className="text-xl text-primary-500">계정 생성</p>

        <h1 className="text-6xl leading-snug text-text-primary">
          Story AI와 함께
          <br />
          <span className="font-semibold break-keep lg:whitespace-nowrap text-primary-600">
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
