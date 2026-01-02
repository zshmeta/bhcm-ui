import styled, { css } from 'styled-components'

const levelClass = level => {
  if (level === 0) return 'one'
  if (level === 1) return 'two'
  return 'three'
}

export const LayerRoot = styled.div`
  ${props =>
    props.$withBackground
      ? css`
          background: var(--bhcm-layer-background, transparent);
        `
      : null}

  /* Provide a stable attribute hook for consumers */
  &[data-layer='one'] {
  }
  &[data-layer='two'] {
  }
  &[data-layer='three'] {
  }
`

export const getLayerName = levelClass
