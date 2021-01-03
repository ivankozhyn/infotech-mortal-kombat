import { randomInteger } from '../utils/utils'

import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'

export const heroNames = {
  baraka: 'Baraka',
  jade: 'Jade',
  jaxBriggs: 'Jax Briggs',
  johnnyCage: 'Johnny Cage',
  kabal: 'Kabal',
  kano: 'Kano',
  kitana: 'Kitana',
  kungLao: 'Kung Lao',
  liuKang: 'Liu Kang',
  mileena: 'Mileena',
  nightwolf: 'Nightwolf',
  noobSaibot: 'Noob Saibot',
  raiden: 'Raiden',
  rain: 'Rain',
  scorpion: 'Scorpion',
  shangTsung: 'Shang Tsung',
  shaoKahn: 'Shao Kahn',
  sheeva: 'Sheeva',
  sindel: 'Sindel',
  sonyaBlade: 'Sonya Blade',
  subZero: 'Sub Zero',
}

export const heroCardWidth = 136
export const startActiveHeroIndex = randomInteger(
  0,
  Object.keys(heroNames).length - 1,
)

export const buttons = { q: 'q', w: 'w', e: 'e', r: 'r', t: 't', y: 'y' }

export const arrows = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
}

export const icons = {
  faLongArrowAltDown,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faLongArrowAltUp,
  faRandom,
  faRecycle,
}

export const countKeyDownForShowFinishHim = randomInteger(3, 5)
export const countKeyDownForShowFatality = randomInteger(6, 8)
export const countKeyDownForShowSuper = 3

export const fightTimeInSeconds = 10
