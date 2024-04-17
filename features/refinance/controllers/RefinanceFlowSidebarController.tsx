import { FlowSidebar } from 'components/FlowSidebar'
import { getOmniFilterConsumedProxy } from 'features/omni-kit/helpers'
import { useRefinanceContext } from 'features/refinance/contexts'
import { RefinanceSidebarStep } from 'features/refinance/types'
import { useFlowState } from 'helpers/useFlowState'
import { zero } from 'helpers/zero'
import React from 'react'
import { Box } from 'theme-ui'

export const RefinanceFlowSidebarController = () => {
  const {
    metadata: { flowStateFilter },
    environment: { chainInfo },
    form: { updateState },
    poolData: { pairId },
    position: { lendingProtocol: protocol },
    steps: { setStep, setNextStep },
  } = useRefinanceContext()

  const flowState = useFlowState({
    pairId,
    protocol,
    networkId: chainInfo.chainId,
    amount: zero,
    token: 'ETH',
    filterConsumedProxy: async (events) => getOmniFilterConsumedProxy(events, flowStateFilter),
    onProxiesAvailable: async (events) => {
      const filteredEventsBooleanMap = await Promise.all(
        events.map((event) => flowStateFilter({ event })),
      )
      const filteredEvents = events.filter(
        (_event, eventIndex) => filteredEventsBooleanMap[eventIndex],
      )
      updateState('hasSimilarPosition', !!filteredEvents.length)
    },
    onEverythingReady: (data) => {
      updateState('dpm', data.availableProxies[0])
      setNextStep()
    },
    onGoBack: () => setStep(RefinanceSidebarStep.Strategy),
    step: '3/5',
    useHeaderBackBtn: true,
  })

  return (
    <Box sx={{ width: '100%' }}>
      <FlowSidebar {...flowState} />
    </Box>
  )
}
