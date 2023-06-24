import { Flex } from 'src/components/core/Flex'
import { IconButton } from 'src/components/core/IconButton'
import { copyClipboard, shareKakaoLink } from 'src/utils/share'

export function ShareButtons() {
  return (
    <Flex direction="row" className="gap-3" align="center">
      <IconButton
        iconName="kakao"
        id="kakao-link-btn"
        iconSize={22}
        className="bg-yellow-400 text-gray-800 p-3 rounded-full"
        onClick={shareKakaoLink}
      />
      <IconButton
        iconName="twitter"
        iconStroke="none"
        iconSize={22}
        className="white bg-blue-400 p-3 rounded-full"
      />
      <IconButton
        iconName="link"
        iconFill="none"
        iconSize={22}
        className="bg-[#6387FF] p-3 rounded-full "
        onClick={() => copyClipboard(window.location.href)}
      />
    </Flex>
  )
}
