import { ShareButtons } from 'src/components/common/ShareButtons'
import { Flex } from 'src/components/core/Flex'
import { GradientWrapper } from 'src/components/common/GradientWrapper'
import { StatusBar } from 'src/components/Result/StatusBar'

import youAreFealingImage from 'src/assets/img/you-are-f.webp'
import youArdThinkingImage from 'src/assets/img/you-are-t.webp'

import { UserPercent } from 'src/components/Result/UserPercent'
import { Layout } from 'src/components/layout/Layout'
import { useLocation, useNavigate } from 'react-router-dom'
import SubmitButton from 'src/components/common/SubmitButton'

type ResultData = {
  percent?: number
  average?: number
  rate?: number
  message?: string
}

export default function Result() {
  const data: ResultData = useLocation().state
  const navigate = useNavigate()

  const isThinking = (data?.percent ?? 0) > 50

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
        <UserPercent percent={data?.percent ?? 40} />
        <div className="text-[24px] my-2 font-dunggeunmo text-brand-pink mb-10">
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
            userPercent={data?.percent}
            averagePercent={data?.average}
            topPercent={data?.rate}
          />
        </Flex>
        <div className="my-4 bg-[#F5F5F5] text-gray-800 w-full px-5 py-6 font-dunggeunmo mb-10 rounded-[4px] tracking-tight">
          {data?.message ?? '알 수 없는 오류가 발생했습니다.'}
        </div>
        <SubmitButton
          contents="내 T력 테스트하기"
          onClick={() => navigate('/')}
        />
        <ShareButtons />
      </Flex>
    </Layout>
  )
}
