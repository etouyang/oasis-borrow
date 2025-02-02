import { NetworkNames } from 'blockchain/networks'
import { Icon } from 'components/Icon'
import { ModalCloseIcon } from 'components/Modal'
import { ProtocolLabel } from 'components/ProtocolLabel'
import { StatefulTooltip } from 'components/Tooltip'
import { RefinanceAbout } from 'features/refinance/components/RefinanceAbout'
import { useRefinanceContext } from 'features/refinance/contexts'
import { formatAddress } from 'helpers/formatters/format'
import { LendingProtocol } from 'lendingProtocols'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import React from 'react'
import { arrow_right, tooltip } from 'theme/icons'
import { useOnMobile } from 'theme/useBreakpointIndex'
import { Flex, Text } from 'theme-ui'

interface HeaderRightSectionProps {
  walletAddress?: string
  showAbout?: boolean
}

const HeaderRightSection: FC<HeaderRightSectionProps> = ({ walletAddress, showAbout }) => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ mr: 4, alignItems: 'center', gap: 2 }}>
      {walletAddress && (
        <Text
          as="p"
          variant="paragraph3"
          sx={{
            ml: 3,
            color: 'primary100',
            fontWeight: 'semiBold',
            letterSpacing: '0.02em',
            fontSize: 1,
            backgroundColor: 'neutral30',
            px: 3,
            py: 2,
            borderRadius: 'round',
          }}
        >
          {formatAddress(walletAddress, 6)}
        </Text>
      )}
      {showAbout && (
        <StatefulTooltip
          containerSx={{ ml: 1 }}
          tooltip={<RefinanceAbout withNotice={false} />}
          tooltipSx={{
            maxWidth: '365px',
            px: 2,
            py: '24px',
            borderRadius: 'large',
            border: 'none',
            top: '55px',
            right: '50px',
            zIndex: 4,
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              gap: 2,
              border: '1px solid',
              borderColor: 'neutral20',
              p: 2,
              borderRadius: 'round',
            }}
          >
            <Icon icon={tooltip} />
            <Text as="p" sx={{ fontWeight: 'semiBold', fontSize: 1 }}>
              {t('refinance.about.title')}
            </Text>
          </Flex>
        </StatefulTooltip>
      )}
    </Flex>
  )
}

interface RefinanceHeaderProps {
  onClose: () => void
}

export const RefinanceHeader: FC<RefinanceHeaderProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const isMobile = useOnMobile()

  const ctx = useRefinanceContext()

  const {
    position: {
      positionId: { id },
      debtTokenData,
      collateralTokenData,
    },
    form: {
      state: { strategy, dpm },
    },
  } = ctx

  // use refinance context to eventually get this data
  const { primaryToken, secondaryToken, positionId, fromProtocol, toProtocol } = {
    primaryToken: collateralTokenData.token.symbol,
    secondaryToken: debtTokenData.token.symbol,
    positionId: id,
    fromProtocol: {
      network: NetworkNames.ethereumMainnet,
      protocol: LendingProtocol.Maker,
    },
    ...(strategy
      ? {
          toProtocol: {
            network: strategy.network,
            protocol: strategy.protocol,
          },
        }
      : {}),
  }

  return (
    <Flex
      sx={{ justifyContent: 'space-between', mb: '24px' }}
      onClick={() =>
        // eslint-disable-next-line no-console
        console.log(
          `DPM proxy to be used: ${dpm?.address?.toLowerCase()}. Id: ${dpm?.id?.toLowerCase()}`,
        )
      }
    >
      <Flex sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: [3, 0] }}>
        <Text as="h2" sx={{ fontSize: 4, fontWeight: 'semiBold', ml: 2 }}>
          {t('refinance.modal-title', { pair: `${primaryToken}/${secondaryToken}` })}
          {positionId && (
            <Text as="span" sx={{ fontSize: 2, fontWeight: 'semiBold', ml: 2, color: 'neutral80' }}>
              #{positionId.toString()}
            </Text>
          )}
        </Text>
        <Flex sx={{ ml: [0, 2], alignItems: 'center' }}>
          <ProtocolLabel network={fromProtocol.network} protocol={fromProtocol.protocol} />
          {toProtocol && (
            <>
              <Icon icon={arrow_right} size="16px" sx={{ mx: 2 }} />
              <ProtocolLabel network={toProtocol.network} protocol={toProtocol.protocol} />
            </>
          )}
          {isMobile && <HeaderRightSection />}
        </Flex>
      </Flex>
      {!isMobile && <HeaderRightSection showAbout />}
      <ModalCloseIcon close={onClose} sx={{ top: '19px' }} />
    </Flex>
  )
}
