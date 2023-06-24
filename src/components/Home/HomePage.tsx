import { getRandomName } from 'src/utils/random'
import { useRef } from 'react'
import nicknamedb from 'src/assets/data/nickname.json'
import { Flex } from 'src/components/core/Flex'
import youAreThinkingImage from 'src/assets/img/you-are-t.webp'
import { ImageWrapper } from 'src/components/common/ImageWrapper'

export default function HomePage() {
  const nickname = useRef(getRandomName(nicknamedb))

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    nickname.current = e.target.value
  }

  const handleStart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(nickname.current)
  }

  return (
    <Flex direction="col" align="center" justify="center" className="w-full">
      <Flex direction="col" align="center">
        <div className="text-2xl font-semibold drop-shadow-[0_0_40px_#66229C]">
          AI가 판별해준다
        </div>
        <div className="text-[72px] font-bold drop-shadow-[0_0_40px_#66229C] font-dunggeunmo">
          너T야?
        </div>
      </Flex>
      <div className="p-5 w-full mb-10">
        <ImageWrapper>
          <img
            src={youAreThinkingImage}
            alt="AI가 판별해준다"
            className="object-fill max-w-[500px] w-full rounded-[4px]"
          />
        </ImageWrapper>
      </div>
      <Flex className="border-pink border-2 w-full rounded-[4px] mb-6 drop-shadow-[0_0_40px_#66229C]">
        <span className="shrink-0 self-center p-[0.625rem] px-4 text-base font-semibold text-pink">
          닉네임
        </span>
        <input
          type="text"
          defaultValue={nickname.current}
          onChange={handleNicknameChange}
          className="px-[0.875rem] py-3 w-full  h-13 bg-white text-black focus:outline-none"
        />
      </Flex>
      <button
        className="rounded-[4px] mb-10 h-13 px-8 py-2 bg-gradient-to-r from-[#FF55F8] to-[#5B89FF] text-white font-semibold text-lg w-full drop-shadow-[0_0_40px_#66229C]"
        onClick={handleStart}
      >
        내 T력 테스트하기
      </button>
    </Flex>
  )
}
