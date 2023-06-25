import { ComponentPropsWithoutRef } from 'react'

interface IChatSubmitButton extends ComponentPropsWithoutRef<'button'> {
  onClick: () => void
}

export function ChatSubmitButton({ onClick, ...others }: IChatSubmitButton) {
  return (
    <button type="button" {...others} onClick={onClick}>
      최종어쩌꾸버튼
    </button>
  )
}
