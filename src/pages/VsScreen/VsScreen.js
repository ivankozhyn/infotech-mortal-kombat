import { useEffect, useCallback, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Particles from 'react-particles-js'
import { useHistory } from 'react-router-dom'

import { getMyHeroName, getMyEnemyName } from '../../redux/Selectors'
import { buttons, icons, fightTimeInSeconds } from '../../config/config'
import particlesJsJsonConfig from '../../config/particlesjsConfig.json'
import { randomIcon, getRandomArena } from '../../utils/utils'
import { routes } from '../../router/routes'
import { useTimer } from '../../hooks/useTimer'

import Button from '../../components/Button/Button'
import Popups from '../../components/Popups/Popups'
import HeroesFight from '../../components/HeroesFight/HeroesFight'
import FriendshipWin from '../../components/FriendshipWin/FriendshipWin'

import s from './VsScreen.module.scss'

export default function VsScreen() {
  const history = useHistory()
  const arenaClasses = useMemo(() => [s.container], [])
  const myHeroName = useSelector(getMyHeroName)
  const myEnemyName = useSelector(getMyEnemyName)
  const seconds = useTimer(fightTimeInSeconds)
  const [iconQ, setIconQ] = useState(null)
  const [iconW, setIconW] = useState(null)
  const [iconE, setIconE] = useState(null)
  const [iconR, setIconR] = useState(null)
  const [iconT, setIconT] = useState(null)
  const [iconY, setIconY] = useState(null)
  const [countKeyDown, setCountKeyDown] = useState(0)

  useEffect(() => {
    if (!myHeroName && !myEnemyName) {
      history.push(routes.ROOT)
    }
  }, [myHeroName, myEnemyName, history])

  const handleKeyDown = useCallback(
    e => {
      const key = e.key.toLowerCase()
      if (Object.values(buttons).includes(key)) {
        switch (key) {
          case buttons.q:
            setIconQ(randomIcon(iconQ, icons))
            break
          case buttons.w:
            setIconW(randomIcon(iconW, icons))
            break
          case buttons.e:
            setIconE(randomIcon(iconE, icons))
            break
          case buttons.r:
            setIconR(randomIcon(iconR, icons))
            break
          case buttons.t:
            setIconT(randomIcon(iconT, icons))
            break
          case buttons.y:
            setIconY(randomIcon(iconY, icons))
            break
          default:
            break
        }
        setCountKeyDown(prevState => prevState + 1)
      }
    },
    [iconQ, iconW, iconE, iconR, iconT, iconY],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const arenaClass = useMemo(() => {
    return getRandomArena(arenaClasses, s).join(' ')
  }, [arenaClasses])

  const allIcons = [iconQ, iconW, iconE, iconR, iconT, iconY]

  return (
    <>
      {seconds === 0 ? (
        <FriendshipWin />
      ) : (
        <div className={arenaClass}>
          <Particles className={s.particles} params={particlesJsJsonConfig} />
          <div className={s.seconds}>{seconds}</div>
          <div className={s.buttons}>
            {Object.values(buttons).map((button, index) => {
              return (
                <Button key={button} button={button} icon={allIcons[index]} />
              )
            })}
          </div>
          <Popups countKeyDown={countKeyDown} allIcons={allIcons} />
          <HeroesFight myHeroName={myHeroName} myEnemyName={myEnemyName} />
        </div>
      )}
    </>
  )
}
