import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from './Button.module.scss'

export default function Button({ icon }) {
  const className = [icon ? s.buttonWithoutBG : s.button].join(' ')

  return (
    <div className={s.container}>
      {icon && <FontAwesomeIcon className={s.icon} icon={icon} />}
      <button type="button" className={className}></button>
    </div>
  )
}
