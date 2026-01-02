File: PrimaryButton/PrimaryButton-test.js


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PrimaryButton from './PrimaryButton';
import { render, screen } from '@testing-library/react';

describe('PrimaryButton', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<PrimaryButton data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<PrimaryButton className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should be of kind primary', () => {
      render(<PrimaryButton>Submit</PrimaryButton>);

      expect(screen.getByText('Submit')).toHaveClass('cds--btn--primary');
    });
  });
});



File: PrimaryButton/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PrimaryButton from './PrimaryButton';

export default PrimaryButton;
export { PrimaryButton };



File: PrimaryButton/PrimaryButton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, ButtonProps } from '../Button';

const PrimaryButton = <T extends React.ElementType>(props: ButtonProps<T>) => (
  <Button kind="primary" {...props} />
);

export default PrimaryButton;



