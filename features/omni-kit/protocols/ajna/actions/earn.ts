import type {
  AjnaCommonDependencies,
  AjnaCommonPayload,
  AjnaEarnPosition,
} from '@oasisdex/dma-library'
import { strategies } from '@oasisdex/dma-library'
import type BigNumber from 'bignumber.js'
import { omniPaybackAllWithdrawAllValueOffset } from 'features/omni-kit/constants'
import { getAjnaEarnData, getAjnaEarnWithdrawMax } from 'features/omni-kit/protocols/ajna/helpers'
import type { AjnaGenericPosition } from 'features/omni-kit/protocols/ajna/types'
import type { OmniEarnFormState } from 'features/omni-kit/state/earn'
import { one, zero } from 'helpers/zero'

export const ajnaActionOpenEarn = ({
  state,
  commonPayload,
  dependencies,
  chainId,
  price,
}: {
  state: OmniEarnFormState
  commonPayload: AjnaCommonPayload
  dependencies: AjnaCommonDependencies
  chainId: number
  price?: BigNumber
}) => {
  const { depositAmount } = state

  return strategies.ajna.earn.open(
    {
      ...commonPayload,
      price: price!,
      quoteAmount: depositAmount!,
    },
    {
      ...dependencies,
      getEarnData: getAjnaEarnData(chainId),
    },
  )
}

export const ajnaActionDepositEarn = ({
  state,
  commonPayload,
  dependencies,
  position,
  price,
}: {
  state: OmniEarnFormState
  commonPayload: AjnaCommonPayload
  dependencies: AjnaCommonDependencies
  position: AjnaGenericPosition
  price?: BigNumber
}) => {
  const { depositAmount } = state

  return strategies.ajna.earn.depositAndAdjust(
    {
      ...commonPayload,
      price: price!,
      collateralAmount: zero,
      quoteAmount: depositAmount || zero,
      position: position as AjnaEarnPosition,
    },
    dependencies,
  )
}

export const ajnaActionWithdrawEarn = ({
  state,
  commonPayload,
  dependencies,
  position,
  price,
}: {
  state: OmniEarnFormState
  commonPayload: AjnaCommonPayload
  dependencies: AjnaCommonDependencies
  position: AjnaGenericPosition
  price?: BigNumber
}) => {
  const { withdrawAmount, withdrawAmountMax } = state
  const ajnaEarnPosition = position as AjnaEarnPosition

  const isWithdrawingAllWithoutClosing =
    withdrawAmountMax && state.withdrawAmount?.lt(ajnaEarnPosition.quoteTokenAmount)

  const resolvedWithdrawAmount =
    isWithdrawingAllWithoutClosing && withdrawAmount
      ? getAjnaEarnWithdrawMax({
          quoteTokenAmount: withdrawAmount.times(one.minus(omniPaybackAllWithdrawAllValueOffset)),
          digits: commonPayload.quoteTokenPrecision,
        })
      : withdrawAmount || zero

  return strategies.ajna.earn.withdrawAndAdjust(
    {
      ...commonPayload,
      price: price!,
      collateralAmount: zero,
      quoteAmount: resolvedWithdrawAmount,
      position: ajnaEarnPosition,
    },
    dependencies,
  )
}

export const ajnaClaimEarn = ({
  commonPayload,
  dependencies,
  position,
  price,
}: {
  commonPayload: AjnaCommonPayload
  dependencies: AjnaCommonDependencies
  position: AjnaGenericPosition
  price?: BigNumber
}) => {
  return strategies.ajna.earn.claimCollateral(
    {
      ...commonPayload,
      price: price!,
      collateralAmount: zero,
      quoteAmount: zero,
      position: position as AjnaEarnPosition,
    },
    dependencies,
  )
}
