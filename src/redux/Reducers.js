import { createReducer, combineReducers } from '@reduxjs/toolkit'

import { myHero, myEnemy } from './actions'

export const heroesReducer = createReducer(
  {},
  {
    [myHero]: (state, action) => {
      state[myHero] = action.payload
    },
    [myEnemy]: (state, action) => {
      state[myEnemy] = action.payload
    },
  },
)

export default combineReducers({
  heroesReducer,
})
