import React from 'react'

const BackButton = () => {
  return <button>빽</button>
}

const ChatHeader = () => {
  return (
    <div className="">
      <BackButton />
      <div>너 얼마나 T야?</div>
    </div>
  )
}

export default ChatHeader
