import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  display: grid;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

const Line = styled.div`
  height: 12px;
  width: ${props => props.$w};
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function CodeSnippetSkeleton({ className, type = 'single', ...rest }) {
  return (
    <Root aria-hidden="true" className={className} {...rest}>
      {type === 'single' ? (
        <Line $w="70%" />
      ) : (
        <>
          <Line $w="92%" />
          <Line $w="82%" />
          <Line $w="88%" />
        </>
      )}
    </Root>
  )
}

CodeSnippetSkeleton.displayName = 'CodeSnippetSkeleton'

CodeSnippetSkeleton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['single', 'multi']),
}
