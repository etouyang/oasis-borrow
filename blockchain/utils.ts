import { BigNumber } from 'bignumber.js'
import { RAD, RAY, WAD } from 'components/constants'
import padEnd from 'lodash/padEnd'
import ethAbi, { AbiCoder } from 'web3-eth-abi'

import { getToken } from './tokensMetadata'

// Set global decimals places to the minimum unit we operate on
BigNumber.config({ DECIMAL_PLACES: 45 })

export function amountFromRay(amount: BigNumber): BigNumber {
  return amount.div(RAY).decimalPlaces(RAY.toString().length)
}

export function amountFromRad(amount: BigNumber): BigNumber {
  return amount.div(RAD).decimalPlaces(RAD.toString().length)
}

export function funcSigTopic(v: string): string {
  // TODO remove when following issue will be fixed
  // https://github.com/ChainSafe/web3.js/pull/3587
  return padEnd(((ethAbi as unknown) as AbiCoder).encodeFunctionSignature(v), 66, '0')
}

export function amountToWei(amount: BigNumber, token: string): BigNumber {
  const { precision } = getToken(token)
  return amount.times(new BigNumber(10).pow(precision))
}

export function amountFromWei(amount: BigNumber, token: string): BigNumber {
  const { precision } = getToken(token)
  return amount.div(new BigNumber(10).pow(precision))
}

export function amountToWad(amount: BigNumber): BigNumber {
  return amount.times(WAD)
}

export function amountToWeiRoundDown(amount: BigNumber, token: string): BigNumber {
  const { precision } = getToken(token)
  return amount.times(new BigNumber(10).pow(precision)).decimalPlaces(0, BigNumber.ROUND_DOWN)
}
