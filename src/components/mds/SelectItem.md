File: SelectItem/SelectItem.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SelectItemProps extends HTMLAttributes<HTMLOptionElement> {
  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;

  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden?: boolean;

  /**
   * Provide the contents of your <SelectItem>
   */
  text: string;

  /**
   * Specify the value of the <SelectItem>
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  value: any;
}

const SelectItem = ({
  className,
  value = '',
  disabled = false,
  hidden = false,
  text = '',
  ...other
}: SelectItemProps) => {
  const prefix = usePrefix();
  const selectItemClasses = classNames({
    [`${prefix}--select-option`]: true,
    ...(className && { [className]: className }),
  });

  return (
    <option
      {...other}
      className={selectItemClasses}
      value={value}
      disabled={disabled}
      hidden={hidden}>
      {text}
    </option>
  );
};

SelectItem.propTypes = {
  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden: PropTypes.bool,

  /**
   * Provide the contents of your <SelectItem>
   */
  text: PropTypes.string.isRequired,

  /**
   * Specify the value of the <SelectItem>
   */
  value: PropTypes.any.isRequired,
};

export default SelectItem;



File: SelectItem/SelectItem-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SelectItem from './SelectItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SelectItem', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(
        <SelectItem data-testid="test-id" text={'testText'} value="testValue" />
      );
      expect(screen.getByText('testText')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('Has the expected classes', () => {
      render(<SelectItem text={'testText'} value="testValue" />);
      expect(screen.getByText('testText')).toHaveClass(
        `${prefix}--select-option`
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <SelectItem
          className="custom-class"
          text={'testText'}
          value="testValue"
        />
      );
      expect(screen.getByText('testText')).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(<SelectItem disabled text={'testText'} value="testValue" />);
      expect(screen.getByText('testText')).toBeDisabled();
    });

    it('Should not be disabled by default', () => {
      render(<SelectItem text={'testText'} value="testValue" />);
      expect(screen.getByText('testText')).toBeEnabled();
    });

    it('should respect hidden prop', () => {
      render(<SelectItem hidden text={'testText'} value="testValue" />);
      expect(screen.getByText('testText')).toHaveAttribute('hidden');
    });

    it('should respect value prop', () => {
      render(<SelectItem text={'testText'} value={'testValue'} />);
      expect(screen.getByText('testText')).toHaveValue('testValue');
    });
  });
});



File: SelectItem/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SelectItem from './SelectItem';

export default SelectItem;
export { SelectItem };



