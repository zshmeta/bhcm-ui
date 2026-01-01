File: TabContent/TabContent.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Pass in content to render inside the TabContent
   */
  children?: ReactNode;

  /**
   * Provide a className for the tab content container
   */
  className?: string;

  /**
   * Specify whether the TabContent is selected
   */
  selected?: boolean;
}

export default function TabContent(props) {
  const { className, selected, children, ...other } = props;
  const prefix = usePrefix();
  const tabContentClasses = classNames(`${prefix}--tab-content`, className);
  return (
    <div
      role="tabpanel"
      {...other}
      className={tabContentClasses}
      selected={selected}
      hidden={!selected}>
      {children}
    </div>
  );
}

TabContent.propTypes = {
  /**
   * Pass in content to render inside the TabContent
   */
  children: PropTypes.node,

  /**
   * Provide a className for the tab content container
   */
  className: PropTypes.string,

  /**
   * Specify whether the TabContent is selected
   */
  selected: PropTypes.bool,
};



File: TabContent/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { type TabContentProps } from './TabContent';
import TabContent from './TabContent';
export default TabContent;
export { TabContent };



File: TabContent/TabContent-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TabContent from '../TabContent';
import { render, screen } from '@testing-library/react';

describe('TabContent', () => {
  describe('renders as expected', () => {
    it('renders children as expected', () => {
      render(
        <TabContent selected>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole('tabpanel').children.length).toEqual(2);
    });

    it('sets selected and hidden props with opposite boolean values', () => {
      const { rerender } = render(
        <TabContent>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
      rerender(
        <TabContent selected>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      expect(screen.getByRole('tabpanel')).toBeVisible();
    });
  });
});



