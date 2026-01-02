import styled, { css } from 'styled-components'
import { Button } from '../Button'

export const StyledChatButton = styled(Button)`
  ${props =>
    props.$isQuickAction &&
    css`
      /* quick actions are always compact */
    `}

  ${props =>
    props.$isSelected &&
    css`
      /* selected quick action is visually distinct via Button styles */
    `}
`
