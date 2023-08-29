import { NetworkNames } from 'blockchain/networks'
import { ProductHubItemWithoutAddress, ProductHubProductType } from 'features/productHub/types'
import { LendingProtocol } from 'lendingProtocols'

export const aaveV3ProductHubProducts: ProductHubItemWithoutAddress[] = [
  // ethereum products
  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WSTETH/ETH',
    earnStrategy: 'WSTETH/ETH Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'WSTETH',
    label: 'WSTETH/ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'RETH/ETH',
    earnStrategy: 'RETH/ETH Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'RETH',
    label: 'RETH/ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'CBETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'CBETH/ETH',
    earnStrategy: 'RETH/ETH Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'CBETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'ETH',
    depositToken: 'CBETH',
    label: 'CBETH/ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'ETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long ETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'ETH',
    label: 'ETH/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'CBETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'CBETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'CBETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long CBETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'CBETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'CBETH',
    label: 'CBETH/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'CBETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'CBETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'CBETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long CBETH',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'USDC',
    depositToken: 'WBTC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WBTC/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WBTC',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'USDC',
    depositToken: 'WBTC',
    label: 'WBTC/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'WSTETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WSTETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WSTETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'WSTETH',
    label: 'WSTETH/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  // arbitrum products
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.arbitrumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'ETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long ETH',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.arbitrumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WSTETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WSTETH',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'USDC',
    network: NetworkNames.arbitrumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WBTC/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WBTC',
  },
  // optimism products
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.optimismMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'ETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long ETH',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.optimismMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WSTETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WSTETH',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'USDC',
    network: NetworkNames.optimismMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WBTC/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WBTC',
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'DAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'DAI/ETH',
    multiplyStrategyType: 'short',
    multiplyStrategy: 'Short ETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'DAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'ETH',
    depositToken: 'DAI',
    label: 'DAI/ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'DAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'WBTC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'DAI/WBTC',
    multiplyStrategyType: 'short',
    multiplyStrategy: 'Short WBTC',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'DAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'WBTC',
    depositToken: 'DAI',
    label: 'DAI/WBTC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'ETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long ETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'ETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'ETH',
    label: 'ETH/DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'RETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long rETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'RETH',
    label: 'RETH/DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'RETH/USDC',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long rETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'RETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'USDC',
    depositToken: 'RETH',
    label: 'RETH/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'USDC',
    primaryTokenGroup: 'USDC',
    secondaryToken: 'ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'USDC/ETH',
    multiplyStrategyType: 'short',
    multiplyStrategy: 'Short ETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'USDC',
    primaryTokenGroup: 'USDC',
    secondaryToken: 'ETH',
    depositToken: 'USDC',
    label: 'USDC/ETH',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'USDC',
    primaryTokenGroup: 'USDC',
    secondaryToken: 'WBTC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'USDC/WBTC',
    multiplyStrategyType: 'short',
    multiplyStrategy: 'Short WBTC',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'USDC',
    primaryTokenGroup: 'USDC',
    secondaryToken: 'WBTC',
    depositToken: 'USDC',
    label: 'USDC/WBTC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WBTC/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WBTC',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'WBTC',
    primaryTokenGroup: 'BTC',
    secondaryToken: 'DAI',
    depositToken: 'WBTC',
    label: 'WBTC/DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Multiply],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'WSTETH/DAI',
    multiplyStrategyType: 'long',
    multiplyStrategy: 'Long WSTETH',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'WSTETH',
    primaryTokenGroup: 'ETH',
    secondaryToken: 'DAI',
    depositToken: 'WSTETH',
    label: 'WSTETH/DAI',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'SDAI/USDC',
    earnStrategy: 'SDAI/USDC Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'USDC',
    depositToken: 'SDAI',
    label: 'SDAI/USDC',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'GHO',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'SDAI/GHO',
    earnStrategy: 'SDAI/GHO Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'GHO',
    depositToken: 'SDAI',
    label: 'SDAI/GHO',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },

  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'LUSD',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'SDAI/LUSD',
    earnStrategy: 'SDAI/LUSD Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'LUSD',
    depositToken: 'SDAI',
    label: 'SDAI/LUSD',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },

  {
    product: [ProductHubProductType.Earn],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'FRAX',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
    label: 'SDAI/FRAX',
    earnStrategy: 'SDAI/FRAX Yield Loop',
    managementType: 'active',
  },
  {
    product: [ProductHubProductType.Borrow],
    primaryToken: 'SDAI',
    primaryTokenGroup: 'DAI',
    secondaryToken: 'FRAX',
    depositToken: 'SDAI',
    label: 'SDAI/FRAX',
    network: NetworkNames.ethereumMainnet,
    protocol: LendingProtocol.AaveV3,
  },
]
