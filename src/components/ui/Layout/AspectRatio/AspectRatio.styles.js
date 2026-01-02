import styled, { css } from 'styled-components'

const ratioStyles = {
  '1x1': css`
    aspect-ratio: 1 / 1;
  `,
  '2x3': css`
    aspect-ratio: 2 / 3;
  `,
  '3x2': css`
    aspect-ratio: 3 / 2;
  `,
  '3x4': css`
    aspect-ratio: 3 / 4;
  `,
  '4x3': css`
    aspect-ratio: 4 / 3;
  `,
  '1x2': css`
    aspect-ratio: 1 / 2;
  `,
  '2x1': css`
    aspect-ratio: 2 / 1;
  `,
  '9x16': css`
    aspect-ratio: 9 / 16;
  `,
  '16x9': css`
    aspect-ratio: 16 / 9;
  `,
}

export const StyledAspectRatio = styled.div`
  width: 100%;
  display: block;

  ${props => ratioStyles[props.$ratio] || ratioStyles['1x1']}
`

export const StyledAspectRatioSkeleton = styled.div`
  width: 100%;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};

  ${props => ratioStyles[props.$ratio] || ratioStyles['1x1']}
`
