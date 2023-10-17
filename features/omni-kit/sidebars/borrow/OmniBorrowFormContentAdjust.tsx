import { OmniAdjustSlider } from 'features/omni-kit/common/sidebars/OmniAdjustSlider'
import { OmniFormContentSummary } from 'features/omni-kit/common/sidebars/OmniFormContentSummary'
import { useOmniProductContext } from 'features/omni-kit/contexts/OmniProductContext'
import { OmniBorrowFormOrder } from 'features/omni-kit/sidebars/borrow/OmniBorrowFormOrder'
import React from 'react'

export function OmniBorrowFormContentAdjust() {
  const {
    form: {
      state: { loanToValue },
    },
    position: {
      currentPosition: { position },
    },
  } = useOmniProductContext('borrow')

  return (
    <>
      <OmniAdjustSlider />
      {loanToValue && !position.riskRatio.loanToValue.eq(loanToValue) && (
        <OmniFormContentSummary>
          <OmniBorrowFormOrder />
        </OmniFormContentSummary>
      )}
    </>
  )
}
