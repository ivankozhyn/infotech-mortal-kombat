import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { routes } from '../router/routes'
import { buttonEnter } from '../config/config'

export const useFriendshipWin = () => {
  const history = useHistory()

  const historyToRoot = useCallback(() => {
    history.push(routes.ROOT)
  }, [history])

  const handleKeyDown = useCallback(
    e => {
      if (e.key === buttonEnter) {
        historyToRoot()
      }
    },
    [historyToRoot],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return historyToRoot
}
