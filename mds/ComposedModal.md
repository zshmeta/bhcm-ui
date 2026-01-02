File: ComposedModal/ComposedModalPresence.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import {
  usePresenceContext,
  type PresenceContext,
} from '../../internal/usePresenceContext';
import { useComposedModalState } from './useComposedModalState';

export interface ComposedModalPresenceProps {
  /**
   * Specify whether the Modal is currently open
   */
  open: boolean;

  /**
   * Internal property for backwards compatibility. Specify whether the Modal should opt in to presence mode.
   */
  _autoEnablePresence?: boolean;

  /**
   * Internal property to predefine the presence context's id for exclusivity.
   */
  _presenceId?: string;
}

export const ComposedModalPresence = ({
  open,
  _presenceId: presenceId,
  _autoEnablePresence: autoEnablePresence = true,
  children,
}: PropsWithChildren<ComposedModalPresenceProps>) => {
  // Since the modal could be used without an onClose callback, we need to be aware of the internal isOpen state
  const modalState = useComposedModalState(open);
  const [isOpen] = modalState;

  const [isPresent, context] = usePresenceContext(isOpen, presenceId);

  const presenceContextValue = useMemo(
    () => ({
      modalState,
      autoEnablePresence,
      ...context,
    }),
    [modalState, autoEnablePresence, context]
  );

  if (!isPresent) return null;

  return (
    <ComposedModalPresenceContext value={presenceContextValue}>
      {children}
    </ComposedModalPresenceContext>
  );
};

interface ComposedModalPresenceContextProps extends PresenceContext {
  modalState: ReturnType<typeof useComposedModalState>;
  autoEnablePresence: boolean;
}

export const ComposedModalPresenceContext = createContext<
  ComposedModalPresenceContextProps | undefined
>(undefined);

/**
 * Handles occurrences where only a single composed modal must consume a context.
 */
export const useExclusiveComposedModalPresenceContext = (id: string) => {
  const ctx = useContext(ComposedModalPresenceContext);
  return ctx?.isPresenceExclusive(id) ? ctx : undefined;
};



File: ComposedModal/ComposedModal.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/ComposedModal/Feature Flags" name="Flag details" />

# Feature Flags for ComposedModal

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ComposedModal)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/modal/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/modal/accessibility)

## `enable-focus-wrap-without-sentinels`

`ComposedModal` supports the `enable-focus-wrap-without-sentinels` feature flag.
When enabled, the hidden "sentinel nodes" used for focus wrap are no longer
emitted to the DOM. These were previously used to mark the beginning and end of
the area where focus should wrap within.

The new behavior looks at all interactive child nodes and wraps focus based on
tabbable order of those nodes. The focus direction is determined whether `tab`
is being pressed (forward) or `shift`+`tab` is being pressed (backwards).

Note: The native dialog element handles focus, so `enable-dialog-element` must
be off for `enable-focus-wrap-without-sentinels` to have any effect.

This flag was previously called
`enable-experimental-focus-wrap-without-sentinels`.

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enableFocusWrapWithoutSentinels>
  <ComposedModal ... />
</FeatureFlags>
```

## `enable-dialog-element`

`ComposedModal` supports the `enable-dialog-element` feature flag. When enabled,
ComposedModal will use the native `<dialog>` element instead of `role="dialog"`.
With the `<dialog>` element, the browser natively controls the focus wrap
behavior. This means that:

- The DOM no longer includes the "sentinel nodes" previously needed for the
  ComposedModal to manage focus wrap.
- `enable-focus-wrap-without-sentinels` has no effect and can be removed when
  using `enable-dialog-element`

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enableDialogElement>
  <ComposedModal ... />
</FeatureFlags>
```

## `enable-presence`

`ComposedModal` supports the `enable-presence` feature flag. When enabled,
ComposedModal will not mount until the modal is opened and unmount when it's
closed. This helps to stay in sync with the React lifecycle.

This means that:

- The DOM no longer includes `ComposedModal` and its children in the closed
  state
- `ComposedModal`, all of its children and their hooks will mount/unmount on
  open/close
- Enter & exit animations change from CSS transitions to CSS animations

Note: Only `ComposedModal` and its children are unmounted/mounted. Use
`ComposedModalPresence` to shift the presence boundary to a higher level, if
necessary.

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enablePresence>
  <ComposedModal ... />
</FeatureFlags>
```

Or auto opt in by using `ComposedModalPresence` to shift the presence boundary
to a different level:

```js
<ComposedModalPresence open={open}>
  <ComposedModal ... />
</ComposedModalPresence>
```



File: ComposedModal/ModalHeader-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ModalHeader } from './ModalHeader';

const prefix = 'cds';

describe('ModalHeader', () => {
  it('should render title if has title text', () => {
    const { container } = render(<ModalHeader title="Carbon" />);

    expect(container.firstChild).toHaveTextContent('Carbon');
  });

  it('should label if has label text', () => {
    const { container } = render(<ModalHeader label="Carbon label" />);

    expect(container.firstChild).toHaveTextContent('Carbon label');
  });

  it('should render with a ref', () => {
    const ref = React.createRef();
    render(<ModalHeader label="Carbon label" ref={ref} />);

    expect(ref.current).toHaveClass(`${prefix}--modal-header`);
  });
});



File: ComposedModal/ComposedModalPresence.stories.scss


//
// Copyright IBM Corp. 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/config' with (
  $prefix: 'presence'
);

@use '@carbon/react/scss/components/modal/modal';
@use '@carbon/react/scss/components/dialog/dialog';
@use '@carbon/react/scss/components/text-input/text-input';
@use '@carbon/react/scss/components/select/select';

.preview-modal-with-presence {
  @include modal.modal(
    $enable-experimental-focus-wrap-without-sentinels: false,
    $enable-focus-wrap-without-sentinels: false,
    $enable-dialog-element: false,
    $enable-presence: true
  );
  @include text-input.text-input();
  @include select.select();
}



File: ComposedModal/ModalHeader.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ReactNode,
  type MouseEvent,
  type HTMLAttributes,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';

export type DivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
export interface ModalHeaderProps extends DivProps {
  /**
   * Provide an optional function to be called when the close button is
   * clicked
   */
  buttonOnClick?(event: MouseEvent): void;

  /**
   * Specify the content to be placed in the ModalHeader
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal header
   */
  className?: string;

  /**
   * Specify an optional className to be applied to the modal close node
   */
  closeClassName?: string;

  /**
   * Specify an optional className to be applied to the modal close icon node
   */
  closeIconClassName?: string;

  /**
   * Provide an optional function to be called when the modal is closed
   */
  closeModal?(event: MouseEvent): void;

  /**
   * Specify a description for the close icon that can be read by screen
   * readers
   */
  iconDescription?: string;

  /**
   * Specify an optional label to be displayed
   */
  label?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal header label
   */
  labelClassName?: string;

  /**
   * Specify an optional title to be displayed
   */
  title?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal heading
   */
  titleClassName?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(
    {
      buttonOnClick,
      children,
      className: customClassName,
      closeClassName,
      closeIconClassName,
      closeModal,
      iconDescription = 'Close',
      label,
      labelClassName,
      title,
      titleClassName,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    function handleCloseButtonClick(evt: MouseEvent) {
      closeModal?.(evt);
      buttonOnClick?.(evt);
    }

    const headerClass = cx(`${prefix}--modal-header`, customClassName);

    const labelClass = cx(
      `${prefix}--modal-header__label ${prefix}--type-delta`,
      labelClassName
    );

    const titleClass = cx(
      `${prefix}--modal-header__heading ${prefix}--type-beta`,
      titleClassName
    );

    const closeClass = cx(`${prefix}--modal-close`, closeClassName);

    const closeIconClass = cx(
      `${prefix}--modal-close__icon`,
      closeIconClassName
    );

    return (
      <div className={headerClass} {...rest} ref={ref}>
        {label && <h2 className={labelClass}>{label}</h2>}

        {title && <h2 className={titleClass}>{title}</h2>}

        {children}

        <div className={`${prefix}--modal-close-button`}>
          <IconButton
            className={closeClass}
            label={iconDescription}
            onClick={handleCloseButtonClick}
            aria-label={iconDescription}
            align="left">
            <Close
              size={20}
              aria-hidden="true"
              tabIndex="-1"
              className={closeIconClass}
            />
          </IconButton>
        </div>
      </div>
    );
  }
);

ModalHeader.propTypes = {
  /**
   * Provide an optional function to be called when the close button is
   * clicked
   */
  buttonOnClick: PropTypes.func,

  /**
   * Specify the content to be placed in the ModalHeader
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal header
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal close node
   */
  closeClassName: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal close icon node
   */
  closeIconClassName: PropTypes.string,

  /**
   * Provide an optional function to be called when the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify a description for the close icon that can be read by screen
   * readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify an optional label to be displayed
   */
  label: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal header label
   */
  labelClassName: PropTypes.string,

  /**
   * Specify an optional title to be displayed
   */
  title: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal heading
   */
  titleClassName: PropTypes.string,
};



File: ComposedModal/ComposedModal.stories.scss


//
// Copyright IBM Corp. 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.sb-notification p {
  line-height: 1;
}



File: ComposedModal/ComposedModal.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { MultiSelect } from '../MultiSelect';
import Dropdown from '../Dropdown';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './ComposedModal.mdx';

export default {
  title: 'Components/ComposedModal',
  component: ComposedModal,
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'containerClassName',
        'launcherButtonRef',
        'selectorPrimaryFocus',
        'selectorsFloatingMenus',
      ],
    },
  },
};

const sharedArgTypes = {
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
};

export const Default = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal {...args} open={open} onClose={() => setOpen(false)}>
        <ModalHeader
          label="Account resources"
          title="Add a custom domain"
          {...args}
        />
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          {...args}
        />
      </ComposedModal>
    </>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const FullWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)} isFullWidth>
        <ModalHeader
          label="An example of a modal with no padding"
          title="Full Width Modal"
        />
        <ModalBody>
          <StructuredListWrapper>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head noWrap>
                  Column A
                </StructuredListCell>
                <StructuredListCell head noWrap>
                  Column B
                </StructuredListCell>
                <StructuredListCell head noWrap>
                  Column C
                </StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 1</StructuredListCell>
                <StructuredListCell>Row 1</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 2</StructuredListCell>
                <StructuredListCell>Row 2</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 3</StructuredListCell>
                <StructuredListCell>Row 3</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
            </StructuredListBody>
          </StructuredListWrapper>
        </ModalBody>
        <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const PassiveModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="You have been successfully signed out" />
        <ModalBody />
      </ComposedModal>
    </>
  );
};

export const WithStateManager = () => {
  const button = React.useRef();

  /**
   * Simple state manager for modals.
   */
  const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        {!ModalContent || typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
              <ModalContent open={open} setOpen={setOpen} />,
              document.body
            )}
        {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
      </>
    );
  };
  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button ref={button} onClick={() => setOpen(true)}>
          Launch composed modal
        </Button>
      )}>
      {({ open, setOpen }) => (
        <ComposedModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          launcherButtonRef={button}>
          <ModalHeader label="Account resources" title="Add a custom domain" />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </ModalBody>
          <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
        </ComposedModal>
      )}
    </ModalStateManager>
  );
};

export const WithScrollingContent = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Account resources" title="Add a custom domain" />
        <ModalBody hasScrollingContent>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            eu nibh odio. Nunc a consequat est, id porttitor sapien. Proin vitae
            leo vitae orci tincidunt auctor eget eget libero. Ut tincidunt
            ultricies fringilla. Aliquam erat volutpat. Aenean arcu odio,
            elementum vel vehicula vitae, porttitor ac lorem. Sed viverra elit
            ac risus tincidunt fermentum. Ut sollicitudin nibh id risus ornare
            ornare. Etiam gravida orci ut lectus dictum, quis ultricies felis
            mollis. Mauris nec commodo est, nec faucibus nibh. Nunc commodo ante
            quis pretium consectetur. Ut ac nisl vitae mi mattis vulputate a at
            elit. Nullam porttitor ex eget mi feugiat mattis. Nunc non sodales
            magna. Proin ornare tellus quis hendrerit egestas. Donec pharetra
            leo nec molestie sollicitudin.{' '}
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <div style={{ marginBottom: '1rem' }}>
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </div>
          <Dropdown
            id="drop"
            label="Dropdown"
            titleText="Dropdown"
            items={[
              { id: 'one', label: 'one', name: 'one' },
              { id: 'two', label: 'two', name: 'two' },
            ]}
            style={{ marginBottom: '1rem' }}
          />
          <MultiSelect
            id="test"
            label="Multiselect"
            titleText="Multiselect"
            items={[
              {
                id: 'downshift-1-item-0',
                text: 'Option 1',
              },
              {
                id: 'downshift-1-item-1',
                text: 'Option 2',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </ModalBody>
        <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithInlineLoading = () => {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState('inactive');
  const [description, setDescription] = useState('Submitting...');

  const fakePromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const submit = async () => {
    setStatus('active');

    await fakePromise();

    setDescription('Submitted!');
    setStatus('finished');
  };

  const resetStatus = () => {
    setStatus('inactive');
    setDescription('Submitting...');
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Account resources" title="Add a custom domain" />
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          loadingStatus={status}
          loadingDescription={description}
          onRequestSubmit={submit}
          onLoadingSuccess={resetStatus}
        />
      </ComposedModal>
    </>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const _withAILabel = {
  render: () => {
    const [open, setOpen] = useState(true); // eslint-disable-line
    return (
      <div className="ai-label-modal">
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
        <ComposedModal
          open={open}
          onClose={() => setOpen(false)}
          decorator={aiLabel}>
          <ModalHeader label="Account resources" title="Add a custom domain" />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eu nibh odio. Nunc a consequat est, id porttitor sapien. Proin
              vitae leo vitae orci tincidunt auctor eget eget libero. Ut
              tincidunt ultricies fringilla. Aliquam erat volutpat. Aenean arcu
              odio, elementum vel vehicula vitae, porttitor ac lorem. Sed
              viverra elit ac risus tincidunt fermentum. Ut sollicitudin nibh id
              risus ornare ornare. Etiam gravida orci ut lectus dictum, quis
              ultricies felis mollis. Mauris nec commodo est, nec faucibus nibh.
              Nunc commodo ante quis pretium consectetur. Ut ac nisl vitae mi
              mattis vulputate a at elit. Nullam porttitor ex eget mi feugiat
              mattis. Nunc non sodales magna. Proin ornare tellus quis hendrerit
              egestas. Donec pharetra leo nec molestie sollicitudin.
            </p>

            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p style={{ marginBlock: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
          </ModalBody>

          <ModalFooter
            primaryButtonText="Save"
            secondaryButtons={[{ buttonText: 'Cancel' }]}
          />
        </ComposedModal>
      </div>
    );
  },
};



File: ComposedModal/useComposedModalState.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo, useState } from 'react';

export const useComposedModalState = (open: boolean | undefined) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [wasOpen, setWasOpen] = useState<boolean>(!!open);

  // Keep track of modal open/close state
  useEffect(() => {
    if (open !== wasOpen) {
      setIsOpen(!!open);
      setWasOpen(!!open);
    }
  }, [open, wasOpen]);

  return useMemo(() => [isOpen, setIsOpen] as const, [isOpen]);
};



File: ComposedModal/ComposedModal-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef, useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ComposedModalPresence } from './ComposedModalPresence';
import { FeatureFlags, useFeatureFlag } from '../FeatureFlags';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { TextInput } from '../../';
import { AILabel } from '../AILabel';

const prefix = 'cds';

const ComposedModalWithPresenceFeatureFlag = ({ open = true, ...props }) => {
  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  return (
    <FeatureFlags enablePresence enableDialogElement={enableDialogElement}>
      <ComposedModal {...props} open={open} />
    </FeatureFlags>
  );
};

const ComposedModalWithPresenceContext = ({ open = true, ...props }) => {
  return (
    <ComposedModalPresence open={open}>
      <ComposedModal {...props} />
    </ComposedModalPresence>
  );
};

describe.each([
  { title: 'ComposedModal', Component: ComposedModal },
  {
    title: 'ComposedModal with presence feature flag',
    Component: ComposedModalWithPresenceFeatureFlag,
    isPresence: true,
  },
  {
    title: 'ComposedModal with presence context',
    Component: ComposedModalWithPresenceContext,
    isPresence: true,
  },
])('$title', ({ Component, isPresence }) => {
  describe('it renders as expected', () => {
    it('supports a custom class on the outermost div', () => {
      render(<Component className="custom-class" />);

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the container div', () => {
      render(<Component containerClassName="custom-class" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the modal body', () => {
      render(
        <Component>
          <ModalBody className="custom-class" data-testid="modal-body" />
        </Component>
      );

      expect(screen.getByTestId('modal-body')).toHaveClass('custom-class');
    });

    it('should spread props onto the outermost div', () => {
      render(<Component data-testid="modal" />);

      expect(
        screen.getByRole('presentation', { hidden: true })
      ).toHaveAttribute('data-testid', 'modal');
    });

    it('should be labelled by a provided aria-label', () => {
      render(<Component aria-label="modal" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-label',
        'modal'
      );
    });

    it('should be labelled by a provided aria-labelledby', () => {
      render(
        <div>
          <label id="label-modal-id">Label for modal</label>
          <Component aria-labelledby="label-modal-id">
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>This is the modal body content</ModalBody>
            <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
          </Component>
        </div>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-labelledby',
        'label-modal-id'
      );
    });

    it('should change submit to danger button', () => {
      render(
        <Component danger open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            danger
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
          />
        </Component>
      );

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'cds--modal--danger'
      );
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = jest.fn();
      render(
        <Component open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      await userEvent.click(screen.getByLabelText('Close'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should not close when onClose returns false', async () => {
      const onClose = () => false;
      render(
        <Component open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      await userEvent.click(screen.getByLabelText('Close'));

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );
    });

    it('should focus selector on open', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <Component
              open={isOpen}
              preventCloseOnClickOutside
              selectorPrimaryFocus="#text-input-1">
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
            </Component>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'), { clickCount: 3 });

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByTestId('test-id-1');
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the primary button', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <Component open={isOpen} preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
              />
            </Component>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByRole('button', { name: 'Add' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the secondary button if danger is true', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <Component
              danger
              selectorPrimaryFocus="#text-input-1"
              open={isOpen}
              preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
              />
            </Component>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByRole('button', { name: 'Cancel' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the close button if there is no focusable element', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <Component open={isOpen} preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
            </Component>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toBeVisible();

      const elementInput = screen.getByRole('button', { name: 'Close' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on launcherButtonRef element on close when defined', async () => {
      const ComposedModalExample = () => {
        const buttonRef = useRef(null);
        const [isOpen, setIsOpen] = useState(false);

        return (
          <>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsOpen(true)}>
              Launch modal
            </button>
            <Component
              launcherButtonRef={buttonRef}
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}>
              <ModalHeader>Header</ModalHeader>
            </Component>
          </>
        );
      };
      render(<ComposedModalExample />);

      const button = screen.getByRole('button', { name: /Launch modal/ });
      await userEvent.click(button);

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );

      await userEvent.click(screen.getByRole('button', { name: /Close/ }));

      if (isPresence) {
        expect(
          screen.queryByRole('presentation', {
            hidden: true,
          })
        ).not.toBeInTheDocument();
      } else {
        expect(
          screen.getByRole('presentation', {
            hidden: true,
          })
        ).not.toHaveClass('is-visible');
      }

      expect(button).toHaveFocus();
    });

    it('should change size based on size prop', () => {
      render(
        <Component open size="lg">
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        `${prefix}--modal-container--lg`
      );
    });

    it('disables buttons when inline loading status is active', () => {
      render(
        <Component open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </Component>
      );

      expect(screen.getByTitle('loading')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'loading loading...' })
      ).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    });

    it('should respect decorator prop', () => {
      const { container } = render(
        <Component open decorator={<AILabel />}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </Component>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--modal--decorator`);
    });
  });

  describe('enable-dialog-element feature flag', () => {
    it('should bring launcherButtonRef element into focus on close when the ref is defined', async () => {
      const ComposedModalExample = () => {
        const [open, setOpen] = useState(true);
        const focusRef = useRef();
        return (
          <FeatureFlags enableDialogElement>
            <Component
              open={open}
              launcherButtonRef={focusRef}
              onClick={() => setOpen(false)}>
              <button data-testid="close" onClick={() => setOpen(false)}>
                Close
              </button>
            </Component>
            <button data-testid="focusElem" ref={focusRef}>
              focus after close
            </button>
          </FeatureFlags>
        );
      };
      render(<ComposedModalExample />);

      const closeButton = screen.getByTestId('close');
      const focusElem = screen.getByTestId('focusElem');

      expect(focusElem).not.toHaveFocus();
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(focusElem).toHaveFocus();
      });
    });
  });

  it('should respect the deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Component open slug={<AILabel />}>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>This is the modal body content</ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          loadingStatus="active"
          loadingDescription="loading..."></ModalFooter>
      </Component>
    );

    expect(
      screen.getByRole('button', { name: 'AI Show information' })
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it('should handle onClick events', async () => {
    const onClick = jest.fn();
    render(
      <Component open onClick={onClick}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
      </Component>
    );
    const modal = screen.getByRole('dialog');
    await userEvent.click(modal);
    expect(onClick).toHaveBeenCalled();
  });

  it('should NOT close when clicked inside dialog window, dragged outside and released mouse button', async () => {
    const onClose = jest.fn();
    render(
      <Component open onClose={onClose}>
        <ModalBody data-testid="modal-body-1">
          This is the modal body content
        </ModalBody>
      </Component>
    );

    const modalBody = screen.getByTestId('modal-body-1');
    const backgroundLayer = screen.getByRole('presentation');

    fireEvent.mouseDown(modalBody, { target: modalBody });
    fireEvent.click(backgroundLayer, { target: backgroundLayer });

    expect(onClose).not.toHaveBeenCalled();
  });

  describe('close behavior for clicks outside the modal', () => {
    describe('passive', () => {
      it('should close on outside click by default', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);

        if (isPresence) {
          expect(backgroundLayer).not.toBeInTheDocument();
        } else {
          expect(backgroundLayer).not.toHaveClass('is-visible');
        }

        expect(onClose).toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside={false}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);

        if (isPresence) {
          expect(backgroundLayer).not.toBeInTheDocument();
        } else {
          expect(backgroundLayer).not.toHaveClass('is-visible');
        }

        expect(onClose).toHaveBeenCalled();
      });
    });
    describe('non-passive', () => {
      it('should not close on outside click by default', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const onClose = jest.fn();

        render(
          <ComposedModal
            open
            onClose={onClose}
            preventCloseOnClickOutside={false}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </ComposedModal>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).not.toHaveClass('is-visible');
        expect(onClose).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'Warning: `<ComposedModal>` prop `preventCloseOnClickOutside` should not be `false` when `<ModalFooter>` is present. Transactional, non-passive Modals should not be dissmissable by clicking outside. See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
        );

        spy.mockRestore();
      });
    });
  });

  it('should focus on launcherButtonRef element on close when defined', async () => {
    const ComposedModalExample = () => {
      const [open, setOpen] = useState(true);
      const focusRef = useRef();
      return (
        <>
          <Component
            open={open}
            launcherButtonRef={focusRef}
            onClick={() => setOpen(false)}>
            <button data-testid="close" onClick={() => setOpen(false)}>
              Close
            </button>
          </Component>
          <button data-testid="focusElem" ref={focusRef}>
            focus after close
          </button>
        </>
      );
    };
    render(<ComposedModalExample />);

    const closeButton = screen.getByTestId('close');
    const focusElem = screen.getByTestId('focusElem');

    expect(focusElem).not.toHaveFocus();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(focusElem).toHaveFocus();
    });
  });

  it('should close modal when ESC key is pressed regardless of focus', async () => {
    const onClose = jest.fn();
    render(
      <div>
        <div
          data-testid="outside-area"
          style={{ width: '100px', height: '100px' }}>
          Outside area
        </div>
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            This is the modal body content
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
            />
          </ModalBody>
          <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
        </ComposedModal>
      </div>
    );

    expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
      'is-visible'
    );
    await userEvent.click(screen.getByTestId('outside-area'));

    const inputField = screen.getByLabelText('Domain name');
    expect(inputField).not.toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onClose).toHaveBeenCalled();
  });
});

describe('state', () => {
  it('should set expected class when state is open', () => {
    render(
      <ComposedModal open>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>This is the modal body content</ModalBody>
      </ComposedModal>
    );

    expect(screen.getByText('Modal header')).toBeInTheDocument();
    expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
      'is-visible'
    );
  });
});

describe('state with presence feature flag', () => {
  it('should be present when state is open', () => {
    render(<ComposedModalWithPresenceFeatureFlag open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(
      <ComposedModalWithPresenceFeatureFlag open={false} data-testid="modal" />
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <FeatureFlags enablePresence>
        <ComposedModal data-testid="modal" />
      </FeatureFlags>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});

describe('state with presence context', () => {
  it('should be present when state is open', () => {
    render(<ComposedModalWithPresenceContext open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(
      <ComposedModalWithPresenceContext open={false} data-testid="modal" />
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <ComposedModalPresence>
        <ComposedModal data-testid="modal" />
      </ComposedModalPresence>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should handle sibling and child modals exclusively', async () => {
    const ModalExample = () => {
      const [isSiblingOpen, setIsSiblingOpen] = useState(false);
      const [isChildOpen, setIsChildOpen] = useState(false);

      return (
        <ComposedModalPresence open>
          <ComposedModal data-testid="modal">
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>
              <button type="button" onClick={() => setIsSiblingOpen(true)}>
                Launch sibling modal
              </button>
            </ModalBody>
          </ComposedModal>
          <ComposedModal
            data-testid="sibling-modal"
            open={isSiblingOpen}
            onClose={() => setIsSiblingOpen(false)}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>
              <button type="button" onClick={() => setIsChildOpen(true)}>
                Launch child modal
              </button>
              <ComposedModal
                data-testid="child-modal"
                open={isChildOpen}
                onClose={() => setIsChildOpen(false)}>
                <ModalHeader>Modal Header</ModalHeader>
              </ComposedModal>
            </ModalBody>
          </ComposedModal>
        </ComposedModalPresence>
      );
    };
    render(<ModalExample />);

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByTestId('sibling-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('child-modal')).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /Launch sibling modal/,
      })
    );

    const siblingModal = screen.queryByTestId('sibling-modal');

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /Launch child modal/,
      })
    );

    const childModal = screen.queryByTestId('child-modal');

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();
    expect(childModal).toBeInTheDocument();

    await userEvent.click(
      within(childModal).getByRole('button', {
        name: /Close/,
      })
    );

    expect(childModal).not.toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();

    await userEvent.click(
      within(siblingModal).getByRole('button', {
        name: /Close/,
      })
    );

    expect(childModal).not.toBeInTheDocument();
    expect(siblingModal).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});



File: ComposedModal/ComposedModal.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';

export default {
  title: 'Components/ComposedModal/Feature Flags',
  component: ComposedModal,
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
  parameters: {
    controls: {
      exclude: [
        'containerClassName',
        'launcherButtonRef',
        'selectorPrimaryFocus',
        'selectorsFloatingMenus',
      ],
    },
  },
  tags: ['!autodocs'],
};

const sharedArgTypes = {
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
};

export const EnableDialogElement = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <FeatureFlags enableDialogElement>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              enable-dialog-element
            </LinkTo>{' '}
            enabled
          </span>
        }>
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
        <ComposedModal {...args} open={open} onClose={() => setOpen(false)}>
          <ModalHeader
            label="Account resources"
            title="Add a custom domain"
            {...args}
          />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            {...args}
          />
        </ComposedModal>
      </Annotation>
    </FeatureFlags>
  );
};
EnableDialogElement.storyName = 'enable-dialog-element';
EnableDialogElement.argTypes = { ...sharedArgTypes };

export const EnableFocusWrapWithoutSentinels = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <FeatureFlags enableFocusWrapWithoutSentinels>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              enable-preview-focus-wrap-without-sentinels
            </LinkTo>{' '}
            enabled
          </span>
        }>
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
        <ComposedModal {...args} open={open} onClose={() => setOpen(false)}>
          <ModalHeader
            label="Account resources"
            title="Add a custom domain"
            {...args}
          />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            {...args}
          />
        </ComposedModal>
      </Annotation>
    </FeatureFlags>
  );
};
EnableFocusWrapWithoutSentinels.storyName =
  'enable-focus-wrap-without-sentinels';
EnableFocusWrapWithoutSentinels.argTypes = { ...sharedArgTypes };



File: ComposedModal/ModalFooter-test.js


/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ModalFooter } from './ModalFooter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ModalFooter', () => {
  it('should pass a classname to the container', () => {
    const { container } = render(<ModalFooter className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread extra props onto outermost element', () => {
    const { container } = render(<ModalFooter data-testid="test" />);

    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should render primary button text', () => {
    render(
      <ModalFooter primaryButtonText="Submit" secondaryButtonText="Cancel" />
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render secondary button text', () => {
    render(
      <ModalFooter primaryButtonText="Submit" secondaryButtonText="Cancel" />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should disable the primary button', () => {
    render(
      <ModalFooter
        primaryButtonText="Submit"
        primaryButtonDisabled
        secondaryButtonText="Cancel"
      />
    );

    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('should pass classes to primary button', () => {
    render(
      <ModalFooter
        primaryClassName="custom-class"
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
      />
    );

    expect(screen.getByText('Submit')).toHaveClass('custom-class');
  });

  it('should pass classes to secondary button', () => {
    render(
      <ModalFooter
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        secondaryClassName="custom-class"
      />
    );

    expect(screen.getByText('Cancel')).toHaveClass('custom-class');
  });

  it('should call closeModal when the modal is closed', async () => {
    const closeModal = jest.fn();
    render(
      <ModalFooter secondaryButtonText="Cancel" closeModal={closeModal} />
    );

    await userEvent.click(screen.getByText('Cancel'));

    expect(closeModal).toHaveBeenCalled();
  });

  it('should render primary button as danger', () => {
    render(
      <ModalFooter
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
        danger
      />
    );

    expect(screen.getByText('Submit')).toHaveClass('cds--btn--danger');
    expect(screen.getByText('danger', { hidden: true })).toBeInTheDocument();
  });

  it('should call onRequestClose when close requested', async () => {
    const onRequestClose = jest.fn();
    render(
      <ModalFooter
        onRequestClose={onRequestClose}
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
      />
    );

    await userEvent.click(screen.getByText('Cancel'));

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should call onRequestSubmit when submit requested', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <ModalFooter
        onRequestSubmit={onRequestSubmit}
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
      />
    );

    await userEvent.click(screen.getByText('Submit'));

    expect(onRequestSubmit).toHaveBeenCalled();
  });

  it('should render provided secondary buttons', () => {
    const { container } = render(
      <ModalFooter
        secondaryButtons={[
          {
            buttonText: 'Keep both',
            onClick: jest.fn(),
          },
          {
            buttonText: 'Rename',
            onClick: jest.fn(),
          },
        ]}
      />
    );

    expect(container.firstChild).toHaveClass('cds--modal-footer--three-button');
    expect(screen.getByText('Keep both')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
  });
});



File: ComposedModal/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  wide
  tall
  variants={[
    {
      label: 'Default',
      variant: 'components-composedmodal--default'
    },
    {
      label: 'Full Width',
      variant: 'components-composedmodal--full-width'
    },
    {
      label: 'Passive Modal',
      variant: 'components-composedmodal--passive-modal'
    },
    {
      label: 'With State Manager',
      variant: 'components-composedmodal--with-state-manager'
    }
  ]}
/>



File: ComposedModal/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ComposedModal from './ComposedModal';
export {
  default as ComposedModal,
  type ComposedModalProps,
  ModalBody,
  type ModalBodyProps,
} from './ComposedModal';
export {
  ComposedModalPresence,
  type ComposedModalPresenceProps,
} from './ComposedModalPresence';

export { ModalHeader, type ModalHeaderProps } from './ModalHeader';
export { ModalFooter, type ModalFooterProps } from './ModalFooter';
export default ComposedModal;



File: ComposedModal/ComposedModalPresence.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';
import { ClassPrefix } from '../ClassPrefix';
import './ComposedModalPresence.stories.scss';

export default {
  title: 'Components/ComposedModal/Feature Flags',
  component: ComposedModal,
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
  tags: ['!autodocs'],
};

export const EnablePresence = (args) => {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(true);
  return (
    <FeatureFlags enablePresence>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              enable-presence
            </LinkTo>{' '}
            enabled
          </span>
        }>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Launch composed modal
        </Button>
        <ClassPrefix prefix="presence">
          <div className="preview-modal-with-presence">
            <ComposedModal
              {...args}
              open={open}
              launcherButtonRef={buttonRef}
              onClose={() => setOpen(false)}>
              <ModalHeader
                label="Account resources"
                title="Add a custom domain"
                {...args}
              />
              <ModalBody>
                <p style={{ marginBottom: '1rem' }}>
                  Custom domains direct requests for your apps in this Cloud
                  Foundry organization to a URL that you own. A custom domain
                  can be a shared domain, a shared subdomain, or a shared domain
                  and host.
                </p>
                <TextInput
                  data-modal-primary-focus
                  id="text-input-1"
                  labelText="Domain name"
                  placeholder="e.g. github.com"
                  style={{ marginBottom: '1rem' }}
                />
                <Select
                  id="select-1"
                  defaultValue="us-south"
                  labelText="Region">
                  <SelectItem value="us-south" text="US South" />
                  <SelectItem value="us-east" text="US East" />
                </Select>
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
                {...args}
              />
            </ComposedModal>
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnablePresence.storyName = 'enable-presence';
EnablePresence.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  containerClassName: {
    table: {
      disable: true,
    },
  },
  launcherButtonRef: {
    table: {
      disable: true,
    },
  },
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
  selectorPrimaryFocus: {
    table: {
      disable: true,
    },
  },
  selectorsFloatingMenus: {
    table: {
      disable: true,
    },
  },
};



File: ComposedModal/ModalFooter.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode, type MouseEvent, type Ref } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import InlineLoading from '../InlineLoading';
import { InlineLoadingStatus } from '../InlineLoading/InlineLoading';

export interface SecondaryButtonProps {
  buttonText: ReactNode;
  onClick(evt: MouseEvent): void;
}
export interface SecondaryButtonSetProps {
  closeModal(evt: MouseEvent): void;
  disabled?: boolean;
  onRequestClose(evt: MouseEvent): void;
  secondaryButtonText?: string;
  secondaryButtons?: [SecondaryButtonProps, SecondaryButtonProps];
  secondaryClassName?: string;
}

function SecondaryButtonSet({
  secondaryButtons,
  secondaryButtonText,
  secondaryClassName,
  closeModal,
  onRequestClose,
  disabled,
}: SecondaryButtonSetProps) {
  function handleRequestClose(evt: MouseEvent) {
    closeModal(evt);
    onRequestClose(evt);
  }

  if (Array.isArray(secondaryButtons) && secondaryButtons.length <= 2) {
    return (
      <>
        {secondaryButtons.map(({ buttonText, onClick: onButtonClick }, i) => (
          <Button
            key={`${buttonText}-${i}`}
            className={secondaryClassName}
            kind="secondary"
            onClick={onButtonClick || handleRequestClose}>
            {buttonText}
          </Button>
        ))}
      </>
    );
  }
  if (secondaryButtonText) {
    return (
      <Button
        disabled={disabled}
        className={secondaryClassName}
        onClick={handleRequestClose}
        kind="secondary">
        {secondaryButtonText}
      </Button>
    );
  }
  return null;
}

SecondaryButtonSet.propTypes = {
  closeModal: PropTypes.func,
  disabled: PropTypes.bool,
  onRequestClose: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },
  secondaryClassName: PropTypes.string,
};

export interface ModalFooterProps {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: ReactNode;

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className?: string;

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal?(evt: MouseEvent): void;

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger?: boolean;

  /**
   * The `ref` callback for the primary button.
   */
  inputref?: Ref<HTMLButtonElement>;

  /**
   * Specify an optional function for when the modal is requesting to be
   * closed
   */
  onRequestClose?(): void;

  /**
   * Specify an optional function for when the modal is requesting to be
   * submitted
   */
  onRequestSubmit?(): void;

  /**
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled?: boolean;

  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: string;

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName?: string;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: string;

  /**
   * Specify an array of config objects for secondary buttons
   */
  secondaryButtons?: [SecondaryButtonProps, SecondaryButtonProps];

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName?: string;

  /**
   * loading status
   */
  loadingStatus?: InlineLoadingStatus;

  /**
   * Specify the description for the loading text
   */
  loadingDescription?: string;

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription?: string;

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess?(): void;
}

export const ModalFooter = React.forwardRef<HTMLElement, ModalFooterProps>(
  function ModalFooter(
    {
      children,
      className: customClassName,
      closeModal = noopFn,
      danger,
      inputref,
      onRequestClose = noopFn,
      onRequestSubmit = noopFn,
      primaryButtonDisabled,
      primaryButtonText,
      primaryClassName,
      secondaryButtonText,
      secondaryButtons,
      secondaryClassName,
      loadingStatus = 'inactive',
      loadingDescription,
      loadingIconDescription,
      onLoadingSuccess = noopFn,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const footerClass = cx(
      `${prefix}--modal-footer`,
      customClassName,
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2
        ? `${prefix}--modal-footer--three-button`
        : null
    );
    const primaryButtonClass = cx(
      primaryClassName,
      loadingStatus !== 'inactive' ? `${prefix}--btn--loading` : null
    );

    const loadingActive = loadingStatus !== 'inactive';

    const secondaryButtonProps = {
      closeModal,
      secondaryButtons,
      secondaryButtonText,
      secondaryClassName,
      onRequestClose,
      disabled: loadingActive,
    };

    return (
      <ButtonSet
        className={footerClass}
        {...rest}
        // @ts-expect-error: Invalid derived types, will be fine once explicit types are added
        ref={ref}
        aria-busy={loadingActive}>
        <SecondaryButtonSet {...secondaryButtonProps} />
        {primaryButtonText && (
          <Button
            onClick={onRequestSubmit}
            className={primaryButtonClass}
            disabled={loadingActive || primaryButtonDisabled}
            kind={danger ? 'danger' : 'primary'}
            ref={inputref}>
            {loadingStatus === 'inactive' ? (
              primaryButtonText
            ) : (
              <InlineLoading
                status={loadingStatus}
                description={loadingDescription}
                iconDescription={loadingIconDescription}
                className={`${prefix}--inline-loading--btn`}
                onSuccess={onLoadingSuccess}
              />
            )}
          </Button>
        )}
        {children}
      </ButtonSet>
    );
  }
);

ModalFooter.propTypes = {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className: PropTypes.string,

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * The `ref` callback for the primary button.
   */
  inputref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify the description for the loading text
   */
  loadingDescription: PropTypes.string,

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription: PropTypes.string,

  /**
   * loading status
   */
  loadingStatus: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess: PropTypes.func,

  /**
   * Specify an optional function for when the modal is requesting to be
   * closed
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify an optional function for when the modal is requesting to be
   * submitted
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName: PropTypes.string,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,

  /**
   * Specify an array of config objects for secondary buttons
   * (`Array<{
   *   buttonText: string,
   *   onClick: function,
   * }>`).
   */
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName: PropTypes.string,
};



File: ComposedModal/ComposedModal.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  cloneElement,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { useResizeObserver } from '../../internal/useResizeObserver';
import { isElement } from 'react-is';
import PropTypes from 'prop-types';
import { Layer } from '../Layer';
import { ModalHeader, type ModalHeaderProps } from './ModalHeader';
import { ModalFooter, type ModalFooterProps } from './ModalFooter';
import { mergeRefs } from '../../tools/mergeRefs';
import cx from 'classnames';
import { toggleClass } from '../../tools/toggleClass';
import { requiredIfGivenPropIsTruthy } from '../../prop-types/requiredIfGivenPropIsTruthy';
import {
  elementOrParentIsFloatingMenu,
  wrapFocus,
  wrapFocusWithoutSentinels,
} from '../../internal/wrapFocus';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useFeatureFlag } from '../FeatureFlags';
import { composeEventHandlers } from '../../tools/events';
import { deprecate } from '../../prop-types/deprecate';
import { Dialog } from '../Dialog';
import { warning } from '../../internal/warning';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { useMergeRefs } from '@floating-ui/react';
import {
  ComposedModalPresence,
  ComposedModalPresenceContext,
  useExclusiveComposedModalPresenceContext,
} from './ComposedModalPresence';
import { useId } from '../../internal/useId';
import { useComposedModalState } from './useComposedModalState';

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Specify the content to be placed in the ModalBody. */
  children?: ReactNode;

  /**
   * Provide whether the modal content has a form element.
   * If `true` is used here, non-form child content should have `cds--modal-content__regular-content` class.
   */
  hasForm?: boolean;

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent?: boolean;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody(
    {
      className: customClassName,
      children,
      hasForm,
      hasScrollingContent,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const contentRef = useRef<HTMLDivElement>(null);

    const { height } = useResizeObserver({ ref: contentRef });

    /**
     * isScrollable is implicitly dependent on height, when height gets updated
     * via `useResizeObserver`, clientHeight and scrollHeight get updated too
     */
    const isScrollable =
      !!contentRef.current &&
      contentRef?.current?.scrollHeight > contentRef?.current?.clientHeight;

    const contentClass = cx(
      {
        [`${prefix}--modal-content`]: true,
        [`${prefix}--modal-content--with-form`]: hasForm,
        [`${prefix}--modal-scroll-content`]:
          hasScrollingContent || isScrollable,
        [`${prefix}--modal-scroll-content--no-fade`]: height <= 300,
      },
      customClassName
    );

    const hasScrollingContentProps =
      hasScrollingContent || isScrollable
        ? { tabIndex: 0, role: 'region' }
        : {};

    return (
      <Layer
        className={contentClass}
        {...hasScrollingContentProps}
        {...rest}
        ref={mergeRefs(contentRef, ref)}>
        {children}
      </Layer>
    );
  }
);

ModalBody.propTypes = {
  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropIsTruthy(
    'hasScrollingContent',
    PropTypes.string
  ),

  /**
   * Specify the content to be placed in the ModalBody
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the Modal Body node
   */
  className: PropTypes.string,

  /**
   * Provide whether the modal content has a form element.
   * If `true` is used here, non-form child content should have `cds--modal-content__regular-content` class.
   */
  hasForm: PropTypes.bool,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,
};

export interface ComposedModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the aria-label for cds--modal-container
   */
  'aria-label'?: string;

  /**
   * Specify the aria-labelledby for cds--modal-container
   */
  'aria-labelledby'?: string;

  /**
   * Specify the content to be placed in the ComposedModal
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specify an optional className to be applied to the modal node
   */
  containerClassName?: string;

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger?: boolean;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComposedModal` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth?: boolean;

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;

  /**
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  onClose?(event: MouseEvent): void | boolean;

  /**
   * Called for all `onKeyDown` events that do not close the modal
   */
  onKeyDown?(evt: KeyboardEvent): void;

  /**
   * Specify whether the Modal is currently open
   */
  open?: boolean;

  preventCloseOnClickOutside?: boolean;

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens
   */
  selectorPrimaryFocus?: string;

  /** Specify the CSS selectors that match the floating menus. */
  selectorsFloatingMenus?: string[];

  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComposedModal` component
   */
  slug?: ReactNode;
}
const ComposedModal = React.forwardRef<HTMLDivElement, ComposedModalProps>(
  function ComposedModal({ open, ...props }, ref) {
    const id = useId();

    const enablePresence = useFeatureFlag('enable-presence');
    const hasPresenceContext = Boolean(
      useContext(ComposedModalPresenceContext)
    );
    const hasPresenceOptIn = enablePresence || hasPresenceContext;

    const exclusivePresenceContext =
      useExclusiveComposedModalPresenceContext(id);

    // if opt in and not exclusive to a presence context, wrap with presence
    if (hasPresenceOptIn && !exclusivePresenceContext) {
      return (
        <ComposedModalPresence
          open={open ?? false}
          _presenceId={id}
          // do not auto enable styles for opt-in by feature flag
          _autoEnablePresence={hasPresenceContext}>
          <ComposedModalDialog open ref={ref} {...props} />
        </ComposedModalPresence>
      );
    }

    return <ComposedModalDialog ref={ref} open={open} {...props} />;
  }
);

const ComposedModalDialog = React.forwardRef<
  HTMLDivElement,
  ComposedModalProps
>(function ComposedModalDialog(
  {
    ['aria-labelledby']: ariaLabelledBy,
    ['aria-label']: ariaLabel,
    children,
    className: customClassName,
    containerClassName,
    danger,
    decorator,
    isFullWidth,
    onClose,
    onKeyDown,
    open: externalOpen,
    preventCloseOnClickOutside,
    selectorPrimaryFocus = '[data-modal-primary-focus]',
    selectorsFloatingMenus,
    size,
    launcherButtonRef,
    slug,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const innerModal = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const startSentinel = useRef<HTMLButtonElement>(null);
  const endSentinel = useRef<HTMLButtonElement>(null);
  const onMouseDownTarget: MutableRefObject<Node | null> = useRef<Node | null>(
    null
  );

  const presenceContext = useContext(ComposedModalPresenceContext);
  const mergedRefs = useMergeRefs([ref, presenceContext?.presenceRef]);
  const enablePresence =
    useFeatureFlag('enable-presence') || presenceContext?.autoEnablePresence;

  // always mark as open when mounted with presence
  const open = externalOpen || enablePresence;
  const modalState = useComposedModalState(open);
  const [isOpen, setIsOpen] = presenceContext?.modalState ?? modalState;

  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  const deprecatedFlag = useFeatureFlag(
    'enable-experimental-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinelsFlag = useFeatureFlag(
    'enable-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinels =
    deprecatedFlag || focusTrapWithoutSentinelsFlag;
  warning(
    !(focusTrapWithoutSentinels && enableDialogElement),
    '`<Modal>` detected both `focusTrapWithoutSentinels` and ' +
      '`enableDialogElement` feature flags are enabled. The native dialog ' +
      'element handles focus, so `enableDialogElement` must be off for ' +
      '`focusTrapWithoutSentinels` to have any effect.'
  );

  // Propagate open/close state to the document.body
  useEffect(() => {
    if (!enableDialogElement) {
      toggleClass(document.body, `${prefix}--body--with-modal-open`, !!open);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open, prefix]);
  // Remove the document.body className on unmount
  useEffect(() => {
    if (!enableDialogElement) {
      return () => {
        toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleKeyDown(event) {
    if (!enableDialogElement) {
      if (
        focusTrapWithoutSentinels &&
        open &&
        match(event, keys.Tab) &&
        innerModal.current
      ) {
        wrapFocusWithoutSentinels({
          containerNode: innerModal.current,
          currentActiveNode: event.target,
          event: event,
        });
      }
    }

    onKeyDown?.(event);
  }

  function handleOnMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    const target = evt.target as Node;
    onMouseDownTarget.current = target;
  }

  function handleOnClick(evt: React.MouseEvent<HTMLDivElement>) {
    const { target } = evt;
    const mouseDownTarget = onMouseDownTarget.current;
    evt.stopPropagation();

    const shouldCloseOnOutsideClick =
      // Passive modals can close on clicks outside the modal when
      // preventCloseOnClickOutside is undefined or explicitly set to false.
      (isPassive && !preventCloseOnClickOutside) ||
      // Non-passive modals have to explicitly opt-in for close on outside
      // behavior by explicitly setting preventCloseOnClickOutside to false,
      // rather than just leaving it undefined.
      (!isPassive && preventCloseOnClickOutside === false);

    if (
      shouldCloseOnOutsideClick &&
      target instanceof Node &&
      !elementOrParentIsFloatingMenu(target, selectorsFloatingMenus, prefix) &&
      innerModal.current &&
      !innerModal.current.contains(target) &&
      !innerModal.current.contains(mouseDownTarget)
    ) {
      closeModal(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }) {
    if (
      !enableDialogElement &&
      !focusTrapWithoutSentinels &&
      open &&
      currentActiveNode &&
      oldActiveNode &&
      innerModal.current
    ) {
      const { current: bodyNode } = innerModal;
      const { current: startSentinelNode } = startSentinel;
      const { current: endSentinelNode } = endSentinel;
      wrapFocus({
        bodyNode,
        startTrapNode: startSentinelNode,
        endTrapNode: endSentinelNode,
        currentActiveNode,
        oldActiveNode,
        selectorsFloatingMenus: selectorsFloatingMenus?.filter(Boolean),
        prefix,
      });
    }

    // Adjust scroll if needed so that element with focus is not obscured by gradient
    const modalContent = document.querySelector(`.${prefix}--modal-content`);
    if (
      !modalContent ||
      !modalContent.classList.contains(`${prefix}--modal-scroll-content`) ||
      !currentActiveNode ||
      !modalContent.contains(currentActiveNode)
    ) {
      return;
    }

    currentActiveNode.scrollIntoView({ block: 'center' });
  }

  function closeModal(evt) {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  }

  const modalClass = cx(
    `${prefix}--modal`,
    {
      'is-visible': enablePresence || isOpen,
      [`${prefix}--modal--enable-presence`]:
        presenceContext?.autoEnablePresence,
      [`${prefix}--modal--danger`]: danger,
      [`${prefix}--modal--slug`]: slug,
      [`${prefix}--modal--decorator`]: decorator,
    },
    customClassName
  );

  const containerClass = cx(
    `${prefix}--modal-container`,
    size && `${prefix}--modal-container--${size}`,
    isFullWidth && `${prefix}--modal-container--full-width`,
    containerClassName
  );

  // Generate aria-label based on Modal Header label if one is not provided (L253)
  let generatedAriaLabel;
  const childrenWithProps = React.Children.toArray(children).map((child) => {
    switch (true) {
      case isElement(child) &&
        child.type === React.createElement(ModalHeader).type: {
        const el = child as ReactElement<ModalHeaderProps, typeof ModalHeader>;
        generatedAriaLabel = el.props.label;
        return React.cloneElement(el, { closeModal });
      }

      case isElement(child) &&
        child.type === React.createElement(ModalFooter).type: {
        const el = child as ReactElement<ModalFooterProps, typeof ModalFooter>;
        return React.cloneElement(el, {
          closeModal,
          inputref: button,
          danger,
        });
      }

      default:
        return child;
    }
  });

  // Modals without a footer are considered passive and carry limitations as
  // outlined in the design spec.
  const containsModalFooter = Children.toArray(childrenWithProps).some(
    (child) => isComponentElement(child, ModalFooter)
  );
  const isPassive = !containsModalFooter;
  warning(
    !(!isPassive && preventCloseOnClickOutside === false),
    '`<ComposedModal>` prop `preventCloseOnClickOutside` should not be ' +
      '`false` when `<ModalFooter>` is present. Transactional, non-passive ' +
      'Modals should not be dissmissable by clicking outside. ' +
      'See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
  );

  useEffect(() => {
    if (!open) return;

    const handleEscapeKey = (event) => {
      if (match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        closeModal(event);
      }
    };
    document.addEventListener('keydown', handleEscapeKey, true);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey, true);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open]);

  useEffect(() => {
    if (!enableDialogElement && !enablePresence && !open && launcherButtonRef) {
      setTimeout(() => {
        launcherButtonRef.current?.focus();
      });
    }
  }, [enableDialogElement, enablePresence, open, launcherButtonRef]);
  // Focus launcherButtonRef on unmount
  useEffect(() => {
    const launcherButton = launcherButtonRef?.current;
    return () => {
      if (enablePresence && launcherButton) {
        setTimeout(() => {
          launcherButton.focus();
        });
      }
    };
  }, [enablePresence, launcherButtonRef]);

  useEffect(() => {
    if (!enableDialogElement) {
      const initialFocus = (focusContainerElement) => {
        const containerElement = focusContainerElement || innerModal.current;
        const primaryFocusElement = containerElement
          ? containerElement.querySelector(
              danger ? `.${prefix}--btn--secondary` : selectorPrimaryFocus
            )
          : null;

        if (primaryFocusElement) {
          return primaryFocusElement;
        }

        return button && button.current;
      };

      const focusButton = (focusContainerElement) => {
        const target = initialFocus(focusContainerElement);

        const closeButton = focusContainerElement.querySelector(
          `.${prefix}--modal-close`
        );

        if (target) {
          target.focus();
        } else if (!target && closeButton) {
          closeButton?.focus();
        }
      };

      if (open && isOpen) {
        focusButton(innerModal.current);
      }
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open, selectorPrimaryFocus, isOpen]);

  // AILabel is always size `sm`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'sm' })
    : candidate;

  const modalBody = enableDialogElement ? (
    <Dialog
      open={open}
      focusAfterCloseRef={launcherButtonRef}
      modal
      className={containerClass}
      aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      data-exiting={presenceContext?.isExiting || undefined}>
      <div ref={innerModal} className={`${prefix}--modal-container-body`}>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        {childrenWithProps}
      </div>
    </Dialog>
  ) : (
    <div
      className={containerClass}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel ? ariaLabel : generatedAriaLabel}
      aria-labelledby={ariaLabelledBy}>
      {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <button
          type="button"
          ref={startSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
      )}
      <div ref={innerModal} className={`${prefix}--modal-container-body`}>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        {childrenWithProps}
      </div>
      {/* Non-translatable: Focus-wrap code makes this `<button>` not actually read by screen readers */}
      {!focusTrapWithoutSentinels && (
        <button
          type="button"
          ref={endSentinel}
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </button>
      )}
    </div>
  );

  return (
    <Layer
      {...rest}
      level={0}
      role="presentation"
      ref={mergedRefs}
      aria-hidden={!open}
      onBlur={handleBlur}
      onClick={composeEventHandlers([rest?.onClick, handleOnClick])}
      onMouseDown={composeEventHandlers([rest?.onMouseDown, handleOnMouseDown])}
      onKeyDown={handleKeyDown}
      className={modalClass}
      data-exiting={presenceContext?.isExiting || undefined}>
      {modalBody}
    </Layer>
  );
});

ComposedModal.propTypes = {
  /**
   * Specify the aria-label for cds--modal-container
   */
  ['aria-label']: PropTypes.string,

  /**
   * Specify the aria-labelledby for cds--modal-container
   */
  ['aria-labelledby']: PropTypes.string,

  /**
   * Specify the content to be placed in the ComposedModal
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal node
   */
  containerClassName: PropTypes.string,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComposedModal` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
  onClose: PropTypes.func,

  /**
   * Specify an optional handler for the `onKeyDown` event. Called for all
   * `onKeyDown` events that do not close the modal
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,

  preventCloseOnClickOutside: PropTypes.bool,

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the CSS selectors that match the floating menus
   */
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `ComposedModal` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),
};

export default ComposedModal;



File: ComposedModal/ComposedModal.mdx


import {
  Story,
  ArgTypes,
  Canvas,
  Unstyled,
  Meta,
} from '@storybook/addon-docs/blocks';
import ComposedModal from '../ComposedModal';
import { InlineNotification } from '../Notification';
import CodeSnippet from '../CodeSnippet';
import * as ComposedModalStories from './ComposedModal.stories.js';
import './ComposedModal.stories.scss';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ComposedModal

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ComposedModal)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/modal/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/modal/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> */}
{/* <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Opening/closing modal](#openingclosing-modal)
  - [`preventCloseOnClickOutside`](#preventcloseonclickoutside)
- [Modal sizes](#modal-sizes)
  - [Alignment](#alignment)
  - [Overflow content](#overflow-content)
- [Modal button variants](#modal-button-variants)
- [Using modal title as message](#using-modal-title-as-message)
- [Focus management](#focus-management)
  - [Setting `data-modal-primary-focus` attribute to the target element](#setting-data-modal-primary-focus-attribute-to-the-target-element)
  - [Specifying a query selector to the target element](#specifying-a-query-selector-to-the-target-element)
- [References](#references)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

`<ComposedModal>` provides more flexibility when it comes to custom content.
Modal content can be customized via the `<ModalHeader>`, `<ModalBody>` and
`<ModalFooter>` components.

<Canvas
  of={ComposedModalStories.WithStateManager}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(
          ComposedModalStories.WithStateManager,
          "import ReactDOM from 'react-dom';"
        ),
    },
  ]}
/>

## Component API

<ArgTypes />

## Opening/closing modal

For both modal variants, you can open/close the modal by changing the `open`
prop. For example, you can implement a launcher button with a React state and a
`<Button>` that changes the state:

```jsx
function ModalStateManager() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ComposedModal open={open} onClose={() => setOpen(false)}>
              ...
            </ComposedModal>,
            document.body
          )}
      <Button kind="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
    </>
  );
}
```

You can create an abstract version of such state manager, as shown below.

```jsx
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};
```

{/* <!-- prettier-ignore-start --> */}

<Unstyled>
  <InlineNotification
    kind="warning"
    title="Warning"
    className="sb-notification">
    <CodeSnippet type="inline" hideCopyButton>
      Modal
    </CodeSnippet>
    and
    <CodeSnippet type="inline" hideCopyButton>
      ComposedModal
    </CodeSnippet>
    have to be put at the top level in a React tree. The easiest way to ensure
    that is using a React portal, as shown in the example above.
  </InlineNotification>
</Unstyled>

{/* <!-- prettier-ignore-end --> */}

### `preventCloseOnClickOutside`

This prop controls what happens when a user clicks outside the bounds of the
modal. When true, clicks outside the modal will not trigger close. When false,
clicks outside the modal will trigger close. When left undefined, the modal type
determines the default behavior.

Passive modals by default close on outside clicks. For transactional,
non-passive modals that include `ModalFooter`, the
[design spec for Modal](https://carbondesignsystem.com/components/modal/usage/#transactional-modal)
calls for these to not be dissmissable via outside clicks.

Setting `preventCloseOnClickOutside` to `false` to override the default for
non-passive modals is allowed but not recommended, and will trigger a warning.

## Modal sizes

There are four responsive
[modal sizes](https://www.carbondesignsystem.com/components/modal/usage/#modal-sizes):
`xs`, `small`, default, and `large`. You can set it via the `size` prop.

```jsx
<ComposedModal size="lg">
  <ModalHeader />
  <ModalBody>
    <p className="cds--modal-content__text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      cursus fermentum risus, sit amet fringilla nunc pellentesque quis. Duis
      quis odio ultrices, cursus lacus ac, posuere felis. Donec dignissim libero
      in augue mattis, a molestie metus vestibulum. Aliquam placerat felis
      ultrices lorem condimentum, nec ullamcorper felis porttitor.
    </p>
  </ModalBody>
</ComposedModal>
```

### Alignment

Depending on the modal size of your choice and the viewport size,
`<Modal>`/`<ComposedModal>` adds 20% padding at the right of the modal body
content. Carbon design specifies that such 20% padding shouldn't be applied to
form elements. You can set `hasForm` prop to `<Modal>`/`<ModalBody>` to remove
the padding, and use `cds--modal-content__regular-content` class to apply the
20% padding to non-form contents, as shown below.

```jsx
<ComposedModal>
  <ModalHeader />
  <ModalBody hasForm>
    <TextInput data-modal-primary-focus labelText="Enter something" />
    <p className="cds--modal-content__text cds--modal-content__regular-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      cursus fermentum risus, sit amet fringilla nunc pellentesque quis. Duis
      quis odio ultrices, cursus lacus ac, posuere felis. Donec dignissim libero
      in augue mattis, a molestie metus vestibulum. Aliquam placerat felis
      ultrices lorem condimentum, nec ullamcorper felis porttitor.
    </p>
  </ModalBody>
</ComposedModal>
```

### Overflow content

In cases where the largest modal size cannot fit your modal body content in,
Carbon design specifies to have a "visual fade" look at the end of the modal
body area to indicate there is additional content out of view. You can set
`hasScrollingContent` prop to `<Modal>`/`<ModalBody>` to do that, as shown
below.

```jsx
<ComposedModal size="large">
  <ModalHeader />
  <ModalBody hasScrollingContent>
    <p className=".cds--modal-content__text">Some very large contents...</p>
  </ModalBody>
</ComposedModal>
```

## Modal button variants

With `<Modal>`, you have limited control over the set of buttons. The following
table shows the supported patterns.

| Button group variant                                                                                 | Usage                                     |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| No button ([passive modal](https://www.carbondesignsystem.com/components/modal/usage#passive-modal)) | Use `passiveModal` prop in `<Modal>`      |
| One button                                                                                           | Use `<ComposedModal>`                     |
| Two buttons                                                                                          | Use `<Modal>` without `passiveModal` prop |
| Two buttons with danger button                                                                       | Use `danger` prop in `<Modal>`            |

```jsx
<Modal danger>
  <ModalHeader />
  <p className="cds--modal-content__text">The modal body content</p>
</Modal>
```

With `<ComposedModal>`, you can control the buttons with the following code.

| Button group variant                                                                                 | Usage                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No button ([passive modal](https://www.carbondesignsystem.com/components/modal/usage#passive-modal)) | Use `<ComposedModal>` without `<ModalFooter>`                                                                                                                                                                                                                   |
| One button                                                                                           | Use `primaryButtonText` in `<ModalFooter>`                                                                                                                                                                                                                      |
| Two buttons                                                                                          | Use `primaryButtonText` and `secondaryButtonText` in `<ModalFooter>`                                                                                                                                                                                            |
| Three buttons                                                                                        | Put three buttons as children of `<ModalFooter>`, instead of using `primaryButtonText` or `secondaryButtonText`. Using this option requires style adjustment defined in application-level CSS for `<ModalFooter>`, e.g. `.cds--modal-footer { padding: 25%; }`. |
| Two buttons with danger button                                                                       | Set `danger` prop in `<ModalFooter>` (like below)                                                                                                                                                                                                               |

```jsx
<ComposedModal>
  ...
  <ModalFooter danger primaryButtonText="OK" secondaryButtonText="Cancel" />
</ComposedModal>
```

{/* <!-- prettier-ignore-start --> */}

<Unstyled>
  <InlineNotification
    kind="warning"
    title="Warning"
    className="sb-notification">
    As the instructions for the three buttons imply,
    <CodeSnippet type="inline" hideCopyButton>
      ModalFooter
    </CodeSnippet>
    is flexible with the buttons you render using
    <CodeSnippet type="inline" hideCopyButton>
      Button
    </CodeSnippet>
    components. In this case, your application code is responsible for handling
    button actions, such as closing the modal.
  </InlineNotification>
</Unstyled>

{/* <!-- prettier-ignore-end --> */}

```jsx
<ComposedModal>
  ...
  <ModalFooter>
    <Button
      kind="secondary"
      onClick={() => { (Run some action...) setOpen(false); }}>
      Another button
    </Button>
    <Button
      kind="secondary"
      onClick={() => { (Run some action...) setOpen(false); }}>
      Secondary button
    </Button>
    <Button
      kind="primary"
      onClick={() => { (Run some action...) setOpen(false); }}>
      Primary button
    </Button>
  </ModalFooter>
</ComposedModal>
```

## Using modal title as message

For short, direct messages the title can include the whole message to add visual
clarity to an otherwise repetitive title and body message.

To use this pattern with `<Modal>`, you can omit the `children` prop.

```jsx
const modalHeading =
  'Are you sure you want to add the "Speech to Text" service ' +
  'to the node-test app?';
...
<Modal
  modalHeading={modalHeading}
  secondaryButtonText="Cancel"
  primaryButtonText="Add"
/>
```

To use this pattern with `<ComposedModal>`, you can omit `<ModalBody>`.

```jsx
<ComposedModal>
  <ModalHeader label="Modal label">
    <h1>
      Are you sure you want to add the "Speech to Text" service to the node-test
      app?
    </h1>
  </ModalHeader>
  <ModalFooter primaryButtonText="OK" secondaryButtonText="Cancel" />
</ComposedModal>
```

## Focus management

For both modal variants, once the modal is open, keyboard focus will be
restricted inside modal. This means:

- If you press `Tab` at the last keyboard-focusable element in modal, the first
  keyboard-focusable element in modal will get focus.
- If you press `Shift-Tab` at the first keyboard-focusable element in the modal,
  the last keyboard-focusable element in the modal will get focus.

We take extra step here to ensure such behavior works with floating menus, given
floating menu is placed outside of modal in DOM. If you use any non-Carbon
floating menus in your application, set
`selectorsFloatingMenus={['.cds--overflow-menu-options', '.cds--tooltip', '.flatpickr-calendar', '.your-floating-menu-foo', '.your-floating-menu-bar']}`
to `<Modal>`/`<ComposedModal>`.

Also for both modal variants, you can set the DOM element that gets focus when
the modal gets open, by either of the following ways:

### Setting `data-modal-primary-focus` attribute to the target element

<br />

```jsx
<ComposedModal>
  <ModalBody hasForm>
    <TextInput data-modal-primary-focus labelText="Enter something" />
  </ModalBody>
</ComposedModal>
```

### Specifying a query selector to the target element

<br />

```jsx
{
  /* `.cds--text-input` selects the `<input>` in `<TextInput>` */
}
<ComposedModal selectorPrimaryFocus=".cds--text-input">
  <ModalBody hasForm>
    <TextInput labelText="Enter something" />
  </ModalBody>
</ComposedModal>;
```

## References

Check out the
[usage guidelines](https://www.carbondesignsystem.com/components/modal/usage/)
on the Carbon Design System website.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ComposedModal/ComposedModal.mdx).



