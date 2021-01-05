import { myHero, myEnemy } from './actions'

export const getMyHeroName = state => state.heroes[myHero]
export const getMyEnemyName = state => state.heroes[myEnemy]
