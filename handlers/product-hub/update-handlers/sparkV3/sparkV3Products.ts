import { EarnStrategies } from '@prisma/client'
import { NetworkNames } from 'blockchain/networks'
import { OmniProductType } from 'features/omni-kit/types'
import type { ProductHubItemWithoutAddress } from 'features/productHub/types'
import { LendingProtocol } from 'lendingProtocols'

export const sparkV3ProductHubProducts: ProductHubItemWithoutAddress[] = [
  {
    product: [OmniProductType.Multiply],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'WSTETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WSTETH',
  },
  {
    product: [OmniProductType.Multiply],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'RETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long RETH',
  },
  {
    product: [OmniProductType.Multiply],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'ETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long ETH',
  },
  {
    product: [OmniProductType.Multiply],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'ETH',
    depositToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'SDAI/ETH',
    multiplyStrategyType: 'short',
    multiplyStrategy: 'Short ETH',
  },
  {
    product: [OmniProductType.Borrow],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'WSTETH/DAI',
  },
  {
    product: [OmniProductType.Borrow],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'RETH/DAI',
  },
  {
    product: [OmniProductType.Borrow],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'ETH/DAI',
  },
  {
    product: [OmniProductType.Borrow],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'ETH',
    depositToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'SDAI/ETH',
  },
  {
    product: [OmniProductType.Earn],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'WSTETH/ETH',
    earnStrategy: EarnStrategies.yield_loop,
    earnStrategyDescription: 'WSTETH/ETH Yield Loop',
    managementType: 'active',
  },
  {
    product: [OmniProductType.Earn],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'RETH/ETH',
    earnStrategy: EarnStrategies.yield_loop,
    earnStrategyDescription: 'RETH/ETH Yield Loop',
    managementType: 'active',
  },
  {
    product: [OmniProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'USDC',
    depositToken: 'SDAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'SDAI/USDC',
    earnStrategy: EarnStrategies.yield_loop,
    earnStrategyDescription: 'SDAI/USDC Yield Loop',
    managementType: 'active',
  },
  {
    product: [OmniProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'USDT',
    depositToken: 'SDAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'SDAI/USDT',
    earnStrategy: EarnStrategies.yield_loop,
    earnStrategyDescription: 'SDAI/USDT Yield Loop',
    managementType: 'active',
  },
  {
    product: [OmniProductType.Multiply],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'WBTC/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WBTC',
  },
  {
    product: [OmniProductType.Borrow],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'DAI',
    depositToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.SparkV3,
    label: 'WBTC/DAI',
  },
]
