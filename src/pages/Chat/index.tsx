import React, { ChangeEvent, useRef, useState } from 'react'
import questions from '../../assets/data/chat.json'
import {
  ChatMessage,
  ChatHeader,
  ChatInput,
  ChatChoice
} from 'src/components/Chat'
import reactIcon from 'src/assets/react.svg'

type TMessageListItem = {
  question: string
  answer: string
}

export default function Chat() {
  const [userAnswer, setUserAnswer] = useState('')

  const [qnaList, setQnaList] = useState([questions[0].question])

  const handleChangeUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }
  const index = useRef(1)

  const handleSubmitUserAnswer = (userAnswer: string) => () => {
    if (index.current === 6) {
      return
    }
    setQnaList([...qnaList, userAnswer, questions[index.current].question])
    setUserAnswer('')
    index.current += 1
    return
  }

  const handleSubmitChatResult = () => {
    const list: TMessageListItem[] = []

    for (let i = 0; i < qnaList.length; i += 2) {
      const obj = {
        question: qnaList[i],
        answer: qnaList[i + 1]
      }
      list.push(obj)
    }
    list.pop()
  }

  return (
    <div id="chat-wrapper">
      <ChatHeader className="flex items-center mb-10 bg-green-500">
        <ChatHeader.BackButton onClick={() => {}} />
        <ChatHeader.Title className="flex-1 mx-auto">너 T야?</ChatHeader.Title>
      </ChatHeader>

      <div id="chat-message-wrapper" className="p-10 text-black bg-pink-100">
        <ChatMessage>
          <ChatMessage.Avatar src={reactIcon} />
          <div>
            <ChatMessage.SenderName />
            {qnaList.map((q, idx) => {
              if (index.current === 6 && idx === 10) return null
              return (
                <ChatMessage.Bubble key={idx} variants="gray">
                  {q}
                </ChatMessage.Bubble>
              )
            })}
          </div>
        </ChatMessage>
        <ChatMessage>
          <ChatChoice className="flex gap-3">
            {questions.map((q, idx) => {
              if (index.current === 6 && idx === 5) return null

              return (
                <React.Fragment key={idx}>
                  {Math.round(qnaList.length / 2) === idx + 1 && (
                    <>
                      <ChatChoice.Button
                        text={q.answerF}
                        onClick={handleSubmitUserAnswer(q.answerF)}
                        className="text-blue-500 border border-red-200"
                      />
                      <ChatChoice.Button
                        text={q.answerT}
                        onClick={handleSubmitUserAnswer(q.answerT)}
                        className="border border-red-200"
                      />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </ChatChoice>
        </ChatMessage>
      </div>
      {qnaList.length >= 10 ? (
        <button type="button" onClick={handleSubmitChatResult}>
          최종어쩌꾸버튼
        </button>
      ) : (
        <form
          onClick={e => {
            e.preventDefault()
          }}
          id="chat-form"
          className="mt-10"
        >
          <ChatInput
            className="text-red-800"
            value={userAnswer}
            maxLength={50}
            onChange={handleChangeUserAnswer}
            placeholder="직접 작성하기"
          />
          <button
            className="p-5 text-black bg-yellow-100"
            onClick={handleSubmitUserAnswer(userAnswer)}
            disabled={!userAnswer}
          >
            전송
          </button>
        </form>
      )}
    </div>
  )
}
