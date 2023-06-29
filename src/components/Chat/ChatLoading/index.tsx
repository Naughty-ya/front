import { ReactNode, HTMLAttributes } from 'react'
import { Icon } from 'src/components/core/Icon'
interface IChatLoading extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export default function ChatLoading({ children, ...others }: IChatLoading) {
  if (!children) return null

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black pointer-events-none opacity-80"
      {...others}
    >
      <Icon name="spinner" className="animate-spin" stroke="none" />
      {children}
    </div>
  )
}
