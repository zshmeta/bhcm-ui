File: FormGroup/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FormGroup from './FormGroup';

export default FormGroup;
export { FormGroup };



File: FormGroup/FormGroup.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as FormGroupStories from './FormGroup.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# FormGroup

[Source code](https://github.com/carbon-design-system/carbon/tree/master/packages/react/src/components/FormGroup)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/form/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/form/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FormGroupStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FormGroupStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback through, asking questions
on Slack, or updating this file on GitHub
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FormGroup/FormGroup.mdx).



File: FormGroup/FormGroup-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FormGroup from '../FormGroup';
import { render, screen } from '@testing-library/react';

describe('FormGroup', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <FormGroup className="test" legendText="legendtest" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should be set data-invalid when invalid prop is true', () => {
    const { container } = render(
      <FormGroup invalid={true} legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    expect(container.firstChild).toHaveAttribute('data-invalid', '');
  });

  it('should render legendText', () => {
    render(
      <FormGroup legendId="legend-testid" legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('legendtest')).toBeInTheDocument();
  });

  it('should set the id for legend based on legendId', () => {
    render(
      <FormGroup legendId="legend-testid" legendText="legendtest">
        FormGroup Test
      </FormGroup>
    );

    expect(screen.getByText('legendtest')).toHaveAttribute(
      'id',
      'legend-testid'
    );
  });

  it('should display messageText if message is true', () => {
    render(
      <FormGroup
        legendId="legend-testid"
        legendText="legendtest"
        message={true}
        messageText="Message text">
        FormGroup Test
      </FormGroup>
    );

    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('Message text')).toBeInTheDocument();
  });

  it('should not display the messageText if message is false', () => {
    render(
      <FormGroup
        legendId="legend-testid"
        legendText="legendtest"
        message={false}
        messageText="Message text">
        FormGroup Test
      </FormGroup>
    );

    expect(screen.queryByText('Message text')).not.toBeInTheDocument();
  });
});



File: FormGroup/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-formgroup--default',
    },
  ]}
/>



File: FormGroup/FormGroup.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface FormGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: React.ReactNode;
  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className?: string;
  /**
   * Specify whether the FormGroup should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the <FormGroup> is invalid
   */
  invalid?: boolean;
  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  legendId?: string;
  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: React.ReactNode;

  /**
   * Specify whether the message should be displayed in the <FormGroup>
   */
  message?: boolean;
  /**
   * Provide the text for the message in the <FormGroup>
   */
  messageText?: string;
}

const FormGroup = ({
  disabled = false,
  legendId,
  legendText,
  invalid = false,
  children,
  className,
  message = false,
  messageText = '',
  ...rest
}: FormGroupProps) => {
  const prefix = usePrefix();

  const classNamesFieldset = cx(`${prefix}--fieldset`, className);

  return (
    <fieldset
      disabled={disabled}
      {...(invalid && { 'data-invalid': '' })}
      className={classNamesFieldset}
      {...rest}
      aria-labelledby={rest['aria-labelledby'] || legendId}>
      <legend
        className={`${prefix}--label`}
        id={legendId || rest['aria-labelledby']}>
        {legendText}
      </legend>
      {children}
      {message ? (
        <div className={`${prefix}--form__requirements`}>{messageText}</div>
      ) : null}
    </fieldset>
  );
};

FormGroup.propTypes = {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the FormGroup should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the <FormGroup> is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  legendId: PropTypes.node,

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: PropTypes.node.isRequired,

  /**
   * Specify whether the message should be displayed in the <FormGroup>
   */
  message: PropTypes.bool,

  /**
   * Provide the text for the message in the <FormGroup>
   */
  messageText: PropTypes.string,
};

export default FormGroup;



File: FormGroup/FormGroup.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormGroup } from '../FormGroup';
import TextInput from '../TextInput';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import Button from '../Button';
import { Stack } from '../Stack';

import mdx from './FormGroup.mdx';

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['legendId', 'invalid'],
    },
  },
};

export const Default = (args) => {
  return (
    <FormGroup style={{ maxWidth: '400px' }} {...args}>
      <Stack gap={7}>
        <TextInput id="one" labelText="First Name" />
        <TextInput id="two" labelText="Last Name" />
        <RadioButtonGroup
          legendText="Radio button heading"
          name="formgroup-default-radio-button-group"
          defaultSelected="radio-1">
          <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
          <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
          <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
        </RadioButtonGroup>
        <Button>Submit</Button>
      </Stack>
    </FormGroup>
  );
};

Default.argTypes = {
  legendId: {
    control: {
      type: 'text',
    },
  },
  legendText: {
    control: {
      type: 'text',
    },
  },
  message: {
    control: {
      type: 'boolean',
    },
  },
  messageText: {
    control: {
      type: 'text',
    },
  },
};

Default.args = {
  legendId: 'form-group-1',
  legendText: 'FormGroup Legend',
  message: false,
};



