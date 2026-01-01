File: ButtonSet/ButtonSet.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import {
  fluidButtonLabels,
  fluidButtonMapping,
  fluidButtonOptions,
} from '../Button/__story__/fluid-button-set-args';
import { background } from 'storybook/internal/theming';

export default {
  title: 'Components/Button/Set Of Buttons',
  component: ButtonSet,
};

export const Default = (args) => {
  return (
    <ButtonSet>
      <Button kind="secondary" {...args}>
        Secondary button
      </Button>
      <Button kind="primary" {...args}>
        Primary button
      </Button>
    </ButtonSet>
  );
};

export const Fluid = {
  parameters: {
    controls: {
      include: [
        'Container width',
        'Container visible',
        'Fluid Buttons',
        'Stacked',
      ],
    },
  },
  argTypes: {
    'Fluid Buttons': {
      control: {
        type: 'select',
        labels: fluidButtonLabels,
      },
      options: fluidButtonOptions,
      mapping: fluidButtonMapping,
      description: 'Sets the number and type of buttons in the set',
    },
    'Container width': {
      control: {
        type: 'range',
        min: '280',
        max: '1200',
        step: '1',
      },
      description: 'Sets the width of the ButtonSet container',
    },
    'Container visible': {
      control: {
        type: 'boolean',
      },
      description: 'Show the ButtonSet container using Carbon layer styling',
    },
  },

  render: ({ ...rest }) => {
    const buttons = rest['Fluid Buttons'];
    const containerStyle = {
      inlineSize: rest['Container width'] + 'px',
      maxInlineSize: '100%',
    };
    if (rest['Container visible']) {
      // 42px is the padding around the story
      containerStyle.boxShadow = '0 0 0 42px var(--cds-layer-01)';
    }

    if (!buttons || buttons === 0) {
      return <div>Select one or more buttons.</div>;
    }

    return (
      <div style={containerStyle}>
        <ButtonSet fluid>
          {buttons.map(({ label, kind, key }) => (
            <Button key={key} kind={kind}>
              {label}
            </Button>
          ))}
        </ButtonSet>
      </div>
    );
  },
};

Fluid.args = {
  'Fluid Buttons': 8,
  'Container width': 600,
  'Container visible': false,
};



File: ButtonSet/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ButtonSet from './ButtonSet';
export { ButtonSet };
export default ButtonSet;



File: ButtonSet/ButtonSet.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { ButtonKind } from '../Button/Button';

export interface ButtonSetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * fluid: button set resize to the size of the container up to a maximum dependant on the
   * number of buttons. Overrides `stacked` property.
   */
  fluid?: boolean;
  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal)
   */
  stacked?: boolean;
}

const buttonOrder = (kind) =>
  ({
    ghost: 1,
    'danger--ghost': 2,
    tertiary: 3,
    danger: 5,
    primary: 6,
  })[kind] ?? 4;

const getButtonKind = (element: unknown): ButtonKind | 'primary' => {
  if (
    React.isValidElement(element) &&
    element.props &&
    typeof element.props === 'object'
  ) {
    const props = element.props as { kind?: ButtonKind };
    return props.kind ?? 'primary';
  }
  return 'primary';
};

const ButtonSet = forwardRef<HTMLDivElement, ButtonSetProps>((props, ref) => {
  const { children, className, fluid, stacked, ...rest } = props;
  const prefix = usePrefix();
  const fluidInnerRef = useRef<HTMLDivElement>(null);
  const [isStacked, setIsStacked] = useState(false);
  const [sortedChildren, setSortedChildren] = useState(
    React.Children.toArray(children)
  );

  /**
   * Used to determine if the buttons are currently stacked
   */
  useIsomorphicEffect(() => {
    const checkStacking = () => {
      let newIsStacked = stacked || false;

      if (fluidInnerRef && fluidInnerRef.current) {
        const computedStyle = window.getComputedStyle(fluidInnerRef.current);

        newIsStacked =
          computedStyle?.getPropertyValue?.('--flex-direction') === 'column';
      }
      return newIsStacked;
    };

    /* initial value not dependant on observer */
    setIsStacked(checkStacking());

    if (!fluidInnerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setIsStacked(checkStacking());
    });
    resizeObserver.observe(fluidInnerRef.current);

    return () => resizeObserver.disconnect();
  }, [isStacked, stacked]);

  useEffect(() => {
    const newSortedChildren = React.Children.toArray(children);

    newSortedChildren.sort((a: unknown, b: unknown) => {
      return (
        (buttonOrder(getButtonKind(a)) - buttonOrder(getButtonKind(b))) *
        (isStacked ? -1 : 1)
      );
    });
    setSortedChildren(newSortedChildren);

    // adding sortedChildren to deps causes an infinite loop
  }, [children, isStacked]);

  const buttonSetClasses = classNames(className, `${prefix}--btn-set`, {
    [`${prefix}--btn-set--stacked`]: isStacked,
    [`${prefix}--btn-set--fluid`]: fluid,
  });

  return (
    <div {...rest} className={buttonSetClasses} ref={ref}>
      {fluid ? (
        <div
          ref={fluidInnerRef}
          className={classNames(`${prefix}--btn-set__fluid-inner`, {
            [`${prefix}--btn-set__fluid-inner--auto-stack`]: true,
          })}>
          {sortedChildren}
        </div>
      ) : (
        children
      )}
    </div>
  );
});

ButtonSet.displayName = 'ButtonSet';
ButtonSet.propTypes = {
  /**
   * Specify the content of your ButtonSet
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your ButtonSet
   */
  className: PropTypes.string,

  /**
   * fluid: button set resize to the size of the container up to a maximum dependant on the
   * number of buttons.
   */
  fluid: PropTypes.bool,

  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal) - ignored when fluid is true
   */
  stacked: PropTypes.bool,
};

export default ButtonSet;



File: ButtonSet/ButtonSet-test.js


/**
 * Copyright IBM Corp. 2016, 2025 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ButtonSet from '../ButtonSet';

describe('ButtonSet', () => {
  it('should support rendering elements through the `children` prop', () => {
    render(
      <ButtonSet data-testid="test">
        <span data-testid="child">child</span>
      </ButtonSet>
    );
    expect(screen.getByTestId('test')).toContainElement(
      screen.getByTestId('child')
    );
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<ButtonSet className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(<ButtonSet data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` that is placed on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<ButtonSet ref={ref} />);
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('stacked', () => {
    it('should set the stacked class when stacked is provided', () => {
      render(<ButtonSet data-testid="test" stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--stacked');
    });
  });

  describe('fluid', () => {
    it('should apply fluid class when fluid prop is true', () => {
      render(<ButtonSet data-testid="test" fluid />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--fluid');
    });

    it('should not apply fluid class when fluid prop is false', () => {
      render(<ButtonSet data-testid="test" fluid={false} />);
      expect(screen.getByTestId('test')).not.toHaveClass('cds--btn-set--fluid');
    });

    it('should override stacked prop when fluid is true', () => {
      render(<ButtonSet data-testid="test" fluid stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--fluid');
      // Fluid should take precedence, so stacked class may not be applied initially
    });

    it('should render fluid inner wrapper when fluid is true', () => {
      const { container } = render(
        <ButtonSet data-testid="test" fluid>
          <button>Button 1</button>
        </ButtonSet>
      );
      const fluidInner = container.querySelector('.cds--btn-set__fluid-inner');
      expect(fluidInner).toBeInTheDocument();
    });

    it('should not render fluid inner wrapper when fluid is false', () => {
      const { container } = render(
        <ButtonSet data-testid="test">
          <button>Button 1</button>
        </ButtonSet>
      );
      const fluidInner = container.querySelector('.cds--btn-set__fluid-inner');
      expect(fluidInner).not.toBeInTheDocument();
    });

    it('should sort buttons by kind in horizontal layout (ghost < tertiary < secondary < danger < primary)', () => {
      const { container } = render(
        <ButtonSet fluid>
          <button data-testid="primary" kind="primary">
            Primary
          </button>
          <button data-testid="ghost" kind="ghost">
            Ghost
          </button>
          <button data-testid="tertiary" kind="tertiary">
            Tertiary
          </button>
        </ButtonSet>
      );
      const buttons = container.querySelectorAll('button');
      // In horizontal layout: ghost (1) < tertiary (3) < primary (6)
      expect(buttons[0]).toHaveAttribute('data-testid', 'ghost');
      expect(buttons[1]).toHaveAttribute('data-testid', 'tertiary');
      expect(buttons[2]).toHaveAttribute('data-testid', 'primary');
    });

    it('should reverse button order when stacked in narrow container', async () => {
      const { act } = require('@testing-library/react');

      // Mock ResizeObserver
      let resizeCallback;
      global.ResizeObserver = jest.fn((callback) => {
        resizeCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      // Mock getComputedStyle
      window.getComputedStyle = jest.fn(() => ({
        getPropertyValue: (prop) =>
          prop === '--flex-direction' ? 'column' : '',
      }));

      const { container, rerender } = render(
        <ButtonSet fluid>
          <button data-testid="primary" kind="primary">
            Primary
          </button>
          <button data-testid="ghost" kind="ghost">
            Ghost
          </button>
          <button data-testid="tertiary" kind="tertiary">
            Tertiary
          </button>
        </ButtonSet>
      );

      // Trigger resize to stacked state
      await act(async () => {
        if (resizeCallback) {
          resizeCallback();
        }
      });

      const buttons = container.querySelectorAll('button');
      // Reversed order when stacked
      expect(buttons[0]).toHaveAttribute('data-testid', 'primary');
      expect(buttons[1]).toHaveAttribute('data-testid', 'tertiary');
      expect(buttons[2]).toHaveAttribute('data-testid', 'ghost');
    });
  });
});



