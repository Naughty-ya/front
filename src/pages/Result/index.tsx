import resultdb from 'src/assets/data/result.json'
import { ShareButtons } from 'src/components/common/ShareButtons'

export default function Result() {
  const result = resultdb
  return (
    <div className="max-w-lg gap-10">
      <div className="text-5xl">{result.percent}&#37;</div>
      <div className="text-xl">{result.title}</div>
      <div>이미지~</div>
      <div>{result.desc}</div>
      <button className="rounded-[6px] my-8 bg-sky-500 px-8 py-2">
        나도 T력 테스트하기
      </button>
      <ShareButtons />
    </div>
  )
}
