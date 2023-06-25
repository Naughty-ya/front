import { Flex } from 'src/components/core/Flex'
import { IconButton } from 'src/components/core/IconButton'
import { copyClipboard, shareKakaoLink } from 'src/utils/share'

export function ShareButtons() {
  // TODO: 카카오 링크 공유하기, 트위터 공유하기, 링크 복사하기 기능 구현

  return (
    <Flex direction="row" className="gap-3" align="center">
      <IconButton
        iconName="kakao"
        id="kakao-link-btn"
        iconSize={22}
        className="bg-yellow-400 text-gray-800 p-3 rounded-full drop-shadow-1"
        onClick={shareKakaoLink}
      />
      <IconButton
        iconName="twitter"
        iconStroke="none"
        iconSize={22}
        className="white bg-blue-400 p-3 rounded-full drop-shadow-1"
      />
      <IconButton
        iconName="link"
        iconFill="none"
        iconSize={22}
        className="bg-brand-blue p-3 rounded-full drop-shadow-1"
        onClick={() => copyClipboard(window.location.href)}
      />
    </Flex>
  )
}
