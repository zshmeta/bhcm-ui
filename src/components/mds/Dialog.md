File: Dialog/Dialog.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable storybook/story-exports */

import React, { useEffect, useState } from 'react';
import { VStack } from '../Stack';
import {
  Dialog,
  DialogControls,
  DialogCloseButton,
  DialogBody,
  DialogHeader,
  DialogSubtitle,
  DialogTitle,
  DialogFooter,
} from './Dialog';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { action } from 'storybook/actions';
import mdx from './Dialog.mdx';

export default {
  title: 'Preview/preview__Dialog',
  component: Dialog,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['hasScrollingContent', 'modal', 'open', 'focusAfterCloseRef'],
    },
  },
};

export const Modal = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-labelledby="title">
        <DialogHeader>
          <DialogSubtitle>Configure dialog settings</DialogSubtitle>
          <DialogTitle id="title">Modal Dialog Example</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
          <VStack>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <TextInput
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
Modal.args = {
  modal: true,
  open: true,
};

export const NonModal = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
        <DialogHeader>
          <DialogSubtitle>Non-modal dialog example Subtitle</DialogSubtitle>
          <DialogTitle>Non-Modal Dialog</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
          <TextInput
            id="dialog-text-input"
            labelText="Name"
            placeholder="Enter your name"
          />
          <Select id="dialog-select" labelText="Region" defaultValue="us-south">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
NonModal.args = {
  modal: false,
  open: true,
};

export const WithScrollingContent = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
        <DialogHeader>
          <DialogSubtitle>Configure dialog settings</DialogSubtitle>
          <DialogTitle>Modal Dialog Example</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody hasScrollingContent>
          <VStack>
            <p>
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
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <TextInput
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
WithScrollingContent.args = {
  modal: true,
  open: true,
};

export const PassiveDialog = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        modal
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
        <DialogHeader>
          <DialogTitle>Information Message</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
          <p>You have been successfully signed out</p>
        </DialogBody>
      </Dialog>
    </>
  );
};

export const DangerDialog = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}> Toggle open</Button>
      <Dialog {...args} open={open} onRequestClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogSubtitle>Account resources</DialogSubtitle>
          <DialogTitle>
            Are you sure you want to delete this custom domain?
          </DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={() => setOpen(false)} />
          </DialogControls>
        </DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter
          danger
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          onRequestClose={() => setOpen(false)}
          onRequestSubmit={() => {
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};

DangerDialog.args = {
  modal: true,
};



File: Dialog/Dialog.tsx


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  type HTMLAttributes,
  type RefObject,
} from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { usePrefix } from '../../internal/usePrefix';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { Layer } from '../Layer';
import ButtonSet from '../ButtonSet';
import Button from '../Button';
import { useId } from '../../internal/useId';
import { debounce } from 'es-toolkit/compat';
import { InlineLoadingStatus } from '../InlineLoading/InlineLoading';
import InlineLoading from '../InlineLoading/InlineLoading';
const DialogContext = createContext<{
  titleId?: string;
  subtitleId?: string;
  dialogId?: string;
  isOpen?: boolean;
}>({});

/**
 * ----------
 * Dialog
 * ----------
 */
interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  /**
   * Provide the contents of the Dialog
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;

  /**
   * Provide a ref to return focus to once the dialog is closed.
   */
  focusAfterCloseRef?: RefObject<HTMLElement | null>;

  /**
   * Specifies whether the dialog is modal or non-modal. This cannot be changed
   * while open=true
   */
  modal?: boolean;

  /**
   * Specify a handler for the dialog's cancel event.
   * The browser fires this event when the user presses the Esc key and is cancelable.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a click handler applied to the dialog.
   */
  onClick?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler the dialog's close event.
   * The browser fires this event after the dialog has closed.
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify whether the Dialog is currently open
   */
  open?: boolean;

  /**
   * Specify the role of the dialog for accessibility
   * 'dialog' is the default, but 'alertdialog' can be used for important messages requiring user attention
   */
  role?: '' | 'alertdialog';

  /**
   * Specify a label for screen readers
   */
  ariaLabel?: string;

  /**
   * Specify the ID of an element that labels this dialog
   */
  ariaLabelledBy?: string;

  /**
   * Specify the ID of an element that describes this dialog
   */
  ariaDescribedBy?: string;
}

const Dialog = React.forwardRef(
  (
    {
      children,
      className,
      focusAfterCloseRef,
      modal,
      onCancel = noopFn,
      onClick = noopFn,
      onClose = noopFn,
      onRequestClose = noopFn,
      open = false,
      role,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ...rest
    }: DialogProps,
    forwardRef
  ) => {
    const prefix = usePrefix();
    const dialogId = useId();

    const titleId = `${prefix}--dialog-header__heading--${dialogId}`;
    const subtitleId = `${prefix}--dialog-header__label--${dialogId}`;

    // This component needs access to a ref, placed on the dialog, to call the
    // various imperative dialog functions (show(), close(), etc.).
    // If the parent component has not passed a ref for forwardRef, forwardRef
    // will be null. A "backup" ref is needed to ensure the dialog's instance
    // methods can always be called within this component.
    const backupRef = useRef<HTMLDialogElement>(null);
    const ref = (forwardRef ??
      backupRef) as MutableRefObject<HTMLDialogElement>;

    // Clicks on the backdrop of an open modal dialog should request the consuming component to close
    // the dialog. Clicks elsewhere, or on non-modal dialogs should not request
    // to close the dialog.
    function handleModalBackdropClick(e) {
      if (open && modal && e.target === ref.current) {
        onRequestClose(e);
      }
    }

    function handleClick(e) {
      handleModalBackdropClick(e);

      // onClick should always be called, no matter if the target is a modal
      // dialog, modal dialog backdrop, or non-modal dialog.
      onClick(e);
    }

    useEffect(() => {
      if (ref.current) {
        if (open) {
          if (modal) {
            // Display the dialog as a modal, over the top of any other dialogs
            // that might be present. Everything outside the dialog are inert
            // with interactions outside the dialog being blocked.
            ref.current.showModal();
          } else {
            // Display the dialog modelessly, i.e. still allowing interaction
            // with content outside of the dialog.
            ref.current.show();
          }
        } else {
          ref.current.close();
        }
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [modal, open]);

    useEffect(() => {
      if (!open && focusAfterCloseRef) {
        // use setTimeout to ensure focus is set after all other default focus behavior
        const moveFocus = setTimeout(() => {
          focusAfterCloseRef.current?.focus();
        });

        //component did unmount equivalent
        return () => {
          clearTimeout(moveFocus);
        };
      }
    }, [open, focusAfterCloseRef]);

    const containerClasses = cx(`${prefix}--dialog-container`);
    const contextValue = {
      dialogId,
      titleId,
      subtitleId,
      isOpen: open,
    };

    useEffect(() => {
      if (ref.current && open && !ariaLabel && !ariaLabelledBy) {
        const title = ref.current.querySelector(
          `.${prefix}--dialog-header__heading`
        );

        // Set aria-labelledby to the title's ID if it exists
        if (title && title.id) {
          ref.current.setAttribute('aria-labelledby', title.id);
        }
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [open, ariaLabel, ariaLabelledBy, prefix]);

    return (
      <DialogContext.Provider value={contextValue}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events , jsx-a11y/no-noninteractive-element-interactions -- https://github.com/carbon-design-system/carbon/issues/20452 */}
        <dialog
          {...rest}
          className={cx(
            `${prefix}--dialog`,
            {
              [`${prefix}--dialog--modal`]: modal,
            },
            className
          )}
          ref={ref}
          onCancel={onCancel}
          onClick={handleClick}
          onClose={onClose}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabel ? ariaLabelledBy || titleId : undefined}
          aria-describedby={ariaDescribedBy}>
          <div className={containerClasses}>{children}</div>
        </dialog>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = 'Dialog';

Dialog.propTypes = {
  /**
   * Provide children to be rendered inside of the Dialog
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Provide a ref to return focus to once the dialog is closed.
   */
  focusAfterCloseRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Modal specifies whether the Dialog is modal or non-modal. This cannot be
   * changed while open=true
   */
  modal: PropTypes.bool,

  /**
   * Specify a handler for closing Dialog.
   * The handler should care of closing Dialog, e.g. changing `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * open initial state
   */
  open: PropTypes.bool,

  /**
   * Specify the role of the dialog for accessibility
   */
  role: PropTypes.oneOf(['dialog', 'alertdialog']),

  /**
   * Specify a label for screen readers
   */
  'aria-label': PropTypes.string,

  /**
   * Specify the ID of an element that labels this dialog
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Specify the ID of an element that describes this dialog
   */
  ariaDescribedBy: PropTypes.string,
};

/**
 * -------------
 * DialogHeader
 * -------------
 */
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, ...rest }, ref) => {
    const prefix = usePrefix();
    return (
      <div className={`${prefix}--dialog__header`} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

DialogHeader.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,
};

/**
 * ---------------
 * DialogControls
 * ---------------
 */
interface DialogControlsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children?: React.ReactNode;
}
const DialogControls = React.forwardRef<HTMLDivElement, DialogControlsProps>(
  ({ children, ...rest }, ref) => {
    const prefix = usePrefix();
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
      // @ts-ignore
      <div className={`${prefix}--dialog__header-controls`} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DialogControls.displayName = 'DialogControls';

DialogControls.propTypes = {
  /**
   * Provide children to be rendered inside of this component
   */
  children: PropTypes.node,
};

/**
 * -------------------
 * DialogCloseButton
 * -------------------
 */
interface DialogCloseButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick?: React.MouseEventHandler;
}
const DialogCloseButton = React.forwardRef<
  HTMLDivElement,
  DialogCloseButtonProps
>(({ onClick, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore
    <IconButton
      kind="ghost"
      className={`${prefix}--dialog__close`}
      label="Close"
      title="Close"
      aria-label="Close"
      align="left"
      onClick={onClick}
      ref={ref}
      {...rest}>
      <Close
        size={20}
        aria-hidden="true"
        tabIndex={-1}
        className={`${prefix}--icon__close`}
      />
    </IconButton>
  );
});

DialogCloseButton.displayName = 'DialogCloseButton';

DialogCloseButton.propTypes = {
  /**
   * Specify a click handler applied to the IconButton
   */
  onClick: PropTypes.func,
};

/**
 * ------------
 * DialogTitle
 * ------------
 */
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Provide the contents of the DialogTitle
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the title node
   */
  className?: string;

  /**
   * Specify an optional id for the title element
   */
  id?: string;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, id, ...rest }, ref) => {
    const prefix = usePrefix();

    const { titleId } = useContext(DialogContext);
    const headingId = id || titleId;

    return (
      <Text
        as="h2"
        id={headingId}
        className={cx(`${prefix}--dialog-header__heading`, className)}
        ref={ref}
        {...rest}>
        {children}
      </Text>
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

DialogTitle.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the title node
   */
  className: PropTypes.string,

  /**
   * Specify an optional id for the title element
   */
  id: PropTypes.string,
};

/**
 * ---------------
 * DialogSubtitle
 * ---------------
 */
interface DialogSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Provide the contents of the DialogSubtitle
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the subtitle node
   */
  className?: string;

  /**
   * Specify an optional id for the subtitle element
   */
  id?: string;
}

const DialogSubtitle = React.forwardRef<
  HTMLParagraphElement,
  DialogSubtitleProps
>(({ children, className, id, ...rest }, ref) => {
  const prefix = usePrefix();
  const { subtitleId } = useContext(DialogContext);
  const labelId = id || subtitleId;

  return (
    <Text
      as="h2"
      id={labelId}
      className={cx(`${prefix}--dialog-header__label`, className)}
      ref={ref}
      {...rest}>
      {children}
    </Text>
  );
});

DialogSubtitle.displayName = 'DialogSubtitle';

DialogSubtitle.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the subtitle node
   */
  className: PropTypes.string,

  /**
   * Specify an optional id for the subtitle element
   */
  id: PropTypes.string,
};

/**
 * -----------
 * DialogBody
 * -----------
 */
interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents of the DialogBody
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the body node
   */
  className?: string;

  /**
   * Specify whether the content has overflow that should be scrollable
   */
  hasScrollingContent?: boolean;
}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, hasScrollingContent, ...rest }, ref) => {
    const prefix = usePrefix();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const dialogId = useId();
    const dialogBodyId = `${prefix}--dialog-body--${dialogId}`;

    useIsomorphicEffect(() => {
      if (contentRef.current) {
        setIsScrollable(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }

      function handler() {
        if (contentRef.current) {
          setIsScrollable(
            contentRef.current.scrollHeight > contentRef.current.clientHeight
          );
        }
      }

      const debouncedHandler = debounce(handler, 200);
      window.addEventListener('resize', debouncedHandler);
      return () => {
        debouncedHandler.cancel();
        window.removeEventListener('resize', debouncedHandler);
      };
    }, []);

    const contentClasses = cx(
      `${prefix}--dialog-content`,
      {
        [`${prefix}--dialog-scroll-content`]:
          hasScrollingContent || isScrollable,
      },
      className
    );

    const hasScrollingContentProps =
      hasScrollingContent || isScrollable
        ? {
            tabIndex: 0,
            role: 'region',
          }
        : {};

    const combinedRef = (el: HTMLDivElement) => {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current = el;
      }
      contentRef.current = el;
    };

    return (
      <Layer
        ref={combinedRef}
        id={dialogBodyId}
        className={contentClasses}
        {...hasScrollingContentProps}
        {...rest}>
        {children}
      </Layer>
    );
  }
);

DialogBody.displayName = 'DialogBody';

DialogBody.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the body node
   */
  className: PropTypes.string,

  /**
   * Specify whether the content has overflow that should be scrollable
   */
  hasScrollingContent: PropTypes.bool,
};

/**
 * -------------
 * DialogFooter
 * -------------
 */
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Provide the contents of the DialogFooter
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the footer node
   */
  className?: string;

  /**
   * Specify a handler for closing dialog (secondary button)
   */
  onRequestClose?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for the secondary button.
   * Useful if separate handler from `onRequestClose` is desirable
   */
  onSecondarySubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify a handler for submitting dialog (primary button)
   */
  onRequestSubmit?: React.ReactEventHandler<HTMLElement>;

  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: React.ReactNode;

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled?: boolean;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: React.ReactNode;

  /**
   * Specify an array of config objects for secondary buttons
   */
  secondaryButtons?: Array<{
    buttonText: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }>;

  /**
   * Specify whether the Dialog is for dangerous actions
   */
  danger?: boolean;

  /**
   * Specify loading status
   */
  loadingStatus?: InlineLoadingStatus;

  /**
   * Specify the description for the loading text
   */
  loadingDescription?: string;

  /**
   * Specify the description for the loading icon
   */
  loadingIconDescription?: string;

  /**
   * Specify an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess?: () => void;
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  (
    {
      children,
      className,
      onRequestClose = noopFn,
      onSecondarySubmit,
      onRequestSubmit = noopFn,
      primaryButtonText = 'Save',
      primaryButtonDisabled = false,
      secondaryButtonText = 'Cancel',
      secondaryButtons,
      loadingStatus = 'inactive',
      loadingDescription,
      loadingIconDescription,
      onLoadingSuccess = noopFn,
      danger = false,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const button = useRef<HTMLButtonElement>(null);
    const { isOpen } = useContext(DialogContext);
    const [secondaryButtonRef, setSecondaryButtonRef] =
      useState<HTMLButtonElement | null>(null);
    useEffect(() => {
      if (danger && secondaryButtonRef) {
        const focusFrame = requestAnimationFrame(() => {
          secondaryButtonRef.focus();
        });

        return () => cancelAnimationFrame(focusFrame);
      }
    }, [danger, secondaryButtonRef, isOpen]);

    const classes = cx(`${prefix}--dialog-footer`, className, {
      [`${prefix}--dialog-footer--three-button`]:
        Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
    });
    const loadingActive = loadingStatus !== 'inactive';
    const primaryButtonClass = cx({
      [`${prefix}--btn--loading`]: loadingStatus !== 'inactive',
    });

    const onSecondaryButtonClick = onSecondarySubmit
      ? onSecondarySubmit
      : onRequestClose;

    if (children) {
      return (
        <ButtonSet className={classes} ref={ref} {...rest}>
          {children}
        </ButtonSet>
      );
    }

    return (
      <ButtonSet
        className={classes}
        aria-busy={loadingActive}
        ref={ref}
        {...rest}>
        {Array.isArray(secondaryButtons) && secondaryButtons.length <= 2
          ? secondaryButtons.map(
              ({ buttonText, onClick: onButtonClick }, i) => (
                <Button
                  key={`${buttonText}-${i}`}
                  // eslint-disable-next-line jsx-a11y/no-autofocus -- https://github.com/carbon-design-system/carbon/issues/20452
                  autoFocus={danger}
                  kind="secondary"
                  ref={i === 0 && danger ? setSecondaryButtonRef : undefined}
                  onClick={onButtonClick}>
                  {buttonText}
                </Button>
              )
            )
          : secondaryButtonText && (
              <Button
                ref={danger ? setSecondaryButtonRef : undefined}
                disabled={loadingActive}
                kind="secondary"
                // eslint-disable-next-line jsx-a11y/no-autofocus -- https://github.com/carbon-design-system/carbon/issues/20452
                autoFocus={danger}
                onClick={onSecondaryButtonClick}>
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
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

DialogFooter.propTypes = {
  /**
   * Provide the contents to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the footer node
   */
  className: PropTypes.string,

  /**
   * Specify a handler for closing dialog.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify a handler for the secondary button.
   */
  onSecondarySubmit: PropTypes.func,

  /**
   * Specify a handler for submitting dialog.
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.node,

  /**
   * Specify whether the Button should be disabled, or not
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.node,

  /**
   * Specify an array of config objects for secondary buttons
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
   * Specify whether the Dialog is for dangerous actions
   */
  danger: PropTypes.bool,

  /**
   * Specify loading status
   */
  loadingStatus: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),

  /**
   * Specify the description for the loading text
   */
  loadingDescription: PropTypes.string,

  /**
   * Specify the description for the loading icon
   */
  loadingIconDescription: PropTypes.string,

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess: PropTypes.func,
};
/**
 * -------
 * Exports
 * -------
 */

export {
  Dialog,
  DialogHeader,
  DialogControls,
  DialogCloseButton,
  DialogTitle,
  DialogSubtitle,
  DialogBody,
  DialogFooter,
};

export type {
  DialogProps,
  DialogHeaderProps,
  DialogControlsProps,
  DialogCloseButtonProps,
  DialogTitleProps,
  DialogSubtitleProps,
  DialogBodyProps,
  DialogFooterProps,
};



File: Dialog/index.tsx


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export {
  Dialog,
  DialogHeader,
  DialogControls,
  DialogCloseButton,
  DialogTitle,
  DialogSubtitle,
  DialogBody,
  DialogFooter,
} from './Dialog';
export type {
  DialogProps,
  DialogHeaderProps,
  DialogControlsProps,
  DialogCloseButtonProps,
  DialogTitleProps,
  DialogSubtitleProps,
  DialogBodyProps,
  DialogFooterProps,
} from './Dialog';



File: Dialog/Dialog-test.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogCloseButton } from './Dialog';

const prefix = 'cds';

describe('Dialog', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(<Dialog ref={ref} />);
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(<Dialog className="test" />);
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(<Dialog data-testid="test" />);
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('supports modal', () => {
      const { container } = render(<Dialog modal />);
      expect(container.firstChild).toHaveClass(`${prefix}--dialog--modal`);
    });

    it('supports non-modal', () => {
      const { container } = render(<Dialog />);
      expect(container.firstChild).not.toHaveClass(`${prefix}--dialog--modal`);
    });

    it('supports open prop', () => {
      render(<Dialog open />);
      expect(screen.getByRole('dialog').open).toBe(true);
    });

    it('is not open by default', () => {
      render(<Dialog />);
      expect(screen.getByRole('dialog', { hidden: true }).open).toBe(false);
    });

    it('supports children prop', () => {
      render(
        <Dialog open>
          <p>Test children</p>
        </Dialog>
      );
      expect(screen.getByText('Test children')).toBeInTheDocument();
      expect(screen.getByText('Test children')).toBeVisible();
    });

    it('supports onClick prop', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(
        <Dialog open onClick={onClick}>
          <p>Test children</p>
        </Dialog>
      );

      await user.click(screen.getByText('Test children'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  it('should bring focusAfterCloseRef element into focus on close when the ref is defined', async () => {
    const DialogExample = () => {
      const [open, setOpen] = useState(true);
      const focusRef = useRef();
      return (
        <>
          <Dialog
            open={open}
            focusAfterCloseRef={focusRef}
            onClose={() => setOpen(false)}>
            <DialogCloseButton
              data-testid="close"
              onClick={() => setOpen(false)}
            />
          </Dialog>
          <button data-testid="focusElem" ref={focusRef}>
            focus after close
          </button>
        </>
      );
    };
    render(<DialogExample />);

    const closeButton = screen.getByTestId('close');
    const focusElem = screen.getByTestId('focusElem');

    expect(focusElem).not.toHaveFocus();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(focusElem).toHaveFocus();
    });
  });
});



File: Dialog/Dialog.mdx


import { ArgTypes, Meta } from '@storybook/addon-docs/blocks';

<Meta isTemplate />

# Dialog

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Dialog)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `Dialog` component is a primitive that wraps the native `<dialog>` and
provides a composable api of related components that match the spec for Modals
and non-modal dialogs as documented in the Dialog pattern.

Chrome's built in focus wrap behavior includes the browser bar in the tab order.
This is expected and consistent with `alert()` behavior.
https://github.com/w3c/html/issues/1514#issuecomment-404097904

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Dialog/Dialog.mdx).



