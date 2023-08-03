import {
  ProductHubItem,
  ProductHubProductType,
  ProductHubPromoCards,
} from 'features/productHub/types'
import {
  getAjnaPromoCards,
  promoCardHowToUseBorrowOnAjna,
  promoCardsWhatAreAjnaRewards,
  promoCardWhatIsEarnOnAjna,
} from 'handlers/product-hub/promo-cards/collections'

export default function (table: ProductHubItem[]): ProductHubPromoCards {
  const {
    promoCardETHDAIAjnaBorrow,
    promoCardETHUSDCAjnaBorrow,
    promoCardGHODAIAjnaBorrow,
    promoCardSDAIUSDCAjnaBorrow,
    promoCardTBTCWBTCAjnaBorrow,
    promoCardUSDCETHAjnaBorrow,
    promoCardUSDCWBTCAjnaBorrow,
    promoCardWBTCUSDCAjnaBorrow,
    promoCardWLDUSDCAjnaBorrow,
    promoCardCBETHETHAjnaMultiply,
    promoCardETHGHOAjnaMultiply,
    promoCardUSDCETHAjnaMultiply,
    promoCardUSDCWBTCAjnaMultiply,
    promoCardWBTCDAIAjnaMultiply,
    promoCardWBTCUSDCAjnaMultiply,
    promoCardWSTETHDAIAjnaMultiply,
    promoCardWSTETHGHOAjnaMultiply,
    promoCardWSTETHUSDCAjnaMultiply,
    promoCardCBETHGHOAjnaEarn,
    promoCardETHUSDCAjnaEarn,
    promoCardUSDCETHAjnaEarn,
    promoCardUSDCWBTCAjnaEarn,
    promoCardUSDCWLDAjnaEarn,
    promoCardWBTCDAIAjnaEarn,
    promoCardWBTCUSDCAjnaEarn,
    promoCardWSTETHDAIAjnaEarn,
    promoCardWSTETHGHOAjnaEarn,
  } = getAjnaPromoCards(table)

  return {
    [ProductHubProductType.Borrow]: {
      default: [
        promoCardETHUSDCAjnaBorrow,
        promoCardSDAIUSDCAjnaBorrow,
        promoCardsWhatAreAjnaRewards,
      ],
      tokens: {
        ETH: [promoCardETHUSDCAjnaBorrow, promoCardETHDAIAjnaBorrow, promoCardsWhatAreAjnaRewards],
        BTC: [
          promoCardWBTCUSDCAjnaBorrow,
          promoCardTBTCWBTCAjnaBorrow,
          promoCardsWhatAreAjnaRewards,
        ],
        USDC: [
          promoCardUSDCETHAjnaBorrow,
          promoCardUSDCWBTCAjnaBorrow,
          promoCardsWhatAreAjnaRewards,
        ],
        DAI: [
          promoCardSDAIUSDCAjnaBorrow,
          promoCardHowToUseBorrowOnAjna,
          promoCardsWhatAreAjnaRewards,
        ],
        GHO: [
          promoCardGHODAIAjnaBorrow,
          promoCardHowToUseBorrowOnAjna,
          promoCardsWhatAreAjnaRewards,
        ],
        WLD: [
          promoCardWLDUSDCAjnaBorrow,
          promoCardHowToUseBorrowOnAjna,
          promoCardsWhatAreAjnaRewards,
        ],
      },
    },
    [ProductHubProductType.Multiply]: {
      default: [
        promoCardWSTETHUSDCAjnaMultiply,
        promoCardWBTCUSDCAjnaMultiply,
        promoCardsWhatAreAjnaRewards,
      ],
      tokens: {
        ETH: [
          promoCardWSTETHUSDCAjnaMultiply,
          promoCardCBETHETHAjnaMultiply,
          promoCardsWhatAreAjnaRewards,
        ],
        BTC: [
          promoCardWBTCUSDCAjnaMultiply,
          promoCardWBTCDAIAjnaMultiply,
          promoCardsWhatAreAjnaRewards,
        ],
        USDC: [
          promoCardUSDCETHAjnaMultiply,
          promoCardUSDCWBTCAjnaMultiply,
          promoCardsWhatAreAjnaRewards,
        ],
        DAI: [
          promoCardWBTCDAIAjnaMultiply,
          promoCardWSTETHDAIAjnaMultiply,
          promoCardsWhatAreAjnaRewards,
        ],
        GHO: [
          promoCardETHGHOAjnaMultiply,
          promoCardWSTETHGHOAjnaMultiply,
          promoCardsWhatAreAjnaRewards,
        ],
      },
    },
    [ProductHubProductType.Earn]: {
      default: [promoCardETHUSDCAjnaEarn, promoCardWSTETHDAIAjnaEarn, promoCardsWhatAreAjnaRewards],
      tokens: {
        ETH: [promoCardUSDCETHAjnaEarn, promoCardWhatIsEarnOnAjna, promoCardsWhatAreAjnaRewards],
        BTC: [promoCardUSDCWBTCAjnaEarn, promoCardWhatIsEarnOnAjna, promoCardsWhatAreAjnaRewards],
        USDC: [promoCardETHUSDCAjnaEarn, promoCardWBTCUSDCAjnaEarn, promoCardsWhatAreAjnaRewards],
        DAI: [promoCardWSTETHDAIAjnaEarn, promoCardWBTCDAIAjnaEarn, promoCardsWhatAreAjnaRewards],
        GHO: [promoCardWSTETHGHOAjnaEarn, promoCardCBETHGHOAjnaEarn, promoCardsWhatAreAjnaRewards],
        WLD: [promoCardUSDCWLDAjnaEarn, promoCardWhatIsEarnOnAjna, promoCardsWhatAreAjnaRewards],
      },
    },
  }
}
