import React from 'react'

interface ChatInputInterFace {
  answerValue: string
  answerValueHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatInput = ({ answerValue, answerValueHandler }: ChatInputInterFace) => {
  return (
    <>
      <input
        placeholder="직접 작성하기"
        value={answerValue}
        onChange={e => {
          answerValueHandler(e)
        }}
      />
    </>
  )
}

export default ChatInput
