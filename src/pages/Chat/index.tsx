import React, { useState } from 'react'
import questions from '../../assets/data/chat.json'
import { ChatMessage, ChatHeader, ChatInput } from 'src/components/Chat'

export default function Chat() {
  const [answerValue, setAnserValue] = useState('')
  const [message, setMessage] = useState([
    { question: questions[0].question, answer: '' }
  ])
  const answerValueHandler = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnserValue(e.target.value)
  }
  const [num, setNum] = useState(0)
  const handleOnClickAnswer = () => {
    let copy = [...message]
    copy[num].answer = answerValue
    copy.push({ question: questions[num + 1].question, answer: '' })
    setMessage(copy)
    setAnserValue('')

    setNum(prev => prev + 1)
    if (message.length === 5) {
      //서버로 보내는 로직
      return alert('성공했습니다.')
    }
  }
  console.log('m', message)
  return (
    <div>
      <div className="bg-blue-500">
        <ChatHeader />
      </div>
      <div id="chat-1">
        <ChatMessage.Avatar src="" />
        <div>
          <ChatMessage.SenderName />
          <ChatMessage.SenderName />
          {message.map((q, idx) => (
            <ChatMessage.Bubble key={idx} variants="gray">
              {q.question}
            </ChatMessage.Bubble>
          ))}
          {/* {message[0].question === '' && (
            <ChatMessage.Bubble key={0} variants="gray">
              {questions[0].question}
            </ChatMessage.Bubble>
          )} */}
        </div>
      </div>
      <div>
        <div>
          {message.map((q, idx) => (
            <ChatMessage.Bubble key={idx} variants="gray">
              {q.answer}
            </ChatMessage.Bubble>
          ))}
          {message[0].answer && (
            <ChatMessage.Bubble key={0} variants="gray" className="flex gap-3">
              <span
                className="border border-red-200"
                onClick={e => {
                  setAnserValue(questions[num].answerF)
                  handleOnClickAnswer(e)
                }}
              >
                {questions[0].answerF}
              </span>
              <span className="border border-red-200">
                {questions[0].answerT}
              </span>
            </ChatMessage.Bubble>
          )}
          <form>
            <ChatInput
              answerValue={answerValue}
              answerValueHandler={answerValueHandler}
              className="text-red-800"
            />
            <button
              className="p-5 bg-yellow-100 text-black"
              disabled={answerValue === ''}
              onClick={e => {
                e.preventDefault()
                handleOnClickAnswer(e)
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
/**
 1.질문지가 나오고 답볍 키워드 들이 나왔을떄 
 2. 답변을 클릭했을떄 answer 에 들어가야함
 3. 클릭 후 다음 질문지와 답변지가 떠야함
 4. 직접입력 후 에도 질문지와 답변지가 떠야함 
 5. 위 기능이 다 되었을때 서버로 전송 후 콘솔로 결과 값 확인되면 result page 작성
 */
