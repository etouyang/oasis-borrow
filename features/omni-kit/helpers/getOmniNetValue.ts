import type { OmniNetValuePnlData, OmniNetValuePnlDataReturnType } from 'features/omni-kit/helpers'
import { OmniProductType } from 'features/omni-kit/types'

export const getOmniNetValue = ({
  productType,
  collateralTokenPrice,
  debtTokenPrice,
  netValueInCollateralToken,
  netValueInDebtToken,
  collateralToken,
  debtToken,
  useDebtTokenAsPnL = false,
}: OmniNetValuePnlData) => {
  switch (productType) {
    case OmniProductType.Multiply:
    case OmniProductType.Borrow: {
      if (useDebtTokenAsPnL) {
        return {
          netValueToken: debtToken,
          netValueTokenPrice: debtTokenPrice,
          inToken: netValueInDebtToken,
          inUsd: netValueInDebtToken.times(debtTokenPrice),
        } as OmniNetValuePnlDataReturnType['netValue']
      }

      return {
        netValueToken: collateralToken,
        netValueTokenPrice: collateralTokenPrice,
        inToken: netValueInCollateralToken,
        inUsd: netValueInCollateralToken.times(collateralTokenPrice),
      } as OmniNetValuePnlDataReturnType['netValue']
    }
    case OmniProductType.Earn: {
      return {
        netValueToken: debtToken,
        netValueTokenPrice: debtTokenPrice,
        inToken: netValueInDebtToken,
        inUsd: netValueInDebtToken.times(debtTokenPrice),
      } as OmniNetValuePnlDataReturnType['netValue']
    }
  }
}
