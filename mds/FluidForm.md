File: FluidForm/FluidForm.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidFormStories from './FluidForm.stories';

<Meta isTemplate />


# Fluid Form

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidForm)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/form/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/form/accessibility)


{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas of={FluidFormStories.Default} />

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
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidForm/FluidForm.mdx).



File: FluidForm/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidForm from './FluidForm';

export default FluidForm;
export { FluidForm };
export { FormContext } from './FormContext';



File: FluidForm/FormContext.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

export interface FormContextProps {
  isFluid?: boolean;
}
export const FormContext = createContext<FormContextProps>({
  isFluid: false,
});



File: FluidForm/FluidForm.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import classnames from 'classnames';
import Form from '../Form';
import { FormContext } from './FormContext';
import { usePrefix } from '../../internal/usePrefix';

export type FluidFormProps = HTMLAttributes<HTMLFormElement>;

const FluidForm: React.FC<FluidFormProps> = ({
  className,
  children,
  ...other
}: FluidFormProps) => {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--form--fluid`, className);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Form className={classNames} {...other}>
        {children}
      </Form>
    </FormContext.Provider>
  );
};

FluidForm.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string,
};

export default FluidForm;



File: FluidForm/FluidForm-test.js


/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidForm from './FluidForm';
import { render, screen, fireEvent } from '@testing-library/react';

describe('FluidForm', () => {
  describe('renders as expected - Component API', () => {
    it('should render children as expected', () => {
      render(
        <FluidForm>
          <div>Text</div>
          <div>Text</div>
        </FluidForm>
      );
      expect(screen.getAllByText('Text')).toHaveLength(2);
    });

    it('should be a fluid form', () => {
      const { container } = render(<FluidForm />);
      expect(container.firstChild).toHaveClass('cds--form--fluid');
    });

    it('should spread extra props onto outermost container', () => {
      const { container } = render(<FluidForm data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<FluidForm className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle submit events', () => {
      const onSubmit = jest.fn();
      render(
        <FluidForm>
          <button className="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </FluidForm>
      );

      fireEvent.submit(screen.getByRole('button'));
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});



File: FluidForm/FluidForm.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import FluidForm from '.';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidSelect from '../FluidSelect';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import FluidTextInput from '../FluidTextInput';
import FluidTextArea from '../FluidTextArea';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
import FluidNumberInput from '../FluidNumberInput';
import ModalWrapper from '../ModalWrapper';
import mdx from './FluidForm.mdx';

const additionalProps = {
  className: 'some-class',
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const TextAreaProps = {
  className: 'some-class',
  id: 'test3',
  labelText: 'Text Area label',
  placeholder: 'Placeholder text',
};

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  value: '0000',
};

export default {
  title: 'Components/Fluid Components/FluidForm',
  component: FluidForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <FluidForm aria-label="sample form" {...additionalProps}>
      <div style={{ display: 'flex' }}>
        <FluidTimePicker
          id="time-picker-1"
          labelText="Time"
          placeholder="hh:mm">
          <FluidTimePickerSelect id="select-01" labelText="Clock">
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-02" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
        <FluidDatePicker datePickerType="range">
          <FluidDatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Choose your dates"
          />
          <FluidDatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </FluidDatePicker>
        <FluidSelect
          id="select-1"
          defaultValue="placeholder-item"
          labelText="Choose an option">
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          <SelectItemGroup label="Category 1">
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
          </SelectItemGroup>
          <SelectItemGroup label="Category 2">
            <SelectItem value="option-3" text="Option 3" />
            <SelectItem value="option-4" text="Option 4" />
          </SelectItemGroup>
        </FluidSelect>
      </div>
      <div style={{ display: 'flex' }}>
        <FluidTextInput {...TextInputProps} />
        <FluidNumberInput
          label="Number Input Label"
          labelText="Fluid Number Input"
          placeholder="Placeholder text"
          id="input-default"
          step={10}
          min={0}
          max={100}
          defaultValue={50}
        />
      </div>

      <FluidTextInput
        type="password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        {...InvalidPasswordProps}
      />
      <FluidTextArea {...TextAreaProps} />
    </FluidForm>

    <br />

    <ModalWrapper
      hasScrollingContent
      buttonTriggerText="Fluid form in modal"
      modalHeading="Modal heading"
      modalLabel="Label"
      handleSubmit={() => {}}
      size="md">
      <FluidForm {...additionalProps}>
        <FluidTextInput {...TextInputProps} />
        <FluidTextInput
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          {...InvalidPasswordProps}
        />
        <FluidTextArea {...TextAreaProps} />
      </FluidForm>
    </ModalWrapper>
  </>
);



