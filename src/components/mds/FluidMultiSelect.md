File: FluidMultiSelect/FluidMultiSelect.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ForwardedRef, RefObject, type ComponentProps } from 'react';
import classnames from 'classnames';
import {
  FilterableMultiSelect,
  MultiSelect,
  type MultiSelectProps,
} from '../MultiSelect';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';
import { UseSelectProps } from 'downshift';

interface OnChangeData<ItemType> {
  selectedItems: ItemType[] | null;
}

export interface FluidMultiSelectProps<ItemType>
  extends MultiSelectProps<ItemType>,
    Pick<ComponentProps<typeof MultiSelect>, 'translateWithId'> {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription?: string;
  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText?: string;
  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: Partial<UseSelectProps<ItemType>>;
  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;
  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems?: ItemType[];
  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;
  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  isCondensed?: boolean;
  /**
   * Specify if the `FluidMultiSelect` should render the `filterable` variant of `FluidMultiSelect`
   * @deprecated This prop is deprecated in favor of new component called FluidFilterableMultiSelect and will be removed in the next major release
   */
  isFilterable?: boolean;
  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.JSXElementConstructor<ItemType>;
  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  itemToString?(item: ItemType): string;
  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];
  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: NonNullable<React.ReactNode>;
  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale?: string;
  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;
  /**
   * **Filterable variant only** - `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;
  /**
   * Whether or not the Multiselect is readonly
   */
  readOnly?: boolean;
  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];
  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'top' | 'fixed' | 'top-after-reopen';

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText?: React.ReactNode;
  /**
   * Specify title to show title on hover
   */
  useTitleInItem?: boolean;
  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

const FluidMultiSelect = React.forwardRef(function FluidMultiSelect<ItemType>(
  {
    className,
    isCondensed,
    isFilterable,
    ...other
  }: FluidMultiSelectProps<ItemType>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const prefix = usePrefix();
  const classNames = classnames(
    `${prefix}--list-box__wrapper--fluid`,
    className,
    { [`${prefix}--list-box__wrapper--fluid--condensed`]: isCondensed }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      {isFilterable ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
        // @ts-ignore
        <FilterableMultiSelect
          ref={ref as RefObject<HTMLDivElement | null>}
          className={classNames}
          {...other}
        />
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
        // @ts-ignore
        <MultiSelect ref={ref} className={classNames} {...other} />
      )}
    </FormContext.Provider>
  );
});

FluidMultiSelect.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control. Consider declaring function
   * with `useCallback` to prevent unnecessary re-renders.
   */
  compareItems: PropTypes.func,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps: PropTypes.object,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  isCondensed: PropTypes.bool,

  /**
   * Specify if the `FluidMultiSelect` should render the `filterable` variant of `FluidMultiSelect`
   */
  isFilterable: PropTypes.bool,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * **Filterable variant only** - `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Whether or not the Multiselect is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selected items
   */
  selectedItems: PropTypes.array,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidMultiSelect;



File: FluidMultiSelect/FluidMultiSelect.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import {
  FluidMultiSelect,
  FluidMultiSelectSkeleton,
} from '../FluidMultiSelect';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Information, View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidMultiSelect.mdx';

export default {
  title: 'Components/Fluid Components/FluidMultiSelect',
  component: FluidMultiSelect,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidMultiSelectSkeleton,
  },
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidMultiSelect
      onChange={() => {}}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

const sharedArgTypes = {
  className: {
    control: {
      type: 'text',
    },
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  isFilterable: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  titleText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};

Default.args = {
  defaultWidth: 400,
  className: 'test-class',
  isCondensed: false,
  isFilterable: false,
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Choose an option',
  titleText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
};

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Filterable = () => (
  <div style={{ width: '400px' }}>
    <FluidMultiSelect
      isFilterable
      onChange={() => {}}
      initialSelectedItem={items[2]}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const _FilterableWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <FluidMultiSelect
          isFilterable
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
      </div>
    )}
  </WithLayer>
);

export const Condensed = () => (
  <div style={{ width: '400px' }}>
    <FluidMultiSelect
      onChange={() => {}}
      id="default"
      isCondensed
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = (args) => (
  <div style={{ width: '400px' }}>
    <FluidMultiSelect
      onChange={() => {}}
      initialSelectedItem={items[2]}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      decorator={aiLabel}
      {...args}
    />
  </div>
);

withAILabel.argTypes = {
  ...sharedArgTypes,
};

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidMultiSelectSkeleton />
  </div>
);



File: FluidMultiSelect/index.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidMultiSelect from './FluidMultiSelect';
import type { FluidMultiSelectProps } from './FluidMultiSelect';
import type { FluidMultiSelectSkeletonProps } from './FluidMultiSelect.Skeleton';
export type { FluidMultiSelectProps, FluidMultiSelectSkeletonProps };
export default FluidMultiSelect;
export { FluidMultiSelect };
export { default as FluidMultiSelectSkeleton } from './FluidMultiSelect.Skeleton';



File: FluidMultiSelect/FluidMultiSelect.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidMultiSelectStories from './FluidMultiSelect.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid Multiselect

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidMultiselect)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/Multiselect/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/Multiselect/accessibility)


{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Filterable](#filterable)
  - [Filterable With Layer](#filterable-with-layer)
  - [Skeleton](#skeleton)
  - [With AI Label](#wth-ai-label)
  - [Condensed](#condensed)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidMultiSelectStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTFluidMultiSelectStoriesextAreaStories.Default),
    },
  ]}
/>

## Filterable

<Canvas
  of={FluidMultiSelectStories.Filterable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidMultiSelectStories.Filterable),
    },
  ]}
/>

## Filterable With Layer

<Canvas
  of={FluidMultiSelectStories._FilterableWithLayer}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidMultiSelectStories._FilterableWithLayer),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidMultiSelectStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidMultiSelectStories.Skeleton),
    },
  ]}
/>

### With AI Label

<Canvas
  of={FluidMultiSelectStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidMultiSelectStories.withAILabel),
    },
  ]}
/>

### Condensed

<Canvas
  of={FluidMultiSelectStories.Condensed}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidMultiSelectStories.Condensed),
    },
  ]}
/>

## Accessibility Considerations

### Accessible Name

To comply with accessibility requirements, make sure to supply the component
with an accessible name by providing either the `aria-label`, `aria-labelledby`
or `title` attribute. Read more on the accessible naming rule
[here](https://able.ibm.com/rules/archives/latest/doc/en-US/aria_accessiblename_exists.html).

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidMultiselect/FluidMultiselect.mdx).



File: FluidMultiSelect/FluidMultiSelect.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface FluidMultiSelectSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const FluidMultiSelectSkeleton: React.FC<FluidMultiSelectSkeletonProps> = ({
  className,
  ...rest
}) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(className, `${prefix}--list-box__wrapper--fluid`);

  return (
    <div className={wrapperClasses} {...rest}>
      <div className={`${prefix}--skeleton ${prefix}--list-box`}>
        <span className={`${prefix}--list-box__label`} />
        <div className={`${prefix}--list-box__field`} />
      </div>
    </div>
  );
};

FluidMultiSelectSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FluidMultiSelectSkeleton;



File: FluidMultiSelect/FluidFilterableMultiSelect.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  ForwardedRef,
  FunctionComponent,
  type ComponentProps,
} from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';
import type { UseComboboxProps, UseMultipleSelectionProps } from 'downshift';
import {
  FilterableMultiSelect,
  type FilterableMultiSelectProps,
  type MultiSelect,
} from '../MultiSelect';

interface OnChangeData<ItemType> {
  selectedItems: ItemType[] | null;
}

export interface FluidFilterableMultiSelectProps<ItemType>
  extends FilterableMultiSelectProps<ItemType>,
    Pick<ComponentProps<typeof MultiSelect>, 'translateWithId'> {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription?: string;
  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText?: string;
  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: Partial<UseMultipleSelectionProps<ItemType>>;
  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;
  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems?: ItemType[];
  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;
  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  isCondensed?: boolean;
  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: FunctionComponent<ItemType>;
  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  itemToString?(item: ItemType): string;
  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];
  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: NonNullable<React.ReactNode>;
  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale?: string;
  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;
  /**
   * **Filterable variant only** - `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange?: UseComboboxProps<ItemType>['onInputValueChange'];
  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;
  /**
   * Whether or not the Multiselect is readonly
   */
  readOnly?: boolean;
  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];
  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'top' | 'fixed' | 'top-after-reopen';

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText?: React.ReactNode;

  /**
   * Specify title to show title on hover
   */
  useTitleInItem?: boolean;
  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

const FluidMultiSelect = React.forwardRef(function FluidMultiSelect<ItemType>(
  {
    className,
    isCondensed,
    ...other
  }: FluidFilterableMultiSelectProps<ItemType>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const classNames = classnames(
    `${prefix}--list-box__wrapper--fluid`,
    className,
    { [`${prefix}--list-box__wrapper--fluid--condensed`]: isCondensed }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <FilterableMultiSelect ref={ref} className={classNames} {...other} />
    </FormContext.Provider>
  );
});

FluidMultiSelect.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control. Consider declaring function
   * with `useCallback` to prevent unnecessary re-renders.
   */
  compareItems: PropTypes.func,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps: PropTypes.object,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the `FluidMultiSelect` should render its menu items in condensed mode
   */
  isCondensed: PropTypes.bool,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * **Filterable variant only** - `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Whether or not the Multiselect is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selected items
   */
  selectedItems: PropTypes.array,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidMultiSelect;



