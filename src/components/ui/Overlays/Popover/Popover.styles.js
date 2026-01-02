import styled from 'styled-components'

export const StyledPopoverRoot = styled.span`
  display: inline-flex;
`

export const StyledPopoverContent = styled.div`
  min-width: 160px;
  max-width: 320px;
  padding: ${props => props.theme.spacing?.sm || '8px'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors?.border?.subtle || 'currentColor'};
  background: ${props => props.theme.colors?.bg?.surfaceRaised || 'transparent'};
  color: ${props => props.theme.colors?.text?.primary || 'currentColor'};
  box-shadow: ${props => props.theme.shadows?.popover || 'none'};
  z-index: 1000;
`
