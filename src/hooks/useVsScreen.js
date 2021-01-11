import { useEffect, useCallback, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getMyHeroName, getMyEnemyName } from '../redux/selectors'
import { buttons, buttonsCyrillic, icons } from '../config/config'
import { randomIcon, getRandomArena, showPopups } from '../utils/utils'
import { routes } from '../router/routes'

export const useVsScreen = vsScreenScss => {
  const history = useHistory()
  const arenaClasses = useMemo(() => [vsScreenScss.container], [
    vsScreenScss.container,
  ])
  const myHeroName = useSelector(getMyHeroName)
  const myEnemyName = useSelector(getMyEnemyName)
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
      const isKeyQWERTY = [
        ...Object.values(buttons),
        ...Object.values(buttonsCyrillic),
      ].includes(key)

      if (isKeyQWERTY) {
        let qwertyButtons
        if (Object.values(buttons).includes(key)) {
          qwertyButtons = buttons
        } else if (Object.values(buttonsCyrillic).includes(key)) {
          qwertyButtons = buttonsCyrillic
        }
        switch (key) {
          case qwertyButtons.q:
            setIconQ(randomIcon(iconQ, icons))
            break
          case qwertyButtons.w:
            setIconW(randomIcon(iconW, icons))
            break
          case qwertyButtons.e:
            setIconE(randomIcon(iconE, icons))
            break
          case qwertyButtons.r:
            setIconR(randomIcon(iconR, icons))
            break
          case qwertyButtons.t:
            setIconT(randomIcon(iconT, icons))
            break
          case qwertyButtons.y:
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
    return getRandomArena(arenaClasses, vsScreenScss).join(' ')
  }, [arenaClasses, vsScreenScss])

  const allIcons = [iconQ, iconW, iconE, iconR, iconT, iconY]
  const showPopupsInFight = showPopups(countKeyDown, allIcons)

  return { arenaClass, allIcons, showPopupsInFight, myHeroName, myEnemyName }
}
