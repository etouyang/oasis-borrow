import type BigNumber from 'bignumber.js'
import type { OmniContentCardBase } from 'features/omni-kit/components/details-section'
import { formatCryptoBalance, formatUsdValue } from 'helpers/formatters/format'
import { zero } from 'helpers/zero'
import type { ReactNode } from 'react'

interface OmniCardDataTokensValueParams {
  afterTokensAmount?: BigNumber
  modal?: ReactNode
  tokensAmount: BigNumber
  tokensPrice?: BigNumber
  tokensSymbol: string
  translationCardName: string
  usdAsDefault?: boolean
}

export function useOmniCardDataTokensValue({
  afterTokensAmount,
  modal,
  tokensAmount,
  tokensPrice,
  tokensSymbol,
  translationCardName,
  usdAsDefault,
}: OmniCardDataTokensValueParams): OmniContentCardBase {
  const value =
    usdAsDefault && tokensPrice
      ? formatUsdValue(tokensAmount.times(tokensPrice))
      : formatCryptoBalance(tokensAmount)

  return {
    title: { key: `omni-kit.content-card.${translationCardName}.title`, values: { tokensSymbol } },
    value,
    ...((!usdAsDefault || !tokensPrice) && {
      unit: tokensSymbol,
    }),
    ...(afterTokensAmount && {
      change: ['', formatCryptoBalance(afterTokensAmount), tokensSymbol],
    }),
    ...(!usdAsDefault &&
      tokensAmount.gt(zero) &&
      tokensPrice && {
        footnote: [formatUsdValue(tokensAmount.times(tokensPrice))],
      }),
    modal,
  }
}
