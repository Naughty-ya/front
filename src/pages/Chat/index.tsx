import { useRef, useState, useMemo, useEffect, Fragment } from 'react'
import questions from 'src/assets/data/chat.json'
import {
  ChatMessage,
  ChatInput,
  ChatChoice,
  ChatSubmitButton,
  ChatLoading,
  ChatHeader
} from 'src/components/Chat'
import profile from 'src/assets/img/profile.png'

import { FetchClient } from 'src/api'
import { useQuery } from 'src/hooks/use-query'
import { useNavigate } from 'react-router-dom'
import bg from 'src/assets/img/chat-bg.webp'
import { Icon } from 'src/components/core/Icon'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-toastify'

import { BooleanCase } from 'src/components/common/BooleanCase'
import { useBoolean, useInterval, useScrollTo } from 'src/hooks'

type TMessageListItem = {
  question: string
  answer: string
}

const MAX_QNA_LENGTH = 5
const NEXT_INDEX = 1
const TOTAL = 10

export default function Chat() {
  const navigate = useNavigate()
  const nickname = useQuery().get('nickname')

  const index = useRef(1)
  const { scrollRef, scrollIntoView } = useScrollTo<HTMLDivElement>()

  const [focus, setFocus, setBlur] = useBoolean(false)
  const [isLoading, setLoadingTrue, setLoadingFalse] = useBoolean(false)
  const [selectType, , , selectTypeToggle] = useBoolean(true)

  const [userAnswer, setUserAnswer] = useState('')
  const [qnaList, setQnaList] = useState([questions[0].question])
  const [timestamp, setTimestamp] = useState(0)

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  const isDefaultChatFinished = useMemo(() => timestamp === 6, [timestamp])
  const isDone = useMemo(() => qnaList.length === TOTAL, [qnaList])

  const handleUserAnswerSubmit = (userAnswer: string) => {
    const nextQuestion = questions[index.current].question

    setQnaList(prev => {
      const newList = [...prev, userAnswer]

      if (index.current !== MAX_QNA_LENGTH) {
        newList.push(nextQuestion)
      }

      return newList
    })

    setUserAnswer('')
    index.current += 1
  }

  const resultData = useMemo(() => {
    const list: TMessageListItem[] = []

    for (let i = 0; i < qnaList.length; i += 2) {
      const obj = {
        question: qnaList[i],
        answer: qnaList[i + 1]
      }
      list.push(obj)
    }
    list.pop()
    return list
  }, [qnaList])

  const handleChatResultSubmit = async (resultData: TMessageListItem[]) => {
    setLoadingTrue()
    try {
      const data = await new FetchClient().post(
        `${import.meta.env.VITE_BASE_URL}/api/openai`,
        {
          list: resultData
        }
      )
      navigate('/result', { state: data })
    } catch (e) {
      toast('알 수 없는 에러가 발생했습니다.')
    } finally {
      setLoadingFalse()
    }
  }

  const backAnswerHandler = () => {
    setQnaList([...qnaList].slice(0, qnaList.length - 2))
    index.current -= 1
  }

  useInterval({
    callback: () => {
      setTimestamp(pre => pre + 1)
    },
    delay: 500,
    condition: timestamp < 6
  })

  useEffect(() => {
    scrollIntoView()
  }, [qnaList])

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
          <div id="chat-message-default-system" className="flex flex-col">
            {timestamp > 1 && (
              <>
                <ChatMessage.Profile
                  src={profile}
                  nickname="지피T"
                  className="gap-2 mb-2 font-semibold"
                />
                <ChatMessage.Bubble type="system">
                  안녕 {nickname}.
                </ChatMessage.Bubble>
              </>
            )}
            {timestamp > 2 && (
              <ChatMessage.Bubble type="system">
                지금부터 내가 5가지 질문을 할 거야
              </ChatMessage.Bubble>
            )}
            {timestamp > 3 && (
              <ChatMessage.Bubble type="system">
                솔직하게 대답해줘
              </ChatMessage.Bubble>
            )}
          </div>
          <div
            id="chat-message-default-user"
            className="flex flex-col items-end"
          >
            {timestamp > 4 && (
              <ChatMessage.Bubble type="user">응</ChatMessage.Bubble>
            )}
          </div>
        </ChatMessage>
        <ChatMessage>
          <div className="flex flex-col">
            {qnaList.map((q, idx) => {
              if (MAX_QNA_LENGTH < index.current && idx === TOTAL) return null
              if (!isDefaultChatFinished) return null
              return (
                <Fragment key={idx}>
                  {idx % 2 === 0 ? (
                    <ChatMessage.Profile
                      src={profile}
                      nickname="지피T"
                      className="gap-2 mb-2 font-semibold"
                    />
                  ) : null}
                  <ChatMessage.Bubble
                    key={idx}
                    type={idx % 2 === 0 ? 'system' : 'user'}
                  >
                    {q}
                  </ChatMessage.Bubble>
                  {qnaList.length - 1 === idx && qnaList.length !== 1 && (
                    <ChatMessage.UndoButton
                      onClick={backAnswerHandler}
                      className="flex items-center justify-center gap-2 pt-3 text-sm text-white"
                    />
                  )}
                </Fragment>
              )
            })}
          </div>
        </ChatMessage>
        <div ref={scrollRef} />
      </div>

      <div className="relative w-full py-10 pt-4">
        {isDone ? (
          <ChatSubmitButton
            onClick={() => {
              handleChatResultSubmit(resultData)
            }}
            className="w-full h-[52px] py-2 text-lg font-semibold text-white rounded bg-gra drop-shadow-1"
          />
        ) : (
          <form
            onClick={e => {
              e.preventDefault()
            }}
            id="chat-form"
            className="relative"
          >
            {focus && (
              <ChatChoice>
                {questions.map((q, idx) => {
                  if (
                    MAX_QNA_LENGTH < index.current &&
                    idx === MAX_QNA_LENGTH
                  ) {
                    return null
                  }

                  if (
                    Math.round(qnaList.length / 2) !== idx + NEXT_INDEX ||
                    !isDefaultChatFinished
                  ) {
                    return null
                  }

                  return (
                    <div className="flex max-w-[500px] scrollbar-hide overflow-x-auto gap-3 mb-3.5 px-5">
                      {selectType ? (
                        <>
                          <ChatChoice.Button
                            text={q.answerF}
                            onClick={() => handleUserAnswerSubmit(q.answerF)}
                          />
                          <ChatChoice.Button
                            text={q.answerT}
                            onClick={() => handleUserAnswerSubmit(q.answerT)}
                          />
                        </>
                      ) : (
                        <>
                          <ChatChoice.Button
                            text={q.answerT}
                            onClick={() => handleUserAnswerSubmit(q.answerT)}
                          />
                          <ChatChoice.Button
                            text={q.answerF}
                            onClick={() => handleUserAnswerSubmit(q.answerF)}
                          />
                        </>
                      )}
                    </div>
                  )
                })}

                <div className="absolute top-0 right-0 w-8 h-14 bg-gradient-to-l from-black to-transparent"></div>
                <div className="absolute top-0 left-0 w-8 h-14 bg-gradient-to-r from-black to-transparent"></div>
              </ChatChoice>
            )}

            <div className="flex mx-5 h-[52px]">
              <ChatInput
                className="text-white bg-gray-600 rounded-[4px] py-2 px-3.5 w-full mr-2 border-gray-600 border-2 focus:outline-none  focus:border-brand-blue box-border "
                value={userAnswer}
                maxLength={50}
                onChange={handleUserAnswerChange}
                placeholder="이럴 때 나는? (50자 이내)"
                onFocus={setFocus}
              />
              <button
                className="flex items-center justify-center w-14 shrink-0 bg-brand-blue rounded-[4px] disabled:bg-gray-400"
                onClick={() => handleUserAnswerSubmit(userAnswer)}
                disabled={!isDefaultChatFinished || !userAnswer}
              >
                <Icon name="send" fill="none" stroke="white" />
              </button>
            </div>
          </form>
        )}
      </div>

      <BooleanCase
        value={isLoading}
        trueCase={
          <ChatLoading>
            <p className="text-2xl font-dunggeunmo">잠시 기다려줘 {nickname}</p>
          </ChatLoading>
        }
        falseCase={null}
      />

      {focus && !isMobile && isDefaultChatFinished && qnaList.length < 10 && (
        <div
          onClick={e => {
            e.stopPropagation()
            selectTypeToggle()
          }}
          className="animate-bounce"
          style={{
            position: 'absolute',
            cursor: 'pointer',
            left: '20px',
            bottom: '160px'
          }}
        >
          스위치
        </div>
      )}
    </div>
  )
}
