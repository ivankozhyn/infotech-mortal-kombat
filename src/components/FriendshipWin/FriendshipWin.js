import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Particles from 'react-particles-js'

import friendship from '../../assets/otherAnimations/frienship.gif'
import win from '../../assets/otherAnimations/win.gif'
import { routes } from '../../router/routes'
import particlesJsJsonConfig from '../../config/particlesjsConfig.json'

import s from './FriendshipWin.module.scss'

export default function FriendshipWin() {
  const history = useHistory()

  const historyToRoot = useCallback(() => {
    history.push(routes.ROOT)
  }, [history])

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
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

  return (
    <div className={s.container}>
      <Particles className={s.particles} params={particlesJsJsonConfig} />
      <img className={s.friendship} src={friendship} alt="friendship" />
      <img className={s.win} src={win} alt="win" />
      <button onClick={historyToRoot} className={s.button} type="button">
        Start new game
      </button>
    </div>
  )
}
