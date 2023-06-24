import React, { HTMLAttributes } from 'react'

interface ChatInputInterFace extends HTMLAttributes<HTMLInputElement> {
  answerValue: string
  answerValueHandler: () => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatInput = ({
  answerValue,
  answerValueHandler,
  ...others
}: ChatInputInterFace) => {
  return (
    <>
      <input
        placeholder="직접 작성하기"
        value={answerValue}
        onChange={answerValueHandler()}
        {...others}
      />
    </>
  )
}

export default ChatInput
