import React, { useEffect, useState } from 'react'
import questions from '../../assets/data/chat.json'
import { ChatMessage, ChatHeader, ChatInput } from 'src/components/Chat'
import reactIcon from 'src/assets/react.svg'
export default function Chat() {
  const [answerValue, setAnserValue] = useState('')
  const [message, setMessage] = useState([
    { question: questions[0].question, answer: '' }
  ])
  const answerValueHandler = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnserValue(e.target.value)
  }
  const [num, setNum] = useState(0)

  const handleOnClickAnswer = (answerValue: string) => {
    let copy = [...message]
    copy[num].answer = answerValue
    copy.push({ question: questions[num + 1].question, answer: '' })
    setMessage(copy)
    setAnserValue('')
    setNum(prev => prev + 1)
  }

  useEffect(() => {
    if (message[4]?.answer !== '' && message[4]?.answer) {
      //서버로 보내는 로직
      console.log('m', message)
      return alert('성공했습니다.')
    }
  }, [message])
  // console.log('m', message)
  // console.log('num', num)
  return (
    <div>
      <ChatHeader className="flex items-center bg-green-500">
        <ChatHeader.BackButton onClick={() => {}} />
        <ChatHeader.Title className="flex-1 mx-auto">너 T야?</ChatHeader.Title>
      </ChatHeader>

      <div id="chat-1">
        <ChatMessage.Avatar src={reactIcon} />

        <div>
          <ChatMessage.SenderName />
          <ChatMessage.SenderName />
          {message.map((q: { question: any; answer: any }, idx: any) => (
            <React.Fragment key={idx}>
              <ChatMessage.Bubble variants="gray">
                {q.question}
              </ChatMessage.Bubble>
              {q.answer !== '' && (
                <ChatMessage.Bubble variants="gray">
                  {q.answer}
                </ChatMessage.Bubble>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <div>
          {message.map((q, idx) => (
            <React.Fragment key={idx}>
              {num === idx ? (
                <ChatMessage.Bubble variants="gray" className="flex gap-3">
                  <span
                    className="border border-red-200"
                    onClick={e => {
                      handleOnClickAnswer(questions[num].answerF)
                    }}
                  >
                    {questions[num].answerF}
                  </span>
                  <span
                    className="border border-red-200"
                    onClick={e => {
                      handleOnClickAnswer(questions[num].answerT)
                    }}
                  >
                    {questions[num].answerT}
                  </span>
                </ChatMessage.Bubble>
              ) : null}
            </React.Fragment>
          ))}
          <form>
            <ChatInput
              answerValue={answerValue}
              answerValueHandler={answerValueHandler}
              className="text-red-800"
            />
            <button
              className="p-5 text-black bg-yellow-100"
              disabled={answerValue === ''}
              onClick={e => {
                e.preventDefault()
                handleOnClickAnswer(answerValue)
              }}
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
