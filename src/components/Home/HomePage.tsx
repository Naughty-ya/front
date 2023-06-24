import { getRandomName } from 'src/utils/random'
import { useRef } from 'react'
import nicknamedb from 'src/assets/data/nickname.json'

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
    <div>
      <div className="flex flex-col gap-2">
        <div>AI가 판별해준다</div>
        <div className="text-5xl">너 T야?</div>
        <div>neo t yai?</div>
      </div>
      <div className="my-8 max-w-sm">
        <img
          src="https://i.namu.wiki/i/ShTzcoMeHE4voCN_b3hTBqixr8Z2NO_O8XEIFIhN3_7rbIfSdq0hUfUw5GJJoF55QatW6GRiwpI9qbX3tI0Mlg.webp"
          alt="AI가 판별해준다"
        />
      </div>
      <div>
        <span className="mr-2">닉네임</span>
        <input
          type="text"
          defaultValue={nickname.current}
          onChange={handleNicknameChange}
          className="px-2"
        />
      </div>

      <button
        className="rounded-[6px] my-8 bg-sky-500 px-8 py-2"
        onClick={handleStart}
      >
        내 T력 테스트하기
      </button>
    </div>
  )
}
