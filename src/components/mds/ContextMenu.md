File: ContextMenu/useContextMenu.stories.js


/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { action } from 'storybook/actions';

import { usePrefix } from '../../internal/usePrefix';
import CodeSnippet from '../CodeSnippet';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';

import { Menu, MenuItem, MenuItemDivider, MenuItemRadioGroup } from '../Menu';

import { useContextMenu } from './';
import mdx from './useContextMenu.mdx';

export default {
  title: 'Hooks/useContextMenu',
  component: useContextMenu,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const Text = () => (
  <div style={{ width: '40rem' }}>
    <h2>Right click anywhere in the story frame</h2>
    <br />
    <p>
      The <CodeSnippet type="inline">{`<Menu>`}</CodeSnippet> props are set
      using the hook{' '}
      <CodeSnippet type="inline">{`useContextMenu()`}</CodeSnippet>. This
      determines the position the menu should have on right click and handles
      opening. Props that the{' '}
      <CodeSnippet type="inline">{`useContextMenu()`}</CodeSnippet>
      hook does not set and can be configured by the user are:
      <UnorderedList style={{ paddingLeft: '2rem', margin: '2rem 0' }}>
        <ListItem>className</ListItem>
        <ListItem>label</ListItem>
        <ListItem>size</ListItem>
        <ListItem>target</ListItem>
      </UnorderedList>
    </p>
    <p>
      The
      <CodeSnippet type="inline">{`<MenuItemGroup>`}</CodeSnippet> and
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet>
      components accept children items for nested menus, although the{' '}
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet> component can also
      be used as a stand alone item. The other types of menu items ({' '}
      <CodeSnippet type="inline">{`<MenuItemDivider>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuItemSelectable>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuItemRadioGroup>`}</CodeSnippet>) do not
      accept children. The{' '}
      <CodeSnippet type="inline">{`<MenuItemRadioGroup>`}</CodeSnippet> accepts
      an array of items to display as a group of single choice selection.
    </p>
  </div>
);

export const _useContextMenu = () => {
  const onClick = action('onClick (MenuItem)');
  const onChange = action('onClick (MenuItemRadioGroup)');

  const menuProps = useContextMenu();

  return (
    <>
      <Text />
      <Menu {...menuProps}>
        <MenuItem label="Share with">
          <MenuItemRadioGroup
            label="Share with"
            items={['None', 'Product team', 'Organization', 'Company']}
            defaultSelectedItem="Product team"
            onChange={onChange}
          />
        </MenuItem>
        <MenuItemDivider />
        <MenuItem label="Cut" shortcut="⌘X" onClick={onClick} />
        <MenuItem label="Copy" shortcut="⌘C" onClick={onClick} />
        <MenuItem label="Copy path" shortcut="⌥⌘C" onClick={onClick} />
        <MenuItem label="Paste" disabled shortcut="⌘V" onClick={onClick} />
        <MenuItem label="Duplicate" onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Rename" onClick={onClick} />
        <MenuItem label="Delete" shortcut="⌫" kind="danger" onClick={onClick} />
      </Menu>
    </>
  );
};

export const SpecificElement = () => {
  const prefix = usePrefix();

  const el = useRef(null);
  const menuProps = useContextMenu(el);

  return (
    <>
      <div
        ref={el}
        style={{
          cursor: 'context-menu',
          display: 'inline',
          padding: '0.5rem 1rem',
          backgroundColor: `var(--${prefix}-layer-01)`,
        }}>
        Right click this element
      </div>
      <Menu {...menuProps}>
        <MenuItem label="Edit" />
        <MenuItem label="Delete" kind="danger" />
      </Menu>
    </>
  );
};



File: ContextMenu/useContextMenu.mdx


import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as useContextMenu from './useContextMenu.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# useContextMenu

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ContextMenu)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `useContextMenu` hook is meant to be used in conjunction with `Menu` (see
this [component's documentation](/docs/components-menu--default) for more
details). It provides an easy way to generate the necessary props for `Menu`.

By default, it will listen to the `contextmenu` event on `document`. In most
cases you'll want to restrict a context menu to a certain element or group of
elements only. You can pass that element as the argument for `useContextMenu`.

```jsx
function SomeComponent() {
  const el = useRef(null);
  const menuProps = useContextMenu(el);

  return (
    <>
      <div ref={el}>…</div>

      <Menu {...menuProps}>
        <MenuItem label="Cut" />
        <MenuItem label="Copy" />
        <MenuItem label="Paste" />
      </Menu>
    </>
  );
}
```

<Canvas
  of={useContextMenu.SpecificElement}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(useContextMenu.SpecificElement),
    },
  ]}
/>

Be aware that the following props are not set by `useContextMenu` and can
therefore be configured by the user:

- className
- label
- size
- target

<Canvas
  of={useContextMenu._useContextMenu}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(useContextMenu._useContextMenu),
    },
  ]}
/>

## Component API

```js
// returns an object with 'x', 'y', 'open' and 'onClose' set accordingly intended
// to be passed as pros to the <Menu> component.
const menuProps = useContextMenu(
  // the DOM element or react ref the "contextmenu" event should be attached to.
  // defaults to document.
  trigger
);
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ContextMenu/useContextMenu.mdx).



File: ContextMenu/index.ts


/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useContextMenu from './useContextMenu';

export { useContextMenu };



File: ContextMenu/useContextMenu-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import useContextMenu from './useContextMenu';

const TestComponent = () => {
  const { open, x, y, onClose } = useContextMenu();

  return (
    <>
      {open && (
        <div
          role="menu"
          style={{ position: 'absolute', top: y, left: x }}
          data-testid="context-menu">
          Context Menu
        </div>
      )}
      <div
        data-testid="trigger"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightgray',
        }}
        onClick={onClose}>
        Right Click Here
      </div>
    </>
  );
};

describe('useContextMenu', () => {
  it('should open the context menu on right-click', async () => {
    render(<TestComponent />);
    fireEvent.contextMenu(screen.getByTestId('trigger'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should close context menu when calling onClose', async () => {
    render(<TestComponent />);
    const triggerElement = screen.getByTestId('trigger');

    fireEvent.contextMenu(triggerElement);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(triggerElement);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});



File: ContextMenu/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'hooks-usecontextmenu--use-context-menu'
    },
  ]}
/>



File: ContextMenu/useContextMenu.tsx


/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';

type TriggerType =
  | Element
  | Document
  | Window
  | React.RefObject<Element | null>;

export interface ContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
}

/**
 * @param {TriggerType} [trigger=document] The element or ref which should trigger the Menu on right-click
 * @returns {ContextMenuProps} Props object to pass onto Menu component
 */
function useContextMenu(trigger: TriggerType = document): ContextMenuProps {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  function openContextMenu(e: MouseEvent): void {
    e.preventDefault();

    const { clientX: x, clientY: y } = e;

    setPosition([x, y]);
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  useEffect(() => {
    const el =
      trigger instanceof Element ||
      trigger instanceof Document ||
      trigger instanceof Window
        ? trigger
        : trigger.current;

    if (el) {
      const eventListener = (e: Event) => openContextMenu(e as MouseEvent);

      el.addEventListener('contextmenu', eventListener);

      return () => {
        el.removeEventListener('contextmenu', eventListener);
      };
    }
  }, [trigger]);

  return {
    open,
    x: position[0],
    y: position[1],
    onClose,
  };
}

export default useContextMenu;



