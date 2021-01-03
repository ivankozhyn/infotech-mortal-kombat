import { myHero, myEnemy } from './Actions'

export const getMyHeroName = state => state.heroes[myHero]
export const getMyEnemyName = state => state.heroes[myEnemy]
