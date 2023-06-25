import React, { ChangeEvent, useRef, useState } from 'react'
import questions from '../../assets/data/chat.json'
import {
  ChatMessage,
  ChatHeader,
  ChatInput,
  ChatChoice,
  ChatSubmitButton
} from 'src/components/Chat'
import reactIcon from 'src/assets/react.svg'

type TMessageListItem = {
  question: string
  answer: string
}

const MAX_QNA_LENGTH = 5
const NEXT_INDEX = 1
const TOTAL = 10

export default function Chat() {
  const [userAnswer, setUserAnswer] = useState('')

  const [qnaList, setQnaList] = useState([questions[0].question])

  const handleChangeUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }
  const index = useRef(1)

  const handleSubmitUserAnswer = (userAnswer: string) => () => {
    if (MAX_QNA_LENGTH < index.current) {
      return
    }
    setQnaList([...qnaList, userAnswer, questions[index.current].question])
    setUserAnswer('')
    index.current += 1
    return
  }

  const handleSubmitChatResult = () => {
    const list: TMessageListItem[] = []

    for (let i = NEXT_INDEX; i < qnaList.length; i += NEXT_INDEX) {
      const obj = {
        question: qnaList[i],
        answer: qnaList[i + NEXT_INDEX]
      }
      list.push(obj)
    }
    list.pop()
  }

  return (
    <div id="chat-wrapper">
      <ChatHeader className="flex items-center py-6 mb-10 bg-black">
        <ChatHeader.BackButton onClick={() => {}} />
        <ChatHeader.Title className="flex-1 mx-auto text-xl font-bold">
          너 T야?
        </ChatHeader.Title>
      </ChatHeader>

      <div id="chat-message-wrapper" className="p-10 text-black bg-pink-100">
        <ChatMessage>
          <ChatMessage.Avatar src={reactIcon} />
          <div id="chat-message-default-system">
            <ChatMessage.SenderName />
            <ChatMessage.Bubble type="system">안녕 쿠키</ChatMessage.Bubble>
            <ChatMessage.Bubble type="system">
              지금부터 내가 5가지 질문을 할 거야
            </ChatMessage.Bubble>
            <ChatMessage.Bubble type="system">
              솔직하게 대답해줘
            </ChatMessage.Bubble>
          </div>
          <div id="chat-message-default-user">
            <ChatMessage.Bubble type="user">응</ChatMessage.Bubble>
          </div>
        </ChatMessage>
        <ChatMessage>
          <ChatMessage.Avatar src={reactIcon} />
          <div>
            <ChatMessage.SenderName />

            {qnaList.map((q, idx) => {
              if (MAX_QNA_LENGTH < index.current && idx === TOTAL) return null
              return (
                <>
                  <ChatMessage.Bubble
                    key={idx}
                    type={idx % 2 === 0 ? 'system' : 'user'}
                  >
                    {q}
                  </ChatMessage.Bubble>
                  {idx % 2 !== 0 ? <ChatMessage.UndoButton /> : null}
                </>
              )
            })}
          </div>
        </ChatMessage>
      </div>
      {qnaList.length >= 10 ? (
        <ChatSubmitButton onClick={handleSubmitChatResult} />
      ) : (
        <form
          onClick={e => {
            e.preventDefault()
          }}
          id="chat-form"
          className="mt-10"
        >
          <ChatChoice className="flex gap-3">
            {questions.map((q, idx) => {
              if (MAX_QNA_LENGTH < index.current && idx === MAX_QNA_LENGTH)
                return null

              return (
                <React.Fragment key={idx}>
                  {Math.round(qnaList.length / 2) === idx + NEXT_INDEX && (
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
          <ChatInput
            className="text-red-800"
            value={userAnswer}
            maxLength={50}
            onChange={handleChangeUserAnswer}
            placeholder="이럴때 나는?"
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
