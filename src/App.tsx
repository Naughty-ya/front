import { Route, Routes } from 'react-router-dom'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Result from 'src/pages/Result'
import { Layout } from 'src/components/layout/Layout'
import { ErrorBoundary } from 'react-error-boundary'

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
