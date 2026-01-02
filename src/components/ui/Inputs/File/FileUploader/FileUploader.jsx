import React, { forwardRef, useCallback, useId, useImperativeHandle, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useFeatureFlag } from '../../../System/FeatureFlags'
import {
  ButtonRow,
  FileActions,
  FileName,
  FileRow,
  Files,
  HiddenInput,
  IconButton,
  LabelDescription,
  LabelTitle,
  Root,
  StatusPill,
  TriggerButton,
} from './FileUploader.styles'

function CloseIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SpinnerIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 2a6 6 0 106 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function toAcceptString(accept) {
  if (!accept) return undefined
  if (Array.isArray(accept)) return accept.join(',')
  return String(accept)
}

function randomId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

const FileUploader = forwardRef(function FileUploader(
  {
    accept,
    buttonKind, // accepted for API-compat; styling is handled internally
    buttonLabel = 'Add files',
    className,
    disabled = false,
    filenameStatus = 'edit',
    iconDescription = 'Remove file',
    labelDescription,
    labelTitle,
    maxFileSize,
    multiple = false,
    name,
    onAddFiles,
    onChange,
    onClick,
    onDelete,
    size, // accepted for API-compat
    ...rest
  },
  ref
) {
  const instanceId = useId()
  const describedById = labelDescription ? `${instanceId}-desc` : undefined
  const inputRef = useRef(null)
  const triggerRef = useRef(null)

  const enhanced = useFeatureFlag('enable-enhanced-file-uploader')

  const [fileItems, setFileItems] = useState([])
  const [legacyFileNames, setLegacyFileNames] = useState([])

  const validateFiles = useCallback(
    files => {
      return files.map(file => {
        if (maxFileSize && file && typeof file.size === 'number' && file.size > maxFileSize) {
          file.invalidFileType = true
        }
        return file
      })
    },
    [maxFileSize]
  )

  const createFileItem = useCallback(
    file => ({
      name: file.name,
      uuid: `${instanceId}-${randomId()}`,
      file,
    }),
    [instanceId]
  )

  const emitEnhancedOnChange = useCallback(
    (evt, { addedFiles = [], removedFiles = [], currentFiles = [], action }) => {
      if (!onChange) return

      const allFiles = currentFiles.map(it => it.file)
      const enhancedEvent = {
        ...evt,
        target: {
          ...(evt?.target || {}),
          files: Object.assign(allFiles, {
            item: index => allFiles[index] || null,
          }),
          addedFiles,
          removedFiles,
          currentFiles,
          action,
        },
      }

      onChange(enhancedEvent)
    },
    [onChange]
  )

  const handleNativeChange = useCallback(
    evt => {
      evt.stopPropagation?.()

      const incoming = Array.from(evt.target.files || [])
      const filesToValidate = multiple ? incoming : incoming.slice(0, 1)
      const validated = validateFiles(filesToValidate)

      onAddFiles?.(evt, { addedFiles: validated })

      // FileUploader cannot display invalid files; mimic Carbon behavior.
      const validFiles = validated.filter(f => !f.invalidFileType)
      if (validFiles.length === 0) return

      if (enhanced) {
        const newItems = validFiles.map(createFileItem)

        let nextItems
        if (multiple) {
          const existingNames = new Set(fileItems.map(it => it.name))
          const uniqueNew = newItems.filter(it => !existingNames.has(it.name))
          nextItems = [...fileItems, ...uniqueNew]
        } else {
          nextItems = newItems
        }

        setFileItems(nextItems)
        emitEnhancedOnChange(evt, {
          addedFiles: newItems,
          removedFiles: [],
          currentFiles: nextItems,
          action: 'add',
        })
      } else {
        const filenames = validFiles.map(f => f.name)
        const nextNames = multiple ? Array.from(new Set([...legacyFileNames, ...filenames])) : filenames
        setLegacyFileNames(nextNames)
        onChange?.(evt)
      }

      // Allow selecting the same file again.
      if (inputRef.current) inputRef.current.value = ''
    },
    [
      createFileItem,
      emitEnhancedOnChange,
      enhanced,
      fileItems,
      legacyFileNames,
      multiple,
      onAddFiles,
      onChange,
      validateFiles,
    ]
  )

  const displayFiles = useMemo(() => {
    if (enhanced) return fileItems.map((it, index) => ({ key: it.uuid, name: it.name, index }))
    return legacyFileNames.map((name, index) => ({ key: String(index), name, index }))
  }, [enhanced, fileItems, legacyFileNames])

  const removeAtIndex = useCallback(
    (evt, index) => {
      evt.stopPropagation?.()

      if (enhanced) {
        const deletedItem = fileItems[index]
        if (!deletedItem) return

        const remaining = fileItems.filter((_, i) => i !== index)
        setFileItems(remaining)

        const enhancedEvent = {
          ...evt,
          target: {
            ...(evt?.target || {}),
            deletedFile: deletedItem,
            deletedFileName: deletedItem.name,
            remainingFiles: remaining,
            currentFiles: remaining,
            action: 'remove',
          },
        }

        onDelete?.(enhancedEvent, { deletedFile: deletedItem, remainingFiles: remaining })
        onChange?.(enhancedEvent)
      } else {
        const deletedName = legacyFileNames[index]
        const next = legacyFileNames.filter(n => n !== deletedName)
        setLegacyFileNames(next)
        onDelete?.(evt)
      }

      onClick?.(evt)
      triggerRef.current?.focus?.()
    },
    [enhanced, fileItems, legacyFileNames, onChange, onClick, onDelete]
  )

  useImperativeHandle(
    ref,
    () => ({
      clearFiles() {
        if (enhanced) {
          const previous = [...fileItems]
          setFileItems([])

          if (onChange && previous.length > 0) {
            const enhancedEvent = {
              target: {
                files: Object.assign([], { item: () => null }),
                clearedFiles: previous,
                currentFiles: [],
                action: 'clear',
              },
              preventDefault: () => {},
              stopPropagation: () => {},
            }
            onChange(enhancedEvent)
          }
        } else {
          setLegacyFileNames([])
        }
      },
      ...(enhanced
        ? {
            getCurrentFiles() {
              return [...fileItems]
            },
          }
        : null),
    }),
    [enhanced, fileItems, onChange]
  )

  const statusEl = useMemo(() => {
    if (filenameStatus === 'uploading') return <SpinnerIcon />
    if (filenameStatus === 'complete') return <CheckIcon />
    return null
  }, [filenameStatus])

  return (
    <Root className={className} {...rest}>
      {labelTitle ? <LabelTitle>{labelTitle}</LabelTitle> : null}
      {labelDescription ? <LabelDescription id={describedById}>{labelDescription}</LabelDescription> : null}

      <ButtonRow>
        <HiddenInput
          ref={inputRef}
          id={`${instanceId}-input`}
          type="file"
          name={name}
          accept={toAcceptString(accept)}
          multiple={multiple}
          disabled={disabled}
          aria-describedby={describedById}
          onChange={handleNativeChange}
        />
        <TriggerButton
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={evt => {
            onClick?.(evt)
            inputRef.current?.click?.()
          }}
          aria-describedby={describedById}
        >
          {buttonLabel}
        </TriggerButton>
        {buttonKind ? null : null}
        {size ? null : null}
      </ButtonRow>

      <Files>
        {displayFiles.map(file => (
          <FileRow key={file.key}>
            <FileName>{file.name}</FileName>
            <FileActions>
              <StatusPill aria-hidden="true">{statusEl}</StatusPill>
              <IconButton
                type="button"
                aria-label={`${iconDescription}${file.name ? ` - ${file.name}` : ''}`}
                disabled={disabled || filenameStatus !== 'edit'}
                onClick={evt => removeAtIndex(evt, file.index)}
                onKeyDown={evt => {
                  if (evt.key === 'Enter' || evt.key === ' ') removeAtIndex(evt, file.index)
                }}
              >
                <CloseIcon />
              </IconButton>
            </FileActions>
          </FileRow>
        ))}
      </Files>
    </Root>
  )
})

FileUploader.displayName = 'FileUploader'

FileUploader.propTypes = {
  accept: PropTypes.arrayOf(PropTypes.string),
  buttonKind: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'danger--primary',
    'danger--ghost',
    'danger--tertiary',
    'tertiary',
  ]),
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading']),
  iconDescription: PropTypes.string,
  labelDescription: PropTypes.string,
  labelTitle: PropTypes.string,
  maxFileSize: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onAddFiles: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
}

export default FileUploader
