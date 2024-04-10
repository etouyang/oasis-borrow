import type { RiskRatio } from '@oasisdex/dma-library'
import type { TxStatus } from '@oasisdex/transactions'
import type { GasEstimationContext } from 'components/context/GasEstimationContextProvider'
import type { OmniGeneralContextTx } from 'features/omni-kit/contexts'
import { useInitializeRefinanceContext } from 'features/refinance/hooks'
import type { useRefinanceFormReducto } from 'features/refinance/state'
import type { RefinanceSidebarStep } from 'features/refinance/types'
import type { Dispatch, FC, SetStateAction } from 'react'
import React, { useContext, useState } from 'react'
import type { AddressValue, ChainInfo, IPoolId, PositionId, TokenAmount } from 'summerfi-sdk-common'

export interface RefinanceSteps {
  currentStep: RefinanceSidebarStep
  isExternalStep: boolean
  isFlowStateReady: boolean
  isStepWithTransaction: boolean
  steps: RefinanceSidebarStep[]
  txStatus?: TxStatus
  setIsFlowStateReady: Dispatch<SetStateAction<boolean>>
  setStep: (step: RefinanceSidebarStep) => void
  setNextStep: () => void
  setPrevStep: () => void
}

type IsAutomationEnabled = {
  enabled: boolean
}

export type RefinanceContextInputAutomations = {
  stopLoss?: IsAutomationEnabled
  trailingStopLoss?: IsAutomationEnabled
  autoSell?: IsAutomationEnabled
  autoBuy?: IsAutomationEnabled
  partialTakeProfit?: IsAutomationEnabled
  autoTakeProfit?: IsAutomationEnabled
  constantMultiple?: IsAutomationEnabled
}

export type RefinanceContextInput = {
  poolData: {
    poolId: IPoolId
    borrowRate: string
    collateralTokenSymbol: string
    debtTokenSymbol: string
    maxLtv: RiskRatio
  }
  environment: {
    tokenPrices: Record<string, string>
    chainId: number
    slippage: number
    address?: string
  }
  position: {
    positionId: PositionId
    collateralAmount: string
    debtAmount: string
    liquidationPrice: string
    ltv: RiskRatio
  }
  automations: RefinanceContextInputAutomations
  contextId: string
}

export type RefinanceContextBase = {
  environment: {
    contextId: string
    collateralPrice: string
    debtPrice: string
    address?: AddressValue
    chainInfo: ChainInfo
    slippage: number
    isShort: boolean
    gasEstimation: GasEstimationContext | undefined
  }
  position: {
    positionId: PositionId
    collateralTokenData: TokenAmount
    debtTokenData: TokenAmount
    liquidationPrice: string
    ltv: RiskRatio
  }
  poolData: {
    poolId: IPoolId
    borrowRate: string
    maxLtv: RiskRatio
  }
  automations: RefinanceContextInputAutomations
  form: ReturnType<typeof useRefinanceFormReducto>
  steps: RefinanceSteps
  tx: OmniGeneralContextTx
}

type RefinanceContexts = Record<string, RefinanceContextBase>

export type RefinanceGeneralContext = {
  ctx?: RefinanceContextBase
  handleSetContext: (ctx: RefinanceContextInput) => void
  handleOnClose: (id: string) => void
}

export const refinanceGeneralContext = React.createContext<RefinanceGeneralContext | undefined>(
  undefined,
)

export const useRefinanceGeneralContext = () => {
  const context = useContext(refinanceGeneralContext)

  if (!context) {
    throw new Error('RefinanceGeneralContextProvider is missing in the hierarchy')
  }
  return context
}

export const RefinanceGeneralContextProvider: FC = ({ children }) => {
  const [contexts, setContexts] = useState<RefinanceContexts>({})
  const [currentContext, setCurrentContext] = useState<string>('')
  const [contextInput, setContextInput] = useState<RefinanceContextInput | undefined>(undefined)

  const { ctx, reset } = useInitializeRefinanceContext({
    contextInput: contextInput,
    defaultCtx: contexts[currentContext],
  })

  const handleSetContext = (init: RefinanceContextInput) => {
    setContextInput(init)
    setCurrentContext(init.contextId)
    reset(contexts[init.contextId])
  }

  const handleOnClose = (id: string) => {
    if (ctx) {
      setContexts((prev) => ({ ...prev, [id]: ctx }))
    }
  }

  return (
    <refinanceGeneralContext.Provider
      value={{
        ctx,
        handleSetContext,
        handleOnClose,
        // contexts,
      }}
    >
      {children}
    </refinanceGeneralContext.Provider>
  )
}
