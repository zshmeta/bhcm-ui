File: ContentSwitcher/ContentSwitcher-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ContentSwitcher } from './ContentSwitcher';
import { IconSwitch, Switch } from '../Switch';

describe('ContentSwitcher - RTL', () => {
  describe('renders API as expected', () => {
    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} className="custom-class">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the outermost element', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render with first item selected by default', () => {
      render(
        <ContentSwitcher onChange={() => {}}>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getAllByRole('tab')[0]).toHaveAttribute('tabindex', '0');
      expect(screen.getAllByRole('tab')[0]).toHaveClass(
        'cds--content-switcher--selected'
      );
    });

    it('should call onChange when selected item changes through mouse click', async () => {
      const onChange = jest.fn();
      render(
        <ContentSwitcher onChange={onChange} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      await userEvent.click(screen.getByText('Second section'));

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        name: 'two',
        text: 'Second section',
      });
    });

    it('should call onChange when selected item changes through keydown', async () => {
      const onChange = jest.fn();
      render(
        <ContentSwitcher onChange={onChange} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      await userEvent.type(screen.getByText('First section'), '{ArrowRight}');

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        key: 'ArrowRight',
        name: 'two',
        text: 'Second section',
      });

      await userEvent.type(screen.getByText('Second section'), '{arrowleft}');

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 0,
        key: 'ArrowLeft',
        name: 'one',
        text: 'First section',
      });
    });

    it('should selected initially selected index based on prop', () => {
      render(
        <ContentSwitcher
          onChange={() => {}}
          data-testid="test-id"
          selectedIndex={2}>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getAllByRole('tab')[2]).toHaveAttribute('tabindex', '0');
      expect(screen.getAllByRole('tab')[2]).toHaveClass(
        'cds--content-switcher--selected'
      );
    });

    it('should change sizes based on prop', () => {
      render(
        <ContentSwitcher onChange={() => {}} data-testid="test-id" size="lg">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getByRole('tablist')).toHaveClass(
        'cds--content-switcher--lg'
      );
    });

    it('should have the correct attributes when lowContrast prop is used', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} lowContrast>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      const attributes = Array.from(container.firstChild.attributes).reduce(
        (acc, { name, value }) => ({ ...acc, [name]: value }),
        {}
      );

      expect(attributes).toEqual({
        class:
          'cds--content-switcher cds--content-switcher--low-contrast cds--layout-constraint--size__default-md cds--layout-constraint--size__min-sm cds--layout-constraint--size__max-lg',
        role: 'tablist',
      });
    });

    it('should have the correct attributes with iconOnly version when lowContrast is used', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} lowContrast>
          <IconSwitch name="one" />
          <IconSwitch name="two" />
          <IconSwitch name="three" />
        </ContentSwitcher>
      );

      const attributes = Array.from(container.firstChild.attributes).reduce(
        (acc, { name, value }) => ({ ...acc, [name]: value }),
        {}
      );

      expect(attributes).toEqual({
        class:
          'cds--content-switcher cds--content-switcher--icon-only cds--content-switcher--low-contrast cds--layout-constraint--size__default-md cds--layout-constraint--size__min-sm cds--layout-constraint--size__max-lg',
        role: 'tablist',
      });
    });
  });
});



File: ContentSwitcher/ContentSwitcher.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
} from 'react';
import classNames from 'classnames';
import { deprecate } from '../../prop-types/deprecate';
import { LayoutConstraint } from '../Layout';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import { IconSwitch } from '../Switch';
import type { SwitchEventHandlersParams } from '../Switch/Switch';

export interface ContentSwitcherProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Pass in Switch components to be rendered in the ContentSwitcher
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  children?: ReactElement<any>[];

  /**
   * Specify an optional className to be added to the container node
   */
  className?: string;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `ContentSwitcher` has
   *     been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * `true` to use the low contrast version.
   */
  lowContrast?: boolean;

  /**
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: (params: SwitchEventHandlersParams) => void;

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: number;

  /**
   * Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to 'automatic'
   */
  selectionMode?: 'automatic' | 'manual';

  /**
   * Specify the size of the Content Switcher. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: 'sm' | 'md' | 'lg';
}

export const ContentSwitcher = ({
  children,
  className,
  light,
  lowContrast,
  selectedIndex: selectedIndexProp = 0,
  selectionMode = 'automatic',
  size,
  onChange = noopFn,
  ...other
}: ContentSwitcherProps) => {
  const prefix = useContext(PrefixContext);

  const [selectedIndex, setSelectedIndex] = useState(selectedIndexProp);

  const prevSelectedIndexRef = useRef(selectedIndexProp);
  const switchRefs = useRef<HTMLButtonElement[]>([]);

  const childrenArray = Children.toArray(children);

  useEffect(() => {
    if (prevSelectedIndexRef.current !== selectedIndexProp) {
      setSelectedIndex(selectedIndexProp);
      prevSelectedIndexRef.current = selectedIndexProp;
    }
  }, [selectedIndexProp]);

  const handleItemRef = (index: number) => (ref: HTMLButtonElement | null) => {
    if (ref) {
      switchRefs.current[index] = ref;
    }
  };

  const focusSwitch = (index: number) => {
    const ref = switchRefs.current[index];

    if (ref) {
      ref.focus();
    }
  };

  const isKeyboardEvent = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    event: any
  ): event is KeyboardEvent<HTMLButtonElement> | globalThis.KeyboardEvent =>
    event && typeof event === 'object' && 'key' in event;

  const handleChildChange = (
    event: SwitchEventHandlersParams &
      (KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>)
  ) => {
    if (typeof event.index === 'undefined') return;

    const { index } = event;

    if (
      isKeyboardEvent(event) &&
      matches(event, [keys.ArrowRight, keys.ArrowLeft])
    ) {
      const nextIndex = getNextIndex(event.key, index, childrenArray.length);

      if (typeof nextIndex !== 'number') return;

      focusSwitch(nextIndex);

      if (selectionMode !== 'manual') {
        const child = childrenArray[nextIndex];

        setSelectedIndex(nextIndex);

        if (isValidElement<SwitchEventHandlersParams>(child)) {
          onChange({
            ...event,
            index: nextIndex,
            name: child.props.name,
            text: child.props.text,
          });
        }
      }
    } else if (
      selectedIndex !== index &&
      (isKeyboardEvent(event) ? matches(event, [keys.Enter, keys.Space]) : true)
    ) {
      setSelectedIndex(index);
      focusSwitch(index);
      onChange(event);
    }
  };

  const isIconOnly = Children.map(children, (child) => {
    return isValidElement(child) ? child.type === IconSwitch : null;
  })?.every((val) => val === true);

  const classes = classNames(`${prefix}--content-switcher`, className, {
    [`${prefix}--content-switcher--light`]: light,
    [`${prefix}--content-switcher--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--content-switcher--icon-only`]: isIconOnly,
    [`${prefix}--content-switcher--low-contrast`]: lowContrast,
  });

  return (
    <LayoutConstraint
      size={{ default: 'md', min: 'sm', max: 'lg' }}
      {...other}
      className={classes}
      role="tablist"
      onChange={undefined}>
      {children &&
        Children.map(children, (child, index) =>
          cloneElement(child, {
            index,
            onClick: composeEventHandlers([
              handleChildChange,
              child.props.onClick,
            ]),
            onKeyDown: composeEventHandlers([
              handleChildChange,
              child.props.onKeyDown,
            ]),
            selected: index === selectedIndex,
            ref: handleItemRef(index),
            size,
          })
        )}
    </LayoutConstraint>
  );
};

ContentSwitcher.displayName = 'ContentSwitcher';
ContentSwitcher.propTypes = {
  /**
   * Pass in Switch components to be rendered in the ContentSwitcher
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the container node
   */
  className: PropTypes.string,

  /**
   * `true` to use the light variant.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ContentSwitcher` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * `true` to use the low contrast version.
   */
  lowContrast: PropTypes.bool,

  /**
   * Specify an `onChange` handler that is called whenever the ContentSwitcher
   * changes which item is selected
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Specify a selected index for the initially selected content
   */
  selectedIndex: PropTypes.number,

  /**
   * Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to 'automatic'
   */
  selectionMode: PropTypes.oneOf(['automatic', 'manual']),

  /**
   * Specify the size of the Content Switcher. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};



File: ContentSwitcher/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentSwitcher } from './ContentSwitcher';

export default ContentSwitcher;
export * from './ContentSwitcher';



File: ContentSwitcher/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  wide
  variants={[
    {
      label: 'Default',
      variant: 'components-contentswitcher--default'
    }
  ]}
/>



File: ContentSwitcher/ContentSwitcher.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import { ContentSwitcher } from '../ContentSwitcher';
import Switch from '../Switch';
import * as ContentSwitcherStories from './ContentSwitcher.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Content Switcher

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ContentSwitcher)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/content-switcher/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/content-switcher/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Icon Only](#icon-only)
- [Icon Only With Layer](#icon-only-with-layer)
- [With Layer](#with-layer)
- [Component API](#component-api)
  - [ContentSwitcher `className`](#contentswitcher-classname)
  - [ContentSwitcher `light`](#contentswitcher-light)
  - [ContentSwitcher `onChange`](#contentswitcher-onchange)
  - [ContentSwitcher `selectedIndex`](#contentswitcher-selectedindex)
  - [ContentSwitcher `selectionMode`](#contentswitcher-selectionmode)
  - [Switch `className`](#switch-classname)
  - [Switch `disabled`](#switch-disabled)
  - [Switch `index`, `name` and `text`](#switch-index-name-and-text)
- [References](#references)
  - [Accessibility concerns](#accessibility-concerns)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Content switchers allow users to toggle between two or more content sections
within the same space on screen. Only one content section is shown at a time.
Create Switch components for each section in the content switcher.

<Canvas
  of={ContentSwitcherStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContentSwitcherStories.Default),
    },
  ]}
/>

## Icon Only

<Canvas
  of={ContentSwitcherStories.IconOnly}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ContentSwitcherStories.IconOnly),
    },
  ]}
/>

## Icon Only With Layer

<Canvas of={ContentSwitcherStories.IconOnlyWithLayer} />

## With Layer

<Canvas of={ContentSwitcherStories._WithLayer} />

## Component API

<ArgTypes />

### ContentSwitcher `className`

The className prop passed into `ContentSwitcher` will be forwarded along to the
underlying wrapper `div.cds--content-switcher` element. This is useful for
specifying a custom class name for layout.

```jsx
<ContentSwitcher className="some-class">...</ContentSwitcher>
```

### ContentSwitcher `light`

In certain circumstances, a `ContentSwitcher` will exist on a container element
with the same background color. To improve contrast, you can use the `light`
property to toggle the light variant of the `ContentSwitcher`.

```jsx
<ContentSwitcher light>...</ContentSwitcher>
```

### ContentSwitcher `onChange`

This is a required prop. You will need to specify a function to run when the
selection of the `ContentSwitcher` is changed.

```jsx
<ContentSwitcher
  onChange={() => {
    /* Code to run on change */
  }}>
  ...
</ContentSwitcher>
```

### ContentSwitcher `selectedIndex`

This prop allows you to specify which `ContentSwitcher` index you would like to
be selected on initial render. This number defaults to `0`.

<ContentSwitcher selectedIndex={2} onChange={() => {}}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>

```jsx
<ContentSwitcher selectedIndex={2} onChange={() => {}}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>
```

### ContentSwitcher `selectionMode`

By default, when a `ContentSwitcher` is focused and an arrow key is pressed, the
selection is updated immediately and the `onChange` is fired. However, sometimes
you may want to only change the `selectedIndex` once a selection has been made.
To do this, you can set the `selectionMode` to `manual`, and the `onChange` will
only fire when a selection is made.

<ContentSwitcher
  selectionMode="manual"
  onChange={() => {
    console.log('change');
  }}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>

```jsx
<ContentSwitcher
  selectionMode="manual"
  onChange={() => {
    console.log('change');
  }}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>
```

### Switch `className`

The className prop passed into `Switch` will be forwarded along to the
underlying wrapper `button` element.

```jsx
<ContentSwitcher>
  <Switch className="switch-one" />
  <Switch className="switch-two " />
</ContentSwitcher>
```

### Switch `disabled`

You can disable the `ContentSwitcher` by passing in `disabled` to the `Switch`
elements directly.

<ContentSwitcher>
  <Switch disabled name="one" text="First section" />
  <Switch disabled name="two" text="Second section" />
  <Switch disabled name="three" text="Third section" />
</ContentSwitcher>

```jsx
<ContentSwitcher>
  <Switch disabled name="one" text="First section" />
  <Switch disabled name="two" text="Second section" />
  <Switch disabled name="three" text="Third section" />
</ContentSwitcher>
```

### Switch `index`, `name` and `text`

These are the values that will be returned in the `onChange` call.

<ContentSwitcher
  onChange={(obj) => {
    const { index, name, text } = obj;
    alert(`index: ${index} ||  name: ${name} || text: ${text}`);
  }}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>

```jsx
<ContentSwitcher
  onChange={(obj) => {
    let { index, name, text } = obj;
    alert(`index: ${index} ||  name: ${name} || text: ${text}`);
  }}>
  <Switch name="one" text="First section" />
  <Switch name="two" text="Second section" />
  <Switch name="three" text="Third section" />
</ContentSwitcher>
```

## References

### Accessibility concerns

Each content switcher tab must have a unique title that clearly describes the
content panel. This is particularly helpful for users of assistive technologies
so they have the necessary information to efficiently navigate the content.

Content authors need to ensure the content that is added to the tab panel is
accessible. For example, if you add an image to the panel you need to include
alternative text to pass accessibility testing.

[W3C WAI-ARIA Tab Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)
covers the usage of ARIA names, state and roles, as well as the expected
keyboard interactions.

[Carbon Usage Guidelines](https://www.carbondesignsystem.com/components/content-switcher/usage/)

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ContentSwitcher/ContentSwitcher.mdx).



File: ContentSwitcher/ContentSwitcher.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { ContentSwitcher } from './ContentSwitcher';
import { Switch, IconSwitch } from '../Switch';
import mdx from './ContentSwitcher.mdx';
import {
  TableOfContents,
  Workspace,
  ViewMode_2,
  Icon,
} from '@carbon/icons-react';

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  subcomponents: {
    IconSwitch,
    Switch,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  onChange: {
    action: 'onChange',
  },
  size: {
    options: ['sm', 'md', 'lg'],
  },
  disabled: {
    table: {
      type: { summary: 'bool' },
      defaultValue: { summary: false },
    },
    description: 'Specify disabled attribute to true to disable a button.',
    control: 'boolean',
  },
};

export const Default = (args) => (
  <ContentSwitcher {...args}>
    <Switch name="one" text="First section" disabled={args.disabled} />
    <Switch name="two" text="Second section" disabled={args.disabled} />
    <Switch name="three" text="Third section" disabled={args.disabled} />
  </ContentSwitcher>
);

Default.argTypes = {
  ...sharedArgTypes,
};

export const _WithLayer = (args) => (
  <WithLayer>
    <ContentSwitcher onChange={() => {}} {...args}>
      <Switch name="one" text="First section" disabled={args.disabled} />
      <Switch name="two" text="Second section" disabled={args.disabled} />
      <Switch name="three" text="Third section" disabled={args.disabled} />
    </ContentSwitcher>
  </WithLayer>
);

_WithLayer.argTypes = {
  ...sharedArgTypes,
};

export const IconOnly = (args) => (
  <ContentSwitcher onChange={() => {}} {...args}>
    <IconSwitch name="one" text="Table of Contents" disabled={args.disabled}>
      <TableOfContents />
    </IconSwitch>
    <IconSwitch name="two" text="Workspace Test" disabled={args.disabled}>
      <Workspace />
    </IconSwitch>
    <IconSwitch name="three" text="View Mode" disabled={args.disabled}>
      <ViewMode_2 />
    </IconSwitch>
  </ContentSwitcher>
);

IconOnly.argTypes = {
  ...sharedArgTypes,
};

export const IconOnlyWithLayer = (args) => (
  <WithLayer>
    <ContentSwitcher onChange={() => {}} {...args}>
      <IconSwitch name="one" text="Table of Contents" disabled={args.disabled}>
        <TableOfContents />
      </IconSwitch>
      <IconSwitch name="two" text="Workspace Test" disabled={args.disabled}>
        <Workspace />
      </IconSwitch>
      <IconSwitch name="three" text="View Mode" disabled={args.disabled}>
        <ViewMode_2 />
      </IconSwitch>
    </ContentSwitcher>
  </WithLayer>
);

export const lowContrast = (args) => (
  <ContentSwitcher lowContrast {...args}>
    <Switch name="one" text="First section" disabled={args.disabled} />
    <Switch name="two" text="Second section" disabled={args.disabled} />
    <Switch name="three" text="Third section" disabled={args.disabled} />
  </ContentSwitcher>
);
lowContrast.argTypes = {
  ...sharedArgTypes,
};

export const lowContrastIconOnly = (args) => (
  <ContentSwitcher lowContrast onChange={() => {}} {...args}>
    <IconSwitch name="one" text="Table of Contents" disabled={args.disabled}>
      <TableOfContents />
    </IconSwitch>
    <IconSwitch name="two" text="Workspace Test" disabled={args.disabled}>
      <Workspace />
    </IconSwitch>
    <IconSwitch name="three" text="View Mode" disabled={args.disabled}>
      <ViewMode_2 />
    </IconSwitch>
  </ContentSwitcher>
);
lowContrastIconOnly.argTypes = {
  ...sharedArgTypes,
};
IconOnlyWithLayer.argTypes = {
  ...sharedArgTypes,
};



