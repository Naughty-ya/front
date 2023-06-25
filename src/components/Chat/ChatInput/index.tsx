import React, { HTMLAttributes } from 'react'

interface ChatInputInterFace extends HTMLAttributes<HTMLInputElement> {
  value?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  answerValue?: string
  maxLength?: number
  answerValueHandler?: () => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatInput = ({
  value,
  maxLength,
  onChange,
  placeholder,
  ...others
}: ChatInputInterFace) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      {...others}
    />
  )
}

export default ChatInput
