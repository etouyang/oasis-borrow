import { TabBar } from 'components/TabBar'
import { VaultHeadline } from 'components/vault/VaultHeadline'
import { HeadlineDetailsProp } from 'components/vault/VaultHeadlineDetails'
import { useAjnaGeneralContext } from 'features/ajna/common/contexts/AjnaGeneralContext'
import { getAjnaHeadlineProps } from 'features/ajna/common/helpers/getAjnaHeadlineProps'
import { VaultOwnershipBanner } from 'features/notices/VaultsNoticesView'
import { useAccount } from 'helpers/useAccount'
import { useTranslation } from 'next-i18next'
import React, { ReactNode } from 'react'
import { Box, Container } from 'theme-ui'

interface AjnaPositionViewProps {
  headlineDetails?: HeadlineDetailsProp[]
  tabs: {
    position: ReactNode
    history: ReactNode
    info: ReactNode
  }
}

export function AjnaPositionView({
  headlineDetails,
  tabs: { position, history, info },
}: AjnaPositionViewProps) {
  const { t } = useTranslation()
  const { contextIsLoaded, walletAddress } = useAccount()
  const {
    environment: { collateralToken, flow, id, owner, product, quoteToken },
  } = useAjnaGeneralContext()

  return (
    <Container variant="vaultPageContainerStatic">
      {contextIsLoaded && owner !== walletAddress && flow === 'manage' && (
        <Box sx={{ mb: 4 }}>
          <VaultOwnershipBanner controller={owner} account={walletAddress} />
        </Box>
      )}
      <VaultHeadline
        header=""
        {...getAjnaHeadlineProps({ collateralToken, flow, id, product, quoteToken })}
        {...(flow === 'manage' && { shareButton: true })}
        details={headlineDetails || []}
      />
      <TabBar
        variant="underline"
        sections={[
          {
            value: flow === 'manage' ? 'overview' : 'setup',
            label: t(flow === 'manage' ? 'system.overview' : 'setup'),
            content: <>{position}</>,
          },
          {
            value: 'position-info',
            label: t('system.position-info'),
            content: <>{info}</>,
          },
          ...(flow === 'manage'
            ? [
                {
                  value: 'history',
                  label: t('system.history'),
                  content: <>{history}</>,
                },
              ]
            : []),
        ]}
      />
    </Container>
  )
}
