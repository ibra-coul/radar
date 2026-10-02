import { useCallback, useLayoutEffect, useRef } from 'react'
import { useDock } from '@skyhook-io/k8s-ui'
import { useConnection } from '../../context/ConnectionContext'

export {
  DockProvider,
  useDock,
  useDockReservedHeight,
  useOpenTerminal,
  useOpenLogs,
  useOpenWorkloadLogs,
  useOpenNodeTerminal,
} from '@skyhook-io/k8s-ui'
export type { DockTab, DockTabType, DockContextValue } from '@skyhook-io/k8s-ui'

export function useOpenLocalTerminal() {
  const { addTab } = useDock()
  const { connection } = useConnection()
  const contextRef = useRef({ context: connection.context, state: connection.state })
  useLayoutEffect(() => { contextRef.current = { context: connection.context, state: connection.state } }, [connection.context, connection.state])

  return useCallback((opts?: { initialCommand?: string; title?: string }) => {
    const { context, state } = contextRef.current
    if (!context && state !== 'disconnected') return
    addTab({
      type: 'local-terminal',
      title: opts?.title || 'Terminal',
      initialCommand: opts?.initialCommand,
      localTerminalContext: context,
    })
  }, [addTab])
}
