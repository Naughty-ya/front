import React, { useState } from 'react'

import { ChatMessage, ChatHeader, ChatInput } from 'src/components/Chat'

export default function Chat() {
  const [answerValue, setAnserValue] = useState('')
  const answerValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnserValue(e.target.value)
  }
  return (
    <div>
      <ChatHeader />
      <div id="chat-1">
        <ChatMessage.Avatar src="" />
        <div>
          <ChatMessage.SenderName />
          <ChatMessage.Bubble variants="gray">
            쿠키야,, 나 어떡해? 차 사고 났어 ㅠ
          </ChatMessage.Bubble>
        </div>
      </div>
      <div>
        <div>
          <ChatInput
            answerValue={answerValue}
            answerValueHandler={answerValueHandler}
          />
        </div>
      </div>
    </div>
  )
}
