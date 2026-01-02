File: ContainedList/ContainedList.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as ContainedListStories from './ContainedList.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ContainedList

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ContainedList)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/components/contained-list/usage/)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Search](#search)
    - [Expandable Search](#expandable-search)
    - [Persistent Search](#persistent-search)
    - [Usage Examples](#usage-examples)
    - [Disclosed](#disclosed)
    - [With Actions](#with-actions)
    - [With Icons](#with-icons)
    - [With Interactive Items](#with-interactive-items)
    - [With Interactive Items and Actions](#with-interactive-items-and-actions)
    - [With List Title Decorators](#with-list-title-decorators)
    - [With Layer](#with-layer)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={ContainedListStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.Default),
    },
  ]}
/>

### Search

#### Expandable Search

Within the Contained List you can pass in an `ExpandableSearch` component within
the `action` prop as seen below. The `ExpandableSearch` will give you the
capability to expand and collapse the search bar within the title. However, we
do not support passing in the `ExpandableSearch` within the title action prop
while passing in the `Search` component as a child at the same time. If this
happens, the `ExpandableSearch` in the title will override any other `Search`
passed in as a child. To prevent this potential conflict, we have added
functionality to support both designs and both use cases. Please see
[Persistent Search](#persistent-search) docs below.

```js
export const WithExpandableSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList
      label="List title"
      kind="on-page"
      action={
        <ExpandableSearch
          placeholder="Filterable search"
          value={searchTerm}
          onChange={handleChange}
          closeButtonLabelText="Clear search input"
          size="lg"
        />
      }>
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};
```

<Canvas
  of={ContainedListStories.WithExpandableSearch}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(ContainedListStories.WithExpandableSearch),
    },
  ]}
/>

#### Persistent Search

We have added in the capability to pass down the `Search` component as a child
of `ContainedList`. The `Search` component itself is not a prop but does render
with specific styling such that the `Search` bar appears below the Contained
List title as opposed to rendering inline. If you would like the Search to
render inline to the Contained List title, please see the
[Expandable Search](#expandable-search) docs above The `Search` component will
also remain persistent under the title, so that it remains visible on scroll,
when there are many list items passed in.

```js
export const WithPersistentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <Search
        placeholder="Filterable search"
        value={searchTerm}
        onChange={handleChange}
        closeButtonLabelText="Clear search input"
        size="lg"
      />
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};
```

`ContainedList.ContainedListItem` is deprecated, use
`import { ContainedListItem } from '@carbon/react` import instead.

<Canvas
  of={ContainedListStories.WithPersistentSearch}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(ContainedListStories.WithPersistentSearch),
    },
  ]}
/>

#### Usage Examples

<Canvas
  of={ContainedListStories.UsageExamples}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.UsageExamples),
    },
  ]}
/>

#### Disclosed

<Canvas
  of={ContainedListStories.Disclosed}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.Disclosed),
    },
  ]}
/>

#### With Actions

<Canvas
  of={ContainedListStories.WithActions}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.WithActions),
    },
  ]}
/>

#### With Icons

<Canvas
  of={ContainedListStories.WithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.WithIcons),
    },
  ]}
/>

#### With Interactive Items

<Canvas
  of={ContainedListStories.WithInteractiveItems}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.WithInteractiveItems),
    },
  ]}
/>

#### With Interactive Items and Actions

<Canvas
  of={ContainedListStories.WithInteractiveItemsAndActions}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.WithInteractiveItemsAndActions),
    },
  ]}
/>

#### With List Title Decorators

<Canvas
  of={ContainedListStories.WithListTitleDecorators}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContainedListStories.WithListTitleDecorators),
    },
  ]}
/>

#### With Layer

<Canvas of={ContainedListStories._WithLayer} />

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback through, asking questions
on Slack, or updating this file on GitHub
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ContainedList/ContainedList.mdx).



File: ContainedList/ContainedListItem/ContainedListItem.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ComponentType,
  type FunctionComponent,
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutConstraint } from '../../Layout';
import { usePrefix } from '../../../internal/usePrefix';

interface ContainedListItemProps {
  /**
   * A slot for a possible interactive element to render within the item.
   */
  action?: ReactNode;

  /**
   * The content of this item. Must not contain any interactive elements. Use props.action to include those.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Whether this item is disabled.
   */
  disabled?: boolean;

  /**
   * Provide an optional function to be called when the item is clicked.
   */
  onClick?: () => void;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;
}

const ContainedListItem: React.FC<ContainedListItemProps> = ({
  action,
  children,
  className,
  disabled = false,
  onClick,
  renderIcon: IconElement,
  ...rest
}) => {
  const prefix = usePrefix();

  const isClickable = onClick !== undefined;

  const classes = classNames(`${prefix}--contained-list-item`, className, {
    [`${prefix}--contained-list-item--clickable`]: isClickable,
    [`${prefix}--contained-list-item--with-icon`]: IconElement,
    [`${prefix}--contained-list-item--with-action`]: action,
  });

  const content = (
    <>
      {IconElement && (
        <div className={`${prefix}--contained-list-item__icon`}>
          <IconElement />
        </div>
      )}
      <div>{children}</div>
    </>
  );

  return (
    <li className={classes} {...rest}>
      {isClickable ? (
        <button
          className={`${prefix}--contained-list-item__content`}
          type="button"
          disabled={disabled}
          onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className={`${prefix}--contained-list-item__content`}>
          {content}
        </div>
      )}
      {action && (
        <LayoutConstraint
          size={{ min: 'sm', max: 'lg' }}
          className={`${prefix}--contained-list-item__action`}>
          {action}
        </LayoutConstraint>
      )}
    </li>
  );
};

ContainedListItem.propTypes = {
  /**
   * A slot for a possible interactive element to render within the item.
   */
  action: PropTypes.node,

  /**
   * The content of this item. Must not contain any interactive elements. Use props.action to include those.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Whether this item is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Provide an optional function to be called when the item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ContainedListItem;



File: ContainedList/ContainedListItem/index.ts


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContainedListItem from './ContainedListItem';

export default ContainedListItem;
export { ContainedListItem };



File: ContainedList/ContainedList.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';

import { action } from 'storybook/actions';
import {
  Add,
  Apple,
  Fish,
  Strawberry,
  Close,
  Wheat,
} from '@carbon/icons-react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import Button from '../Button';
import Search from '../Search';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Tag from '../Tag';

import mdx from './ContainedList.mdx';

import ContainedList, { ContainedListItem } from '.';
import ExpandableSearch from '../ExpandableSearch';

export default {
  title: 'Components/ContainedList',
  component: ContainedList,
  subcomponents: { ContainedListItem },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['action'],
    },
  },
};

const DefaultStory = (args) => (
  <>
    {[...Array(4)].map((_, i) => (
      <ContainedList key={i} {...args}>
        {[...Array(8)].map((_, j) => (
          <ContainedListItem key={`${i}-${j}`}>List item</ContainedListItem>
        ))}
      </ContainedList>
    ))}
  </>
);

export const Default = DefaultStory.bind({});

Default.args = {
  label: 'List title',
  kind: 'on-page',
  size: 'lg',
};

export const Disclosed = () => {
  return (
    <>
      <ContainedList label="List title" kind="disclosed">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
      <ContainedList label="List title" kind="disclosed">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
    </>
  );
};

export const WithInteractiveItems = () => {
  const onClick = action('onClick (ContainedListItem)');

  return (
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithActions = () => {
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={Close}
      aria-label="Dismiss"
    />
  );

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithExpandableSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList
      label="List title"
      kind="on-page"
      action={
        <ExpandableSearch
          placeholder="Filter"
          labelText="Search"
          value={searchTerm}
          onChange={handleChange}
          closeButtonLabelText="Clear search input"
          size="lg"
        />
      }>
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};

export const WithPersistentSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <Search
        placeholder="Filter"
        value={searchTerm}
        onChange={handleChange}
        closeButtonLabelText="Clear search input"
        size="lg"
        labelText="Filter search"
      />
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};

export const WithInteractiveItemsAndActions = () => {
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={Close}
      aria-label="Dismiss"
    />
  );

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
    </ContainedList>
  );
};

export const WithListTitleDecorators = () => {
  return (
    <ContainedList
      label={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <span>List title</span>
          <Tag size="sm" role="status" aria-label="4 items in list">
            4
          </Tag>
        </div>
      }
      kind="on-page">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithIcons = () => {
  return (
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const _WithLayer = () => {
  return (
    <WithLayer>
      <ContainedList label="List title" kind="on-page">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
    </WithLayer>
  );
};

export const UsageExamples = () => {
  const prefix = 'cds';

  return (
    <>
      <ContainedList
        label="List title"
        action={
          <Button
            hasIconOnly
            iconDescription="Add"
            renderIcon={Add}
            tooltipPosition="left"
          />
        }>
        {[...Array(3)].map((_, i) => (
          <ContainedListItem
            key={i}
            action={
              <OverflowMenu flipped size="lg" ariaLabel="List item options">
                <OverflowMenuItem itemText="View details" />
                <OverflowMenuItem itemText="Edit" />
                <OverflowMenuItem itemText="Remove" isDelete hasDivider />
              </OverflowMenu>
            }>
            List item
          </ContainedListItem>
        ))}
      </ContainedList>
      <ContainedList
        label="List title"
        action={
          <Button
            hasIconOnly
            iconDescription="Add"
            renderIcon={Add}
            tooltipPosition="left"
            kind="ghost"
          />
        }>
        {[...Array(3)].map((_, i) => (
          <ContainedListItem key={i}>
            List item
            <br />
            <span className={`${prefix}--label ${prefix}--label--no-margin`}>
              Description text
            </span>
          </ContainedListItem>
        ))}
      </ContainedList>
      <ContainedList label="List title">
        {[...Array(3)].map((_, i) => (
          <ContainedListItem key={i}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: '1rem',
              }}>
              <span>List item</span>
              <span>List item details</span>
              <span>List item details</span>
            </div>
          </ContainedListItem>
        ))}
      </ContainedList>
    </>
  );
};



File: ContainedList/index.ts


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deprecateFieldOnObject } from '../../internal/deprecateFieldOnObject';
import ContainedList from './ContainedList';
import ContainedListItem from './ContainedListItem';

ContainedList.ContainedListItem = ContainedListItem;

if (process.env.NODE_ENV !== 'production') {
  deprecateFieldOnObject(ContainedList, 'ContainedListItem', ContainedListItem);
}
export { ContainedListItem };
export default ContainedList;
export { ContainedList };



File: ContainedList/ContainedList.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutConstraint } from '../Layout';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import ContainedListItem from './ContainedListItem';
import { Search } from '../Search';

const variants = ['on-page', 'disclosed'] as const;

export type ContainedListType = React.FC<ContainedListProps> & {
  ContainedListItem: typeof ContainedListItem;
};

export type Variants = (typeof variants)[number];

export interface ContainedListProps {
  /**
   * A slot for a possible interactive element to render.
   */
  action?: ReactNode;

  /**
   * A collection of ContainedListItems to be rendered in the ContainedList
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the dividing lines in between list items should be inset.
   */
  isInset?: boolean;

  /**
   * The kind of ContainedList you want to display
   */
  kind?: Variants;

  /**
   * A label describing the contained list.
   */
  label?: string | ReactNode;

  /**
   * Specify the size of the contained list.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function filterChildren(children) {
  if (Array.isArray(children)) {
    return children?.filter(
      (child) =>
        !['Search', 'ExpandableSearch'].includes(child?.type?.displayName)
    );
  }

  if (
    children &&
    !['Search', 'ExpandableSearch'].includes(children?.type?.displayName)
  ) {
    return children;
  }

  return null;
}

function renderChildren(children) {
  if (Array.isArray(children)) {
    children.map((child, index) => {
      if (index === 0 && child.type === Search) {
        return child;
      }

      return child;
    });
  }

  if (children && children.type === Search) {
    return children;
  }

  return children;
}

const ContainedList: ContainedListType = ({
  action,
  children,
  className,
  isInset,
  kind = variants[0],
  label,
  size,
  ...rest
}) => {
  const labelId = `${useId('contained-list')}-header`;
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--contained-list`,
    {
      [`${prefix}--contained-list--inset-rulers`]: isInset,
      [`${prefix}--contained-list--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
    },
    `${prefix}--contained-list--${kind}`,
    className
  );

  const filteredChildren = filterChildren(children);

  function isSearchAction(action: React.ReactNode): boolean {
    if (!React.isValidElement(action)) {
      return false;
    }

    const actionTypes = ['Search', 'ExpandableSearch'];
    let actionType = '';
    if (typeof action.type === 'string') {
      actionType = action.type;
    } else {
      actionType = (action.type as { displayName?: string }).displayName || '';
    }
    return actionTypes.includes(actionType);
  }
  const isActionSearch = isSearchAction(action);

  const renderedChildren = renderChildren(children);

  return (
    <div className={classes} {...rest}>
      {label && (
        <div className={`${prefix}--contained-list__header`}>
          <div id={labelId} className={`${prefix}--contained-list__label`}>
            {label}
          </div>
          <LayoutConstraint
            size={{ min: 'sm', max: 'xl' }}
            className={`${prefix}--contained-list__action`}>
            {action}
          </LayoutConstraint>
        </div>
      )}
      {children && (
        /**
         * Webkit removes implicit "list" semantics when "list-style-type: none" is set.
         * Explicitly setting the "list" role ensures assistive technology in webkit
         * browsers correctly announce the semantics.
         *
         * Ref https://bugs.webkit.org/show_bug.cgi?id=170179#c1
         */
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list" aria-labelledby={label ? labelId : undefined}>
          {isActionSearch ? filteredChildren : renderedChildren}
        </ul>
      )}
    </div>
  );
};

ContainedList.propTypes = {
  /**
   * A slot for a possible interactive element to render.
   */
  action: PropTypes.node,

  /**
   * A collection of ContainedListItems to be rendered in the ContainedList
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the dividing lines in between list items should be inset.
   */
  isInset: PropTypes.bool,

  /**
   * The kind of ContainedList you want to display
   */
  kind: PropTypes.oneOf(variants),

  /**
   * A label describing the contained list.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Specify the size of the contained list.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

ContainedList.ContainedListItem = ContainedListItem;
export default ContainedList;



File: ContainedList/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  wide
  variants={[
    {
      label: 'Default',
      variant: 'components-containedlist--default',
    },
    {
      label: 'Disclosed',
      variant: 'components-containedlist--disclosed',
    },
    {
      label: 'With Actions',
      variant: 'components-containedlist--with-actions',
    },
    {
      label: 'With Icons',
      variant: 'components-containedlist--with-icons',
    },
    {
      label: 'With Interactive Items',
      variant: 'components-containedlist--with-interactive-items',
    },
    {
      label: 'With Interactive Items and Actions',
      variant: 'components-containedlist--with-interactive-items-and-actions',
    },
    {
      label: 'With List Title Decorators',
      variant: 'components-containedlist--with-list-title-decorators',
    },
  ]}
/>



