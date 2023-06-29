import { ChatInput } from 'src/components/Chat'
import { ChatChips } from 'src/components/Chat/ChatChips'
import { Icon } from 'src/components/core/Icon'
import { useBoolean } from 'src/hooks'

interface ChatFormProps {
  currentQuestion: {
    answerF: string
    answerT: string
  }
  handleUserAnswerSubmit: (userAnswer: string) => void
  handleUserAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  userAnswer: string
  isLastSystemMessage: boolean
}

export function ChatForm({
  currentQuestion,
  handleUserAnswerSubmit,
  handleUserAnswerChange,
  userAnswer,
  isLastSystemMessage
}: ChatFormProps) {
  const [focus, setFocus] = useBoolean(false)

  return (
    <form
      onClick={e => {
        e.preventDefault()
      }}
      id="chat-form"
      className="relative"
    >
      <ChatChips
        answerF={currentQuestion.answerF}
        answerT={currentQuestion.answerT}
        handleUserAnswerSubmit={handleUserAnswerSubmit}
        show={isLastSystemMessage && focus}
      />

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
          disabled={!userAnswer}
        >
          <Icon name="send" fill="none" stroke="white" />
        </button>
      </div>
    </form>
  )
}
