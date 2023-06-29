import bg from 'src/assets/img/chat-bg.webp'
import profile from 'src/assets/img/profile.png'
import questions from 'src/assets/data/chat.json'

import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useBoolean, useInterval, useQuery, useScrollTo } from 'src/hooks'
import { useMessages } from 'src/hooks/use-messages'
import { FetchClient } from 'src/api'
import { generateDefaultChatMessages } from 'src/pages/Chat/chat-messages'

import { BooleanCase } from 'src/components/common/BooleanCase'
import {
  ChatMessage,
  ChatSubmitButton,
  ChatLoading,
  ChatHeader,
  ChatForm
} from 'src/components/Chat'

export default function Chat() {
  const navigate = useNavigate()
  const nickname = useQuery().get('nickname')
  const defaultMessages = generateDefaultChatMessages(nickname ?? '')

  const qnaIndex = useRef(0)
  const { scrollRef, scrollIntoView } = useScrollTo<HTMLDivElement>()

  const [isLoading, setLoadingTrue, setLoadingFalse] = useBoolean(false)
  const [userAnswer, setUserAnswer] = useState('')

  const {
    messages,
    pushMessage,
    pushAnswerMessage,
    pushQuestionMessage,
    popMessages,
    getQnAList
  } = useMessages()

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  const isDone = qnaIndex.current === questions.length
  const isLastUserMessage = messages[messages.length - 1]?.role === 'user'
  const isLastSystemMessage = messages[messages.length - 1]?.role === 'system'
  const isFirstSystemContext = (index: number) => {
    return (
      index === 0 ||
      (messages[index - 1].role === 'user' && messages[index].role === 'system')
    )
  }

  const handleUserAnswerSubmit = (userAnswer: string) => {
    pushAnswerMessage(userAnswer)
    setUserAnswer('')
    qnaIndex.current += 1
  }

  const handleAnswerCancel = () => {
    isDone ? popMessages(1) : popMessages(2)
    qnaIndex.current -= 1
  }

  const handleChatResultSubmit = async () => {
    const qnaList = getQnAList()

    try {
      setLoadingTrue()
      const data = await new FetchClient().post(
        `${import.meta.env.VITE_BASE_URL}/api/openai`,
        {
          list: qnaList
        }
      )
      navigate('/result', { state: data })
    } catch (e) {
      toast('알 수 없는 에러가 발생했습니다.')
    } finally {
      setLoadingFalse()
    }
  }

  useInterval({
    callback: () => {
      pushMessage(defaultMessages[messages.length])
    },
    delay: 500,
    condition: messages.length < defaultMessages.length
  })

  useEffect(() => {
    scrollIntoView()
  }, [messages])

  useEffect(() => {
    if (isLastUserMessage && !isDone) {
      const timeoutID = setTimeout(() => {
        pushQuestionMessage(questions[qnaIndex.current].question)
      }, 500)

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [messages])

  return (
    <div
      className="bg-cover relative bg-center max-h-[1000px] h-full w-full max-w-[500px] flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <ChatHeader className="flex top-0 w-full items-center justify-between h-16 bg-black border-b-[1px] border-gray-600 shadow-xl shadow-black z-10">
        <ChatHeader.BackButton
          className="flex flex-row justify-center w-16"
          onClick={() => {
            navigate('/')
          }}
        />
        <ChatHeader.Title className="text-xl font-bold ">
          너 얼마나 T야?
        </ChatHeader.Title>
        <div className="w-16" />
      </ChatHeader>

      <div
        id="chat-message-wrapper"
        className="flex-1 p-5 pt-10 overflow-auto text-gray-800 scrollbar-hide"
      >
        <ChatMessage>
          {messages.map((message, index) => (
            <BooleanCase
              key={message.id}
              value={message.role === 'system'}
              trueCase={
                <div id="chat-message-default-system" className="flex flex-col">
                  {isFirstSystemContext(index) ? (
                    <ChatMessage.Profile
                      src={profile}
                      nickname="지피T"
                      className="gap-2 mb-2 font-semibold"
                    />
                  ) : null}

                  <ChatMessage.Bubble key={index} type="system">
                    {message.content}
                  </ChatMessage.Bubble>
                </div>
              }
              falseCase={
                <div id="chat-message-default-user" className="flex flex-col">
                  <ChatMessage.Bubble key={index} type="user">
                    {message.content}
                  </ChatMessage.Bubble>
                </div>
              }
            />
          ))}

          {qnaIndex.current >= 1 ? (
            <ChatMessage.UndoButton
              onClick={handleAnswerCancel}
              className="flex items-center justify-center gap-2 pt-3 text-sm text-white"
            />
          ) : null}
        </ChatMessage>
        <div ref={scrollRef} />
      </div>

      <div className="relative w-full py-10 pt-4">
        <BooleanCase
          value={isDone}
          trueCase={
            <ChatSubmitButton
              className="w-full h-[52px] py-2 text-lg font-semibold text-white rounded bg-gra drop-shadow-1"
              onClick={handleChatResultSubmit}
            />
          }
          falseCase={
            <ChatForm
              currentQuestion={questions[qnaIndex.current]}
              handleUserAnswerSubmit={handleUserAnswerSubmit}
              handleUserAnswerChange={handleUserAnswerChange}
              userAnswer={userAnswer}
              isLastSystemMessage={isLastSystemMessage}
            />
          }
        />
      </div>

      {isLoading ? (
        <ChatLoading>
          <p className="text-2xl font-dunggeunmo">잠시 기다려줘 {nickname}</p>
        </ChatLoading>
      ) : null}
    </div>
  )
}
