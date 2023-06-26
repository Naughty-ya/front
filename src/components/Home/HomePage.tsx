import { getRandomName } from 'src/utils/random'
import { useState } from 'react'
import nicknamedb from 'src/assets/data/nickname.json'
import { Flex } from 'src/components/core/Flex'
import youAreThinkingImage from 'src/assets/img/you-are-t.webp'
import { GradientWrapper } from 'src/components/common/GradientWrapper'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../common/SubmitButton'

export default function HomePage() {
  const [nickname, setNickName] = useState(getRandomName(nicknamedb))
  const navigate = useNavigate()

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setNickName(e.target.value)
    }
  }

  const handleStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    navigate(`/chat?nickname=${nickname}`)
  }

  return (
    <Flex direction="col" align="center" justify="center" className="w-full">
      <Flex direction="col" align="center">
        <div className="text-2xl font-semibold drop-shadow-1">
          AI가 판별해준다
        </div>
        <div className="text-[72px] font-bold drop-shadow-1 font-dunggeunmo">
          너T야?
        </div>
      </Flex>
      <div className="w-full p-5 mb-10">
        <GradientWrapper>
          <img
            src={youAreThinkingImage}
            alt="AI가 판별해준다"
            className="object-fill max-w-[500px] w-full p-3 rounded-[4px]"
          />
        </GradientWrapper>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
        }}
        className="w-full"
      >
        <Flex className="border-brand-pink border-2 w-full rounded-[4px] mb-6 drop-shadow-1 overflow-hidden">
          <span className="shrink-0 self-center p-[0.625rem] px-4 text-base font-semibold text-brand-pink">
            닉네임
          </span>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="최대 10자 입력"
            className="px-[0.875rem] py-3 w-full  h-13 bg-white text-black focus:outline-none rounded-none"
          />
        </Flex>
        <SubmitButton contents="내 T력 테스트하기" onClick={handleStart} />
      </form>
    </Flex>
  )
}
