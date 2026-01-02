import styled, { css } from 'styled-components'

export const StyledBadgeIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.status.error};
  color: ${props => props.theme.colors.text.inverse};

  font-weight: 800;
  font-size: 11px;
  line-height: 1;

  border-radius: 999px;

  ${props =>
    props.$hasCount
      ? css`
          height: 16px;
          min-width: 16px;
          padding: 0 6px;
        `
      : css`
          width: 10px;
          height: 10px;
        `}
`

export const StyledBadgeIndicatorSkeleton = styled.div`
  display: inline-flex;
  border-radius: 999px;
  background: ${props => props.theme.colors.bg.surfaceRaised};

  ${props =>
    props.$hasCount
      ? css`
          height: 16px;
          width: 28px;
        `
      : css`
          width: 10px;
          height: 10px;
        `}
`
