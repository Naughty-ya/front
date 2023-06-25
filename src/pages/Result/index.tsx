import resultdb from 'src/assets/data/result.json'
import { ShareButtons } from 'src/components/common/ShareButtons'
import { Flex } from 'src/components/core/Flex'
import youAreFealingImage from 'src/assets/img/you-are-f.webp'
import { ImageWrapper } from 'src/components/common/ImageWrapper'
import { useQuery } from 'src/hooks/use-query'

export default function Result() {
  const result = resultdb
  const query = useQuery()

  console.log(query.get('nickname'))

  return (
    <Flex className="px-5" direction="col" justify="center" align="center">
      <div className="text-2xl font-semibold drop-shadow-1">
        AI가 분석한 내 T력
      </div>
      <Flex direction="row" align="end">
        <span className="text-[108px] leading-[0.8] font-dunggeunmo">
          {result.percent}
        </span>
        <div className="text-[30px] font-dunggeunmo">&#37;</div>
      </Flex>
      <div className="text-[22px] my-2 font-dunggeunmo text-brand-pink mb-10">
        {result.title}
      </div>
      <div className="px-8 w-full mb-10">
        <ImageWrapper>
          <img
            src={youAreFealingImage}
            alt="너 T야"
            className="max-w-[500px] w-full rounded-[4px]"
          />
        </ImageWrapper>
      </div>
      <div className="my-4 bg-[#F5F5F5] text-gray-800 px-5 py-6 font-dunggeunmo mb-10">
        {result.desc}
      </div>
      <ShareButtons />
    </Flex>
  )
}
