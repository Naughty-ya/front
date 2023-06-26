import React, { ChangeEvent, useRef, useState, useMemo, useEffect } from 'react'
import questions from '../../assets/data/chat.json'
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

type TMessageListItem = {
  question: string
  answer: string
}

const MAX_QNA_LENGTH = 5
const NEXT_INDEX = 1
const TOTAL = 10
const CHAT_DELAY = 500

export default function Chat() {
  const [userAnswer, setUserAnswer] = useState('')
  const [qnaList, setQnaList] = useState([questions[0].question])
  const [isLoading, setLsLoading] = useState(false)
  const [selectType, setSelectType] = useState(true)
  const nickname = useQuery().get('nickname')
  const navigate = useNavigate()

  if (!nickname || nickname === 'null') {
    navigate('/')
  }

  const [timestamp, setTimestamp] = useState(0)
  const isDefaultChatFinished = useMemo(() => timestamp === 6, [timestamp])

  useEffect(() => {
    let time = setInterval(() => {
      setTimestamp(pre => pre + 1)
    }, CHAT_DELAY)

    if (timestamp === 6) clearInterval(time)

    return () => clearInterval(time)
  }, [timestamp])

  // navigate('/', { list: '리스트' })

  /*  <Link to="new-path" state={{ some: "value" }} /> */
  const handleChangeUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }
  const index = useRef(1)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [qnaList])

  const handleSubmitUserAnswer = (userAnswer: string) => () => {
    const nextQuestion = questions[index.current].question

    if (index.current <= MAX_QNA_LENGTH) {
      setQnaList((prev: any) => [
        ...prev,
        userAnswer,
        index.current != MAX_QNA_LENGTH + 1 && nextQuestion
      ])
      setUserAnswer('')
      index.current += 1
    } else return
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

  /* 
  1. 최종 버튼을 누르면 api 함수를 실행한다.
  2. 로딩 UI가 표시된다. 2초동안.
  3. response값을 가지고 result 페이지로 라우팅한다.
*/

  const handleSubmitChatResult = async (resultData: TMessageListItem[]) => {
    setLsLoading(true)
    try {
      const data = await new FetchClient().post(
        `${import.meta.env.VITE_BASE_URL}/api/openai`,
        {
          list: resultData
        }
      )
      navigate('/result', { state: data })
      setLsLoading(false)
    } catch (e) {
      setLsLoading(false)
      navigate(`/chat?nickname=${nickname}`)
      throw Error('fetch failed')
    }
  }

  const backAnswerHandler = () => {
    setQnaList([...qnaList].slice(0, qnaList.length - 2))
    index.current -= 1
  }

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
        className="flex-1 p-5 py-10 overflow-auto text-gray-800 scrollbar-hide"
      >
        <ChatMessage>
          <div id="chat-message-default-system" className="flex flex-col">
            {timestamp > 1 && (
              <ChatMessage.Profile
                src={profile}
                nickname="지피T"
                className="gap-2 mb-2 font-semibold"
              />
            )}
            {timestamp > 1 && (
              <ChatMessage.Bubble type="system">
                안녕 {nickname}.
              </ChatMessage.Bubble>
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
                <React.Fragment key={idx}>
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
                </React.Fragment>
              )
            })}
          </div>
        </ChatMessage>
        <div ref={chatBoxRef} />
      </div>

      <div className="relative w-full py-10 pt-4">
        {qnaList.length >= 10 ? (
          <div className="px-5">
            <ChatSubmitButton
              onClick={() => {
                handleSubmitChatResult(resultData)
              }}
              className="w-full h-[52px] py-2 text-lg font-semibold text-white rounded bg-gra drop-shadow-1"
            />
          </div>
        ) : (
          <form
            onClick={e => {
              e.preventDefault()
            }}
            id="chat-form"
            className="relative"
          >
            <ChatChoice className="flex max-w-[500px] overflow-auto scrollbar-hide gap-3 mb-3.5 px-5 relative">
              {questions.map((q, idx) => {
                if (MAX_QNA_LENGTH < index.current && idx === MAX_QNA_LENGTH)
                  return null

                return (
                  <React.Fragment key={idx}>
                    {/* {index.current < MAX_QNA_LENGTH + 1 &&
                      } */}
                    {Math.round(qnaList.length / 2) === idx + NEXT_INDEX &&
                      isDefaultChatFinished && (
                        <>
                          {selectType ? (
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
                          ) : (
                            <>
                              <ChatChoice.Button
                                text={q.answerT}
                                onClick={handleSubmitUserAnswer(q.answerT)}
                              />
                              <ChatChoice.Button
                                text={q.answerF}
                                onClick={handleSubmitUserAnswer(q.answerF)}
                              />
                            </>
                          )}

                          <div className="absolute top-0 right-0 w-10 h-14 bg-gradient-to-l from-black to-transparent"></div>
                          <div className="absolute top-0 left-0 w-10 h-14 bg-gradient-to-r from-black to-transparent"></div>
                        </>
                      )}
                  </React.Fragment>
                )
              })}
            </ChatChoice>
            <div className="flex mx-5 h-[52px]">
              <ChatInput
                className="text-white bg-gray-600 rounded-[4px] py-2 px-3.5 w-full mr-2 border-gray-600 border-2 focus:outline-none  focus:border-brand-blue box-border "
                value={userAnswer}
                maxLength={50}
                onChange={handleChangeUserAnswer}
                placeholder="이럴 때 나는? (50자 이내)"
              />
              <button
                className="flex items-center justify-center w-14 shrink-0 bg-brand-blue rounded-[4px] disabled:bg-gray-400"
                onClick={handleSubmitUserAnswer(userAnswer)}
                disabled={!isDefaultChatFinished || !userAnswer}
              >
                <Icon name="send" fill="none" stroke="white" />
              </button>
            </div>
          </form>
        )}
      </div>
      {isLoading && (
        <ChatLoading className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black pointer-evente-none opacity-80">
          <Icon name="spinner" className="animate-spin" />
          <p className="text-2xl font-dunggeunmo">{`잠시 기다려줘 ${nickname}`}</p>
        </ChatLoading>
      )}
      {!isMobile && isDefaultChatFinished && qnaList.length < 10 && (
        <div
          onClick={e => {
            e.stopPropagation()
            setSelectType(!selectType)
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

/**
 * 1. 객관식 버튼 draggable 하게 만들기.
 * 2. 구글 애널리틱스 추적코드 삽입하기 (선택사항)
 * 3. 넷틀리파이 배포하기
 */
