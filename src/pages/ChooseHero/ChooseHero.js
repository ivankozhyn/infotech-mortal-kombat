import { useRef, useEffect, useCallback, useMemo, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  heroNames,
  heroCardWidth,
  startActiveHeroIndex,
  arrows,
  buttonEnter,
} from '../../config/config'
import {
  getAllCoordinates,
  getKeyByValue,
  getNextCoordinates,
  getActiveHeroName,
} from '../../utils/utils'
import { heroAnimations } from '../../assets/heroAnimations'
import HeroCard from '../../components/HeroCard/HeroCard'
import { routes } from '../../router/routes'
import { myHero, myEnemy } from '../../redux/actions'

import s from './ChooseHero.module.scss'

const initialChooseHeroState = {
  myHeroName: '',
  myEnemyName: '',
  myChosenHeroName: '',
  myChosenEnemyName: '',
  countHeroesInRow: null,
  activeHeroIndex: null,
}

const chooseHeroType = {
  myHeroName: 'myHeroName',
  myEnemyName: 'myEnemyName',
  myChosenHeroName: 'myChosenHeroName',
  myChosenEnemyName: 'myChosenEnemyName',
  countHeroesInRow: 'countHeroesInRow',
  activeHeroIndex: 'activeHeroIndex',
}

const chooseHeroReducer = (state, { type, payload }) => {
  switch (type) {
    case chooseHeroType.myHeroName:
      return { ...state, myHeroName: payload }
    case chooseHeroType.myEnemyName:
      return { ...state, myEnemyName: payload }
    case chooseHeroType.myChosenHeroName:
      return { ...state, myChosenHeroName: payload }
    case chooseHeroType.myChosenEnemyName:
      return { ...state, myChosenEnemyName: payload }
    case chooseHeroType.countHeroesInRow:
      return { ...state, countHeroesInRow: payload }
    case chooseHeroType.activeHeroIndex:
      return { ...state, activeHeroIndex: payload }
    default:
      return state
  }
}

export default function ChooseHero() {
  const dispatch = useDispatch()
  const history = useHistory()
  const listEl = useRef(null)
  const [chooseHeroState, chooseHeroDispatch] = useReducer(
    chooseHeroReducer,
    initialChooseHeroState,
  )

  const allHeroNames = useMemo(() => Object.keys(heroNames), [])
  const countAllHero = allHeroNames.length
  const {
    myHeroName,
    myEnemyName,
    myChosenHeroName,
    countHeroesInRow,
    activeHeroIndex,
  } = chooseHeroState

  useEffect(() => {
    chooseHeroDispatch({
      type: chooseHeroType.countHeroesInRow,
      payload: Math.floor(listEl.current.offsetWidth / heroCardWidth),
    })
    chooseHeroDispatch({
      type: chooseHeroType.activeHeroIndex,
      payload: startActiveHeroIndex(),
    })
  }, [])

  useEffect(() => {
    chooseHeroDispatch({
      type: chooseHeroType.myHeroName,
      payload: getActiveHeroName(activeHeroIndex, allHeroNames),
    })
  }, [allHeroNames, activeHeroIndex])

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

      if (e.key === buttonEnter) {
        const activeHeroName = getActiveHeroName(activeHeroIndex, allHeroNames)
        if (!myChosenHeroName) {
          chooseHeroDispatch({
            type: chooseHeroType.myChosenHeroName,
            payload: activeHeroName,
          })
          chooseHeroDispatch({
            type: chooseHeroType.myEnemyName,
            payload: activeHeroName,
          })
          dispatch(myHero(activeHeroName))
        } else {
          chooseHeroDispatch({
            type: chooseHeroType.myChosenEnemyName,
            payload: activeHeroName,
          })
          dispatch(myEnemy(activeHeroName))
          history.push(routes.VSSCREEN)
        }
      } else if (Object.values(arrows).includes(e.key)) {
        const [x, y] = getNextCoordinates(
          allCoordinates,
          activeHeroIndex,
          countHeroesInRow,
          e.key,
          countHeroesInColumn,
        )

        const index = Number(getKeyByValue(allCoordinates, { x, y }))
        chooseHeroDispatch({
          type: chooseHeroType.activeHeroIndex,
          payload: index,
        })

        if (myChosenHeroName) {
          chooseHeroDispatch({
            type: chooseHeroType.myEnemyName,
            payload: getActiveHeroName(index, allHeroNames),
          })
        } else {
          chooseHeroDispatch({
            type: chooseHeroType.myHeroName,
            payload: getActiveHeroName(index, allHeroNames),
          })
        }
      }
    },
    [
      activeHeroIndex,
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
    chooseHeroDispatch({
      type: chooseHeroType.countHeroesInRow,
      payload: Math.floor(listEl.current.offsetWidth / heroCardWidth),
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleHeroCardClick = index => {
    chooseHeroDispatch({
      type: chooseHeroType.activeHeroIndex,
      payload: index,
    })
    if (myChosenHeroName) {
      chooseHeroDispatch({
        type: chooseHeroType.myEnemyName,
        payload: getActiveHeroName(index, allHeroNames),
      })
    } else {
      chooseHeroDispatch({
        type: chooseHeroType.myHeroName,
        payload: getActiveHeroName(index, allHeroNames),
      })
    }
  }

  return (
    <>
      <div className={s.container}>
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
                active={countAllHero - 1 === activeHeroIndex}
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
                    active={index === activeHeroIndex}
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
                active={countAllHero - 2 === activeHeroIndex}
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
