File: ModalWrapper/migration.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta isTemplate />

# ModalWrapper deprecation

## Timeline

The `<ModalWrapper/>` component has been deprecated in v11 and will be removed
in v12.

## Migration Strategy

The `<ComposedModal/>` component will be used in favor of the `<ModalWrapper/>`
going forward. The `<ComposedModal/>` is used along with any of these 3 children
components: `<ModalHeader/>`, `<ModalBody/>` and `<ModalFooter/>`. This makes
the `<ComposedModal/>` more customizable as you can choose what to include in
it. A notable difference is that the modal trigger has to be custom implemented
now.

| ModalWrapper props            | ComposedModal component migration | ComposedModal prop equivalent |
| ----------------------------- | --------------------------------- | ----------------------------- |
| buttonTriggerClassName        | n/a                               | n/a                           |
| buttonTriggerText             | n/a                               | n/a                           |
| children                      | ComposedModal                     | children                      |
| disabled                      | n/a                               | n/a                           |
| handleOpen                    | n/a                               | n/a                           |
| handleSubmit                  | ModalFooter                       | onRequestSubmit               |
| id                            | n/a                               | n/a                           |
| modalBeforeContent            | n/a                               | n/a                           |
| modalHeading                  | ModalHeader                       | title                         |
| modalLabel                    | ModalHeader                       | label                         |
| modalText                     | ModalBody                         | children                      |
| onKeyDown                     | ComposedModal                     | onKeyDown                     |
| passiveModal                  | n/a                               | n/a                           |
| preventCloseOnClickOutside    | ComposedModal                     | preventCloseOnClickOutside    |
| primaryButtonText             | ModalFooter                       | primaryButtonText             |
| renderTriggerButtonIcon       | n/a                               | n/a                           |
| secondaryButtonText           | ModalFooter                       | secondaryButtonText           |
| selectorPrimaryFocus          | ComposedModal                     | selectorPrimaryFocus          |
| shouldCloseAfterSubmit (bool) | ModalFooter                       | onRequestSubmit (func)        |
| status                        | n/a                               | n/a                           |
| triggerButtonIconDescription  | n/a                               | n/a                           |
| triggerButtonKind             | n/a                               | n/a                           |
| withHeader                    | n/a                               | n/a                           |

## Resources

- [ComposedModal source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ComposedModal)
- [ComposedModal with state example](https://react.carbondesignsystem.com/?path=/story/components-composedmodal--with-state-manager)
- [ComposedModal docs](https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ComposedModal/ComposedModal.mdx)



File: ModalWrapper/ ModalWrapper.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ModalWrapper from './ModalWrapper';

export default {
  title: 'Deprecated/ModalWrapper',
  component: ModalWrapper,
  argTypes: {
    triggerButtonKind: {
      options: [
        'primary',
        'secondary',
        'danger',
        'ghost',
        'danger--primary',
        'danger--ghost',
        'danger--tertiary',
        'tertiary',
      ],
    },
  },
};

export const Default = (args) => {
  return (
    <ModalWrapper
      buttonTriggerText="Launch modal"
      modalHeading="Modal heading"
      modalLabel="Label"
      handleSubmit={() => {}}
      {...args}>
      <p>Modal content here</p>
    </ModalWrapper>
  );
};



File: ModalWrapper/ModalWrapper.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { warning } from '../../internal/warning';
import { ButtonKinds } from '../Button';
import { noopFn } from '../../internal/noopFn';
import { keys, match } from '../../internal/keyboard';

export interface ModalWrapperProps {
  buttonTriggerClassName?: string;
  buttonTriggerText?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  handleOpen?: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit?: React.ReactEventHandler<HTMLElement>;
  id?: string;
  modalBeforeContent?: boolean;
  modalHeading?: string;
  modalLabel?: string;
  modalText?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  passiveModal?: boolean;
  preventCloseOnClickOutside?: boolean;
  primaryButtonText?: string;
  renderTriggerButtonIcon: React.ElementType;
  secondaryButtonText?: string;
  selectorPrimaryFocus?: string;
  shouldCloseAfterSubmit?: boolean;
  status?: string;
  triggerButtonIconDescription?: string;
  triggerButtonKind: (typeof ButtonKinds)[number];
  withHeader?: boolean;
}

interface ModelWrapperState {
  isOpen: boolean;
}

let didWarnAboutDeprecation = false;
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
const isDev = process.env.NODE_ENV !== 'production';

export default class ModalWrapper extends React.Component<
  ModalWrapperProps,
  ModelWrapperState
> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  if(isDev) {
    warning(
      didWarnAboutDeprecation,
      '`<ModalWrapper>` has been deprecated in favor of `<ComposedModal/>` and will be removed in the next major version, `@carbon/react@v2.x`'
    );
    didWarnAboutDeprecation = true;
  }

  static propTypes = {
    buttonTriggerClassName: PropTypes.string,
    buttonTriggerText: PropTypes.node,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.string,
    modalBeforeContent: PropTypes.bool,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    modalText: PropTypes.string,
    onKeyDown: PropTypes.func,
    passiveModal: PropTypes.bool,
    preventCloseOnClickOutside: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    renderTriggerButtonIcon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    secondaryButtonText: PropTypes.string,
    selectorPrimaryFocus: PropTypes.string,
    shouldCloseAfterSubmit: PropTypes.bool,
    status: PropTypes.string,
    triggerButtonIconDescription: PropTypes.string,
    triggerButtonKind: PropTypes.oneOf(ButtonKinds),
    withHeader: PropTypes.bool,
  };

  triggerButton = React.createRef<HTMLButtonElement>();
  modal = React.createRef<HTMLDivElement>();

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const innerModal = this.modal.current?.querySelector('div');
    if (
      this.modal.current &&
      evt &&
      !innerModal?.contains(evt.target as Node) &&
      this.props.preventCloseOnClickOutside
    ) {
      return;
    } else {
      this.setState({ isOpen: false }, () =>
        this.triggerButton.current?.focus()
      );
    }
  };

  handleOnRequestSubmit = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const { handleSubmit, shouldCloseAfterSubmit } = this.props;

    if (handleSubmit && shouldCloseAfterSubmit) {
      handleSubmit(evt);
      this.handleClose(evt);
    }

    handleSubmit?.(evt);
  };

  render() {
    const {
      children,
      onKeyDown = noopFn,
      buttonTriggerText,
      buttonTriggerClassName,
      renderTriggerButtonIcon,
      primaryButtonText = 'Save',
      secondaryButtonText = 'Cancel',
      triggerButtonIconDescription = 'Provide icon description if icon is used',
      triggerButtonKind = 'primary',
      disabled = false,
      handleSubmit, // eslint-disable-line @typescript-eslint/no-unused-vars
      shouldCloseAfterSubmit = true, // eslint-disable-line @typescript-eslint/no-unused-vars
      selectorPrimaryFocus = '[data-modal-primary-focus]',
      preventCloseOnClickOutside = false, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...other
    } = this.props;

    const props = {
      ...other,
      selectorPrimaryFocus,
      open: this.state.isOpen,
      onRequestClose: this.handleClose,
      onRequestSubmit: this.handleOnRequestSubmit,
    };

    return (
      <div
        role="presentation"
        onKeyDown={(evt) => {
          if (match(evt, keys.Escape)) {
            this.handleClose(evt);
            onKeyDown(evt);
          }
        }}>
        <Button
          className={buttonTriggerClassName}
          disabled={disabled}
          kind={triggerButtonKind}
          renderIcon={renderTriggerButtonIcon}
          iconDescription={triggerButtonIconDescription}
          onClick={this.handleOpen}
          ref={this.triggerButton}>
          {buttonTriggerText}
        </Button>
        <Modal
          ref={this.modal}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
          {...props}>
          {children}
        </Modal>
      </div>
    );
  }
}



File: ModalWrapper/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ModalWrapper from './ModalWrapper';
export default ModalWrapper;
export { ModalWrapper };



File: ModalWrapper/ModalWrapper-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalWrapper from '../ModalWrapper';

describe('ModalWrapper', () => {
  it('should default to primary button', () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    expect(screen.getByText('Save')).toHaveClass('cds--btn--primary');
  });

  it('should render danger button when danger is passed', () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        danger>
        <p>Modal content here</p>
      </ModalWrapper>
    );

    expect(screen.getByText('Save')).toHaveClass('cds--btn--danger');
  });

  it('should render a secondary button by default', () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        danger>
        <p>Modal content here</p>
      </ModalWrapper>
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should not render a secondary button if text is explicitly null', () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        secondaryButtonText={null}
        danger>
        <p>Modal content here</p>
      </ModalWrapper>
    );

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('should set state to open when trigger button is clicked', async () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        data-testid="modal-1">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const triggerBtn = screen.getByText('Launch modal');
    expect(screen.getByTestId('modal-1')).not.toHaveClass('is-visible');
    await userEvent.click(triggerBtn);
    expect(screen.getByTestId('modal-1')).toHaveClass('is-visible');
  });

  it('should set open state to false when escape is pressed', async () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        data-testid="modal-2">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const triggerBtn = screen.getByText('Launch modal');
    await userEvent.click(triggerBtn);
    expect(screen.getByTestId('modal-2')).toHaveClass('is-visible');
    await userEvent.keyboard('{Escape}');
    expect(screen.getByTestId('modal-2')).not.toHaveClass('is-visible');
  });

  it('should call onKeyDown with escape', async () => {
    const onKeyDown = jest.fn();
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        data-testid="modal-2"
        onKeyDown={onKeyDown}>
        <p>Modal content here</p>
      </ModalWrapper>
    );

    await userEvent.tab();
    await userEvent.keyboard('{Escape}');
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should set open state to false when close button is clicked', async () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        data-testid="modal-3">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const triggerBtn = screen.getByText('Launch modal');
    // eslint-disable-next-line testing-library/no-node-access
    const closeBtn = document.querySelector('.cds--modal-close');
    await userEvent.click(triggerBtn);
    expect(screen.getByTestId('modal-3')).toHaveClass('is-visible');
    await userEvent.click(closeBtn);
    expect(screen.getByTestId('modal-3')).not.toHaveClass('is-visible');
  });

  it('should set open state to false when secondary button is clicked', async () => {
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        data-testid="modal-4">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const triggerBtn = screen.getByText('Launch modal');
    const cancelBtn = screen.getByText('Cancel');
    await userEvent.click(triggerBtn);
    expect(screen.getByTestId('modal-4')).toHaveClass('is-visible');
    await userEvent.click(cancelBtn);
    expect(screen.getByTestId('modal-4')).not.toHaveClass('is-visible');
  });

  it('should close after a successful submit action', async () => {
    const handleSubmit = jest.fn();
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        handleSubmit={handleSubmit}
        shouldCloseAfterSubmit
        open
        data-testid="modal-5">
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const submitBtn = screen.getByText('Save');
    await userEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalled();
    expect(screen.getByTestId('modal-5')).not.toHaveClass('is-visible');
  });

  it('should return focus to the trigger button after closing', async () => {
    const handleSubmit = jest.fn();
    render(
      <ModalWrapper
        buttonTriggerText="Launch modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        handleSubmit={handleSubmit}
        open>
        <p>Modal content here</p>
      </ModalWrapper>
    );

    const triggerBtn = screen.getByText('Launch modal');
    const submitBtn = screen.getByText('Save');
    await userEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalled();
    setTimeout(() => {
      expect(triggerBtn).toHaveFocus();
    }, 0);
  });
});



