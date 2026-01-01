File: FileUploader/Filename.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close, WarningFilled, CheckmarkFilled } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import Loading from '../Loading';
import { usePrefix } from '../../internal/usePrefix';

export type FilenameStatus = 'edit' | 'complete' | 'uploading';

type SVGAttr = React.SVGAttributes<React.ReactSVGElement>;

export interface FilenameProps
  extends Omit<HTMLAttributes<HTMLElement> & SVGAttr, 'tabIndex' | 'type'> {
  /**
   * Specify an id that describes the error to be read by screen readers when the filename is invalid
   */
  ['aria-describedby']?: string;

  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription?: string;

  /**
   * Specify if the file is invalid
   */
  invalid?: boolean;

  /**
   * Name of the uploaded file
   */
  name?: string;

  /**
   * Status of the file upload
   */
  status?: FilenameStatus;

  /**
   * Provide a custom tabIndex value for the `<Filename>`
   */
  tabIndex?: number;
}

function Filename({
  iconDescription = 'Uploading file',
  status = 'uploading',
  invalid,
  name,
  tabIndex = 0,
  ['aria-describedby']: ariaDescribedBy,
  ...rest
}: FilenameProps) {
  const prefix = usePrefix();
  switch (status) {
    case 'uploading':
      return (
        <Loading
          description={iconDescription}
          small
          withOverlay={false}
          className={`${prefix}--file-loading`}
        />
      );
    case 'edit':
      return (
        <>
          {invalid && <WarningFilled className={`${prefix}--file-invalid`} />}
          <button
            aria-label={`${iconDescription} - ${name}`}
            className={`${prefix}--file-close`}
            type="button"
            tabIndex={tabIndex}
            {...rest}
            aria-describedby={invalid ? ariaDescribedBy : undefined}>
            <Close />
          </button>
        </>
      );
    case 'complete':
      return (
        <CheckmarkFilled
          aria-label={iconDescription}
          className={`${prefix}--file-complete`}
          {...rest}
          tabIndex={-1}>
          {iconDescription && <title>{iconDescription}</title>}
        </CheckmarkFilled>
      );
    default:
      return null;
  }
}

Filename.propTypes = {
  /**
   * Specify an id that describes the error to be read by screen readers when the filename is invalid
   */
  ['aria-describedby']: PropTypes.string,

  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

  /**
   * Provide a custom tabIndex value for the `<Filename>`
   */
  tabIndex: PropTypes.number,
};

export default Filename;



File: FileUploader/FileUploader.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';
import { usePrefix } from '../../internal/usePrefix';

export interface FileUploaderSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

function FileUploaderSkeleton({
  className,
  ...rest
}: FileUploaderSkeletonProps) {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      <SkeletonText heading width="100px" />
      <SkeletonText width="225px" className={`${prefix}--label-description`} />
      <ButtonSkeleton />
    </div>
  );
}

FileUploaderSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FileUploaderSkeleton;
export { FileUploaderSkeleton };



File: FileUploader/test-helpers.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent } from '@testing-library/dom';

/**
 * A helper with standardizing behavior around selecting and clearing files with
 * an input with type="file".
 *
 * Based on comments on this discussion over in react-testing-library:
 * https://github.com/testing-library/react-testing-library/issues/93#issuecomment-392126991
 *
 * @param {HTMLInputElement} input
 * @param {Array<File>} [files]
 */
export function uploadFiles(input, files = []) {
  // Define the 'files' property on the input with the given files
  Object.defineProperty(input, 'files', {
    writable: true,
    value: files,
  });

  // When we update the value of the empty, if it is falsy we clear the input
  // files to mirror browser behavior
  Object.defineProperty(input, 'value', {
    set(newValue) {
      if (!newValue) {
        input.files.length = 0;
      }
    },
  });

  // Simulate the change event with the given options
  fireEvent.change(input, {
    target: {
      files,
    },
  });
}



File: FileUploader/FileUploader.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FileUploader } from '../FileUploader';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/FileUploader/Feature Flag',
  component: FileUploader,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-enhanced-file-uploader': true,
        }}>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const EnhancedCallbacks = (args) => {
  const handleChange = (event, data) => {
    console.log('  Action:', event.target.action);

    if (event.target.addedFiles) {
      console.log(
        '  Added Files:',
        event.target.addedFiles.map((f) => ({ name: f.name, uuid: f.uuid }))
      );
    }

    if (event.target.deletedFile) {
      console.log('  Deleted File:', {
        name: event.target.deletedFile.name,
        uuid: event.target.deletedFile.uuid,
      });
    }

    if (event.target.clearedFiles) {
      console.log(
        '  Cleared Files:',
        event.target.clearedFiles.map((f) => ({ name: f.name, uuid: f.uuid }))
      );
    }

    console.log(
      '  Current Files:',
      event.target.currentFiles?.map((f) => ({ name: f.name, uuid: f.uuid })) ||
        []
    );
  };

  const handleDelete = (event, data) => {
    console.log('  Deleted File Object:', event.target.deletedFile);
    console.log('  Deleted File Name:', event.target.deletedFile?.name);
    console.log(
      '  Remaining Files:',
      event.target.remainingFiles?.map((f) => ({
        name: f.name,
        uuid: f.uuid,
      })) || []
    );
  };

  return (
    <div>
      <FileUploader
        labelTitle="Enhanced FileUploader Demo"
        labelDescription="Open browser console to see detailed callback data when adding/removing files"
        buttonLabel="Add file(s)"
        buttonKind="primary"
        filenameStatus="edit"
        multiple={true}
        onChange={handleChange}
        onDelete={handleDelete}
        iconDescription="Remove uploaded file"
        {...args}
      />
    </div>
  );
};

EnhancedCallbacks.args = {
  disabled: false,
};

EnhancedCallbacks.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};



File: FileUploader/FileUploader.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import ExampleDropContainerApp from './stories/drop-container';
import ExampleDropContainerAppSingle from './stories/drag-and-drop-single';
import mdx from './FileUploader.mdx';

import {
  default as FileUploader,
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
  FileUploaderSkeleton,
} from './';

const filenameStatuses = ['edit', 'complete', 'uploading'];

export default {
  title: 'Components/FileUploader',
  component: FileUploader,
  subcomponents: {
    FileUploaderButton,
    FileUploaderSkeleton,
    FileUploaderItem,
    FileUploaderDropContainer,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const _FileUploaderItem = (args) => {
  return (
    <FileUploaderItem
      errorBody="1 MB max file size. Select a new file and try again."
      errorSubject="File size exceeds limit"
      iconDescription="Delete file"
      invalid={false}
      name="THIS IS A VERY LONG FILENAME WHICH WILL BE TRUNCATED"
      status="edit"
      size="md"
      {...args}
    />
  );
};

_FileUploaderItem.argTypes = {
  errorBody: {
    control: 'text',
    description: 'Error message body for an invalid file upload',
  },
  errorSubject: {
    control: 'text',
    description: 'Error message subject for an invalid file upload',
  },
  iconDescription: { control: 'text' },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently uploaded file is invalid',
  },
  name: { control: 'text', description: 'Name of the uploaded file' },
  onDelete: { action: 'onDelete' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
  status: {
    control: 'inline-radio',
    options: ['uploading', 'edit', 'complete'],
    description: 'Status of the file upload',
  },
  uuid: {
    control: 'text',
    description: 'Unique identifier for the file object',
  },
};

// Remove all the props that don't apply to FileUploaderItem
_FileUploaderItem.parameters = {
  controls: {
    exclude: [
      'accept',
      'buttonKind',
      'buttonLabel',
      'disabled',
      'labelDescription',
      'labelTitle',
      'multiple',
      'filenameStatus',
    ],
  },
};

export const _FileUploaderDropContainer = () => {
  return (
    <FileUploaderDropContainer
      labelText="Drag and drop files here or click to upload"
      multiple={true}
      maxFileSize={1024 * 1024}
      accept={['image/jpeg', 'image/png']}
      disabled={false}
      name=""
    />
  );
};

export const DragAndDropUploadContainerExampleApplication = (args) =>
  ExampleDropContainerApp(args);

DragAndDropUploadContainerExampleApplication.args = {
  labelText: 'Drag and drop files here or click to upload',
  name: '',
  multiple: true,
  maxFileSize: 1024 * 1024,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  tabIndex: 0,
};
DragAndDropUploadContainerExampleApplication.argTypes = {
  onChange: { action: 'onChange' },
};

export const DragAndDropUploadSingleContainerExampleApplication = (args) =>
  ExampleDropContainerAppSingle(args);

DragAndDropUploadSingleContainerExampleApplication.args = {
  labelText: 'Drag and drop a file here or click to upload',
  name: '',
  multiple: false,
  maxFileSize: 1024 * 1024,
  accept: ['image/jpeg', 'image/png'],
  disabled: false,
  tabIndex: 0,
};
DragAndDropUploadSingleContainerExampleApplication.argTypes = {
  onChange: { action: 'onChange' },
};

export const Skeleton = () => {
  return (
    <div style={{ width: '500px' }}>
      <FileUploaderSkeleton />
    </div>
  );
};

export const Default = (args) => {
  return (
    <div className="cds--file__container">
      <FileUploader {...args} />
    </div>
  );
};

Default.args = {
  labelTitle: 'Upload files',
  labelDescription: 'Max file size is 1 MB. Only .jpg files are supported.',
  buttonLabel: 'Add file',
  buttonKind: 'primary',
  size: 'md',
  filenameStatus: 'edit',
  accept: ['.jpg', '.png'],
  multiple: true,
  maxFileSize: 1024 * 1024,
  disabled: false,
  iconDescription: 'Delete file',
  name: '',
};
Default.argTypes = {
  onChange: { action: 'onChange' },
  onClick: { action: 'onClick' },
  onDelete: { action: 'onDelete' },
  buttonKind: {
    control: { type: 'select' },
    options: [
      'primary',
      'secondary',
      'danger',
      'ghost',
      'danger--primary',
      'tertiary',
    ],
  },
  filenameStatus: {
    control: { type: 'select' },
    options: filenameStatuses,
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
  },
};

Default.parameters = {
  controls: { exclude: ['accept', 'role'] },
};



File: FileUploader/FileUploader.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as FileUploaderStories from './FileUploader.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# FileUploader

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FileUploader)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/file-uploader/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/file-uploader/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Drag And Drop](#drag-and-drop)
    - [Drag And Drop Upload Container Example Application](#drag-and-drop-upload-container-example-application)
    - [Drag And Drop Upload Single Container Example Application](#drag-and-drop-upload-single-container-example-application)
- [File](#file)
    - [File Uploader Drop Container](#file-uploader-drop-container)
    - [File Uploader Item](#file-uploader-item)
- [Skeleton state](#skeleton-state)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FileUploaderStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories.Default),
    },
  ]}
/>

## Drag And Drop

#### Drag And Drop Upload Container Example Application

<Canvas
  of={FileUploaderStories.DragAndDropUploadContainerExampleApplication}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories.DragAndDropUploadContainerExampleApplication),
    },
  ]}
/>

#### Drag And Drop Upload Single Container Example Application
<Canvas
  of={FileUploaderStories.DragAndDropUploadSingleContainerExampleApplication}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories.DragAndDropUploadSingleContainerExampleApplication),
    },
  ]}
/>

## File 

#### File Uploader Drop Container

<Canvas
  of={FileUploaderStories._FileUploaderDropContainer}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories._FileUploaderDropContainer),
    },
  ]}
/>

#### File Uploader Item

<Canvas
  of={FileUploaderStories._FileUploaderItem}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories._FileUploaderItem),
    },
  ]}
/>

## Skeleton state
<Canvas
  of={FileUploaderStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FileUploaderStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FileUploader/FileUploader.mdx).



File: FileUploader/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FileUploader from './FileUploader';

export default FileUploader;
export { FileUploader };
export { default as Filename } from './Filename';
export { default as FileUploaderSkeleton } from './FileUploader.Skeleton';
export { default as FileUploaderButton } from './FileUploaderButton';
export { default as FileUploaderDropContainer } from './FileUploaderDropContainer';
export { default as FileUploaderItem } from './FileUploaderItem';



File: FileUploader/FileUploader.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/FileUploader/Feature Flag" name="Flag details" />

# Enhanced FileUploader Callbacks

The `enable-enhanced-file-uploader` flag enables enhanced functionality for the
FileUploader component, including richer callback data and expanded trigger
events for `onChange` and `onDelete`.

When this flag is enabled, the `onChange` callback is consistently triggered for
all file list modifications (additions, deletions, programmatic clears), and both
`onChange` and `onDelete` events are augmented with detailed file information
like `deletedFile`, `addedFiles`, and `currentFiles` on `event.target`.

## Enable enhanced FileUploader callbacks

```js
<FeatureFlags enableEnhancedFileUploader={true}>
  <FileUploader
    multiple
    filenameStatus="edit"
    onChange={(evt) => console.log('onChange', evt.target.action, evt.target.currentFiles)}
    onDelete={(evt) => console.log('onDelete', evt.target.deletedFile)}
  />
</FeatureFlags>


File: FileUploader/FileUploader.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useImperativeHandle,
  useState,
  useCallback,
  type ForwardedRef,
  type HTMLAttributes,
} from 'react';
import Filename from './Filename';
import FileUploaderButton from './FileUploaderButton';
import { ButtonKinds } from '../Button/Button';
import { keys, matches } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';

interface FileItem {
  name: string;
  uuid: string;
  file: File & { invalidFileType?: boolean };
}

export interface FileChangeData {
  addedFiles: FileItem[];
  removedFiles: FileItem[];
  currentFiles: FileItem[];
  action: 'add' | 'remove' | 'clear';
}

export interface FileDeleteData {
  deletedFile: FileItem;
  remainingFiles: FileItem[];
}

export interface FileUploaderProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Specify the type of the `<FileUploaderButton>`
   */
  buttonKind?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'danger--primary'
    | 'danger--ghost'
    | 'danger--tertiary'
    | 'tertiary';

  /**
   * Provide the label text to be read by screen readers when interacting with
   * the `<FileUploaderButton>`
   */
  buttonLabel?: string;

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: 'edit' | 'complete' | 'uploading';

  /**
   * Provide a description for the complete/close icon that can be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify the description text of this `<FileUploader>`
   */
  labelDescription?: string;

  /**
   * Specify the title text of this `<FileUploader>`
   */
  labelTitle?: string;

  /**
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize?: number;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (
    event: React.SyntheticEvent<HTMLElement>,
    content: { addedFiles: Array<File & { invalidFileType?: boolean }> }
  ) => void;

  /**
   * Provide an optional `onChange` hook that is called each time the input is changed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Also fires for file deletions and clearFiles operations
   * - Event includes enhanced file information in event.target
   */
  onChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data?: FileChangeData
  ) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item is removed.
   * When 'enable-enhanced-file-uploader' feature flag is enabled:
   * - Event includes deleted file information in event.target
   */
  onDelete?: (
    event: React.SyntheticEvent<HTMLElement>,
    data?: FileDeleteData
  ) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';
}

export interface FileUploaderHandle {
  /**
   * Clear internal state
   */
  clearFiles: () => void;

  /**
   * Get current files (only available when 'enable-enhanced-file-uploader' feature flag is enabled)
   */
  getCurrentFiles?: () => FileItem[];
}

const FileUploader = React.forwardRef(
  (
    {
      accept,
      buttonKind,
      buttonLabel,
      className,
      disabled,
      filenameStatus,
      iconDescription,
      labelDescription,
      labelTitle,
      maxFileSize,
      multiple,
      name,
      onAddFiles,
      onChange,
      onClick,
      onDelete,
      size,
      ...other
    }: FileUploaderProps,
    ref: ForwardedRef<FileUploaderHandle>
  ) => {
    const fileUploaderInstanceId = useId('file-uploader');
    const prefix = usePrefix();

    const enhancedFileUploaderEnabled = useFeatureFlag(
      'enable-enhanced-file-uploader'
    );

    const [fileItems, setFileItems] = useState<FileItem[]>([]);
    const [legacyFileNames, setLegacyFileNames] = useState<
      (string | undefined)[]
    >([]);

    const uploaderButton = React.createRef<HTMLLabelElement>();
    const nodes: HTMLElement[] = [];

    const createFileItem = useCallback(
      (file: File & { invalidFileType?: boolean }): FileItem => ({
        name: file.name,
        uuid: `${fileUploaderInstanceId}-${Date.now()}-${Array.from(
          crypto.getRandomValues(new Uint8Array(8))
        )
          .map((b) => b.toString(36))
          .join('')}`,
        file,
      }),
      [fileUploaderInstanceId]
    );

    /**
     * Validates files based on file size restrictions.
     * Marks invalid files with `invalidFileType: true` but includes them in the result.
     *
     * Note: The `accept` prop is passed to the native HTML input element (`FileUploaderButton`),
     * which provides UI-level filtering in the file picker dialog, but there is no JavaScript validation
     * for file types - users can bypass this by changing the file type filter in the dialog.
     * https://github.com/carbon-design-system/carbon/issues/21166
     */
    const validateFiles = useCallback(
      (
        files: Array<File & { invalidFileType?: boolean }>
      ): Array<File & { invalidFileType?: boolean }> => {
        return files.map((file) => {
          if (maxFileSize && file.size > maxFileSize) {
            file.invalidFileType = true;
          }
          return file;
        });
      },
      [maxFileSize]
    );

    const handleChange = useCallback(
      (evt) => {
        evt.stopPropagation();
        const incomingFiles = Array.from(evt.target.files as FileList);
        const filesToValidate = multiple ? incomingFiles : [incomingFiles[0]];
        const validatedFiles = validateFiles(filesToValidate);

        if (onAddFiles) {
          onAddFiles(evt, { addedFiles: validatedFiles });
        }

        // Filter out invalid files since FileUploader cannot display them
        // (FileUploaderDropContainer returns all files because parent uses FileUploaderItem to display errors)
        // https://github.com/carbon-design-system/carbon/issues/21166
        const validFiles = validatedFiles.filter(
          (file) => !file.invalidFileType
        );

        if (validFiles.length === 0) {
          return;
        }

        if (enhancedFileUploaderEnabled) {
          const newFileItems = validFiles.map(createFileItem);

          let updatedFileItems: FileItem[];
          if (multiple) {
            const existingNames = new Set(fileItems.map((item) => item.name));
            const uniqueNewItems = newFileItems.filter(
              (item) => !existingNames.has(item.name)
            );
            updatedFileItems = [...fileItems, ...uniqueNewItems];
          } else {
            updatedFileItems = newFileItems;
          }

          setFileItems(updatedFileItems);

          if (onChange) {
            const allFiles = updatedFileItems.map((item) => item.file);
            const enhancedEvent = {
              ...evt,
              target: {
                ...evt.target,
                files: Object.assign(allFiles, {
                  item: (index: number) => allFiles[index] || null,
                }),
                addedFiles: newFileItems,
                currentFiles: updatedFileItems,
                action: 'add',
              },
            };
            onChange(enhancedEvent);
          }
        } else {
          const filenames = validFiles.map((file) => file.name);

          const updatedFileNames = multiple
            ? [...new Set([...legacyFileNames, ...filenames])]
            : filenames;

          setLegacyFileNames(updatedFileNames);

          if (onChange) {
            onChange(evt);
          }
        }
      },
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        multiple,
        onAddFiles,
        onChange,
        createFileItem,
        validateFiles,
      ]
    );

    const handleClick = useCallback(
      (evt, { index, filenameStatus }) => {
        if (filenameStatus === 'edit') {
          evt.stopPropagation();

          if (enhancedFileUploaderEnabled) {
            const deletedItem = fileItems[index];
            if (!deletedItem) return;

            const remainingItems = fileItems.filter((_, i) => i !== index);
            setFileItems(remainingItems);

            const remainingFiles = remainingItems.map((item) => item.file);

            const enhancedEvent = {
              ...evt,
              target: {
                ...evt.target,
                files: Object.assign(remainingFiles, {
                  item: (index: number) => remainingFiles[index] || null,
                }),
                deletedFile: deletedItem,
                deletedFileName: deletedItem.name,
                remainingFiles: remainingItems,
                currentFiles: remainingItems,
                action: 'remove',
              },
            };

            if (onDelete) {
              onDelete(enhancedEvent);
            }

            if (onChange) {
              onChange(enhancedEvent);
            }
          } else {
            const deletedFileName = legacyFileNames[index];
            const filteredArray = legacyFileNames.filter(
              (filename) => filename !== deletedFileName
            );

            setLegacyFileNames(filteredArray);

            if (onDelete) {
              onDelete(evt);
            }
          }

          if (onClick) {
            onClick(evt);
          }

          uploaderButton.current?.focus?.();
        }
      },
      [
        enhancedFileUploaderEnabled,
        fileItems,
        legacyFileNames,
        onDelete,
        onChange,
        onClick,
        uploaderButton,
      ]
    );

    useImperativeHandle(
      ref,
      () => ({
        clearFiles() {
          if (enhancedFileUploaderEnabled) {
            const previousItems = [...fileItems];
            setFileItems([]);

            if (onChange && previousItems.length > 0) {
              const enhancedEvent = {
                target: {
                  files: Object.assign([], { item: () => null }),
                  clearedFiles: previousItems,
                  currentFiles: [],
                  action: 'clear',
                },
                preventDefault: () => {},
                stopPropagation: () => {},
              } as unknown as React.SyntheticEvent<HTMLElement>;
              onChange(enhancedEvent);
            }
          } else {
            setLegacyFileNames([]);
          }
        },

        ...(enhancedFileUploaderEnabled && {
          getCurrentFiles() {
            return [...fileItems];
          },
        }),
      }),
      [enhancedFileUploaderEnabled, fileItems, onChange]
    );

    const classes = classNames({
      [`${prefix}--form-item`]: true,
      [className as string]: className,
    });
    const getHelperLabelClasses = (baseClass) =>
      classNames(baseClass, {
        [`${prefix}--label-description--disabled`]: disabled,
      });

    const selectedFileClasses = classNames(`${prefix}--file__selected-file`, {
      [`${prefix}--file__selected-file--md`]: size === 'field' || size === 'md',
      [`${prefix}--file__selected-file--sm`]: size === 'small' || size === 'sm',
    });

    const displayFiles = enhancedFileUploaderEnabled
      ? fileItems.map((item, index) => ({
          name: item.name,
          key: item.uuid,
          index,
        }))
      : legacyFileNames.map((name, index) => ({ name, key: index, index }));

    return (
      <div className={classes} {...other}>
        {!labelTitle ? null : (
          <Text
            as="h3"
            className={getHelperLabelClasses(`${prefix}--file--label`)}>
            {labelTitle}
          </Text>
        )}
        <Text
          as="p"
          className={getHelperLabelClasses(`${prefix}--label-description`)}
          id={fileUploaderInstanceId}>
          {labelDescription}
        </Text>
        <FileUploaderButton
          innerRef={uploaderButton}
          disabled={disabled}
          labelText={buttonLabel}
          multiple={multiple}
          buttonKind={buttonKind}
          onChange={handleChange}
          disableLabelChanges
          accept={accept}
          name={name}
          size={size}
          aria-describedby={fileUploaderInstanceId}
        />
        <div className={`${prefix}--file-container`}>
          {displayFiles.length === 0
            ? null
            : displayFiles.map((file) => (
                <span
                  key={file.key}
                  className={selectedFileClasses}
                  ref={(node) => {
                    nodes[file.index] = node as HTMLSpanElement;
                  }}
                  {...other}>
                  <Text
                    as="p"
                    className={`${prefix}--file-filename`}
                    id={
                      enhancedFileUploaderEnabled
                        ? `${fileUploaderInstanceId}-file-${fileItems[file.index]?.uuid || file.index}`
                        : `${fileUploaderInstanceId}-file-${file.index}`
                    }>
                    {file.name}
                  </Text>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      name={file.name}
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={(evt) => {
                        if (matches(evt, [keys.Enter, keys.Space])) {
                          handleClick(evt, {
                            index: file.index,
                            filenameStatus,
                          });
                        }
                      }}
                      onClick={(evt) =>
                        handleClick(evt, { index: file.index, filenameStatus })
                      }
                    />
                  </span>
                </span>
              ))}
        </div>
      </div>
    );
  }
) as {
  (props: FileUploaderProps): React.ReactElement;
  displayName?: string;
  propTypes?: unknown;
  contextTypes?: unknown;
  defaultProps?: unknown;
};

FileUploader.displayName = 'FileUploader';

FileUploader.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of the `<FileUploaderButton>`
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Provide the label text to be read by screen readers when interacting with
   * the `<FileUploaderButton>`
   */
  buttonLabel: PropTypes.string,

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading']).isRequired,

  /**
   * Provide a description for the complete/close icon that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify the description text of this `<FileUploader>`
   */
  labelDescription: PropTypes.string,

  /**
   * Specify the title text of this `<FileUploader>`
   */
  labelTitle: PropTypes.string,

  /**
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize: PropTypes.number,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Event handler that is called after files are added to the uploader
   * The event handler signature looks like `onAddFiles(evt, { addedFiles })`
   */
  onAddFiles: PropTypes.func,

  /**
   * Provide an optional `onChange` hook that is called each time the input is
   * changed
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item
   * is removed
   */
  onDelete: PropTypes.func,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'small', 'md', 'field', 'lg']),
} as PropTypes.ValidationMap<FileUploaderProps>;

export default FileUploader;



File: FileUploader/stories/drop-container.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import { useId } from '../../../internal/useId';

const prefix = 'cds';

const ExampleDropContainerApp = (props) => {
  const [files, setFiles] = useState([]);
  const uploaderButton = useRef(null);
  const uniqueId = useId();
  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleDragover = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragover);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragover);
    };
  }, []);

  const uploadFile = async (fileToUpload) => {
    // file size validation
    if (fileToUpload.filesize > 512000) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: '1 MB max file size. Select a new file and try again.',
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      return;
    }

    // file type validation
    if (fileToUpload.invalidFileType) {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
      return;
    }

    // simulate network request time
    const rand = Math.random() * 1000;
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
    }, rand);

    // show x icon after 1 second
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload,
        status: 'edit',
        iconDescription: 'Delete file',
      };
      setFiles((files) =>
        files.map((file) =>
          file.uuid === fileToUpload.uuid ? updatedFile : file
        )
      );
    }, rand + 1000);
  };

  const onAddFiles = useCallback(
    (evt, { addedFiles }) => {
      evt.stopPropagation();
      const newFiles = addedFiles.map((file) => ({
        uuid: uniqueId + file.name + file.size,
        name: file.name,
        filesize: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
        invalidFileType: file.invalidFileType,
      }));
      // eslint-disable-next-line react/prop-types
      if (props.multiple) {
        setFiles([...files, ...newFiles]);
        newFiles.forEach(uploadFile);
      } else if (newFiles[0]) {
        setFiles([newFiles[0]]);
        uploadFile(newFiles[0]);
      }
    },
    // eslint-disable-next-line react/prop-types
    [files, props.multiple]
  );

  const handleFileUploaderItemClick = useCallback(
    (_, { uuid: clickedUuid }) => {
      uploaderButton.current.focus();
      return setFiles(files.filter(({ uuid }) => clickedUuid !== uuid));
    },
    [files]
  );

  const labelClasses = classnames(`${prefix}--file--label`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--file--label--disabled`]: props.disabled,
  });

  const helperTextClasses = classnames(`${prefix}--label-description`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--label-description--disabled`]: props.disabled,
  });

  return (
    <FormItem>
      <p className={labelClasses}>Upload files</p>
      <p className={helperTextClasses}>
        Max file size is 1 MB. Supported file types are .jpg and .png.
      </p>
      <FileUploaderDropContainer
        {...props}
        onAddFiles={onAddFiles}
        innerRef={uploaderButton}
      />
      <div
        className={classnames(
          `${prefix}--file-container`,
          `${prefix}--file-container--drop`
        )}>
        {files.map(
          ({
            uuid,
            name,
            filesize,
            status,
            iconDescription,
            invalid,
            ...rest
          }) => (
            <FileUploaderItem
              key={uuid}
              uuid={uuid}
              name={name}
              filesize={filesize}
              // eslint-disable-next-line react/prop-types
              size={props.size}
              status={status}
              iconDescription={iconDescription}
              invalid={invalid}
              onDelete={handleFileUploaderItemClick}
              {...rest}
            />
          )
        )}
      </div>
    </FormItem>
  );
};

export default ExampleDropContainerApp;



File: FileUploader/stories/drag-and-drop-single.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import FileUploaderItem from '../FileUploaderItem';
import FileUploaderDropContainer from '../FileUploaderDropContainer';
import FormItem from '../../FormItem';
import { useId } from '../../../internal/useId';

const prefix = 'cds';

const ExampleDropContainerApp = (props) => {
  const [file, setFile] = useState();
  const uploaderButton = useRef(null);
  const uniqueId = useId();
  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleDragover = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragover);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragover);
    };
  }, []);

  const uploadFile = async (fileToUpload) => {
    // file size validation
    if (fileToUpload[0].filesize > 512000) {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'File size exceeds limit',
        errorBody: '1 MB max file size. Select a new file and try again.',
      };
      setFile(updatedFile);
      return;
    }

    // file type validation
    if (fileToUpload.invalidFileType) {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
      };
      setFile(updatedFile);
      return;
    }

    // simulate network request time
    const rand = Math.random() * 1000;
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFile(updatedFile);
    }, rand);

    // show x icon after 1 second
    setTimeout(() => {
      const updatedFile = {
        ...fileToUpload[0],
        status: 'edit',
        iconDescription: 'Delete file',
      };
      setFile(updatedFile);
    }, rand + 1000);
  };

  const onAddFilesButton = (event, { addedFiles }) => {
    const file = addedFiles;

    const newFile = [
      {
        uuid: uniqueId + file[0].name + file[0].size,
        name: file[0].name,
        filesize: file[0].size,
        status: 'uploading',
        iconDescription: 'Uploading',
        invalidFileType: file[0].invalidFileType,
      },
    ];

    setFile(newFile[0]);
    uploadFile([newFile[0]]);
  };

  const handleFileUploaderItemClick = () => {
    setFile();
  };

  const labelClasses = classnames(`${prefix}--file--label`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--file--label--disabled`]: props.disabled,
  });

  const helperTextClasses = classnames(`${prefix}--label-description`, {
    // eslint-disable-next-line react/prop-types
    [`${prefix}--label-description--disabled`]: props.disabled,
  });

  return (
    <FormItem>
      <p className={labelClasses}>Upload files</p>
      <p className={helperTextClasses}>
        Max file size is 500kb. Supported file types are .jpg and .png.
      </p>
      {file === undefined && (
        <FileUploaderDropContainer
          {...props}
          onAddFiles={onAddFilesButton}
          innerRef={uploaderButton}
        />
      )}

      <div
        className={classnames(
          `${prefix}--file-container`,
          `${prefix}--file-container--drop`
        )}>
        {file !== undefined && (
          <FileUploaderItem
            key={file.uuid}
            uuid={file.uuid}
            name={file.name}
            filesize={file.filesize}
            errorSubject="File size exceeds limit"
            errorBody="1 MB max file size. Select a new file and try again."
            // eslint-disable-next-line react/prop-types
            size={props.size}
            status={file.status}
            iconDescription={file.iconDescription}
            invalid={file.invalid}
            onDelete={handleFileUploaderItemClick}
            onAddFiles={onAddFilesButton}
          />
        )}
      </div>
    </FormItem>
  );
};

export default ExampleDropContainerApp;



File: FileUploader/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-fileuploader--default'
    },
    {
      label: 'File Uploader Drop Container',
      variant: 'components-fileuploader--file-uploader-drop-container'
    },
    {
      label: 'File Uploader Item',
      variant: 'components-fileuploader--file-uploader-item'
    }
  ]}
/>



File: FileUploader/FileUploaderItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import Filename from './Filename';
import { keys, matches } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

export interface FileUploaderItemProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Error message body for an invalid file upload
   */
  errorBody?: string;

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject?: string;

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription?: string;

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid?: boolean;

  /**
   * Name of the uploaded file
   */
  name?: string;

  /**
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete?: (
    event: React.SyntheticEvent<HTMLElement>,
    opts: { uuid: string }
  ) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Status of the file upload
   */
  status?: 'uploading' | 'edit' | 'complete';

  /**
   * Unique identifier for the file object
   */
  uuid?: string;
}
function FileUploaderItem({
  uuid,
  name,
  status = 'uploading',
  iconDescription,
  onDelete = noopFn,
  invalid,
  errorSubject,
  errorBody,
  size,
  className,
  ...other
}: FileUploaderItemProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
  const prefix = usePrefix();
  const generatedId = useId();
  const { current: id } = useRef(uuid || generatedId);
  const classes = cx(`${prefix}--file__selected-file`, className, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
    [`${prefix}--file__selected-file--md`]: size === 'md',
    [`${prefix}--file__selected-file--sm`]: size === 'sm',
  });
  const isInvalid = invalid
    ? `${prefix}--file-filename-container-wrap-invalid`
    : `${prefix}--file-filename-container-wrap`;

  const filterSpaceName = (name: string | undefined) => {
    return name?.replace(/\s+/g, '');
  };

  const isEllipsisActive = (element: HTMLElement | null) => {
    if (!element) {
      setIsEllipsisApplied(false);
      return false;
    }
    const isActive = element.offsetWidth < element.scrollWidth;
    setIsEllipsisApplied(isActive);
    return isActive;
  };

  useLayoutEffect(() => {
    isEllipsisActive(textRef.current);
  }, [prefix, name]);

  return (
    <span className={classes} {...other}>
      {isEllipsisApplied ? (
        <div className={isInvalid}>
          <Tooltip
            label={name}
            align="bottom"
            className={`${prefix}--file-filename-tooltip`}>
            <button className={`${prefix}--file-filename-button`} type="button">
              <Text
                ref={textRef}
                as="p"
                title={name}
                className={`${prefix}--file-filename-button`}
                id={filterSpaceName(name)}>
                {name}
              </Text>
            </button>
          </Tooltip>
        </div>
      ) : (
        <Text
          ref={textRef}
          as="p"
          title={name}
          className={`${prefix}--file-filename`}
          id={filterSpaceName(name)}>
          {name}
        </Text>
      )}

      <div className={`${prefix}--file-container-item`}>
        <span className={`${prefix}--file__state-container`}>
          <Filename
            name={name}
            iconDescription={iconDescription}
            status={status}
            invalid={invalid}
            aria-describedby={
              invalid && errorSubject
                ? `${filterSpaceName(name)}-id-error`
                : undefined
            }
            onKeyDown={(evt) => {
              if (matches(evt, [keys.Enter, keys.Space])) {
                if (status === 'edit') {
                  evt.preventDefault();
                  onDelete(evt, { uuid: id });
                }
              }
            }}
            onClick={(evt) => {
              if (status === 'edit') {
                onDelete(evt, { uuid: id });
              }
            }}
          />
        </span>
      </div>
      {invalid && errorSubject && (
        <div
          className={`${prefix}--form-requirement`}
          role="alert"
          id={`${filterSpaceName(name)}-id-error`}>
          <Text as="div" className={`${prefix}--form-requirement__title`}>
            {errorSubject}
          </Text>
          {errorBody && (
            <Text as="p" className={`${prefix}--form-requirement__supplement`}>
              {errorBody}
            </Text>
          )}
        </div>
      )}
    </span>
  );
}

FileUploaderItem.propTypes = {
  /**
   * Error message body for an invalid file upload
   */
  errorBody: PropTypes.string,

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject: PropTypes.string,

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete: PropTypes.func,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),

  /**
   * Unique identifier for the file object
   */
  uuid: PropTypes.string,
};

export default FileUploaderItem;



File: FileUploader/FileUploaderButton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState, type HTMLAttributes } from 'react';
import { matches, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';
import { ButtonKinds } from '../Button';

export interface FileUploaderButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'tabIndex'> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Specify the type of underlying button
   */
  buttonKind?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'danger--primary'
    | 'danger--ghost'
    | 'danger--tertiary'
    | 'tertiary';

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges?: boolean;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText?: React.ReactNode;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role?: string;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'field' | 'md' | 'lg';

  /**
   * @deprecated The `tabIndex` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default.
   */
  tabIndex?: number | string;

  innerRef?: React.RefObject<HTMLLabelElement | null>;
}

function FileUploaderButton({
  accept,
  buttonKind = 'primary',
  className,
  disabled = false,
  disableLabelChanges = false,
  id,
  labelText: ownerLabelText = 'Add file',
  multiple = false,
  onChange = noopFn,
  name,
  size = 'md',

  innerRef,
  ...other
}: FileUploaderButtonProps) {
  const prefix = usePrefix();
  const [labelText, setLabelText] = useState(ownerLabelText);
  const [prevOwnerLabelText, setPrevOwnerLabelText] = useState(ownerLabelText);
  const generatedId = useId();
  const { current: inputId } = useRef(id || generatedId);
  const inputNode = useRef<HTMLInputElement>(null);
  const classes = cx(`${prefix}--btn`, className, {
    [`${prefix}--btn--${buttonKind}`]: buttonKind,
    [`${prefix}--btn--disabled`]: disabled,
    // V11: remove field, small
    [`${prefix}--btn--md`]: size === 'field' || size === 'md',
    [`${prefix}--btn--sm`]: size === 'small' || size === 'sm',
    [`${prefix}--layout--size-${size}`]: size,
  });

  // Adjust label text state based on changes to the labelText prop
  if (ownerLabelText !== prevOwnerLabelText) {
    setLabelText(ownerLabelText);
    setPrevOwnerLabelText(ownerLabelText);
  }

  function onClick(event) {
    event.target.value = null;
    if (inputNode.current) {
      inputNode.current.value = '';
      inputNode.current.click();
    }
  }

  function onKeyDown(event) {
    if (matches(event, [keys.Enter, keys.Space])) {
      event.preventDefault();
      if (inputNode.current) {
        inputNode.current.value = '';
        inputNode.current.click();
      }
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const length = event.target.files?.length || 0;
    if (files && !disableLabelChanges) {
      if (length > 1) {
        setLabelText(`${length} files`);
      } else if (length === 1) {
        setLabelText(files[0].name);
      }
    }
    onChange(event);
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...other}
        tabIndex={
          other.tabIndex !== undefined
            ? parseInt(other.tabIndex as string)
            : undefined
        }>
        {labelText}
      </button>
      <label
        className={`${prefix}--visually-hidden`}
        ref={innerRef}
        htmlFor={inputId}>
        <span>{labelText}</span>
      </label>
      <input
        className={`${prefix}--visually-hidden`}
        ref={inputNode}
        id={inputId}
        disabled={disabled}
        type="file"
        tabIndex={-1}
        multiple={multiple}
        accept={accept?.toString()}
        name={name}
        onChange={handleOnChange}
      />
    </>
  );
}

FileUploaderButton.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of underlying button
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges: PropTypes.bool,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.node,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role: PropTypes.string,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Provide a custom tabIndex value for the `<FileUploaderButton>`
   */
  tabIndex: deprecate(
    PropTypes.number,
    'The `tabIndex` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default.'
  ),
};

export default FileUploaderButton;



File: FileUploader/FileUploaderDropContainer.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState, type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { keys, matches } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { deprecate } from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';

export interface FileUploaderDropContainerProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'tabIndex'> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText?: string;

  /**
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize?: number;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (
    event: React.SyntheticEvent<HTMLElement>,
    content: { addedFiles: AddedFile[] }
  ) => void;

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick?: () => void;

  /**
   * Provide a custom regex pattern for the acceptedTypes
   */
  pattern?: string;

  /**
   * Ref to pass to the inner button element
   */
  innerRef?: React.Ref<HTMLButtonElement>;

  /**
   * @deprecated The `role` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default, and has an implicit role of button.
   */
  role?: string;

  /**
   * @deprecated The `tabIndex` prop for `FileUploaderButton` has been deprecated since it now renders a button element by default.
   */
  tabIndex?: number | string;
}

interface AddedFile extends File {
  invalidFileType?: boolean;
}

function FileUploaderDropContainer({
  accept = [],
  className,
  id,
  disabled,
  labelText = 'Add file',
  maxFileSize,
  multiple = false,
  name,
  onAddFiles = noopFn,
  onClick,
  pattern = '.[0-9a-z]+$',

  innerRef,
  ...rest
}: FileUploaderDropContainerProps) {
  const prefix = usePrefix();
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const { current: uid } = useRef(id || generatedId);
  const [isActive, setActive] = useState(false);
  const dropareaClasses = classNames(
    `${prefix}--file__drop-container`,
    `${prefix}--file-browse-btn`,
    {
      [`${prefix}--file__drop-container--drag-over`]: isActive,
      [`${prefix}--file-browse-btn--disabled`]: disabled,
    },
    className
  );

  /**
   * Filters the array of added files based on file type and size restrictions
   */
  function validateFiles(transferredFiles: AddedFile[]) {
    const acceptedTypes = new Set(accept);
    return transferredFiles.reduce<AddedFile[]>((acc, curr) => {
      const { name, type: mimeType = '' } = curr;
      const fileExtensionRegExp = new RegExp(pattern, 'i');
      const [fileExtension] = name.match(fileExtensionRegExp) ?? [];

      if (maxFileSize && curr.size > maxFileSize) {
        curr.invalidFileType = true;
        return acc.concat([curr]);
      }

      if (!accept.length) {
        return acc.concat([curr]);
      }

      if (fileExtension === undefined) {
        return acc;
      }
      if (
        acceptedTypes.has(mimeType) ||
        acceptedTypes.has(fileExtension.toLowerCase())
      ) {
        return acc.concat([curr]);
      }
      curr.invalidFileType = true;
      return acc.concat([curr]);
    }, []);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])];
    const filesToValidate = multiple ? files : [files[0]];
    const addedFiles = validateFiles(filesToValidate);
    return onAddFiles(event, { addedFiles });
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const files = [...event.dataTransfer.files];
    const filesToValidate = multiple ? files : [files[0]];
    const addedFiles = validateFiles(filesToValidate);
    return onAddFiles(event, { addedFiles });
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`${prefix}--file`}
      onDragOver={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(true);
        evt.dataTransfer.dropEffect = 'copy';
      }}
      onDragLeave={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(false);
        evt.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if (disabled) {
          return;
        }
        setActive(false);
        handleDrop(evt);
      }}>
      {/* @ts-expect-error remove this ignore line when the explicit tabIndex prop is deleted */}
      <button
        type="button"
        className={dropareaClasses}
        ref={innerRef}
        onKeyDown={(evt) => {
          if (matches(evt, [keys.Enter, keys.Space])) {
            evt.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={composeEventHandlers([onClick, handleClick])}
        {...rest}>
        {labelText}
      </button>
      <label htmlFor={uid} className={`${prefix}--visually-hidden`}>
        {labelText}
      </label>
      <input
        type="file"
        id={uid}
        className={`${prefix}--file-input`}
        ref={inputRef}
        tabIndex={-1}
        disabled={disabled}
        accept={accept.join(',')}
        name={name}
        multiple={multiple}
        onChange={handleChange}
        onClick={(evt) => {
          (evt.target as HTMLInputElement).value = '';
        }}
      />
    </div>
  );
}

FileUploaderDropContainer.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.string.isRequired,

  /**
   * Maximum file size allowed in bytes. Files larger than this will be marked invalid
   */
  maxFileSize: PropTypes.number,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Event handler that is called after files are added to the uploader
   * The event handler signature looks like `onAddFiles(evt, { addedFiles })`
   */
  onAddFiles: PropTypes.func,

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a custom regex pattern for the acceptedTypes
   */
  pattern: PropTypes.string,

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role: deprecate(
    PropTypes.number,
    'The `role` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default, and has an implicit role of button.'
  ),

  /**
   * Provide a custom tabIndex value for the `<FileUploaderButton>`
   */
  tabIndex: deprecate(
    PropTypes.number,
    'The `tabIndex` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default.'
  ),
};

export default FileUploaderDropContainer;



