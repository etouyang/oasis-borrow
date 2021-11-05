import { trackingEvents } from 'analytics/analytics'
import { useAppContext } from 'components/AppContextProvider'
import { DefaultVaultHeader } from 'components/vault/DefaultVaultHeader'
import { VaultAllowanceStatus } from 'components/vault/VaultAllowance'
import { VaultChangesWithADelayCard } from 'components/vault/VaultChangesWithADelayCard'
import { VaultFormContainer } from 'components/vault/VaultFormContainer'
import { VaultProxyStatusCard } from 'components/vault/VaultProxy'
import { VaultHistoryEvent } from 'features/vaultHistory/vaultHistory'
import { VaultHistoryView } from 'features/vaultHistory/VaultHistoryView'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { Box, Grid } from 'theme-ui'

import { VaultErrors } from '../../openMultiplyVault/common/VaultErrors'
import { VaultWarnings } from '../../openMultiplyVault/common/VaultWarnings'
import { ManageMultiplyVaultState } from '../manageMultiplyVault'
import { createManageMultiplyVaultAnalytics$ } from '../manageMultiplyVaultAnalytics'
import { ManageMultiplyVaultButton } from './ManageMultiplyVaultButton'
import { ManageMultiplyVaultCollateralAllowance } from './ManageMultiplyVaultCollateralAllowance'
import {
  ManageMultiplyVaultConfirmation,
  ManageMultiplyVaultConfirmationStatus,
} from './ManageMultiplyVaultConfirmation'
import { ManageMultiplyVaultDaiAllowance } from './ManageMultiplyVaultDaiAllowance'
import { ManageMultiplyVaultDetails } from './ManageMultiplyVaultDetails'
import { ManageMultiplyVaultEditing } from './ManageMultiplyVaultEditing'
import { ManageMultiplyVaultFormHeader } from './ManageMultiplyVaultFormHeader'

function ManageMultiplyVaultForm(props: ManageMultiplyVaultState) {
  const {
    isEditingStage,
    isProxyStage,
    isCollateralAllowanceStage,
    isDaiAllowanceStage,
    isManageStage,
    accountIsConnected,
    accountIsController,
    daiAllowanceTxHash,
    collateralAllowanceTxHash,
    vault: { token },
    stage,
    otherAction,
  } = props

  const shouldDisplayActionButton =
    accountIsConnected &&
    (accountIsController ||
      (!accountIsController &&
        stage !== 'adjustPosition' &&
        (otherAction === 'depositCollateral' || otherAction === 'depositDai')))
  return (
    <VaultFormContainer toggleTitle="Edit Vault">
      <ManageMultiplyVaultFormHeader {...props} />
      {isEditingStage && <ManageMultiplyVaultEditing {...props} />}
      {isCollateralAllowanceStage && <ManageMultiplyVaultCollateralAllowance {...props} />}
      {isDaiAllowanceStage && <ManageMultiplyVaultDaiAllowance {...props} />}
      {isManageStage && <ManageMultiplyVaultConfirmation {...props} />}
      {shouldDisplayActionButton && (
        <>
          {/*<ManageMultiplyVaultErrors {...props} />*/}
          <VaultErrors
            {...props}
            errorMessagesToPick={[
              'depositAmountExceedsCollateralBalance',
              'withdrawAmountExceedsFreeCollateral',
              'withdrawAmountExceedsFreeCollateralAtNextPrice',
              'generateAmountExceedsDaiYieldFromTotalCollateral',
              'generateAmountExceedsDaiYieldFromTotalCollateralAtNextPrice',
              'generateAmountExceedsDebtCeiling',
              'generateAmountMoreThanMaxFlashAmount',
              'generateAmountLessThanDebtFloor',
              'paybackAmountExceedsDaiBalance',
              'paybackAmountExceedsVaultDebt',
              'debtWillBeLessThanDebtFloor',
              'customCollateralAllowanceAmountExceedsMaxUint256',
              'customCollateralAllowanceAmountLessThanDepositAmount',
              'customDaiAllowanceAmountExceedsMaxUint256',
              'customDaiAllowanceAmountLessThanPaybackAmount',
              'depositingAllEthBalance',
              'ledgerWalletContractDataDisabled',
              'shouldShowExchangeError',
              'hasToDepositCollateralOnEmptyVault',
              'withdrawCollateralOnVaultUnderDebtFloor',
            ]}
          />
          {/*<ManageMultiplyVaultWarnings {...props} />*/}
          <VaultWarnings
            {...props}
            warningMessagesToPick={[
              'potentialGenerateAmountLessThanDebtFloor',
              'debtIsLessThanDebtFloor',
              'vaultWillBeAtRiskLevelDanger',
              'vaultWillBeAtRiskLevelWarning',
              'vaultWillBeAtRiskLevelDangerAtNextPrice',
              'vaultWillBeAtRiskLevelWarningAtNextPrice',
            ]}
          />
          {stage === 'manageSuccess' && <VaultChangesWithADelayCard />}
          <ManageMultiplyVaultButton {...props} />
        </>
      )}
      {isProxyStage && <VaultProxyStatusCard {...props} />}
      {isCollateralAllowanceStage && (
        <VaultAllowanceStatus
          {...props}
          allowanceTxHash={collateralAllowanceTxHash}
          token={token}
        />
      )}
      {isDaiAllowanceStage && (
        <VaultAllowanceStatus {...props} allowanceTxHash={daiAllowanceTxHash} token={'DAI'} />
      )}
      {isManageStage && <ManageMultiplyVaultConfirmationStatus {...props} />}
    </VaultFormContainer>
  )
}

// TODO also to refactor
export function ManageMultiplyVaultContainer({
  manageVault,
  vaultHistory,
}: {
  manageVault: ManageMultiplyVaultState
  vaultHistory: VaultHistoryEvent[]
}) {
  const { manageMultiplyVault$, context$ } = useAppContext()
  const {
    vault: { id, ilk },
    clear,
  } = manageVault
  const { t } = useTranslation()

  useEffect(() => {
    const subscription = createManageMultiplyVaultAnalytics$(
      manageMultiplyVault$(id),
      context$,
      trackingEvents,
    ).subscribe()

    return () => {
      clear()
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <DefaultVaultHeader {...manageVault} header={t('vault.header', { ilk, id })} id={id} />
      <Grid variant="vaultContainer">
        <Grid gap={5} mb={[0, 5]}>
          <ManageMultiplyVaultDetails {...manageVault} />
          <VaultHistoryView vaultHistory={vaultHistory} />
        </Grid>
        <Box>
          <ManageMultiplyVaultForm {...manageVault} />
        </Box>
      </Grid>
    </>
  )
}
