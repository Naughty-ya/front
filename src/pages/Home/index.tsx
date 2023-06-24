import { ShareButtons } from 'src/components/common/ShareButtons'
import { Flex } from 'src/components/core/Flex'
import HomePage from 'src/components/Home/HomePage'

export default function Home() {
  //   const [nickname, setNickName] = useState(getRandomName())

  return (
    <Flex direction="col" className="max-w-lg gap-10" align="center">
      <HomePage />
      <ShareButtons />
    </Flex>
  )
}
