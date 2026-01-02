import { useCallback, useMemo, useState, useId } from 'react'

let fallbackIdCounter = 0
function getFallbackId() {
  fallbackIdCounter += 1
  return `bhcm-disclosure-${fallbackIdCounter}`
}

/**
 * useDisclosure
 *
 * Minimal Carbon-style disclosure state helper.
 * Returns:
 * - buttonProps: { aria-controls, aria-expanded, onClick }
 * - contentProps: { id }
 * - open: boolean
 */
export function useDisclosure(id) {
  const reactId = typeof useId === 'function' ? useId() : undefined
  const contentId = useMemo(() => id || reactId || getFallbackId(), [id, reactId])

  const [open, setOpen] = useState(false)

  const onClick = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const buttonProps = useMemo(
    () => ({
      'aria-controls': contentId,
      'aria-expanded': open,
      onClick,
    }),
    [contentId, onClick, open]
  )

  const contentProps = useMemo(
    () => ({
      id: contentId,
    }),
    [contentId]
  )

  return {
    buttonProps,
    contentProps,
    open,
  }
}

export default useDisclosure
