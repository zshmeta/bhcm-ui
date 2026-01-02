import styled, { css } from 'styled-components'

export const StyledShapeIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid ${props => props.$color};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$textSize === 14 &&
    css`
      padding: 5px 9px;
    `}
`

export const StyledIcon = styled.span`
  width: 10px;
  height: 10px;
  border-radius: ${props => props.$shape === 'circle' ? '999px' : '2px'};
  background: ${props => props.$fill ? props.$color : 'transparent'};
  border: 1px solid ${props => props.$color};
  transform: ${props => (props.$shape === 'diamond' ? 'rotate(45deg)' : 'none')};
`

export const StyledLabel = styled.span`
  font-size: ${props => (props.$textSize === 14 ? '14px' : '12px')};
  line-height: 1;
  font-weight: 700;
  white-space: nowrap;
`
