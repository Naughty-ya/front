import { HTMLAttributes, ReactNode } from 'react'
import { Icon } from 'src/components/core/Icon'

interface IBackButton extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}

function BackButton({ onClick, ...others }: IBackButton) {
  return (
    <button onClick={onClick} {...others}>
      <Icon name="back" />
    </button>
  )
}

interface IChatTitle extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ChatTitle({ children, ...others }: IChatTitle) {
  return <div {...others}>{children}</div>
}

interface IChatHeader extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function ChatHeader({ children, ...others }: IChatHeader) {
  return <div {...others}>{children}</div>
}

export default Object.assign(ChatHeader, {
  BackButton,
  Title: ChatTitle
})
