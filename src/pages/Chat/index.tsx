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
import { useQuery } from 'src/hooks/use-query'
import { useNavigate } from 'react-router-dom'

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
  const [isLoading, setLsLoading] = useState(false)
  const nickname = useQuery().get('nickname')
  const navigate = useNavigate()

  // navigate('/', { list: '리스트' })

  /*  <Link to="new-path" state={{ some: "value" }} /> */

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

  /* 
  1. 최종 버튼을 누르면 api 함수를 실행한다.
  2. 로딩 UI가 표시된다. 2초동안.
  3. response값을 가지고 result 페이지로 라우팅한다.
*/

  const handleSubmitChatResult = async (resultData: TMessageListItem[]) => {
    try {
      const data = await new FetchClient().post(
        'http://localhost:3000/openai',
        {
          list: resultData
        }
      )
      navigate('/result', data)
      setLsLoading(false)
    } catch (e) {
      setLsLoading(false)
      throw Error('fetch failed')
    } finally {
      navigate('/result')
    }
  }

  const backAnswerHandler = () => {
    setQnaList([...qnaList].slice(0, qnaList.length - 2))
    index.current -= 1
  }

  return (
    <div id="chat-wrapper px-2 relative">
      <ChatHeader className="fixed w-full py-4 bg-black max-w-[500px]">
        <ChatHeader.BackButton
          className="absolute left-6"
          onClick={() => {
            navigate('/')
          }}
        />
        <ChatHeader.Title className="text-xl font-bold text-center ">
          너 T야?
        </ChatHeader.Title>
      </ChatHeader>

      <div
        id="chat-message-wrapper"
        className="p-5 text-black h-[calc(100vh-120px)] overflow-auto max-w-[500px] pt-20"
      >
        <ChatMessage>
          <div id="chat-message-default-system" className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <ChatMessage.Avatar src={reactIcon} />
              <ChatMessage.SenderName />
            </div>
            <ChatMessage.Bubble type="system">
              안녕 {nickname}
            </ChatMessage.Bubble>
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
            <div className="flex items-center gap-2 mb-3">
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
                      className="text-white"
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </ChatMessage>
      </div>
      {qnaList.length >= 10 ? (
        <div className="mx-5">
          <ChatSubmitButton
            onClick={() => {
              handleSubmitChatResult(resultData)
            }}
            className="w-full px-8 py-2 my-5 text-lg font-semibold text-white rounded bg-gra drop-shadow-1"
          />
          {/*  */}
          {/* */}
        </div>
      ) : (
        <form
          onClick={e => {
            e.preventDefault()
          }}
          id="chat-form"
        >
          <ChatChoice className="flex gap-3 mb-3.5 w-screen overflow-auto max-w-[500px] px-5">
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
          <div className="flex max-w-[500px] px-5">
            <ChatInput
              className="text-white rounded py-2 px-3.5 w-full mr-2"
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
      {isLoading && (
        <ChatLoading className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-blue-100 pointer-evente-none opacity-80">
          <img src={spinnerIcon} alt="로딩 중" className="animate-spin" />
          <p>잠시 기다려줘 쿠키</p>
        </ChatLoading>
      )}
    </div>
  )
}
