import { ShareButtons } from 'src/components/common/ShareButtons'
import { Flex } from 'src/components/core/Flex'
import HomePage from 'src/components/Home/HomePage'
import { Layout } from 'src/components/layout/Layout'

export default function Home() {
  return (
    <Layout>
      <Flex
        direction="col"
        align="center"
        justify="center"
        className="w-full px-5"
      >
        <HomePage />
        <ShareButtons />
      </Flex>
    </Layout>
  )
}
