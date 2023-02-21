import { AjnaValidationItem } from 'actions/ajna/types'
import BigNumber from 'bignumber.js'
import { ValidationMessagesInput } from 'components/ValidationMessages'
import { isBorrowFormValid } from 'features/ajna/borrow/contexts/isBorrowFormValid'
import { useAjnaBorrowFormReducto } from 'features/ajna/borrow/state/ajnaBorrowFormReducto'
import { getAjnaBorrowValidations } from 'features/ajna/borrow/validations'
import { initializeAjnaContext } from 'features/ajna/common/initializeAjnaContext'
import { AjnaProductPosition } from 'features/ajna/common/types'
import { useAjnaProductContext } from 'features/ajna/contexts/AjnaProductContext'
import React, { PropsWithChildren, useContext } from 'react'

import { AjnaPosition } from '@oasisdex/oasis-actions/lib/packages/oasis-actions/src/helpers/ajna'

interface AjnaBorrowContextProviderProps {
  position: AjnaPosition
}

interface AjnaBorrowContext {
  form: ReturnType<typeof useAjnaBorrowFormReducto>
  position: AjnaProductPosition<AjnaPosition>
  validation: {
    errors: ValidationMessagesInput
    isFormValid: boolean
    warnings: ValidationMessagesInput
  }
}

const ajnaBorrowContext = React.createContext<AjnaBorrowContext | undefined>(undefined)

export function useAjnaBorrowContext(): AjnaBorrowContext {
  const ac = useContext(ajnaBorrowContext)

  if (!ac) {
    throw new Error(
      "AjnaBorrowContext not available! useAjnaBorrowContext can't be used serverside",
    )
  }
  return ac
}

export function AjnaBorrowContextProvider({
  children,
  position,
}: PropsWithChildren<AjnaBorrowContextProviderProps>) {
  const {
    environment: { collateralBalance, collateralToken, ethBalance, ethPrice, flow, quoteBalance },
    steps: { currentStep },
    tx: { txDetails },
  } = useAjnaProductContext()

  const form = useAjnaBorrowFormReducto({
    action: flow === 'open' ? 'open' : 'deposit',
  })

  function validationCallback({
    errors,
    usdValue,
  }: {
    errors?: AjnaValidationItem[]
    usdValue?: BigNumber
  }) {
    return getAjnaBorrowValidations({
      collateralBalance,
      collateralToken,
      depositAmount: form.state.depositAmount,
      ethBalance,
      ethPrice,
      gasEstimationUsd: usdValue,
      paybackAmount: form.state.paybackAmount,
      quoteBalance,
      simulationErrors: errors,
      simulationWarnings: errors,
      txError: txDetails?.txError,
    })
  }

  function isFormValidCallback({ errors }: { errors: ValidationMessagesInput }) {
    return isBorrowFormValid({ currentStep, formState: form.state, errors })
  }

  const context = initializeAjnaContext<AjnaBorrowContext, AjnaPosition>({
    form,
    collateralBalance,
    currentStep,
    position,
    quoteBalance,
    txDetails,
    validationCallback,
    isFormValidCallback,
  })

  return <ajnaBorrowContext.Provider value={context}>{children}</ajnaBorrowContext.Provider>
}
