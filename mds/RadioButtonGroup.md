File: RadioButtonGroup/RadioButtonGroup-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RadioButtonGroup from './RadioButtonGroup';
import RadioButton from '../RadioButton';
import { AILabel } from '../AILabel';

const prefix = 'cds';

describe('RadioButtonGroup', () => {
  it('should render `legendText` in a <label>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const legend = screen.getByText('test', {
      selector: 'legend',
    });
    expect(legend).toBeInTheDocument();
  });

  it('should render `legendText` in a <fieldset>', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');
    expect(fieldset).toBeDefined();
  });

  it('should render <RadioButton> as children', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');
    expect(fieldset).toContainElement(screen.getByLabelText('test-1'));
    expect(fieldset).toContainElement(screen.getByLabelText('test-2'));
  });

  it('should ignore null children', () => {
    render(
      <RadioButtonGroup defaultSelected="test-1" name="test" legendText="test">
        <RadioButton labelText="test-1" value="test-1" />
        <RadioButton labelText="test-2" value="test-2" />
        {null}
      </RadioButtonGroup>
    );

    const fieldset = screen
      .getByText('test', {
        selector: 'legend',
      })
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');
    expect(fieldset).toContainElement(screen.getByLabelText('test-1'));
    expect(fieldset).toContainElement(screen.getByLabelText('test-2'));
  });

  describe('Component API', () => {
    it('should support a custom className on the outermost element', () => {
      const { container } = render(
        <RadioButtonGroup
          className="custom-class"
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should support passing in disabled to disable the <fieldset>', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          disabled
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );
      const fieldset = screen
        .getByText('test', {
          selector: 'legend',
        })
        // eslint-disable-next-line testing-library/no-node-access
        .closest('fieldset');
      expect(fieldset).toBeDisabled();
    });

    it('should support readonly to prevent changes', async () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          readOnly={true}
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      const radio1 = screen.getByLabelText('test-1');
      const radio2 = screen.getByLabelText('test-2');

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();

      await userEvent.click(radio2);

      // no change
      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();
    });

    it('should support `defaultSelected` as a way to select a radio button', () => {
      render(
        <RadioButtonGroup
          defaultSelected="test-1"
          name="test"
          legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support `valueSelected` as a way to select a radio button', () => {
      const { rerender } = render(
        <RadioButtonGroup valueSelected="test-1" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );

      rerender(
        <RadioButtonGroup valueSelected="test-2" name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-2')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support `checked` prop in RadioButton when there is no `defaultSelected` or `valueSelected`', () => {
      const { rerender } = render(
        <RadioButtonGroup name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" checked />
          <RadioButton labelText="test-2" value="test-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-1')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );

      rerender(
        <RadioButtonGroup name="test" legendText="test">
          <RadioButton labelText="test-1" value="test-1" />
          <RadioButton labelText="test-2" value="test-2" checked />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-2')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should support a 0 value for `valueSelected` (#9041)', () => {
      render(
        <RadioButtonGroup valueSelected={0} name="test" legendText="test">
          <RadioButton labelText="test-1" value={1} />
          <RadioButton labelText="test-0" value={0} />
        </RadioButtonGroup>
      );

      expect(screen.getByLabelText('test-0')).toEqual(
        screen.getByRole('radio', {
          checked: true,
        })
      );
    });

    it('should respect decorator prop', () => {
      const { container } = render(
        <RadioButtonGroup decorator={<AILabel />} name="test" legendText="test">
          <RadioButton labelText="test-1" value={1} />
          <RadioButton labelText="test-0" value={0} />
        </RadioButtonGroup>
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--radio-button-group--decorator`
      );
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <RadioButtonGroup slug={<AILabel />} name="test" legendText="test">
          <RadioButton labelText="test-1" value={1} />
          <RadioButton labelText="test-0" value={0} />
        </RadioButtonGroup>
      );

      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--radio-button-group--slug`
      );
      spy.mockRestore();
    });

    it('should call `onChange` when the value of the group changes', async () => {
      const onChange = jest.fn();

      render(
        <RadioButtonGroup onChange={onChange} name="options">
          <RadioButton labelText="Option one" value="option-one" />
          <RadioButton labelText="Option two" value="option-two" />
        </RadioButtonGroup>
      );

      await userEvent.click(screen.getByLabelText('Option one'));
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        'option-one',
        'options',
        expect.objectContaining({
          target: screen.getByLabelText('Option one'),
        })
      );
    });

    describe('Getting derived state from props', () => {
      it('should change the current selection upon change in props', () => {
        const { rerender } = render(
          <RadioButtonGroup valueSelected="option-one" name="options">
            <RadioButton labelText="Option one" value="option-one" />
            <RadioButton labelText="Option two" value="option-two" />
          </RadioButtonGroup>
        );

        expect(screen.getByLabelText('Option one')).toBeChecked();

        rerender(
          <RadioButtonGroup valueSelected="option-two" name="options">
            <RadioButton labelText="Option one" value="option-one" />
            <RadioButton labelText="Option two" value="option-two" />
          </RadioButtonGroup>
        );

        expect(screen.getByLabelText('Option one')).not.toBeChecked();
        expect(screen.getByLabelText('Option two')).toBeChecked();
      });
    });
    it('should place required on every child <RadioButton>', () => {
      render(
        <RadioButtonGroup name="test" required>
          <RadioButton labelText="Option 1" value="option-1" />
          <RadioButton labelText="Option 2" value="option-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByDisplayValue('option-1')).toBeRequired();
      expect(screen.getByDisplayValue('option-2')).toBeRequired();
    });

    it('should override required on every child <RadioButton>', () => {
      render(
        <RadioButtonGroup name="test" required>
          <RadioButton labelText="Option 1" value="option-1" required={false} />
          <RadioButton labelText="Option 2" value="option-2" />
        </RadioButtonGroup>
      );

      expect(screen.getByDisplayValue('option-1')).toBeRequired();
      expect(screen.getByDisplayValue('option-2')).toBeRequired();
    });

    describe('Invalid and Warning States', () => {
      it('should apply invalid class when invalid prop is true', () => {
        const { container } = render(
          <RadioButtonGroup
            invalid={true}
            invalidText="Invalid selection"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).toHaveClass(`${prefix}--radio-button-group--invalid`);
        expect(screen.getByText('Invalid selection')).toBeInTheDocument();
      });

      it('should apply warning class when warn prop is true', () => {
        const { container } = render(
          <RadioButtonGroup
            warn={true}
            warnText="Warning message"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).toHaveClass(`${prefix}--radio-button-group--warning`);
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });

      it('should not apply invalid class or show invalid text when disabled and invalid', () => {
        const { container } = render(
          <RadioButtonGroup
            disabled={true}
            invalid={true}
            invalidText="Invalid selection"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).not.toHaveClass(
          `${prefix}--radio-button-group--invalid`
        );
        expect(screen.queryByText('Invalid selection')).not.toBeInTheDocument();
      });

      it('should not apply warning class or show warning text when disabled and warn', () => {
        const { container } = render(
          <RadioButtonGroup
            disabled={true}
            warn={true}
            warnText="Warning message"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).not.toHaveClass(
          `${prefix}--radio-button-group--warning`
        );
        expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      });

      it('should not apply invalid class or show invalid text when readOnly and invalid', () => {
        const { container } = render(
          <RadioButtonGroup
            readOnly={true}
            invalid={true}
            invalidText="Invalid selection"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).not.toHaveClass(
          `${prefix}--radio-button-group--invalid`
        );
        expect(screen.queryByText('Invalid selection')).not.toBeInTheDocument();
      });

      it('should not apply warning class or show warning text when readOnly and warn', () => {
        const { container } = render(
          <RadioButtonGroup
            readOnly={true}
            warn={true}
            warnText="Warning message"
            name="test"
            legendText="test">
            <RadioButton labelText="test-1" value="test-1" />
            <RadioButton labelText="test-2" value="test-2" />
          </RadioButtonGroup>
        );

        const fieldset = container.querySelector('fieldset');
        expect(fieldset).not.toHaveClass(
          `${prefix}--radio-button-group--warning`
        );
        expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      });
    });
  });
});



File: RadioButtonGroup/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioButtonGroup, { RadioButtonGroupProps } from './RadioButtonGroup';

export default RadioButtonGroup;
export { RadioButtonGroup };

export type { RadioButtonGroupProps };



File: RadioButtonGroup/RadioButtonGroup.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  createContext,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import type { RadioButtonProps } from '../RadioButton';
import { Legend } from '../Text/createTextComponent';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { deprecate } from '../../prop-types/deprecate';
import { mergeRefs } from '../../tools/mergeRefs';
import { useId } from '../../internal/useId';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export const RadioButtonGroupContext = createContext(null);

type ExcludedAttributes = 'onChange';

export interface RadioButtonGroupProps
  extends Omit<
    React.InputHTMLAttributes<HTMLFieldSetElement>,
    ExcludedAttributes
  > {
  /**
   * Provide a collection of `<RadioButton>` components to render in the group
   */
  children?: ReactNode;

  /**
   * Provide an optional className to be applied to the container node
   */
  className?: string;

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `RadioButtonGroup` component
   */
  decorator?: ReactNode;

  /**
   * Specify the `<RadioButton>` to be selected by default
   */
  defaultSelected?: RadioButtonProps['value'];

  /**
   * Specify whether the group is disabled
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * Provide where label text should be placed
   */
  labelPosition?: 'left' | 'right';

  /**
   * Provide a legend to the RadioButtonGroup input that you are
   * exposing to the user
   */
  legendText?: ReactNode;

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: string;

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange?: (
    selection: RadioButtonProps['value'],
    name: RadioButtonGroupProps['name'],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide where radio buttons should be placed
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether the RadioButtonGroup should be read-only
   */
  readOnly?: boolean;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButtonGroup` component
   */
  slug?: ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected?: RadioButtonProps['value'];

  /**
   * `true` to specify if input selection in group is required.
   */
  required?: boolean;
}

const RadioButtonGroup = React.forwardRef(
  (props: RadioButtonGroupProps, ref) => {
    const {
      children,
      className,
      decorator,
      defaultSelected,
      disabled,
      helperText,
      invalid = false,
      invalidText,
      labelPosition = 'right',
      legendText,
      name,
      onChange = () => {},
      orientation = 'horizontal',
      readOnly,
      valueSelected,
      warn = false,
      warnText,
      slug,
      required,
      ...rest
    } = props;
    const prefix = usePrefix();

    const [selected, setSelected] = useState(valueSelected ?? defaultSelected);
    const [prevValueSelected, setPrevValueSelected] = useState(valueSelected);

    const radioButtonGroupInstanceId = useId();

    /**
     * prop + state alignment - getDerivedStateFromProps
     * only update if selected prop changes
     */
    if (valueSelected !== prevValueSelected) {
      setSelected(valueSelected);
      setPrevValueSelected(valueSelected);
    }

    function getRadioButtons() {
      const mappedChildren = React.Children.map(
        children as ReactElement<RadioButtonProps>,
        (radioButton) => {
          if (!radioButton) {
            return;
          }

          const newProps = {
            name: name,
            key: radioButton.props.value,
            value: radioButton.props.value,
            onChange: handleOnChange,
            checked: radioButton.props.value === selected,
            required: required,
          };

          if (!selected && radioButton.props.checked) {
            newProps.checked = true;
          }

          return React.cloneElement(radioButton, newProps);
        }
      );

      return mappedChildren;
    }

    function handleOnChange(
      newSelection: RadioButtonProps['value'],
      value: RadioButtonProps['name'],
      evt: React.ChangeEvent<HTMLInputElement>
    ) {
      if (!readOnly) {
        if (newSelection !== selected) {
          setSelected(newSelection);
          onChange(newSelection, name, evt);
        }
      }
    }

    const showWarning = !readOnly && !disabled && !invalid && warn;
    const showHelper = !invalid && !disabled && !warn;

    const wrapperClasses = classNames(`${prefix}--form-item`, className);

    const fieldsetClasses = classNames(`${prefix}--radio-button-group`, {
      [`${prefix}--radio-button-group--${orientation}`]:
        orientation === 'vertical',
      [`${prefix}--radio-button-group--label-${labelPosition}`]: labelPosition,
      [`${prefix}--radio-button-group--readonly`]: readOnly,
      [`${prefix}--radio-button-group--invalid`]:
        !readOnly && !disabled && invalid,
      [`${prefix}--radio-button-group--warning`]: showWarning,
      [`${prefix}--radio-button-group--slug`]: slug,
      [`${prefix}--radio-button-group--decorator`]: decorator,
    });

    const helperClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const helperId = !helperText
      ? undefined
      : `radio-button-group-helper-text-${radioButtonGroupInstanceId}`;

    const helper = helperText ? (
      <div id={helperId} className={helperClasses}>
        {helperText}
      </div>
    ) : null;

    const divRef = useRef<HTMLDivElement>(null);

    // AILabel is always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini', kind: 'default' })
      : candidate;

    return (
      <div className={wrapperClasses} ref={mergeRefs(divRef, ref)}>
        <fieldset
          className={fieldsetClasses}
          disabled={disabled}
          data-invalid={invalid ? true : undefined}
          aria-describedby={showHelper && helperText ? helperId : undefined}
          {...rest}>
          {legendText && (
            <Legend className={`${prefix}--label`}>
              {legendText}
              {slug ? (
                normalizedDecorator
              ) : decorator ? (
                <div
                  className={`${prefix}--radio-button-group-inner--decorator`}>
                  {normalizedDecorator}
                </div>
              ) : (
                ''
              )}
            </Legend>
          )}
          {getRadioButtons()}
        </fieldset>
        <div className={`${prefix}--radio-button__validation-msg`}>
          {!readOnly && !disabled && invalid && (
            <>
              <WarningFilled
                className={`${prefix}--radio-button__invalid-icon`}
              />
              <div className={`${prefix}--form-requirement`}>{invalidText}</div>
            </>
          )}
          {showWarning && (
            <>
              <WarningAltFilled
                className={`${prefix}--radio-button__invalid-icon ${prefix}--radio-button__invalid-icon--warning`}
              />
              <div className={`${prefix}--form-requirement`}>{warnText}</div>
            </>
          )}
        </div>
        {showHelper && helper}
      </div>
    );
  }
);

RadioButtonGroup.propTypes = {
  /**
   * Provide a collection of `<RadioButton>` components to render in the group
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `RadioButtonGroup` component
   */
  decorator: PropTypes.node,

  /**
   * Specify the `<RadioButton>` to be selected by default
   */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the group is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide where label text should be placed
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * Provide a legend to the RadioButtonGroup input that you are
   * exposing to the user
   */
  legendText: PropTypes.node,

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange: PropTypes.func,

  /**
   * Provide where radio buttons should be placed
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * Whether the RadioButtonGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * `true` to specify if radio selection in group is required.
   */
  required: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButtonGroup` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;



