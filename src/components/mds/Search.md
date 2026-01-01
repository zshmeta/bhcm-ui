File: Search/Search.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';
import mdx from './Search.mdx';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  subcomponents: {
    ExpandableSearch,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id'],
    },
  },
};

export const Disabled = () => {
  return (
    <Search
      disabled
      size="lg"
      placeholder="Find your items"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="search-1"
      onChange={() => {}}
      onKeyDown={() => {}}
    />
  );
};

export const Expandable = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <ExpandableSearch
        size="lg"
        labelText="Search"
        closeButtonLabelText="Clear search input"
        id="search-expandable-1"
        onChange={() => {}}
        onKeyDown={() => {}}
      />
    </div>
  );
};

export const _WithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <Search
          size="lg"
          placeholder="Find your items"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id={`search-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  );
};

export const ExpandableWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <ExpandableSearch
          size="lg"
          placeholder="Search"
          labelText="First Layer"
          closeButtonLabelText="Clear search input"
          id={`search-expandable-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  );
};

export const Default = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <Search id="search-default-1" {...args} />
    </div>
  );
};

Default.args = {
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Label text',
  placeholder: 'Placeholder text',
  size: 'md',
  type: 'search',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  renderIcon: {
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};



File: Search/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-search--default'
    },
    {
      label: 'Disabled',
      variant: 'components-search--disabled'
    },
    {
      label: 'Expandable',
      variant: 'components-search--expandable'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidsearch--default'
    }
  ]}
/>



File: Search/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Search from './Search';

export * from './Search';
export default Search;
export { Search };

export { default as SearchSkeleton } from './Search.Skeleton';



File: Search/Search.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search as SearchIcon, Close } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type FunctionComponent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { keys, match } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { deprecate } from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';
import { noopFn } from '../../internal/noopFn';
import { Tooltip } from '../Tooltip';

type InputPropsBase = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;
export interface SearchProps extends InputPropsBase {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether or not ExpandableSearch should render expanded or not
   */
  isExpanded?: boolean;

  /**
   * Specify a custom `id` for the input
   */
  id?: string;

  /**
   * Provide the label text for the Search icon
   */
  labelText: ReactNode;

  /**
   * Optional callback called when the search value changes.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?(): void;

  /**
   * Optional callback called when the magnifier icon is clicked in ExpandableSearch.
   */
  onExpand?(
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;

  /**
   * @deprecated Specify the role for the underlying `<input>`.
   * No longer needed since `<input type="search">` already provides the correct semantics.
   * This prop will be removed in the next major release of Carbon.
   */
  role?: string;

  /**
   * Specify the size of the Search
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      autoComplete = 'off',
      className,
      closeButtonLabelText = 'Clear search input',
      defaultValue,
      disabled,
      isExpanded = true,
      id,
      labelText,
      // @ts-expect-error: deprecated prop
      light,
      onChange = () => {},
      onClear = () => {},
      onKeyDown,
      onExpand,
      placeholder = 'Search',
      renderIcon,
      role,
      size = 'md',
      type = 'search',
      value,
      ...rest
    },
    forwardRef
  ) => {
    const hasPropValue = value || defaultValue ? true : false;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([forwardRef, inputRef]);
    const expandButtonRef = useRef<HTMLDivElement>(null);
    const inputId = useId('search-input');
    const uniqueId = id || inputId;
    const searchId = `${uniqueId}-search`;
    const [hasContent, setHasContent] = useState(hasPropValue || false);
    const [prevValue, setPrevValue] = useState(value);
    const searchClasses = cx(
      {
        [`${prefix}--search`]: true,
        [`${prefix}--search--sm`]: size === 'sm',
        [`${prefix}--search--md`]: size === 'md',
        [`${prefix}--search--lg`]: size === 'lg',
        [`${prefix}--search--light`]: light,
        [`${prefix}--search--disabled`]: disabled,
        [`${prefix}--search--fluid`]: isFluid,
      },
      className
    );

    const clearClasses = cx({
      [`${prefix}--search-close`]: true,
      [`${prefix}--search-close--hidden`]: !hasContent || !isExpanded,
    });

    if (value !== prevValue) {
      setHasContent(!!value);
      setPrevValue(value);
    }

    function clearInput() {
      if (!value && inputRef.current) {
        inputRef.current.value = '';
      }

      if (inputRef.current) {
        const inputTarget = Object.assign({}, inputRef.current, { value: '' });
        const syntheticEvent: ChangeEvent<HTMLInputElement> = {
          bubbles: false,
          cancelable: false,
          currentTarget: inputRef.current,
          defaultPrevented: false,
          eventPhase: 0,
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          isTrusted: false,
          nativeEvent: new Event('change'),
          persist: noopFn,
          preventDefault: noopFn,
          stopPropagation: noopFn,
          target: inputTarget,
          timeStamp: 0,
          type: 'change',
        };

        onChange(syntheticEvent);
      }

      onClear();
      setHasContent(false);
      inputRef.current?.focus();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      setHasContent(event.target.value !== '');
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      if (match(event, keys.Escape)) {
        event.stopPropagation();
        if (inputRef.current?.value) {
          clearInput();
        }
        // ExpandableSearch closes on escape when isExpanded, focus search activation button
        else if (onExpand && isExpanded) {
          expandButtonRef.current?.focus();
        }
      }
    }

    function handleExpandButtonKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (match(event, keys.Enter) || match(event, keys.Space)) {
        event.stopPropagation();
        if (onExpand) {
          onExpand(event);
        }
      }
    }

    const magnifierButton = (
      <div
        aria-labelledby={onExpand ? searchId : undefined}
        role={onExpand ? 'button' : undefined}
        className={`${prefix}--search-magnifier`}
        onClick={onExpand}
        onKeyDown={handleExpandButtonKeyDown}
        tabIndex={onExpand && !isExpanded ? 0 : -1}
        ref={expandButtonRef}
        aria-expanded={
          onExpand && isExpanded
            ? true
            : onExpand && !isExpanded
              ? false
              : undefined
        }
        aria-controls={onExpand ? uniqueId : undefined}>
        <CustomSearchIcon icon={renderIcon} />
      </div>
    );

    // Wrap magnifierButton in a tooltip if it's expandable
    const magnifierWithTooltip =
      onExpand && !isExpanded ? (
        <Tooltip
          className={`${prefix}--search-tooltip ${prefix}--search-magnifier-tooltip`}
          align="top"
          label="Search">
          {magnifierButton}
        </Tooltip>
      ) : (
        magnifierButton
      );

    return (
      <div role="search" aria-label={placeholder} className={searchClasses}>
        {magnifierWithTooltip}
        {/* the magnifier is used in ExpandableSearch as a click target to expand,
      however, it does not need a keyboard event bc the input element gets focus on keyboard nav and expands that way*/}

        <label id={searchId} htmlFor={uniqueId} className={`${prefix}--label`}>
          {labelText}
        </label>
        <input
          autoComplete={autoComplete}
          className={`${prefix}--search-input`}
          defaultValue={defaultValue}
          disabled={disabled}
          role={role}
          ref={ref}
          id={uniqueId}
          onChange={composeEventHandlers([onChange, handleChange])}
          onKeyDown={composeEventHandlers([onKeyDown, handleKeyDown])}
          placeholder={placeholder}
          type={type}
          value={value}
          tabIndex={onExpand && !isExpanded ? -1 : undefined}
          {...rest}
        />
        <button
          aria-label={closeButtonLabelText}
          className={clearClasses}
          disabled={disabled}
          onClick={clearInput}
          title={closeButtonLabelText}
          type="button">
          <Close />
        </button>
      </div>
    );
  }
);

Search.displayName = 'Search';
Search.propTypes = {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete: PropTypes.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Specify whether or not ExpandableSearch should render expanded or not
   */
  isExpanded: PropTypes.bool,

  /**
   * Provide the label text for the Search icon
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify light version or default version of this control
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Search` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * Optional callback called when the search value changes.
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Optional callback called when the magnifier icon is clicked in ExpandableSearch.
   */
  onExpand: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Deprecated, since <input type="search"> already provides correct semantics.
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role: deprecate(
    PropTypes.string,
    'The `role` prop has been deprecated since <input type="search"> already provides correct semantics. ' +
      'It will be removed in the next major release of Carbon.'
  ),

  /**
   * Specify the size of the Search
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function CustomSearchIcon({ icon: Icon }) {
  const prefix = usePrefix();

  if (Icon) {
    return <Icon className={`${prefix}--search-magnifier-icon`} />;
  }

  return <SearchIcon className={`${prefix}--search-magnifier-icon`} />;
}

CustomSearchIcon.propTypes = {
  /**
   * Rendered icon for the Search. Can be a React component class
   */
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Search;



File: Search/Search.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as SearchStories from './Search.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Search

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Search)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/search/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/search/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Disabled](#disabled)
- [Expandable](#expandable)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={SearchStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SearchStories.Default),
    },
  ]}
/>

## Disabled

<Canvas
  of={SearchStories.Disabled}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SearchStories.Disabled),
    },
  ]}
/>

## Expandable

<Canvas
  of={SearchStories.Expandable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SearchStories.Expandable),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Search/Search.mdx).



File: Search/Search.Skeleton.tsx


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

export interface SearchSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify whether the Search should be a small variant.
   */
  small?: boolean;
}

const SearchSkeleton = ({
  small = false,
  className,
  ...rest
}: SearchSkeletonProps) => {
  const prefix = usePrefix();
  const searchClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--search--xl`]: !small,
    [`${prefix}--search--sm`]: small,
  });

  return (
    <div className={searchClasses} {...rest}>
      <span className={`${prefix}--label`} />
      <div className={`${prefix}--search-input`} />
    </div>
  );
};

SearchSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify whether the Search should be a small variant
   */
  small: PropTypes.bool,
};

export default SearchSkeleton;
export { SearchSkeleton };



File: Search/Search-test.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('Search', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the input element', () => {
      render(<Search labelText="test-search" data-testid="test-id" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect autoComplete prop', () => {
      render(<Search labelText="test-search" autoComplete="test" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'autoComplete',
        'test'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Search labelText="test-search" className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect closeButtonLabelText prop', () => {
      render(<Search labelText="test-search" closeButtonLabelText="clear" />);

      expect(screen.getByLabelText('clear')).toBeInTheDocument();
    });

    it('should respect defaultValue prop', () => {
      render(<Search labelText="test-search" defaultValue="test-value" />);

      expect(screen.getByRole('searchbox')).toHaveValue('test-value');
    });

    it('should respect disabled prop', () => {
      render(<Search labelText="test-search" disabled />);

      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(<Search labelText="test-search" id="test-id" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'test-id');
    });

    it('should respect labelText prop', () => {
      render(<Search labelText="test-search" />);

      expect(screen.getByRole('searchbox').labels[0]).toHaveTextContent(
        'test-search'
      );
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(<Search labelText="test-search" onChange={onChange} />);

      await userEvent.type(screen.getByRole('searchbox'), 'test');

      expect(onChange).toHaveBeenCalled();
    });

    it('should respect onClear prop', async () => {
      const onClear = jest.fn();
      render(
        <Search
          labelText="test-search"
          closeButtonLabelText="clear"
          onClear={onClear}
        />
      );

      await userEvent.click(screen.getByLabelText('clear'));

      expect(onClear).toHaveBeenCalled();
    });

    it('should respect onExpand prop', async () => {
      const onExpand = jest.fn();
      render(<Search labelText="test-search" onExpand={onExpand} />);

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(onExpand).toHaveBeenCalled();

      await screen.getAllByRole('button')[0].focus();

      await userEvent.keyboard('[Space]');

      expect(onExpand).toHaveBeenCalledTimes(2);

      await screen.getAllByRole('button')[0].focus();

      await userEvent.keyboard('[Enter]');

      expect(onExpand).toHaveBeenCalledTimes(3);
    });

    it('should call onKeyDown when expected', async () => {
      const onKeyDown = jest.fn();
      render(<Search labelText="test-search" onKeyDown={onKeyDown} />);

      await userEvent.type(screen.getByRole('searchbox'), 'test');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call focus expand button on Escape when expanded', async () => {
      render(
        <Search labelText="test-search" onExpand={() => {}} isExpanded={true} />
      );

      await screen.getByRole('searchbox').focus();

      await userEvent.keyboard('[Escape]');

      expect(screen.getAllByRole('button')[0]).toHaveFocus();
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      render(
        <Search
          labelText="test-search"
          onExpand={() => {}}
          isExpanded={false}
        />
      );

      expect(screen.getAllByRole('button')[0]).toHaveAttribute('tabIndex', '0');
      expect(screen.getByRole('searchbox')).toHaveAttribute('tabIndex', '-1');
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      render(<Search labelText="test-search" />);

      // will have 1 button which is the close button
      expect(screen.getAllByRole('button').length).toBe(1);
      // search icon not tabbable if not expandable
      expect(screen.getByRole('searchbox')).not.toHaveAttribute(
        'tabIndex',
        '-1'
      );
    });

    it('should respect placeholder prop', () => {
      render(<Search labelText="test-search" placeholder="test-placeholder" />);

      expect(
        screen.getByPlaceholderText('test-placeholder')
      ).toBeInTheDocument();
    });

    it('should respect renderIcon prop', () => {
      const CustomIcon = jest.fn(() => <svg data-testid="test-icon" />);
      render(<Search labelText="test-search" renderIcon={CustomIcon} />);

      expect(screen.getByRole('search')).toContainElement(
        screen.getByTestId('test-icon')
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should respect role prop', () => {
      render(<Search labelText="test-search" role="combobox" />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<Search labelText="test-search" size="sm" />);

      expect(screen.getByRole('search')).toHaveClass(`${prefix}--search--sm`);
    });

    it('should respect type prop', () => {
      render(<Search labelText="test-search" type="search" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });

    it('should respect value prop', () => {
      render(<Search labelText="test-search" value="test-value" />);

      expect(screen.getByRole('searchbox')).toHaveValue('test-value');
    });
  });
});



