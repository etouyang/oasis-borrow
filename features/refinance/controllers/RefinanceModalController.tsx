import { usePreloadAppDataContext } from 'components/context/PreloadAppDataContextProvider'
import { useProductContext } from 'components/context/ProductContextProvider'
import { Modal } from 'components/Modal'
import {
  RefinanceHeader,
  RefinanceModalSkeleton,
  RefinancePosition,
  RefinanceSimulation,
} from 'features/refinance/components'
import { RefinanceContextProvider } from 'features/refinance/contexts'
import type { RefinanceContextInput } from 'features/refinance/contexts/RefinanceGeneralContext'
import { useRefinanceGeneralContext } from 'features/refinance/contexts/RefinanceGeneralContext'
import { RefinanceFormController } from 'features/refinance/controllers/index'
import {
  getRefinanceAaveLikeInterestRates,
  getRefinanceInterestRatesInputParams,
  getRefinancePositionOwner,
} from 'features/refinance/helpers'
import { getNetAPY } from 'features/refinance/helpers/getBorrowRate'
import { useSdkSimulation } from 'features/refinance/hooks/useSdkSimulation'
import { WithLoadingIndicator } from 'helpers/AppSpinner'
import { WithErrorHandler } from 'helpers/errorHandlers/WithErrorHandler'
import { useModalContext } from 'helpers/modalHook'
import { useObservable } from 'helpers/observableHook'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import React, { useEffect, useMemo } from 'react'
import { useBeforeUnload } from 'react-use'
import { from, of } from 'rxjs'
import { useOnMobile } from 'theme/useBreakpointIndex'
import { Flex, Text } from 'theme-ui'

interface RefinanceModalProps {
  contextInput: RefinanceContextInput
}

export const RefinanceModalController: FC<RefinanceModalProps> = ({ contextInput }) => {
  const { closeModal } = useModalContext()
  const { t } = useTranslation()

  const { productHub: data } = usePreloadAppDataContext()
  const { tokenPriceUSD$ } = useProductContext()
  const interestRatesInput = getRefinanceInterestRatesInputParams(data.table)

  const { handleOnClose, ctx, cache } = useRefinanceGeneralContext()

  const isTxInProgress = !!ctx?.tx.isTxInProgress

  useBeforeUnload(isTxInProgress)

  // Call it with ETH to make sure that tokenPriceStore has been initialized
  const [tokenPriceUSDData, tokenPriceUSDError] = useObservable(
    useMemo(() => tokenPriceUSD$(['ETH']), []),
  )

  const positionOwner = useMemo(
    () =>
      !cache.positionOwner
        ? from(
            getRefinancePositionOwner({
              protocol: contextInput.position.lendingProtocol,
              positionId: contextInput.position.positionId.id,
              chainId: contextInput.environment.chainId,
            }),
          )
        : of(cache.positionOwner),
    [
      cache.positionOwner,
      contextInput.environment.chainId,
      contextInput.position.lendingProtocol,
      contextInput.position.positionId.id,
    ],
  )

  // If needed we should extend it with other network & protocols and map to the same interface
  const interestRates = useMemo(
    () =>
      !cache.interestRates
        ? from(getRefinanceAaveLikeInterestRates(interestRatesInput))
        : of(cache.interestRates),
    [cache.interestRates],
  )

  const [positionOwnerData, positionOwnerError] = useObservable(positionOwner)
  const [interestRatesData, interestRatesError] = useObservable(interestRates)

  // cache data
  useEffect(() => {
    if (positionOwnerData) cache.setPositionOwner(positionOwnerData)
  }, [positionOwnerData])
  useEffect(() => {
    if (interestRatesData) cache.setInterestRates(interestRatesData)
  }, [interestRatesData])

  const netAPY =
    ctx &&
    getNetAPY(
      ctx?.position.ltv.loanToValue.toString(),
      ctx?.position.borrowRate,
      ctx?.position.supplyRate,
    )

  const onClose = () => {
    if (isTxInProgress) {
      if (window.confirm(t('refinance.close-prompt'))) {
        handleOnClose(contextInput.contextId)
        closeModal()
      }
      return
    }

    handleOnClose(contextInput.contextId)
    closeModal()
  }
  const simulation = useSdkSimulation()

  return (
    <Modal sx={{ margin: '0 auto' }} close={onClose} variant="modalAutoWidth">
      <WithErrorHandler error={[positionOwnerError, interestRatesError, tokenPriceUSDError]}>
        <WithLoadingIndicator
          value={[ctx, positionOwnerData, interestRatesData, tokenPriceUSDData, netAPY]}
          customLoader={<RefinanceModalSkeleton onClose={onClose} />}
        >
          {([_ctx, _owner, _interestRates, _tokenPriceUSD, _netApy]) => (
            <RefinanceContextProvider
              ctx={{
                ..._ctx,
                environment: {
                  ..._ctx.environment,
                  marketPrices: {
                    ethPrice: _tokenPriceUSD['ETH'].toString(),
                  },
                },
                metadata: {
                  ..._ctx.metadata,
                  interestRates: _interestRates,
                },
                position: {
                  ..._ctx.position,
                  owner: _owner,
                  netApy: _netApy,
                },
                poolData: {
                  ..._ctx.poolData,
                },
                simulation,
              }}
            >
              <RefinanceModalContainer onClose={onClose} />
            </RefinanceContextProvider>
          )}
        </WithLoadingIndicator>
      </WithErrorHandler>
    </Modal>
  )
}

function RefinanceModalContainer({ onClose }: Readonly<{ onClose: () => void }>) {
  const { t } = useTranslation()
  const isMobile = useOnMobile()

  return (
    <Flex sx={{ flexDirection: 'column', m: 3, minHeight: ['auto', '800px'] }}>
      <RefinanceHeader onClose={onClose} />
      {isMobile ? (
        <Text variant="paragraph2">{t('refinance.mobile-not-available')}</Text>
      ) : (
        <Flex sx={{ gap: 3, flexWrap: 'wrap' }}>
          <RefinancePosition />
          <RefinanceFormController />
          <RefinanceSimulation />
        </Flex>
      )}
    </Flex>
  )
}
