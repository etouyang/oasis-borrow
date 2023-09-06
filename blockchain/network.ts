// tslint:disable:no-console
import BigNumber from 'bignumber.js'
import { getNetworkRpcEndpoint, NetworkConfig, NetworkIds, networksById } from 'blockchain/networks'
import { ethers } from 'ethers'
import {
  contract,
  ContractDesc,
  Web3Context,
  Web3ContextConnected,
  Web3ContextConnectedReadonly,
} from 'features/web3Context'
import { bindNodeCallback, combineLatest, concat, interval, Observable } from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  filter,
  first,
  map,
  shareReplay,
  skip,
  startWith,
  switchMap,
} from 'rxjs/operators'
import Web3 from 'web3'

export const every1Seconds$ = interval(1000).pipe(startWith(0))
export const every3Seconds$ = interval(3000).pipe(startWith(0))
export const every5Seconds$ = interval(5000).pipe(startWith(0))
export const every10Seconds$ = interval(10000).pipe(startWith(0))

interface WithContractMethod {
  contract: <T>(desc: ContractDesc) => T

  /**
   * @deprecated user `networkById[networkId].readProvider` instead. This is set only for mainnet
   */
  rpcProvider: ethers.providers.StaticJsonRpcProvider
}

interface WithWeb3ProviderGetPastLogs {
  web3ProviderGetPastLogs: Web3
}

export type ContextConnectedReadOnly = NetworkConfig &
  Web3ContextConnectedReadonly &
  WithContractMethod &
  WithWeb3ProviderGetPastLogs & { account: undefined }

export type ContextConnected = NetworkConfig &
  Web3ContextConnected &
  WithContractMethod &
  WithWeb3ProviderGetPastLogs

export type Context = ContextConnected | ContextConnectedReadOnly

export function createContext$(
  web3ContextConnected$: Observable<Web3ContextConnected | Web3ContextConnectedReadonly>,
): Observable<Context> {
  return web3ContextConnected$.pipe(
    map((web3Context) => {
      const networkData = networksById[web3Context.chainId]
      const web3ProviderGetPastLogs = new Web3(getNetworkRpcEndpoint(web3Context.chainId))

      return {
        ...networkData,
        ...web3Context,
        contract: <T>(c: ContractDesc) => contract(web3Context.web3, c) as T,
        rpcProvider: networksById[NetworkIds.MAINNET].getReadProvider(),
        web3ProviderGetPastLogs,
      } as Context
    }),
    shareReplay(1),
  )
}

export function createContextConnected$(
  context$: Observable<Context>,
): Observable<ContextConnected> {
  return context$.pipe(
    filter(({ status }) => status === 'connected'),
    shareReplay(1),
  )
}

export type EveryBlockFunction$ = <O>(
  o$: Observable<O>,
  compare?: (x: O, y: O) => boolean,
) => Observable<O>

export function compareBigNumber(a1: BigNumber, a2: BigNumber): boolean {
  return a1.comparedTo(a2) === 0
}

export function createOnEveryBlock$(
  web3Context$: Observable<Web3ContextConnected | Web3ContextConnectedReadonly>,
): [Observable<number>, EveryBlockFunction$] {
  const onEveryBlock$ = combineLatest(web3Context$, every5Seconds$).pipe(
    switchMap(([{ web3 }]) => bindNodeCallback(web3.eth.getBlockNumber)()),
    catchError((error, source) => {
      console.log(error)

      return concat(every5Seconds$.pipe(skip(1), first()), source)
    }),
    distinctUntilChanged(),
    shareReplay(1),
  )

  function everyBlock$<O>(o$: Observable<O>, compare?: (x: O, y: O) => boolean) {
    return onEveryBlock$.pipe(
      switchMap(() => o$),
      distinctUntilChanged(compare),
    )
  }

  return [onEveryBlock$, everyBlock$]
}

export function createWeb3ContextConnected$(web3Context$: Observable<Web3Context>) {
  return web3Context$.pipe(
    filter(({ status }) => status === 'connected' || status === 'connectedReadonly'),
  ) as Observable<Web3ContextConnected | Web3ContextConnectedReadonly>
}

export function createAccount$(web3Context$: Observable<Web3Context>) {
  return web3Context$.pipe(
    map((status) => (status.status === 'connected' ? status.account : undefined)),
  )
}

export function createInitializedAccount$(account$: Observable<string | undefined>) {
  return account$.pipe(
    filter((account: string | undefined) => account !== undefined),
  ) as Observable<string>
}

export function reload(network: string) {
  if (document.location.href.includes('network=')) {
    document.location.href = document.location.href.replace(/network=[a-z]+/i, `network=${network}`)
  } else {
    document.location.href = `${document.location.href}?network=${network}`
  }
}
