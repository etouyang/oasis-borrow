import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { ProductHubData } from 'features/productHub/types'
import type { ProductHubDataParams } from 'handlers/product-hub/types'
import { useCallback, useEffect, useState } from 'react'

export interface ProductHubDataState {
  data?: ProductHubData
  isError: boolean
  isLoading: boolean
  refetch(): void
}

type ProductHubDataWithCards = ProductHubDataParams

export const useProductHubData = ({ protocols }: ProductHubDataWithCards): ProductHubDataState => {
  const [state, setState] = useState<ProductHubDataState>({
    isError: false,
    isLoading: true,
    refetch: () => {},
  })

  // Verify whether testnet is currently used
  const isTestnet = global?.window?.localStorage.getItem('legacy-default-chain') === '5'

  const fetchData = useCallback(async (): Promise<void> => {
    setState({
      ...state,
      isLoading: true,
    })

    axios
      .request<ProductHubDataWithCards, AxiosResponse<ProductHubData>>({
        method: 'post',
        url: '/api/product-hub',
        responseType: 'json',
        headers: { Accept: 'application/json' },
        data: {
          protocols: protocols.filter((p) => p), // could be false cause of disabled protocols
          testnet: isTestnet,
        },
      })
      .then(({ data }) => {
        // console.log('1111', data)
        setState({
          ...state,
          data,
          isError: false,
          isLoading: false,
        })
      })
      .catch(() => {
        // console.log('222')
        setState({
          ...state,
          data: undefined,
          isError: true,
          isLoading: false,
        })
      })
      .finally(() => {
        console.log('3333')
        // setState({
        //   ...state,
        //   data: undefined,
        //   isError: true,
        //   isLoading: false,
        // })
      })
  }, [protocols.map((p) => p).join('-')])

  useEffect(() => void fetchData(), [fetchData])

  return {
    ...state,
    refetch: useCallback(() => fetchData(), [fetchData]),
  }
}
