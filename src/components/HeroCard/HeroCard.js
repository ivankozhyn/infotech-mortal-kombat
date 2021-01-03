import { heroNames } from '../../config/config'
import { heroImgs } from '../../assets/heroImgs'

import s from './HeroCard.module.scss'

export default function HeroCard({ hero, index, active, handleHeroCardClick }) {
  return (
    <li
      className={active ? s.activeCard : s.card}
      onClick={() => handleHeroCardClick(index)}
    >
      {<img className={s.img} src={heroImgs[hero]} alt={heroNames[hero]} />}
      <p className={s.name}>{heroNames[hero]}</p>
    </li>
  )
}
