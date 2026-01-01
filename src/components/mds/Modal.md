File: Modal/ModalPresence.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Modal from './';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import { ClassPrefix } from '../ClassPrefix';
import './ModalPresence.stories.scss';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';

export default {
  title: 'Components/Modal/Feature Flags',
  component: Modal,
  tags: ['!autodocs'],
  argTypes: {
    launcherButtonRef: {
      table: {
        disable: true,
      },
    },
  },
};

export const EnablePresence = () => {
  const [open, setOpen] = useState(false);
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
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <ClassPrefix prefix="dialog-refactor">
          <div className="preview-modal-with-presence">
            <Modal
              open={open}
              onRequestClose={() => setOpen(false)}
              modalHeading="Add a custom domain"
              modalLabel="Account resources"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </p>
              <TextInput
                autofocus="true"
                id="text-input-1"
                labelText="Domain name"
                placeholder="e.g. github.com"
                style={{ marginBottom: '1rem' }}
              />
              <Select id="select-1" defaultValue="us-south" labelText="Region">
                <SelectItem value="us-south" text="US South" />
                <SelectItem value="us-east" text="US East" />
              </Select>
              <Dropdown
                id="drop"
                label="Dropdown"
                titleText="Dropdown"
                items={[
                  { id: 'one', label: 'one', name: 'one' },
                  { id: 'two', label: 'two', name: 'two' },
                ]}
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
            </Modal>
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnablePresence.storyName = 'enable-presence';



File: Modal/Modal.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Modal/Feature Flags" name="Flag details" />

# Feature Flags for Modal

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Modal)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/modal/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/modal/accessibility)

## `enable-focus-wrap-without-sentinels`

`Modal` supports the `enable-focus-wrap-without-sentinels` feature flag. When
enabled, the hidden "sentinel nodes" used for focus wrap are no longer emitted
to the DOM. These were previously used to mark the beginning and end of the area
where focus should wrap within.

The new behavior looks at all interactive child nodes and wraps focus based on
tabbable order of those nodes. The focus direction is determined whether `tab`
is being pressed (forward) or `shift`+`tab` is being pressed (backwards).

Note: The native dialog element handles focus, so `enable-dialog-element` must
be off for `enable-focus-wrap-without-sentinels` to have any effect.

This flag used to be called `enable-experimental-focus-wrap-without-sentinels`.

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enableFocusWrapWithoutSentinels>
  <Modal ... />
</FeatureFlags>
```

## `enable-dialog-element`

`Modal` supports the `enable-dialog-element` feature flag. When enabled, Modal
will use the native `<dialog>` element instead of `role="dialog"`. With the
`<dialog>` element, the browser natively controls the focus wrap behavior. This
means that:

- The DOM no longer includes the "sentinel nodes" previously needed for the
  Modal to manage focus wrap.
- `enable-focus-wrap-without-sentinels` has no effect and can be removed when
  using `enable-dialog-element`

## `enable-presence`

`Modal` supports the `enable-presence` feature flag. When enabled, Modal will
not be mounted until opened and unmounted when closed. CSS transitions are
replaced with animations.

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enableDialogElement enablePresence>
  <Modal ... />
</FeatureFlags>
```

## `enable-presence`

`Modal` supports the `enable-presence` feature flag. When enabled, Modal will
not mount until it's opened and unmount when it's closed. This helps to stay in
sync with the React lifecycle.

This means that:

- The DOM no longer includes `Modal` and its children in the closed state
- `Modal`, all of its children and their hooks will mount/unmount on open/close
- Enter & exit animations change from CSS transitions to CSS animations

Note: Only `Modal` and its children are unmounted/mounted. Use `ModalPresence`
to shift the presence boundary to a higher level, if necessary.

### Enabling the flag

To enable the flag, use the `FeatureFlags` component and set the prop:

```js
<FeatureFlags enablePresence>
  <ComposedModal ... />
</FeatureFlags>
```

Or auto opt in by using `ModalPresence` to shift the presence boundary to a
different level:

```js
<ModalPresence open={open}>
  <ComposedModal ... />
</ModalPresence>
```



File: Modal/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Modal, { type ModalProps } from './Modal';
import { ModalPresence, type ModalPresenceProps } from './ModalPresence';

export default Modal;
export { Modal, ModalPresence, type ModalProps, type ModalPresenceProps };



File: Modal/Modal.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Modal from './';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import { ClassPrefix } from '../ClassPrefix';
import './Modal.stories.scss';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';

export default {
  title: 'Components/Modal/Feature Flags',
  component: Modal,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: ['launcherButtonRef'],
    },
  },
};

export const EnableDialogElement = () => {
  const [open, setOpen] = useState(false);
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
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <ClassPrefix prefix="dialog-refactor">
          <div className="preview-modal">
            <Modal
              open={open}
              onRequestClose={() => setOpen(false)}
              modalHeading="Add a custom domain"
              modalLabel="Account resources"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </p>
              <TextInput
                autofocus="true"
                id="text-input-1"
                labelText="Domain name"
                placeholder="e.g. github.com"
                style={{ marginBottom: '1rem' }}
              />
              <Select id="select-1" defaultValue="us-south" labelText="Region">
                <SelectItem value="us-south" text="US South" />
                <SelectItem value="us-east" text="US East" />
              </Select>
              <Dropdown
                id="drop"
                label="Dropdown"
                titleText="Dropdown"
                items={[
                  { id: 'one', label: 'one', name: 'one' },
                  { id: 'two', label: 'two', name: 'two' },
                ]}
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
            </Modal>
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnableDialogElement.storyName = 'enable-dialog-element';

export const EnableFocusWrapWithoutSentinels = () => {
  const [open, setOpen] = useState(false);
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
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <ClassPrefix prefix="dialog-refactor">
          <div className="preview-modal">
            <Modal
              open={open}
              onRequestClose={() => setOpen(false)}
              modalHeading="Add a custom domain"
              modalLabel="Account resources"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </p>
              <TextInput
                autofocus="true"
                id="text-input-1"
                labelText="Domain name"
                placeholder="e.g. github.com"
                style={{ marginBottom: '1rem' }}
              />
              <Select id="select-1" defaultValue="us-south" labelText="Region">
                <SelectItem value="us-south" text="US South" />
                <SelectItem value="us-east" text="US East" />
              </Select>
              <Dropdown
                id="drop"
                label="Dropdown"
                titleText="Dropdown"
                items={[
                  { id: 'one', label: 'one', name: 'one' },
                  { id: 'two', label: 'two', name: 'two' },
                ]}
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
            </Modal>
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnableFocusWrapWithoutSentinels.storyName =
  'enable-focus-wrap-without-sentinels';



File: Modal/Modal.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { type Validator } from 'prop-types';
import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import { toggleClass } from '../../tools/toggleClass';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import InlineLoading from '../InlineLoading';
import { Layer } from '../Layer';
import { requiredIfGivenPropIsTruthy } from '../../prop-types/requiredIfGivenPropIsTruthy';
import {
  elementOrParentIsFloatingMenu,
  wrapFocus,
  wrapFocusWithoutSentinels,
} from '../../internal/wrapFocus';
import { useResizeObserver } from '../../internal/useResizeObserver';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { usePreviousValue } from '../../internal/usePreviousValue';
import { keys, match } from '../../internal/keyboard';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { InlineLoadingStatus } from '../InlineLoading/InlineLoading';
import { useFeatureFlag } from '../FeatureFlags';
import { composeEventHandlers } from '../../tools/events';
import { deprecate } from '../../prop-types/deprecate';
import { Dialog } from '../Dialog';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { warning } from '../../internal/warning';

import {
  ModalPresence,
  ModalPresenceContext,
  useExclusiveModalPresenceContext,
} from './ModalPresence';

export const ModalSizes = ['xs', 'sm', 'md', 'lg'] as const;
const invalidOutsideClickMessage =
  '`<Modal>` prop `preventCloseOnClickOutside` should not be `false` when ' +
  '`passiveModal` is `false`. Transactional, non-passive Modals should ' +
  'not be dissmissable by clicking outside. ' +
  'See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal';

export type ModalSize = (typeof ModalSizes)[number];

export interface ModalSecondaryButton {
  buttonText?: string | ReactNode;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify whether the Modal is displaying an alert, error or warning
   * Should go hand in hand with the danger prop.
   */
  alert?: boolean;

  /**
   * Required props for the accessibility label of the header
   */
  'aria-label'?: string;

  /**
   * Provide the contents of your Modal
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Specify label for the close button of the modal; defaults to close
   */
  closeButtonLabel?: string;

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger?: boolean;

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Modal` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent?: boolean;

  /**
   * Specify the DOM element ID of the top-level node.
   */
  id?: string;

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  isFullWidth?: boolean;

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;

  /**
   * Specify the description for the loading text
   */
  loadingDescription?: string;

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription?: string;

  /**
   * Specify loading status
   */
  loadingStatus?: InlineLoadingStatus;

  /**
   * Specify a label to be read by screen readers on the modal root node
   */
  modalAriaLabel?: string;

  /**
   * Specify the content of the modal header title.
   */
  modalHeading?: ReactNode;

  /**
   * Specify the content of the modal header label.
   */
  modalLabel?: ReactNode;

  /**
   * Specify a handler for keypresses.
   * @deprecated this property is unused
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;

  /**
   * Specify an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess?: () => void;

  /**
   * Specify a handler for closing modal.
   * The handler should care of closing modal, e.g. changing `open` prop.
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for "submitting" modal.
   * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
   */
  onRequestSubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for the secondary button.
   * Useful if separate handler from `onRequestClose` is desirable
   */
  onSecondarySubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify whether the Modal is currently open
   */
  open?: boolean;

  /**
   * Specify whether the modal should be button-less
   */
  passiveModal?: boolean;

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside?: boolean;

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled?: boolean;

  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: ReactNode;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: ReactNode;

  /**
   * Specify an array of config objects for secondary buttons
   */
  secondaryButtons?: ModalSecondaryButton[];

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the Modal opens
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify CSS selectors that match DOM elements working as floating menus.
   * Focusing on those elements won't trigger "focus-wrap" behavior
   */
  selectorsFloatingMenus?: string[];

  /**
   * Specify if Enter key should be used as "submit" action
   */
  shouldSubmitOnEnter?: boolean;

  /**
   * Specify the size variant.
   */
  size?: ModalSize;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Modal` component
   */
  slug?: ReactNode;
}
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  { open, ...props },
  ref
) {
  const id = useId();

  const enablePresence = useFeatureFlag('enable-presence');
  const hasPresenceContext = Boolean(useContext(ModalPresenceContext));
  const hasPresenceOptIn = enablePresence || hasPresenceContext;

  const exclusivePresenceContext = useExclusiveModalPresenceContext(id);

  // if opt in and not exclusive to a presence context, wrap with presence
  if (hasPresenceOptIn && !exclusivePresenceContext) {
    return (
      <ModalPresence
        open={open ?? false}
        _presenceId={id}
        // do not auto enable styles for opt-in by feature flag
        _autoEnablePresence={hasPresenceContext}>
        <ModalDialog open ref={ref} {...props} />
      </ModalPresence>
    );
  }

  return <ModalDialog ref={ref} open={open} {...props} />;
});

const ModalDialog = React.forwardRef(function ModalDialog(
  {
    'aria-label': ariaLabelProp,
    children,
    className,
    decorator,
    modalHeading = '',
    modalLabel = '',
    modalAriaLabel,
    passiveModal = false,
    secondaryButtonText,
    primaryButtonText,
    open: externalOpen,
    onRequestClose = noopFn,
    onRequestSubmit = noopFn,
    onSecondarySubmit,
    primaryButtonDisabled = false,
    danger,
    alert,
    secondaryButtons,
    selectorPrimaryFocus = '[data-modal-primary-focus]',
    selectorsFloatingMenus,
    shouldSubmitOnEnter,
    size,
    hasScrollingContent = false,
    closeButtonLabel = 'Close',
    preventCloseOnClickOutside,
    isFullWidth,
    launcherButtonRef,
    loadingStatus = 'inactive',
    loadingDescription,
    loadingIconDescription,
    onLoadingSuccess = noopFn,
    slug,
    ...rest
  }: ModalProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const button = useRef<HTMLButtonElement>(null);
  const secondaryButton = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerModal = useRef<HTMLDivElement>(null);
  const startTrap = useRef<HTMLSpanElement>(null);
  const endTrap = useRef<HTMLSpanElement>(null);
  const wrapFocusTimeout = useRef<NodeJS.Timeout>(null);
  const modalInstanceId = `modal-${useId()}`;
  const modalLabelId = `${prefix}--modal-header__label--${modalInstanceId}`;
  const modalHeadingId = `${prefix}--modal-header__heading--${modalInstanceId}`;
  const modalBodyId = `${prefix}--modal-body--${modalInstanceId}`;
  const modalCloseButtonClass = `${prefix}--modal-close`;
  const primaryButtonClass = classNames({
    [`${prefix}--btn--loading`]: loadingStatus !== 'inactive',
  });
  const loadingActive = loadingStatus !== 'inactive';

  const presenceContext = useContext(ModalPresenceContext);
  const mergedRefs = useMergedRefs([ref, presenceContext?.presenceRef]);
  const enablePresence =
    useFeatureFlag('enable-presence') || presenceContext?.autoEnablePresence;

  // always mark as open when mounted with presence
  const open = externalOpen || enablePresence;
  const prevOpen = usePreviousValue(open);

  const deprecatedFlag = useFeatureFlag(
    'enable-experimental-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinelsFlag = useFeatureFlag(
    'enable-focus-wrap-without-sentinels'
  );
  const focusTrapWithoutSentinels =
    focusTrapWithoutSentinelsFlag || deprecatedFlag;
  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  warning(
    !(focusTrapWithoutSentinels && enableDialogElement),
    '`<Modal>` detected both `focusTrapWithoutSentinels` and ' +
      '`enableDialogElement` feature flags are enabled. The native dialog ' +
      'element handles focus, so `enableDialogElement` must be off for ' +
      '`focusTrapWithoutSentinels` to have any effect.'
  );
  warning(
    !(!passiveModal && preventCloseOnClickOutside === false),
    invalidOutsideClickMessage
  );

  function isCloseButton(element: Element) {
    return (
      (!onSecondarySubmit && element === secondaryButton.current) ||
      element.classList.contains(modalCloseButtonClass)
    );
  }

  function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
    const { target } = evt;

    evt.stopPropagation();

    if (open && target instanceof HTMLElement) {
      if (
        match(evt, keys.Enter) &&
        shouldSubmitOnEnter &&
        !isCloseButton(target) &&
        document.activeElement !== button.current
      ) {
        onRequestSubmit(evt);
      }

      if (
        focusTrapWithoutSentinels &&
        !enableDialogElement &&
        match(evt, keys.Tab) &&
        innerModal.current
      ) {
        wrapFocusWithoutSentinels({
          containerNode: innerModal.current,
          currentActiveNode: target,
          event: evt,
        });
      }
    }
  }

  function handleOnClick(evt: React.MouseEvent<HTMLDivElement>) {
    const { target } = evt;
    evt.stopPropagation();

    const shouldCloseOnOutsideClick =
      // Passive modals can close on clicks outside the modal when
      // preventCloseOnClickOutside is undefined or explicitly set to false.
      (passiveModal && !preventCloseOnClickOutside) ||
      // Non-passive modals have to explicitly opt-in for close on outside
      // behavior by explicitly setting preventCloseOnClickOutside to false,
      // rather than just leaving it undefined.
      (!passiveModal && preventCloseOnClickOutside === false);

    if (
      shouldCloseOnOutsideClick &&
      target instanceof Node &&
      !elementOrParentIsFloatingMenu(target, selectorsFloatingMenus, prefix) &&
      innerModal.current &&
      !innerModal.current.contains(target)
    ) {
      onRequestClose(evt);
    }
  }

  function handleBlur({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }: React.FocusEvent<HTMLDivElement>) {
    if (
      !enableDialogElement &&
      open &&
      oldActiveNode instanceof HTMLElement &&
      currentActiveNode instanceof HTMLElement
    ) {
      const { current: bodyNode } = innerModal;
      const { current: startTrapNode } = startTrap;
      const { current: endTrapNode } = endTrap;
      // use setTimeout to ensure focus is set after all browser default focus behavior. Fixes issue of
      // focus not wrapping in Firefox
      wrapFocusTimeout.current = setTimeout(() => {
        wrapFocus({
          bodyNode,
          startTrapNode,
          endTrapNode,
          currentActiveNode,
          oldActiveNode,
          selectorsFloatingMenus,
          prefix,
        });
        if (wrapFocusTimeout.current) {
          clearTimeout(wrapFocusTimeout.current);
        }
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

  const onSecondaryButtonClick = onSecondarySubmit
    ? onSecondarySubmit
    : onRequestClose;

  const { height } = useResizeObserver({ ref: contentRef });

  const modalClasses = classNames(
    `${prefix}--modal`,
    {
      [`${prefix}--modal-tall`]: !passiveModal,
      'is-visible': enablePresence || open,
      [`${prefix}--modal--enable-presence`]:
        presenceContext?.autoEnablePresence,
      [`${prefix}--modal--danger`]: danger,
      [`${prefix}--modal--slug`]: slug,
      [`${prefix}--modal--decorator`]: decorator,
    },
    className
  );

  const containerClasses = classNames(`${prefix}--modal-container`, {
    [`${prefix}--modal-container--${size}`]: size,
    [`${prefix}--modal-container--full-width`]: isFullWidth,
  });

  /**
   * isScrollable is implicitly dependent on height, when height gets updated
   * via `useResizeObserver`, clientHeight and scrollHeight get updated too
   */
  const isScrollable =
    !!contentRef.current &&
    contentRef?.current?.scrollHeight > contentRef?.current?.clientHeight;

  const contentClasses = classNames(`${prefix}--modal-content`, {
    [`${prefix}--modal-scroll-content`]: hasScrollingContent || isScrollable,
    [`${prefix}--modal-scroll-content--no-fade`]: height <= 300,
  });

  const footerClasses = classNames(`${prefix}--modal-footer`, {
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const asStringOrUndefined = (node: ReactNode): string | undefined => {
    return typeof node === 'string' ? node : undefined;
  };
  const modalLabelStr = asStringOrUndefined(modalLabel);
  const modalHeadingStr = asStringOrUndefined(modalHeading);
  const ariaLabel =
    modalLabelStr || ariaLabelProp || modalAriaLabel || modalHeadingStr;
  const getAriaLabelledBy = modalLabel ? modalLabelId : modalHeadingId;

  const hasScrollingContentProps =
    hasScrollingContent || isScrollable
      ? {
          tabIndex: 0,
          role: 'region',
          'aria-label': ariaLabel,
          'aria-labelledby': getAriaLabelledBy,
        }
      : {};

  const alertDialogProps: HTMLAttributes<HTMLDivElement> = {};
  if (alert && passiveModal) {
    alertDialogProps.role = 'alert';
  }
  if (alert && !passiveModal) {
    alertDialogProps.role = 'alertdialog';
    alertDialogProps['aria-describedby'] = modalBodyId;
  }

  useEffect(() => {
    if (!open) return;

    const handleEscapeKey = (event) => {
      if (match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        onRequestClose(event);
      }
    };
    document.addEventListener('keydown', handleEscapeKey, true);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey, true);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [open]);

  useEffect(() => {
    return () => {
      if (!enableDialogElement) {
        toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
      }
    };
  }, [prefix, enableDialogElement]);

  useEffect(() => {
    if (!enableDialogElement) {
      toggleClass(
        document.body,
        `${prefix}--body--with-modal-open`,
        open ?? false
      );
    }
  }, [open, prefix, enableDialogElement]);

  useEffect(() => {
    if (
      !enableDialogElement &&
      !enablePresence &&
      prevOpen &&
      !open &&
      launcherButtonRef
    ) {
      setTimeout(() => {
        if ('current' in launcherButtonRef) {
          launcherButtonRef.current?.focus();
        }
      });
    }
  }, [open, prevOpen, launcherButtonRef, enableDialogElement, enablePresence]);
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
      const initialFocus = (focusContainerElement: HTMLElement | null) => {
        const containerElement = focusContainerElement || innerModal.current;
        const primaryFocusElement =
          containerElement &&
          (containerElement.querySelector<HTMLElement | SVGElement>(
            selectorPrimaryFocus
          ) ||
            (danger &&
              containerElement.querySelector<HTMLElement | SVGElement>(
                `.${prefix}--btn--secondary`
              )));

        if (primaryFocusElement) {
          return primaryFocusElement;
        }

        return button && button.current;
      };

      const focusButton = (focusContainerElement: HTMLElement | null) => {
        const target = initialFocus(focusContainerElement);
        if (target !== null) {
          target.focus();
        }
      };

      if (open) {
        focusButton(innerModal.current);
      }
    }
  }, [open, selectorPrimaryFocus, danger, prefix, enableDialogElement]);

  // AILabel always size `sm`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'sm' })
    : candidate;

  const modalButton = (
    <div className={`${prefix}--modal-close-button`}>
      <IconButton
        className={modalCloseButtonClass}
        label={closeButtonLabel}
        onClick={onRequestClose}
        aria-label={closeButtonLabel}
        align="left"
        ref={button}>
        <Close
          size={20}
          aria-hidden="true"
          tabIndex="-1"
          className={`${modalCloseButtonClass}__icon`}
        />
      </IconButton>
    </div>
  );

  // alertdialog is the only permitted aria role for a native dialog element
  // https://www.w3.org/TR/html-aria/#docconformance:~:text=Role%3A-,alertdialog,-.%20(dialog%20is
  const isAlertDialog = alert && !passiveModal;

  const modalBody = enableDialogElement ? (
    <Dialog
      open={open}
      focusAfterCloseRef={launcherButtonRef}
      modal
      ref={innerModal}
      role={isAlertDialog ? 'alertdialog' : ''}
      aria-describedby={isAlertDialog ? modalBodyId : ''}
      className={containerClasses}
      aria-label={ariaLabel}
      data-exiting={presenceContext?.isExiting || undefined}>
      <div className={`${prefix}--modal-header`}>
        {modalLabel && (
          <Text
            as="h2"
            id={modalLabelId}
            className={`${prefix}--modal-header__label`}>
            {modalLabel}
          </Text>
        )}
        <Text
          as="h2"
          id={modalHeadingId}
          className={`${prefix}--modal-header__heading`}>
          {modalHeading}
        </Text>
        {decorator ? (
          <div className={`${prefix}--modal--inner__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        <div className={`${prefix}--modal-close-button`}>
          <IconButton
            className={modalCloseButtonClass}
            label={closeButtonLabel}
            onClick={onRequestClose}
            aria-label={closeButtonLabel}
            align="left"
            ref={button}>
            <Close
              size={20}
              aria-hidden="true"
              tabIndex="-1"
              className={`${modalCloseButtonClass}__icon`}
            />
          </IconButton>
        </div>
      </div>
      <Layer
        ref={contentRef}
        id={modalBodyId}
        className={contentClasses}
        {...hasScrollingContentProps}>
        {children}
      </Layer>
      {!passiveModal && (
        <ButtonSet className={footerClasses} aria-busy={loadingActive}>
          {Array.isArray(secondaryButtons) && secondaryButtons.length <= 2
            ? secondaryButtons.map(
                ({ buttonText, onClick: onButtonClick }, i) => (
                  <Button
                    key={`${buttonText}-${i}`}
                    kind="secondary"
                    onClick={onButtonClick}>
                    {buttonText}
                  </Button>
                )
              )
            : secondaryButtonText && (
                <Button
                  disabled={loadingActive}
                  kind="secondary"
                  onClick={onSecondaryButtonClick}
                  ref={secondaryButton}>
                  {secondaryButtonText}
                </Button>
              )}
          <Button
            className={primaryButtonClass}
            kind={danger ? 'danger' : 'primary'}
            disabled={loadingActive || primaryButtonDisabled}
            onClick={onRequestSubmit}
            ref={button}>
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
        </ButtonSet>
      )}
    </Dialog>
  ) : (
    <>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!enableDialogElement && !focusTrapWithoutSentinels && (
        <span
          ref={startTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
      <div
        ref={innerModal}
        role="dialog"
        {...alertDialogProps}
        className={containerClasses}
        aria-label={ariaLabel}
        aria-modal="true"
        tabIndex={-1}>
        <div className={`${prefix}--modal-header`}>
          {passiveModal && modalButton}
          {modalLabel && (
            <Text
              as="h2"
              id={modalLabelId}
              className={`${prefix}--modal-header__label`}>
              {modalLabel}
            </Text>
          )}
          <Text
            as="h2"
            id={modalHeadingId}
            className={`${prefix}--modal-header__heading`}>
            {modalHeading}
          </Text>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--modal--inner__decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          {!passiveModal && modalButton}
        </div>
        <Layer
          ref={contentRef}
          id={modalBodyId}
          className={contentClasses}
          {...hasScrollingContentProps}>
          {children}
        </Layer>
        {!passiveModal && (
          <ButtonSet className={footerClasses} aria-busy={loadingActive}>
            {Array.isArray(secondaryButtons) && secondaryButtons.length <= 2
              ? secondaryButtons.map(
                  ({ buttonText, onClick: onButtonClick }, i) => (
                    <Button
                      key={`${buttonText}-${i}`}
                      kind="secondary"
                      onClick={onButtonClick}>
                      {buttonText}
                    </Button>
                  )
                )
              : secondaryButtonText && (
                  <Button
                    disabled={loadingActive}
                    kind="secondary"
                    onClick={onSecondaryButtonClick}
                    ref={secondaryButton}>
                    {secondaryButtonText}
                  </Button>
                )}
            <Button
              className={primaryButtonClass}
              kind={danger ? 'danger' : 'primary'}
              disabled={loadingActive || primaryButtonDisabled}
              onClick={onRequestSubmit}
              ref={button}>
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
          </ButtonSet>
        )}
      </div>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      {!enableDialogElement && !focusTrapWithoutSentinels && (
        <span
          ref={endTrap}
          tabIndex={0}
          role="link"
          className={`${prefix}--visually-hidden`}>
          Focus sentinel
        </span>
      )}
    </>
  );

  return (
    <Layer
      {...rest}
      level={0}
      onKeyDown={handleKeyDown}
      onClick={composeEventHandlers([rest?.onClick, handleOnClick])}
      onBlur={handleBlur}
      className={modalClasses}
      role="presentation"
      ref={mergedRefs}
      data-exiting={presenceContext?.isExiting || undefined}>
      {modalBody}
    </Layer>
  );
});

Modal.propTypes = {
  /**
   * Specify whether the Modal is displaying an alert, error or warning
   * Should go hand in hand with the danger prop.
   */
  alert: PropTypes.bool,

  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropIsTruthy(
    'hasScrollingContent',
    PropTypes.string
  ),

  /**
   * Provide the contents of your Modal
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Specify label for the close button of the modal; defaults to close
   */
  closeButtonLabel: PropTypes.string,

  /**
   * Specify whether the Modal is for dangerous actions
   */
  danger: PropTypes.bool,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Modal` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Specify the DOM element ID of the top-level node.
   */
  id: PropTypes.string,

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  launcherButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.oneOfType([
        // `PropTypes.instanceOf(HTMLButtonElement)` alone won't work because
        // `HTMLButtonElement` is not defined in the test environment even
        // though `testEnvironment` is set to `jsdom`.
        typeof HTMLButtonElement !== 'undefined'
          ? PropTypes.instanceOf(HTMLButtonElement)
          : PropTypes.any,
        PropTypes.oneOf([null]),
      ]).isRequired,
    }),
  ]) as Validator<RefObject<HTMLButtonElement | null>>,

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
   * Specify a label to be read by screen readers on the modal root node
   */
  modalAriaLabel: PropTypes.string,

  /**
   * Specify the content of the modal header title.
   */
  modalHeading: PropTypes.node,

  /**
   * Specify the content of the modal header label.
   */
  modalLabel: PropTypes.node,

  /**
   * Specify a handler for keypresses.
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess: PropTypes.func,

  /**
   * Specify a handler for closing modal.
   * The handler should care of closing modal, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify a handler for "submitting" modal.
   * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify a handler for the secondary button.
   * Useful if separate handler from `onRequestClose` is desirable
   */
  onSecondarySubmit: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,

  /**
   * Specify whether the modal should be button-less
   */
  passiveModal: PropTypes.bool,

  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: (props: ModalProps, propName: string) => {
    if (!props.passiveModal && props[propName] === false) {
      return new Error(invalidOutsideClickMessage);
    }

    return null;
  },

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.node,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.node,

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
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the Modal opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify CSS selectors that match DOM elements working as floating menus.
   * Focusing on those elements won't trigger "focus-wrap" behavior
   */
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * Specify if Enter key should be used as "submit" action
   */
  shouldSubmitOnEnter: PropTypes.bool,

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(ModalSizes),

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),
};

export default Modal;



File: Modal/Modal.stories.scss


//
// Copyright IBM Corp. 2023, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/config' with (
  $prefix: 'dialog-refactor'
);
@use '@carbon/react/scss/components/modal/modal';
@use '@carbon/react/scss/components/dialog/dialog';
@use '@carbon/react/scss/components/text-input/text-input';
@use '@carbon/react/scss/components/select/select';
@use '@carbon/react/scss/components/dropdown/dropdown';
@use '@carbon/react/scss/components/multiselect/multiselect';

.preview-modal {
  @include dialog.dialog();
  @include modal.modal(
    $enable-experimental-focus-wrap-without-sentinels: true,
    $enable-focus-wrap-without-sentinels: true,
    $enable-dialog-element: true
  );
  @include text-input.text-input();
  @include select.select();
  @include dropdown.dropdown();
  @include multiselect.multiselect();
}

.sb-notification p {
  line-height: 1;
}



File: Modal/Modal.mdx


import {
  Story,
  ArgTypes,
  Canvas,
  Unstyled,
  Meta,
} from '@storybook/addon-docs/blocks';
import Modal from '../Modal';
import { InlineNotification } from '../Notification';
import CodeSnippet from '../CodeSnippet';
import * as ModalStories from './Modal.stories';
import './Modal.stories.scss';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Modal

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Modal)
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

`<Modal>` allows you to use its bespoke set of contents. `children` prop maps to
the modal body content. You can also use `modalLabel`, `modalHeading`,
`secondaryButtonText` and `primaryButtonText` props to change the corresponding
text.

<Canvas
  of={ModalStories.WithStateManager}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(
          ModalStories.WithStateManager,
          "import ReactDOM from 'react-dom';"
        ),
    },
  ]}
/>

## Component API

<ArgTypes />

{/* TODO: https://github.com/carbon-design-system/carbon/issues/19624 */}

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
`xs`, `sm`, `md` (default), and `lg`. You can set it via the `size` prop.

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

Depending on the size prop of your modal and the viewport,
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

In cases where even the largest modal size does not fit all of the modal
content, Carbon design specifies having a "visual fade" at the end of the modal
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
restricted inside the modal. This means:

- If you press `Tab` at the last keyboard-focusable element in modal, the first
  keyboard-focusable element in modal will get focus.
- If you press `Shift-Tab` at the first keyboard-focusable element in the modal,
  the last keyboard-focusable element in the modal will get focus.

We take an extra step here to ensure such behavior works with floating menus,
given floating menu is placed outside of modal in DOM. If you use any non-Carbon
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

Help us improve this component by providing feedback through, asking questions
on Slack,or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Modal/Modal.mdx).



File: Modal/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  tall
  variants={[
    {
      label: 'Default',
      variant: 'components-modal--default'
    },
    {
      label: 'Danger Modal',
      variant: 'components-modal--danger-modal'
    },
    {
      label: 'Full Width',
      variant: 'components-modal--full-width'
    },
    {
      label: 'Passive Modal',
      variant: 'components-modal--passive-modal'
    },
    {
      label: 'With State Manager',
      variant: 'components-modal--with-state-manager'
    }
  ]}
/>



File: Modal/Modal.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from 'storybook/actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import ComboBox from '../ComboBox';
import mdx from './Modal.mdx';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import TextArea from '../TextArea';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const buttons = {
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};

export const Default = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        onRequestClose={(e) => {
          action(e);
          setOpen(false);
        }}
        modalHeading="Add a custom domain"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        aria-label="Modal content"
        open={open}
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '2rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
          placeholder="For example, GitHub.com"
          style={{ marginBottom: '24px' }}
        />
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Dropdown
            autoAlign={true}
            id="default"
            titleText="TLS (Example of Floating UI)"
            label="Option 1"
            items={[
              {
                id: 'option-0',
                text: '1.0',
              },
              {
                id: 'option-1',
                text: '1.1',
              },
              {
                id: 'option-2',
                text: '1.2',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <MultiSelect
            id="test"
            label="Choose options"
            titleText="Mapping domain"
            autoAlign
            items={[
              {
                id: 'downshift-1-item-0',
                text: 'Cloud Foundry',
              },
              {
                id: 'downshift-1-item-1',
                text: 'Kubernetes Ingress',
              },
              {
                id: 'downshift-1-item-2',
                text: 'VPC Load Balancer',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <CheckboxGroup legendText="Terms of Agreement">
          <Checkbox
            id="checkbox-label-1"
            labelText="I confirm domain ownership and accept IBM service terms and applicable charges."
          />
        </CheckboxGroup>
      </Modal>
    </>
  );
};

Default.args = {
  numberOfButtons: 'Two (2)',
};

Default.argTypes = {
  modalHeading: {
    control: 'text',
  },
  modalLabel: {
    control: 'text',
  },
  numberOfButtons: {
    description: 'Count of Footer Buttons',
    options: Object.keys(buttons),
    mapping: buttons,
    control: {
      type: 'inline-radio',
      labels: Object.keys(buttons),
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
  onRequestSubmit: {
    action: 'onRequestSubmit',
  },
  onSecondarySubmit: {
    action: 'onSecondarySubmit',
  },
  primaryButtonText: {
    control: 'text',
  },
};

Default.parameters = {
  controls: {
    exclude: [
      'id',
      'launcherButtonRef',
      'secondaryButtons',
      'secondaryButtonText',
      'selectorPrimaryFocus',
      'selectorsFloatingMenus',
    ],
  },
};

export const FullWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        isFullWidth
        modalHeading="Full width modal"
        modalLabel="An example of a modal with no padding"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
        <StructuredListWrapper style={{ marginBottom: '48px' }}>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head noWrap>
                Default size
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Features
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Pricing
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Lite</StructuredListCell>
              <StructuredListCell>2 vCPUs | 4GB RAM</StructuredListCell>
              <StructuredListCell>$0.12 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Graduated tier</StructuredListCell>
              <StructuredListCell>2 vCPUs | 8GB RAM</StructuredListCell>
              <StructuredListCell>$0.13 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Premium</StructuredListCell>
              <StructuredListCell>4 vCPUs | 10GB RAM</StructuredListCell>
              <StructuredListCell>$0.20 USD / hourly</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </>
  );
};

export const DangerModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel">
        <p>
          Check for dependencies on the domain before deletion. For instance, if
          the domain is used as a primary domain for users or if it's associated
          with critical applications or services, those connections will need to
          be removed or reconfigured first.
        </p>
      </Modal>
    </>
  );
};

const modalFooter = (numberOfButtons) => {
  const secondaryButtons = () => {
    switch (numberOfButtons) {
      case '1':
        return {
          secondaryButtons: [],
        };
      case '2':
        return {
          secondaryButtonText: 'Cancel',
        };
      case '3':
        return {
          secondaryButtons: [
            {
              buttonText: 'Keep both',
              onClick: action('onClick'),
            },
            {
              buttonText: 'Rename',
              onClick: action('onClick'),
            },
          ],
        };
      default:
        return null;
    }
  };
  return {
    ...secondaryButtons(),
  };
};

export const WithScrollingContent = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        hasScrollingContent
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
        <p style={{ marginBottom: '1rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <p style={{ marginBottom: '2rem' }}>
          Domain mappings provide the URL route to your Code Engine application
          or function within a project. With Code Engine, these mappings are
          automatically created, by default, whenever you deploy an application
          or create a function. However, you can map your own custom domain to a
          Code Engine application or function. This option routes requests from
          your custom URL to your application or function. You can use the Code
          Engine CLI.
        </p>
        <div style={{ marginBottom: '24px' }}>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <MultiSelect
          id="test"
          label="Choose options"
          titleText="Mapping domain"
          autoAlign
          items={[
            {
              id: 'downshift-1-item-0',
              text: 'Cloud Foundry',
            },
            {
              id: 'downshift-1-item-1',
              text: 'Kubernetes Ingress',
            },
            {
              id: 'downshift-1-item-2',
              text: 'VPC Load Balancer',
            },
          ]}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Modal>
    </>
  );
};

export const WithStateManager = () => {
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

  const button = React.useRef();

  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button ref={button} onClick={() => setOpen(true)}>
          Launch modal
        </Button>
      )}>
      {({ open, setOpen }) => (
        <Modal
          launcherButtonRef={button}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          open={open}
          onRequestClose={() => setOpen(false)}>
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
        </Modal>
      )}
    </ModalStateManager>
  );
};

export const PassiveModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
        modalHeading="You are now signed out."
      />
    </>
  );
};

export const WithInlineLoading = () => {
  const [status, setStatus] = useState('inactive');
  const [description, setDescription] = useState('Deleting...');

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

    setDescription('Deleted!');
    setStatus('finished');
  };

  const resetStatus = () => {
    setStatus('inactive');
    setDescription('Deleting...');
  };

  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={submit}
        loadingStatus={status}
        loadingDescription={description}
        onLoadingSuccess={resetStatus}
      />
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

export const withAILabel = {
  render: () => {
    const [open, setOpen] = useState(true); // eslint-disable-line
    return (
      <div className="ai-label-modal">
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <Button onClick={() => setOpen2(true)}>
          Launch modal decorator tooltip
        </Button>
        <Modal
          open={open}
          onRequestClose={() => setOpen(false)}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          decorator={aiLabel}>
          <p style={{ marginBottom: '2rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
            style={{ marginBottom: '24px' }}
          />
          <div style={{ marginBottom: '24px' }}>
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </div>
          <TextArea labelText="Comments" style={{ height: '80px' }} />
        </Modal>
      </div>
    );
  },
};



File: Modal/ModalPresence.stories.scss


//
// Copyright IBM Corp. 2023, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/config' with (
  $prefix: 'dialog-refactor'
);
@use '@carbon/react/scss/components/modal/modal';
@use '@carbon/react/scss/components/dialog/dialog';
@use '@carbon/react/scss/components/text-input/text-input';
@use '@carbon/react/scss/components/select/select';
@use '@carbon/react/scss/components/dropdown/dropdown';
@use '@carbon/react/scss/components/multiselect/multiselect';

.preview-modal-with-presence {
  @include modal.modal(
    $enable-experimental-focus-wrap-without-sentinels: false,
    $enable-focus-wrap-without-sentinels: false,
    $enable-dialog-element: false,
    $enable-presence: true
  );
  @include text-input.text-input();
  @include select.select();
  @include dropdown.dropdown();
  @include multiselect.multiselect();
}



File: Modal/Modal-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import TextInput from '../TextInput';
import { AILabel } from '../AILabel';
import { FeatureFlags } from '../FeatureFlags';
import { ModalPresence } from './ModalPresence';

const prefix = 'cds';

const ModalWithPresenceFeatureFlag = ({ open = true, ...props }) => {
  return (
    <FeatureFlags enablePresence>
      <Modal {...props} open={open} />
    </FeatureFlags>
  );
};

const ModalWithPresenceContext = ({ open = true, ...props }) => {
  return (
    <ModalPresence open={open}>
      <Modal {...props} />
    </ModalPresence>
  );
};

describe.each([
  {
    title: 'Modal',
    Component: Modal,
  },
  {
    title: 'Modal with presence feature flag',
    Component: ModalWithPresenceFeatureFlag,
    isPresence: true,
  },
  {
    title: 'Modal with presence context',
    Component: ModalWithPresenceContext,
    isPresence: true,
  },
])('$title', ({ Component, isPresence }) => {
  it('should add extra classes that are passed via className', () => {
    render(
      <Component data-testid="modal-1" className="custom-class">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-1')).toHaveClass('custom-class');
  });

  it('should set label if one is passed via props', () => {
    render(
      <Component modalLabel="Account resources">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Account resources')).toBeInTheDocument();
  });

  it('should set modal heading if one is passed via props', () => {
    render(
      <Component modalHeading="Add a custom domain">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Add a custom domain')).toBeInTheDocument();
  });

  it('should not be a passive modal by default', () => {
    render(
      <Component data-testid="modal-2">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-2')).toHaveClass(`${prefix}--modal-tall`);
  });

  it('should be a passive modal when passiveModal is passed', () => {
    render(
      <Component data-testid="modal-3" passiveModal>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-3')).not.toHaveClass(
      `${prefix}--modal-tall`
    );
  });

  it('should set id if one is passed via props', () => {
    render(
      <Component id="custom-modal-id" data-testid="modal-4">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-4')).toHaveAttribute(
      'id',
      'custom-modal-id'
    );
  });

  it('should not place the svg icon in the accessibility tree', () => {
    render(
      <Component>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not make the icon tabbable', () => {
    render(
      <Component>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('focusable', 'false');
  });

  it('enables primary button by default', () => {
    render(
      <Component primaryButtonText="Primary button text">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeEnabled();
  });

  it('disables primary button is disablePrimaryButton prop is passed', () => {
    render(
      <Component primaryButtonText="Primary button text" primaryButtonDisabled>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeDisabled();
  });

  it('should set button text when passed via props', () => {
    render(
      <Component
        primaryButtonText="Primary button text"
        secondaryButtonText="Secondary button text">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeInTheDocument();
    expect(screen.getByText('Secondary button text')).toBeInTheDocument();
  });

  it('should allow you to pass a node for the primary and secondary buttons', () => {
    render(
      <Component
        primaryButtonText={<span data-testid="primary-node">testing</span>}
        secondaryButtonText={<span data-testid="secondary-node">testing</span>}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('primary-node')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-node')).toBeInTheDocument();
  });

  it('should support 2 secondary buttons', () => {
    render(
      <Component
        primaryButtonText="Primary button text"
        secondaryButtons={[
          {
            buttonText: 'First button',
            onClick: jest.fn(),
          },
          {
            buttonText: 'Second button',
            onClick: jest.fn(),
          },
        ]}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('First button')).toBeInTheDocument();
    expect(screen.getByText('Second button')).toBeInTheDocument();
  });

  it('has the expected attributes when alert prop is passed', () => {
    render(
      <Component alert>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-describedby');
  });

  it('renders a danger button and appropriate classes when danger prop is passed', () => {
    render(
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-5')).toHaveClass(
      `${prefix}--modal--danger`
    );
    expect(screen.getByText('Danger button text')).toHaveClass(
      `${prefix}--btn--danger`
    );
  });

  it('disables buttons when inline loading status is active', () => {
    render(
      <Component
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
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
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5"
        decorator={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--modal--decorator`);
  });

  it('should respect slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5"
        slug={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--modal--slug`);
    spy.mockRestore();
  });

  it('should set correct focus if data-modal-primary-focus is used', () => {
    render(
      <Component
        open
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('text-input-1')).toHaveFocus();
  });

  it('should set correct focus on a danger modal if data-modal-primary-focus is used', () => {
    render(
      <Component
        open
        danger
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('text-input-1')).toHaveFocus();
  });

  it('should set focus on secondary button if danger modal is used', () => {
    render(
      <Component
        open
        danger
        id="custom-modal-id"
        data-testid="modal-4"
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Cancel')).toHaveFocus();
  });

  it('should not focus the launcherButtonRef on initial render or after timers', () => {
    jest.useFakeTimers();

    const launcherButtonRef = React.createRef();

    render(
      <>
        <button ref={launcherButtonRef} data-testid="launcher-button">
          Launch Modal
        </button>
        <Component
          open={false}
          launcherButtonRef={launcherButtonRef}
          primaryButtonText="Save"
          secondaryButtonText="Cancel">
          <p>Modal Content</p>
        </Component>
      </>
    );

    const launcherButton = screen.getByTestId('launcher-button');

    expect(launcherButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    jest.runAllTimers();

    expect(launcherButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    jest.useRealTimers();
  });

  it('should focus the launcherButtonRef on close when defined', async () => {
    const ModalExample = () => {
      const buttonRef = useRef(null);
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <button ref={buttonRef} type="button" onClick={() => setIsOpen(true)}>
            Launch modal
          </button>
          <Component
            data-testid="modal"
            launcherButtonRef={buttonRef}
            open={isOpen}
            onRequestClose={() => {
              setIsOpen(false);
            }}
          />
        </>
      );
    };
    render(<ModalExample />);

    const button = screen.getByRole('button', { name: /Launch modal/ });
    await userEvent.click(button);

    expect(screen.getByTestId('modal')).toHaveClass('is-visible');

    await userEvent.click(screen.getByRole('button', { name: /Close/ }));

    if (isPresence) {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    } else {
      expect(screen.getByTestId('modal')).not.toHaveClass('is-visible');
    }

    expect(button).toHaveFocus();
  });

  describe('enable-dialog-element feature flag', () => {
    it('should bring launcherButtonRef element into focus on close when the ref is defined', async () => {
      const ModalExample = () => {
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
      render(<ModalExample />);

      const closeButton = screen.getByTestId('close');
      const focusElem = screen.getByTestId('focusElem');

      expect(focusElem).not.toHaveFocus();
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(focusElem).toHaveFocus();
      });
    });
  });
});

describe('state', () => {
  it('should set expected class when state is open', () => {
    render(
      <Modal
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-6">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Modal>
    );

    expect(screen.getByTestId('modal-6')).toHaveClass('is-visible');
  });
});

describe('state with presence feature flag', () => {
  it('should be present when state is open', () => {
    render(<ModalWithPresenceFeatureFlag open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(<ModalWithPresenceFeatureFlag open={false} data-testid="modal" />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <FeatureFlags enablePresence>
        <Modal data-testid="modal" />
      </FeatureFlags>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});

describe('state with presence context', () => {
  it('should be present when state is open', () => {
    render(<ModalWithPresenceContext open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(<ModalWithPresenceContext open={false} data-testid="modal" />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <ModalPresence>
        <Modal data-testid="modal" />
      </ModalPresence>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should handle sibling and child modals exclusively', async () => {
    const ModalExample = () => {
      const [isSiblingOpen, setIsSiblingOpen] = useState(false);
      const [isChildOpen, setIsChildOpen] = useState(false);

      return (
        <ModalPresence open>
          <Modal data-testid="modal">
            <button type="button" onClick={() => setIsSiblingOpen(true)}>
              Launch sibling modal
            </button>
          </Modal>
          <Modal
            data-testid="sibling-modal"
            open={isSiblingOpen}
            onRequestClose={() => setIsSiblingOpen(false)}>
            <button type="button" onClick={() => setIsChildOpen(true)}>
              Launch child modal
            </button>
            <Modal
              data-testid="child-modal"
              open={isChildOpen}
              onRequestClose={() => setIsChildOpen(false)}
            />
          </Modal>
        </ModalPresence>
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

describe.each([
  {
    title: 'events',
    Component: Modal,
  },
  {
    title: 'events with presence feature flag',
    Component: ModalWithPresenceFeatureFlag,
  },
  {
    title: 'events with presence context',
    Component: ModalWithPresenceContext,
  },
])('$title', ({ Component }) => {
  it('should set expected class when state is open', () => {
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-6">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-6')).toHaveClass('is-visible');
  });

  describe('close behavior for clicks outside the modal', () => {
    describe('passive', () => {
      it('should close on outside click by default', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            modalHeading="A test heading"
            onRequestClose={onRequestClose}
            passiveModal>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            passiveModal
            preventCloseOnClickOutside>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            passiveModal
            preventCloseOnClickOutside={false}>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
      });
    });
    describe('non-passive', () => {
      it('should not close on outside click by default', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            preventCloseOnClickOutside>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const onRequestClose = jest.fn();

        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            preventCloseOnClickOutside={false}>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'Warning: `<Modal>` prop `preventCloseOnClickOutside` should not be `false` when `passiveModal` is `false`. Transactional, non-passive Modals should not be dissmissable by clicking outside. See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
        );

        spy.mockRestore();
      });
    });
  });

  it('should not handle close when inner content is clicked', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const innerModal = screen.getByRole('dialog');
    await userEvent.click(innerModal);
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('should handle close keyDown events', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
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

  it('should handle submit keyDown events with shouldSubmitOnEnter enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestSubmit={onRequestSubmit}
        shouldSubmitOnEnter>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).toHaveBeenCalled();
  });

  it('should not handle submit keyDown events if shouldSubmitOnEnter is not enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestSubmit={onRequestSubmit}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).not.toHaveBeenCalled();
  });

  it('should close by default on secondary button click', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should handle custom secondary button events', async () => {
    const onSecondarySubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onSecondarySubmit={onSecondarySubmit}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onSecondarySubmit).toHaveBeenCalled();
  });

  it('should not double submit when Enter key is pressed on primary button with `shouldSubmitOnEnter` enabled', async () => {
    const { keyboard } = userEvent;
    const onRequestSubmit = jest.fn();

    render(
      <Component
        open
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        onRequestSubmit={onRequestSubmit}
        shouldSubmitOnEnter>
        <p>Test content</p>
      </Component>
    );

    const primaryButton = screen.getByRole('button', { name: 'Submit' });

    primaryButton.focus();
    expect(primaryButton).toHaveFocus();

    await keyboard('{Enter}');
    expect(onRequestSubmit).toHaveBeenCalledTimes(1);
  });

  it('should close modal when ESC key is pressed after clicking outside to lose focus', async () => {
    const onRequestClose = jest.fn();
    render(
      <div>
        <div
          data-testid="outside-area"
          style={{ width: '100px', height: '100px' }}>
          Outside area
        </div>
        <Component
          open
          primaryButtonText="Primary button"
          secondaryButtonText="Secondary button"
          onRequestClose={onRequestClose}>
          <p>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
          />
        </Component>
      </div>
    );

    expect(screen.getByRole('presentation')).toHaveClass('is-visible');
    expect(screen.getByLabelText('Domain name')).toHaveFocus();
    await userEvent.click(screen.getByTestId('outside-area'));
    expect(screen.getByLabelText('Domain name')).not.toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
  });
});



File: Modal/ModalPresence.tsx


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

export interface ModalPresenceProps {
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

export const ModalPresence = ({
  open,
  _presenceId: presenceId,
  _autoEnablePresence: autoEnablePresence = true,
  children,
}: PropsWithChildren<ModalPresenceProps>) => {
  const [isPresent, context] = usePresenceContext(open, presenceId);

  const contextValue = useMemo(
    () => ({
      autoEnablePresence,
      ...context,
    }),
    [autoEnablePresence, context]
  );

  if (!isPresent) return null;

  return (
    <ModalPresenceContext.Provider value={contextValue}>
      {children}
    </ModalPresenceContext.Provider>
  );
};

interface ModalPresenceContextProps extends PresenceContext {
  autoEnablePresence: boolean;
}

export const ModalPresenceContext = createContext<
  ModalPresenceContextProps | undefined
>(undefined);

/**
 * Handles occurrences where only a single modal must consume a context.
 */
export const useExclusiveModalPresenceContext = (id: string) => {
  const ctx = useContext(ModalPresenceContext);
  return ctx?.isPresenceExclusive(id) ? ctx : undefined;
};



