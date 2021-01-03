import figth from '../../assets/otherAnimations/fight.gif'
import finishHim from '../../assets/otherAnimations/finishHim.gif'
import fatality from '../../assets/otherAnimations/fatality.gif'
import superFight from '../../assets/otherAnimations/superFight.gif'

import {
  countKeyDownForShowFinishHim,
  countKeyDownForShowFatality,
  countKeyDownForShowSuper,
} from '../../config/config'
import { countComboKeyDown } from '../../utils/utils'

import s from './Popups.module.scss'

export default function Popups({ allIcons, countKeyDown }) {
  return (
    <>
      {countKeyDown < 1 && (
        <div className={s.figth}>
          <img src={figth} alt="figth" />
        </div>
      )}
      {countKeyDown >= countKeyDownForShowFinishHim &&
        countKeyDown < countKeyDownForShowFatality && (
          <div className={s.finishHim}>
            <img src={finishHim} alt="finish him" />
          </div>
        )}
      {countKeyDown >= countKeyDownForShowFatality && (
        <div className={s.fatality}>
          <img src={fatality} alt="fatality?" />
          <span className={s.questionMark}>?</span>
        </div>
      )}
      {countComboKeyDown(allIcons) >= countKeyDownForShowSuper && (
        <div className={s.superFight}>
          {<img src={superFight} alt="super fight" />}
        </div>
      )}
    </>
  )
}
