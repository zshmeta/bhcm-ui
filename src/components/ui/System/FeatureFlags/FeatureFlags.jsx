import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

function createScope(flags) {
  const state = { ...(flags || {}) }
  return {
    enabled(name) {
      return Boolean(state[name])
    },
    mergeWithScope(parentScope) {
      // Best-effort: parentScope may be another scope instance.
      // We do not override explicitly provided flags.
      if (!parentScope || typeof parentScope !== 'object') return
      if (!('_flags' in parentScope)) return

      const parentFlags = parentScope._flags || {}
      for (const key of Object.keys(parentFlags)) {
        if (!(key in state)) state[key] = parentFlags[key]
      }
    },
    _flags: state,
  }
}

const defaultScope = createScope({})

export const FeatureFlagContext = createContext(defaultScope)

function useChangedValue(value, compare, callback) {
  const initialRender = useRef(false)
  const savedCallback = useRef(callback)
  const [prevValue, setPrevValue] = useState(value)

  if (!compare(prevValue, value)) {
    setPrevValue(value)
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (initialRender.current) {
      savedCallback.current(prevValue)
    }
  }, [prevValue])

  useEffect(() => {
    initialRender.current = true
  }, [])
}

function isEqual(a, b) {
  if (a === b) return true
  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) return false
  }
  for (const key of Object.keys(b)) {
    if (b[key] !== a[key]) return false
  }
  return true
}

export function FeatureFlags({
  children,
  flags = {},
  enableV12TileDefaultIcons = false,
  enableV12TileRadioIcons = false,
  enableV12Overflowmenu = false,
  enableTreeviewControllable = false,
  enableExperimentalFocusWrapWithoutSentinels = false,
  enableFocusWrapWithoutSentinels = false,
  enableDialogElement = false,
  enableV12DynamicFloatingStyles = false,
  enableEnhancedFileUploader = false,
  enablePresence = false,
}) {
  const parentScope = useContext(FeatureFlagContext)

  const combinedFlags = {
    'enable-v12-tile-default-icons': enableV12TileDefaultIcons,
    'enable-v12-tile-radio-icons': enableV12TileRadioIcons,
    'enable-v12-overflowmenu': enableV12Overflowmenu,
    'enable-treeview-controllable': enableTreeviewControllable,
    'enable-experimental-focus-wrap-without-sentinels': enableExperimentalFocusWrapWithoutSentinels,
    'enable-focus-wrap-without-sentinels': enableFocusWrapWithoutSentinels,
    'enable-dialog-element': enableDialogElement,
    'enable-v12-dynamic-floating-styles': enableV12DynamicFloatingStyles,
    'enable-enhanced-file-uploader': enableEnhancedFileUploader,
    'enable-presence': enablePresence,
    ...flags,
  }

  const [scope, setScope] = useState(() => {
    const s = createScope(combinedFlags)
    s.mergeWithScope(parentScope)
    return s
  })

  useChangedValue(combinedFlags, isEqual, nextFlags => {
    const s = createScope(nextFlags)
    s.mergeWithScope(parentScope)
    setScope(s)
  })

  useEffect(() => {
    const s = createScope(combinedFlags)
    s.mergeWithScope(parentScope)
    setScope(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentScope])

  return <FeatureFlagContext.Provider value={scope}>{children}</FeatureFlagContext.Provider>
}

FeatureFlags.displayName = 'FeatureFlags'

export function useFeatureFlag(flag) {
  const scope = useContext(FeatureFlagContext)
  return scope.enabled(flag)
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext)
}

export default FeatureFlags
