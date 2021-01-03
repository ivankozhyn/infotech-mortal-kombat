import { heroAnimations } from '../../assets/heroAnimations'
import { heroNames } from '../../config/config'

import s from './HeroesFight.module.scss'

export default function HeroesFight({ myHeroName, myEnemyName }) {
  return (
    <div className={s.heroes}>
      <div className={s.heroAnimation}>
        <p className={s.heroName}>{heroNames[myHeroName]}</p>
        <img
          className={s.img}
          src={heroAnimations[myHeroName]}
          alt={heroAnimations[myHeroName]}
        />
      </div>
      <div className={s.enemyAnimation}>
        <p className={s.heroName}>{heroNames[myEnemyName]}</p>
        <img
          className={s.img}
          src={heroAnimations[myEnemyName]}
          alt={heroAnimations[myEnemyName]}
        />
      </div>
    </div>
  )
}
