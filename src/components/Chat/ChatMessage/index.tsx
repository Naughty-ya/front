/* eslint-disable */

import { useState, HTMLAttributes, ReactNode } from 'react'

interface IAvatar extends HTMLAttributes<HTMLImageElement> {
  src?: string
}

function Avatar({ src, ...others }: IAvatar) {
  return (
    <div>
      <img src={src} alt="대충 지피티사진" {...others} />
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
  variants?: 'gray' | 'blue'
  children: ReactNode
}

interface ISenderName extends HTMLAttributes<HTMLDivElement> {
  nickname?: string
}

function SenderName({ nickname }: ISenderName) {
  return <div>{nickname || '지피티'}</div>
}

function Bubble({ variants, children, ...others }: IBubble) {
  return (
    <div className={`px-4 py-2 border bg-${variants} text-center`} {...others}>
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
