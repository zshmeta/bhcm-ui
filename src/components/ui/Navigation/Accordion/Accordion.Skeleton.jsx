import React from 'react'
import {
  StyledAccordionHeading,
  StyledAccordionItem,
  StyledAccordionList,
  StyledChevron,
  StyledPanelInner,
  StyledPanelOuter,
  StyledTitle,
} from './Accordion.styles'
import styled from 'styled-components'

const SkeletonLine = styled.div`
  height: 10px;
  width: ${props => props.$width || '100%'};
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

function SkeletonChevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * AccordionSkeleton
 *
 * Mirrors Carbon's skeleton API:
 * - `count` items
 * - optional first item shown open when `open=true`
 * - supports `ordered`, `align`, `isFlush`
 */
export default function AccordionSkeleton({
  align = 'end',
  className,
  count = 4,
  isFlush = false,
  open = true,
  ordered = false,
  ...rest
}) {
  const flush = isFlush && align !== 'start'
  const numSkeletonItems = open ? Math.max(count - 1, 0) : count

  return (
    <StyledAccordionList
      as={ordered ? 'ol' : 'ul'}
      className={className}
      $isFlush={flush}
      {...rest}
    >
      {open && (
        <StyledAccordionItem $isOpen={true} $disabled={false}>
          <StyledAccordionHeading
            as="span"
            $align={align}
            $isFlush={flush}
            aria-hidden="true"
          >
            {align === 'start' ? (
              <>
                <StyledChevron $isOpen={true}>
                  <SkeletonChevron />
                </StyledChevron>
                <StyledTitle>
                  <SkeletonLine $width="55%" />
                </StyledTitle>
              </>
            ) : (
              <>
                <StyledTitle>
                  <SkeletonLine $width="55%" />
                </StyledTitle>
                <StyledChevron $isOpen={true}>
                  <SkeletonChevron />
                </StyledChevron>
              </>
            )}
          </StyledAccordionHeading>

          <StyledPanelOuter $isOpen={true} aria-hidden="true">
            <StyledPanelInner $isFlush={flush}>
              <SkeletonLine $width="90%" />
              <div style={{ height: 6 }} />
              <SkeletonLine $width="80%" />
              <div style={{ height: 6 }} />
              <SkeletonLine $width="95%" />
            </StyledPanelInner>
          </StyledPanelOuter>
        </StyledAccordionItem>
      )}

      {Array.from({ length: numSkeletonItems }).map((_, index) => (
        <StyledAccordionItem key={index} $isOpen={false} $disabled={false}>
          <StyledAccordionHeading
            as="span"
            $align={align}
            $isFlush={flush}
            aria-hidden="true"
          >
            {align === 'start' ? (
              <>
                <StyledChevron $isOpen={false}>
                  <SkeletonChevron />
                </StyledChevron>
                <StyledTitle>
                  <SkeletonLine $width="60%" />
                </StyledTitle>
              </>
            ) : (
              <>
                <StyledTitle>
                  <SkeletonLine $width="60%" />
                </StyledTitle>
                <StyledChevron $isOpen={false}>
                  <SkeletonChevron />
                </StyledChevron>
              </>
            )}
          </StyledAccordionHeading>
        </StyledAccordionItem>
      ))}
    </StyledAccordionList>
  )
}

AccordionSkeleton.displayName = 'AccordionSkeleton'
