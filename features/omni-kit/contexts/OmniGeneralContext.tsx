import type { TxStatus } from '@oasisdex/transactions'
import type BigNumber from 'bignumber.js'
import type { NetworkConfig } from 'blockchain/networks'
import type { GasPriceParams, Tickers } from 'blockchain/prices.types'
import type { GasEstimationContext } from 'components/context/GasEstimationContextProvider'
import {
  getOmniEditingStep,
  getOmniTxStatuses,
  isOmniExternalStep,
  isOmniStepWithTransaction,
  shiftOmniStep,
} from 'features/omni-kit/contexts'
import { getOmniEntryToken, isShortPosition } from 'features/omni-kit/helpers'
import { useOmniSlippage } from 'features/omni-kit/hooks'
import type {
  OmniEntryToken,
  OmniExtraTokenData,
  OmniProductType,
  OmniProtocolSettings,
  OmniSidebarAutomationEditingStep,
  OmniSidebarEditingStep,
  OmniSidebarStep,
  OmniSupportedNetworkIds,
} from 'features/omni-kit/types'
import { OmniSidebarAutomationStep } from 'features/omni-kit/types'
import type { TxDetails } from 'helpers/handleTransaction'
import { useAccount } from 'helpers/useAccount'
import type { LendingProtocol } from 'lendingProtocols'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import React, { useContext, useMemo, useState } from 'react'

interface OmniGeneralContextProviderProps {
  collateralAddress: string
  collateralBalance: BigNumber
  collateralDigits: number
  collateralIcon: string
  collateralPrecision: number
  collateralPrice: BigNumber
  /**
   * Collateral token symbol (ETH,USDC, etc)
   */
  collateralToken: string
  dpmProxy?: string
  ethBalance: BigNumber
  ethPrice: BigNumber
  extraTokensData: OmniExtraTokenData
  gasPrice: GasPriceParams
  isOpening: boolean
  isOracless: boolean
  isProxyWithManyPositions: boolean
  isYieldLoop: boolean
  isYieldLoopWithData: boolean
  label?: string
  network: NetworkConfig
  networkId: OmniSupportedNetworkIds
  owner: string
  pairId: number
  poolId?: string
  positionId?: string
  productType: OmniProductType
  protocol: LendingProtocol
  protocolPrices: Tickers
  protocolRaw: string
  protocolVersion?: string
  pseudoProtocol?: string
  quoteAddress: string
  quoteBalance: BigNumber
  quoteDigits: number
  quoteIcon: string
  quotePrecision: number
  quotePrice: BigNumber
  /**
   * Quote token symbol (ETH,USDC, etc)
   */
  quoteToken: string
  settings: OmniProtocolSettings
  slippage: BigNumber
  steps: OmniSidebarStep[]
  automationSteps: OmniSidebarAutomationStep[]
  walletNetwork: NetworkConfig
}

export enum OmniSlippageSourceSettings {
  USER_SETTINGS = 'userSettings',
  STRATEGY_CONFIGS = 'strategyConfig',
}

type OmniGeneralContextEnvironment = Omit<
  OmniGeneralContextProviderProps,
  'steps' | 'automationSteps'
> & {
  isOwner: boolean
  shouldSwitchNetwork: boolean
  isShort: boolean
  /**
   * Price format for the position eg. `ETH/USDC`
   */
  priceFormat: string
  gasEstimation: GasEstimationContext | undefined
  slippageSource: OmniSlippageSourceSettings
  isYieldLoop: boolean
  isStrategyWithDefaultSlippage: boolean
  entryToken: OmniEntryToken
}

interface OmniGeneralContextSteps {
  currentStep: OmniSidebarStep
  editingStep: OmniSidebarEditingStep
  isExternalStep: boolean
  isFlowStateReady: boolean
  isStepWithTransaction: boolean
  steps: OmniSidebarStep[]
  txStatus?: TxStatus
  setIsFlowStateReady: Dispatch<SetStateAction<boolean>>
  setStep: (step: OmniSidebarStep) => void
  setNextStep: () => void
  setPrevStep: () => void
}

interface OmniGeneralContextAutomationSteps {
  currentStep: OmniSidebarAutomationStep
  isStepWithTransaction: boolean
  steps: OmniSidebarAutomationStep[]
  editingStep: OmniSidebarAutomationEditingStep
  txStatus?: TxStatus
  setStep: (step: OmniSidebarAutomationStep) => void
  setNextStep: () => void
  setPrevStep: () => void
}

export interface OmniGeneralContextTx {
  isTxError: boolean
  isTxInProgress: boolean
  isTxStarted: boolean
  isTxSuccess: boolean
  isTxWaitingForApproval: boolean
  setTxDetails: Dispatch<SetStateAction<TxDetails | undefined>>
  setSlippageSource: Dispatch<SetStateAction<OmniSlippageSourceSettings>>
  setGasEstimation: Dispatch<SetStateAction<GasEstimationContext | undefined>>
  txDetails?: TxDetails
}

interface OmniGeneralContext {
  environment: OmniGeneralContextEnvironment
  steps: OmniGeneralContextSteps
  automationSteps: OmniGeneralContextAutomationSteps
  tx: OmniGeneralContextTx
}

const omniGeneralContext = React.createContext<OmniGeneralContext | undefined>(undefined)

export function useOmniGeneralContext(): OmniGeneralContext {
  const context = useContext(omniGeneralContext)

  if (!context) throw new Error('OmniGeneralContext not available!')
  return context
}

export function OmniGeneralContextProvider({
  children,
  steps,
  automationSteps,
  ...props
}: PropsWithChildren<OmniGeneralContextProviderProps>) {
  const {
    collateralBalance,
    collateralToken,
    isOpening,
    isProxyWithManyPositions,
    isYieldLoop,
    network,
    networkId,
    owner,
    quoteBalance,
    quoteToken,
    settings,
    slippage,
    walletNetwork,
  } = props
  const { walletAddress } = useAccount()
  const [currentStep, setCurrentStep] = useState<OmniSidebarStep>(steps[0])
  const [currentAutomationStep, setCurrentAutomationStep] = useState<OmniSidebarAutomationStep>(
    automationSteps[0],
  )
  const [isFlowStateReady, setIsFlowStateReady] = useState<boolean>(false)
  const [txDetails, setTxDetails] = useState<TxDetails>()
  const [gasEstimation, setGasEstimation] = useState<GasEstimationContext>()

  const isShort = isShortPosition({ collateralToken })

  const {
    slippage: resolvedSlippage,
    slippageSource,
    setSlippageSource,
    isStrategyWithDefaultSlippage,
  } = useOmniSlippage({ slippage, strategies: { isYieldLoop } })

  const setupStepManager = (): OmniGeneralContextSteps => {
    return {
      currentStep,
      steps,
      editingStep: getOmniEditingStep(isOpening),
      isExternalStep: isOmniExternalStep({ currentStep }),
      isFlowStateReady,
      isStepWithTransaction: isOmniStepWithTransaction({ currentStep }),
      setIsFlowStateReady,
      setStep: (step) => setCurrentStep(step),
      setNextStep: () => shiftOmniStep({ direction: 'next', currentStep, steps, setCurrentStep }),
      setPrevStep: () => shiftOmniStep({ direction: 'prev', currentStep, steps, setCurrentStep }),
    }
  }

  const setupAutomationStepManager = (): OmniGeneralContextAutomationSteps => {
    return {
      currentStep: currentAutomationStep,
      steps: automationSteps,
      editingStep: OmniSidebarAutomationStep.Manage,
      isStepWithTransaction: currentAutomationStep === OmniSidebarAutomationStep.Transaction,
      setStep: (step) => setCurrentAutomationStep(step),
      setNextStep: () =>
        shiftOmniStep({
          direction: 'next',
          currentStep: currentAutomationStep,
          steps: automationSteps,
          setCurrentStep: setCurrentAutomationStep,
        }),
      setPrevStep: () =>
        shiftOmniStep({
          direction: 'prev',
          currentStep: currentAutomationStep,
          steps: automationSteps,
          setCurrentStep: setCurrentAutomationStep,
        }),
    }
  }

  const setupTxManager = (): OmniGeneralContextTx => {
    return {
      ...getOmniTxStatuses(txDetails?.txStatus),
      setTxDetails,
      setSlippageSource,
      setGasEstimation,
      txDetails,
    }
  }

  const context: OmniGeneralContext = useMemo(() => {
    const isOwner = isOpening || owner.toLowerCase() === walletAddress?.toLowerCase()

    return {
      environment: {
        ...props,
        collateralBalance,
        gasEstimation,
        isOwner,
        isProxyWithManyPositions,
        isShort,
        network,
        networkId,
        priceFormat: isShort
          ? `${quoteToken}/${collateralToken}`
          : `${collateralToken}/${quoteToken}`,
        quoteBalance,
        settings,
        shouldSwitchNetwork: isOwner && network.id !== walletNetwork.id,
        slippage: resolvedSlippage,
        slippageSource,
        isYieldLoop,
        isStrategyWithDefaultSlippage,
        entryToken: getOmniEntryToken(props),
      },
      steps: setupStepManager(),
      automationSteps: setupAutomationStepManager(),
      tx: setupTxManager(),
    }
  }, [
    collateralBalance,
    currentStep,
    currentAutomationStep,
    isFlowStateReady,
    quoteBalance,
    txDetails,
    walletAddress,
    slippage,
    slippageSource,
    walletNetwork,
    gasEstimation,
  ])

  return <omniGeneralContext.Provider value={context}>{children}</omniGeneralContext.Provider>
}
