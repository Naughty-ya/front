import { Route, Routes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Result from 'src/pages/Result'
import './App.css'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/chat" element={<Chat />} /> */}
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

function App() {
  return <Router />
}

export default App
