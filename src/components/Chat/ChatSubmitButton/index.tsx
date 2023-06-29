import { ComponentPropsWithoutRef } from 'react'

interface IChatSubmitButton extends ComponentPropsWithoutRef<'button'> {
  onClick: () => void
}

export function ChatSubmitButton({ onClick, ...others }: IChatSubmitButton) {
  return (
    <div className="px-5">
      <button type="button" {...others} onClick={onClick}>
        분석하기
      </button>
    </div>
  )
}
