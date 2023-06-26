import { HTMLAttributes } from 'react'

interface Buttons extends HTMLAttributes<HTMLButtonElement> {
  contents: string
}

export default function SubmitButton({
  contents,
  onClick,
  ...others
}: Buttons) {
  return (
    <button
      className="rounded-[4px] mb-10 h-14 px-8 py-2 bg-gra text-white font-semibold text-lg w-full drop-shadow-1"
      onClick={onClick}
      {...others}
    >
      {contents}
    </button>
  )
}
