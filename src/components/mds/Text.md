File: Text/Text.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { LayoutDirection } from '../LayoutDirection';
import { TextDirection, Text } from '.';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { ContentSwitcher } from '../ContentSwitcher';
import Switch from '../Switch';
import { Heading } from '../Heading';
import mdx from './Text.mdx';

export default {
  title: 'Preview/preview_Text',
  component: Text,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <>
      <p>
        <Text>Hello world</Text>
      </p>
      <p>
        <Text>لكن لا بد أن أوضح لك أن كل</Text>
      </p>
    </>
  );
};

export const LayoutAndText = () => {
  return (
    <LayoutDirection dir="ltr">
      <p>
        Ipsum ipsa repellat doloribus magni architecto totam Laborum maxime
        ratione nobis voluptatibus facilis nostrum, necessitatibus magnam Maxime
        esse consequatur nemo sit repellat Dignissimos rem nobis hic
        reprehenderit ducimus? Fuga voluptatem?
      </p>
      <LayoutDirection dir="rtl">
        <Text as="p">
          المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك
          التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره
          أو يتجنب الشعور بالسعادة، ولكن بفضل هؤ.
        </Text>
      </LayoutDirection>
      <p>
        Ipsum ipsa repellat doloribus magni architecto totam Laborum maxime
        ratione nobis voluptatibus facilis nostrum, necessitatibus magnam Maxime
        esse consequatur nemo sit repellat Dignissimos rem nobis hic
        reprehenderit ducimus? Fuga voluptatem?
      </p>
    </LayoutDirection>
  );
};

export const SetTextDirection = () => {
  const legendText = 'הכותרת שלי!';

  return (
    <TextDirection
      getTextDirection={(text) => {
        if (text === legendText) {
          return 'ltr';
        }
        return 'auto';
      }}>
      {/* // TODO: These radio buttons don't work. */}
      <RadioButtonGroup
        legendText={legendText}
        name="radio-button-group"
        defaultSelected="radio-1"
        style={{ maxWidth: '400px' }}>
        <RadioButton
          labelText="שלום עולם Option 1"
          value="radio-1"
          id="radio-1"
        />
        <RadioButton
          labelText="שלום עולם Option 2"
          value="radio-1"
          id="radio-1"
        />
        <RadioButton
          labelText="שלום עולם Option 3"
          value="radio-1"
          id="radio-1"
        />
      </RadioButtonGroup>
    </TextDirection>
  );
};

export const UsageExamples = () => {
  const rtlText = 'שלום!!';
  const dropdownItems = [
    {
      id: 'option-0',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 'option-1',
      text: rtlText,
    },
  ];
  return (
    <>
      <Heading>
        <Text>{rtlText}</Text>
      </Heading>
      <Button kind="ghost">
        <Text>{rtlText}</Text>
      </Button>
      <div style={{ width: 400 }}>
        {/* // TODO: This dropdown doesn't work. */}
        <Dropdown
          id="default"
          titleText="Using <Text> with `itemToElement`"
          helperText="This is some helper text"
          label="Dropdown menu options"
          items={dropdownItems}
          itemToElement={(item) => <Text>{item.text}</Text>}
        />
      </div>
      <ContentSwitcher
        helperText="Using <Text> within <Switch>"
        onChange={() => {}}>
        <Switch name="one">
          <Text>{rtlText}</Text>
        </Switch>
        <Switch name="two" text="Second section" />
        <Switch name="three" text="Third section" />
      </ContentSwitcher>
    </>
  );
};



File: Text/createTextComponent.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ElementType } from 'react';
import { Text, TextProps } from './Text';

/**
 * Create a text component wrapper for a given text node type. Useful for
 * returning a `Text` component for a text node like a `<label>`.
 * @param {string} element
 * @param {string} displayName
 */
const createTextComponent = (element: ElementType, displayName: string) => {
  const TextWrapper = (props: TextProps<ElementType>) => {
    return <Text as={element} {...props} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    TextWrapper.displayName = displayName;
  }

  return TextWrapper;
};

export const Legend = createTextComponent('legend', 'Legend');



File: Text/TextDirectionContext.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, type MutableRefObject } from 'react';

export type TextDir = 'ltr' | 'rtl' | 'auto' | string;

export type GetTextDirection = (text: string | string[] | undefined) => TextDir;

export interface TextDirectionContextType {
  direction: TextDir;
  getTextDirection: MutableRefObject<GetTextDirection | undefined>;
}

export const TextDirectionContext = createContext<TextDirectionContextType>({
  direction: 'auto',
  getTextDirection: { current: undefined },
});



File: Text/Text.mdx


import { Canvas, ArgTypes, Story, Meta } from '@storybook/addon-docs/blocks';
import * as TextStories from './Text.stories';

<Meta isTemplate />

# Text

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Text)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Text](#text)
- [Layout Direction](#layout-direction)
- [Text Direction](#text-direction)
- [Usage Examples](#usage-examples)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

You may be familiar with the `dir` or `direction` property in HTML and CSS. This
direction is commonly seen as the way to enable LTR (left to right) or RTL
(right to left) experiences on the web. However, one common misconception is
that you will want a page to always be LTR or RTL. In certain situations, you
may want the layout direction to be different than the text direction. This
series of primitive components is provided to enable the changing of directions
for individual text nodes, entire sections of your app, or to change layout
direction independently of text direction.

## Text

`Text` can be used for applying the correct `dir` attribute on a particular text
node based on the `TextDirection`, defaulting to `auto`.

<Canvas of={TextStories.Default} />

## Layout Direction

`LayoutDirection` can be used for setting the layout direction in a part of an
application.

<Canvas of={TextStories.LayoutAndText} />

## Text Direction

`TextDirection` can be used for setting the text direction in a part of an
application. It allows you to force the text direction of any particular text in
the sub-tree.

<Canvas of={TextStories.SetTextDirection} />

## Usage Examples

It is important to note that not all Carbon components will use `Text`
internally. Carbon components that accept a property of type `string` should use
`Text` internally around any usage of the property.

For components that accept properties of type `node`, such as the common
`children`, `Text` will not be used internally. You can compose `Text` within
these properties directly. This also applies to components that utilize string
transformation functions that return nodes, like `itemToElement` on `Dropdown`.
The Usage Examples story below provides some examples of how to do this with
various components.

<Canvas of={TextStories.UsageExamples} />

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Text/Text.mdx).



File: Text/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './Text';
export * from './TextDirection';
export * from './TextDirectionContext';



File: Text/TextDirection.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import {
  TextDirectionContext,
  type GetTextDirection,
  type TextDir,
  type TextDirectionContextType,
} from './TextDirectionContext';

export interface TextDirectionProps {
  children: ReactNode;
  dir?: TextDir;
  getTextDirection?: GetTextDirection;
}

export const TextDirection = ({
  children,
  dir = 'auto',
  getTextDirection,
}: TextDirectionProps) => {
  const savedCallback = useRef(getTextDirection);
  const value = useMemo<TextDirectionContextType>(() => {
    return {
      direction: dir,
      getTextDirection: savedCallback,
    };
  }, [dir]);

  useEffect(() => {
    savedCallback.current = getTextDirection;
    // TODO: Is this `useEffect` supposed to have a dependency on
    // `getTextDirection`?
  });

  return (
    <TextDirectionContext.Provider value={value}>
      {children}
    </TextDirectionContext.Provider>
  );
};

TextDirection.propTypes = {
  /**
   * Provide children to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify the text direction for rendered children
   */
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),

  /**
   * Optionally provide a custom function to get the text direction for a piece
   * of text. Whatever is returned will become the value of the `dir` attribute
   * on a node of text. Should return one of: 'ltr', 'rtl', or 'auto'
   */
  getTextDirection: PropTypes.func,
};



File: Text/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'experimental-unstable-text--default'
    }
  ]}
/>



File: Text/docs/text-direction-overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'experimental-unstable-text--set-text-direction'
    }
  ]}
/>



File: Text/Text.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  useContext,
  type ElementType,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../internal/PolymorphicProps';
import { TextDirectionContext, type TextDir } from './TextDirectionContext';

export interface TextBaseProps {
  dir?: TextDir;
  children?: ReactNode;
}

export type TextProps<T extends ElementType> = PolymorphicComponentPropWithRef<
  T,
  TextBaseProps
>;

type TextComponent = <T extends ElementType = 'span'>(
  props: TextProps<T> & { ref?: PolymorphicRef<T> }
) => ReactElement | null;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const TextBase = React.forwardRef(
  (
    {
      as,
      children,
      dir = 'auto',
      ...rest
    }: TextBaseProps & {
      as?: React.ElementType;
      dir?: 'auto' | 'ltr' | 'rtl';
    } & React.HTMLAttributes<HTMLSpanElement>,
    ref: React.Ref<HTMLSpanElement>
  ) => {
    const context = useContext(TextDirectionContext);
    const textProps: { dir?: TextDir } = {};
    const BaseComponent = as ?? 'span';
    const value = {
      ...context,
    };

    if (!context) {
      textProps.dir = dir;
      value.direction = dir;
    } else {
      const { direction: parentDirection, getTextDirection } = context;

      if (getTextDirection && getTextDirection.current) {
        const text = getTextFromChildren(children);
        const override = getTextDirection.current(text);

        if (parentDirection !== override) {
          textProps.dir = override;
          value.direction = override;
        } else if (parentDirection === 'auto') {
          textProps.dir = override;
        }
      } else if (parentDirection !== dir) {
        textProps.dir = dir;
        value.direction = dir;
      } else if (parentDirection === 'auto') {
        textProps.dir = dir;
      }
    }

    return (
      <TextDirectionContext.Provider value={value}>
        <BaseComponent ref={ref} {...rest} {...textProps}>
          {children}
        </BaseComponent>
      </TextDirectionContext.Provider>
    );
  }
) as TextComponent;
export const Text = TextBase as TextComponent;
(Text as FC).propTypes = {
  /**
   * Provide a custom element type used to render the outermost node
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements or text to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify the text direction to be used for this component and any of its
   * children
   */
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),
};

const getTextFromChildren = (children: ReactNode) => {
  if (typeof children === 'string') {
    return children;
  }

  const text = Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child;
    }
    return null;
  })?.filter((text) => {
    return text !== null;
  });

  if (text?.length === 1) {
    return text[0];
  }

  return text;
};



