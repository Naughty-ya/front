import { Flex } from 'src/components/core/Flex'
import { IconButton } from 'src/components/core/IconButton'
import { shareClipboard, shareKakaoLink, shareTwitter } from 'src/utils/share'

export function ShareButtons() {
  let url = window.location.href.split('/')
  url.pop()
  let newUrl = url.join('/')
  return (
    <Flex direction="row" className="gap-3" align="center">
      <IconButton
        iconName="kakao"
        id="kakao-link-btn"
        iconSize={22}
        className="bg-yellow-400 text-gray-800 p-3 rounded-full drop-shadow-1 hover:bg-yellow-500 active:bg-yellow-600 transition-all"
        onClick={shareKakaoLink}
      />
      <IconButton
        iconName="twitter"
        iconStroke="none"
        iconSize={22}
        onClick={shareTwitter}
        className="white bg-blue-400 p-3 rounded-full drop-shadow-1 hover:bg-blue-500 active:bg-blue-600 transition-all"
      />
      <IconButton
        iconName="link"
        iconFill="none"
        iconSize={22}
        className="bg-blue-500 p-3 rounded-full drop-shadow-1 hover:bg-blue-600 active:bg-blue-700 transition-all"
        onClick={() => shareClipboard(newUrl)}
      />
    </Flex>
  )
}
