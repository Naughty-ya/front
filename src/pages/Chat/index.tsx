import React, { ChangeEvent, useRef, useState, useMemo } from 'react'
import questions from '../../assets/data/chat.json'
import {
  ChatMessage,
  ChatHeader,
  ChatInput,
  ChatChoice,
  ChatSubmitButton,
  ChatLoading
} from 'src/components/Chat'
import reactIcon from 'src/assets/react.svg'
import send from 'src/assets/icons/send.svg'
import spinnerIcon from 'src/assets/icons/spinner.svg'
import { FetchClient } from 'src/api'

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

  const resultData = useMemo(() => {
    const list: TMessageListItem[] = []

    for (let i = 0; i < qnaList.length; i += NEXT_INDEX) {
      const obj = {
        question: qnaList[i],
        answer: qnaList[i + NEXT_INDEX]
      }
      list.push(obj)
    }
    list.pop()
    return list
  }, [qnaList])

  const handleSubmitChatResult = (resultData: TMessageListItem[]) => {
    //대충 api 요청
    new FetchClient().post('http://localhost:3000/openai', { list: resultData })
  }
  const backAnswerHandler = () => {
    const copy = [...qnaList]
    copy.splice(copy.length - 2)
    setQnaList(copy)
    // setQnaList([...qnaList].splice(qnaList.length - 2))
    index.current -= 1
  }

  return (
    <div id="chat-wrapper">
      <ChatHeader className="flex items-center py-6 bg-black">
        <ChatHeader.BackButton onClick={() => {}} />
        <ChatHeader.Title className="flex-1 mx-auto text-xl font-bold">
          너 T야?
        </ChatHeader.Title>
      </ChatHeader>

      <div
        id="chat-message-wrapper"
        className="p-5 text-black bg-black h-[calc(100vh-216px)] overflow-y-scroll"
      >
        <ChatMessage>
          <div id="chat-message-default-system" className="flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              <ChatMessage.Avatar src={reactIcon} />
              <ChatMessage.SenderName />
            </div>
            <ChatMessage.Bubble type="system">안녕 쿠키</ChatMessage.Bubble>
            <ChatMessage.Bubble type="system">
              지금부터 내가 5가지 질문을 할 거야
            </ChatMessage.Bubble>
            <ChatMessage.Bubble type="system">
              솔직하게 대답해줘
            </ChatMessage.Bubble>
          </div>
          <div
            id="chat-message-default-user"
            className="flex flex-col items-end"
          >
            <ChatMessage.Bubble type="user">응</ChatMessage.Bubble>
          </div>
        </ChatMessage>
        <ChatMessage>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-3">
              <ChatMessage.Avatar src={reactIcon} />
              <ChatMessage.SenderName />
            </div>

            {qnaList.map((q, idx) => {
              if (MAX_QNA_LENGTH < index.current && idx === TOTAL) return null
              return (
                <React.Fragment key={idx}>
                  <ChatMessage.Bubble
                    key={idx}
                    type={idx % 2 === 0 ? 'system' : 'user'}
                  >
                    {q}
                  </ChatMessage.Bubble>
                  {qnaList.length - 1 === idx && qnaList.length !== 1 && (
                    <ChatMessage.UndoButton
                      onClick={backAnswerHandler}
                      className="text-amber-600"
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </ChatMessage>
      </div>
      {qnaList.length >= 10 ? (
        <ChatSubmitButton
          onClick={() => {
            handleSubmitChatResult(resultData)
          }}
        />
      ) : (
        <form
          onClick={e => {
            e.preventDefault()
          }}
          id="chat-form"
          className="mt-10"
        >
          <ChatChoice className="flex gap-3 mb-3.5 w-screen overflow-x-scroll">
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
                      />
                      <ChatChoice.Button
                        text={q.answerT}
                        onClick={handleSubmitUserAnswer(q.answerT)}
                      />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </ChatChoice>
          <div className="flex">
            <ChatInput
              className="text-red-800 rounded py-2 px-3.5 w-full mr-2"
              value={userAnswer}
              maxLength={50}
              onChange={handleChangeUserAnswer}
              placeholder="이럴때 나는?"
            />
            <button
              className="p-2 bg-blue-500 rounded"
              onClick={handleSubmitUserAnswer(userAnswer)}
              disabled={!userAnswer}
            >
              <img src={send} alt="전송" />
            </button>
          </div>
        </form>
      )}
      {false && (
        <ChatLoading className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-blue-100 pointer-evente-none opacity-80">
          <img src={spinnerIcon} alt="로딩 중" className="animate-spin" />
          <p>잠시 기다려줘 쿠키</p>
        </ChatLoading>
      )}
    </div>
  )
}
