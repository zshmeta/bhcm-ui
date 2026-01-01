File: Breadcrumb/Breadcrumb.mdx


import { Story, Canvas, ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import * as BreadcrumbStories from './Breadcrumb.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Breadcrumb

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Breadcrumb)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/breadcrumb/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/breadcrumb/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Breadcrumb with `OverflowMenu`](#breadcrumb-with-overflowmenu)
- [Skeleton state](#skeleton-state)
- [Component API](#component-api)
  - [Breadcrumb noTrailingSlash](#breadcrumb-notrailingslash)
  - [BreadcrumbItem isCurrentPage](#breadcrumbitem-iscurrentpage)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

You can build a breadcrumb using a combination of the `Breadcrumb` and
`BreadcrumbItem` components. The `Breadcrumb` component accepts a list of
`BreadcrumbItem` components as `children` and each `BreadcrumbItem` is
responsible for displaying the page links in the hierarchy.

<Canvas
  of={BreadcrumbStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(BreadcrumbStories.Default),
    },
  ]}
/>

## Breadcrumb with `OverflowMenu`

When space becomes limited, use an `OverflowMenu` to truncate the breadcrumbs.
The first and last two page links should be shown, but the remaining breadcrumbs
in between are condensed into an overflow menu. Breadcrumbs should never wrap
onto a second line.

<Canvas
  of={BreadcrumbStories.BreadcrumbWithOverflowMenu}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(BreadcrumbStories.BreadcrumbWithOverflowMenu),
    },
  ]}
/>

## Skeleton state

You can use the `BreadcrumbSkeleton` component to render a skeleton variant of a
breadcrumb. This is useful to display while content in your breadcrumb is being
fetched from an external resource like an API.

<Canvas
  of={BreadcrumbStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(BreadcrumbStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

### Breadcrumb noTrailingSlash

You can use the `noTrailingSlash` prop to omit the slash from the end of the
current page.

```jsx
<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
  <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
  <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
</Breadcrumb>
```

### BreadcrumbItem isCurrentPage

You can use the `isCurrentPage` prop on a `BreadcrumbItem` to represent the
current page.

```jsx
<Breadcrumb>
  <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
  <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
  <BreadcrumbItem href="#" isCurrentPage>
    Breadcrumb 3
  </BreadcrumbItem>
</Breadcrumb>
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Breadcrumb/Breadcrumb.mdx).



File: Breadcrumb/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSkeleton from './Breadcrumb.Skeleton';

export { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton };

// Maintain default export as Breadcrumb for backwards-compatibility
export default Breadcrumb;



File: Breadcrumb/Breadcrumb.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface BreadcrumbSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the number of items
   */
  items?: number;

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash?: boolean;

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  size?: 'sm' | 'md';
}

function Item() {
  const prefix = usePrefix();

  return (
    <div className={`${prefix}--breadcrumb-item`}>
      <span className={`${prefix}--link`}>&nbsp;</span>
    </div>
  );
}

function BreadcrumbSkeleton({
  className,
  items = 3,
  noTrailingSlash,
  size,
  ...rest
}: BreadcrumbSkeletonProps) {
  const prefix = usePrefix();
  const classes = cx(
    {
      [`${prefix}--breadcrumb`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
      [`${prefix}--breadcrumb--sm`]: size === 'sm',
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {Array.from({ length: items }, (_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}

BreadcrumbSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the number of items
   */
  items: PropTypes.number,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,

  /**
   * Specify the size of the Breadcrumb. Currently supports the following: `sm` & `md` (default: 'md')
   */
  size: PropTypes.oneOf(['sm', 'md']),
};

export default BreadcrumbSkeleton;
export { BreadcrumbSkeleton };



File: Breadcrumb/Breadcrumb.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Specify the label for the breadcrumb container
   */
  'aria-label'?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash?: boolean;

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  size?: 'sm' | 'md';
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    children,
    className: customClassNameNav,
    noTrailingSlash,
    size,
    ...rest
  } = props;
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
    [`${prefix}--breadcrumb--sm`]: size === 'sm',
  });

  return (
    <nav
      className={customClassNameNav}
      aria-label={ariaLabel ? ariaLabel : 'Breadcrumb'}
      ref={ref}
      {...rest}>
      <ol className={className}>{children}</ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  /**
   * Specify the label for the breadcrumb container
   */
  'aria-label': PropTypes.string,

  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  size: PropTypes.oneOf(['sm', 'md']),
};

export default Breadcrumb;



File: Breadcrumb/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-breadcrumb--default'
    },
    {
      label: 'Breadcrumb with Overflow Menu',
      variant: 'components-breadcrumb--breadcrumb-with-overflow-menu'
    }
  ]}
/>



File: Breadcrumb/Breadcrumb.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import mdx from './Breadcrumb.mdx';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  size: {
    options: ['sm', 'md'],
    control: { type: 'select' },
  },
};

export const Default = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 4</BreadcrumbItem>
  </Breadcrumb>
);

Default.argTypes = {
  ...sharedArgTypes,
};

export const BreadcrumbWithOverflowMenu = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbWithOverflowMenu.argTypes = {
  ...sharedArgTypes,
};

export const BreadcrumbWithOverflowMenuSizeSmall = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbWithOverflowMenuSizeSmall.argTypes = {
  ...sharedArgTypes,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
BreadcrumbWithOverflowMenuSizeSmall.tags = ['!dev', '!autodocs'];

BreadcrumbWithOverflowMenuSizeSmall.args = {
  size: 'sm',
};

export const Skeleton = (args) => {
  return <BreadcrumbSkeleton {...args} />;
};

Skeleton.args = {
  items: 3,
};

Skeleton.parameters = {
  controls: { exclude: ['aria-label'] },
};

Skeleton.argTypes = {
  ...sharedArgTypes,
  items: {
    description: 'Specify the number of items',
    table: {
      defaultValue: { summary: 3 },
    },
  },
};

export const BreadcrumbWithOverflowVisualSnapshots = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbWithOverflowVisualSnapshots.argTypes = {
  ...sharedArgTypes,
};

BreadcrumbWithOverflowVisualSnapshots.play = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button'));
};

BreadcrumbWithOverflowVisualSnapshots.tags = ['!dev', '!autodocs'];



File: Breadcrumb/BreadcrumbItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef, type AriaAttributes } from 'react';
import cx from 'classnames';
import Link from '../Link';
import { OverflowMenuHorizontal } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  'aria-current'?: AriaAttributes['aria-current'];

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href?: string;

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage?: boolean;
}

const frFn = forwardRef<HTMLLIElement, BreadcrumbItemProps>;

const BreadcrumbItem = frFn((props, ref) => {
  const {
    'aria-current': ariaCurrent,
    children,
    className: customClassName = '',
    href,
    isCurrentPage,
    ...rest
  } = props;
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--breadcrumb-item`]: true,
    // We set the current class only if `isCurrentPage` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--breadcrumb-item--current`]:
      isCurrentPage && ariaCurrent !== 'page',
    [customClassName]: !!customClassName,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const child = children as React.FunctionComponentElement<any>;
  if (
    child.type &&
    child.type.displayName !== undefined &&
    child.type.displayName.includes('OverflowMenu')
  ) {
    const horizontalOverflowIcon = (
      <OverflowMenuHorizontal className={`${prefix}--overflow-menu__icon`} />
    );
    return (
      <li className={className} {...rest}>
        {React.cloneElement(child, {
          menuOptionsClass: `${prefix}--breadcrumb-menu-options`,
          menuOffset: { top: 10, left: 59 },
          renderIcon: () => horizontalOverflowIcon,
        })}
      </li>
    );
  }

  if (typeof children === 'string') {
    return (
      <li className={className} ref={ref} {...rest}>
        {href ? (
          <Link href={href} aria-current={ariaCurrent || isCurrentPage}>
            {children}
          </Link>
        ) : (
          <Text
            aria-current={ariaCurrent || isCurrentPage}
            className={`${prefix}--link`}>
            {children}
          </Text>
        )}
      </li>
    );
  }

  return (
    <li className={className} ref={ref} {...rest}>
      {React.cloneElement(child, {
        'aria-current': ariaCurrent,
        className: cx(`${prefix}--link`, child.props.className),
      })}
    </li>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  'aria-current': PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([
      'false',
      'true',
      'page',
      'step',
      'location',
      'date',
      'time',
    ] as const),
  ]),

  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage: PropTypes.bool,
};

export default BreadcrumbItem;



