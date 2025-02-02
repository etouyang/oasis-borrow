import { OmniProductType } from 'features/omni-kit/types'
import { PositionType } from 'summerfi-sdk-common'

export const positionTypeToOmniProductType = (vaultType: PositionType): OmniProductType => {
  switch (vaultType) {
    case PositionType.Borrow:
      return OmniProductType.Borrow
    case PositionType.Multiply:
      return OmniProductType.Multiply
    default:
      throw new Error(`Unknown vault type: ${vaultType}`)
  }
}
