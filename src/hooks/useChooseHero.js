import { useRef, useEffect, useCallback, useMemo, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  heroNames,
  heroCardWidth,
  startActiveHeroIndex,
  arrows,
  buttonEnter,
} from '../config/config'
import {
  getAllCoordinates,
  getKeyByValue,
  getNextCoordinates,
  getActiveHeroName,
} from '../utils/utils'

import { routes } from '../router/routes'
import { myHero, myEnemy } from '../redux/actions'

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

export const useChooseHero = () => {
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

  return {
    myChosenHeroName,
    allHeroNames,
    countAllHero,
    activeHeroIndex,
    myHeroName,
    listEl,
    myEnemyName,
    handleHeroCardClick,
  }
}
