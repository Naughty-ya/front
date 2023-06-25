import { GradientWrapper } from 'src/components/common/GradientWrapper'
import { Icon } from 'src/components/core/Icon'

interface StatusBarProps {
  userPercent?: number
  averagePercent?: number
  topPercent?: number
}

export function StatusBar({
  userPercent = 45,
  averagePercent = 56,
  topPercent = 20
}: StatusBarProps) {
  return (
    <div className="flex flex-row items-center w-full gap-2">
      <div className="text-[12px] w-12 font-dunggeunmo shrink-0">
        상위 {topPercent}%
      </div>
      <div className="relative w-full">
        <GradientWrapper>
          <div className="relative h-4 m-1 bg-gra">
            <div
              className="absolute inset-y-0 right-0 h-full bg-black"
              style={{
                width: `${100 - userPercent}%`
              }}
            />
            <div
              className="absolute inset-y-0 w-1 h-full bg-white after:"
              style={{
                left: `${averagePercent}%`
              }}
            />
          </div>
        </GradientWrapper>
        <div
          className="absolute inset-0 -top-6"
          style={{ left: `${userPercent * 0.95}%` }}
        >
          <Icon name="polygon" />
        </div>

        <div
          className="absolute inset-y-0 top-8 w-10 font-dunggeunmo text-white text-[12px]"
          style={{ left: `${averagePercent * 0.94}%` }}
        >
          평균
        </div>
      </div>
    </div>
  )
}
