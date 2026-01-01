File: OrderedList/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default, default as OrderedList } from './OrderedList';



File: OrderedList/OrderedList-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderedList from './OrderedList';
import ListItem from '../ListItem';

const prefix = 'cds';

describe('OrderedList', () => {
  describe('Renders as expected', () => {
    it('should be an ol element', () => {
      render(
        <OrderedList>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render with the appropriate classes', () => {
      const { container } = render(
        <OrderedList className="custom-class">
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass(`${prefix}--list--ordered`);
    });

    it('should render children as expected', () => {
      render(
        <OrderedList>
          <ListItem>Item 1</ListItem>
        </OrderedList>
      );
      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should render nested lists', () => {
      render(
        <OrderedList data-testid="not-nested">
          <ListItem>
            Ordered List level 1
            <OrderedList nested data-testid="nested">
              <ListItem>Ordered List level 2</ListItem>
              <ListItem>Ordered List level 2</ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      );

      expect(screen.getByTestId('not-nested')).not.toHaveClass(
        `${prefix}--list--nested`
      );
      expect(screen.getByTestId('nested')).toHaveClass(
        `${prefix}--list--nested`
      );
      expect(screen.getByTestId('nested')).toHaveClass(
        `${prefix}--list--ordered`
      );
    });

    it('should render native lists', () => {
      const { container } = render(
        <OrderedList native>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--list--ordered--native`
      );
      expect(container.firstChild).not.toHaveClass(`${prefix}--list--nested`);
    });

    it('should render expressive lists', () => {
      const { container } = render(
        <OrderedList isExpressive>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--list--ordered`);
      expect(container.firstChild).toHaveClass(`${prefix}--list--expressive`);
    });
  });
});



File: OrderedList/OrderedList.stories.js


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';
import mdx from './OrderedList.mdx';

export default {
  title: 'Components/OrderedList',
  component: OrderedList,
  subcomponents: {
    ListItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <OrderedList {...args}>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Default.args = {
  isExpressive: false,
  native: false,
  nested: false,
};

Default.argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
  native: {
    control: {
      type: 'boolean',
    },
  },
  nested: {
    control: {
      type: 'boolean',
    },
  },
};

export const Nested = () => {
  return (
    <OrderedList>
      <ListItem>
        Ordered List level 1
        <OrderedList nested>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>
            Ordered List level 2
            <OrderedList nested>
              <ListItem>Ordered List level 3</ListItem>
              <ListItem>Ordered List level 3</ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
    </OrderedList>
  );
};

export const NativeListStyles = () => {
  return (
    <OrderedList native>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>
        Ordered List level 1
        <OrderedList nested>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
        </OrderedList>
      </ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
    </OrderedList>
  );
};



File: OrderedList/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-orderedlist--default'
    },
    {
      label: 'Native List Styles',
      variant: 'components-orderedlist--native-list-styles'

    },
    {
      label: 'Nested',
      variant: 'components-orderedlist--nested'
    }
  ]}
/>



File: OrderedList/OrderedList.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as OrderedListStories from './OrderedList.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# OrderedList

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/OrderedList)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/list/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/list/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Native List Styles](#native-list-styles)
- [Nested](#nested)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<div style={{ paddingLeft: '15px' }}>
  <Canvas
    of={OrderedListStories.Default}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(OrderedListStories.Default),
      },
    ]}
  />
</div>

## Native List Styles

<div style={{ paddingLeft: '15px' }}>
  <Canvas
    of={OrderedListStories.NativeListStyles}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(OrderedListStories.NativeListStyles),
      },
    ]}
  />
</div>

## Nested

<div style={{ paddingLeft: '15px' }}>
  <Canvas
    of={OrderedListStories.Nested}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(OrderedListStories.Nested),
      },
    ]}
  />
</div>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/OrderedList/OrderedList.mdx).



File: OrderedList/OrderedList.tsx


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

export interface OrderedListProps extends ComponentProps<'ol'> {
  nested?: boolean | undefined;
  native?: boolean | undefined;
  isExpressive?: boolean | undefined;
}

export default function OrderedList({
  className,
  nested = false,
  native = false,
  isExpressive = false,
  ...other
}: OrderedListProps) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--list--ordered`]: !native,
      [`${prefix}--list--ordered--native`]: native,
      [`${prefix}--list--nested`]: nested,
      [`${prefix}--list--expressive`]: isExpressive,
    },
    className
  );
  return <ol className={classNames} {...other} />;
}

OrderedList.propTypes = {
  /**
   * Provide list items to be rendered in the ordered list
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing <ol> node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list expressive or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether this ordered list should use native list styles instead of custom counter
   */
  native: PropTypes.bool,

  /**
   * Specify whether this ordered list is nested inside of another nested list
   */
  nested: PropTypes.bool,
};



