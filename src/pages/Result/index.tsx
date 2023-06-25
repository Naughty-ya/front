import resultdb from 'src/assets/data/result.json'

import { ShareButtons } from 'src/components/common/ShareButtons'
import { Flex } from 'src/components/core/Flex'
import { GradientWrapper } from 'src/components/common/GradientWrapper'
import { useQuery } from 'src/hooks/use-query'
import { StatusBar } from 'src/components/Result/StatusBar'

import youAreFealingImage from 'src/assets/img/you-are-f.webp'
import youArdThinkingImage from 'src/assets/img/you-are-t.webp'
import { UserPercent } from 'src/components/Result/UserPercent'
import { Layout } from 'src/components/layout/Layout'

export default function Result() {
  // TODO: query or state 로 userPercent 받아오기
  // TODO: api로 averagePercent 받아오기

  const result = resultdb
  const query = useQuery()

  console.log(query.get('nickname'))

  const averagePercent = 45
  const isThinking = result.percent > 50
  // const brokeThink=

  return (
    <Layout>
      <Flex
        className="px-5 py-10"
        direction="col"
        justify="center"
        align="center"
      >
        <div className="text-2xl font-semibold drop-shadow-1">
          AI가 분석한 내 T력
        </div>
        <UserPercent percent={result.percent} />
        <div className="text-[22px] my-2 font-dunggeunmo text-brand-pink mb-10">
          {isThinking ? '너T야' : '너T아니야'}
        </div>
        <Flex className="w-full gap-10 px-8 mb-10" direction="col">
          <GradientWrapper>
            <img
              src={isThinking ? youArdThinkingImage : youAreFealingImage}
              className="max-w-[500px] w-full rounded-[4px] p-[10px]"
              alt="t-or-f"
            />
          </GradientWrapper>
          <StatusBar
            userPercent={result.percent}
            averagePercent={averagePercent}
          />
        </Flex>
        <div className="my-4 bg-[#F5F5F5] text-gray-800 px-5 py-6 font-dunggeunmo mb-10 rounded-[4px] tracking-tight">
          {result.desc}
        </div>
        <ShareButtons />
      </Flex>
    </Layout>
  )
}
