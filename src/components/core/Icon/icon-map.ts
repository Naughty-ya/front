import { ReactComponent as Twitter } from 'src/assets/icons/twitter-icon.svg'
import { ReactComponent as Kakao } from 'src/assets/icons/kakao-icon.svg'
import { ReactComponent as Link } from 'src/assets/icons/link-icon.svg'

// add new icons here
export const iconMap = {
  twitter: Twitter,
  kakao: Kakao,
  link: Link
}

export type IconName = keyof typeof iconMap
