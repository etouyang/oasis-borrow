import type BigNumber from 'bignumber.js'
import type { OmniContentCardBase } from 'features/omni-kit/components/details-section'
import { formatDecimalAsPercent } from 'helpers/formatters/format'
import type { ReactNode } from 'react'

interface OmniCardDataLtvParams {
  afterLtv?: BigNumber
  ltv: BigNumber
  maxLtv?: BigNumber
  modal?: ReactNode
}

export function useOmniCardDataLtv({
  afterLtv,
  ltv,
  maxLtv,
  modal,
}: OmniCardDataLtvParams): OmniContentCardBase {
  return {
    title: { key: 'omni-kit.content-card.ltv.title' },
    value: formatDecimalAsPercent(ltv),
    ...(afterLtv && {
      change: [formatDecimalAsPercent(afterLtv)],
    }),
    ...(maxLtv && {
      footnote: [{ key: 'omni-kit.content-card.ltv.footnote' }, formatDecimalAsPercent(maxLtv)],
    }),
    modal,
  }
}
