import { ReactNode, HTMLAttributes } from 'react'
interface IChatLoading extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export default function ChatLoading({ children, ...others }: IChatLoading) {
  if (!children) return null

  return <div {...others}>{children}</div>
}
