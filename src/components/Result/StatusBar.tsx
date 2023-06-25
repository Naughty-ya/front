import { useMemo } from 'react'
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
    <div className="w-full flex flex-row items-center gap-2">
      <div className="text-[12px] w-12 font-dunggeunmo shrink-0">
        상위 {topPercent}%
      </div>
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
