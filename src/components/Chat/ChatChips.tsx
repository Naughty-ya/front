import { ChatChoice } from 'src/components/Chat'

interface ChatChipsProps {
  answerF: string
  answerT: string
  handleUserAnswerSubmit: (userAnswer: string) => void
  show: boolean
}

export function ChatChips({
  answerF,
  answerT,
  handleUserAnswerSubmit,
  show
}: ChatChipsProps) {
  return (
    <>
      {show && (
        <ChatChoice>
          <div className="flex max-w-[500px] scrollbar-hide overflow-x-auto gap-3 mb-3.5 px-5">
            <ChatChoice.Button
              text={answerF}
              onClick={() => handleUserAnswerSubmit(answerF)}
            />
            <ChatChoice.Button
              text={answerT}
              onClick={() => handleUserAnswerSubmit(answerT)}
            />
          </div>
          <div className="absolute top-0 right-0 w-6 h-14 bg-gradient-to-l from-black to-transparent"></div>
          <div className="absolute top-0 left-0 w-6 h-14 bg-gradient-to-r from-black to-transparent"></div>
        </ChatChoice>
      )}
    </>
  )
}
