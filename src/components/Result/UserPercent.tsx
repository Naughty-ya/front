import { Flex } from 'src/components/core/Flex'

interface UserPercentProps {
  percent: number
}

export function UserPercent({ percent }: UserPercentProps) {
  return (
    <Flex direction="row" align="end">
      <span className="text-[108px] leading-[0.8] font-dunggeunmo">
        {percent}
      </span>
      <div className="text-[30px] font-dunggeunmo">&#37;</div>
    </Flex>
  )
}
