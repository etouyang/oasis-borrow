import { Network, protocols } from '@oasisdex/dma-library'
import BigNumber from 'bignumber.js'
import { NetworkIds } from 'blockchain/networks'
import { AutomationFeatures } from 'features/automation/common/types'
import {
  ARBITRUM_DEFAULT_LIQUIDITY_PROVIDERS,
  BASE_DEFAULT_LIQUIDITY_PROVIDERS,
  ETHEREUM_MAINNET_DEFAULT_PROTOCOLS,
  OPTIMISM_DEFAULT_PROCOTOLS,
} from 'features/exchange/exchange'
import type { NetworkIdsWithValues } from 'features/omni-kit/types'
import { OmniProductType, OmniSidebarStep } from 'features/omni-kit/types'
import type { GetTriggersResponse } from 'helpers/lambda/triggers'
import { one, zero } from 'helpers/zero'
import type { LendingProtocol } from 'lendingProtocols'

export const omniBorrowishProducts = [OmniProductType.Borrow, OmniProductType.Multiply]

export const omniSidebarSharedSteps = [OmniSidebarStep.Dpm, OmniSidebarStep.Transaction]

export const omniSidebarSetupSteps = [OmniSidebarStep.Setup, ...omniSidebarSharedSteps]

export const omniSidebarManageSteps = [OmniSidebarStep.Manage, ...omniSidebarSharedSteps]

export const omniSidebarManageBorrowishSteps = [
  ...omniSidebarManageSteps,
  OmniSidebarStep.Transition,
]

export const omniFormExternalSteps: OmniSidebarStep[] = [OmniSidebarStep.Dpm]
export const omniFormStepsWithTransaction: OmniSidebarStep[] = [OmniSidebarStep.Transaction]

export const omniLendingPriceColors = ['#D3D4D8', '#EABE4C', '#1ECBAE']

export const paybackAllAmountAllowanceMaxMultiplier: Record<LendingProtocol, BigNumber> = {
  aavev2: one,
  aavev3: one,
  maker: one,
  morphoblue: one,
  sparkv3: one,
  ajna: one.plus(protocols.ajna.ajnaPaybackAllWithdrawAllValueOffset),
}

export const omniSwapProtocolsMap: NetworkIdsWithValues<string[]> = {
  [NetworkIds.MAINNET]: ETHEREUM_MAINNET_DEFAULT_PROTOCOLS,
  [NetworkIds.BASEMAINNET]: BASE_DEFAULT_LIQUIDITY_PROVIDERS,
  [NetworkIds.OPTIMISMMAINNET]: OPTIMISM_DEFAULT_PROCOTOLS,
  [NetworkIds.ARBITRUMMAINNET]: ARBITRUM_DEFAULT_LIQUIDITY_PROVIDERS,
  [NetworkIds.GOERLI]: [],
}

export const omniSwapVersionMap: NetworkIdsWithValues<'v4.0' | 'v5.0'> = {
  [NetworkIds.MAINNET]: 'v4.0',
  [NetworkIds.BASEMAINNET]: 'v5.0',
  [NetworkIds.OPTIMISMMAINNET]: 'v5.0',
  [NetworkIds.ARBITRUMMAINNET]: 'v5.0',
  [NetworkIds.GOERLI]: 'v4.0', // doesn't matter
}

export const omniNetworkMap: NetworkIdsWithValues<Network> = {
  [NetworkIds.MAINNET]: Network.MAINNET,
  [NetworkIds.ARBITRUMMAINNET]: Network.ARBITRUM,
  [NetworkIds.OPTIMISMMAINNET]: Network.OPTIMISM,
  [NetworkIds.BASEMAINNET]: Network.BASE,
  [NetworkIds.GOERLI]: Network.GOERLI,
}

export const defaultLendingCumulatives = {
  borrowCumulativeDepositUSD: zero,
  borrowCumulativeDepositInQuoteToken: zero,
  borrowCumulativeDepositInCollateralToken: zero,
  borrowCumulativeWithdrawUSD: zero,
  borrowCumulativeWithdrawInQuoteToken: zero,
  borrowCumulativeWithdrawInCollateralToken: zero,
  borrowCumulativeCollateralDeposit: zero,
  borrowCumulativeCollateralWithdraw: zero,
  borrowCumulativeDebtDeposit: zero,
  borrowCumulativeDebtWithdraw: zero,
  borrowCumulativeFeesUSD: zero,
  borrowCumulativeFeesInQuoteToken: zero,
  borrowCumulativeFeesInCollateralToken: zero,
}

export const defaultEarnCumulatives = {
  earnCumulativeDepositUSD: zero,
  earnCumulativeDepositInQuoteToken: zero,
  earnCumulativeDepositInCollateralToken: zero,
  earnCumulativeWithdrawUSD: zero,
  earnCumulativeWithdrawInQuoteToken: zero,
  earnCumulativeWithdrawInCollateralToken: zero,
  earnCumulativeFeesUSD: zero,
  earnCumulativeFeesInQuoteToken: zero,
  earnCumulativeFeesInCollateralToken: zero,
  earnCumulativeQuoteTokenDeposit: zero,
  earnCumulativeQuoteTokenWithdraw: zero,
}

export const omniDefaultOverviewSimulationDeposit = new BigNumber(100)

export const omniYieldLoopMaxRiskLtvDefaultOffset = new BigNumber(0.02)

// Default response to avoid unnecessary API calls if automation is not available on given protocol
export const omniPositionTriggersDataDefault: GetTriggersResponse = {
  triggers: {
    aave3: {},
    spark: {},
  },
  flags: {
    aave3: {
      isBasicBuyEnabled: false,
      isBasicSellEnabled: false,
      isPartialTakeProfitEnabled: false,
      isStopLossEnabled: false,
      isTrailingStopLossEnabled: false,
    },
    spark: {
      isBasicBuyEnabled: false,
      isBasicSellEnabled: false,
      isPartialTakeProfitEnabled: false,
      isStopLossEnabled: false,
      isTrailingStopLossEnabled: false,
    },
  },
  triggerGroup: {},
  triggersCount: 0,
}

export const omniProtectionLikeAutomationFeatures = [
  AutomationFeatures.STOP_LOSS,
  AutomationFeatures.AUTO_SELL,
  AutomationFeatures.TRAILING_STOP_LOSS,
]

export const omniOptimizationLikeAutomationFeatures = [
  AutomationFeatures.AUTO_BUY,
  AutomationFeatures.AUTO_TAKE_PROFIT,
  AutomationFeatures.CONSTANT_MULTIPLE,
  AutomationFeatures.PARTIAL_TAKE_PROFIT,
]

export const MAX_SENSIBLE_LTV = new BigNumber(0.99)
