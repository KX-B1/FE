const GUIDE_ITEMS = [
  {
    label: '글자 수',
    description: '최소 10자 이상, 최대 3,000자 이하로 작성해주세요',
  },
  {
    label: '인물 외형',
    description:
      '캐릭터의 의상, 헤어 스타일, 나이 등 외형 정보를 자세히 적어주세요',
  },
  {
    label: '행동 표현',
    description: '캐릭터의 감정과 구체적인 행동을 작성해 주세요',
  },
  {
    label: '배경 조명',
    description: '장소, 시간대, 조명 등 장면의 전반적인 분위기를 작성해 주세요',
  },
  {
    label: '카메라',
    description: '구도(ex. 줌인, 와이드샷)나 카메라 움직임을 작성해 주세요',
  },
] as const;

export default function WritingGuide() {
  return (
    <div className="p-2.5">
      <p className="px-2.5 pb-2 text-sm text-text-secondary">작성 가이드</p>
      <div className="flex flex-col gap-1 rounded-[20px] border border-border bg-surface p-5">
        {GUIDE_ITEMS.map((item) => (
          <p key={item.label} className="text-xs">
            <span className="pr-5 font-medium text-primary-500">
              [{item.label}]
            </span>
            <span className="text-text-secondary">{item.description}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
