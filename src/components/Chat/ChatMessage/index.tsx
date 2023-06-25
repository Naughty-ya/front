/* eslint-disable */

import { HTMLAttributes, ReactNode } from 'react'

interface IAvatar extends HTMLAttributes<HTMLImageElement> {
  src?: string
}

function Avatar({ src, ...others }: IAvatar) {
  return (
    <div>
      <img src={src} alt="대충 지피티사진" className="w-8 h-8" {...others} />
    </div>
  )
}

interface IUndoButton extends HTMLAttributes<HTMLButtonElement> {}

function UndoButton({ ...others }: IUndoButton) {
  return (
    <button type="button" {...others}>
      대충 돌리기버튼
    </button>
  )
}

interface IBubble extends HTMLAttributes<HTMLDivElement> {
  type?: 'system' | 'user'
  children: ReactNode
}

interface ISenderName extends HTMLAttributes<HTMLDivElement> {
  nickname?: string
}

function SenderName({ nickname }: ISenderName) {
  return <div className="text-white w-fit">{nickname || '지피티'}</div>
}

function Bubble({ type, children, ...others }: IBubble) {
  return (
    <div
      className={`w-fit px-3 py-2 text-center mb-3 rounded max-w-xs text-black ${
        type === 'user' ? `bg-brand-darkpink text-white self-end` : `bg-white`
      }`}
      {...others}
    >
      {children}
    </div>
  )
}

interface IChatMessage extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
function ChatMessage({ children, ...others }: IChatMessage) {
  return <div {...others}>{children}</div>
}

export default Object.assign(ChatMessage, {
  UndoButton,
  SenderName,
  Bubble,
  Avatar
})
