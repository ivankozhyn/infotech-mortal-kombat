import { heroImgs } from '../assets/heroImgs/'
import { arenas } from '../assets/arenas'
import {
  arrows,
  countKeyDownForShowFinishHim,
  countKeyDownForShowFatality,
  countKeyDownForShowSuper,
} from '../config/config'

const heroBeforeList = Object.keys(heroImgs).length - 1
const heroAfterList = Object.keys(heroImgs).length - 2

export const getAllCoordinates = (
  countHeroesInRow,
  countHeroesInColumn,
  countHeroes,
) => {
  if (countHeroesInRow) {
    const allCoordinates = {
      [heroBeforeList]: { x: -1, y: 0 },
      [heroAfterList]: { x: countHeroesInRow, y: 0 },
    }
    let x = 0
    let y = 0

    for (let i = 0; i < countHeroes; i++) {
      if (i < countHeroesInRow) {
        allCoordinates[i] = { x, y }
        x += 1
      }

      if (i >= countHeroesInRow) {
        for (let j = 1; j <= countHeroesInColumn(); j++) {
          if (i >= j * countHeroesInRow && i < (j + 1) * countHeroesInRow) {
            y = j
            allCoordinates[i] = { x: x - j * countHeroesInRow, y }
            x++
          }
        }
      }
    }

    return allCoordinates
  }
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(
    key => JSON.stringify(object[key]) === JSON.stringify(value),
  )
}

export const getNextCoordinates = (
  allCoordinates,
  activeCardIndex,
  countHeroesInRow,
  key,
  countHeroesInColumn,
  allCoordinatesValues,
) => {
  let x
  let y
  switch (key) {
    case arrows.ArrowUp:
      x = allCoordinates[activeCardIndex].x
      y = allCoordinates[activeCardIndex].y - 1
      if ((y === -1 && x === -1) || (x === countHeroesInRow && y === -1)) {
        y = 0
      }
      if (y === -1 && x !== -1) {
        y = countHeroesInColumn() - 1
      }
      const isCorrectNextArrowUp = !!allCoordinatesValues.find(
        item => (item.x === x) & (item.y === y),
      )
      if (!isCorrectNextArrowUp) {
        y = countHeroesInColumn() - 2
      }
      break
    case arrows.ArrowDown:
      x = allCoordinates[activeCardIndex].x
      y = allCoordinates[activeCardIndex].y + 1
      const isCorrectNextArrowDown = !!allCoordinatesValues.find(
        item => (item.x === x) & (item.y === y),
      )
      if (!isCorrectNextArrowDown) {
        y = 0
      }
      break
    case arrows.ArrowLeft:
      x = allCoordinates[activeCardIndex].x - 1
      y = allCoordinates[activeCardIndex].y
      if (x === -countHeroesInRow && y === countHeroesInColumn() - 1) {
        x = 0
      }
      if (x === -1 && y !== 0) {
        if (y === countHeroesInColumn() - 1) {
          x = ((allCoordinatesValues.length - 2) % countHeroesInRow) - 1
        } else {
          x = countHeroesInRow - 1
        }
      }
      if (x === -2) {
        x = countHeroesInRow
      }
      const isCorrectNextArrowLeft = !!allCoordinatesValues.find(
        item => (item.x === x) & (item.y === y),
      )
      if (!isCorrectNextArrowLeft) {
        x = (allCoordinatesValues.length % countHeroesInRow) - 1
      }
      break
    case arrows.ArrowRight:
      x = allCoordinates[activeCardIndex].x + 1
      y = allCoordinates[activeCardIndex].y
      if (x === countHeroesInRow + 1) {
        x = -1
      }
      const isCorrectNextArrowRight = !!Object.values(allCoordinates).find(
        item => (item.x === x) & (item.y === y),
      )
      if (!isCorrectNextArrowRight) {
        x = 0
      }
      break
    default:
      break
  }
  return [x, y]
}

export const getActiveHeroName = (index, allHeroNames) => {
  return allHeroNames.filter((_, i) => i === index).join('')
}

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const getRandomArena = (classStyle, s) => {
  const key = randomInteger(1, Object.keys(arenas).length)
  classStyle.push(s[`arena${key}`])
  return classStyle
}

export const randomIcon = (prevIcon, icons) => {
  let nextIcon = Object.values(icons)[
    randomInteger(0, Object.keys(icons).length - 1)
  ]
  while (prevIcon?.iconName === nextIcon.iconName) {
    nextIcon = Object.values(icons)[
      randomInteger(0, Object.keys(icons).length - 1)
    ]
  }
  return nextIcon
}

export const amountMostRepeatedArrayElement = array => {
  const res = {}
  array.forEach(element => {
    if (res[element]) {
      res[element] = res[element] + 1
    } else {
      res[element] = 1
    }
  })
  return Math.max(...Object.values(res))
}

export const countComboKeyDown = allIcons => {
  return amountMostRepeatedArrayElement(
    allIcons
      .filter(icon => icon?.iconName)
      .reduce((acc, value) => {
        acc.push(value.iconName)
        return acc
      }, []),
  )
}

export const showPopups = (countKeyDown, allIcons) => {
  const isShowFight = countKeyDown < 1
  const isShowFinishHim =
    countKeyDown >= countKeyDownForShowFinishHim &&
    countKeyDown < countKeyDownForShowFatality
  const isShowFatality = countKeyDown >= countKeyDownForShowFatality
  const isShowSuper = countComboKeyDown(allIcons) >= countKeyDownForShowSuper

  return [isShowFight, isShowFinishHim, isShowFatality, isShowSuper]
}
