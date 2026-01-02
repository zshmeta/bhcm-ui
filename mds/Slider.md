File: Slider/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as Slider } from './Slider';
export { default as SliderSkeleton } from './Slider.Skeleton';



File: Slider/SliderHandles.tsx


/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PrefixContext } from '../../internal/usePrefix';
import React from 'react';

export const LowerHandle = (props) => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower`}
        {...props}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const LowerHandleFocus = (props) => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower ${prefix}--slider__thumb-icon--focus`}
        {...props}>
        <path d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M15.08 0H16v6.46h-.92z" />
        <path d="M0 0h.92v24H0zM15.08 0H16v24h-.92z" />
        <path d="M0 .92V0h16v.92zM0 24v-.92h16V24z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const UpperHandle = (props) => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper`}
        {...props}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);

export const UpperHandleFocus = (props) => (
  <PrefixContext.Consumer>
    {(prefix) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 24"
        className={`${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper ${prefix}--slider__thumb-icon--focus`}
        {...props}>
        <path d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z" />
        <path fill="none" d="M-4 0h24v24H-4z" />
        <path d="M.92 24H0v-6.46h.92z" />
        <path d="M16 24h-.92V0H16zM.92 24H0V0h.92z" />
        <path d="M16 23.08V24H0v-.92zM16 0v.92H0V0z" />
      </svg>
    )}
  </PrefixContext.Consumer>
);



File: Slider/__test__/SliderSkeleton-test.js


/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SliderSkeleton from '../Slider.Skeleton';

describe('SliderSkeleton', () => {
  describe('behaves as expected - Component API', () => {
    it('should apply the expected classes', () => {
      const { container } = render(<SliderSkeleton />);
      expect(container.firstChild.firstChild).toHaveClass(
        'cds--label cds--skeleton'
      );
    });

    it('should pass custom class via className', () => {
      const customSliderClass = 'slider-custom-class';
      const { container } = render(
        <SliderSkeleton twoHandles={true} className={customSliderClass} />
      );
      expect(container.firstChild).toHaveClass(customSliderClass);
    });

    it('renders without label when hideLabel is true', () => {
      const { container } = render(<SliderSkeleton hideLabel={true} />);
      const label = container.querySelector('.cds--label.cds--skeleton');
      expect(label).not.toBeInTheDocument();
    });

    describe('Accessibility labels', () => {
      it('applies default aria labels', () => {
        render(<SliderSkeleton twoHandles={true} />);
        const lowerHandle = screen.getByLabelText('slider handle');
        const upperHandle = screen.getByLabelText('upper slider handle');
        expect(lowerHandle).toBeInTheDocument();
        expect(upperHandle).toBeInTheDocument();
      });

      it('allows custom aria labels', () => {
        render(
          <SliderSkeleton
            twoHandles={true}
            ariaLabel="Custom Lower Handle"
            unstable_ariaLabelHandleUpper="Custom Upper Handle"
          />
        );
        const lowerHandle = screen.getByLabelText('Custom Lower Handle');
        const upperHandle = screen.getByLabelText('Custom Upper Handle');
        expect(lowerHandle).toBeInTheDocument();
        expect(upperHandle).toBeInTheDocument();
      });
    });
  });
});



File: Slider/__test__/Slider-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Slider from '../Slider';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

const prefix = 'cds';
const inputAriaValue = 'slider-input-aria-label-value';
const initialValue = 50;
const initialValueLower = 10;
const initialValueUpper = 90;
const defaultSliderValue = 1;
const defaultSliderValueUpper = 3;
const defaultMin = 1;
const defaultMax = 3;
const defaultStep = 1;
const defaultAriaLabelInput = 'Lower bound';
const defaultAriaLabelInputUpper = 'Upper bound';
const onBlur = jest.fn();
const onChange = jest.fn();
const onClick = jest.fn();
const onRelease = jest.fn();
const onKeyDown = jest.fn();

const renderSlider = ({
  value = defaultSliderValue,
  min = defaultMin,
  max = defaultMax,
  step = defaultStep,
  ...rest
} = {}) =>
  render(
    <Slider
      labelText="Slider"
      value={value}
      min={min}
      max={max}
      step={step}
      invalidText="Invalid"
      warnText="Warning"
      {...rest}
    />
  );

const renderTwoHandleSlider = ({
  unstable_valueUpper = defaultSliderValueUpper,
  ariaLabelInput = defaultAriaLabelInput,
  unstable_ariaLabelInputUpper = defaultAriaLabelInputUpper,
  ...rest
} = {}) =>
  renderSlider({
    unstable_valueUpper,
    ariaLabelInput,
    unstable_ariaLabelInputUpper,
    ...rest,
  });

describe('Slider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('behaves as expected - Component API', () => {
    it('should render children as expected', () => {
      renderSlider({ ariaLabelInput: inputAriaValue });
      expect(screen.getByLabelText(inputAriaValue)).toBeInTheDocument();
    });

    it('should apply the expected classes', () => {
      const labelTextValue = 'slider label text';
      const { container } = renderSlider({ labelText: labelTextValue });
      expect(screen.getByRole('slider')).toHaveClass(
        `${prefix}--slider__thumb`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--form-item`);
      expect(
        screen.getByLabelText(labelTextValue, { selector: 'input' })
      ).toBeInTheDocument();
    });

    it('should render extra classes passed in via className', () => {
      const customSliderClass = 'slider-custom-class';
      const { container } = renderSlider({ className: customSliderClass });
      expect(container.firstChild).toHaveClass(customSliderClass);
    });

    it('should be able to apply a disabled state', () => {
      renderSlider({ disabled: true, ariaLabelInput: inputAriaValue });
      expect(screen.getByLabelText(inputAriaValue)).toBeDisabled();
      expect(screen.getByRole('presentation')).toHaveClass(
        `${prefix}--slider--disabled`
      );
    });

    it('should be able to apply a warning state', () => {
      renderSlider({
        warn: true,
        ariaLabelInput: inputAriaValue,
        warnText: 'Warning message',
      });
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should be able to apply an invalid state', () => {
      renderSlider({
        invalid: true,
        ariaLabelInput: inputAriaValue,
        invalidText: 'Error message',
      });
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should be able to set value via props', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      const wrapperElement = screen.getByRole('presentation');
      expect(parseInt(inputElement.getAttribute('value'))).toEqual(
        initialValue
      );
      expect(parseInt(wrapperElement.getAttribute('value'))).toEqual(
        initialValue
      );
    });

    it('should change the value upon interacting with the slider', async () => {
      const { keyboard, click } = userEvent;
      renderSlider({
        onClick,
        onChange,
      });
      // Click events should fire
      const theSlider = screen.getByRole('slider');
      await click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);
      await keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith({ value: 2 });
    });

    it('should accurately position slider on mount', () => {
      const { container } = renderSlider({ value: 50, max: 100, min: 0 });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const sliderWrapper = container.querySelector(
        `.${prefix}--slider__thumb-wrapper`
      );
      expect(sliderWrapper).toHaveStyle({
        insetInlineStart: '50%',
      });
    });

    it('marks input field as hidden if hidden via props', () => {
      const { container } = renderSlider({
        ariaLabelInput: inputAriaValue,
        hideTextInput: true,
      });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const inputElement = container.querySelector(
        `.${prefix}--text-input.${prefix}--slider-text-input`
      );
      expect(inputElement).toHaveAttribute('type', 'hidden');
    });

    it('allows user to set invalid value when typing in input field', async () => {
      const { type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
        onChange,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      const slider = screen.getByRole('slider');

      await userEvent.clear(inputElement);
      await type(inputElement, '999');
      expect(parseInt(slider.getAttribute('aria-valuenow'))).toEqual(999);
      expect(onChange).toHaveBeenLastCalledWith({ value: 999 });
    });

    it('sets correct state when typing a valid value in input field', async () => {
      const { type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
        onChange,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);

      await userEvent.clear(inputElement);
      await type(inputElement, '12');
      expect(onChange).toHaveBeenLastCalledWith({ value: 12 });
    });

    it('should check for auto-correct on the input', async () => {
      const { type, tab } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        value: initialValue,
        max: 100,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      await tab(); // Brings focus to slider
      await tab(); // Brings focus to input
      await type(inputElement, '{selectall}101');
      await tab(); // Need to tab away from input for invalid class to be applied
      expect(inputElement).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(parseInt(inputElement.getAttribute('value'))).toEqual(100);
    });

    it('should apply the given id to the element with role of slider', () => {
      const testId = 'slider-test-custom-id';
      renderSlider({ id: testId });
      expect(screen.getByRole('slider').id).toEqual(testId);
    });

    it('should apply a custom input type', () => {
      const customInputType = 'text';
      renderSlider({
        ariaLabelInput: inputAriaValue,
        inputType: customInputType,
      });
      expect(screen.getByLabelText(inputAriaValue).type).toEqual(
        customInputType
      );
    });

    it('should apply a custom input name', () => {
      const customInputName = 'Custom input name value';
      renderSlider({ ariaLabelInput: inputAriaValue, name: customInputName });
      expect(screen.getByLabelText(inputAriaValue).name).toEqual(
        customInputName
      );
    });

    it('should mark an empty input as invalid when using the required prop', async () => {
      const customInputName = 'Custom input name value';
      const { tab, type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        name: customInputName,
        required: true,
      });
      const inputElement = screen.getByLabelText(inputAriaValue);
      await tab(); // Brings focus to slider
      await tab(); // Brings focus to input
      await type(inputElement, '{selectall}{backspace}');
      await tab();
      expect(inputElement).toHaveClass(`${prefix}--text-input--invalid`);
    });

    it('should respect readOnly prop', async () => {
      const { click, type } = userEvent;
      renderSlider({
        ariaLabelInput: inputAriaValue,
        onClick,
        onChange,
        readOnly: true,
      });

      // Click events should fire
      const theSlider = screen.getByRole('slider');
      await click(theSlider);
      expect(onClick).toHaveBeenCalledTimes(1);
      await type(theSlider, '{ArrowRight}');
      const theInput = screen.getByRole('spinbutton');
      await type(theInput, '{selectall}3');
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should not have warning if disabled', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        disabled: true,
        warn: true,
        warnText: 'Warning message',
      });
      const sliderInput = screen.getByRole('spinbutton');
      const warnMessage = screen.queryByText('Warning message');
      expect(sliderInput).not.toHaveAttribute('data-invalid', 'true');
      expect(sliderInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(warnMessage).not.toBeInTheDocument();
    });

    it('should not have warning if readOnly', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        readOnly: true,
        warn: true,
        warnText: 'Warning message',
      });
      const sliderInput = screen.getByRole('spinbutton');
      const warnMessage = screen.queryByText('Warning message');
      expect(sliderInput).not.toHaveAttribute('data-invalid', 'true');
      expect(sliderInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(warnMessage).not.toBeInTheDocument();
    });

    it('should not be invalid if disabled', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        disabled: true,
        invalid: true,
        invalidText: 'Error message',
      });
      const sliderInput = screen.getByRole('spinbutton');
      expect(sliderInput).not.toHaveAttribute('data-invalid', 'true');
      expect(sliderInput).not.toHaveAttribute('aria-invalid', 'true');
      const invalidMessage = screen.queryByText('Error message');
      expect(invalidMessage).not.toBeInTheDocument();
    });

    it('should not be invalid if readOnly', () => {
      renderSlider({
        ariaLabelInput: inputAriaValue,
        readOnly: true,
        invalid: true,
        invalidText: 'Error message',
      });
      const sliderInput = screen.getByRole('spinbutton');
      expect(sliderInput).not.toHaveAttribute('data-invalid', 'true');
      expect(sliderInput).not.toHaveAttribute('aria-invalid', 'true');
      const invalidMessage = screen.queryByText('Error message');
      expect(invalidMessage).not.toBeInTheDocument();
    });

    describe('Error handling, expected behavior from event handlers', () => {
      it('handles non-number typed into input field', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: initialValue,
          max: 100,
          onChange,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it.skip('gracefully tolerates empty event passed to _onDrag', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          ariaLabelInput: inputAriaValue,
          value: 1,
          max: 100,
          onChange,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(theSlider);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('gracefully tolerates empty event passed to onChange', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: initialValue,
          max: 100,
          onChange,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should call onBlur as expected', async () => {
        const { type, tab } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          value: 10,
          max: 100,
          onBlur,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{Space}');
        await tab(); // Brings focus out of input
        expect(onBlur).toHaveBeenCalledTimes(2);
      });

      it('should call onKeyDown as expected', async () => {
        const { type, click } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          onKeyDown,
        });
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        await type(theSlider, '{ArrowRight}');
        await type(theSlider, '{ArrowRight}');
        expect(onKeyDown).toHaveBeenCalledTimes(2);
      });

      it('should call onKeyDown and properly handle the stepMultiplier prop', async () => {
        const { keyboard, click } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange,
          stepMultiplier: 10,
        });
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        await keyboard('{Shift>}{ArrowRight}{/Shift}');
        expect(onChange).toHaveBeenLastCalledWith({
          value: 11,
        });
      });

      it('should gracefully handle non-numeric keys', async () => {
        const { tab, type } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange,
          stepMultiplier: 10,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Disabled state', () => {
      it('should do nothing when trying to type in the input', async () => {
        const { tab, type } = userEvent;
        renderSlider({
          ariaLabelInput: inputAriaValue,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const inputElement = screen.getByLabelText(inputAriaValue);
        await tab(); // Brings focus to slider
        await tab(); // Brings focus to input
        await type(inputElement, '1');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should do nothing when trying to drag', () => {
        const { mouseDown, mouseMove, mouseUp } = fireEvent;
        const { container } = renderSlider({
          onChange,
          ariaLabelInput: inputAriaValue,
          max: 100,
          disabled: true,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 0 });
        expect(onChange).not.toHaveBeenCalled();
        mouseMove(container.firstChild, { clientX: 0 });
        expect(onChange).not.toHaveBeenCalled();
        mouseUp(theSlider);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should not change slider value when using arrow key', async () => {
        const { click, type } = userEvent;
        renderSlider({ disabled: true });
        const slider = screen.getByRole('slider');
        await click(slider);
        await type(slider, '{ArrowRight}');
        expect(parseInt(slider.getAttribute('aria-valuenow'))).toEqual(
          defaultSliderValue
        );
      });
    });

    describe('Supporting label', () => {
      it('concatenates the value and the label by default', () => {
        const { container } = renderSlider({
          min: 0,
          minLabel: 'min',
          max: 100,
          maxLabel: 'max',
          value: 50,
        });
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const rangeLabels = container.querySelectorAll(
          `.${prefix}--slider__range-label`
        );
        expect(rangeLabels[0]).toHaveTextContent('0min');
        expect(rangeLabels[1]).toHaveTextContent('100max');
      });

      it('supports custom formatting of the label', () => {
        const { container } = renderSlider({
          min: 0,
          minLabel: 'min',
          max: 100,
          maxLabel: 'max',
          value: 50,
          formatLabel: (value, label) => `${value}-${label}`,
        });
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const rangeLabels = container.querySelectorAll(
          `.${prefix}--slider__range-label`
        );
        expect(rangeLabels[0]).toHaveTextContent('0-min');
        expect(rangeLabels[1]).toHaveTextContent('100-max');
      });

      it('supports custom formatting on the tooltip when input is hidden', () => {
        const { container } = renderSlider({
          min: 0,
          max: 100,
          value: 50,
          formatLabel: (value) => `${value}%`,
          hideTextInput: true,
        });

        const rangeLabels = container.querySelectorAll(
          `.${prefix}--slider__range-label`
        );

        const valueLabel = container.querySelector(
          `.${prefix}--popover-content.${prefix}--tooltip-content`
        );

        expect(rangeLabels[0]).toHaveTextContent('0%');
        expect(rangeLabels[1]).toHaveTextContent('100%');
        expect(valueLabel).toHaveTextContent('50%');
      });
    });

    describe('Key/mouse event processing', () => {
      it('sets correct state from event with arrow keys', async () => {
        const { type, click } = userEvent;
        renderSlider({
          onClick,
          onChange,
          min: 0,
          max: 100,
        });
        // Click events should fire
        const theSlider = screen.getByRole('slider');
        await click(theSlider);
        expect(onClick).toHaveBeenCalledTimes(1);
        await type(theSlider, '{ArrowRight}');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 2,
        });
        await type(theSlider, '{ArrowLeft}');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
        });
        await type(theSlider, '{ArrowUp}');
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 2,
        });
        await type(theSlider, '{ArrowDown}');
        expect(onChange).toHaveBeenCalledTimes(4);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 1,
        });
      });

      it('sets correct state from event with a clientX in a mousemove', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onChange,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(theSlider);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 100,
        });
      });

      it('should call release', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onRelease,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(theSlider);
        expect(onRelease).toHaveBeenCalled();
      });

      it('should not call onRelease', () => {
        const { mouseDown, mouseMove } = fireEvent;
        const { container } = renderSlider({
          onRelease,
          min: 0,
          max: 100,
        });
        const theSlider = screen.getByRole('slider');
        mouseDown(theSlider, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();
      });
    });
  });

  describe('behaves as expected - Two Handle Slider Component API', () => {
    it('should render children as expected', () => {
      renderTwoHandleSlider();
      const lowerElems = screen.getAllByLabelText(defaultAriaLabelInput);
      expect(lowerElems).toHaveLength(4);
      const upperElems = screen.getAllByLabelText(defaultAriaLabelInputUpper);
      expect(upperElems).toHaveLength(4);
    });

    it('should apply the expected classes', () => {
      const { container } = renderTwoHandleSlider();

      expect(container.firstChild).toHaveClass(`${prefix}--form-item`);

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      [lowerThumb, upperThumb].forEach((elem) => {
        expect(elem).toHaveClass(`${prefix}--slider__thumb`);
      });
      expect(lowerThumb).toHaveClass(`${prefix}--slider__thumb--lower`);
      expect(upperThumb).toHaveClass(`${prefix}--slider__thumb--upper`);

      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      [lowerInput, upperInput].forEach((elem) =>
        expect(elem).toHaveClass(
          `${prefix}--text-input`,
          `${prefix}--slider-text-input`
        )
      );
      expect(lowerInput).toHaveClass(`${prefix}--slider-text-input--lower`);
      expect(upperInput).toHaveClass(`${prefix}--slider-text-input--upper`);
    });

    it('should be able to apply a disabled state', () => {
      renderTwoHandleSlider({ disabled: true });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      [lowerInput, upperInput].forEach((elem) => expect(elem).toBeDisabled());
    });

    it('should be able to apply a warning state', () => {
      renderTwoHandleSlider({
        warn: true,
        warnText: 'Warning message',
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
      });
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should be able to apply an invalid state', () => {
      renderTwoHandleSlider({
        invalid: true,
        invalidText: 'Error message',
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
      });
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should be able to set value via props', () => {
      renderTwoHandleSlider({
        ariaLabelInput: 'Lower bound',
        unstable_ariaLabelInputUpper: 'Upper bound',
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
      });
      const lowerInput = screen.getByLabelText(/lower bound/i, {
        selector: 'input',
      });
      const lowerSlider = screen.getByLabelText(/lower bound/i, {
        selector: '[role=slider]',
      });
      const upperInput = screen.getByLabelText(/upper bound/i, {
        selector: 'input',
      });
      const upperSlider = screen.getByLabelText(/upper bound/i, {
        selector: '[role=slider]',
      });

      expect(parseInt(lowerInput.getAttribute('value'))).toEqual(
        initialValueLower
      );
      expect(parseInt(lowerSlider.getAttribute('aria-valuenow'))).toEqual(
        initialValueLower
      );
      expect(parseInt(upperInput.getAttribute('value'))).toEqual(
        initialValueUpper
      );
      expect(parseInt(upperSlider.getAttribute('aria-valuenow'))).toEqual(
        initialValueUpper
      );
    });

    it('should change the value upon interacting with the slider', async () => {
      const { keyboard, click } = userEvent;
      renderTwoHandleSlider({
        onClick,
        onChange,
        value: 10,
        unstable_valueUpper: 90,
        min: 0,
        max: 100,
      });

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      // Keyboard interactions on the lower thumb.
      await click(lowerThumb);
      expect(lowerThumb).toHaveFocus();
      expect(onClick).toHaveBeenCalledTimes(1);
      await keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 11, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '11');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '11');
      expect(lowerInput).toHaveValue(11);
      await keyboard('{ArrowLeft}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '10');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '10');
      expect(lowerInput).toHaveValue(10);
      await keyboard('{Shift>}{ArrowRight}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 14, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '14');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '14');
      expect(lowerInput).toHaveValue(14);
      await keyboard('{Shift>}{ArrowLeft}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 90 });
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '10');
      expect(upperThumb).toHaveAttribute('aria-valuemin', '10');
      expect(lowerInput).toHaveValue(10);

      // Keyboard interactions on the upper thumb, lets mix it up and do the up
      // and down arrow keys this time.
      // Note: Somewhat unintuitively, a click on the upperThumb in the moves it
      // as close to the lowerThumb as possible. This is because the elements
      // in Jest don't exist in a specific position, layer and size.
      // @see https://testing-library.com/docs/user-event/pointer
      await click(upperThumb);
      expect(upperThumb).toHaveFocus();
      await keyboard('{ArrowUp}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 11 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '11');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '11');
      expect(upperInput).toHaveValue(11);
      await keyboard('{ArrowDown}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 10 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '10');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '10');
      expect(upperInput).toHaveValue(10);
      await keyboard('{Shift>}{ArrowUp}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 14 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '14');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '14');
      expect(upperInput).toHaveValue(14);
      await keyboard('{Shift>}{ArrowDown}{/Shift}');
      expect(onChange).toHaveBeenLastCalledWith({ value: 10, valueUpper: 10 });
      expect(upperThumb).toHaveAttribute('aria-valuenow', '10');
      expect(lowerThumb).toHaveAttribute('aria-valuemax', '10');
      expect(upperInput).toHaveValue(10);
    });

    it('should accurately position handles on mount', () => {
      const { container } = renderTwoHandleSlider({
        value: 50,
        unstable_valueUpper: 50,
        min: 0,
        max: 100,
      });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const sliderWrapperLower = container.querySelector(
        `.${prefix}--slider__thumb-wrapper--lower`
      );
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const sliderWrapperUpper = container.querySelector(
        `.${prefix}--slider__thumb-wrapper--upper`
      );
      expect(sliderWrapperLower).toHaveStyle({ insetInlineStart: '50%' });
      expect(sliderWrapperUpper).toHaveStyle({ insetInlineStart: '50%' });
    });

    it('marks input field as hidden if hidden via props', () => {
      const { container } = renderTwoHandleSlider({
        hideTextInput: true,
      });
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const [lowerInput, upperInput] = container.querySelectorAll(
        `.${prefix}--text-input.${prefix}--slider-text-input`
      );
      expect(lowerInput).toHaveAttribute('type', 'hidden');
      expect(upperInput).toHaveAttribute('type', 'hidden');
    });

    it('supports custom formatting on the tooltip when input is hidden', () => {
      const { container } = renderTwoHandleSlider({
        min: 0,
        max: 100,
        value: 50,
        unstable_valueUpper: 70,
        formatLabel: (value) => `${value}%`,
        hideTextInput: true,
      });

      const rangeLabels = container.querySelectorAll(
        `.${prefix}--slider__range-label`
      );

      const valueLabels = container.querySelectorAll(
        `.${prefix}--popover-content.${prefix}--tooltip-content`
      );

      expect(rangeLabels[0]).toHaveTextContent('0%');
      expect(rangeLabels[1]).toHaveTextContent('100%');
      expect(valueLabels[0]).toHaveTextContent('50%');
      expect(valueLabels[1]).toHaveTextContent('70%');
    });

    it('allows user to set invalid value when typing in input field', async () => {
      const { type } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const [lowerThumb] = screen.getAllByRole('slider');

      await userEvent.clear(lowerInput);
      await type(lowerInput, '999');
      expect(parseInt(lowerThumb.getAttribute('aria-valuenow'))).toEqual(999);
      expect(onChange).toHaveBeenLastCalledWith({
        value: 999,
        valueUpper: initialValueUpper,
      });
    });

    it('sets correct state when typing a valid value in input field', async () => {
      const { type, clear } = userEvent;
      renderTwoHandleSlider({
        value: initialValue,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });

      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      await clear(lowerInput);
      await type(lowerInput, '12');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 12,
        valueUpper: initialValueUpper,
      });

      await clear(upperInput);
      await type(upperInput, '60');
      expect(onChange).toHaveBeenLastCalledWith({ value: 12, valueUpper: 60 });
    });

    it('should check for auto-correct on the input', async () => {
      const { type, tab, keyboard, clear } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        min: 0,
        max: 100,
        onChange,
      });

      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      // Test the lower input by tabbing away to trigger autocorrect.
      await clear(lowerInput);
      await type(lowerInput, '999');
      await tab();
      expect(lowerThumb).toHaveAttribute('aria-valuenow', '90');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 90,
        valueUpper: initialValueUpper,
      });
      expect(lowerInput).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(lowerInput).toHaveValue(90);

      // Test the upper input by hitting Enter to trigger autocorrect.
      await clear(upperInput);
      await type(upperInput, '999');
      await keyboard('{Enter}');
      expect(upperThumb).toHaveAttribute('aria-valuenow', '100');
      expect(onChange).toHaveBeenLastCalledWith({
        value: 90,
        valueUpper: 100,
      });
      expect(upperInput).not.toHaveClass(`${prefix}--text-input--invalid`);
      expect(upperInput).toHaveValue(100);
    });

    it('should not apply the given id to the elements with role of slider', () => {
      const testId = 'slider-test-custom-id';
      renderTwoHandleSlider({ id: testId });
      const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
      expect(lowerThumb).not.toHaveAttribute('id');
      expect(upperThumb).not.toHaveAttribute('id');
    });

    it('should apply a custom input type', () => {
      const customInputType = 'text';
      renderTwoHandleSlider({
        inputType: customInputType,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      expect(lowerInput).toHaveAttribute('type', customInputType);
      expect(upperInput).toHaveAttribute('type', customInputType);
    });

    it('should apply a custom input name', () => {
      const customInputNameLower = 'myLowerBound';
      const customInputNameUpper = 'myUpperBound';
      renderTwoHandleSlider({
        name: customInputNameLower,
        unstable_nameUpper: customInputNameUpper,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      expect(lowerInput).toHaveAttribute('name', customInputNameLower);
      expect(upperInput).toHaveAttribute('name', customInputNameUpper);
    });

    it('should mark an empty input as invalid when using the required prop', async () => {
      const { tab, clear } = userEvent;
      renderTwoHandleSlider({
        required: true,
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });

      expect(lowerInput).toBeRequired();
      expect(upperInput).toBeRequired();
      await clear(lowerInput);
      await tab();
      expect(lowerInput).toHaveClass(`${prefix}--text-input--invalid`);
    });

    it('should respect readOnly prop', async () => {
      const { click, keyboard, type } = userEvent;
      renderTwoHandleSlider({
        value: initialValueLower,
        unstable_valueUpper: initialValueUpper,
        onClick,
        onChange,
        readOnly: true,
      });

      // Click events should fire
      const [lowerThumb] = screen.getAllByRole('slider');
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });

      await click(lowerThumb);
      await keyboard('{ArrowRight}');
      expect(lowerThumb).not.toHaveFocus();
      expect(lowerInput).toHaveValue(initialValueLower);
      expect(lowerThumb).toHaveAttribute(
        'aria-valuenow',
        `${initialValueLower}`
      );
      await type(lowerInput, '{selectall}20');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should allow upper handle to reach `max` when `max` is not divisible by `step`', () => {
      const { mouseDown, mouseMove, mouseUp } = fireEvent;
      const { container } = renderTwoHandleSlider({
        value: 0,
        unstable_valueUpper: 400,
        min: 0,
        max: 435,
        step: 50,
        onChange,
      });
      const upperHandle = screen.getAllByRole('slider')[1];

      // Simulate dragging the upper handle far to the right.
      mouseDown(upperHandle, { clientX: 10 });
      mouseMove(container.firstChild, { clientX: 1000 });
      mouseUp(upperHandle);

      // `onChange` should be called with the upper value equal to `max`.
      expect(onChange).toHaveBeenLastCalledWith({
        value: 0,
        valueUpper: 435,
      });
    });

    it('should not display warn if disabled', () => {
      renderTwoHandleSlider({
        disabled: true,
        warn: true,
        warnText: 'Warning message',
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      const warnMessage = screen.queryByText('Warning message');
      expect(warnMessage).not.toBeInTheDocument();
      expect(lowerInput).not.toHaveAttribute('data-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('data-invalid', 'true');
      expect(lowerInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should not display warn if readOnly', () => {
      renderTwoHandleSlider({
        readOnly: true,
        warn: true,
        warnText: 'Warning message',
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      const warnMessage = screen.queryByText('Warning message');
      expect(warnMessage).not.toBeInTheDocument();
      expect(lowerInput).not.toHaveAttribute('data-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('data-invalid', 'true');
      expect(lowerInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should not display invalid message if disabled', () => {
      renderTwoHandleSlider({
        disabled: true,
        invalid: true,
        invalidText: 'Error message',
      });
      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      const invalidMessage = screen.queryByText('Error message');
      expect(invalidMessage).not.toBeInTheDocument();
      expect(lowerInput).not.toHaveAttribute('data-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('data-invalid', 'true');
      expect(lowerInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should not display invalid message if readOnly', () => {
      renderTwoHandleSlider({
        readOnly: true,
        invalid: true,
        invalidText: 'Error message',
      });

      const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
        selector: 'input',
      });
      const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
        selector: 'input',
      });
      const invalidMessage = screen.queryByText('Error message');
      expect(invalidMessage).not.toBeInTheDocument();
      expect(lowerInput).not.toHaveAttribute('data-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('data-invalid', 'true');
      expect(lowerInput).not.toHaveAttribute('aria-invalid', 'true');
      expect(upperInput).not.toHaveAttribute('aria-invalid', 'true');
    });

    describe('Error handling, expected behavior from event handlers', () => {
      it('handles non-number typed into input field', async () => {
        const { type, tab } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onChange).not.toHaveBeenCalled();
      });

      it('gracefully tolerates empty event passed to _onDrag', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(lowerThumb);
        expect(onChange).not.toHaveBeenCalled();
        mouseDown(upperThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(upperThumb);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should call onBlur as expected', async () => {
        const { type, tab } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onBlur,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        await type(lowerInput, '{Space}');
        await tab(); // Brings focus out of input
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      it('should call onKeyDown as expected', async () => {
        const { click, keyboard } = userEvent;
        renderTwoHandleSlider({
          onKeyDown,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        await click(lowerThumb);
        await keyboard('{ArrowRight}');
        await keyboard('{ArrowRight}');
        await click(upperThumb);
        await keyboard('{ArrowLeft}');
        await keyboard('{ArrowLeft}');
        expect(onKeyDown).toHaveBeenCalledTimes(4);
      });

      it('should gracefully handle non-numeric keys', async () => {
        const { type } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
          inputType: 'text',
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '{selectall}a');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('Disabled state', () => {
      it('should do nothing when trying to type in the input', async () => {
        const { type } = userEvent;
        renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const lowerInput = screen.getByLabelText(defaultAriaLabelInput, {
          selector: 'input',
        });
        const upperInput = screen.getByLabelText(defaultAriaLabelInputUpper, {
          selector: 'input',
        });
        await type(lowerInput, '1');
        expect(onChange).not.toHaveBeenCalled();
        await type(upperInput, '99');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should do nothing when trying to drag', () => {
        const { mouseDown, mouseMove, mouseUp } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange: onChange,
          disabled: true,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(lowerThumb);
        mouseDown(upperThumb, { clientX: 0 });
        mouseMove(container.firstChild, { clientX: 0 });
        mouseUp(upperThumb);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('should not change slider value when using arrow key', async () => {
        const { click, type } = userEvent;
        renderTwoHandleSlider({ disabled: true });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        await click(lowerThumb);
        await type(lowerThumb, '{ArrowRight}');
        expect(lowerThumb).toHaveAttribute(
          'aria-valuenow',
          `${defaultSliderValue}`
        );
        await click(upperThumb);
        await type(upperThumb, '{ArrowLeft}');
        expect(upperThumb).toHaveAttribute(
          'aria-valuenow',
          `${defaultSliderValueUpper}`
        );
      });
    });

    describe('Key/mouse event processing', () => {
      it('sets correct state from event with a clientX in a mousemove', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          value: initialValueLower,
          unstable_valueUpper: initialValueUpper,
          min: 0,
          max: 100,
          onChange,
        });
        const [lowerThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 100 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(lowerThumb);
        expect(onChange).toHaveBeenLastCalledWith({
          value: 90,
          valueUpper: initialValueUpper,
        });
      });

      it('should call release', () => {
        const { mouseDown, mouseUp, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          onRelease,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(lowerThumb);
        expect(onRelease).toHaveBeenCalledTimes(1);
        mouseDown(upperThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        mouseUp(upperThumb);
        expect(onRelease).toHaveBeenCalledTimes(2);
      });

      it('should not call onRelease', () => {
        const { mouseDown, mouseMove } = fireEvent;
        const { container } = renderTwoHandleSlider({
          onRelease,
        });
        const [lowerThumb, upperThumb] = screen.getAllByRole('slider');
        mouseDown(lowerThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();

        mouseDown(upperThumb, { clientX: 10 });
        mouseMove(container.firstChild, { clientX: 1000 });
        expect(onRelease).not.toHaveBeenCalled();
      });

      it("should round the slider's value when using small step values", async () => {
        const { keyboard, click } = userEvent;

        renderTwoHandleSlider({
          value: 0,
          min: 0,
          max: 1,
          step: 0.1,
          onChange,
        });
        const leftHandle = screen.getAllByRole('slider')[0];

        await click(leftHandle);
        await keyboard('{ArrowRight}');
        await keyboard('{ArrowRight}');
        await keyboard('{ArrowRight}');
        await keyboard('{ArrowRight}');

        // Retrieve the last call to `onChange`.
        const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];

        // Assert that the value was updated correctly (i.e., not
        // 0.30000000000000004).
        expect(lastCall.value).toBe(0.4);
      });
    });
  });
});



File: Slider/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-slider--default'
    },
    {
      label: 'Controlled Slider',
      variant: 'components-slider--controlled-slider'
    }
  ]}
/>



File: Slider/migrate-to-7.x.md


# Props

`<Slider>`

| Prop       | v9                                                       | v10                        |
| ---------- | -------------------------------------------------------- | -------------------------- |
| `onChange` | Fires on `value` prop change in addition to user gesture | Fires only on user gesture |



File: Slider/Slider.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { Slider, SliderSkeleton } from '.';
import mdx from './Slider.mdx';

export default {
  title: 'Components/Slider',
  component: Slider,
  subcomponents: {
    SliderSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Slider
      {...args}
      labelText={`Slider (must be an increment of ${args.step})`}
    />
  );
};

Default.parameters = {
  controls: {
    exclude: ['light', 'formatLabel', 'labelText'],
  },
};

Default.argTypes = {
  ariaLabelInput: {
    control: { type: 'text' },
  },
  unstable_ariaLabelInputUpper: {
    control: { type: 'text' },
  },
  disabled: {
    control: {
      control: {
        type: 'boolean',
      },
    },
  },
  hideTextInput: {
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
  min: {
    control: { type: 'number' },
  },
  max: {
    control: { type: 'number' },
  },
  name: {
    control: { type: 'text' },
  },
  unstable_nameUpper: {
    control: { type: 'text' },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  required: {
    control: {
      type: 'boolean',
    },
  },
  step: {
    control: { type: 'number' },
  },
  stepMultiplier: {
    control: { type: 'number' },
  },
  value: {
    control: { type: 'number' },
  },
  unstable_valueUpper: {
    control: { type: 'number' },
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
  ariaLabelInput: 'Lower bound',
  unstable_ariaLabelInputUpper: 'Upper bound',
  disabled: false,
  hideTextInput: false,
  invalid: false,
  invalidText: 'Invalid message goes here',
  min: 0,
  max: 100,
  readOnly: false,
  required: false,
  step: 5,
  stepMultiplier: 5,
  value: 50,
  unstable_valueUpper: undefined,
  warn: false,
  warnText: 'Warning message goes here',
};

export const SliderWithHiddenInputs = () => {
  return (
    <Slider
      labelText="Slider label"
      value={50}
      min={0}
      max={100}
      step={1}
      stepMultiplier={10}
      noValidate
      invalidText="Invalid message goes here"
      hideTextInput={true}
    />
  );
};

export const SliderWithCustomValueLabel = () => {
  return (
    <Slider
      labelText="Slider label with low/medium/high"
      value={50}
      min={0}
      max={100}
      stepMultiplier={50}
      step={1}
      noValidate
      hideTextInput
      formatLabel={(val) => {
        if (val < 25) {
          return 'Low';
        } else if (val > 75) {
          return 'High';
        }
        return 'Medium';
      }}
    />
  );
};

export const ControlledSlider = () => {
  const [val, setVal] = React.useState(87);
  return (
    <>
      <button
        type="button"
        onClick={() => setVal(Math.round(Math.random() * 100))}>
        randomize value
      </button>
      <Slider
        labelText="Slider label"
        max={100}
        min={0}
        value={val}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val}</h1>
    </>
  );
};

export const _WithLayer = () => (
  <WithLayer>
    <Slider
      labelText="Slider label"
      value={50}
      min={0}
      max={100}
      step={1}
      stepMultiplier={10}
      noValidate
    />
  </WithLayer>
);

export const ControlledSliderWithLayer = () => {
  const [val, setVal] = useState(87);
  return (
    <WithLayer>
      <button
        type="button"
        onClick={() => setVal(Math.round(Math.random() * 100))}>
        randomize value
      </button>
      <Slider
        labelText="Slider label"
        max={100}
        min={0}
        value={val}
        onChange={({ value }) => setVal(value)}
      />
      <h1>{val}</h1>
    </WithLayer>
  );
};

export const TwoHandleSlider = () => {
  return (
    <Slider
      ariaLabelInput="Lower bound"
      unstable_ariaLabelInputUpper="Upper bound"
      labelText="Slider label"
      value={10}
      unstable_valueUpper={90}
      min={0}
      max={100}
      step={1}
      stepMultiplier={10}
      invalidText="Invalid message goes here"
    />
  );
};

export const TwoHandleSliderWithHiddenInputs = () => {
  return (
    <Slider
      ariaLabelInput="Lower bound"
      unstable_ariaLabelInputUpper="Upper bound"
      labelText="Slider label"
      value={10}
      unstable_valueUpper={90}
      min={0}
      max={100}
      step={1}
      stepMultiplier={10}
      invalidText="Invalid message goes here"
      hideTextInput={true}
    />
  );
};

export const Skeleton = () => {
  return <SliderSkeleton />;
};

export const TwoHandleSkeleton = () => {
  return <SliderSkeleton twoHandles={true} />;
};



File: Slider/Slider.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes, ReactNode, useState } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import classNames from 'classnames';
import { LowerHandle, UpperHandle } from './SliderHandles';

export interface SliderSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The `ariaLabel` for the handle icon.
   */
  ariaLabel?: string;

  /**
   * The `ariaLabel` for the upper bound slider handle when there are two handles.
   */
  unstable_ariaLabelHandleUpper?: string;

  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Turn the slider into a range slider.
   */
  twoHandles?: boolean;
}

const SliderSkeleton = ({
  ariaLabel = 'slider handle',
  unstable_ariaLabelHandleUpper: ariaLabelHandleUpper = 'upper slider handle',
  hideLabel,
  className,
  twoHandles,
  ...rest
}: SliderSkeletonProps) => {
  const prefix = usePrefix();
  const [isRtl, setIsRtl] = useState(false);

  useIsomorphicEffect(() => {
    setIsRtl(document ? document.dir === 'rtl' : false);
  }, []);

  const containerClasses = classNames(
    `${prefix}--slider-container`,
    `${prefix}--skeleton`,
    {
      [`${prefix}--slider-container--two-handles`]: twoHandles,
      [`${prefix}--slider-container--rtl`]: isRtl,
    }
  );
  const lowerThumbClasses = classNames(`${prefix}--slider__thumb`, {
    [`${prefix}--slider__thumb--lower`]: twoHandles,
  });
  const upperThumbClasses = classNames(`${prefix}--slider__thumb`, {
    [`${prefix}--slider__thumb--upper`]: twoHandles,
  });
  const lowerThumbWrapperClasses = classNames(
    `${prefix}--slider__thumb-wrapper`,
    {
      [`${prefix}--slider__thumb-wrapper--lower`]: twoHandles,
    }
  );
  const upperThumbWrapperClasses = classNames(
    `${prefix}--slider__thumb-wrapper`,
    {
      [`${prefix}--slider__thumb-wrapper--upper`]: twoHandles,
    }
  );
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={containerClasses}>
        <span className={`${prefix}--slider__range-label`} />
        <div className={`${prefix}--slider`}>
          <div className={`${prefix}--slider__track`} />
          <div className={`${prefix}--slider__filled-track`} />
          <div className={lowerThumbWrapperClasses}>
            <div className={lowerThumbClasses}>
              {twoHandles && !isRtl ? (
                <LowerHandle aria-label={ariaLabel} />
              ) : twoHandles && isRtl ? (
                <UpperHandle aria-label={ariaLabelHandleUpper} />
              ) : undefined}
            </div>
          </div>
          {twoHandles ? (
            <div className={upperThumbWrapperClasses}>
              <div className={upperThumbClasses}>
                {twoHandles && !isRtl ? (
                  <UpperHandle aria-label={ariaLabelHandleUpper} />
                ) : twoHandles && isRtl ? (
                  <LowerHandle aria-label={ariaLabel} />
                ) : undefined}
              </div>
            </div>
          ) : undefined}
        </div>
        <span className={`${prefix}--slider__range-label`} />
      </div>
    </div>
  );
};

SliderSkeleton.propTypes = {
  /**
   * The `ariaLabel` for the handle icon.
   */
  ariaLabel: PropTypes.string,

  /**
   * The `ariaLabel` for the upper bound slider handle when there are two handles.
   */
  unstable_ariaLabelHandleUpper: PropTypes.string,

  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Turn the slider into a range slider.
   */
  twoHandles: PropTypes.bool,
};

export default SliderSkeleton as (props: SliderSkeletonProps) => ReactNode;



File: Slider/Slider.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ChangeEvent,
  type ComponentProps,
  type CSSProperties,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { throttle } from 'es-toolkit/compat';

import * as keys from '../../internal/keyboard/keys';
import { matches } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import {
  LowerHandle,
  LowerHandleFocus,
  UpperHandle,
  UpperHandleFocus,
} from './SliderHandles';
import type { TFunc, TranslateWithId } from '../../types/common';
import { clamp } from '../../internal/clamp';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';

interface ThumbWrapperProps
  extends Omit<
    ComponentProps<typeof Tooltip>,
    'children' | 'className' | 'style'
  > {
  hasTooltip: boolean;
  className: string;
  style: CSSProperties;
  children: ComponentProps<typeof Tooltip>['children'];
}

const ThumbWrapper = ({
  hasTooltip,
  className,
  style,
  children,
  ...rest
}: ThumbWrapperProps) => {
  if (hasTooltip) {
    return (
      <Tooltip className={className} style={style} {...rest}>
        {children}
      </Tooltip>
    );
  } else {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
};

const translationIds = {
  'carbon.slider.auto-correct-announcement':
    'carbon.slider.auto-correct-announcement',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.slider.auto-correct-announcement']]:
    'The inputted value "{correctedValue}" was corrected to the nearest allowed digit.',
};

type TranslationArgs = { correctedValue?: string };

const defaultTranslateWithId: TFunc<TranslationKey, TranslationArgs> = (
  messageId,
  args
) => {
  const template = defaultTranslations[messageId];

  if (args?.correctedValue) {
    return template.replace('{correctedValue}', args.correctedValue);
  }

  return template;
};

const defaultFormatLabel: NonNullable<SliderProps['formatLabel']> = (
  value,
  label
) => {
  return `${value}${label ?? ''}`;
};

// TODO: Assuming a 16ms throttle corresponds to 60 FPS, should it be halved,
// since many systems can handle 120 FPS? If it doesn't correspond to 60 FPS,
// what does it correspond to?
/**
 * Minimum time between processed "drag" events in milliseconds.
 */
const EVENT_THROTTLE = 16;

const DRAG_EVENT_TYPES = new Set<keyof DocumentEventMap>([
  'mousemove',
  'touchmove',
]);

const DRAG_STOP_EVENT_TYPES = new Set<keyof DocumentEventMap>([
  'mouseup',
  'touchend',
  'touchcancel',
]);

enum HandlePosition {
  LOWER = 'lower',
  UPPER = 'upper',
}

type ExcludedAttributes = 'onChange' | 'onBlur';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<TranslationKey, TranslationArgs> {
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput?: string;

  /**
   * The `ariaLabel` for the upper bound `<input>` and handle when there are two handles.
   */
  unstable_ariaLabelInputUpper?: string;

  /**
   * The child nodes.
   */
  children?: ReactNode;

  /**
   * The CSS class name for the slider, set on the wrapping div.
   */
  className?: string;

  /**
   * `true` to disable this slider.
   */
  disabled?: boolean;

  /**
   * The callback to format the label associated with the minimum/maximum value and the value tooltip when hideTextInput is true.
   */
  formatLabel?: (value: number, label: string | undefined) => string;

  /**
   * `true` to hide the number input box.
   */
  hideTextInput?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `type` attribute of the `<input>`.
   */
  inputType?: string;

  /**
   * `Specify whether the Slider is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the Slider is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * The label for the slider.
   */
  labelText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * @deprecated
   * `true` to use the light version.
   */
  light?: boolean;

  /**
   * The maximum value.
   */
  max: number;

  /**
   * The label associated with the maximum value.
   */
  maxLabel?: string;

  /**
   * The minimum value.
   */
  min: number;

  /**
   * The label associated with the minimum value.
   */
  minLabel?: string;

  /**
   * The `name` attribute of the `<input>`.
   */
  name?: string;

  /**
   * The `name` attribute of the upper bound `<input>` when there are two handles.
   */
  unstable_nameUpper?: string;

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur?: (data: {
    value: string;
    handlePosition: HandlePosition | undefined;
  }) => void;

  /**
   * The callback to get notified of change in value.
   */
  onChange?: (data: {
    value: SliderProps['value'];
    valueUpper: SliderProps['unstable_valueUpper'];
  }) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input.
   */
  onInputKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease?: (data: {
    value: SliderProps['value'];
    valueUpper: SliderProps['unstable_valueUpper'];
  }) => void;

  /**
   * Whether the slider should be read-only
   */
  readOnly?: boolean;

  /**
   * `true` to specify if the control is required.
   */
  required?: boolean;

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside the `step` increment will be considered invalid.
   */
  step?: number;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier?: number;

  /**
   * The value of the slider. When there are two handles, value is the lower
   * bound.
   */
  value: number;

  /**
   * The upper bound when there are two handles.
   */
  unstable_valueUpper?: number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  // TODO: This JSDoc comment isn't accurate. Evaluate all others.
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

// TODO: Delete this type and directory type the properties in the function.
interface CalcLeftPercentProps {
  clientX?: number;
  value?: number;
  range?: number;
}

type State = {
  value: ComponentProps<typeof Slider>['value'];
  valueUpper: ComponentProps<typeof Slider>['unstable_valueUpper'];
  left: number;
  leftUpper: number;
  needsOnRelease: boolean;
  isValid: boolean;
  isValidUpper: boolean;
  activeHandle: HandlePosition | undefined;
  correctedValue: string | null;
  correctedPosition: HandlePosition | null;
  isRtl: boolean;
};

const Slider = (props: SliderProps) => {
  // TODO: Move destructured `props` from the IIFE to here.

  const initialState: State = {
    value: props.value,
    valueUpper: props.unstable_valueUpper,
    left: 0,
    leftUpper: 0,
    needsOnRelease: false,
    isValid: true,
    isValidUpper: true,
    activeHandle: undefined,
    correctedValue: null,
    correctedPosition: null,
    isRtl: false,
  };

  // TODO: Investigate using generics on the hook.
  const [state, setState] = useReducer(
    (prev: State, args: Partial<State>) => ({ ...prev, ...args }),
    initialState
  );

  // TODO: Investigate getting rid of these references.
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbRefUpper = useRef<HTMLDivElement>(null);
  const filledTrackRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inputIdRef = useRef('');

  // TODO: Delete this function and set its return value as the value of
  // `twoHandles`.
  const hasTwoHandles = () => {
    return typeof state.valueUpper !== 'undefined';
  };

  const twoHandles = hasTwoHandles();

  /**
   * Sets up initial slider position and value in response to component mount.
   */
  useEffect(() => {
    if (elementRef.current) {
      const isRtl = document?.dir === 'rtl';
      if (hasTwoHandles()) {
        const { value, left } = calcValue({
          value: stateRef.current.value,
          useRawValue: true,
        });
        const { value: valueUpper, left: leftUpper } = calcValue({
          value: stateRef.current.valueUpper,
          useRawValue: true,
        });
        setState({ isRtl, value, left, valueUpper, leftUpper });
      } else {
        const { value, left } = calcValue({
          value: stateRef.current.value,
          useRawValue: true,
        });
        setState({ isRtl, value, left });
      }
    }

    return () => {
      DRAG_STOP_EVENT_TYPES.forEach((element) =>
        elementRef.current?.ownerDocument.removeEventListener(
          element,
          onDragStop
        )
      );

      DRAG_EVENT_TYPES.forEach((element) =>
        elementRef.current?.ownerDocument.removeEventListener(
          element,
          handleDrag
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: Uncomment this code and delete all of the `filledTrackRef.current`
    // checks.
    // const el = filledTrackRef.current;
    //
    // if (!el) return;

    // Fire onChange event handler if present, if there's a usable value, and
    // if the value is different from the last one
    if (hasTwoHandles()) {
      if (filledTrackRef.current) {
        filledTrackRef.current.style.transform = state.isRtl
          ? `translate(${100 - state.leftUpper}%, -50%) scaleX(${
              (state.leftUpper - state.left) / 100
            })`
          : `translate(${state.left}%, -50%) scaleX(${
              (state.leftUpper - state.left) / 100
            })`;
      }
    } else {
      if (filledTrackRef.current) {
        filledTrackRef.current.style.transform = state.isRtl
          ? `translate(100%, -50%) scaleX(-${state.left / 100})`
          : `translate(0%, -50%) scaleX(${state.left / 100})`;
      }
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.left, state.leftUpper, state.isRtl]);

  // Fire onChange when value(s) change
  const prevValsRef = useRef<{
    value: State['value'];
    valueUpper: State['valueUpper'];
  }>(null);

  useEffect(() => {
    const prev = prevValsRef.current;

    if (
      prev &&
      (prev.value !== state.value || prev.valueUpper !== state.valueUpper) &&
      typeof props.onChange === 'function'
    ) {
      props.onChange({
        value: state.value,
        valueUpper: state.valueUpper,
      });
    }

    prevValsRef.current = { value: state.value, valueUpper: state.valueUpper };
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value, state.valueUpper, props.onChange]);

  useEffect(() => {
    // Fire onRelease event handler if present and if needed
    if (state.needsOnRelease && typeof props.onRelease === 'function') {
      props.onRelease({
        value: state.value,
        valueUpper: state.valueUpper,
      });
      // Reset the flag
      setState({ needsOnRelease: false });
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.needsOnRelease, state.value, state.valueUpper, props.onRelease]);

  const prevSyncKeysRef = useRef<
    [number, number | undefined, number, number] | null
  >(null);

  useEffect(() => {
    const prev = prevSyncKeysRef.current;
    const next: [number, number | undefined, number, number] = [
      props.value,
      props.unstable_valueUpper,
      props.max,
      props.min,
    ];

    // If value from props does not change, do nothing here.
    // Otherwise, do prop -> state sync without "value capping".
    if (
      !prev ||
      prev[0] !== next[0] ||
      prev[1] !== next[1] ||
      prev[2] !== next[2] ||
      prev[3] !== next[3]
    ) {
      setState(
        calcValue({
          value: props.value,
          useRawValue: true,
        })
      );
      if (typeof props.unstable_valueUpper !== 'undefined') {
        const { value: valueUpper, left: leftUpper } = calcValue({
          value: props.unstable_valueUpper,
          useRawValue: true,
        });
        setState({
          valueUpper,
          leftUpper,
        });
      } else {
        setState({ valueUpper: undefined, leftUpper: undefined });
      }

      prevSyncKeysRef.current = next;
    }
    // TODO: Investigate whether the missing dependency should be added.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.unstable_valueUpper, props.max, props.min]);

  /**
   * Rounds a given value to the nearest step defined by the slider's `step`
   * prop.
   *
   * @param value - The value to adjust to the nearest step. Defaults to `0`.
   * @returns The value rounded to the precision determined by the step.
   */
  const nearestStepValue = (value = 0) => {
    // TODO: Use a nullish coalescing operator.
    const decimals = (props.step?.toString().split('.')[1] || '').length;

    return Number(value.toFixed(decimals));
  };

  const handleDrag = (event: Event) => {
    if (
      event instanceof globalThis.MouseEvent ||
      event instanceof globalThis.TouchEvent
    ) {
      onDrag(event);
    }
  };

  /**
   * Sets up "drag" event handlers and calls `onDrag` in case dragging
   * started on somewhere other than the thumb without a corresponding "move"
   * event.
   */
  const onDragStart = (
    evt: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // We're going to force focus on one of the handles later on here, b/c we're
    // firing on a mousedown event, we need to call event.preventDefault() to
    // keep the focus from leaving the HTMLElement.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#notes
    evt.preventDefault();

    // TODO: Abstract `elementRef.current?.ownerDocument` to a variable that can
    // be used here and everywhere else in this file.

    // Add drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.addEventListener(element, onDragStop);
    });

    // Add drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.addEventListener(element, handleDrag);
    });

    const clientX = getClientXFromEvent(evt.nativeEvent);

    let activeHandle: HandlePosition | undefined;
    if (hasTwoHandles()) {
      if (evt.target == thumbRef.current) {
        activeHandle = HandlePosition.LOWER;
      } else if (evt.target == thumbRefUpper.current) {
        activeHandle = HandlePosition.UPPER;
      } else if (clientX) {
        const distanceToLower = calcDistanceToHandle(
          HandlePosition.LOWER,
          clientX
        );
        const distanceToUpper = calcDistanceToHandle(
          HandlePosition.UPPER,
          clientX
        );
        if (distanceToLower <= distanceToUpper) {
          activeHandle = HandlePosition.LOWER;
        } else {
          activeHandle = HandlePosition.UPPER;
        }
      }
    }

    // Force focus to the appropriate handle.
    const focusOptions = {
      preventScroll: true,
    };
    if (hasTwoHandles()) {
      if (thumbRef.current && activeHandle === HandlePosition.LOWER) {
        thumbRef.current.focus(focusOptions);
      } else if (
        thumbRefUpper.current &&
        activeHandle === HandlePosition.UPPER
      ) {
        thumbRefUpper.current.focus(focusOptions);
      }
    } else if (thumbRef.current) {
      thumbRef.current.focus(focusOptions);
    }
    setState({ activeHandle });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb.
    onDrag(evt.nativeEvent, activeHandle);
  };

  /**
   * Removes "drag" and "drag stop" event handlers and calls sets the flag
   * indicating that the `onRelease` callback should be called.
   */
  const onDragStop = () => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // TODO: Rename parameters in `DRAG_*` loops to `type`.
    // Remove drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.removeEventListener(
        element,
        onDragStop
      );
    });

    // Remove drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      elementRef.current?.ownerDocument.removeEventListener(
        element,
        handleDrag
      );
    });

    // Set needsOnRelease flag so event fires on next update.
    setState({
      needsOnRelease: true,
      isValid: true,
      isValidUpper: true,
    });
  };

  // TODO: Rename this reference.
  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param evt The event.
   * @param activeHandle The first drag event call, we may have an explicit
   * activeHandle value, which is to be used before state is used.
   */
  const _onDragRef =
    useRef<
      (
        evt: globalThis.MouseEvent | globalThis.TouchEvent,
        activeHandle?: HandlePosition
      ) => void
    >(null);

  _onDragRef.current = (evt, activeHandle) => {
    activeHandle = activeHandle ?? stateRef.current.activeHandle;
    // Do nothing if component is disabled, or we have no event.
    if (propsRef.current.disabled || propsRef.current.readOnly || !evt) {
      return;
    }

    const clientX = getClientXFromEvent(evt);

    const { value, left } = calcValue({
      clientX,
      value: stateRef.current.value,
    });
    // If we're set to two handles, negotiate which drag handle is closest to
    // the users' interaction.
    if (hasTwoHandles() && activeHandle) {
      setValueLeftForHandle(activeHandle, {
        value: nearestStepValue(value),
        left,
      });
    } else {
      setState({
        value: nearestStepValue(value),
        left,
        isValid: true,
      });
    }
    // TODO: Investigate if it would be better to not call `setState`
    // back-to-back here and in other places.
    setState({ correctedValue: null, correctedPosition: null });
  };

  /**
   * Throttles calls to `_onDrag` by limiting events to being processed at
   * most once every `EVENT_THROTTLE` milliseconds.
   */
  const onDrag = useMemo(
    () =>
      throttle(
        (
          evt: globalThis.MouseEvent | globalThis.TouchEvent,
          activeHandle?: HandlePosition
        ) => {
          _onDragRef.current?.(evt, activeHandle);
        },
        EVENT_THROTTLE,
        { leading: true, trailing: false }
      ),
    []
  );

  /**
   * Handles a `keydown` event by recalculating the value/thumb and setting
   * state accordingly.
   */
  const onKeyDown = (evt: KeyboardEvent<HTMLDivElement>) => {
    // Do nothing if component is disabled, or we don't have a valid event
    if (props.disabled || props.readOnly) {
      return;
    }

    const { step = 1, stepMultiplier = 4 } = props;

    let delta = 0;
    if (matches(evt, [keys.ArrowDown, keys.ArrowLeft])) {
      delta = -step;
    } else if (matches(evt, [keys.ArrowUp, keys.ArrowRight])) {
      delta = step;
    } else {
      // Ignore keys we don't want to handle
      return;
    }

    // If shift was held, account for the stepMultiplier
    if (evt.shiftKey) {
      delta *= stepMultiplier;
    }

    if (hasTwoHandles() && state.activeHandle) {
      const currentValue =
        state.activeHandle === HandlePosition.LOWER
          ? state.value
          : state.valueUpper;
      const { value, left } = calcValue({
        value: calcValueForDelta(currentValue ?? props.min, delta, props.step),
      });
      setValueLeftForHandle(state.activeHandle, {
        value: nearestStepValue(value),
        left,
      });
    } else {
      const { value, left } = calcValue({
        // Ensures custom value from `<input>` won't cause skipping next stepping
        // point with right arrow key, e.g. Typing 51 in `<input>`, moving focus
        // onto the thumb and the hitting right arrow key should yield 52 instead
        // of 54.
        value: calcValueForDelta(state.value, delta, props.step),
      });
      setState({
        value: nearestStepValue(value),
        left,
        isValid: true,
      });
    }
    setState({ correctedValue: null, correctedPosition: null });
  };

  /**
   * Provides the two-way binding for the input field of the Slider. It also
   * Handles a change to the input field by recalculating the value/thumb and
   * setting state accordingly.
   */
  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    // Do nothing if component is disabled
    if (props.disabled || props.readOnly) {
      return;
    }

    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    // Avoid calling calcValue for invalid numbers, but still update the state.
    const activeHandle =
      (evt.target.dataset.handlePosition as HandlePosition | undefined) ??
      HandlePosition.LOWER;
    const targetValue = Number.parseFloat(evt.target.value);

    if (hasTwoHandles()) {
      if (isNaN(targetValue)) {
        setValueForHandle(activeHandle, evt.target.value);
      } else if (
        isValidValueForPosition({
          handle: activeHandle,
          value: targetValue,
          min: props.min,
          max: props.max,
        })
      ) {
        processNewInputValue(evt.target);
      } else {
        setValueForHandle(activeHandle, targetValue);
      }
    } else {
      if (isNaN(targetValue)) {
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        setState({ value: evt.target.value });
      } else if (
        isValidValue({
          value: targetValue,
          min: props.min,
          max: props.max,
        })
      ) {
        processNewInputValue(evt.target);
      } else {
        setState({ value: targetValue });
      }
    }
  };

  /**
   * Checks for validity of input value after clicking out of the input. It also
   * Handles state change to isValid state.
   */
  const onBlurInput = (evt: FocusEvent<HTMLInputElement>) => {
    // Do nothing if we have no valid event, target, or value
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    const { value: targetValue } = evt.target;

    processNewInputValue(evt.target);

    props.onBlur?.({
      value: targetValue,
      handlePosition: evt.target.dataset.handlePosition as
        | HandlePosition
        | undefined,
    });
  };

  const onInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    // Do nothing if component is disabled, or we don't have a valid event.
    if (
      props.disabled ||
      props.readOnly ||
      !(evt.target instanceof HTMLInputElement)
    ) {
      return;
    }

    // Do nothing if we have no valid event, target, or value.
    if (!evt || !('target' in evt) || typeof evt.target.value !== 'string') {
      return;
    }

    if (matches(evt, [keys.Enter])) {
      processNewInputValue(evt.target);
    }
  };

  const processNewInputValue = (input: HTMLInputElement) => {
    setState({ correctedValue: null, correctedPosition: null });
    const targetValue = Number.parseFloat(input.value);
    const validity = !isNaN(targetValue);

    // When there are two handles, we'll also have the data-handle-position
    // attribute to consider the other value before settling on the validity to
    // set.
    const handlePosition = input.dataset.handlePosition as
      | HandlePosition
      | undefined;

    if (handlePosition === HandlePosition.LOWER) {
      setState({ isValid: validity });
    } else if (handlePosition === HandlePosition.UPPER) {
      setState({ isValidUpper: validity });
    }
    setState({ isValid: validity });

    if (validity) {
      const adjustedValue = handlePosition
        ? getAdjustedValueForPosition({
            handle: handlePosition,
            value: targetValue,
            min: props.min,
            max: props.max,
          })
        : getAdjustedValue({
            value: targetValue,
            min: props.min,
            max: props.max,
          });

      if (adjustedValue !== targetValue) {
        setState({
          correctedValue: targetValue.toString(),
          correctedPosition: handlePosition ?? null,
        });
      } else {
        setState({ correctedValue: null, correctedPosition: null });
      }

      const { value, left } = calcValue({
        value: adjustedValue,
        useRawValue: true,
      });

      if (handlePosition) {
        setValueLeftForHandle(handlePosition, {
          value: nearestStepValue(value),
          left,
        });
      } else {
        setState({
          value,
          left,
        });
      }
    }
  };

  const calcLeftPercent = ({ clientX, value, range }: CalcLeftPercentProps) => {
    // TODO: Delete the optional chaining operator after `getBoundingClientRect`.
    const boundingRect = elementRef.current?.getBoundingClientRect?.();
    let width = boundingRect ? boundingRect.right - boundingRect.left : 0;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value to calculate it instead.
    if (clientX) {
      const leftOffset = state.isRtl
        ? (boundingRect?.right ?? 0) - clientX
        : clientX - (boundingRect?.left ?? 0);
      return leftOffset / width;
    } else if (value !== null && typeof value !== 'undefined' && range) {
      // Prevent NaN calculation if the range is 0.
      return range === 0 ? 0 : (value - props.min) / range;
    }
    // We should never end up in this scenario, but in case we do, and to
    // re-assure Typescript, return 0.
    return 0;
  };

  /**
   * Calculates the discrete value (snapped to the nearest step) along
   * with the corresponding handle position percentage.
   */
  const calcDiscreteValueAndPercent = ({
    leftPercent,
  }: {
    leftPercent: number;
  }) => {
    const { step = 1, min, max } = props;
    const numSteps = Math.floor((max - min) / step) + 1;
    /** Index of the step that corresponds to `leftPercent`. */
    const stepIndex = Math.round(leftPercent * (numSteps - 1));
    const discreteValue =
      stepIndex === numSteps - 1 ? max : min + step * stepIndex;
    /** Percentage corresponding to the step index. */
    const discretePercent = stepIndex / (numSteps - 1);

    return { discreteValue, discretePercent };
  };

  /**
   * Calculates the slider's value and handle position based on either a
   * mouse/touch event or an explicit value.
   */
  const calcValue = ({
    clientX,
    value,
    useRawValue,
  }: {
    /** The x-coordinate from a mouse/touch event. */
    clientX?: number;
    /** Value to base the calculations on (if no `clientX`). */
    value?: number;
    /** Whether to bypass the stepping logic and use the raw value. */
    useRawValue?: boolean;
  }) => {
    const range = props.max - props.min;
    const leftPercentRaw = calcLeftPercent({
      clientX,
      value,
      range,
    });
    /** `leftPercentRaw` clamped between 0 and 1. */
    const leftPercent = clamp(leftPercentRaw, 0, 1);

    if (useRawValue) {
      return {
        value,
        left: leftPercent * 100,
      };
    }

    // Use the discrete value and percentage for snapping.
    const { discreteValue, discretePercent } = calcDiscreteValueAndPercent({
      leftPercent,
    });

    return { value: discreteValue, left: discretePercent * 100 };
  };

  const calcDistanceToHandle = (handle: HandlePosition, clientX: number) => {
    const handleBoundingRect = getHandleBoundingRect(handle);
    /** x-coordinate of the midpoint. */
    const handleX = handleBoundingRect.left + handleBoundingRect.width / 2;
    return Math.abs(handleX - clientX);
  };

  /**
   * Calculates a new slider value based on the current value, a change delta,
   * and a step.
   *
   * @param currentValue - The starting value from which the slider is moving.
   * @param delta - The amount to adjust the current value by.
   * @param step - The step. Defaults to `1`.
   * @returns The new slider value, rounded to the same number of decimal places
   *          as the step.
   */
  const calcValueForDelta = (currentValue: number, delta: number, step = 1) => {
    const base =
      delta > 0 ? Math.round(currentValue / step) * step : currentValue;
    const newValue = base + delta;
    // TODO: Why is the logical OR needed here?
    const decimals = (step.toString().split('.')[1] || '').length;

    return Number(newValue.toFixed(decimals));
  };

  /**
   * Sets state relevant to the given handle position.
   *
   * Guards against setting either lower or upper values beyond its counterpart.
   */
  const setValueLeftForHandle = (
    handle: HandlePosition,
    { value: newValue, left: newLeft }: { value: number; left: number }
  ) => {
    const { value, valueUpper, left, leftUpper } = state;
    if (handle === HandlePosition.LOWER) {
      // Don't allow higher than the upper handle.
      setState({
        value: valueUpper && newValue > valueUpper ? valueUpper : newValue,
        left: valueUpper && newValue > valueUpper ? leftUpper : newLeft,
        isValid: true,
      });
    } else {
      setState({
        valueUpper: value && newValue < value ? value : newValue,
        leftUpper: value && newValue < value ? left : newLeft,
        isValidUpper: true,
      });
    }
  };

  const setValueForHandle = (
    handle: HandlePosition,
    value: number | string
  ) => {
    if (handle === HandlePosition.LOWER) {
      setState({
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        value,
        isValid: true,
      });
    } else {
      setState({
        // TODO: Address this error
        //
        // @ts-expect-error - Passing a string to something that expects a
        // number.
        valueUpper: value,
        isValidUpper: true,
      });
    }
  };

  const isValidValueForPosition = ({
    handle,
    value: newValue,
    min,
    max,
  }: {
    handle: HandlePosition;
    value: number;
    min: number;
    max: number;
  }) => {
    const { value, valueUpper } = state;

    if (!isValidValue({ value: newValue, min, max })) {
      return false;
    }

    if (handle === HandlePosition.LOWER) {
      return !valueUpper || newValue <= valueUpper;
    } else if (handle === HandlePosition.UPPER) {
      return !value || newValue >= value;
    }

    return false;
  };

  const isValidValue = ({
    value,
    min,
    max,
  }: {
    value: number;
    min: number;
    max: number;
  }) => {
    return !(value < min || value > max);
  };

  const getAdjustedValueForPosition = ({
    handle,
    value: newValueInput,
    min,
    max,
  }: {
    handle: HandlePosition;
    value: number;
    min: number;
    max: number;
  }) => {
    const { value, valueUpper } = state;
    let newValue = getAdjustedValue({ value: newValueInput, min, max });

    // TODO: Just return the value.
    // Next adjust to the opposite handle.
    if (handle === HandlePosition.LOWER && valueUpper) {
      newValue = newValue > valueUpper ? valueUpper : newValue;
    } else if (handle === HandlePosition.UPPER && value) {
      newValue = newValue < value ? value : newValue;
    }
    return newValue;
  };

  const getAdjustedValue = ({
    value,
    min,
    max,
  }: {
    value: number;
    min: number;
    max: number;
  }) => {
    // TODO: Just return the value.
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  /**
   * Get the bounding rect for the requested handles' DOM element.
   *
   * If the bounding rect is not available, a new, empty DOMRect is returned.
   */
  const getHandleBoundingRect = (handle: HandlePosition): DOMRect => {
    let boundingRect: DOMRect | undefined;
    if (handle === HandlePosition.LOWER) {
      boundingRect = thumbRef.current?.getBoundingClientRect();
    } else {
      boundingRect = thumbRefUpper.current?.getBoundingClientRect();
    }
    return boundingRect ?? new DOMRect();
  };

  const getClientXFromEvent = (
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) => {
    let clientX: number | undefined;
    if ('clientX' in event) {
      clientX = event.clientX;
    } else if (
      'touches' in event &&
      0 in event.touches &&
      'clientX' in event.touches[0]
    ) {
      clientX = event.touches[0].clientX;
    }
    return clientX;
  };

  useEffect(() => {
    const { isValid, isValidUpper } = stateRef.current;
    const derivedState: Partial<State> = {};

    // Will override state in favor of invalid prop
    if (props.invalid === true) {
      if (isValid === true) derivedState.isValid = false;
      if (isValidUpper === true) derivedState.isValidUpper = false;
    } else if (props.invalid === false) {
      if (isValid === false) derivedState.isValid = true;
      if (isValidUpper === false) derivedState.isValidUpper = true;
    }

    if (Object.keys(derivedState).length) {
      setState(derivedState);
    }
  }, [props.invalid]);

  const {
    ariaLabelInput,
    unstable_ariaLabelInputUpper: ariaLabelInputUpper,
    className,
    hideTextInput = false,
    id = (inputIdRef.current =
      inputIdRef.current ||
      // TODO:
      // 1. Why isn't `inputId` just set to this value instead of an empty
      //    string?
      // 2. Why this value instead of something else, like
      //    `crypto.randomUUID()` or `useId()`?
      `__carbon-slider_${Math.random().toString(36).substr(2)}`),
    min,
    minLabel,
    max,
    maxLabel,
    formatLabel = defaultFormatLabel,
    labelText,
    hideLabel,
    step = 1,
    // TODO: Other properties are deleted below. Why isn't this one?
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    stepMultiplier: _stepMultiplier,
    inputType = 'number',
    invalidText,
    required,
    disabled = false,
    name,
    unstable_nameUpper: nameUpper,
    light,
    readOnly = false,
    warn = false,
    warnText,
    translateWithId: t = defaultTranslateWithId,
    ...other
  } = props;

  const {
    value,
    valueUpper,
    isValid,
    isValidUpper,
    correctedValue,
    correctedPosition,
    isRtl,
  } = state;

  const normalizedProps = useNormalizedInputProps({
    id,
    disabled,
    readOnly,
    invalid: !isValid,
    warn,
  });

  const normalizedUpperProps = useNormalizedInputProps({
    id,
    disabled,
    readOnly,
    invalid: !isValidUpper,
    warn,
  });

  // TODO: Delete this IIFE. It was added to maintain whitespace and to make it clear
  // what exactly has changed.
  return (() => {
    delete other.onRelease;
    delete other.invalid;
    delete other.unstable_valueUpper;

    const showWarning =
      normalizedProps.warn ||
      // TODO: https://github.com/carbon-design-system/carbon/issues/18991#issuecomment-2795709637
      // eslint-disable-next-line valid-typeof , no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
      (typeof correctedValue !== null &&
        correctedPosition === HandlePosition.LOWER &&
        isValid);
    const showWarningUpper =
      normalizedUpperProps.warn ||
      // TODO: https://github.com/carbon-design-system/carbon/issues/18991#issuecomment-2795709637
      // eslint-disable-next-line valid-typeof, no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
      (typeof correctedValue !== null &&
        correctedPosition ===
          (twoHandles ? HandlePosition.UPPER : HandlePosition.LOWER) &&
        (twoHandles ? isValidUpper : isValid));

    return (
      <PrefixContext.Consumer>
        {(prefix) => {
          const labelId = `${id}-label`;
          const labelClasses = classNames(`${prefix}--label`, {
            [`${prefix}--visually-hidden`]: hideLabel,
            [`${prefix}--label--disabled`]: disabled,
          });

          const containerClasses = classNames(`${prefix}--slider-container`, {
            [`${prefix}--slider-container--two-handles`]: twoHandles,
            [`${prefix}--slider-container--disabled`]: disabled,
            [`${prefix}--slider-container--readonly`]: readOnly,
            [`${prefix}--slider-container--rtl`]: isRtl,
          });
          const sliderClasses = classNames(`${prefix}--slider`, {
            [`${prefix}--slider--disabled`]: disabled,
            [`${prefix}--slider--readonly`]: readOnly,
          });

          const fixedInputClasses = [
            `${prefix}--text-input`,
            `${prefix}--slider-text-input`,
          ];
          const conditionalInputClasses = {
            [`${prefix}--text-input--light`]: light,
          };
          const lowerInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--lower`,
            conditionalInputClasses,
            {
              [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
              [`${prefix}--slider-text-input--warn`]: showWarning,
            },
          ]);
          const upperInputClasses = classNames([
            ...fixedInputClasses,
            `${prefix}--slider-text-input--upper`,
            conditionalInputClasses,
            {
              [`${prefix}--text-input--invalid`]: twoHandles
                ? normalizedUpperProps.invalid
                : normalizedProps.invalid,
              [`${prefix}--slider-text-input--warn`]: showWarningUpper,
            },
          ]);
          const lowerInputWrapperClasses = classNames([
            `${prefix}--text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper--lower`,
            {
              [`${prefix}--text-input-wrapper--readonly`]: readOnly,
              [`${prefix}--slider-text-input-wrapper--hidden`]: hideTextInput,
            },
          ]);
          const upperInputWrapperClasses = classNames([
            `${prefix}--text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper`,
            `${prefix}--slider-text-input-wrapper--upper`,
            {
              [`${prefix}--text-input-wrapper--readonly`]: readOnly,
              [`${prefix}--slider-text-input-wrapper--hidden`]: hideTextInput,
            },
          ]);
          const lowerThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--lower`]: twoHandles,
          });
          const upperThumbClasses = classNames(`${prefix}--slider__thumb`, {
            [`${prefix}--slider__thumb--upper`]: twoHandles,
          });
          const lowerThumbWrapperClasses = classNames([
            `${prefix}--icon-tooltip`,
            `${prefix}--slider__thumb-wrapper`,
            {
              [`${prefix}--slider__thumb-wrapper--lower`]: twoHandles,
            },
          ]);
          const upperThumbWrapperClasses = classNames([
            `${prefix}--icon-tooltip`,
            `${prefix}--slider__thumb-wrapper`,
            {
              [`${prefix}--slider__thumb-wrapper--upper`]: twoHandles,
            },
          ]);
          const lowerThumbWrapperProps = {
            style: {
              insetInlineStart: `${state.left}%`,
            },
          };
          const upperThumbWrapperProps = {
            style: { insetInlineStart: `${state.leftUpper}%` },
          };

          return (
            <div className={classNames(`${prefix}--form-item`, className)}>
              <Text
                as="label"
                htmlFor={twoHandles ? undefined : id}
                className={labelClasses}
                id={labelId}>
                {labelText}
              </Text>
              <div className={containerClasses}>
                {twoHandles ? (
                  <div className={lowerInputWrapperClasses}>
                    <input
                      type={hideTextInput ? 'hidden' : inputType}
                      id={`${id}-lower-input-for-slider`}
                      name={name}
                      className={lowerInputClasses}
                      value={value}
                      aria-label={ariaLabelInput}
                      disabled={disabled}
                      required={required}
                      min={min}
                      max={max}
                      step={step}
                      onChange={onChangeInput}
                      onBlur={onBlurInput}
                      onKeyUp={props.onInputKeyUp}
                      onKeyDown={onInputKeyDown}
                      data-invalid={normalizedProps.invalid ? true : null}
                      data-handle-position={HandlePosition.LOWER}
                      aria-invalid={normalizedProps.invalid ? true : undefined}
                      readOnly={readOnly}
                    />
                    {normalizedProps.invalid && (
                      <WarningFilled
                        className={`${prefix}--slider__invalid-icon`}
                      />
                    )}

                    {showWarning && (
                      <WarningAltFilled
                        className={`${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`}
                      />
                    )}
                  </div>
                ) : null}
                <Text className={`${prefix}--slider__range-label`}>
                  {formatLabel(min, minLabel)}
                </Text>
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452 */
                /* @ts-ignore onBlur + onChange types are incompatible*/}
                <div
                  className={sliderClasses}
                  ref={(node) => {
                    elementRef.current = node;
                  }}
                  onMouseDown={onDragStart}
                  onTouchStart={onDragStart}
                  onKeyDown={onKeyDown}
                  role="presentation"
                  tabIndex={-1}
                  data-invalid={
                    (
                      twoHandles
                        ? normalizedProps.invalid ||
                          normalizedUpperProps.invalid
                        : normalizedProps.invalid
                    )
                      ? true
                      : null
                  }
                  {...other}>
                  <ThumbWrapper
                    hasTooltip={hideTextInput}
                    className={lowerThumbWrapperClasses}
                    label={formatLabel(value, undefined)}
                    align="top"
                    {...lowerThumbWrapperProps}>
                    <div
                      className={lowerThumbClasses}
                      role="slider"
                      id={twoHandles ? undefined : id}
                      tabIndex={readOnly || disabled ? undefined : 0}
                      aria-valuetext={formatLabel(value, undefined)}
                      aria-valuemax={twoHandles ? valueUpper : max}
                      aria-valuemin={min}
                      aria-valuenow={value}
                      aria-labelledby={twoHandles ? undefined : labelId}
                      aria-label={twoHandles ? ariaLabelInput : undefined}
                      ref={thumbRef}
                      onFocus={() =>
                        setState({ activeHandle: HandlePosition.LOWER })
                      }>
                      {twoHandles && !isRtl ? (
                        <>
                          <LowerHandle aria-label={ariaLabelInput} />
                          <LowerHandleFocus aria-label={ariaLabelInput} />
                        </>
                      ) : twoHandles && isRtl ? (
                        <>
                          <UpperHandle aria-label={ariaLabelInputUpper} />
                          <UpperHandleFocus aria-label={ariaLabelInputUpper} />
                        </>
                      ) : undefined}
                    </div>
                  </ThumbWrapper>
                  {twoHandles ? (
                    <ThumbWrapper
                      hasTooltip={hideTextInput}
                      className={upperThumbWrapperClasses}
                      label={formatLabel(valueUpper ?? 0, undefined)}
                      align="top"
                      {...upperThumbWrapperProps}>
                      <div
                        className={upperThumbClasses}
                        role="slider"
                        tabIndex={readOnly || disabled ? undefined : 0}
                        aria-valuemax={max}
                        aria-valuemin={value}
                        aria-valuenow={valueUpper}
                        aria-label={ariaLabelInputUpper}
                        ref={thumbRefUpper}
                        onFocus={() =>
                          setState({ activeHandle: HandlePosition.UPPER })
                        }>
                        {twoHandles && !isRtl ? (
                          <>
                            <UpperHandle aria-label={ariaLabelInputUpper} />
                            <UpperHandleFocus
                              aria-label={ariaLabelInputUpper}
                            />
                          </>
                        ) : twoHandles && isRtl ? (
                          <>
                            <LowerHandle aria-label={ariaLabelInput} />
                            <LowerHandleFocus aria-label={ariaLabelInput} />
                          </>
                        ) : undefined}
                      </div>
                    </ThumbWrapper>
                  ) : null}
                  <div
                    className={`${prefix}--slider__track`}
                    ref={(node) => {
                      trackRef.current = node;
                    }}
                  />
                  <div
                    className={`${prefix}--slider__filled-track`}
                    ref={filledTrackRef}
                  />
                </div>
                <Text className={`${prefix}--slider__range-label`}>
                  {formatLabel(max, maxLabel)}
                </Text>

                <div className={upperInputWrapperClasses}>
                  <input
                    type={hideTextInput ? 'hidden' : inputType}
                    id={`${id}-${twoHandles ? 'upper-' : ''}input-for-slider`}
                    name={twoHandles ? nameUpper : name}
                    className={upperInputClasses}
                    value={twoHandles ? valueUpper : value}
                    aria-labelledby={
                      !ariaLabelInput && !twoHandles ? labelId : undefined
                    }
                    aria-label={
                      twoHandles
                        ? ariaLabelInputUpper
                        : ariaLabelInput
                          ? ariaLabelInput
                          : undefined
                    }
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChangeInput}
                    onBlur={onBlurInput}
                    onKeyDown={onInputKeyDown}
                    onKeyUp={props.onInputKeyUp}
                    data-invalid={
                      (
                        twoHandles
                          ? normalizedUpperProps.invalid
                          : normalizedProps.invalid
                      )
                        ? true
                        : null
                    }
                    data-handle-position={
                      twoHandles ? HandlePosition.UPPER : null
                    }
                    aria-invalid={
                      (
                        twoHandles
                          ? normalizedUpperProps.invalid
                          : normalizedProps.invalid
                      )
                        ? true
                        : undefined
                    }
                    readOnly={readOnly}
                  />
                  {(twoHandles
                    ? normalizedUpperProps.invalid
                    : normalizedProps.invalid) && (
                    <WarningFilled
                      className={`${prefix}--slider__invalid-icon`}
                    />
                  )}

                  {showWarningUpper && (
                    <WarningAltFilled
                      className={`${prefix}--slider__invalid-icon ${prefix}--slider__invalid-icon--warning`}
                    />
                  )}
                </div>
              </div>
              {(normalizedProps.invalid || normalizedUpperProps.invalid) && (
                <Text
                  as="div"
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--slider__validation-msg--invalid`,
                    `${prefix}--form-requirement`
                  )}>
                  {invalidText}
                </Text>
              )}
              {(normalizedProps.warn || normalizedUpperProps.warn) && (
                <Text
                  as="div"
                  className={classNames(
                    `${prefix}--slider__validation-msg`,
                    `${prefix}--form-requirement`
                  )}>
                  {warnText}
                </Text>
              )}
              {correctedValue && (
                <Text
                  as="div"
                  role="alert"
                  className={classNames(
                    `${prefix}--slider__status-msg`,
                    `${prefix}--form-requirement`
                  )}>
                  {t(
                    translationIds['carbon.slider.auto-correct-announcement'],
                    { correctedValue }
                  )}
                </Text>
              )}
            </div>
          );
        }}
      </PrefixContext.Consumer>
    );
  })();
};

Slider.propTypes = {
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class name for the slider.
   */
  className: PropTypes.string,

  /**
   * `true` to disable this slider.
   */
  disabled: PropTypes.bool,

  /**
   * The callback to format the label associated with the minimum/maximum value.
   */
  formatLabel: PropTypes.func,

  /**
   * `true` to hide the number input box.
   */
  hideTextInput: PropTypes.bool,

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * The `type` attribute of the `<input>`.
   */
  inputType: PropTypes.string,

  /**
   * `Specify whether the Slider is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Slider is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * The label for the slider.
   */
  labelText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Slider` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * The maximum value.
   */
  max: PropTypes.number.isRequired,

  /**
   * The label associated with the maximum value.
   */
  maxLabel: PropTypes.string,

  /**
   * The minimum value.
   */
  min: PropTypes.number.isRequired,

  /**
   * The label associated with the minimum value.
   */
  minLabel: PropTypes.string,

  /**
   * The `name` attribute of the `<input>`.
   */
  name: PropTypes.string,

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur: PropTypes.func,

  /**
   * The callback to get notified of change in value.
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed in the number input.
   */
  onInputKeyUp: PropTypes.func,

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease: PropTypes.func,

  /**
   * Whether the slider should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * `true` to specify if the control is required.
   */
  required: PropTypes.bool,

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is *not* hidden, the new step requirement should be added to a visible label. Values outside the `step` increment will be considered invalid.
   */
  step: PropTypes.number,

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier: PropTypes.number,

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationIds` field for
   * this component.
   */
  translateWithId: PropTypes.func,

  /**
   * The `ariaLabel` for the upper bound `<input>` when there are two handles.
   */
  unstable_ariaLabelInputUpper: PropTypes.string,

  /**
   * The `name` attribute of the upper bound `<input>` when there are two handles.
   */
  unstable_nameUpper: PropTypes.string,

  /**
   * The upper bound when there are two handles.
   */
  unstable_valueUpper: PropTypes.number,

  /**
   * The value of the slider. When there are two handles, value is the lower
   * bound.
   */
  value: PropTypes.number.isRequired,

  /**
   * `Specify whether the Slider is in a warn state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Slider is in a warn state
   */
  warnText: PropTypes.node,
};

export default Slider as (props: SliderProps) => ReactNode;



File: Slider/Slider.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as SliderStories from './Slider.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Slider

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Slider)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/slider/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/slider/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Controlled Slider](#controlled-slider)
- [Skeleton](#skeleton)
- [Slider With Custom Value](#slider-with-custom-value)
- [Slider With Hidden Inputs](#slider-with-hidden-inputs)
  - [`step` Prop](#step-prop)
  - [`unstable_valueUpper` Prop](#unstable_valueupper-prop)
- [Two Handle Skeleton](#two-handle-skeleton)
- [Two Handle Slider](#two-handle-slider)
- [Two Handle Slider With Hidden Inputs](#two-handle-slider-with-hidden-inputs)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Sliders provide a visual indication of adjustable content, where the user can
increase or decrease the value by moving the handle along a horizontal track.

<Canvas
  of={SliderStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SliderStories.Default),
    },
  ]}
/>

## Controlled Slider

<Canvas
  of={SliderStories.ControlledSlider}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SliderStories.ControlledSlider),
    },
  ]}
/>

## Skeleton

<Canvas
  of={SliderStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SliderStories.Skeleton),
    },
  ]}
/>

## Slider With Custom Value

<Canvas
  of={SliderStories.SliderWithCustomValueLabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(SliderStories.SliderWithCustomValueLabel),
    },
  ]}
/>

## Slider With Hidden Inputs

<Canvas
  of={SliderStories.SliderWithHiddenInputs}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(SliderStories.SliderWithHiddenInputs),
    },
  ]}
/>

### `step` Prop

If a `step` value other than `1` is provided, any number entered into the text
input must adhere to the step value. For example, if the `step` is `5`, with a
range of values from `0-100`, `40` would be valid, and `42` would be considered
`invalid`.

### `unstable_valueUpper` Prop

The Slider component can support two handles to specify a range. To enable this
behavior pass a value for the `unstable_valueUpper` prop. This sets the upper
bound of the range in addition to the `value` prop, which specifies the lower
bound. When in two handle mode, both `value` and `valueUpper` are provided as
keys to `onChange` function prop that is passed to the component.

## Two Handle Skeleton

<Canvas
  of={SliderStories.TwoHandleSkeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SliderStories.TwoHandleSkeleton),
    },
  ]}
/>

## Two Handle Slider

<Canvas
  of={SliderStories.TwoHandleSlider}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SliderStories.TwoHandleSlider),
    },
  ]}
/>

## Two Handle Slider With Hidden Inputs

<Canvas
  of={SliderStories.TwoHandleSliderWithHiddenInputs}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(SliderStories.TwoHandleSliderWithHiddenInputs),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Slider/Slider.mdx).



