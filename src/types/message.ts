export type Message = {
  id: number
  role: 'system' | 'user'
  content: string
  type: 'question' | 'answer' | 'system'
}

export type QnAMessageSet = {
  question: string
  answer: string
}
