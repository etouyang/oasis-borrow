import BigNumber from 'bignumber.js'
import { RefinancePositionView } from 'features/refinance/components/RefinancePositionView'
import { useRefinanceContext } from 'features/refinance/contexts'
import { useSimulationPositionData } from 'features/refinance/hooks/useSimulationPositionData'
import { RefinancePositionViewType, RefinanceSidebarStep } from 'features/refinance/types'
import { zero } from 'helpers/zero'
import React from 'react'

export const RefinanceSimulation = () => {
  const {
    steps: { currentStep },
    form: {
      state: { strategy },
    },
    poolData: { maxLtv: currentMaxLtv },
    position: { netApy: currentBorrowRate },
  } = useRefinanceContext()

  const positionData = useSimulationPositionData()

  if (currentStep === RefinanceSidebarStep.Option) {
    return <RefinancePositionView type={RefinancePositionViewType.EMPTY} />
  }

  if (!strategy) {
    return null
  }

  const maxLtv = strategy.maxLtv ? new BigNumber(strategy.maxLtv) : zero
  const borrowRate = strategy.fee ? new BigNumber(strategy.fee) : zero

  return [
    RefinanceSidebarStep.Give,
    RefinanceSidebarStep.Dpm,
    RefinanceSidebarStep.Changes,
    RefinanceSidebarStep.Transaction,
  ].includes(currentStep) ? (
    <RefinancePositionView
      type={RefinancePositionViewType.SIMULATION}
      primaryToken={strategy.primaryToken}
      secondaryToken={strategy.secondaryToken}
      protocolData={{
        network: strategy.network,
        protocol: strategy.protocol,
      }}
      poolData={{
        maxLtv,
        maxLtvChange: maxLtv.minus(currentMaxLtv.loanToValue),
        borrowRate,
        borrowRateChange: borrowRate.minus(currentBorrowRate),
      }}
      positionData={positionData}
      automations={{
        stopLoss: { enabled: false },
        autoSell: { enabled: false },
        autoBuy: { enabled: false },
        takeProfit: { enabled: false },
      }}
    />
  ) : null
}
