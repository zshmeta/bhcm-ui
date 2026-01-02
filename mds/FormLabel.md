File: FormLabel/FormLabel.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import Tooltip from '../Tooltip';
import * as FormLabelStories from './FormLabel.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# FormLabel

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FormLabel)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/form/usage)
[Accessibility](https://www.carbondesignsystem.com/components/form/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
    - [With Toggletip](#with-toggletip)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas of={FormLabelStories.Default} />

#### With Toggletip

<Canvas of={FormLabelStories.WithToggletip} />

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback through, asking questions
on Slack, or updating this file on GitHub
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FormLabel/FormLabel.mdx).



File: FormLabel/FormLabel.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import FormLabel from './FormLabel';
import { Tooltip } from '../Tooltip';
import { Information } from '@carbon/icons-react';
import { ActionableNotification } from '../Notification';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import './form-label-stories.scss';

import mdx from './FormLabel.mdx';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return <FormLabel>Form label</FormLabel>;
};

export const WithToggletip = (controls) => {
  const { align } = controls;
  return (
    <>
      <div className="form-wrapper">
        <FormLabel>Form label with Toggletip</FormLabel>
        <Toggletip align={align}>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            This can be used to provide more information about a field.
          </ToggletipContent>
        </Toggletip>
      </div>
      <ActionableNotification
        kind="info"
        hideCloseButton
        lowContrast
        inline
        className="notification"
        aria-label="Accessibility note on form labels"
        actionButtonLabel="Accessibility button note on form labels"
        title="Accessibility note">
        <p>
          <strong>Note:</strong>
          &nbsp; It is not recommended to include interactive items, such as
          links or tooltips, inside a form label for accessibility reasons. For
          this reason, we place the tooltip and toggletip as sibling components
          rather than children. You can read more about this &nbsp;
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns">
            here
          </a>
          &nbsp; and &nbsp;
          <a href="https://css-tricks.com/html-inputs-and-labels-a-love-story/#aa-dont-put-interactive-elements-inside-labels">
            here
          </a>
          .
        </p>
      </ActionableNotification>
    </>
  );
};



File: FormLabel/form-label-stories.scss


//
// Copyright IBM Corp. 2022, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.form-wrapper {
  padding-block-start: 3rem;
  padding-inline-start: 10rem;
}

.notification {
  margin-block-start: 7rem;
  margin-inline-start: 10rem;
}

.notification .cds--actionable-notification__action-button {
  display: none;
}



File: FormLabel/FormLabel.tsx


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
import { Text } from '../Text';

export interface FormLabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  /**
   * Specify the content of the form label
   */
  children?: React.ReactNode;

  /**
   * Provide a custom className to be applied to the containing <label> node
   */
  className?: string;

  /**
   * Provide a unique id for the given <FormLabel>
   */
  id?: string;
}

function FormLabel({
  className: customClassName,
  children,
  id,
  ...rest
}: FormLabelProps) {
  const prefix = usePrefix();
  const className = cx(
    `${prefix}--label`,
    `${prefix}--label--no-margin`,
    customClassName
  );

  return (
    <Text as="label" htmlFor={id} className={className} {...rest}>
      {children}
    </Text>
  );
}

FormLabel.propTypes = {
  /**
   * Specify the content of the form label
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <label> node
   */
  className: PropTypes.string,

  /**
   * Provide a unique id for the given <FormLabel>
   */
  id: PropTypes.string,
};

export default FormLabel;



File: FormLabel/FormLabel-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../FormLabel';

describe('FormLabel', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FormLabel className="test">Label</FormLabel>);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <FormLabel aria-label="test" data-testid="test">
        Label
      </FormLabel>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a unique id prop on the outermost element', () => {
    const { container } = render(<FormLabel id="test-1">Label</FormLabel>);
    expect(container.firstChild).toHaveProperty('htmlFor', 'test-1');
  });
});



File: FormLabel/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FormLabel, { type FormLabelProps } from './FormLabel';

export default FormLabel;
export { FormLabel, type FormLabelProps };



File: FormLabel/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-formlabel--default'
    }
  ]}
/>



