import type { Message } from 'src/types/message'

export const generateDefaultChatMessages = (nickname: string): Message[] => {
  return [
    {
      id: 1,
      role: 'system',
      content: `안녕 ${nickname}.`,
      type: 'system'
    },
    {
      id: 2,
      role: 'system',
      content: '지금부터 내가 5가지 질문을 할 거야',
      type: 'system'
    },
    {
      id: 3,
      role: 'system',
      content: '솔직하게 대답해줘',
      type: 'system'
    },
    {
      id: 4,
      role: 'user',
      content: '응',
      type: 'system'
    }
  ]
}
