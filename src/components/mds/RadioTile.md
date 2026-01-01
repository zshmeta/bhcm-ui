File: RadioTile/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioTile, { RadioTileProps } from './RadioTile';

export default RadioTile;
export { RadioTile };

export type { RadioTileProps };



File: RadioTile/RadioTile.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  RadioButtonChecked,
  RadioButton,
  CheckmarkFilled,
} from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { keys, matches } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface RadioTileProps {
  /**
   * Specify whether the `RadioTile` should be checked.
   */
  checked?: boolean;

  /**
   * The `RadioTile` content.
   */
  children?: React.ReactNode;

  /**
   * Provide an optional `className` to be applied to the underlying `<label>`.
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioTile` component
   */
  decorator?: React.ReactNode;

  /**
   * Specify whether the `RadioTile` should be disabled.
   */
  disabled?: boolean;

  /**
   * **Experimental**: Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * Provide a unique id for the underlying `<input>`.
   */
  id?: string;

  /**
   * `true` to use the light version. For use on `$layer-01` backgrounds only.
   * Don't use this to make tile background color the same as the container background color.
   *
   * @deprecated This prop is no longer needed and has been deprecated in v11 in favor of the new Layer component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Provide a `name` for the underlying `<input>`.
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes.
   */
  onChange?: (
    value: string | number,
    name: string | undefined,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioTile` component
   */
  slug?: React.ReactNode;

  /**
   * Specify the tab index of the underlying `<input>`.
   */
  tabIndex?: number;

  /**
   * Specify the value of the underlying `<input>`.
   */
  value: string | number;

  /**
   * `true` to specify if the input is required.
   */
  required?: boolean;
}
type AriaSupportedProps = React.AriaAttributes;

const RadioTile = React.forwardRef(
  (
    {
      children,
      className: customClassName,
      decorator,
      disabled,
      light,
      checked,
      name,
      value,
      id,
      onChange = noopFn,
      tabIndex = 0,
      hasRoundedCorners,
      slug,
      required,
      ...rest
    }: RadioTileProps & AriaSupportedProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const prefix = usePrefix();
    const inputId = useFallbackId(id);
    const className = cx(
      customClassName,
      `${prefix}--tile`,
      `${prefix}--tile--selectable`,
      `${prefix}--tile--radio`,
      {
        [`${prefix}--tile--is-selected`]: checked,
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--disabled`]: disabled,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      }
    );
    const {
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      ...labelProps
    } = rest;
    const v12TileRadioIcons = useFeatureFlag('enable-v12-tile-radio-icons');
    function icon() {
      if (v12TileRadioIcons) {
        if (checked) {
          return <RadioButtonChecked />;
        } else {
          return <RadioButton />;
        }
      } else {
        return <CheckmarkFilled />;
      }
    }

    function handleOnChange(
      evt:
        | React.ChangeEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) {
      onChange(value, name, evt);
    }

    function handleOnKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
      if (matches(evt, [keys.Enter, keys.Space])) {
        evt.preventDefault();
        onChange(value, name, evt);
      }
    }

    // AILabel is always size `xs`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'xs' })
      : candidate;

    return (
      <div>
        <input
          checked={checked}
          className={`${prefix}--tile-input`}
          disabled={disabled}
          id={inputId}
          name={name}
          onChange={!disabled ? handleOnChange : undefined}
          onKeyDown={!disabled ? handleOnKeyDown : undefined}
          tabIndex={!disabled ? tabIndex : undefined}
          type="radio"
          value={value}
          {...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy })}
          {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })}
          ref={ref}
          required={required}
        />
        <label {...labelProps} htmlFor={inputId} className={className}>
          <span className={`${prefix}--tile__checkmark`}>{icon()}</span>
          <Text className={`${prefix}--tile-content`}>{children}</Text>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--tile--inner-decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
        </label>
      </div>
    );
  }
);

RadioTile.displayName = 'RadioTile';

RadioTile.propTypes = {
  /**
   * Specify whether the `RadioTile` should be checked.
   */
  checked: PropTypes.bool,

  /**
   * The `RadioTile` content.
   */
  children: PropTypes.node,

  /**
   * Provide an optional `className` to be applied to the underlying `<label>`.
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioTile` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the `RadioTile` should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on `$layer-01` backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Provide a `name` for the underlying `<input>`.
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes.
   */
  onChange: PropTypes.func,

  /**
   * `true` to specify if the control is required.
   */
  required: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioTile` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `RadioTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Specify the tab index of the underlying `<input>`.
   */
  tabIndex: PropTypes.number,

  /**
   * Specify the value of the underlying `<input>`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RadioTile;



File: RadioTile/RadioTile-test.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RadioTile from './RadioTile';
import { AILabel } from '../AILabel';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FeatureFlags } from '../FeatureFlags';

describe('RadioTile', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(
        <RadioTile value="standard" data-testid="test-id">
          Option 1
        </RadioTile>
      );

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.cds--tile')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect checked prop', () => {
      render(
        <RadioTile value="standard" checked data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toBeChecked();
      expect(screen.getByTestId('test-id')).toHaveClass(
        'cds--tile--is-selected'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <RadioTile
          value="standard"
          className="custom-class"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(
        <RadioTile value="standard" disabled data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toBeDisabled();
      expect(screen.getByTestId('test-id')).toHaveClass('cds--tile--disabled');
    });

    it('should respect id prop', () => {
      render(
        <RadioTile value="standard" id="tile-1">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('id', 'tile-1');
    });

    it('should add name to input', () => {
      render(
        <RadioTile value="standard" name="tile">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('name', 'tile');
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(
        <RadioTile value="standard" onChange={onChange}>
          Option 1
        </RadioTile>
      );

      await userEvent.click(screen.getByRole('radio'));
      await userEvent.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should respect tabIndex prop', () => {
      render(
        <RadioTile value="standard" tabIndex={-1}>
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '-1');
    });

    it('should respect value prop', () => {
      render(<RadioTile value="standard">Option 1</RadioTile>);

      expect(screen.getByDisplayValue('standard')).toBeInTheDocument();
    });

    it('should pass a given ref to the input element', () => {
      const ref = React.createRef();
      render(
        <RadioTile ref={ref} value="some test value">
          Option 1
        </RadioTile>
      );

      expect(ref.current.type).toEqual('radio');
      expect(ref.current.value).toEqual('some test value');
    });
    it('should pass "required" prop to the input element', () => {
      render(
        <RadioTile required value="some test value">
          Option 1
        </RadioTile>
      );
      expect(screen.getByRole('radio')).toHaveAttribute('required');
    });

    it('should apply "aria-describedby" to the input element', () => {
      render(
        <RadioTile value="standard" aria-describedby="description-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute(
        'aria-describedby',
        'description-id'
      );
    });

    it('should apply "aria-labelledby" to the input element', () => {
      render(
        <RadioTile value="standard" aria-labelledby="label-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByRole('radio')).toHaveAttribute(
        'aria-labelledby',
        'label-id'
      );
    });

    it('should apply both "aria-describedby" and "aria-labelledby" to the input element', () => {
      render(
        <RadioTile
          value="standard"
          aria-describedby="description-id"
          aria-labelledby="label-id">
          Option 1
        </RadioTile>
      );

      const input = screen.getByRole('radio');
      expect(input).toHaveAttribute('aria-describedby', 'description-id');
      expect(input).toHaveAttribute('aria-labelledby', 'label-id');
    });

    it('should not apply "aria-describedby" to the label element', () => {
      render(
        <RadioTile
          value="standard"
          aria-describedby="description-id"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).not.toHaveAttribute(
        'aria-describedby'
      );
    });

    it('should not apply "aria-labelledby" to the label element', () => {
      render(
        <RadioTile
          value="standard"
          aria-labelledby="label-id"
          data-testid="test-id">
          Option 1
        </RadioTile>
      );

      expect(screen.getByTestId('test-id')).not.toHaveAttribute(
        'aria-labelledby'
      );
    });
  });

  it('should check decorator prop and if AILabel exists on radio tile and is xs', async () => {
    render(
      <RadioTile value="standard" decorator={<AILabel />}>
        {' '}
        Option 1{' '}
      </RadioTile>
    );
    expect(screen.getByRole('button')).toHaveClass(`cds--ai-label__button--xs`);
  });

  it('should check deprecated slug prop and if AILabel exists on radio tile and is xs', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <RadioTile value="standard" slug={<AILabel />}>
        {' '}
        Option 1{' '}
      </RadioTile>
    );
    expect(screen.getByRole('button')).toHaveClass(`cds--ai-label__button--xs`);
    spy.mockRestore();
  });

  //Feature flag : enable-v12-tile-radio-icons
  it('should have a checked attribute if the prop checked is provided', () => {
    render(
      <FeatureFlags enableV12TileRadioIcons>
        <RadioTile id="test-1" value="test-1" checked>
          Option 1
        </RadioTile>
      </FeatureFlags>
    );

    expect(screen.getByDisplayValue('test-1')).toEqual(
      screen.getByRole('radio', {
        checked: true,
        name: 'Option 1',
      })
    );
  });
});



