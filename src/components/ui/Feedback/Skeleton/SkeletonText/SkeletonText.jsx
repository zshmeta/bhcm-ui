import React, { useEffect, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { SkeletonTextLine, SkeletonTextStack } from './SkeletonText.styles'

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769]

function getRandomInt(min, max, n) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function SkeletonText({
  paragraph = false,
  lineCount = 3,
  width = '100%',
  heading = false,
  className = '',
  ...rest
}) {
  const prefix = useClassPrefix()

  const widthNum = parseInt(width, 10)
  const widthPx = typeof width === 'string' && width.includes('px')
  const widthPercent = typeof width === 'string' && width.includes('%')

  const lineCountNumber = paragraph ? lineCount : 1

  const refs = useRef([])
  refs.current = []

  useIsoLayoutEffect(() => {
    refs.current.forEach((item, j) => {
      if (!item) return
      const randomPercentWidth = `${getRandomInt(0, 75, j)}px`
      const randomPxWidth = `${getRandomInt(Math.max(widthNum - 75, 0), widthNum, j)}px`

      if (widthPercent && paragraph) {
        item.style.width = `calc(${width} - ${randomPercentWidth})`
      } else if (widthPx && paragraph) {
        item.style.width = randomPxWidth
      } else {
        item.style.width = width
      }
    })
  }, [lineCountNumber, paragraph, width, widthNum, widthPercent, widthPx])

  const lines = []
  for (let i = 0; i < lineCountNumber; i++) {
    lines.push(
      <SkeletonTextLine
        key={i}
        className={`${prefix}--skeleton__text ${heading ? `${prefix}--skeleton__heading` : ''} ${className}`.trim()}
        $heading={heading}
        ref={el => {
          refs.current.push(el)
        }}
        {...rest}
      />
    )
  }

  if (lineCountNumber !== 1) {
    return <SkeletonTextStack>{lines}</SkeletonTextStack>
  }

  return <>{lines}</>
}

SkeletonText.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.bool,
  lineCount: PropTypes.number,
  paragraph: PropTypes.bool,
  width: PropTypes.string,
}
