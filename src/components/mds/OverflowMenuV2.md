File: OverflowMenuV2/OverFlowMenuV2-test.js


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, screen } from '@testing-library/react';

import { FeatureFlags } from '../FeatureFlags';
import { MenuItem } from '../Menu';
import { OverflowMenuV2 } from './';
import React from 'react';
import { action } from 'storybook/actions';
import userEvent from '@testing-library/user-event';

describe('<OverflowMenuV2 />', () => {
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should log the deprecation warning when rendering OverflowMenuV2', () => {
    const onClick = action('onClick (MenuItem)');

    render(
      <OverflowMenuV2>
        <MenuItem label="Stop app" onClick={onClick} />
      </OverflowMenuV2>
    );

    // Check if the deprecation warning is logged
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '`<OverflowMenuV2>` is deprecated and will be removed in the next major version.'
      )
    );
  });

  it('should render correctly with feature flag enabled', async () => {
    const { getByRole, findByText } = render(
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenuV2>
          <MenuItem label="Stop app" />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenuV2>
      </FeatureFlags>
    );

    await act(async () => {
      const button = getByRole('button', { name: /options/i });
      button.click();
    });

    expect(await findByText('Stop app')).toBeInTheDocument();
    expect(await findByText('Delete app')).toBeInTheDocument();
  });

  it('should respect align prop', () => {
    const { container } = render(
      <OverflowMenuV2 autoAlign>
        <MenuItem label="Stop app" />
      </OverflowMenuV2>
    );

    expect(container.firstChild).toHaveClass('cds--autoalign');
  });

  it('should render OverflowMenu with MenuItem children', async () => {
    render(
      <FeatureFlags enableV12Overflowmenu>
        <OverflowMenuV2>
          <MenuItem label="Stop app" />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenuV2>
      </FeatureFlags>
    );

    const button = screen.getByRole('button', { name: /options/i });

    await userEvent.click(button);

    const stopAppMenuItem = await screen.findByRole('menuitem', {
      name: /Stop app/i,
    });
    const deleteAppMenuItem = await screen.findByRole('menuitem', {
      name: /Delete app/i,
    });

    expect(stopAppMenuItem).toBeInTheDocument();
    expect(deleteAppMenuItem).toBeInTheDocument();
  });
});



File: OverflowMenuV2/index.js


/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { warning } from '../../internal/warning';

import { FeatureFlags } from '../FeatureFlags';
import { OverflowMenu } from '../OverflowMenu';

let didWarnAboutDeprecation = false;

function OverflowMenuV2(props) {
  if (process.env.NODE_ENV !== 'production') {
    warning(
      didWarnAboutDeprecation,
      '`<OverflowMenuV2>` is deprecated and will be removed in the next major version. Use `<OverflowMenu>` with the `enable-v12-overflowmenu` feature flag instead.'
    );

    didWarnAboutDeprecation = true;
  }

  return (
    <FeatureFlags enableV12Overflowmenu>
      <OverflowMenu {...props} />
    </FeatureFlags>
  );
}

export { OverflowMenuV2 };



File: OverflowMenuV2/OverflowMenuv2.stories.js


/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import LinkTo from '@storybook/addon-links/react';

import { WithDeprecationNotice } from '../../../.storybook/templates/WithDeprecationNotice';

import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';

import { OverflowMenuV2 } from './';

export default {
  title: 'Preview/preview__OverflowMenuV2',
  component: OverflowMenuV2,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
};

export const _OverflowMenuV2 = () => {
  const onClick = action('onClick (MenuItem)');

  return (
    <WithDeprecationNotice
      text={
        <span>
          `OverflowMenuV2` is deprecated and will be removed in the next major
          version. Use `OverflowMenu` with the `enable-v12-overflowmenu`{' '}
          <LinkTo title="Preview/Feature Flags" name="Overview">
            feature flag
          </LinkTo>{' '}
          instead.
        </span>
      }>
      <OverflowMenuV2>
        <MenuItem label="Stop app" onClick={onClick} />
        <MenuItem label="Restart app" onClick={onClick} />
        <MenuItem label="Rename app" onClick={onClick} />
        <MenuItem label="Edit routes and access" onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" onClick={onClick} />
      </OverflowMenuV2>
    </WithDeprecationNotice>
  );
};



