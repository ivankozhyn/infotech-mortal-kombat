import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import Particles from 'react-particles-js'
import { useDispatch } from 'react-redux'

import {
  heroNames,
  heroCardWidth,
  startActiveHeroIndex,
  arrows,
} from '../../config/config'
import {
  getAllCoordinates,
  getKeyByValue,
  getNextCoordinates,
  getActiveHeroName,
} from '../../utils/utils'
import { heroAnimations } from '../../assets/heroAnimations'
import HeroCard from '../../components/HeroCard/HeroCard'
import particlesJsJsonConfig from '../../config/particlesjsConfig.json'
import { routes } from '../../router/routes'

import { myHero, myEnemy } from '../../redux/Actions'

import s from './ChooseHero.module.scss'

export default function ChooseHero() {
  const dispatch = useDispatch()
  const history = useHistory()
  const listEl = useRef(null)
  const [countHeroesInRow, setCountHeroesInRow] = useState(null)
  const [activeCardIndex, setActiveCardIndex] = useState(startActiveHeroIndex)
  const [myHeroName, setMyHeroName] = useState(null)
  const [myEnemyName, setMyEnemyName] = useState(null)
  const [myChosenHeroName, setMyChosenHeroName] = useState(null)
  const [, setMyChosenEnemyName] = useState(null)

  const allHeroNames = useMemo(() => Object.keys(heroNames), [])
  const countAllHero = allHeroNames.length

  useEffect(() => {
    setCountHeroesInRow(Math.floor(listEl.current.offsetWidth / heroCardWidth))
  }, [])

  useEffect(() => {
    setMyHeroName(() => getActiveHeroName(startActiveHeroIndex, allHeroNames))
  }, [allHeroNames])

  const countHeroesInColumn = useCallback(() => {
    if (countHeroesInRow) {
      return Math.ceil((countAllHero - 2) / countHeroesInRow)
    }
  }, [countAllHero, countHeroesInRow])

  const handleKeyDown = useCallback(
    e => {
      const allCoordinates = getAllCoordinates(
        countHeroesInRow,
        countHeroesInColumn,
        countAllHero - 2,
      )
      const allCoordinatesValues = Object.values(allCoordinates)

      if (e.key === 'Enter') {
        const activeHeroName = getActiveHeroName(activeCardIndex, allHeroNames)
        if (!myChosenHeroName) {
          setMyChosenHeroName(activeHeroName)
          setMyEnemyName(activeHeroName)
          dispatch(myHero(activeHeroName))
        } else {
          setMyChosenEnemyName(activeHeroName)
          dispatch(myEnemy(activeHeroName))
          history.push(routes.VSSCREEN)
        }
      } else if (Object.values(arrows).includes(e.key)) {
        const [x, y] = getNextCoordinates(
          allCoordinates,
          activeCardIndex,
          countHeroesInRow,
          e.key,
          countHeroesInColumn,
          allCoordinatesValues,
        )

        const index = Number(getKeyByValue(allCoordinates, { x, y }))
        setActiveCardIndex(index)

        if (myChosenHeroName) {
          setMyEnemyName(() => getActiveHeroName(index, allHeroNames))
        } else {
          setMyHeroName(() => getActiveHeroName(index, allHeroNames))
        }
      }
    },
    [
      activeCardIndex,
      countHeroesInRow,
      countHeroesInColumn,
      history,
      myChosenHeroName,
      countAllHero,
      allHeroNames,
      dispatch,
    ],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const handleResize = () => {
    setCountHeroesInRow(Math.floor(listEl.current.offsetWidth / heroCardWidth))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleHeroCardClick = index => {
    setActiveCardIndex(index)
    if (myChosenHeroName) {
      setMyEnemyName(() => getActiveHeroName(index, allHeroNames))
    } else {
      setMyHeroName(() => getActiveHeroName(index, allHeroNames))
    }
  }

  return (
    <>
      <div className={s.container}>
        <Particles className={s.particles} params={particlesJsJsonConfig} />
        <p className={s.title}>
          {myChosenHeroName ? (
            <span className={s.enemy}>Choose Your Enemy</span>
          ) : (
            'Choose Your Hero'
          )}
        </p>
        <div className={s.main}>
          <div className={s.listWrapper}>
            <div className={s.myHero}>
              <HeroCard
                key={allHeroNames[countAllHero - 1]}
                hero={allHeroNames[countAllHero - 1]}
                index={countAllHero - 1}
                active={countAllHero - 1 === activeCardIndex}
                handleHeroCardClick={handleHeroCardClick}
              />
              {myHeroName && (
                <div className={s.heroAnimation}>
                  <img
                    className={s.img}
                    src={
                      myChosenHeroName
                        ? heroAnimations[myChosenHeroName]
                        : heroAnimations[myHeroName]
                    }
                    alt={heroNames[myHeroName]}
                  />
                  <p className={s.heroName}>
                    {myChosenHeroName
                      ? heroNames[myChosenHeroName]
                      : heroNames[myHeroName]}
                  </p>
                </div>
              )}
            </div>
            <ul className={s.list} ref={listEl}>
              {allHeroNames.slice(0, -2).map((hero, index) => {
                return (
                  <HeroCard
                    key={hero}
                    hero={hero}
                    index={index}
                    active={index === activeCardIndex}
                    handleHeroCardClick={handleHeroCardClick}
                  />
                )
              })}
            </ul>
            <div className={s.myEnemy}>
              <HeroCard
                key={allHeroNames[countAllHero - 2]}
                hero={allHeroNames[countAllHero - 2]}
                index={countAllHero - 2}
                active={countAllHero - 2 === activeCardIndex}
                handleHeroCardClick={handleHeroCardClick}
              />
              {myEnemyName && (
                <div className={s.heroAnimation}>
                  <img
                    className={s.img}
                    src={heroAnimations[myEnemyName]}
                    alt={heroAnimations[myEnemyName]}
                  />
                  <p className={s.heroName}>{heroNames[myEnemyName]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}