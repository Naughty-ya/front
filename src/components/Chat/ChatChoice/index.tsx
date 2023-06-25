import { HTMLAttributes, ReactNode } from 'react'

interface IChatChoiceButton extends HTMLAttributes<HTMLButtonElement> {
  text: string
  onClick: () => void
}

function ChatChoiceButton({ text, onClick, ...others }: IChatChoiceButton) {
  return (
    <button onClick={onClick} type="button" {...others}>
      {text}
    </button>
  )
}

interface IChatChoice extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ChatChoice({ children, ...others }: IChatChoice) {
  return <div {...others}>{children}</div>
}

export default Object.assign(ChatChoice, {
  Button: ChatChoiceButton
})
