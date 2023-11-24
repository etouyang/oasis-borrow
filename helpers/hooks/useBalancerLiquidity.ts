import type BigNumber from 'bignumber.js'
import { tokenBalance } from 'blockchain/better-calls/erc20'
import { ensureContractsExist, getNetworkContracts } from 'blockchain/contracts'
import type { NetworkIds } from 'blockchain/networks'
import { useEffect, useState } from 'react'

type BalancerLiquidityProps = {
  token: string
  networkId: NetworkIds
  isFloashLoanWithBalancer: boolean
}
export const useBalancerVaultLiquidity = ({
  token,
  networkId,
  isFloashLoanWithBalancer,
}: BalancerLiquidityProps) => {
  const [liquidity, setLiquidity] = useState<BigNumber | null>(null)
  const contracts = getNetworkContracts(networkId)
  ensureContractsExist(networkId, contracts, ['balancerVault'])

  const { balancerVault } = contracts

  useEffect(() => {
    !liquidity &&
      isFloashLoanWithBalancer &&
      tokenBalance({ token, account: balancerVault.address, networkId })
        .then((result) => {
          setLiquidity(result)
        })
        .catch((error) => {
          console.error(error)
        })
  }, [balancerVault.address, liquidity, networkId, token, isFloashLoanWithBalancer])

  return liquidity
}
