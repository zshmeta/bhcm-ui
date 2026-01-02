File: Link/Link.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as LinkStories from './Link.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Link

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Link)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/link/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/link/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Inline](#inline)
- [Accessible Link with Icon](#accessible-link-with-icon)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Links are used as navigational elements and can be used on their own or inline
with text. They provide a lightweight option for navigation but like other
interactive elements, too many links will clutter a page and make it difficult
for users to identify their next steps. This is especially true for inline
links, which should be used sparingly.

<Canvas
  of={LinkStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LinkStories.Default),
    },
  ]}
/>

## Inline

<Canvas
  of={LinkStories.Inline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LinkStories.Inline),
    },
  ]}
/>

## Accessible Link with Icon

If the text of your link doesn't correspond to the action represented by the
icon, consider incorporating an `aria-label` for the icon. This will ensure that
visually impaired users can comprehend the outcome of clicking the link.

<Canvas
  of={LinkStories.PairedWithIcon}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LinkStories.PairedWithIcon),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Link/Link.mdx).



File: Link/Link.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  AnchorHTMLAttributes,
  AriaAttributes,
  ComponentType,
  ElementType,
  HTMLAttributeAnchorTarget,
} from 'react';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';
import { usePrefix } from '../../internal/usePrefix';

export interface LinkBaseProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * @description Indicates the element that represents the
   *   current item within a container or set of related
   *   elements.
   */
  'aria-current'?: AriaAttributes['aria-current'];

  /**
   * @description Provide a custom className to be applied to
   *   the containing `<a>` node.
   */
  className?: string;

  /**
   * @description Specify if the control should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * @description Provide the `href` attribute for the `<a>` node.
   */
  href?: string;

  /**
   * @description Specify whether you want the inline version of this control.
   */
  inline?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType;

  /**
   * Specify the size of the Link. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @description Specify the target attribute for the `<a>` node.
   */
  target?: HTMLAttributeAnchorTarget;

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited?: boolean;
}

export type LinkProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, LinkBaseProps>;

type LinkComponent = <T extends React.ElementType = 'a'>(
  props: LinkProps<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

// First create the component with basic types
// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const LinkBase = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  LinkBaseProps & {
    as?: ElementType;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      as: BaseComponent,
      children,
      className: customClassName,
      href,
      disabled = false,
      inline = false,
      visited = false,
      renderIcon: Icon,
      size,
      target,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const className = cx(`${prefix}--link`, customClassName, {
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--inline`]: inline,
      [`${prefix}--link--visited`]: visited,
      [`${prefix}--link--${size}`]: size,
    });
    const rel = target === '_blank' ? 'noopener' : undefined;
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      className,
      rel,
      target,
    };

    // Reference for disabled links:
    // https://www.scottohara.me/blog/2021/05/28/disabled-links.html
    if (!disabled) {
      linkProps.href = href;
    } else {
      linkProps.role = 'link';
      linkProps['aria-disabled'] = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const BaseComponentAsAny = (BaseComponent ?? 'a') as any;

    const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // If the link is not disabled, we allow the onClick event to propagate
        // so that any parent handlers can also respond to the click.
        if (rest.onClick) {
          rest.onClick(event);
        }
      }
    };

    return (
      <BaseComponentAsAny
        ref={ref}
        {...linkProps}
        {...rest}
        onClick={handleOnClick}>
        {children}
        {!inline && Icon && (
          <div className={`${prefix}--link__icon`}>
            <Icon />
          </div>
        )}
      </BaseComponentAsAny>
    );
  }
);
const Link = LinkBase as LinkComponent;

(Link as React.FC).displayName = 'Link';
(Link as React.FC).propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * Provide the content for the Link
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing `<a>` node
   */
  className: PropTypes.string,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide the `href` attribute for the `<a>` node
   */
  href: PropTypes.string,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Link. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited: PropTypes.bool,
};

export default Link;



File: Link/Link-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Link from '../Link';

const prefix = 'cds';

describe('Link', () => {
  it('should render an <a> element', () => {
    render(<Link href="https://carbondesignsystem.com">test</Link>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(`${prefix}--link`);
  });

  it('should inherit the href property', () => {
    const href = 'https://carbondesignsystem.com';
    render(
      <Link data-testid="link" href={href}>
        test
      </Link>
    );
    expect(screen.getByTestId('link')).toHaveAttribute('href', href);
  });

  it('should include child content', () => {
    const child = 'test';
    render(
      <Link data-testid="link" href="https://carbondesignsystem.com">
        {child}
      </Link>
    );
    expect(screen.getByTestId('link')).toHaveTextContent(child);
  });

  it('should support a custom class on the element with a link role', () => {
    render(
      <Link href="https://carbondesignsystem.com" className="custom-class">
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });

  it('should support a custom class on the element with the as property', () => {
    render(
      <Link
        href="https://carbondesignsystem.com"
        as="h1"
        className="custom-class">
        test
      </Link>
    );
    expect(screen.getByRole('heading')).toHaveClass('custom-class');
  });

  it('should keep Carbon classes on the element with the as property', () => {
    render(
      <Link href="https://carbondesignsystem.com" as="h1">
        test
      </Link>
    );
    expect(screen.getByRole('heading').classList.length).toBeTruthy();
  });

  it('should support being disabled', () => {
    render(
      <Link href="https://carbondesignsystem.com" disabled>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).not.toHaveAttribute('href');
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should support the inline link variant', () => {
    render(
      <Link href="https://carbondesignsystem.com" inline>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass(`${prefix}--link--inline`);
  });

  it.each(['sm', 'md', 'lg'])('should support the %s size variant', (size) => {
    render(
      <Link href="https://carbondesignsystem.com" size={size}>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass(`${prefix}--link--${size}`);
  });

  it('should add rel="noopener" automatically if target="_blank"', () => {
    render(
      <Link href="https://carbondesignsystem.com" target="_blank">
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener');
  });

  it('should receive keyboard focus', async () => {
    render(
      <Link href="/" className="some-class">
        A simple link
      </Link>
    );

    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByText('A simple link')).toHaveFocus();
  });

  it('should not receive keyboard focus when disabled', async () => {
    render(
      <Link href="/" disabled className="some-class">
        A simple link
      </Link>
    );
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  // check for disabled onclick handler
  it('should not call onClick when disabled', async () => {
    const onClick = jest.fn();
    render(
      <Link href="/" disabled onClick={onClick} className="some-class">
        A simple link
      </Link>
    );
    const link = screen.getByText('A simple link');
    await userEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onClick when not disabled', async () => {
    const onClick = jest.fn();
    render(
      <Link href="/" onClick={onClick} className="some-class">
        A simple link
      </Link>
    );
    const link = screen.getByText('A simple link');
    await userEvent.click(link);
    expect(onClick).toHaveBeenCalled();
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      render(
        <Link href="/" className="some-class">
          A simple link
        </Link>
      );
      await expect(screen.getByText('A simple link')).toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      render(
        <main>
          <Link href="/" className="some-class">
            A simple link
          </Link>
        </main>
      );
      await expect(screen.getByText('A simple link')).toHaveNoACViolations(
        'Link'
      );
    });
  });

  describe('Component API', () => {
    it('should support a `ref` on the element with role of link', () => {
      const ref = jest.fn();
      render(
        <Link href="https://carbondesignsystem.com" ref={ref}>
          A simple link
        </Link>
      );
      expect(ref).toHaveBeenCalledWith(screen.getByRole('link'));
    });
  });
});



File: Link/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-link--default'
    },
    {
      label: 'Paired With Icon',
      variant: 'components-link--paired-with-icon'
    }
  ]}
/>



File: Link/link-avt.md


# Link Component Accessibility Verification Testing

Developers or designers wanting to manually verify the accessibility of the
component can carry out the following steps:

## Keyboard

- [ ] the user can focus the link with `tab`
- [ ] the user can activate the link with `enter`

## Contrast

- [ ] the link text has a contrast of 4.5:1 minimum against the background color
- [ ] the link focus outline has a contrast of 4.5:1 minimum against the
      background color

## Screen reader

Each screen reader should be tested when paired with it's preferred browser.

### VoiceOver on Safari

"{link text}, link. You are currently on a link. To click this link, press
Control-Option-Space."

### JAWS on Edge/Chrome

"Main region. {link text}, link."

### NVDA on Firefox (optional, but recommended)

"link {link text}"



File: Link/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link, { type LinkProps } from './Link';

export default Link;
export { Link, type LinkProps };



File: Link/Link.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import Link from './Link';
import mdx from './Link.mdx';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    disabled: false,
    inline: false,
    visited: false,
  },
  argTypes: {
    renderIcon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => {
  return (
    <Link href="#" {...args}>
      Link
    </Link>
  );
};

export const Inline = (args) => {
  return (
    <>
      <Link {...args}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Link>
      <p>
        Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
        fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
        Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
        Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.{' '}
        <Link {...args}>
          Maecenas nunc mauris, consequat quis mauris sit amet
        </Link>
        , finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit
        amet, pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices
        erat pellentesque id. Quisque venenatis purus sit amet sodales
        condimentum. Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis,
        aliquet rhoncus purus. Praesent et scelerisque ligula.
      </p>
    </>
  );
};
Inline.args = {
  ...Default.args,
  inline: true,
};

export const PairedWithIcon = (args) => {
  return (
    <Link
      href="#"
      renderIcon={() => <ArrowRight aria-label="Arrow Right" />}
      {...args}>
      Carbon Docs
    </Link>
  );
};



