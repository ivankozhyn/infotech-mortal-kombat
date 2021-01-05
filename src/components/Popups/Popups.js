import fight from '../../assets/otherAnimations/fight.gif'
import finishHim from '../../assets/otherAnimations/finishHim.gif'
import fatality from '../../assets/otherAnimations/fatality.gif'
import superFight from '../../assets/otherAnimations/superFight.gif'

import s from './Popups.module.scss'

export default function Popups({ showPopupsInFight }) {
  const [
    isShowFight,
    isShowFinishHim,
    isShowFatality,
    isShowSuper,
  ] = showPopupsInFight

  return (
    <>
      {isShowFight && (
        <div className={s.fight}>
          <img src={fight} alt="fight" />
        </div>
      )}
      {isShowFinishHim && (
        <div className={s.finishHim}>
          <img src={finishHim} alt="finish him" />
        </div>
      )}
      {isShowFatality && (
        <div className={s.fatality}>
          <img src={fatality} alt="fatality?" />
          <span className={s.questionMark}>?</span>
        </div>
      )}
      {isShowSuper && (
        <div className={s.superFight}>
          {<img src={superFight} alt="super fight" />}
        </div>
      )}
    </>
  )
}
