import React from 'react'
import FileUploader from './FileUploader'

export default {
  title: 'Inputs/File/FileUploader',
  component: FileUploader,
}

export function Default() {
  return <FileUploader
  id="fileuploader-demo" />
}

export function Disabled() {
  return <FileUploader
  id="fileuploader-demo"
  disabled />
}

export function Invalid() {
  return (
    <FileUploader
  id="fileuploader-demo"
  invalid
  invalidText="Invalid" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <FileUploader
  id="fileuploader-demo"
  size="sm" />
      <FileUploader
  id="fileuploader-demo"
  size="md" />
      <FileUploader
  id="fileuploader-demo"
  size="lg" />
    </div>
  )
}
