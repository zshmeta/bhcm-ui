File: Theme/Theme.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Theme-story.scss';
import React, { useEffect } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { VStack } from '../Stack';

import { GlobalTheme, Theme, usePrefersDarkScheme, useTheme } from '../Theme';
import mdx from './Theme.mdx';

export default {
  title: 'Components/Theme',
  component: Theme,
  subcomponents: {
    GlobalTheme,
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  args: {
    theme: 'g10',
  },
};

const ThemeText = ({ children, showIsDark }) => {
  const { theme, isDark } = useTheme();

  return (
    <p>
      {children}
      {showIsDark
        ? ` useTheme reveals... { theme: '${theme}', isDark: '${isDark}'}`
        : theme}
    </p>
  );
};

export const Default = () => {
  return (
    <>
      <Theme theme="g100">
        <section className="theme-section">g100</section>
      </Theme>
      <Theme theme="g90">
        <section className="theme-section">g90</section>
      </Theme>
      <Theme theme="g10">
        <section className="theme-section">g10</section>
      </Theme>
      <Theme theme="white">
        <section className="theme-section">white</section>
      </Theme>
    </>
  );
};

export const UseTheme = () => {
  return (
    <div>
      <section className="theme-section">
        <ThemeText showIsDark={true} />
      </section>
      <Theme theme="g100">
        <section className="theme-section">
          <ThemeText showIsDark={true} />
        </section>
      </Theme>
    </div>
  );
};

UseTheme.storyName = 'useTheme';

export const UsePrefersDarkScheme = () => {
  const prefersDark = usePrefersDarkScheme();

  const theme1 = prefersDark ? 'g100' : 'white';
  const theme2 = prefersDark ? 'white' : 'g100';
  const theme3 = prefersDark ? 'g90' : 'g10';
  const theme4 = prefersDark ? 'g10' : 'g90';

  return (
    <Theme theme={theme1}>
      <section className="theme-section">
        <ThemeText showIsDark={true}>
          usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. Theme
          set to `{theme1}`.
        </ThemeText>
      </section>
      <Theme theme={theme2}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. An
            alternative theme set of `{theme2}`.
          </ThemeText>
        </section>
      </Theme>
      <Theme theme={theme3}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}.
            Theme set to `{theme3}`.
          </ThemeText>
        </section>
      </Theme>
      <Theme theme={theme4}>
        <section className="theme-section">
          <ThemeText showIsDark={true}>
            usePrefersDarkScheme() is {prefersDark ? '`true`' : '`false`'}. An
            alternative theme set of `{theme4}`.
          </ThemeText>
        </section>
      </Theme>
    </Theme>
  );
};
UsePrefersDarkScheme.storyName = 'usePrefersDarkScheme';

export const _WithLayer = () => {
  const themes = ['white', 'g10', 'g90', 'g100'];

  return (
    <VStack gap={7}>
      {themes.map((theme) => (
        <Theme key={theme} theme={theme}>
          <article className="theme-layer-example">
            <header className="theme-layer-header">{theme} theme</header>
            <WithLayer>
              <div className="theme-with-layer">Content</div>
            </WithLayer>
          </article>
        </Theme>
      ))}
    </VStack>
  );
};



File: Theme/Theme-story.scss


//
// Copyright IBM Corp. 2018, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme';

.theme-section {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-example {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-header {
  margin-block-end: 1rem;
}

.theme-with-layer {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.carbon-storybook-template--annotation--background {
  margin: 0 !important; /* stylelint-disable-line declaration-no-important */
  min-block-size: 0 !important; /* stylelint-disable-line declaration-no-important */
}



File: Theme/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-theme--default'
    }
  ]}
/>



File: Theme/docs/use-theme-overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-theme--use-theme'
    }
  ]}
/>



File: Theme/Theme.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as ThemeStories from './Theme.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Theme

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Theme)

{/* prettier-ignore-start */}

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Setting the global theme](#setting-the-global-theme)
- [Setting an inline theme](#setting-an-inline-theme)
- [Getting the current theme in a component](#getting-the-current-theme-in-a-component)
- [Component API](#component-api)
  - [Theme as](#theme-as)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

{/* prettier-ignore-end */}

## Overview

The `GlobalTheme` and `Theme` components allow you to specify the theme for a
page, or for a part of a page, respectively. `Theme` is most often used to
implement inline theming where you can style a portion of your page with a
particular theme.

In order for the styles of `Theme` to be correctly applied in your project, you
need to make sure that you have included `@carbon/react/scss/zone` in your Sass
files by writing:

```scss
@use '@carbon/react/scss/zone';
```

You also get this file when you import `@carbon/react` directly in your Sass.

<Canvas
  of={ThemeStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ThemeStories.Default),
    },
  ]}
/>

## Setting the global theme

To the set the theme for your entire project, the `GlobalTheme` component can be
used.

Please note that in contrast to `Theme` this does not apply any styles on its
own but rather sets the context's theme according to the value you pass to its
`theme` prop.

This is due to the various options of applying global css custom properties
which differ from application to application. Depending on your architecture you
may want to apply a class to the `<body>` or add a custom data attribute to your
`<html>` element:

```jsx
import { useEffect } from 'react';
import { GlobalTheme } from '@carbon/react';

function App() {
  const theme = 'g100'; // ← your implementation, e.g. fetching user settings

  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <YourApp />
    </GlobalTheme>;
  );
}
```

```scss
@use '@carbon/styles/scss/theme';
@use '@carbon/styles/scss/themes';

:root[data-carbon-theme='g10'] {
  @include theme.theme(themes.$g10);
}

:root[data-carbon-theme='g100'] {
  @include theme.theme(themes.$g100);
}
```

This way, the `GlobalTheme` component is used to "synchronize" the state of the
application's context and your scss, so that other components and hooks like
useTheme can work properly. For this reason, the component should be used as a
wrapper of the root of your application.

By default, the global theme is set to `white`.

## Setting an inline theme

Use the `Theme` component to set an inline theme for a part of the UI in your
project. All components that you render as `children` of `Theme` will now use
the design token values from that theme.

```jsx
import { Theme } from '@carbon/react';

function ExamplePage() {
  return (
    <GlobalTheme theme="white">
      <h1>Page title</h1>
      <p>Display in the white theme</p>
      <Theme theme="g100">
        <p>Display in the g100 theme</p>
      </Theme>
    <GlobalTheme>
  );
}
```

<Canvas of={ThemeStories.Default} />

## Getting the current theme in a component

The `useTheme` hook provides the current theme for a component. This can be
helpful if you need to conditionally render items based on the current theme.

```jsx
import { useTheme } from '@carbon/react';

function ExampleComponent() {
  const { theme } = useTheme();

  // Use the current theme in your component
}
```

<Canvas of={ThemeStories.UseTheme} />

## Component API

<ArgTypes />

### Theme as

You can configure the base element rendered by `Theme` using the `as` prop. For
example, if you would like the `Theme` component to render as a `section` you
could write the following:

```jsx
<Theme as="section" theme="g100">
  <ChildComponent />
</Theme>
```

Similarly, you can provide any custom component to the `as` prop which the
`Theme` component will use.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/carbon-react/src/components/Theme/Theme.mdx).



File: Theme/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, useMemo, type PropsWithChildren } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { LayerContext } from '../Layer/LayerContext';
import { useMatchMedia } from '../../internal/useMatchMedia';

export interface GlobalThemeProps {
  theme?: 'white' | 'g10' | 'g90' | 'g100';
  children?: React.ReactNode;
}

export const ThemeContext = React.createContext<GlobalThemeProps>({
  theme: 'white',
});

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const GlobalTheme = React.forwardRef(
  (
    { children, theme }: PropsWithChildren<GlobalThemeProps>,
    ref: React.Ref<unknown>
  ) => {
    const value = useMemo(() => {
      return {
        theme,
      };
    }, [theme]);

    const childrenWithProps = React.cloneElement(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      children as React.ReactElement<any>,
      { ref: ref }
    );

    return (
      <ThemeContext.Provider value={value}>
        {childrenWithProps}
      </ThemeContext.Provider>
    );
  }
);

GlobalTheme.propTypes = {
  /**
   * Provide child elements to be rendered inside of `GlobalTheme`, this is
   * typically the root of your app
   */
  children: PropTypes.node,

  /**
   * Specify the global theme for your app
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
};

type ThemeBaseProps = GlobalThemeProps & {
  className?: string;
};

type ThemeProps<E extends ElementType> = PolymorphicProps<E, ThemeBaseProps>;

/**
 * Specify the theme to be applied to a page, or a region in a page
 */
export function Theme<E extends ElementType = 'div'>({
  as: BaseComponent = 'div' as E,
  className: customClassName,
  theme,
  ...rest
}: ThemeProps<E>) {
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--white`]: theme === 'white',
    [`${prefix}--g10`]: theme === 'g10',
    [`${prefix}--g90`]: theme === 'g90',
    [`${prefix}--g100`]: theme === 'g100',
    [`${prefix}--layer-one`]: true,
  });
  const value = React.useMemo(() => {
    const isDark = theme && ['g90', 'g100'].includes(theme);

    return {
      theme,
      isDark,
    };
  }, [theme]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny = BaseComponent as any;

  return (
    <ThemeContext.Provider value={value}>
      <LayerContext.Provider value={1}>
        <BaseComponentAsAny {...rest} className={className} />
      </LayerContext.Provider>
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the theme
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
};

/**
 * Get access to the current theme
 */
export function useTheme() {
  return React.useContext(ThemeContext);
}

export function usePrefersDarkScheme() {
  return useMatchMedia('(prefers-color-scheme: dark)');
}



