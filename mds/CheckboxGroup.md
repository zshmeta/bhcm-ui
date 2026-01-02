File: CheckboxGroup/CheckboxGroup-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../Checkbox/Checkbox';
import { render, screen } from '@testing-library/react';
import { AILabel } from '../AILabel';

const prefix = 'cds';

/**
 * @param element {Element}
 * @returns {Record<string, string>}
 */
const getElementAttributes = ({ attributes }) =>
  Array.from(attributes).reduce(
    (acc, { name, value }) => ({ ...acc, [name]: value }),
    {}
  );

describe('CheckboxGroup', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <CheckboxGroup className="test" legendText="Checkbox heading" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should render helperText', () => {
    render(
      <CheckboxGroup
        className="test"
        legendText="Checkbox heading"
        helperText="Helper text"
      />
    );

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should set data-invalid when invalid prop is true', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        invalid>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveAttribute('data-invalid', 'true');
  });

  it('should display invalidText if invalid prop is true', () => {
    render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        invalid
        invalidText="Invalid text">
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Invalid text')).toBeInTheDocument();
  });

  it('should render legendText', () => {
    render(<CheckboxGroup className="test" legendText="Checkbox heading" />);

    expect(screen.getByText('Checkbox heading')).toBeInTheDocument();
  });

  it('should set the id for legend based on legendId', () => {
    render(<CheckboxGroup legendId="legend-testid" legendText="legendtest" />);

    expect(screen.getByText('legendtest')).toHaveAttribute(
      'id',
      'legend-testid'
    );
  });

  it('should respect readOnly prop', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        readOnly>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--readonly`
    );
  });

  it('should respect warn prop', () => {
    const { container } = render(
      <CheckboxGroup className="some-class" legendText="Checkbox heading" warn>
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const warnIcon = container.querySelector(
      `svg.${prefix}--checkbox__invalid-icon--warning`
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--warning`
    );
    expect(warnIcon).toBeInTheDocument();
  });

  it('should display warnText if warn prop is true', () => {
    render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        warn
        warnText="Warn text">
        <Checkbox
          defaultChecked
          labelText="Checkbox label"
          id="checkbox-label-1"
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    );

    expect(screen.getByText('Warn text')).toBeInTheDocument();
    expect(screen.getByText('Warn text')).toHaveClass(
      `${prefix}--form-requirement`
    );
  });

  it('should respect deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        slug={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--checkbox-group--slug`);
    spy.mockRestore();
  });

  it('should respect decorator prop', () => {
    const { container } = render(
      <CheckboxGroup
        className="some-class"
        legendText="Checkbox heading"
        decorator={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--decorator`
    );
  });

  it('should render checkboxes horizontally', () => {
    const { container } = render(
      <CheckboxGroup orientation="horizontal" legendText="test-horizontal-prop">
        <Checkbox labelText="Checkbox label 1" id="checkbox-label-1" />
        <Checkbox labelText="Checkbox label 2" id="checkbox-label-2" />
        <Checkbox labelText="Checkbox label 3" id="checkbox-label-3" />
      </CheckboxGroup>
    );

    expect(container.firstChild).toHaveClass(
      `${prefix}--checkbox-group--horizontal`
    );
  });

  describe('prop inheritance', () => {
    it('should pass props to child `Checkbox` components', () => {
      render(
        <CheckboxGroup legendText="Checkbox heading" invalid readOnly warn>
          <Checkbox labelText="Checkbox 1" id="checkbox-1" />
          <Checkbox labelText="Checkbox 2" id="checkbox-2" />
        </CheckboxGroup>
      );

      const checkbox1 = screen.getByLabelText('Checkbox 1');
      const checkbox2 = screen.getByLabelText('Checkbox 2');
      const attributes1 = getElementAttributes(checkbox1);
      const attributes2 = getElementAttributes(checkbox2);

      expect(attributes1).toEqual({
        class: `${prefix}--checkbox`,
        id: 'checkbox-1',
        'data-invalid': 'true',
        'aria-readonly': 'true',
        type: 'checkbox',
      });
      expect(attributes2).toEqual({
        class: `${prefix}--checkbox`,
        id: 'checkbox-2',
        'data-invalid': 'true',
        'aria-readonly': 'true',
        type: 'checkbox',
      });
    });

    it('should not override individual `Checkbox` props', () => {
      render(
        <CheckboxGroup legendText="Checkbox heading" readOnly>
          <Checkbox labelText="Checkbox 1" id="checkbox-1" readOnly={false} />
          <Checkbox labelText="Checkbox 2" id="checkbox-2" />
        </CheckboxGroup>
      );

      const checkbox1 = screen.getByLabelText('Checkbox 1');
      const checkbox2 = screen.getByLabelText('Checkbox 2');
      const attributes1 = getElementAttributes(checkbox1);
      const attributes2 = getElementAttributes(checkbox2);

      expect(attributes1).toEqual({
        class: `${prefix}--checkbox`,
        id: 'checkbox-1',
        // Should not be read-only because it explicitly sets `readOnly` to
        // `false`.
        'aria-readonly': 'false',
        type: 'checkbox',
      });
      expect(attributes2).toEqual({
        class: `${prefix}--checkbox`,
        id: 'checkbox-2',
        // Should be read-only because it inherits from the group.
        'aria-readonly': 'true',
        type: 'checkbox',
      });
    });

    it('should not affect non-`Checkbox` children', () => {
      render(
        <CheckboxGroup legendText="Checkbox heading" readOnly>
          <Checkbox labelText="Checkbox label" id="checkbox-1" />
          <div data-testid="non-checkbox">Not a checkbox</div>
        </CheckboxGroup>
      );

      const checkbox = screen.getByLabelText('Checkbox label');
      const nonCheckbox = screen.getByTestId('non-checkbox');
      const checkboxAttributes = getElementAttributes(checkbox);
      const nonCheckboxAttributes = getElementAttributes(nonCheckbox);

      expect(checkboxAttributes).toEqual({
        class: `${prefix}--checkbox`,
        id: 'checkbox-1',
        'aria-readonly': 'true',
        type: 'checkbox',
      });
      expect(nonCheckboxAttributes).toEqual({
        'data-testid': 'non-checkbox',
      });
    });
  });
});



File: CheckboxGroup/CheckboxGroup.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from 'react';
import cx from 'classnames';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { Checkbox } from '../Checkbox';

export interface CheckboxGroupProps {
  children?: ReactNode;
  className?: string;
  decorator?: ReactNode;
  helperText?: ReactNode;
  invalid?: boolean;
  invalidText?: ReactNode;
  legendId?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  legendText: ReactNode;
  readOnly?: boolean;
  /**
   * * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug?: ReactNode;
  warn?: boolean;
  warnText?: ReactNode;
}

export interface CustomType {
  size: string;
  kind: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  className,
  decorator,
  helperText,
  invalid,
  invalidText,
  legendId,
  legendText,
  readOnly,
  warn,
  warnText,
  slug,
  orientation = 'vertical',
  ...rest
}) => {
  const prefix = usePrefix();

  const showWarning = !readOnly && !invalid && warn;
  const showHelper = !invalid && !warn;

  const checkboxGroupInstanceId = useId();

  const helperId = !helperText
    ? undefined
    : `checkbox-group-helper-text-${checkboxGroupInstanceId}`;

  const helper = helperText ? (
    <div id={helperId} className={`${prefix}--form__helper-text`}>
      {helperText}
    </div>
  ) : null;

  const fieldsetClasses = cx(`${prefix}--checkbox-group`, className, {
    [`${prefix}--checkbox-group--${orientation}`]: orientation === 'horizontal',
    [`${prefix}--checkbox-group--readonly`]: readOnly,
    [`${prefix}--checkbox-group--invalid`]: !readOnly && invalid,
    [`${prefix}--checkbox-group--warning`]: showWarning,
    [`${prefix}--checkbox-group--slug`]: slug,
    [`${prefix}--checkbox-group--decorator`]: decorator,
  });

  // AILabel always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini', kind: 'default' })
    : candidate;

  const clonedChildren = Children.map(children, (child) => {
    if (
      isValidElement<ComponentProps<typeof Checkbox>>(child) &&
      child.type === Checkbox
    ) {
      const childProps: Pick<
        ComponentProps<typeof Checkbox>,
        'invalid' | 'readOnly' | 'warn'
      > = {
        ...(typeof invalid !== 'undefined' &&
        typeof child.props.invalid === 'undefined'
          ? { invalid }
          : {}),
        ...(typeof readOnly !== 'undefined' &&
        typeof child.props.readOnly === 'undefined'
          ? { readOnly }
          : {}),
        ...(typeof warn !== 'undefined' &&
        typeof child.props.warn === 'undefined'
          ? { warn }
          : {}),
      };

      return Object.keys(childProps).length
        ? cloneElement(child, childProps)
        : child;
    }

    return child;
  });

  return (
    <fieldset
      className={fieldsetClasses}
      data-invalid={invalid ? true : undefined}
      aria-labelledby={rest['aria-labelledby'] || legendId}
      aria-readonly={readOnly}
      aria-describedby={!invalid && !warn && helper ? helperId : undefined}
      {...rest}>
      <legend
        className={`${prefix}--label`}
        id={legendId || rest['aria-labelledby']}>
        {legendText}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--checkbox-group-inner--decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </legend>
      {clonedChildren}
      <div className={`${prefix}--checkbox-group__validation-msg`}>
        {!readOnly && invalid && (
          <>
            <WarningFilled className={`${prefix}--checkbox__invalid-icon`} />
            <div className={`${prefix}--form-requirement`}>{invalidText}</div>
          </>
        )}
        {showWarning && (
          <>
            <WarningAltFilled
              className={`${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`}
            />
            <div className={`${prefix}--form-requirement`}>{warnText}</div>
          </>
        )}
      </div>
      {showHelper && helper}
    </fieldset>
  );
};

CheckboxGroup.propTypes = {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `CheckboxGroup` component
   */
  decorator: PropTypes.node,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the form group is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the form group is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  legendId: PropTypes.node,

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: PropTypes.node.isRequired,

  /**
   * Provide the orientation for how the checkbox should be displayed
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Whether the CheckboxGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `CheckboxGroup` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify whether the form group is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the form group is in warning state
   */
  warnText: PropTypes.node,
};

export default CheckboxGroup;



File: CheckboxGroup/index.ts


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CheckboxGroup from './CheckboxGroup';
import { type CheckboxGroupProps, type CustomType } from './CheckboxGroup';
export default CheckboxGroup;
export { CheckboxGroup, type CheckboxGroupProps, type CustomType };



