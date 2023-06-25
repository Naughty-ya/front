import { GradientWrapper } from 'src/components/common/GradientWrapper'

interface StatusBarProps {
  userPercent?: number
  averagePercent?: number
}

export function StatusBar({
  userPercent = 45,
  averagePercent = 56
}: StatusBarProps) {
  return (
    <div className="relative w-full">
      <GradientWrapper>
        <div className="relative h-4 bg-gra m-1">
          <div
            className="absolute h-full bg-black inset-y-0 right-0"
            style={{
              width: `${100 - userPercent}%`
            }}
          />
          <div
            className="absolute h-full w-1 bg-white inset-y-0 after:"
            style={{
              left: `${averagePercent}%`
            }}
          />
        </div>
      </GradientWrapper>
      {/* <div
        className="absolute w-1 bg-white h-3 inset-0 -top-5 m-1"
        style={{ left: `${userPercent * 0.96}%` }}
      /> */}
      <div
        className="absolute inset-y-0 top-8 w-10 font-dunggeunmo text-white text-[12px]"
        style={{ left: `${averagePercent * 0.94}%` }}
      >
        평균
      </div>
    </div>
  )
}
