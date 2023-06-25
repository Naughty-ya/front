import { ReactComponent as Twitter } from 'src/assets/icons/twitter-icon.svg'
import { ReactComponent as Kakao } from 'src/assets/icons/kakao-icon.svg'
import { ReactComponent as Link } from 'src/assets/icons/link-icon.svg'
import { ReactComponent as Polygon } from 'src/assets/icons/polygon-icon.svg'
import { ReactComponent as Refresh } from 'src/assets/icons/refresh-icon.svg'
import { ReactComponent as Send } from 'src/assets/icons/send-icon.svg'
import { ReactComponent as Back } from 'src/assets/icons/back-icon.svg'

// add new icons here
export const iconMap = {
  twitter: Twitter,
  kakao: Kakao,
  link: Link,
  polygon: Polygon,
  refresh: Refresh,
  send: Send,
  back: Back
}

export type IconName = keyof typeof iconMap
