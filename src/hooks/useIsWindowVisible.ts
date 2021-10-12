import { useCallback, useEffect, useState } from 'react'
import { isClient } from '../utils/f'

const VISIBILITY_STATE_SUPPORTED = () => {
  return isClient() && 'visibilityState' in document
}

function isWindowVisible() {
  return isClient() && (!VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden')
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible(): boolean {
  const [focused, setFocused] = useState<boolean>(isWindowVisible())
  const listener = useCallback(() => {
    setFocused(isWindowVisible())
  }, [setFocused])

  useEffect(() => {
    if (!VISIBILITY_STATE_SUPPORTED) return undefined

    document.addEventListener('visibilitychange', listener)
    return () => {
      document.removeEventListener('visibilitychange', listener)
    }
  }, [listener])

  return focused
}
