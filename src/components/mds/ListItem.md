File: ListItem/ListItem.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ComponentProps } from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

export type ListItemProps = Omit<ComponentProps<'li'>, 'ref'>;

export default function ListItem({
  className,
  children,
  ...other
}: ListItemProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--list__item`, className);
  return (
    <Text as="li" className={classNames} {...other}>
      {children}
    </Text>
  );
}

ListItem.propTypes = {
  /**
   * Specify the content for the ListItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
};



File: ListItem/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default, default as ListItem } from './ListItem';



File: ListItem/ListItem-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ListItem from './ListItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('ListItem', () => {
  describe('Renders as expected', () => {
    it('should be an li element', () => {
      render(<ListItem>Item</ListItem>);

      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('should render with the appropriate classes', () => {
      const { container } = render(
        <ListItem className="custom-class">Item</ListItem>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--list__item`);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render children as expected', () => {
      render(<ListItem>Item</ListItem>);
      expect(screen.getByText('Item')).toBeInTheDocument();
    });
  });
});



