import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { Text } from '../../components/atoms/text'

export function Home() {
  const { pathname } = useLocation()
  return (
    <PageLayout activePath={pathname}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Text as="h1" variant="titel" color="white">
          UnF*ck Berlin
        </Text>
        <Text variant="body" color="white">
          Design-System-Grundgerüst steht. Seiten folgen.
        </Text>
      </div>
    </PageLayout>
  )
}

export default Home
