import { useEffect, useRef } from 'react'

interface UseIntervalParams {
  callback: () => void
  delay: number | null
  condition?: boolean
}

export function useInterval({ callback, delay, condition }: UseIntervalParams) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)

      if (!condition) {
        clearInterval(id)
      }

      return () => clearInterval(id)
    }

    return () => {}
  }, [delay, condition])
}
