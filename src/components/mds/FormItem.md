File: FormItem/FormItem-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FormItem from '../FormItem';

describe('FormItem', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FormItem className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <FormItem aria-label="test" data-testid="test" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});



File: FormItem/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FormItem from './FormItem';

export default FormItem;
export { FormItem };



File: FormItem/FormItem.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export type FormItemProps = {
  /**
   * Provide content to be rendered in the form item
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className to be applied to the containing node
   */
  className?: string;
};

function FormItem({ className, children, ...rest }: FormItemProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--form-item`, className);

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}

FormItem.propTypes = {
  /**
   * Provide content to be rendered in the form item
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing node
   */
  className: PropTypes.string,
};

export default FormItem;



