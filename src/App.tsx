import { Route, Routes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Result from 'src/pages/Result'
import { ErrorBoundary } from 'react-error-boundary'
import errorImg from 'src/assets/img/error.png'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}
function Fallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <img src={errorImg} alt="고장난 로봇" />
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Router />
    </ErrorBoundary>
  )
}

export default App
