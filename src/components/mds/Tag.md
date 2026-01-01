File: Tag/DismissibleTag.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { deprecate } from '../../prop-types/deprecate';
import Tag, { SIZES, TYPES } from './Tag';
import { Close } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';
import { mergeRefs } from '../../tools/mergeRefs';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { PopoverAlignment } from '../Popover';

export interface DismissibleTagBaseProps {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `DismissibleTag` component
   */
  decorator?: ReactNode;

  /**
   * Specify if the `DismissibleTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the tooltip alignment for the dismiss button
   */
  dismissTooltipAlignment?: PopoverAlignment;

  /**
   * Provide a custom tooltip label for the dismiss button
   */
  dismissTooltipLabel?: string;

  /**
   * Specify the id for the selectable tag.
   */
  id?: string;

  /**
   * Click handler for filter tag close button.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental:** Provide a `Slug` component to be rendered inside the `DismissibleTag` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;

  /**
   * Provide a custom `title` to be inserted in the tag.
   */
  tagTitle?: string;

  /**
   * Text to show on clear filters
   */
  title?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type DismissibleTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  DismissibleTagBaseProps
>;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const DismissibleTag = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      decorator,
      disabled,
      id,
      renderIcon,
      title = 'Dismiss',
      onClose,
      slug,
      size,
      text,
      tagTitle,
      type,
      dismissTooltipAlignment = 'bottom',
      dismissTooltipLabel = 'Dismiss tag',
      ...other
    }: DismissibleTagProps<T>,
    forwardRef: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const tagLabelRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
    const tagId = id || `tag-${useId()}`;
    const tagClasses = classNames(`${prefix}--tag--filter`, className);
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagLabelRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];
      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagLabelRef]);
    const combinedRef = mergeRefs(tagLabelRef, forwardRef);
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClose) {
        event.stopPropagation();
        onClose(event);
      }
    };

    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'sm', kind: 'inline' })
      : candidate;

    const tooltipClasses = classNames(
      `${prefix}--icon-tooltip`,
      `${prefix}--tag-label-tooltip`
    );

    // Removing onClick from the spread operator
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, ...otherProps } = other;

    const dismissActionLabel = isEllipsisApplied ? dismissTooltipLabel : title;

    return (
      <Tag
        ref={combinedRef}
        type={type}
        size={size}
        renderIcon={renderIcon}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        {...otherProps}>
        <div className={`${prefix}--interactive--tag-children`}>
          <Text
            title={tagTitle ? tagTitle : text}
            className={`${prefix}--tag__label`}>
            {text}
          </Text>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--tag__decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          <Tooltip
            label={dismissActionLabel}
            align={dismissTooltipAlignment}
            className={tooltipClasses}
            leaveDelayMs={0}
            closeOnActivation>
            <button
              type="button"
              className={`${prefix}--tag__close-icon`}
              onClick={handleClose}
              disabled={disabled}
              aria-label={dismissActionLabel}>
              <Close />
            </button>
          </Tooltip>
        </div>
      </Tag>
    );
  }
);
DismissibleTag.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `DismissibleTag` component
   */
  decorator: PropTypes.node,

  /**
   * Specify if the `DismissibleTag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the tooltip alignment for the dismiss button
   */
  dismissTooltipAlignment: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-end',
    'left-start',
    'right-end',
    'right-start',
  ]),

  /**
   * Provide a custom tooltip label for the dismiss button
   */
  dismissTooltipLabel: PropTypes.string,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Click handler for filter tag close button.
   */
  onClose: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `DismissibleTag` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,

  /**
   * Provide a custom `title` to be inserted in the tag.
   */
  tagTitle: PropTypes.string,

  /**
   * Text to show on clear filters
   */
  title: PropTypes.string,

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default DismissibleTag;



File: Tag/SelectableTag.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useState,
  useRef,
  MouseEvent,
  forwardRef,
  ForwardedRef,
} from 'react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';
import { mergeRefs } from '../../tools/mergeRefs';
import { useControllableState } from '../../internal/useControllableState';
export interface SelectableTagBaseProps {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `SelectableTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the id for the selectable tag.
   */
  id?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Provide an optional hook that is called when selected is changed
   */
  onChange?: (selected: boolean) => void;

  /**
   * Provide an optional function to be called when the tag is clicked.
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Specify the state of the selectable tag.
   */
  selected?: boolean;

  /**
   * Specify the default state of the selectable tag.
   */
  defaultSelected?: boolean;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;
}

export type SelectableTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  SelectableTagBaseProps
>;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const SelectableTag = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      disabled,
      id,
      renderIcon,
      onChange,
      onClick,
      selected,
      size,
      text,
      defaultSelected = false,
      ...other
    }: SelectableTagProps<T>,
    forwardRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
    const tagId = id || `tag-${useId()}`;
    const [selectedTag, setSelectedTag] = useControllableState({
      value: selected,
      onChange: onChange,
      defaultValue: defaultSelected,
    });
    const tagClasses = classNames(`${prefix}--tag--selectable`, className, {
      [`${prefix}--tag--selectable-selected`]: selectedTag,
    });
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];
      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagRef]);

    const tooltipClasses = classNames(
      `${prefix}--icon-tooltip`,
      `${prefix}--tag-label-tooltip`
    );
    const combinedRef = mergeRefs(tagRef, forwardRef);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setSelectedTag(!selectedTag);
      onClick?.(e);
    };

    if (isEllipsisApplied) {
      return (
        <Tooltip
          label={text}
          align="bottom"
          className={tooltipClasses}
          leaveDelayMs={0}
          onMouseEnter={() => false}>
          <Tag
            aria-pressed={selectedTag !== false}
            ref={combinedRef}
            size={size}
            renderIcon={renderIcon}
            disabled={disabled}
            className={tagClasses}
            id={tagId}
            onClick={handleClick}
            {...other}>
            <Text title={text} className={`${prefix}--tag__label`}>
              {text}
            </Text>
          </Tag>
        </Tooltip>
      );
    }

    return (
      <Tag
        aria-pressed={selectedTag !== false}
        ref={combinedRef}
        size={size}
        renderIcon={renderIcon}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        onClick={handleClick}
        {...other}>
        <Text title={text} className={`${prefix}--tag__label`}>
          {text}
        </Text>
      </Tag>
    );
  }
);

SelectableTag.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `SelectableTag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide an optional hook that is called when selected is changed
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the tag is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Specify the state of the selectable tag.
   */
  selected: PropTypes.bool,

  /**
   * Specify the default state of the selectable tag.
   */
  defaultSelected: PropTypes.bool,

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,
};

export default SelectableTag;



File: Tag/isEllipsisActive.ts


/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export const isEllipsisActive = (element: any) => {
  if (element) {
    return element?.offsetWidth < element?.scrollWidth;
  }
  return false;
};



File: Tag/Tag-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag, {
  OperationalTag,
  SelectableTag,
  DismissibleTag,
  TagSkeleton,
} from './';
import { AILabel } from '../AILabel';
import userEvent from '@testing-library/user-event';
import { Asleep, Add } from '@carbon/icons-react';

const prefix = 'cds';

describe('Tag', () => {
  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<Tag type="red">test-tag</Tag>);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <main>
          <Tag type="red">Dog</Tag>
        </main>
      );
      await expect(container).toHaveNoACViolations('Tag');
    });
  });

  describe('Dismissible Tag', () => {
    it('should render a Dismissible Tag state', () => {
      const { container } = render(
        <DismissibleTag type="red" title="Close tag" text="Tag content" />
      );

      expect(container.firstChild).toHaveClass(`${prefix}--tag--filter`);
    });

    it('should support onClose event', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          onClose={onClick}
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should have an appropriate aria-label when (filterable)', () => {
      const { container } = render(
        <DismissibleTag type="red" title="Close tag" text="Tag content" />
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const button = container.querySelector('[aria-label]');
      const accessibilityLabel = button.getAttribute('aria-label');
      // This check would mirror our "Accessibility label must contain at least all of visible label"
      // requirement
      expect(accessibilityLabel).toEqual(expect.stringContaining('Close tag'));
    });

    it('should respect decorator prop', () => {
      render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          decorator={<AILabel aiText="AI" />}
        />
      );
      expect(screen.getByText('AI')).toBeInTheDocument();
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <DismissibleTag
          type="red"
          title="Close tag"
          text="Tag content"
          slug={<AILabel aiText="AI" />}
        />
      );
      expect(screen.getByText('AI')).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  it('should allow for a custom label', () => {
    render(<Tag type="red">Johnny Ramone</Tag>);
    expect(screen.getByText('Johnny Ramone')).toBeInTheDocument();
  });

  it('should allow for a custom icon', () => {
    render(
      <Tag type="red" renderIcon={() => <Add data-testid="test" />}>
        Dee Dee Ramone
      </Tag>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should respect decorator prop', () => {
    render(<Tag type="red" decorator={<AILabel aiText="AI" />} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('should respect deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Tag type="red" slug={<AILabel aiText="AI" />} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    spy.mockRestore();
  });

  describe('Selectable Tag', () => {
    it('should render a selectable tag', () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      expect(container.firstChild).toHaveClass(`${prefix}--tag--selectable`);
    });

    it('should select the selectable tag', async () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(selectableTag).toHaveAttribute('aria-pressed', 'true');
      expect(selectableTag).toHaveClass(`${prefix}--tag--selectable-selected`);
    });

    it('should call onChange', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <SelectableTag text="Tag content" onChange={onChange} />
      );

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <SelectableTag text="Tag content" onClick={onClick} />
      );

      const selectableTag = container.firstChild;

      await userEvent.click(selectableTag);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Skeleton Tag', () => {
    it('should render a skeleton state', () => {
      const { container } = render(<TagSkeleton />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--skeleton`);
    });

    it('should render a skeleton state with a small size', () => {
      const { container } = render(<TagSkeleton size="sm" />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--layout--size-sm`);
    });
  });

  describe('Operational Tag', () => {
    it('should render a operational state', () => {
      const { container } = render(
        <OperationalTag type="red" className="some-class" text="Tag content" />
      );

      const operationalTag = container.querySelector(
        `.${prefix}--tag--operational `
      );

      expect(operationalTag).toHaveClass(`${prefix}--tag--operational `);
    });

    it('should accept other props such as onClick', async () => {
      const onClick = jest.fn();

      const { container } = render(
        <OperationalTag
          type="red"
          className="some-class"
          text="Tag content"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });

  it('should render with different types', () => {
    const types = [
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
      'high-contrast',
      'outline',
    ];

    types.forEach((type) => {
      const { container } = render(<Tag type={type}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(`${prefix}--tag--${type}`);
    });
  });

  it('should render with custom className', () => {
    const { container } = render(<Tag className="some-class">Tag content</Tag>);
    expect(container.firstChild).toHaveClass('some-class');
  });

  it('should render with icon', () => {
    render(<Tag renderIcon={Asleep}>Tag content</Tag>);
    expect(screen.getByText('Tag content')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('should render as a filter tag', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Tag filter>Tag content</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--filter`);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should render with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const { container } = render(<Tag size={size}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(
        `${prefix}--tag ${prefix}--tag--${size} ${prefix}--layout--size-${size}`
      );
    });
  });

  it('should render as disabled', () => {
    const { container } = render(<Tag disabled>Disabled Tag</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--disabled`);
  });

  it('should handle close button click', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockOnClose = jest.fn();
    render(
      <Tag type="red" filter onClose={mockOnClose} title="Close tag">
        onClose
      </Tag>
    );
    const closeButton = screen.getByTitle('Close tag');
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('OperationalTag to supports a ref on the underlying button element', () => {
    const ref = React.createRef();
    render(<OperationalTag type="red" text="Test Tag" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
  it('DismissibleTag to supports a ref on the underlying button element', () => {
    const ref = React.createRef();
    render(<DismissibleTag type="red" text="Test Tag" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it('SelectableTag to supports a ref on the underlying Div element', () => {
    const ref = React.createRef();
    render(<SelectableTag type="red" text="Test Tag" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
  it('Controlled selectable tag', () => {
    const ref = React.createRef();

    const { rerender } = render(
      <SelectableTag type="red" text="Test Tag" ref={ref} selected={true} />
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(screen.getByRole('button', { name: 'Test Tag' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    rerender(
      <SelectableTag type="red" text="Test Tag" ref={ref} selected={false} />
    );

    expect(screen.getByRole('button', { name: 'Test Tag' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
  it('Controlled selectable tag, should call onChange', async () => {
    const onChange = jest.fn();

    render(
      <SelectableTag text="Tag content" onChange={onChange} selected={true} />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    await userEvent.click(selectableTag);
    expect(onChange).toHaveBeenCalledWith(false);
  });
  it('Controlled selectable tag should be selected by default if defaultSelected is true', () => {
    const onChange = jest.fn();

    render(
      <SelectableTag
        text="Tag content"
        onChange={onChange}
        defaultSelected={true}
      />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    expect(selectableTag).toHaveAttribute('aria-pressed', 'true');
  });
  it('Controlled selectable tag should not be be selected by default if defaultSelected is false', () => {
    const onChange = jest.fn();

    render(
      <SelectableTag
        text="Tag content"
        onChange={onChange}
        defaultSelected={false}
      />
    );

    const selectableTag = screen.getByRole('button', { name: 'Tag content' });
    expect(selectableTag).toHaveAttribute('aria-pressed', 'false');
  });
});



File: Tag/Tag.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TagSkeletonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * default sizes.
   */
  size?: 'sm';
}

function TagSkeleton({ className, size, ...rest }: TagSkeletonProps) {
  const prefix = usePrefix();
  const tagClasses = classNames(
    `${prefix}--tag`,
    `${prefix}--skeleton`,
    className,
    {
      [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
    }
  );
  return <span className={tagClasses} {...rest} />;
}

TagSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * default sizes.
   */
  size: PropTypes.oneOf(['sm']),
};

export default TagSkeleton;
export { TagSkeleton };



File: Tag/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Tag from './Tag';
import DismissibleTag from './DismissibleTag';
import OperationalTag from './OperationalTag';
import SelectableTag from './SelectableTag';

export * from './Tag.Skeleton';
export default Tag;
export { Tag, DismissibleTag, OperationalTag, SelectableTag };



File: Tag/storyInteractiveTag.scss


//
// Copyright IBM Corp. 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Style to match design spec

#operational-tag > .cds--popover--caret {
  --cds-popover-offset: 5px;
}

#operational-tag > .cds--popover-caret,
.cds--popover {
  --cds-popover-offset: 5px;
  --cds-popover-caret-height: 5px;
}

.popover-content {
  line-height: 0;
  padding: 1rem;

  p {
    font-size: 14px;
  }
}



File: Tag/Tag.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as TagStories from './Tag.stories';
import * as InteractiveTagStories from './InteractiveTag.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Tag

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Tag)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tag/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tag/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Read Only](#read-only)
- [Dismissible](#dismissible)
- [Selectable](#selectable)
- [Operational](#operational)
- [With AI Label](#with-ai-label)
- [Skeleton](#skeleton)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Tags can be used to categorize items. Use short labels for easy scanning. Use
two words only if necessary to describe the status and differentiate it from
other tags.

## Read Only

Read-only tags are used to categorize, are used for labeling, and do not have
interactive functionality. Read-only tags come in several color choices and can
use optional decorative icons to delineate between multiple categories.

<Canvas
  of={TagStories.ReadOnly}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TagStories.ReadOnly),
    },
  ]}
/>

## Dismissible

Dismissible tags are used to remove tags that can be filtered out by the user.

When to use:

- Use DismissibleTag when you want to allow users to easily clear or dismiss
  specific filters applied to items.

<Canvas
  of={InteractiveTagStories.Dismissible}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(InteractiveTagStories.Dismissible),
    },
  ]}
/>

Here it is a sample code to help you get started.

```js
const tags = [
  {
    type: 'red',
    text: 'Tag content with a long text description',
    tagTitle: 'Provide a custom title to the tag',
  },
  {
    type: 'magenta',
    text: 'Tag content 1',
  },
  {
    type: 'purple',
    text: 'Tag content 2',
  },
];

const [renderedTags, setRenderedTags] = useState(tags);

const handleClose = (removedTag) => {
  const newTags = renderedTags.filter((tag) => tag !== removedTag);
  setRenderedTags(newTags);
};

const resetTabs = () => {
  setRenderedTags(tags);
};

return (
  <>
    <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
      Reset
    </Button>
    <br />
    <div aria-label="Dismissible tags" role="group">
      {renderedTags.map((tag, index) => (
        <DismissibleTag
          key={index}
          type={tag.type}
          className="some-class"
          renderIcon={Asleep}
          text={tag.text}
          tagTitle={tag.tagTitle}
          title="Dismiss"
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag);
          }}
          {...args}
        />
      ))}
    </div>
  </>
);
```

## Selectable

Selectable tags are used to select or unselect single or multiple items.
Selectable tags can also be used in filtering by label scenarios when they do
not need to be dismissed.

When to use:

- Use selectable tags to toggle between a selected or unselected state.
- Use when needing to filter without an explicit dismissable functionality. (We
  need to be a little more specific around filtering for selectable versus
  dismissable tags).

<Canvas
  of={InteractiveTagStories.Selectable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(InteractiveTagStories.Selectable),
    },
  ]}
/>

Here it is a sample code to help you get started.

```js
const tags = [
  {
    id: 1,
    text: 'Tag content with a long text description',
  },
  {
    id: 2,
    text: 'Tag content 1',
  },
  {
    id: 3,
    text: 'Tag content 2',
  },
  {
    id: 4,
    text: 'Tag content 3',
  },
];

const [selectedTags, setSelectedTags] = useState([
  {
    id: 2,
    text: 'Tag content 1',
  },
]);

const handleChange = (tag, selected) => {
  const nextSelectedTags = selected
    ? [...selectedTags, tag]
    : selectedTags.filter((t) => t.id !== tag.id);

  console.log('Selected tags array: ', nextSelectedTags);
  setSelectedTags(nextSelectedTags);
};

return (
  <div aria-label="Selectable tags" role="group">
    {tags.map((tag, index) => (
      <SelectableTag
        key={index}
        renderIcon={Asleep}
        text={tag.text}
        className="some-class"
        selected={selectedTags.find((t) => t.id === tag.id)}
        onChange={(selected) => handleChange(tag, selected)}
        {...args}
      />
    ))}
  </div>
);
```

## Operational

Operational tags enable the user to view a list of all items associated with a
given tag in different ways.

When to use:

- Use to view a list of items with the same tag in a popover, or breadcrumb
  detail view.

When not to use:

- Do not use operational tags as a replacement for links that direct you to an
  entirely different page or launch you out to another tab.
- Do not use in combination with Dismissable tags. Instead, consider letting the
  user enter an "edit mode" to dismiss tags.

<Canvas
  of={InteractiveTagStories.Operational}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(InteractiveTagStories.Operational),
    },
  ]}
/>

## With AI Label

Tag with AI label is now stable for Read Only tags. This addition changes the
visual appearance of the component and introduces an AI explainability feature
when AI is present in the component.

<Canvas
  of={TagStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TagStories.withAILabel),
    },
  ]}
/>

## Skeleton

<Canvas
  of={TagStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TagStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tag/Tag.tsx).



File: Tag/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Read Only',
      variant: 'components-tag--read-only',
    },
  ]}
/>



File: Tag/migrate-to-7.x.md


# Props

`<Tag>`

See [our website](https://www.carbondesignsystem.com/components/tag/code) for
details.

| Prop   | v9                                | v10                            |
| ------ | --------------------------------- | ------------------------------ |
| `type` | Accepts `beta`, `community`, etc. | Accepts `red`, `magenta`, etc. |



File: Tag/Tag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Tag } from '../Tag';
import TagSkeleton from '../Tag/Tag.Skeleton';
import DismissibleTag from '../Tag/DismissibleTag';
import { Asleep, View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import '../AILabel/ailabel-story.scss';
import mdx from './Tag.mdx';
import './story.scss';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const ReadOnly = (args) => {
  return (
    <>
      <Tag className="some-class" type="red" {...args}>
        {'Tag content with a long text description'}
      </Tag>
      <Tag className="some-class" type="magenta" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="purple" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="blue" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cyan" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="teal" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="green" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="cool-gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="warm-gray" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="high-contrast" {...args}>
        {'Tag content'}
      </Tag>
      <Tag className="some-class" type="outline" {...args}>
        {'Tag content'}
      </Tag>
    </>
  );
};

ReadOnly.args = {
  disabled: false,
  filter: false,
  size: 'md',
  title: 'Clear filter',
};

ReadOnly.argTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  filter: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
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
  title: {
    control: {
      type: 'text',
    },
  },
  type: {
    control: false,
  },
};

export const Skeleton = (args) => (
  <div>
    <TagSkeleton {...args} />
  </div>
);

Skeleton.args = {
  size: 'md',
};

Skeleton.parameters = {
  controls: {
    exclude: ['disabled', 'filter', 'id', 'renderIcon', 'title', 'type'],
  },
};

Skeleton.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const withAILabel = () => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

  return (
    <div style={{ marginBottom: '4rem' }}>
      <Tag
        decorator={aiLabel}
        className="some-class"
        type="red"
        title="Clear Filter">
        {'Tag'}
      </Tag>

      <DismissibleTag
        decorator={aiLabel}
        className="some-class"
        type="purple"
        title="Clear Filter"
        text="Tag"></DismissibleTag>

      <Tag
        renderIcon={Asleep}
        decorator={aiLabel}
        className="some-class"
        type="blue"
        title="Clear Filter">
        {'Tag'}
      </Tag>

      <DismissibleTag
        renderIcon={Asleep}
        decorator={aiLabel}
        className="some-class"
        type="green"
        title="Clear Filter"
        text="Tag"></DismissibleTag>
    </div>
  );
};



File: Tag/OperationalTag.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  MouseEventHandler,
  useLayoutEffect,
  useState,
  useRef,
  forwardRef,
  ForwardedRef,
} from 'react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import Tag, { SIZES } from './Tag';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';
import { isEllipsisActive } from './isEllipsisActive';
import { mergeRefs } from '../../tools/mergeRefs';

const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
};

export interface OperationalTagBaseProps {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * Specify if the `OperationalTag` is disabled
   */
  disabled?: boolean;

  /**
   * Specify the id for the OperationalTag.
   */
  id?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;
  onClick?: MouseEventHandler;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type OperationalTagProps<T extends React.ElementType> = PolymorphicProps<
  T,
  OperationalTagBaseProps
>;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const OperationalTag = forwardRef(
  <T extends React.ElementType>(
    {
      className,
      disabled,
      id,
      renderIcon,
      size,
      text,
      type = 'gray',
      ...other
    }: OperationalTagProps<T>,
    forwardRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
    const tagId = id || `tag-${useId()}`;
    const tagClasses = classNames(`${prefix}--tag--operational`, className);
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];

      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagRef]);

    const tooltipClasses = classNames(
      `${prefix}--icon-tooltip`,
      `${prefix}--tag-label-tooltip`
    );
    const combinedRef = mergeRefs(tagRef, forwardRef);

    if (isEllipsisApplied) {
      return (
        <Tooltip
          label={text}
          align="bottom"
          className={tooltipClasses}
          leaveDelayMs={0}
          onMouseEnter={() => false}
          closeOnActivation>
          <Tag
            ref={combinedRef}
            type={type}
            size={size}
            renderIcon={renderIcon}
            disabled={disabled}
            className={tagClasses}
            id={tagId}
            {...other}>
            <Text title={text} className={`${prefix}--tag__label`}>
              {text}
            </Text>
          </Tag>
        </Tooltip>
      );
    }

    return (
      <Tag
        ref={combinedRef}
        type={type}
        size={size}
        renderIcon={renderIcon}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        {...other}>
        <Text title={text} className={`${prefix}--tag__label`}>
          {text}
        </Text>
      </Tag>
    );
  }
);

OperationalTag.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify if the `OperationalTag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * Provide text to be rendered inside of a the tag.
   */
  text: PropTypes.string,

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default OperationalTag;



File: Tag/story.scss


//
// Copyright IBM Corp. 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/config' as *;
@use '@carbon/react/scss/spacing' as *;

.#{$prefix}--tag {
  margin: $spacing-02;
}



File: Tag/InteractiveTag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Tag } from '.';
import { default as SelectableTag } from './SelectableTag';
import { default as OperationalTag } from './OperationalTag';
import { default as DismissibleTag } from './DismissibleTag';
import { Asleep } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import mdx from './Tag.mdx';
import './storyInteractiveTag.scss';
import { Text } from '../Text';
import Button from '../Button';

export default {
  title: 'Components/Tag',
  component: SelectableTag,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Selectable = (args) => {
  const tags = [
    {
      id: 1,
      text: 'Tag content with a long text description',
    },
    {
      id: 2,
      text: 'Tag content 1',
    },
    {
      id: 3,
      text: 'Tag content 2',
    },
    {
      id: 4,
      text: 'Tag content 3',
    },
  ];

  const [selectedTags, setSelectedTags] = React.useState([
    {
      id: 2,
      text: 'Tag content 1',
    },
  ]);

  const handleChange = (tag, selected) => {
    const nextSelectedTags = selected
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);

    console.log('Selected tags array: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <div aria-label="Selectable tags" role="group">
      {tags.map((tag, index) => (
        <SelectableTag
          key={index}
          renderIcon={Asleep}
          text={tag.text}
          className="some-class"
          selected={selectedTags.find((t) => t.id === tag.id)}
          onChange={(selected) => handleChange(tag, selected)}
          {...args}
        />
      ))}
    </div>
  );
};

Selectable.args = {
  disabled: false,
};

Selectable.parameters = {
  controls: {
    exclude: ['type', 'filter', 'title'],
  },
};

Selectable.argTypes = {
  selected: {
    control: 'false',
    description: 'Specify the state of the selectable tag.',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Operational = (args) => {
  const [open, setOpen] = React.useState(false);
  const [openHighContrast, setOpenHighContrast] = React.useState(false);

  return (
    <>
      <div
        aria-label="Operational tags"
        role="group"
        style={{ marginBottom: '1rem' }}>
        <OperationalTag
          type="red"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content with a long text description"
          {...args}
        />
        <OperationalTag
          type="magenta"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="purple"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="blue"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cyan"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="teal"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="green"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="cool-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
        <OperationalTag
          type="warm-gray"
          className="some-class"
          renderIcon={Asleep}
          text="Tag content"
          {...args}
        />
      </div>

      <h4>Interactive examples</h4>
      <div
        id="operational-tag"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '1rem',
        }}
        aria-label="Operational tags with Popover"
        role="group">
        {/* High contrast example */}
        <Popover open={openHighContrast} highContrast>
          <OperationalTag
            onClick={() => {
              setOpenHighContrast(!openHighContrast);
            }}
            aria-expanded={openHighContrast}
            renderIcon={Asleep}
            text="Tag content"
            className="some-class"
            {...args}
          />
          <PopoverContent className="popover-content">
            <p>Tag 1 name</p>
            <p>Tag 2 name</p>
            <p>Tag 3 name</p>
            <p>Tag 4 name</p>
            <p>Tag 5 name</p>
          </PopoverContent>
        </Popover>

        <Popover open={open}>
          <OperationalTag
            onClick={() => {
              setOpen(!open);
            }}
            aria-expanded={open}
            renderIcon={Asleep}
            text="Tag content"
            className="some-class"
            {...args}
          />
          <PopoverContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
              }}>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 1 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 2 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 3 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 4 name'}
              </Tag>
              <Tag type="blue" className="some-class" {...args}>
                {'Tag 5 name'}
              </Tag>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

Operational.args = {
  disabled: false,
  size: 'md',
};

Operational.parameters = {
  controls: {
    exclude: ['filter', 'title', 'selected'],
  },
};

Operational.argTypes = {
  id: {
    control: false,
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  type: {
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};

export const Dismissible = (args) => {
  const tags = [
    {
      type: 'red',
      text: 'Tag content with a long text description',
      tagTitle: 'Provide a custom title to the tag',
    },
    {
      type: 'magenta',
      text: 'Tag content 1',
    },
    {
      type: 'purple',
      text: 'Tag content 2',
    },
    {
      type: 'blue',
      text: 'Tag content 3',
    },
    {
      type: 'cyan',
      text: 'Tag content 4',
    },
    {
      type: 'teal',
      text: 'Tag content 5',
    },
    {
      type: 'green',
      text: 'Tag content 6',
    },
    {
      type: 'gray',
      text: 'Tag content 7',
    },
    {
      type: 'cool-gray',
      text: 'Tag content 8',
    },
    {
      type: 'warm-gray',
      text: 'Tag content 9',
    },
    {
      type: 'high-contrast',
      text: 'Tag content 10',
    },
    {
      type: 'outline',
      text: 'Tag content 11',
    },
  ];

  const [renderedTags, setRenderedTags] = React.useState(tags);

  const handleClose = (removedTag) => {
    const newTags = renderedTags.filter((tag) => tag !== removedTag);
    setRenderedTags(newTags);
  };

  const resetTabs = () => {
    setRenderedTags(tags);
  };

  return (
    <>
      <Button
        // aria-label="Re-render all tags in the screen"
        style={{ marginBottom: '3rem' }}
        onClick={resetTabs}>
        Reset
      </Button>
      <br />
      <div aria-label="Dismissible tags" role="group">
        {renderedTags.map((tag, index) => (
          <DismissibleTag
            key={index}
            type={tag.type}
            className="some-class"
            renderIcon={Asleep}
            text={tag.text}
            tagTitle={tag.tagTitle}
            title="Dismiss"
            dismissTooltipAlignment={args.dismissTooltipAlignment}
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag);
            }}
            {...args}
          />
        ))}
      </div>
    </>
  );
};

Dismissible.args = {
  disabled: false,
  size: 'md',
  dismissTooltipAlignment: 'bottom',
};

Dismissible.parameters = {
  controls: {
    exclude: ['filter', 'selected'],
  },
};
Dismissible.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  dismissTooltipAlignment: {
    options: [
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
    control: { type: 'select' },
    description: 'Specify the tooltip alignment for the dismiss button',
    table: {
      defaultValue: { summary: 'bottom' },
    },
  },
};



File: Tag/Tag.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { deprecate } from '../../prop-types/deprecate';
import { DefinitionTooltip } from '../Tooltip';
import { isEllipsisActive } from './isEllipsisActive';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';
import { SelectableTagBaseProps } from './SelectableTag';
import { OperationalTagBaseProps } from './OperationalTag';
import { DismissibleTagBaseProps } from './DismissibleTag';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline',
};

export const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export interface TagBaseProps {
  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className?: string;

  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `Tag` component
   */
  decorator?: ReactNode;

  /**
   * Specify if the `Tag` is disabled
   */
  disabled?: boolean;

  /**
   * @deprecated The `filter` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  filter?: boolean;

  /**
   * Specify the id for the tag.
   */
  id?: string;

  /**
   * @deprecated The `onClose` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size?: keyof typeof SIZES;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug?: ReactNode;

  /**
   * @deprecated The `title` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.
   */
  title?: string;

  /**
   * Specify the type of the `Tag`
   */
  type?: keyof typeof TYPES;
}

export type TagProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, TagBaseProps>;

type TagComponent = <T extends React.ElementType = 'div'>(
  props:
    | TagProps<T>
    | OperationalTagBaseProps
    | SelectableTagBaseProps
    | DismissibleTagBaseProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const TagBase = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  TagBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      children,
      className,
      decorator,
      id,
      type,
      filter, // remove filter in next major release - V12
      renderIcon: CustomIconElement,
      title = 'Clear filter', // remove title in next major release - V12
      disabled,
      onClose, // remove onClose in next major release - V12
      size,
      as: BaseComponent,
      slug,
      ...other
    },
    forwardRef
  ) => {
    const prefix = usePrefix();
    const tagRef = useRef<HTMLElement>(null);
    if (filter) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn(
        'The `filter` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
      );
    }

    if (onClose) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn(
        'The `onClose` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
      );
    }
    const ref = useMergedRefs([forwardRef, tagRef]);
    // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
    const tagId = id || `tag-${useId()}`;
    const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

    useLayoutEffect(() => {
      const newElement = tagRef.current?.getElementsByClassName(
        `${prefix}--tag__label`
      )[0];
      setIsEllipsisApplied(isEllipsisActive(newElement));
    }, [prefix, tagRef]);

    const conditions = [
      `${prefix}--tag--selectable`,
      `${prefix}--tag--filter`,
      `${prefix}--tag--operational`,
    ];

    const isInteractiveTag = conditions.some((el) => className?.includes(el));

    const tagClasses = classNames(`${prefix}--tag`, className, {
      [`${prefix}--tag--disabled`]: disabled,
      [`${prefix}--tag--filter`]: filter,
      [`${prefix}--tag--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}--tag--${type}`]: type,
      [`${prefix}--tag--interactive`]:
        other.onClick && !isInteractiveTag && isEllipsisApplied,
    });

    const typeText =
      type !== undefined && type in Object.keys(TYPES) ? TYPES[type] : '';

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClose) {
        event.stopPropagation();
        onClose(event);
      }
    };

    // AILabel is always size `sm` and `inline`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator =
      candidateIsAILabel && !isInteractiveTag
        ? cloneElement(candidate, { size: 'sm', kind: 'inline' })
        : null;

    if (filter) {
      const ComponentTag = (BaseComponent as React.ElementType) ?? 'div';
      return (
        <ComponentTag className={tagClasses} id={tagId} {...other}>
          {CustomIconElement && size !== 'sm' ? (
            <div className={`${prefix}--tag__custom-icon`}>
              <CustomIconElement />
            </div>
          ) : (
            ''
          )}

          <Text
            title={typeof children === 'string' ? children : undefined}
            className={`${prefix}--tag__label`}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
          {normalizedDecorator}
          <button
            type="button"
            className={`${prefix}--tag__close-icon`}
            onClick={handleClose}
            disabled={disabled}
            aria-label={title}
            title={title}>
            <Close />
          </button>
        </ComponentTag>
      );
    }

    const ComponentTag =
      BaseComponent ??
      (other.onClick || className?.includes(`${prefix}--tag--operational`)
        ? 'button'
        : 'div');

    const labelClasses = classNames({
      [`${prefix}--tag__label`]: !isInteractiveTag,
    });

    return (
      <ComponentTag
        ref={ref}
        disabled={disabled}
        className={tagClasses}
        id={tagId}
        type={ComponentTag === 'button' ? 'button' : undefined}
        {...other}>
        {CustomIconElement && size !== 'sm' ? (
          <div className={`${prefix}--tag__custom-icon`}>
            <CustomIconElement />
          </div>
        ) : (
          ''
        )}
        {isEllipsisApplied && !isInteractiveTag ? (
          <DefinitionTooltip
            openOnHover={false}
            definition={
              children !== null && children !== undefined ? children : typeText
            }
            className={`${prefix}--definition--tooltip--tag`}>
            <Text
              title={
                children !== null &&
                children !== undefined &&
                typeof children === 'string'
                  ? children
                  : typeText
              }
              className={labelClasses}>
              {children !== null && children !== undefined
                ? children
                : typeText}
            </Text>
          </DefinitionTooltip>
        ) : (
          <Text
            title={
              children !== null &&
              children !== undefined &&
              typeof children === 'string'
                ? children
                : typeText
            }
            className={labelClasses}>
            {children !== null && children !== undefined ? children : typeText}
          </Text>
        )}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--tag__decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </ComponentTag>
    );
  }
);
const Tag = TagBase as TagComponent;
(Tag as React.FC).propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * wrapping element
   */
  as: PropTypes.elementType,

  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `Tag` component
   */
  decorator: PropTypes.node,

  /**
   * Specify if the `Tag` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if `Tag` is a filter/chip
   */
  filter: deprecate(
    PropTypes.bool,
    'The `filter` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

  /**
   * Specify the id for the tag.
   */
  id: PropTypes.string,

  /**
   * Click handler for filter tag close button.
   */
  onClose: deprecate(
    PropTypes.func,
    'The `onClose` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: PropTypes.oneOf(Object.keys(SIZES)),

  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Text to show on clear filters
   */
  title: deprecate(
    PropTypes.string,
    'The `title` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead.'
  ),

  /**
   * Specify the type of the `Tag`
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
};

export const types = Object.keys(TYPES);
export default Tag;



