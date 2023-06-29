import { useCallback, useState } from 'react'
import type { Message, QnAMessageSet } from 'src/types/message'

export function useMessages(defaultMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(defaultMessages)

  const pushMessage = (newMessage: Message) => {
    setMessages([...messages, newMessage])
  }

  const pushAnswerMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content,
      type: 'answer'
    }
    setMessages([...messages, newMessage])
  }

  const pushQuestionMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      role: 'system',
      content,
      type: 'question'
    }
    setMessages([...messages, newMessage])
  }

  const popMessage = () => {
    const newMessages = [...messages]
    newMessages.pop()
    setMessages(newMessages)
  }

  const popMessages = (count: number) => {
    const newMessages = [...messages]
    for (let i = 0; i < count; i++) {
      newMessages.pop()
    }
    setMessages(newMessages)
  }

  const clearMessages = () => {
    setMessages([])
  }

  const pickQnAMessages = useCallback(() => {
    const qnaMessages = messages.filter(
      message => message.type === 'question' || message.type === 'answer'
    )

    return qnaMessages
  }, [defaultMessages])

  const getQnAList = useCallback(() => {
    const list: QnAMessageSet[] = []
    const messages = pickQnAMessages()

    for (let i = 0; i < messages.length; i += 2) {
      const obj = {
        question: messages[i].content,
        answer: messages[i + 1].content
      }
      list.push(obj)
    }

    return list
  }, [pickQnAMessages])

  return {
    messages,
    pushMessage,
    pushAnswerMessage,
    pushQuestionMessage,
    popMessage,
    popMessages,
    clearMessages,
    getQnAList
  }
}
