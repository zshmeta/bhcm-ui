File: UnorderedList/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default, default as UnorderedList } from './UnorderedList';
export { type UnorderedListProps } from './UnorderedList';



File: UnorderedList/UnorderedList.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as UnorderedList from './UnorderedList.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# UnorderedList

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/UnorderedList)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/list/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/list/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Nested](#nested)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={UnorderedList.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(UnorderedList.Default),
    },
  ]}
/>

## Nested

<Canvas
  of={UnorderedList.Nested}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(UnorderedList.Nested),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/UnorderedList/UnorderedList.mdx).



File: UnorderedList/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-unorderedlist--default'
    },
    {
      label: 'Nested',
      variant: 'components-unorderedlist--nested'
    }
  ]}
/>


File: UnorderedList/UnorderedList.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';
import mdx from './UnorderedList.mdx';

export default {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  subcomponents: {
    ListItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <UnorderedList {...args}>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
    </UnorderedList>
  );
};

Default.args = {
  isExpressive: false,
};

Default.argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
};

export const Nested = () => {
  const props = {
    regular: () => {
      return {
        isExpressive: false,
      };
    },
  };
  const regularProps = props.regular();

  return (
    <UnorderedList {...regularProps}>
      <ListItem>
        Unordered List level 1
        <UnorderedList nested>
          <ListItem>Unordered List level 2</ListItem>
          <ListItem>
            Unordered List level 2
            <UnorderedList nested>
              <ListItem>Unordered List level 2</ListItem>
              <ListItem>Unordered List level 2</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
    </UnorderedList>
  );
};

Nested.storyName = 'nested';



File: UnorderedList/UnorderedList.tsx


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

export interface UnorderedListProps extends ComponentProps<'ul'> {
  nested?: boolean | undefined;
  isExpressive?: boolean | undefined;
}

export default function UnorderedList({
  className,
  nested = false,
  isExpressive = false,
  ...other
}: UnorderedListProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
    [`${prefix}--list--expressive`]: isExpressive,
  });
  return <ul className={classNames} {...other} />;
}

UnorderedList.propTypes = {
  /**
   * Specify a collection of ListItem's to be rendered in the UnorderedList
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying `<ul>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list expressive or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether the list is nested, or not
   */
  nested: PropTypes.bool,
};



File: UnorderedList/UnorderedList-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('UnorderedList', () => {
  it('should render children as expected', () => {
    render(
      <UnorderedList>
        <ListItem>Item</ListItem>
      </UnorderedList>
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('should render nested lists', () => {
    render(
      <UnorderedList>
        <ListItem>Item</ListItem>
        <UnorderedList nested data-testid="nested-list">
          <ListItem>Nested</ListItem>
        </UnorderedList>
      </UnorderedList>
    );

    expect(screen.getByTestId('nested-list')).toHaveClass(
      `${prefix}--list--nested`
    );
  });

  it('should add custom className given via className prop', () => {
    render(
      <UnorderedList className="some-class" data-testid="list">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(screen.getByTestId('list')).toHaveClass('some-class');
  });

  it('should render expressive lists', () => {
    const { container } = render(
      <UnorderedList isExpressive>
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    expect(container.firstChild).toHaveClass(`${prefix}--list--unordered`);
    expect(container.firstChild).toHaveClass(`${prefix}--list--expressive`);
  });
});



