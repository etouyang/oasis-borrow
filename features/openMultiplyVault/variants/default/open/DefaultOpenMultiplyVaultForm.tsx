import { useTranslation } from 'next-i18next'
import React from 'react'

import {
  VaultAllowance,
  VaultAllowanceStatus,
} from '../../../../../components/vault/VaultAllowance'
import { VaultChangesWithADelayCard } from '../../../../../components/vault/VaultChangesWithADelayCard'
import { VaultFormVaultTypeSwitch } from '../../../../../components/vault/VaultForm'
import { VaultFormContainer } from '../../../../../components/vault/VaultFormContainer'
import { VaultProxyStatusCard } from '../../../../../components/vault/VaultProxy'
import { OpenMultiplyVaultButton } from '../../../common/OpenMultiplyVaultButton'
import {
  OpenMultiplyVaultConfirmation,
  OpenMultiplyVaultStatus,
} from '../../../common/OpenMultiplyVaultConfirmation'
import { OpenMultiplyVaultTitle } from '../../../common/OpenMultiplyVaultTitle'
import { VaultErrors } from '../../../common/VaultErrors'
import { VaultWarnings } from '../../../common/VaultWarnings'
import { OpenMultiplyVaultState } from '../../../openMultiplyVault'
import { DefaultOpenMultiplyVaultEditing } from './DefaultOpenMultiplyVaultEditing'

export function DefaultOpenMultiplyVaultForm(props: OpenMultiplyVaultState) {
  const { isEditingStage, isProxyStage, isAllowanceStage, isOpenStage, ilk, stage } = props
  const { t } = useTranslation()

  return (
    <VaultFormContainer toggleTitle="Open Vault">
      <OpenMultiplyVaultTitle
        {...props}
        title={t('vault-form.header.edit')}
        subTitle={t('vault-form.subtext.edit-multiply')}
      />
      {isEditingStage && <DefaultOpenMultiplyVaultEditing {...props} />}
      {isAllowanceStage && <VaultAllowance {...props} />}
      {isOpenStage && <OpenMultiplyVaultConfirmation {...props} />}
      <VaultErrors
        {...props}
        errorMessagesToPick={[
          'depositAmountExceedsCollateralBalance',
          'generateAmountExceedsDaiYieldFromDepositingCollateral',
          'generateAmountExceedsDaiYieldFromDepositingCollateralAtNextPrice',
          'generateAmountExceedsDebtCeiling',
          'generateAmountMoreThanMaxFlashAmount',
          'generateAmountLessThanDebtFloor',
          'customAllowanceAmountExceedsMaxUint256',
          'customAllowanceAmountLessThanDepositAmount',
          'depositingAllEthBalance',
          'ledgerWalletContractDataDisabled',
          'exchangeError',
        ]}
      />
      <VaultWarnings
        {...props}
        warningMessagesToPick={[
          'potentialGenerateAmountLessThanDebtFloor',
          'vaultWillBeAtRiskLevelDanger',
          'vaultWillBeAtRiskLevelWarning',
          'vaultWillBeAtRiskLevelDangerAtNextPrice',
          'vaultWillBeAtRiskLevelWarningAtNextPrice',
        ]}
      />
      {stage === 'openSuccess' && <VaultChangesWithADelayCard />}
      <OpenMultiplyVaultButton {...props} />
      {isProxyStage && <VaultProxyStatusCard {...props} />}
      {isAllowanceStage && <VaultAllowanceStatus {...props} />}
      {isOpenStage && <OpenMultiplyVaultStatus {...props} />}
      {isEditingStage ? (
        <VaultFormVaultTypeSwitch
          href={`/vaults/open/${ilk}`}
          title="Switch to Borrow"
          visible={true}
        />
      ) : null}
    </VaultFormContainer>
  )
}
