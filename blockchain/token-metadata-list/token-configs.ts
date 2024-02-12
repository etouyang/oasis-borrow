import type { TokenConfig } from 'blockchain/TokenConfig'
import {
  aave_circle_color,
  ajna_circle_color,
  arb,
  arb_circle,
  bal,
  bal_circle,
  bat,
  bat_circle_color,
  cbeth_circle_color,
  chainlink,
  chainlink_circle_color,
  compound,
  compound_circle_color,
  crv,
  crv_circle,
  dai,
  dai_circle_color,
  deprecated_icon,
  ether,
  ether_circle_color,
  frax_circle_color,
  gemini,
  gemini_circle_color,
  gho_circle_color,
  gno_circle_color,
  guniv3_dai_usdc1_circles_color,
  kyber,
  kyber_circle_color,
  ldo,
  ldo_circle,
  lrc,
  lrc_circle_color,
  lusd_circle_color,
  mana,
  mana_circle_color,
  matic_circle_color,
  mkr_circle_color,
  op,
  op_circle,
  oseth_circle_color,
  pax,
  pax_circle_color,
  rbn_circle_color,
  renbtc_circle_color,
  reth_circle_color,
  rpl,
  rpl_circle,
  sdai_circle_color,
  spark_circle_color,
  steth_circle_color,
  styeth_circle_color,
  susd,
  susd_circle,
  tbtc_circle_color,
  tusd,
  tusd_circle_color,
  uni_circle_color,
  univ2_dai_usdc_circles_color,
  univ2_dai_usdt_circles_color,
  univ2_eth_usdt_circles_color,
  univ2_usdc_eth_circles_color,
  usdc,
  usdc_circle_color,
  usdp_circle_color,
  usdt,
  usdt_circle_color,
  wbtc,
  wbtc_circle_color,
  weeth_circle_color,
  weth_circle_color,
  wld_circle_color,
  wsteth_circle_color,
  yfi_circle_color,
  yieldbtc_circle_color,
  yieldeth_circle_color,
  zerox,
  zerox_circle_color,
} from 'theme/icons'

const deprecatedTokens = [
  'UNIV2WBTCETH',
  'UNIV2LINKETH',
  'UNIV2UNIETH',
  'UNIV2WBTCDAI',
  'UNIV2AAVEETH',
  'CRVV1ETHSTETH',
]

export const tokenConfigs: TokenConfig[] = [
  {
    symbol: 'USDP',
    precision: 18,
    digits: 5,
    name: 'Pax Dollar',
    icon: usdp_circle_color,
    iconCircle: usdp_circle_color,
    coinpaprikaTicker: 'usdp-paxos-standard-token',
    coinGeckoTicker: 'paxos-standard',
    tags: [],
  },
  {
    symbol: 'STETH',
    precision: 18,
    digits: 5,
    name: 'Lido Staked ETH',
    icon: steth_circle_color,
    iconCircle: steth_circle_color,
    coinpaprikaTicker: 'steth-lido-staked-ether',
    coinGeckoTicker: 'staked-ether',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'MKR',
    precision: 18,
    digits: 5,
    name: 'Maker',
    icon: mkr_circle_color,
    iconCircle: mkr_circle_color,
    coinpaprikaTicker: 'mkr-maker',
    coinbaseTicker: 'mkr-usd',
    tags: [],
  },
  {
    symbol: 'WETH',
    precision: 18,
    digits: 5,
    name: 'Wrapped Ether',
    icon: weth_circle_color,
    iconCircle: weth_circle_color,
    coinpaprikaTicker: 'weth-weth',
    coinpaprikaFallbackTicker: 'eth-ethereum',
    coinGeckoTicker: 'weth',
    tags: [],
  },
  {
    symbol: 'ETH',
    precision: 18,
    digits: 5,
    maxSell: '10000000',
    name: 'Ether',
    icon: ether,
    iconCircle: ether_circle_color,
    coinpaprikaTicker: 'eth-ethereum',
    coinbaseTicker: 'eth-usd',
    coinGeckoId: 'ethereum',
    tags: [],
  },
  {
    symbol: 'WBTC',
    precision: 8,
    digits: 5,
    digitsInstant: 3,
    safeCollRatio: 1.5,
    maxSell: '1000000000000000',
    name: 'Wrapped Bitcoin',
    icon: wbtc,
    iconCircle: wbtc_circle_color,
    coinpaprikaTicker: 'wbtc-wrapped-bitcoin',
    coinGeckoId: 'wrapped-bitcoin',
    coinGeckoTicker: 'wrapped-bitcoin',
    tags: [],
    rootToken: 'BTC',
  },
  {
    symbol: 'MANA',
    precision: 18,
    digits: 5,
    name: 'Decentraland',
    icon: mana,
    iconCircle: mana_circle_color,
    coinbaseTicker: 'mana-usd',
    coinGeckoId: 'decentraland',
    tags: [],
  },
  {
    symbol: 'LINK',
    precision: 18,
    digits: 5,
    name: 'Chainlink',
    icon: chainlink,
    iconCircle: chainlink_circle_color,
    coinbaseTicker: 'link-usd',
    coinGeckoId: 'chainlink',
    tags: [],
  },
  {
    symbol: 'GUSD',
    precision: 2,
    digits: 2,
    name: 'Gemini dollar',
    icon: gemini,
    iconCircle: gemini_circle_color,
    coinpaprikaTicker: 'gusd-gemini-dollar',
    coinGeckoId: 'gemini-dollar',
    coinGeckoTicker: 'gemini-dollar',
    tags: ['stablecoin'],
  },
  {
    symbol: 'YFI',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Yearn',
    icon: usdc,
    iconCircle: yfi_circle_color,
    coinbaseTicker: 'yfi-usd',
    coinGeckoId: 'yearn-finance',
    tags: [],
  },
  {
    symbol: 'MATIC',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'MATIC',
    icon: matic_circle_color,
    iconCircle: matic_circle_color,
    coinbaseTicker: 'matic-usd',
    coinGeckoId: 'polygon',
    tags: [],
  },
  {
    symbol: 'UNIV2DAIETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIETH',
    icon: deprecated_icon,
    iconCircle: deprecated_icon,
    tags: ['lp-token'],
  },
  {
    symbol: 'WSTETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'WSTETH',
    icon: wsteth_circle_color,
    iconCircle: wsteth_circle_color,
    coinGeckoTicker: 'wrapped-steth',
    coinGeckoId: 'wrapped-steth',
    oracleTicker: 'wsteth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'CBETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Coinbase Wrapped Staked ETH',
    icon: cbeth_circle_color,
    iconCircle: cbeth_circle_color,
    //TODO: replace with values provided by design team - so far content is duplicated from ETH
    coinbaseTicker: 'cbeth-usd',
    coinGeckoTicker: 'coinbase-wrapped-staked-eth',
    coinpaprikaTicker: 'cbeth-coinbase-wrapped-staked-eth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'BAT',
    precision: 18,
    digits: 5,
    name: 'Basic Attention Token',
    icon: bat,
    iconCircle: bat_circle_color,
    tags: [],
  },
  {
    symbol: 'RENBTC',
    precision: 8,
    digits: 5,
    digitsInstant: 3,
    safeCollRatio: 1.5,
    maxSell: '1000000000000000',
    name: 'renBTC',
    icon: renbtc_circle_color,
    iconCircle: renbtc_circle_color,
    coinpaprikaTicker: 'renbtc-renbtc',
    coinGeckoId: 'renbtc',
    tags: [],
    rootToken: 'BTC',
  },
  {
    symbol: 'TUSD',
    precision: 18,
    digits: 2,
    name: 'Trust token',
    icon: tusd,
    iconCircle: tusd_circle_color,
    tags: ['stablecoin'],
  },
  {
    symbol: 'KNC',
    precision: 18,
    digits: 5,
    name: 'Kyber Network',
    icon: kyber,
    iconCircle: kyber_circle_color,
    tags: [],
  },
  {
    symbol: 'PAXUSD',
    precision: 18,
    digits: 2,
    name: 'Paxos Standard',
    icon: pax,
    iconCircle: pax_circle_color,
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDT',
    precision: 6,
    digits: 2,
    name: 'Tether',
    icon: usdt,
    iconCircle: usdt_circle_color,
    tags: ['stablecoin'],
    coinpaprikaTicker: 'usdt-tether',
    coinGeckoTicker: 'tether',
  },
  {
    symbol: 'COMP',
    precision: 18,
    digits: 5,
    name: 'Compound',
    icon: compound,
    iconCircle: compound_circle_color,
    tags: [],
  },
  {
    symbol: 'LRC',
    precision: 18,
    digits: 5,
    name: 'Loopring',
    icon: lrc,
    iconCircle: lrc_circle_color,
    tags: [],
  },
  {
    symbol: 'ZRX',
    precision: 18,
    digits: 5,
    name: '0x',
    icon: zerox,
    iconCircle: zerox_circle_color,
    tags: [],
  },
  {
    symbol: 'USDC',
    precision: 6,
    digits: 2,
    digitsInstant: 2,
    maxSell: '1000000000000000',
    name: 'USD Coin',
    icon: usdc,
    iconCircle: usdc_circle_color,
    coinpaprikaTicker: 'usdc-usd-coin',
    coinGeckoTicker: 'usd-coin',
    tags: ['stablecoin'],
  },
  {
    symbol: 'UNI',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Uniswap',
    icon: uni_circle_color,
    iconCircle: uni_circle_color,
    coinbaseTicker: 'uni-usd',
    tags: [],
  },
  {
    symbol: 'AAVE',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Aave',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave',
    tags: [],
  },
  {
    symbol: 'UNIV2USDCETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2USDCETH',
    icon: univ2_usdc_eth_circles_color,
    iconCircle: univ2_usdc_eth_circles_color,
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2DAIUSDC',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIUSDC',
    icon: univ2_dai_usdc_circles_color,
    iconCircle: univ2_dai_usdc_circles_color,
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2ETHUSDT',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2ETHUSDT',
    icon: univ2_eth_usdt_circles_color,
    iconCircle: univ2_eth_usdt_circles_color,
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2DAIUSDT',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIUSDT',
    icon: univ2_dai_usdt_circles_color,
    iconCircle: univ2_dai_usdt_circles_color,
    tags: ['lp-token'],
  },
  {
    symbol: 'GUNIV3DAIUSDC1',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'GUNIV3 DAI / USDC 0.05%',
    icon: guniv3_dai_usdc1_circles_color,
    iconCircle: guniv3_dai_usdc1_circles_color,
    tags: ['lp-token'],
    token0: 'DAI',
    token1: 'USDC',
  },
  {
    symbol: 'GUNIV3DAIUSDC2',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'GUNIV3 DAI / USDC 0.01%',
    icon: guniv3_dai_usdc1_circles_color,
    iconCircle: guniv3_dai_usdc1_circles_color,
    tags: ['lp-token'],
    token0: 'DAI',
    token1: 'USDC',
  },
  {
    symbol: 'DAI',
    precision: 18,
    digits: 4,
    maxSell: '10000000',
    name: 'Dai',
    icon: dai,
    iconCircle: dai_circle_color,
    coinpaprikaTicker: 'dai-dai',
    coinGeckoTicker: 'dai',
    coinbaseTicker: 'dai-usd',
    tags: ['stablecoin'],
  },
  {
    symbol: 'RETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Rocket Pool ETH',
    icon: reth_circle_color,
    iconCircle: reth_circle_color,
    coinGeckoTicker: 'rocket-pool-eth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'GNO',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Gnosis',
    icon: gno_circle_color,
    iconCircle: gno_circle_color,
    coinGeckoTicker: 'gnosis',
    tags: [],
  },
  {
    symbol: 'GHO',
    precision: 18,
    digits: 5,
    name: 'GHO',
    icon: gho_circle_color,
    iconCircle: gho_circle_color,
    coinGeckoTicker: 'gho',
    coinpaprikaTicker: 'gho-gho',
    tags: ['stablecoin'],
  },
  {
    symbol: 'SDAI',
    precision: 18,
    digits: 4,
    name: 'Savings Dai',
    icon: gho_circle_color,
    iconCircle: sdai_circle_color,
    oracleTicker: 'sdai',
    rootToken: 'DAI',
    tags: [],
  },
  {
    symbol: 'TBTC',
    precision: 18,
    digits: 5,
    name: 'Threshold Bitcoin',
    icon: tbtc_circle_color,
    iconCircle: tbtc_circle_color,
    coinbaseTicker: 'btc-usd',
    coinGeckoTicker: 'bitcoin',
    coinpaprikaTicker: 'btc-bitcoin',
    rootToken: 'BTC',
    tags: [],
  },
  {
    symbol: 'WLD',
    precision: 18,
    digits: 5,
    name: 'Worldcoin',
    icon: wld_circle_color,
    iconCircle: wld_circle_color,
    coinGeckoTicker: 'worldcoin-wld',
    coinpaprikaTicker: 'wld-worldcoin',
    tags: [],
  },
  {
    symbol: 'YIELDETH',
    precision: 18,
    digits: 5,
    name: 'Real Yield ETH',
    icon: yieldeth_circle_color,
    iconCircle: yieldeth_circle_color,
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'YIELDBTC',
    precision: 18,
    digits: 5,
    name: 'Real Yield BTC',
    icon: yieldbtc_circle_color,
    iconCircle: yieldbtc_circle_color,
    rootToken: 'BTC',
    tags: [],
  },
  {
    symbol: 'LUSD',
    precision: 18,
    digits: 5,
    name: 'Liquitity USD',
    icon: lusd_circle_color,
    iconCircle: lusd_circle_color,
    coinpaprikaTicker: 'lusd-liquity-usd',
    coinGeckoTicker: 'lusd',
    tags: ['stablecoin'],
  },
  {
    symbol: 'FRAX',
    precision: 18,
    digits: 5,
    name: 'Liquitity USD',
    icon: frax_circle_color,
    iconCircle: frax_circle_color,
    coinpaprikaTicker: 'frax-frax',
    coinGeckoTicker: 'frax',
    tags: ['stablecoin'],
  },
  {
    symbol: 'SPARK',
    precision: 18,
    digits: 5,
    name: 'Spark',
    icon: spark_circle_color,
    iconCircle: spark_circle_color,
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDBC',
    precision: 6,
    digits: 2,
    name: 'USD Base Coin',
    icon: usdc_circle_color,
    iconCircle: usdc_circle_color,
    coinbaseTicker: 'usd-base-coin',
    coinGeckoTicker: 'bridged-usd-coin-base',
    coinpaprikaTicker: 'usdbc-usd-base-coin',
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDC.E',
    precision: 6,
    digits: 2,
    digitsInstant: 2,
    maxSell: '1000000000000000',
    name: 'Bridged USD Coin',
    icon: usdc,
    iconCircle: usdc_circle_color,
    coinpaprikaTicker: 'usdc-usd-coin',
    coinGeckoTicker: 'usd-coin',
    tags: ['stablecoin'],
  },
  {
    symbol: 'RPL',
    precision: 18,
    digits: 5,
    name: 'Rocket Pool',
    icon: rpl,
    iconCircle: rpl_circle,
    coinGeckoTicker: 'rocket-pool',
    tags: [],
  },
  {
    symbol: 'CRV',
    precision: 18,
    digits: 5,
    name: 'Curve',
    icon: crv,
    iconCircle: crv_circle,
    coinGeckoTicker: 'curve-dao-token',
    tags: [],
  },
  {
    symbol: 'BAL',
    precision: 18,
    digits: 5,
    name: 'Balancer',
    icon: bal,
    iconCircle: bal_circle,
    coinGeckoTicker: 'balancer',
    tags: [],
  },
  {
    symbol: 'LDO',
    precision: 18,
    digits: 5,
    name: 'Lido DAO',
    icon: ldo,
    iconCircle: ldo_circle,
    coinGeckoTicker: 'lido-dao',
    tags: [],
  },
  {
    symbol: 'SUSD',
    precision: 18,
    digits: 5,
    name: 'Synth sUSD',
    icon: susd,
    iconCircle: susd_circle,
    coinGeckoTicker: 'nusd',
    tags: [],
  },
  {
    symbol: 'OP',
    precision: 18,
    digits: 5,
    name: 'Optimism',
    icon: op,
    iconCircle: op_circle,
    coinGeckoTicker: 'optimism',
    tags: [],
  },
  {
    symbol: 'ARB',
    precision: 18,
    digits: 5,
    name: 'Arbitrum',
    icon: arb,
    iconCircle: arb_circle,
    coinGeckoTicker: 'arbitrum',
    tags: [],
  },
  {
    symbol: 'STYETH',
    precision: 18,
    digits: 5,
    name: 'Staked Yearn Ether',
    icon: styeth_circle_color,
    iconCircle: styeth_circle_color,
    coinGeckoTicker: 'staked-yearn-ether',
    coinbaseTicker: '',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'AJNA',
    precision: 18,
    digits: 5,
    name: 'AjnaToken',
    icon: ajna_circle_color,
    iconCircle: ajna_circle_color,
    coinGeckoTicker: 'ajna-protocol',
    coinbaseTicker: '',
    rootToken: 'AJNA',
    tags: [],
  },
  {
    symbol: 'RBN',
    precision: 18,
    digits: 5,
    name: 'Ribbon',
    icon: rbn_circle_color,
    iconCircle: rbn_circle_color,
    coinGeckoTicker: 'ribbon-finance',
    coinbaseTicker: '',
    rootToken: 'RBN',
    tags: [],
  },
  {
    symbol: 'OSETH',
    precision: 18,
    digits: 5,
    name: 'Staked ETH',
    icon: oseth_circle_color,
    iconCircle: oseth_circle_color,
    coinGeckoTicker: 'stakewise-v3-oseth',
    coinbaseTicker: '',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'WEETH',
    precision: 18,
    digits: 5,
    name: 'Wrapped eETH',
    icon: weeth_circle_color,
    iconCircle: weeth_circle_color,
    coinGeckoTicker: 'wrapped-eeth',
    coinbaseTicker: '',
    rootToken: 'ETH',
    tags: [],
  },
  ...deprecatedTokens.map((deprecatedToken) => ({
    symbol: deprecatedToken,
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: deprecatedToken,
    icon: deprecated_icon,
    iconCircle: deprecated_icon,
    tags: [],
  })),
]
