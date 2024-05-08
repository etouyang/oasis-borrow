import { useFetch } from 'usehooks-ts'
import respJson from './response.json'

import type { OasisStats } from './OasisStats'

export function useOasisStats() {
  return useFetch<OasisStats>('/api/stats')
}

export const statsJson = respJson
