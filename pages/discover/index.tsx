import { discoverPagesMeta } from 'features/discover/meta'
import { INTERNAL_LINKS } from 'helpers/applicationLinks'
import { GetServerSidePropsContext } from 'next'

export default function DiscoverRedirectPage() {
  return null
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const network = context.query.network ? `?network=${context.query.network}` : ''
  const [defaultDiscoverPage] = discoverPagesMeta // 0 => HIGH_RISK_POSITIONS

  return {
    redirect: {
      destination: `${INTERNAL_LINKS.discover}/${defaultDiscoverPage.kind}${network}`,
      permanent: true,
    },
  }
}
