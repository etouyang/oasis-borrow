import axios from 'axios'
import { NetworkIds, networksById } from 'blockchain/networks'
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import NodeCache from 'node-cache'
import type { GasFeesApiResponse, GasPrices } from 'pages/api/gasPrice/types'
import { response } from 'pages/api/response/gasPrice';

const cache = new NodeCache({ stdTTL: 10 })

const handler = async function ({ query }: NextApiRequest, res: NextApiResponse) {
  const { maxFeePerGas, maxPriorityFeePerGas } = response;

  const config = getConfig()
  const url = config?.publicRuntimeConfig.awsGasPriceUrl
  const gasApiKey = process.env.GAS_API_API_KEY

  const networkId =
    (Array.isArray(query.networkId) ? query.networkId[0] : query.networkId) ?? NetworkIds.MAINNET

  if (!Object.keys(networksById).includes(String(networkId))) {
    // res.status(500).json({
    //   maxPriorityFeePerGas: 0,
    //   maxFeePerGas: 0,
    //   fromCache: false,
    //   time: cache.get('time'),
    //   error: 'Unsupported network',
    // })
    res.status(200).json({
      maxPriorityFeePerGas,
      maxFeePerGas,
      fromCache: false,
      time: cache.get('time'),
      error: 'Unsupported network',
    })
  }

  const timeCacheLabel = `time-${networkId}`
  const gasFeeEstimateCacheLabel = `gasFeeEstimate-${networkId}`
  const time = cache.get(timeCacheLabel)

  if (!time) {
    axios
      .request<GasFeesApiResponse>({
        method: 'get',
        url: `${url}${networkId}`,
        responseType: 'json',
        headers: gasApiKey
          ? {
              'x-api-key': gasApiKey,
            }
          : {},
      })
      .then(
        ({
          data: {
            estimatedBaseFee,
            high: { suggestedMaxPriorityFeePerGas },
          },
        }) => {
          const gasFeeEstimate: GasPrices = {
            maxFeePerGas: parseFloat(estimatedBaseFee),
            maxPriorityFeePerGas: parseFloat(suggestedMaxPriorityFeePerGas),
          }

          cache.set(timeCacheLabel, new Date().getTime())
          cache.set(gasFeeEstimateCacheLabel, gasFeeEstimate)

          res.status(200).json({
            ...gasFeeEstimate,
            fromCache: false,
            time: cache.get(timeCacheLabel),
          })
        },
      )
      .catch((error) => {
        // res.status(500).json({
        //   maxPriorityFeePerGas: 0,
        //   maxFeePerGas: 0,
        //   fromCache: false,
        //   time: cache.get(timeCacheLabel),
        //   error,
        // })
        res.status(200).json({
          maxPriorityFeePerGas,
          maxFeePerGas,
          fromCache: false,
          time: cache.get(timeCacheLabel),
          error,
        })
      })
  } else {
    const gasFeeEstimate = cache.get(gasFeeEstimateCacheLabel) as GasPrices

    res.status(200).json({
      ...gasFeeEstimate,
      fromCache: true,
      time: time,
    })
  }
}

export default handler
