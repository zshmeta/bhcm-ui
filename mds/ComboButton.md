File: ComboButton/ComboButton-test.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem, MenuItemSelectable, MenuItemRadioGroup } from '../Menu';

import { ComboButton } from './';

const prefix = 'cds';

describe('ComboButton', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <ComboButton label="Primary action" ref={ref}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(
        <ComboButton label="Primary action" className="test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(
        <ComboButton label="Primary action" data-testid="test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('renders props.label on the trigger button', () => {
      render(
        <ComboButton label="Test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(screen.getAllByRole('button')[0]).toHaveTextContent(/^Test$/);
    });

    it('supports props.disabled', () => {
      render(
        <ComboButton label="Primary action" disabled>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      // primary action button
      expect(screen.getAllByRole('button')[0]).toBeDisabled();

      // trigger button
      expect(screen.getAllByRole('button')[1]).toBeDisabled();
    });

    describe('supports props.size', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'];

      sizes.forEach((size) => {
        it(`size="${size}"`, () => {
          const { container } = render(
            <ComboButton label="Primary action" size={size}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          expect(container.firstChild).toHaveClass(
            `${prefix}--combo-button__container--${size}`
          );
        });
      });
    });

    describe('supports props.tooltipAlignment', () => {
      const alignments = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ];

      alignments.forEach((alignment) => {
        it(`tooltipAlignment="${alignment}"`, () => {
          const { container } = render(
            <ComboButton label="Primary action" tooltipAlignment={alignment}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          expect(container.firstChild.lastChild).toHaveClass(
            `${prefix}--popover--${alignment}`
          );
        });
      });
    });

    describe('supports props.menuAlignment', () => {
      const alignments = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ];

      alignments.forEach((alignment) => {
        it(`menuAlignment="${alignment}"`, async () => {
          render(
            <ComboButton label="Primary action" menuAlignment={alignment}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          await userEvent.click(screen.getAllByRole('button')[1]);
          expect(document.querySelector('ul.cds--menu')).toHaveClass(
            `${prefix}--combo-button__${alignment}`
          );
        });
      });
    });

    it('supports props.translateWithId', () => {
      const t = () => 'test';

      render(
        <ComboButton label="Primary action" translateWithId={t}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      const triggerButton = screen.getAllByRole('button')[1];
      const tooltipId = triggerButton.getAttribute('aria-labelledby');
      const tooltip = document.getElementById(tooltipId);

      expect(tooltip).toHaveTextContent(t());
    });
  });

  describe('behaves as expected', () => {
    it('emits props.onClick on primary action click', async () => {
      const onClick = jest.fn();
      render(
        <ComboButton label="Test" onClick={onClick}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      await userEvent.click(screen.getAllByRole('button')[0]);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('opens a menu on click on the trigger button', async () => {
      render(
        <ComboButton label="Primary action">
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      await userEvent.click(screen.getAllByRole('button')[1]);

      expect(document.querySelector('ul.cds--menu')).toBeInTheDocument();
      expect(
        document.querySelector('.cds--menu-item__label')
      ).toHaveTextContent(/^Additional action$/);
    });

    it('supports ellipsis in ComboButton by checking the className', async () => {
      render(
        <ComboButton label="Primary action super long text to enable ellipsis">
          <MenuItem label="Submenu">
            <MenuItem label="Action" />
          </MenuItem>
        </ComboButton>
      );

      expect(
        screen.getByTitle('Primary action super long text to enable ellipsis')
          .parentElement
      ).toHaveClass(`${prefix}--combo-button__primary-action`);
    });
  });
});



File: ComboButton/ComboButton.DynamicStyles.featureflag.mdx


import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ComboButtonFeatureflagStories from './ComboButton.featureflag.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta title="Components/ComboButton/Feature Flag" name="Flag details" />

# Dynamically set floating styles

Components with `autoAlign` use the
[`floating-ui`](https://github.com/floating-ui/floating-ui) library to handle
the dynamic positioning of floating elements relative to their trigger / anchor
element. This also includes collision detection that repositions the floating
element as necessary to keep it visible within the viewport. In the majority of
cases, the styling from the `floating-ui` 'fixed' positioning strategy prevents
the floating element from being
[clipped](https://floating-ui.com/docs/misc#clipping) by an ancestor element.

The `enable-v12-dynamic-floating-styles` flag enables this dynamic styling
without the collision detection.

**Note**: The flag has no effect when used with `autoAlign` because `autoAlign`
includes both the dynamic positioning styles and collision detection.

To use `autoAlign` your project needs to be using React v17+, see
https://github.com/carbon-design-system/carbon/issues/18714.

## Enable dynamic setting of floating styles

```js
<FeatureFlags
  flags={{
    'enable-v12-dynamic-floating-styles': true,
  }}>
  <ComboButton menuAlignment={args.menuAlignment} label="Primary action">
    <MenuItem label="Second action with a long label description" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" disabled />
  </ComboButton>
</FeatureFlags>
```

<Canvas
  of={ComboButtonFeatureflagStories.FloatingStyles}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(ComboButtonFeatureflagStories.FloatingStyles),
    },
  ]}
/>



File: ComboButton/ComboButton.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { MenuItem, MenuItemDivider } from '../Menu';
import { CopyFile, Export } from '@carbon/icons-react';

import { ComboButton } from './';
import mdx from './ComboButton.mdx';

export default {
  title: 'Components/ComboButton',
  component: ComboButton,
  subcomponents: {
    MenuItem,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['translateWithId'],
    },
  },
};

export const Default = (args) => {
  return (
    <ComboButton {...args} onClick={action('onClick')} label="Primary action">
      <MenuItem
        label="Second action with a long label description"
        onClick={action('onClick')}
      />
      <MenuItem label="Third action" onClick={action('onClick')} />
      <MenuItem label="Fourth action" disabled onClick={action('onClick')} />
      <MenuItemDivider />
      <MenuItem
        label="Danger action"
        kind="danger"
        onClick={action('onClick')}
      />
    </ComboButton>
  );
};

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: '5000px', height: '5000px' }}>
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
      }}>
      <ComboButton label="Primary action" {...args}>
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>
    </div>{' '}
  </div>
);

export const WithDanger = (args) => {
  return (
    <ComboButton label="Primary action" {...args}>
      <MenuItem label="Second action with a long label description" />
      <MenuItem label="Third action" />
      <MenuItem label="Fourth action" />
      <MenuItemDivider />
      <MenuItem label="Danger action" kind="danger" />
    </ComboButton>
  );
};

export const WithIcons = (args) => {
  return (
    <ComboButton label="Save record" {...args}>
      <MenuItem label="Save as a copy" renderIcon={CopyFile} />
      <MenuItem label="Export" renderIcon={Export} />
    </ComboButton>
  );
};

export const WithMenuAlignment = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ComboButton label="Bottom" menuAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton label="Bottom start" menuAlignment="bottom-start">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton label="Bottom end" menuAlignment="bottom-end">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <ComboButton label="Top" menuAlignment="top" tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton
          label="Top start"
          menuAlignment="top-start"
          tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton
          label="Top end"
          menuAlignment="top-end"
          tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>
      </div>
    </>
  );
};



File: ComboButton/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-combobutton--default'
    },
  ]}
/>



File: ComboButton/index.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import Button from '../Button';
import { Menu } from '../Menu';
import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import {
  useFloating,
  flip,
  hide,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { mergeRefs } from '../../tools/mergeRefs';
import { MenuAlignment } from '../MenuButton';
import type { TFunc, TranslateWithId } from '../../types/common';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

const translationIds = {
  'carbon.combo-button.additional-actions':
    'carbon.combo-button.additional-actions',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.combo-button.additional-actions']]:
    'Additional actions',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

interface ComboButtonProps extends TranslateWithId<TranslationKey> {
  /**
   * A collection of `MenuItems` to be rendered as additional actions for this `ComboButton`.
   */
  children: React.ComponentProps<typeof Menu>['children'];

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the `ComboButton` should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * Provide the label to be rendered on the primary action button.
   */
  label: React.ComponentProps<typeof Button>['title'];

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: MenuAlignment;

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  onClick?: React.ComponentProps<typeof Button>['onClick'];

  /**
   * Specify the size of the buttons and menu.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?: React.ComponentProps<typeof IconButton>['align'];
}

const ComboButton = React.forwardRef<HTMLDivElement, ComboButtonProps>(
  function ComboButton(
    {
      children,
      className,
      disabled,
      label,
      onClick,
      size = 'lg',
      menuAlignment = 'bottom',
      tooltipAlignment,
      translateWithId: t = defaultTranslateWithId,
      ...rest
    },
    forwardRef
  ) {
    // feature flag utilized to separate out only the dynamic styles from @floating-ui
    // flag is turned on when collision detection (ie. flip, hide) logic is not desired
    const enableOnlyFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const id = useId('combobutton');
    const prefix = usePrefix();
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    let middlewares: any[] = [];

    if (!enableOnlyFloatingStyles) {
      middlewares = [flip({ crossAxis: false }), hide()];
    }

    if (menuAlignment === 'bottom' || menuAlignment === 'top') {
      middlewares.push(
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        })
      );
    }
    const { refs, floatingStyles, placement, middlewareData } = useFloating({
      placement: menuAlignment,

      // The floating element is positioned relative to its nearest
      // containing block (usually the viewport). It will in many cases also
      // “break” the floating element out of a clipping ancestor.
      // https://floating-ui.com/docs/misc#clipping
      strategy: 'fixed',

      // Middleware order matters, arrow should be last
      middleware: middlewares,
      whileElementsMounted: autoUpdate,
    });
    const ref = mergeRefs(forwardRef, containerRef, refs.setReference);
    const {
      open,
      handleClick: hookOnClick,
      handleMousedown: handleTriggerMousedown,
      handleClose,
    } = useAttachedMenu(containerRef);

    useLayoutEffect(() => {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
        }
      });
    }, [floatingStyles, refs.floating, middlewareData, placement, open]);
    function handleTriggerClick() {
      if (containerRef.current) {
        hookOnClick();
      }
    }

    function handlePrimaryActionClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (onClick) {
        onClick(e);
      }
    }

    const containerClasses = classNames(
      `${prefix}--combo-button__container`,
      `${prefix}--combo-button__container--${size}`,
      {
        [`${prefix}--combo-button__container--open`]: open,
      },
      className
    );

    const menuClasses = classNames(`${prefix}--combo-button__${menuAlignment}`);

    const primaryActionClasses = classNames(
      `${prefix}--combo-button__primary-action`
    );
    const triggerClasses = classNames(`${prefix}--combo-button__trigger`);

    return (
      <div
        {...rest}
        className={containerClasses}
        ref={ref}
        aria-owns={open ? id : undefined}>
        <div className={primaryActionClasses}>
          <Button
            title={label}
            size={size}
            disabled={disabled}
            onClick={handlePrimaryActionClick}>
            {label}
          </Button>
        </div>
        <IconButton
          ref={refs.setReference}
          className={triggerClasses}
          label={t('carbon.combo-button.additional-actions')}
          size={size}
          disabled={disabled}
          align={tooltipAlignment}
          aria-haspopup
          aria-expanded={open}
          onClick={handleTriggerClick}
          onMouseDown={handleTriggerMousedown}
          aria-controls={open ? id : undefined}>
          <ChevronDown />
        </IconButton>
        <Menu
          containerRef={containerRef}
          menuAlignment={menuAlignment}
          className={menuClasses}
          ref={refs.setFloating}
          id={id}
          label={t('carbon.combo-button.additional-actions')}
          size={size}
          open={open}
          onClose={handleClose}>
          {children}
        </Menu>
      </div>
    );
  }
);

ComboButton.propTypes = {
  /**
   * A collection of MenuItems to be rendered as additional actions for this ComboButton.
   */
  children: PropTypes.node.isRequired,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the ComboButton should be disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Provide the label to be rendered on the primary action button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Specify the size of the buttons and menu.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export { ComboButton, type ComboButtonProps };



File: ComboButton/ComboButton.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ComboButton } from '../ComboButton';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { MenuItem } from '../Menu';

export default {
  title: 'Components/ComboButton/Feature Flag',
  component: ComboButton,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-v12-dynamic-floating-styles': true,
        }}>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
  return (
    <ComboButton menuAlignment={args.menuAlignment} label="Primary action">
      <MenuItem label="Second action with a long label description" />
      <MenuItem label="Third action" />
      <MenuItem label="Fourth action" disabled />
    </ComboButton>
  );
};

FloatingStyles.args = {
  menuAlignment: 'bottom',
};

FloatingStyles.argTypes = {
  menuAlignment: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};



File: ComboButton/ComboButton.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ComboButtonStories from './ComboButton.stories.js'
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ComboButton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ComboButton)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [With Icons](#with-icons)
- [With Danger](#with-danger)
- [Menu Alignment (experimental)](#menu-alignment-experimental)
- [Experimental Auto Align](#experimental-auto-align)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

A `ComboButton` can be used to offer additional, secondary actions in a
disclosed list next to the primary action. These additional actions must be
`MenuItem`s passed as `children`. The primary action's label is passed as
`props.label`.

```jsx
<ComboButton label="Primary action">
  <MenuItem label="Second action" />
  <MenuItem label="Third action" />
  <MenuItem label="Fourth action" />
</ComboButton>
```

<Canvas
  of={ComboButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboButtonStories.Default),
    },
  ]}
/>

## With Icons

<Canvas
  of={ComboButtonStories.WithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboButtonStories.WithIcons),
    },
  ]}
/>

## With Danger

<Canvas
  of={ComboButtonStories.WithDanger}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboButtonStories.WithDanger),
    },
  ]}
/>

## Menu Alignment (experimental)

The `menuAlignment` prop enables you to define the placement of the Menu in
relation to the `ComboButton`. For instance, setting `menuAlignment="top"` on
the `ComboButton` will render the Menu above the button.

If it seems your specified `menuAlignment` isn't working, it's because we
prioritize ensuring the Menu remains visible. We calculate the optimal position
to display the Menu in case the provided `menuAlignment` obscures it.

We encourage you to play around in the Storybook Default stories to better
understand the `menuAlignment` prop.

<Canvas
  of={ComboButtonStories.WithMenuAlignment}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboButtonStories.WithMenuAlignment),
    },
  ]}
/>

## Experimental Auto Align
<Canvas
  of={ComboButtonStories.ExperimentalAutoAlign}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboButtonStories.ExperimentalAutoAlign),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ComboButton/ComboButton.mdx).



