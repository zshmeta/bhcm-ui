import React, { createContext, useContext, useMemo, useState } from 'react'
import {
  StyledAssistive,
  StyledIconWrap,
  StyledLabel,
  StyledProgressList,
  StyledSecondary,
  StyledStepButton,
  StyledStepItem,
  StyledTextWrap,
} from './ProgressIndicator.styles'

const translationIds = {
  complete: 'carbon.progress-step.complete',
  incomplete: 'carbon.progress-step.incomplete',
  current: 'carbon.progress-step.current',
  invalid: 'carbon.progress-step.invalid',
}

const defaultTranslations = {
  [translationIds.complete]: 'Complete',
  [translationIds.incomplete]: 'Incomplete',
  [translationIds.current]: 'Current',
  [translationIds.invalid]: 'Invalid',
}

function defaultTranslateWithId(messageId) {
  return defaultTranslations[messageId] || String(messageId)
}

const ProgressIndicatorContext = createContext({
  currentIndex: 0,
  onChange: undefined,
  spaceEqually: false,
  vertical: false,
})

const ProgressStepDerivedContext = createContext({
  index: 0,
  derivedCurrent: false,
  derivedComplete: false,
})

function useProgressIndicatorContext() {
  return useContext(ProgressIndicatorContext)
}

function useProgressStepDerivedContext() {
  return useContext(ProgressStepDerivedContext)
}

function Icon({ complete, current, invalid, description }) {
  let color = 'currentColor'
  if (invalid) color = 'currentColor'

  // Simple, non-Carbon iconography: check / warning / dot
  if (invalid) {
    return (
      <StyledIconWrap $color={color} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5l6 11H2l6-11z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 5v3.8" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 11.9h.01" stroke="currentColor" strokeWidth="2.2" />
          <title>{description}</title>
        </svg>
      </StyledIconWrap>
    )
  }

  if (current) {
    return (
      <StyledIconWrap $color={color} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <title>{description}</title>
        </svg>
      </StyledIconWrap>
    )
  }

  if (complete) {
    return (
      <StyledIconWrap $color={color} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 8.2l1.9 1.9L11 6.3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <title>{description}</title>
        </svg>
      </StyledIconWrap>
    )
  }

  return (
    <StyledIconWrap $color={color} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
        <title>{description}</title>
      </svg>
    </StyledIconWrap>
  )
}

export default function ProgressIndicator({
  children,
  className,
  currentIndex: controlledIndex = 0,
  onChange,
  spaceEqually = false,
  vertical = false,
  ...rest
}) {
  const [currentIndex, setCurrentIndex] = useState(controlledIndex)
  const [prevControlledIndex, setPrevControlledIndex] = useState(controlledIndex)

  if (controlledIndex !== prevControlledIndex) {
    setCurrentIndex(controlledIndex)
    setPrevControlledIndex(controlledIndex)
  }

  const ctx = useMemo(
    () => ({ currentIndex, onChange, spaceEqually: !!spaceEqually, vertical: !!vertical }),
    [currentIndex, onChange, spaceEqually, vertical]
  )

  return (
    <ProgressIndicatorContext.Provider value={ctx}>
      <StyledProgressList
        className={className}
        $vertical={!!vertical}
        $spaceEqually={!!spaceEqually}
        {...rest}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null

          const derivedCurrent = index === currentIndex && !child.props.complete
          const derivedComplete = index < currentIndex ? true : !!child.props.complete

          return (
            <ProgressStepDerivedContext.Provider
              key={child.key ?? index}
              value={{ index, derivedCurrent, derivedComplete }}
            >
              {child}
            </ProgressStepDerivedContext.Provider>
          )
        })}
      </StyledProgressList>
    </ProgressIndicatorContext.Provider>
  )
}

export function ProgressStep({
  label,
  description,
  className,
  current,
  complete,
  invalid,
  secondaryLabel,
  disabled,
  onClick,
  translateWithId = defaultTranslateWithId,
  ...rest
}) {
  const { onChange } = useProgressIndicatorContext()
  const { index, derivedCurrent, derivedComplete } = useProgressStepDerivedContext()

  const isCurrent = typeof current === 'boolean' ? current : derivedCurrent
  const isComplete = typeof complete === 'boolean' ? complete : derivedComplete
  const isInvalid = !!invalid
  const isDisabled = !!disabled

  const clickHandler = onChange ? () => onChange(index) : onClick

  let messageId = translationIds.incomplete
  if (isCurrent) messageId = translationIds.current
  if (isComplete) messageId = translationIds.complete
  if (isInvalid) messageId = translationIds.invalid

  const message = translateWithId(messageId)

  const isClickable = !!clickHandler && !isCurrent && !isDisabled
  const tabIndex = isClickable ? 0 : -1

  return (
    <StyledStepItem className={className}>
      <StyledStepButton
        type="button"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        tabIndex={tabIndex}
        onClick={isClickable ? clickHandler : undefined}
        onKeyDown={e => {
          if (!isClickable) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            clickHandler(e)
          }
        }}
        title={typeof label === 'string' ? label : undefined}
        $current={isCurrent}
        $complete={isComplete}
        $invalid={isInvalid}
        $disabled={isDisabled}
        {...rest}
      >
        <Icon
          complete={isComplete}
          current={isCurrent}
          invalid={isInvalid}
          description={description}
        />
        <StyledTextWrap>
          <StyledLabel>{label}</StyledLabel>
          {secondaryLabel !== null && secondaryLabel !== undefined ? (
            <StyledSecondary>{secondaryLabel}</StyledSecondary>
          ) : null}
        </StyledTextWrap>
        <StyledAssistive>{message}</StyledAssistive>
      </StyledStepButton>
    </StyledStepItem>
  )
}

ProgressIndicator.displayName = 'ProgressIndicator'
ProgressStep.displayName = 'ProgressStep'
