import resultdb from 'src/assets/data/result.json'
import { ShareButtons } from 'src/components/common/ShareButtons'
import test from 'src/assets/img/test.png'
import { Flex } from 'src/components/core/Flex'
import { useNavigate } from 'react-router-dom'

export default function Result() {
  const result = resultdb
  const navigate = useNavigate()

  return (
    <Flex className="max-w-lg" direction="col" justify="center" align="center">
      <div className="text-5xl">{result.percent}&#37;</div>
      <div className="text-xl my-4">{result.title}</div>
      <div>
        <img src={test} alt="너 T야" />
      </div>
      <div className="my-4">{result.desc}</div>
      <button
        className="rounded-[6px] my-8 bg-sky-500 px-8 py-2"
        onClick={() => navigate('/')}
      >
        나도 T력 테스트하기
      </button>
      <ShareButtons />
    </Flex>
  )
}
