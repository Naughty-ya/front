import { Flex } from 'src/components/core/Flex'
import { IconButton } from 'src/components/core/IconButton'

export function ShareButtons() {
  return (
    <Flex direction="row" className="gap-3" align="center">
      <IconButton
        iconName="twitter"
        className="white bg-blue-400 p-1 rounded-full"
      />
      <IconButton
        iconName="kakao"
        className="bg-yellow-400 text-gray-800 p-1 rounded-full"
      />
      <IconButton iconName="link" className="bg-green-500 p-1 rounded-full " />
    </Flex>
  )
}
