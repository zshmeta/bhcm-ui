import styled, { css } from 'styled-components'

export const Root = styled.div`
  display: grid;
  gap: 8px;
`

export const InlineRoot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  vertical-align: baseline;
`

export const InlineCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.2;

  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.primary};
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 8px;

  padding: 8px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.6;
    `}
`

export const Textbox = styled.div`
  min-width: 0;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
    border-radius: 6px;
  }
`

export const Pre = styled.pre`
  margin: 0;
  padding: 0;
  min-width: 0;

  ${props =>
    props.$scroll &&
    css`
      overflow: auto;
    `}
`

export const Code = styled.code`
  display: block;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$wrap
      ? css`
          white-space: pre-wrap;
          word-break: break-word;
        `
      : css`
          white-space: pre;
        `}
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const ExpandRow = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const LiveRegion = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
