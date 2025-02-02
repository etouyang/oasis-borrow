import { OmniProductType } from 'features/omni-kit/types'
import { PositionType } from 'summerfi-sdk-common'

export const omniProductTypeToSDKType = (type: OmniProductType): PositionType => {
  switch (type) {
    case OmniProductType.Borrow:
      return PositionType.Borrow
    case OmniProductType.Multiply:
      return PositionType.Multiply
    default:
      throw new Error(`Unknown vault type: ${type}`)
  }
}
