File: Tile/Tile.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as TileStories from './Tile.stories';
import * as TileFeatureFlagStories from './Tile.featureflag.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Tile

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Tile)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tile/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tile/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Clickable](#clickable)
  - [With Custom Icon](#with-custom-icon)
- [Expandable](#expandable)
- [Expandable with Interactive](#expandable-with-interactive)
- [Selectable](#selectable)
- [Multi Select](#multi-select)
- [Radio](#radio)
- [Experimental Improved Contrast](#experimental-improved-contrast)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={TileStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.Default),
    },
  ]}
/>

## Clickable

<Canvas
  of={TileStories.Clickable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.Clickable),
    },
  ]}
/>

#### With Custom Icon

<Canvas
  of={TileStories.ClickableWithCustomIcon}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(TileStories.ClickableWithCustomIcon),
    },
  ]}
/>

## Expandable

<Canvas
  of={TileStories.Expandable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.Expandable),
    },
  ]}
/>

## Expandable with Interactive

<Canvas
  of={TileStories.ExpandableWithInteractive}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(TileStories.ExpandableWithInteractive),
    },
  ]}
/>

## Selectable

<Canvas
  of={TileStories.Selectable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.Selectable),
    },
  ]}
/>

## Multi Select

<Canvas
  of={TileStories.MultiSelect}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.MultiSelect),
    },
  ]}
/>

## Radio

<Canvas
  of={TileStories.Radio}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TileStories.Radio),
    },
  ]}
/>

## Improved Contrast Flag

In Sass, you can enable the improved contrast tiles via a feature flag.

```scss
@include feature-flags.enable('enable-tile-contrast');
```

or if you have multiple feature flags you can enable them this way.

```scss
@use '@carbon/react/scss/feature-flags' with (
  $feature-flags: (
    'enable-tile-contrast': true,
  )
);
```

<Canvas>
  <div style={{ width: '1018px', maxWidth: '100%' }}>
    <Canvas
      of={TileFeatureFlagStories.Clickable}
      meta={TileFeatureFlagStories}
    />
  </div>
  <div style={{ width: '1018px', maxWidth: '100%' }}>
    <Canvas
      of={TileFeatureFlagStories.Expandable}
      meta={TileFeatureFlagStories}
    />
  </div>
  <div style={{ width: '1018px', maxWidth: '100%' }}>
    <Canvas
      of={TileFeatureFlagStories.MultiSelect}
      meta={TileFeatureFlagStories}
    />
  </div>
  <div style={{ width: '1018px', maxWidth: '100%' }}>
    <Canvas of={TileFeatureFlagStories.Radio} meta={TileFeatureFlagStories} />
  </div>
  <div style={{ width: '1018px', maxWidth: '100%' }}>
    <Canvas
      of={TileFeatureFlagStories.Selectable}
      meta={TileFeatureFlagStories}
    />
  </div>
</Canvas>


## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Tile/Tile.mdx).



File: Tile/tile-story.scss


//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/components/tile';
@use '@carbon/react/scss/type';

.preview-tile {
  @include tile.tile(
    $enable-tile-contrast: true,
    $enable-v12-tile-radio-icons: true
  );
}

div .cds--tile--selectable:not(:last-child) {
  margin-block-end: 1rem;
}

.carbon-storybook-template--annotation--background {
  margin: 0 !important; /* stylelint-disable-line declaration-no-important */
  min-block-size: 0 !important; /* stylelint-disable-line declaration-no-important */
}



File: Tile/Tile.featureflag.stories.js


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Button from '../Button';
import { default as TextInput } from '../TextInput';
import { default as RadioTile } from '../RadioTile';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '.';
import { TileGroup } from '../TileGroup';
import { Layer } from '../Layer';
import './tile-story.scss';
import '../AILabel/ailabel-story.scss';
import {
  Launch,
  ArrowRight,
  View,
  FolderOpen,
  Folders,
} from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/Tile/Feature Flag',
  component: Tile,
  subcomponents: {
    ClickableTile,
    SelectableTile,
    ExpandableTile,
    RadioTile,
    TileGroup,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  tags: ['!autodocs'],
};

const previewClassname = 'preview-tile';

export const Clickable = (args) => {
  return (
    <div className={previewClassname}>
      <ClickableTile
        id="clickable-tile-1"
        href="https://www.carbondesignsystem.com/"
        {...args}>
        Clickable Tile
      </ClickableTile>
    </div>
  );
};

Clickable.args = {
  disabled: false,
};

Clickable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ClickableWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <div className={previewClassname}>
          <ClickableTile
            id={`clickable-tile-${layer}`}
            href="https://www.carbondesignsystem.com/">
            Clickable Tile
          </ClickableTile>
        </div>
      )}
    </WithLayer>
  );
};

export const Selectable = (args) => {
  return (
    <div className={previewClassname}>
      <SelectableTile
        id="selectable-tile-1"
        name="tiles"
        value="selectable"
        {...args}>
        Selectable
      </SelectableTile>
    </div>
  );
};

Selectable.args = {
  disabled: false,
};

Selectable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const MultiSelect = (args) => {
  return (
    <div
      role="group"
      aria-label="selectable tiles"
      className={previewClassname}>
      <SelectableTile id="selectable-tile-1" name="tiles" {...args}>
        Option 1
      </SelectableTile>
      <SelectableTile id="selectable-tile-2" name="tiles" {...args}>
        Option 2
      </SelectableTile>
      <SelectableTile id="selectable-tile-3" name="tiles" {...args}>
        Option 3
      </SelectableTile>
    </div>
  );
};

MultiSelect.args = {
  disabled: false,
};

MultiSelect.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const Radio = (args) => {
  return (
    <div className={previewClassname}>
      <TileGroup legend="Radio Tile Group" name="radio tile group">
        <RadioTile
          id="radio-tile-1"
          value="radio-tile-1"
          style={{ marginBottom: '.5rem' }}
          {...args}>
          Option 1
        </RadioTile>
        <RadioTile
          id="radio-tile-2"
          value="radio-tile-2"
          style={{ marginBottom: '.5rem' }}
          {...args}>
          Option 2
        </RadioTile>
        <RadioTile id="radio-tile-3" value="radio-tile-3" {...args} disabled>
          Option 3
        </RadioTile>
      </TileGroup>
    </div>
  );
};

Radio.args = {
  disabled: false,
};

Radio.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const RadioWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <div className={previewClassname}>
          <TileGroup
            legend="Radio Tile Group"
            name={`radio-tile-group-${layer}`}>
            <RadioTile
              id={`radio-tile-${layer}-1`}
              value={`radio-tile-${layer}-1`}
              style={{ marginBottom: '.5rem' }}>
              Option 1
            </RadioTile>
            <RadioTile
              id={`radio-tile-${layer}-2`}
              value={`radio-tile-${layer}-2`}>
              Option 2
            </RadioTile>
          </TileGroup>
        </div>
      )}
    </WithLayer>
  );
};

export const Expandable = () => (
  <div style={{ width: '400px' }} className={previewClassname}>
    <ExpandableTile
      id="expandable-tile-1"
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile">
      <TileAboveTheFoldContent>
        <div style={{ height: '200px' }}>Above the fold content here</div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ height: '400px' }}>Below the fold content here</div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

export const ExpandableWithInteractive = () => (
  <div style={{ width: '400px' }} className={previewClassname}>
    <ExpandableTile
      id="expandable-tile-1"
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile">
      <TileAboveTheFoldContent>
        <div style={{ height: '200px', width: '200px' }}>
          Above the fold content here
          <div style={{ paddingTop: '1rem' }}>
            <Button>Example</Button>
          </div>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ height: '200px', width: '200px' }}>
          Below the fold content here
          <TextInput id="test2" invalidText="A valid value is required" />
        </div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

export const ExpandableWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: '400px' }} className={previewClassname}>
          <ExpandableTile
            id={`expandable-tile-${layer}`}
            tileCollapsedIconText="Interact to Expand tile"
            tileExpandedIconText="Interact to Collapse tile">
            <TileAboveTheFoldContent>
              <div style={{ height: '100px', width: '200px' }}>
                Above the fold content here
              </div>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
              <div style={{ height: '200px', width: '200px' }}>
                Below the fold content here
                <Layer>
                  <TextInput
                    id={`expandable-tile-${layer}-input`}
                    invalidText="A valid value is required"
                  />
                </Layer>
              </div>
            </TileBelowTheFoldContent>
          </ExpandableTile>
        </div>
      )}
    </WithLayer>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

export const _WithAILabel = {
  argTypes: {
    hasRoundedCorners: {
      control: {
        type: 'boolean',
      },
    },
    decorator: {
      description:
        '**Experimental**: Provide a `decorator` component to be rendered inside the component',
    },
  },
  render: (args) => (
    <div className="ai-label-selectable-tile-container ai-label-preview-radio-tile-container">
      <TileGroup
        defaultSelected="default-selected"
        legend="Radio Tile Group - Feature Flags enabled"
        name="radio tile group two"
        {...args}>
        <RadioTile
          className="ai-label-radio-tile"
          id="radio-tile-4"
          value="standard"
          decorator={aiLabel}
          {...args}>
          Option 1
        </RadioTile>
        <RadioTile
          className="ai-label-radio-tile"
          id="radio-tile-5"
          value="default-selected"
          decorator={aiLabel}
          {...args}>
          Option 2
        </RadioTile>
        <RadioTile
          className="ai-label-radio-tile"
          id="radio-tile-6"
          value="selected"
          decorator={aiLabel}
          {...args}>
          Option 3
        </RadioTile>
      </TileGroup>
    </div>
  ),
};



File: Tile/Tile-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from './Tile';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Link from '../Link';
import { Add } from '@carbon/icons-react';
import { AILabel } from '../AILabel';

const prefix = 'cds';

describe('Tile', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(<Tile carbon-name="test">Default tile</Tile>);
      expect(screen.getByText('Default tile')).toHaveAttribute('carbon-name');
    });

    it('should render children as expected', () => {
      render(
        <Tile data-testid="test-id">
          Default tile
          <br data-testid="br-test-id" />
          <br data-testid="br-test-id" />
          <Link href="https://www.carbondesignsystem.com">Link</Link>
        </Tile>
      );
      expect(screen.getByText('Default tile')).toBeInTheDocument();
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getAllByTestId('br-test-id').length).toEqual(2);
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(<Tile className="custom-tile-class">Default tile</Tile>);
      expect(screen.getByText('Default tile')).toHaveClass('custom-tile-class');
    });

    it('should respect decorator prop', () => {
      render(<Tile decorator={<AILabel />}>Default tile</Tile>);
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });
    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Tile slug={<AILabel />}>Default tile</Tile>);
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  describe('ClickableTile', () => {
    it('renders with a link', () => {
      render(
        <ClickableTile href="https://www.carbondesignsystem.com">
          Clickable Tile
        </ClickableTile>
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
    it('does not invoke the click handler if ClickableTile is disabled', async () => {
      const onClick = jest.fn();
      render(
        <ClickableTile
          onClick={onClick}
          disabled
          href="https://www.carbondesignsystem.com">
          🚦
        </ClickableTile>
      );
      await userEvent.click(screen.getByText('🚦'));
      expect(onClick).not.toHaveBeenCalled();
    });
    it('should allow for a custom icon', () => {
      render(
        <ClickableTile
          href="https://www.carbondesignsystem.com"
          renderIcon={() => <Add data-testid="test" />}>
          Clickable Tile
        </ClickableTile>
      );

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });

    it('should respect decorator prop', () => {
      render(
        <ClickableTile decorator={<AILabel />}>Default tile</ClickableTile>
      );
      expect(document.querySelector(`.${prefix}--cds--ai-label`));
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(<ClickableTile slug>Default tile</ClickableTile>);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('svg')).toHaveClass(
        `${prefix}--tile--ai-label-icon`
      );
      spy.mockRestore();
    });
    it('should call onKeyDown', async () => {
      const onKeyDown = jest.fn();
      render(<ClickableTile onKeyDown={onKeyDown}>keytest</ClickableTile>);
      await userEvent.type(screen.getByText('keytest'), 'one');
      expect(onKeyDown).toHaveBeenCalledTimes(3);
    });
  });

  describe('Multi Select', () => {
    it('does not invoke the click handler if SelectableTile is disabled', async () => {
      const onClick = jest.fn();
      render(
        <div role="group" aria-label="selectable tiles">
          <SelectableTile disabled id="tile-1" onClick={onClick}>
            <span role="img" aria-label="vertical traffic light">
              🚦
            </span>
          </SelectableTile>
        </div>
      );
      await userEvent.click(screen.getByText('🚦'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should cycle elements in document tab order', async () => {
      render(
        <div role="group" aria-label="selectable tiles">
          <SelectableTile data-testid="element" id="tile-1">
            tile 1
          </SelectableTile>
          <SelectableTile data-testid="element" id="tile-2">
            tile 2
          </SelectableTile>
          <SelectableTile data-testid="element" id="tile-3">
            tile 3
          </SelectableTile>
        </div>
      );
      const [id1, id2, id3] = screen.getAllByTestId('element');
      expect(document.body).toHaveFocus();

      await userEvent.tab();

      expect(id1).toHaveFocus();

      await userEvent.tab();

      expect(id2).toHaveFocus();

      await userEvent.tab();

      expect(id3).toHaveFocus();

      await userEvent.tab();

      // cycle goes back to the body element
      expect(document.body).toHaveFocus();

      await userEvent.tab();

      expect(id1).toHaveFocus();
    });

    it('should respect decorator prop', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <SelectableTile decorator={<AILabel />} id="tile-1" onClick={onClick}>
          Default tile
        </SelectableTile>
      );
      const aiLabel = screen.getByRole('button', {
        name: 'AI Show information',
      });
      expect(aiLabel).toBeInTheDocument();
      const tile = container.firstChild;
      await userEvent.click(aiLabel);
      expect(tile).not.toHaveClass(`${prefix}--tile--is-selected`);
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <SelectableTile slug={<AILabel />} id="tile-1">
          Default tile
        </SelectableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  describe('ExpandableTile', () => {
    it('renders initial children as expected', () => {
      const onClick = jest.fn();
      render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(screen.getByText('TestAbove')).toBeInTheDocument();
      expect(screen.getByText('TestBelow')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      render(<ExpandableTile className="extra-class" />);
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--expandable`
      );
      expect(screen.getByRole('button')).toHaveClass(`extra-class`);
    });

    it('toggles the expandable class on click', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(container.firstChild.nodeName).toBe('BUTTON');
      expect(screen.getByRole('button')).not.toHaveClass(
        `${prefix}--tile--is-expanded`
      );
      const tile = screen.getByText('TestAbove');
      await userEvent.click(tile);
      expect(onClick).toHaveBeenCalled();
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--tile--is-expanded`
      );
    });

    it('contains the default tooltip for the button', async () => {
      render(
        <ExpandableTile>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      const expandableTile = screen.getByRole('button');
      expect(expandableTile).toHaveAttribute(
        'title',
        'Interact to expand Tile'
      );
      await userEvent.click(expandableTile);
      expect(expandableTile).toHaveAttribute(
        'title',
        'Interact to collapse Tile'
      );
    });

    it('displays the custom tooltips for the button depending on state', async () => {
      render(
        <ExpandableTile
          tileCollapsedIconText={'Click To Expand'}
          tileExpandedIconText={'Click To Collapse'}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const expandableTile = screen.getByRole('button');
      expect(expandableTile).toHaveAttribute('title', 'Click To Expand');
      await userEvent.click(expandableTile);
      expect(expandableTile).toHaveAttribute('title', 'Click To Collapse');
    });

    it('supports setting expanded prop to true', () => {
      render(
        <ExpandableTile expanded tileExpandedLabel="expanded-test">
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(`${prefix}--tile--is-expanded`);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const chevron = screen
        .getByRole('button')
        .querySelector('.cds--tile__chevron');
      expect(chevron).toBeInTheDocument();

      const span = chevron.querySelector('span');
      expect(span).toHaveTextContent('expanded-test');
    });

    it('supports setting expanded prop to false', () => {
      render(
        <ExpandableTile expanded={false}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(screen.getByRole('button')).not.toHaveClass(
        `${prefix}--tile--is-expanded`
      );
    });

    it('should respect decorator prop', () => {
      render(
        <ExpandableTile decorator={<AILabel />}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <ExpandableTile slug={<AILabel />}>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  describe('ExpandableTile with interactive elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <button type="button">TestAbove</button>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <button type="button">TestBelow</button>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const tile = container.firstChild;
      const expandButton = screen.getByRole('button', {
        name: 'Interact to expand Tile',
      });

      expect(tile.nodeName).not.toBe('BUTTON');
      expect(tile).toContainElement(expandButton);
      expect(tile).not.toHaveAttribute('aria-expanded');

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
      expect(expandButton).toHaveAttribute(
        'aria-controls',
        expect.stringContaining('expandable-tile-interactive')
      );

      await userEvent.click(expandButton);

      expect(onClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('ExpandableTile with role elements', () => {
    it('does not render the tile as a button and expands/collapses', async () => {
      const onClick = jest.fn();
      const { container } = render(
        <ExpandableTile onClick={onClick}>
          <TileAboveTheFoldContent>
            <div role="table" className="testing">
              TestAbove
            </div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div>TestBelow</div>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );

      const tile = container.firstChild;
      const expandButton = screen.getByRole('button', {
        name: 'Interact to expand Tile',
      });

      expect(tile.nodeName).not.toBe('BUTTON');
      expect(tile).toContainElement(expandButton);
      expect(tile).not.toHaveAttribute('aria-expanded');

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
      expect(expandButton).toHaveAttribute(
        'aria-controls',
        expect.stringContaining('expandable-tile-interactive')
      );

      await userEvent.click(expandButton);

      expect(onClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
    it('supports interactive elements in expanded state', async () => {
      const onButtonClick = jest.fn();
      render(
        <ExpandableTile tileMaxHeight={100} tilePadding={0} expanded>
          <TileAboveTheFoldContent>
            <div>TestAbove</div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <button onClick={onButtonClick}>Test Button</button>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      );
      const expandButton = screen.getByRole('button', {
        name: 'Interact to collapse Tile',
      });
      const testButton = screen.getByRole('button', { name: 'Test Button' });
      await userEvent.click(testButton);

      expect(onButtonClick).toHaveBeenCalled();
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('respect selected prop', async () => {
    const { container } = render(
      <SelectableTile id="selectable-tile-1" selected>
        Option 1
      </SelectableTile>
    );
    const tile = container.firstChild;
    expect(tile).toHaveClass(`${prefix}--tile--is-selected`);
    await userEvent.click(tile);
    expect(tile).not.toHaveClass(`${prefix}--tile--is-selected`);
  });

  it('SelectableTile Should call onChange with correct values', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <SelectableTile id="selectable-tile-1" onChange={onChange}>
        Option 1
      </SelectableTile>
    );
    const tile = container.firstChild;
    await userEvent.click(tile);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'click',
      }),
      true,
      'selectable-tile-1'
    );
    // should de-select when user press enter key on selected tile.
    tile.focus();
    await userEvent.keyboard('[Enter]');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keydown',
      }),
      false,
      'selectable-tile-1'
    );
  });

  it('should call onKeyDown', async () => {
    const onKeyUp = jest.fn();
    render(<ExpandableTile onKeyUp={onKeyUp}>Test Content</ExpandableTile>);
    await userEvent.type(screen.getByText('Test Content'), '{enter}');
    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('should toggle the expanded state when the expanded prop changes dynamically', async () => {
    const { rerender } = render(
      <ExpandableTile expanded={false}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div>TestBelow</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
    const button = screen.getByRole('button');
    // Helper function to check the button's expanded state
    const checkExpandedState = (isExpanded) => {
      const className = `${prefix}--tile--is-expanded`;
      expect(button).toHaveAttribute(
        'aria-expanded',
        isExpanded ? 'true' : 'false'
      );
      if (isExpanded) {
        expect(button).toHaveClass(className);
      } else {
        expect(button).not.toHaveClass(className);
      }
    };
    // Initial state: expanded = false
    checkExpandedState(false);
    // Update to expanded = true
    rerender(
      <ExpandableTile expanded={true}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div>TestBelow</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    );
    checkExpandedState(true);
    // Update back to expanded = false
    rerender(
      <ExpandableTile expanded={false}>
        <TileAboveTheFoldContent>
          <div>TestAbove</div>
        </TileAboveTheFoldContent>
      </ExpandableTile>
    );
    checkExpandedState(false);
  });

  describe('SelectableTile React Strict Mode', () => {
    it('Should call onChange only once per interaction in React Strict Mode', async () => {
      const onChange = jest.fn();

      // Wrap component in React.StrictMode to enable strict mode
      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;

      // Clear any potential initial calls
      onChange.mockClear();

      // Test click interaction
      await userEvent.click(tile);

      // Should be called exactly once, not twice
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        }),
        true,
        'selectable-tile-1'
      );

      // Clear mock for next test
      onChange.mockClear();

      // Test keyboard interaction
      tile.focus();
      await userEvent.keyboard('[Enter]');

      // Should be called exactly once for keyboard interaction too
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'keydown',
        }),
        false,
        'selectable-tile-1'
      );
    });

    it('Should maintain correct state synchronization in Strict Mode when selected prop changes', async () => {
      const onChange = jest.fn();

      const { rerender } = render(
        <React.StrictMode>
          <SelectableTile
            id="selectable-tile-1"
            selected={false}
            onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      // Clear any potential initial calls
      onChange.mockClear();

      // Change the selected prop
      rerender(
        <React.StrictMode>
          <SelectableTile
            id="selectable-tile-1"
            selected={true}
            onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      // onChange should NOT be called when prop changes
      // (only when user interacts with the component)
      expect(onChange).not.toHaveBeenCalled();
    });

    it('Should handle rapid successive interactions correctly in Strict Mode', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;
      onChange.mockClear();

      // Perform multiple rapid clicks
      await userEvent.click(tile);
      await userEvent.click(tile);
      await userEvent.click(tile);

      // Should be called exactly 3 times (once per click), not 6 times
      expect(onChange).toHaveBeenCalledTimes(3);

      // Verify the selection states are correct
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.anything(),
        true,
        'selectable-tile-1'
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.anything(),
        false,
        'selectable-tile-1'
      );
      expect(onChange).toHaveBeenNthCalledWith(
        3,
        expect.anything(),
        true,
        'selectable-tile-1'
      );
    });

    // Comparison test - what would happen without the fix
    // (This test would fail with the old implementation)
    it('Should not have regression - onChange fires exactly once per user action', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <React.StrictMode>
          <SelectableTile id="selectable-tile-1" onChange={onChange}>
            Option 1
          </SelectableTile>
        </React.StrictMode>
      );

      const tile = container.firstChild;
      onChange.mockClear();

      // Single click should result in exactly one onChange call
      await userEvent.click(tile);

      expect(onChange).toHaveBeenCalledTimes(1);

      // Verify it's not called multiple times after a short delay
      // (to catch any delayed duplicate calls)
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});



File: Tile/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-tile--default'
    },
    {
      label: 'Clickable',
      variant: 'components-tile--clickable'
    },
    {
      label: 'Expandable',
      variant: 'components-tile--expandable'
    },
    {
      label: 'Expandable with interactive',
      variant: 'components-tile--expandable-with-interactive'
    },
    {
      label: 'Multiselect',
      variant: 'components-tile--multi-select'
    },
    {
      label: 'Radio',
      variant: 'components-tile--radio'
    },
    {
      label: 'Selectable',
      variant: 'components-tile--selectable'
    },
    {
      label: 'Clickable with Improved Contrast (unstable)',
      variant: 'experimental-improved-contrast-tile--clickable'
    },
    {
      label: 'Expandable with Improved Contrast (unstable)',
      variant: 'experimental-improved-contrast-tile--expandable'
    },
    {
      label: 'Multiselect with Improved Contrast (unstable)',
      variant: 'experimental-improved-contrast-tile--multi-select'
    },
    {
      label: 'Radio with Improved Contrast (unstable)',
      variant: 'experimental-improved-contrast-tile--radio'
    },
    {
      label: 'Selectable with Improved Contrast (unstable)',
      variant: 'experimental-improved-contrast-tile--selectable'
    }
  ]}
/>



File: Tile/Tile.tsx


/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Checkbox,
  CheckboxCheckedFilled,
  ChevronDown,
  Error,
  ArrowRight,
  AiLabel,
} from '@carbon/icons-react';
import Link from '../Link';
import { keys, matches } from '../../internal/keyboard';
import { deprecate } from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import {
  getInteractiveContent,
  getRoleContent,
} from '../../internal/useNoInteractiveChildren';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useFeatureFlag } from '../FeatureFlags';
import { useId } from '../../internal/useId';
import { Text } from '../Text';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Tile` component
   */
  decorator?: ReactNode;
  /** @deprecated */
  light?: boolean;

  /**
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when an AILabel is present
   */
  hasRoundedCorners?: boolean;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Tile` component
   */
  slug?: ReactNode;
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  (
    {
      children,
      className,
      decorator,
      light = false,
      slug,
      hasRoundedCorners = false,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();

    const tileClasses = cx(
      `${prefix}--tile`,
      {
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      },
      className
    );
    return (
      <div className={tileClasses} ref={ref} {...rest}>
        {children}
        {slug}
        {decorator && (
          <div className={`${prefix}--tile--inner-decorator`}>{decorator}</div>
        )}
      </div>
    );
  }
);

Tile.displayName = 'Tile';
Tile.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Tile` component
   */
  decorator: PropTypes.node,

  /**
   * **Experimental**: Specify if the `Tile` component should be rendered with rounded corners. Only valid
   * when an AILabel is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   *
   * @deprecated
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Tile` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `Tile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),
};

export interface ClickableTileProps extends HTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component or set the boolean to True for an AILabel icon to be rendered inside the `ClickableTile` component
   */
  decorator?: boolean | ReactNode;

  /** @deprecated */
  light?: boolean;

  /**
   * Boolean for whether a tile has been clicked.
   */
  clicked?: boolean;

  /**
   * Specify whether the ClickableTile should be disabled
   */
  disabled?: boolean;

  /**
   * **Experimental**: Specify if the `ClickableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * The href for the link.
   */
  href?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the function to run when the ClickableTile is clicked
   */
  onClick?(event: MouseEvent): void;

  /**
   * Specify the function to run when the ClickableTile is interacted with via a keyboard
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * The rel property for the link.
   */
  rel?: string;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Specify if a `Slug` icon should be rendered inside the `ClickableTile`
   */
  slug?: boolean;
}

export const ClickableTile = React.forwardRef<
  HTMLAnchorElement,
  ClickableTileProps
>(
  (
    {
      children,
      className,
      clicked = false,
      decorator,
      disabled,
      href,
      light,
      onClick = () => {},
      onKeyDown = () => {},
      renderIcon: Icon,
      hasRoundedCorners,
      slug,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const classes = cx(
      `${prefix}--tile`,
      `${prefix}--tile--clickable`,
      {
        [`${prefix}--tile--is-clicked`]: clicked,
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      },
      className
    );

    const [isSelected, setIsSelected] = useState(clicked);

    function handleOnClick(evt: MouseEvent) {
      evt?.persist?.();
      setIsSelected(!isSelected);
      onClick(evt);
    }

    function handleOnKeyDown(evt: KeyboardEvent) {
      evt?.persist?.();
      if (matches(evt, [keys.Enter, keys.Space])) {
        setIsSelected(!isSelected);
      }
      onKeyDown(evt);
    }

    const v12DefaultIcons = useFeatureFlag('enable-v12-tile-default-icons');
    if (v12DefaultIcons) {
      if (!Icon) {
        Icon = ArrowRight;
      }

      if (disabled) {
        Icon = Error;
      }
    }

    const iconClasses = cx({
      [`${prefix}--tile--icon`]:
        !v12DefaultIcons || (v12DefaultIcons && !disabled),
      [`${prefix}--tile--disabled-icon`]: v12DefaultIcons && disabled,
    });

    return (
      <Link
        className={classes}
        href={href}
        tabIndex={!href && !disabled ? 0 : undefined}
        onClick={!disabled ? handleOnClick : undefined}
        onKeyDown={handleOnKeyDown}
        ref={ref}
        disabled={disabled}
        {...rest}>
        {slug || decorator ? (
          <div className={`${prefix}--tile-content`}>{children}</div>
        ) : (
          children
        )}
        {(slug === true || decorator === true) && (
          <AiLabel size="24" className={`${prefix}--tile--ai-label-icon`} />
        )}
        {React.isValidElement(decorator) && (
          <div className={`${prefix}--tile--inner-decorator`}>{decorator}</div>
        )}
        {Icon && <Icon className={iconClasses} aria-hidden="true" />}
      </Link>
    );
  }
);

ClickableTile.displayName = 'ClickableTile';
ClickableTile.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * Boolean for whether a tile has been clicked.
   */
  clicked: PropTypes.bool,

  /**
   * **Experimental**: Provide a `decorator` component or set the boolean to True for an AILabel icon to be rendered inside the `ClickableTile` component
   */
  decorator: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   * Specify whether the ClickableTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * **Experimental**: Specify if the `ClickableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * The href for the link.
   */
  href: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ClickableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * Specify the function to run when the ClickableTile is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the function to run when the ClickableTile is interacted with via a keyboard
   */
  onKeyDown: PropTypes.func,

  /**
   * The rel property for the link.
   */
  rel: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export interface SelectableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `SelectableTile` component
   */
  decorator?: ReactNode;

  /** @deprecated */
  light?: boolean;

  /**
   * Specify whether the SelectableTile should be disabled
   */
  disabled?: boolean;

  /**
   * **Experimental**: Specify if the `SelectableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `name` of the `<input>`.
   * @deprecated
   */
  name?: string;

  /**
   * The empty handler of the `<input>`.
   */
  onChange?(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    selected?: boolean,
    id?: string
  ): void;

  /**
   * Specify the function to run when the SelectableTile is clicked
   */
  onClick?(event: MouseEvent<HTMLDivElement>): void;

  /**
   * Specify the function to run when the SelectableTile is interacted with via a keyboard
   */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void;

  /**
   * `true` to select this tile.
   */
  selected?: boolean;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug?: ReactNode;

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex?: number;

  /**
   * The `title` of the `<input>`.
   */
  title?: string;

  /**
   * The value of the `<input>`.
   * @deprecated
   */
  value?: string | number;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const SelectableTile = React.forwardRef<
  HTMLDivElement,
  SelectableTileProps
>(
  (
    {
      children,
      className,
      decorator,
      disabled,
      id,
      light,
      onClick = () => {},
      onChange = () => {},
      onKeyDown = () => {},
      selected = false,
      tabIndex = 0,
      title = 'title',
      slug,
      hasRoundedCorners,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();

    const clickHandler = onClick;
    const keyDownHandler = onKeyDown;

    const [isSelected, setIsSelected] = useState<boolean>(selected);

    // Use useEffect to sync with prop changes instead of render-time logic
    useEffect(() => {
      setIsSelected(selected);
    }, [selected]);

    const classes = cx(
      `${prefix}--tile`,
      `${prefix}--tile--selectable`,
      {
        [`${prefix}--tile--is-selected`]: isSelected,
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--disabled`]: disabled,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      },
      className
    );

    // Single function to handle selection changes
    const handleSelectionChange = useCallback(
      (
        evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
        newSelected: boolean
      ) => {
        setIsSelected(newSelected);
        onChange(evt, newSelected, id);
      },
      [onChange, id]
    );

    function handleClick(evt: MouseEvent<HTMLDivElement>) {
      evt.preventDefault();
      evt?.persist?.();
      if (
        normalizedDecorator &&
        decoratorRef.current &&
        evt.target instanceof Node &&
        decoratorRef.current.contains(evt.target)
      ) {
        return;
      }

      const newSelected = !isSelected;
      handleSelectionChange(evt, newSelected);
      clickHandler(evt);
    }

    function handleKeyDown(evt: KeyboardEvent<HTMLDivElement>) {
      evt?.persist?.();
      if (matches(evt, [keys.Enter, keys.Space])) {
        evt.preventDefault();
        const newSelected = !isSelected;
        handleSelectionChange(evt, newSelected);
      }
      keyDownHandler(evt);
    }

    // AILabel is always size `xs`
    const decoratorRef = useRef<HTMLInputElement>(null);
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'xs', ref: decoratorRef })
      : candidate;

    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        className={classes}
        onClick={!disabled ? handleClick : undefined}
        role="checkbox"
        aria-checked={isSelected}
        onKeyDown={!disabled ? handleKeyDown : undefined}
        tabIndex={!disabled ? tabIndex : undefined}
        ref={ref}
        id={id}
        title={title}
        {...rest}>
        <span
          className={`${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent`}>
          {isSelected ? <CheckboxCheckedFilled /> : <Checkbox />}
        </span>
        <Text as="label" htmlFor={id} className={`${prefix}--tile-content`}>
          {children}
        </Text>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--tile--inner-decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
);

SelectableTile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `SelectableTile` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the SelectableTile should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * **Experimental**: Specify if the `SelectableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * The ID of the `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `SelectableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * The `name` of the `<input>`.
   * @deprecated
   */
  name: deprecate(
    PropTypes.string,
    'The `name` property is no longer used.  It will be removed in the next major release.'
  ),

  /**
   * The empty handler of the `<input>`.
   */
  onChange: PropTypes.func,

  /**
   * Specify the function to run when the SelectableTile is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the function to run when the SelectableTile is interacted with via a keyboard
   */
  onKeyDown: PropTypes.func,

  /**
   * `true` to select this tile.
   */
  selected: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `SelectableTile` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `SelectableTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Specify the tab index of the wrapper element
   */
  tabIndex: PropTypes.number,

  /**
   * The `title` of the `<input>`.
   */
  title: PropTypes.string,

  /**
   * The value of the `<input>`.
   * @deprecated
   */
  value: deprecate(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'The `value` property is no longer used.  It will be removed in the next major release.`'
  ),
};

export interface ExpandableTileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ExpandableTile` component
   */
  decorator?: ReactNode;

  /** @deprecated */
  light?: boolean;

  /**
   * `true` if the tile is expanded.
   */
  expanded?: boolean;

  /**
   * **Experimental**: Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * An ID that can be provided to aria-labelledby
   */
  id?: string;

  /**
   * Specify the function to run when the ExpandableTile is clicked
   */
  onClick?(event: MouseEvent): void;

  /**
   * optional handler to trigger a function when a key is pressed
   */
  onKeyUp?(event: KeyboardEvent): void;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ExpandableTile` component
   */
  slug?: ReactNode;

  /**
   * The `tabindex` attribute.
   */
  tabIndex?: number;

  /**
   * The description of the "collapsed" icon that can be read by screen readers.
   */
  tileCollapsedIconText?: string;

  /**
   * When "collapsed", a label to appear next to the chevron (e.g., "View more").
   */
  tileCollapsedLabel?: string;

  /**
   * The description of the "expanded" icon that can be read by screen readers.
   */
  tileExpandedIconText?: string;

  /**
   * When "expanded", a label to appear next to the chevron (e.g., "View less").
   */
  tileExpandedLabel?: string;

  tileMaxHeight?: number;

  tilePadding?: number;
}

export const ExpandableTile = React.forwardRef<
  HTMLElement,
  ExpandableTileProps
>(
  (
    {
      tabIndex = 0,
      className,
      children,
      decorator,
      expanded = false,
      tileMaxHeight = 0,
      tilePadding = 0,
      onClick,
      onKeyUp,
      tileCollapsedIconText = 'Interact to expand Tile',
      tileExpandedIconText = 'Interact to collapse Tile',
      tileCollapsedLabel,
      tileExpandedLabel,
      light,
      slug,
      hasRoundedCorners,
      ...rest
    },
    forwardRef
  ) => {
    const [isTileMaxHeight, setIsTileMaxHeight] =
      useState<number>(tileMaxHeight);
    const [isTilePadding, setIsTilePadding] = useState<number>(tilePadding);
    const [prevExpanded, setPrevExpanded] = useState<boolean>(expanded);
    const [prevTileMaxHeight, setPrevTileMaxHeight] =
      useState<number>(tileMaxHeight);
    const [prevTilePadding, setPrevTilePadding] = useState<number>(tilePadding);
    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);
    const [interactive, setInteractive] = useState<boolean>(true);
    const aboveTheFold = useRef<HTMLDivElement>(null);
    const belowTheFold = useRef<HTMLDivElement>(null);
    const chevronInteractiveRef = useRef<HTMLButtonElement>(null);
    const tileContent = useRef<HTMLDivElement>(null);
    const tile = useRef<HTMLElement>(null);
    const ref = useMergedRefs([forwardRef, tile]);
    const prefix = usePrefix();

    if (expanded !== prevExpanded) {
      setIsExpanded(expanded);
      setPrevExpanded(expanded);
      setMaxHeight();
    }

    if (tileMaxHeight !== prevTileMaxHeight) {
      setIsTileMaxHeight(tileMaxHeight);
      setPrevTileMaxHeight(tileMaxHeight);
    }

    if (tilePadding !== prevTilePadding) {
      setIsTilePadding(tilePadding);
      setPrevTilePadding(tilePadding);
    }

    function setMaxHeight() {
      if (isExpanded && tileContent.current) {
        setIsTileMaxHeight(tileContent.current.getBoundingClientRect()?.height);
      }

      if (aboveTheFold.current) {
        setIsTileMaxHeight(aboveTheFold.current.getBoundingClientRect().height);
      }
    }

    function handleClick(evt: MouseEvent) {
      evt?.persist?.();
      setIsExpanded(!isExpanded);
      setMaxHeight();
    }

    function handleKeyUp(evt: KeyboardEvent) {
      if (
        evt.target !== tile.current &&
        evt.target !== chevronInteractiveRef.current
      ) {
        if (matches(evt, [keys.Enter, keys.Space])) {
          evt.preventDefault();
        }
      }
    }

    function getChildren() {
      return React.Children.toArray(children);
    }

    const classNames = cx(
      `${prefix}--tile`,
      `${prefix}--tile--expandable`,
      {
        [`${prefix}--tile--is-expanded`]: isExpanded,
        [`${prefix}--tile--light`]: light,
      },
      className
    );

    const interactiveClassNames = cx(
      `${prefix}--tile`,
      `${prefix}--tile--expandable`,
      `${prefix}--tile--expandable--interactive`,
      {
        [`${prefix}--tile--is-expanded`]: isExpanded,
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      },
      className
    );

    const chevronInteractiveClassNames = cx(
      `${prefix}--tile__chevron`,
      `${prefix}--tile__chevron--interactive`
    );

    const childrenAsArray = getChildren();

    useIsomorphicEffect(() => {
      if (!tile.current || !aboveTheFold.current) {
        return;
      }

      const getStyle = window.getComputedStyle(tile.current, null);
      const { current: node } = aboveTheFold;
      const { height } = node.getBoundingClientRect();
      const paddingTop = parseInt(getStyle.getPropertyValue('padding-top'), 10);
      const paddingBottom = parseInt(
        getStyle.getPropertyValue('padding-bottom'),
        10
      );

      setIsTileMaxHeight(height);
      setIsTilePadding(paddingTop + paddingBottom);
    }, [isTileMaxHeight]);

    useIsomorphicEffect(() => {
      if (!aboveTheFold.current || !belowTheFold.current) {
        return;
      }

      // Interactive elements or elements that are given a role should be treated
      // the same because elements with a role can not be rendered inside a `button`
      if (
        !getInteractiveContent(belowTheFold.current) &&
        !getRoleContent(belowTheFold.current) &&
        !getInteractiveContent(aboveTheFold.current) &&
        !getRoleContent(aboveTheFold.current) &&
        !(slug || decorator)
      ) {
        setInteractive(false);
      }
    }, [slug, decorator]);

    useIsomorphicEffect(() => {
      if (!tile.current) {
        return;
      }

      if (isExpanded) {
        tile.current.style.maxHeight = '';
      } else {
        tile.current.style.maxHeight = isTileMaxHeight + isTilePadding + 'px';
      }
    }, [isExpanded, isTileMaxHeight, isTilePadding]);

    useEffect(() => {
      if (!aboveTheFold.current) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        const [aboveTheFold] = entries;
        setIsTileMaxHeight(aboveTheFold.contentRect.height);
      });
      resizeObserver.observe(aboveTheFold.current);

      return () => resizeObserver.disconnect();
    }, [isTileMaxHeight, isTilePadding]);

    const belowTheFoldId = useId('expandable-tile-interactive');

    // AILabel is always size `xs`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'xs' })
      : candidate;

    return interactive ? (
      <div
        ref={ref as Ref<HTMLDivElement>}
        className={interactiveClassNames}
        {...rest}>
        <div ref={tileContent}>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--tile--inner-decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
          <div ref={aboveTheFold} className={`${prefix}--tile-content`}>
            {childrenAsArray[0]}
          </div>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={belowTheFoldId}
            onKeyUp={composeEventHandlers([onKeyUp, handleKeyUp])}
            onClick={composeEventHandlers([onClick, handleClick])}
            aria-label={
              isExpanded ? tileExpandedIconText : tileCollapsedIconText
            }
            ref={chevronInteractiveRef}
            className={chevronInteractiveClassNames}>
            <ChevronDown />
          </button>
          <div
            ref={belowTheFold}
            className={`${prefix}--tile-content`}
            id={belowTheFoldId}>
            {childrenAsArray[1]}
          </div>
        </div>
      </div>
    ) : (
      <button
        type="button"
        ref={ref as Ref<HTMLButtonElement>}
        className={classNames}
        aria-expanded={isExpanded}
        title={isExpanded ? tileExpandedIconText : tileCollapsedIconText}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        onKeyUp={composeEventHandlers([onKeyUp, handleKeyUp])}
        onClick={composeEventHandlers([onClick, handleClick])}
        tabIndex={tabIndex}>
        <div ref={tileContent}>
          <div ref={aboveTheFold} className={`${prefix}--tile-content`}>
            {childrenAsArray[0]}
          </div>
          <div className={`${prefix}--tile__chevron`}>
            <span>{isExpanded ? tileExpandedLabel : tileCollapsedLabel}</span>
            <ChevronDown />
          </div>
          <div ref={belowTheFold} className={`${prefix}--tile-content`}>
            {childrenAsArray[1]}
          </div>
        </div>
      </button>
    );
  }
);

ExpandableTile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ExpandableTile` component
   */
  decorator: PropTypes.node,

  /**
   * `true` if the tile is expanded.
   */
  expanded: PropTypes.bool,

  /**
   * Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * An ID that can be provided to aria-labelledby
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ExpandableTile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * Specify the function to run when the ExpandableTile is clicked
   */
  onClick: PropTypes.func,

  /**
   * optional handler to trigger a function when a key is pressed
   */
  onKeyUp: PropTypes.func,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ExpandableTile` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `ExpandableTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * The `tabindex` attribute.
   */
  tabIndex: PropTypes.number,

  /**
   * The description of the "collapsed" icon that can be read by screen readers.
   */
  tileCollapsedIconText: PropTypes.string,

  /**
   * When "collapsed", a label to appear next to the chevron (e.g., "View more").
   */
  tileCollapsedLabel: PropTypes.string,

  /**
   * The description of the "expanded" icon that can be read by screen readers.
   */
  tileExpandedIconText: PropTypes.string,

  /**
   * When "expanded", a label to appear next to the chevron (e.g., "View less").
   */
  tileExpandedLabel: PropTypes.string,
};
ExpandableTile.displayName = 'ExpandableTile';

export interface TileAboveTheFoldContentProps {
  /**
   * The child nodes.
   */
  children?: ReactNode;
}

export const TileAboveTheFoldContent = React.forwardRef<
  HTMLDivElement,
  TileAboveTheFoldContentProps
>(({ children }, ref) => {
  const prefix = usePrefix();

  return (
    <div ref={ref} className={`${prefix}--tile-content__above-the-fold`}>
      {children}
    </div>
  );
});

TileAboveTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
TileAboveTheFoldContent.displayName = 'TileAboveTheFoldContent';

export interface TileBelowTheFoldContentProps {
  /**
   * The child nodes.
   */
  children?: ReactNode;
}

export const TileBelowTheFoldContent = React.forwardRef<
  HTMLDivElement,
  TileBelowTheFoldContentProps
>(({ children }, ref) => {
  const prefix = usePrefix();

  return (
    <div ref={ref} className={`${prefix}--tile-content__below-the-fold`}>
      {children}
    </div>
  );
});

TileBelowTheFoldContent.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};
TileBelowTheFoldContent.displayName = 'TileBelowTheFoldContent';



File: Tile/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export {
  Tile,
  type TileProps,
  ClickableTile,
  type ClickableTileProps,
  SelectableTile,
  type SelectableTileProps,
  ExpandableTile,
  type ExpandableTileProps,
  TileAboveTheFoldContent,
  type TileAboveTheFoldContentProps,
  TileBelowTheFoldContent,
  type TileBelowTheFoldContentProps,
} from './Tile';



File: Tile/Tile.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Tile/Feature Flag" name="Flag details" />

# Tile Contrast

Designed to meet accessibility standards, particularly regarding contrast
minimums. The new variant ensures that tiles are more accessible to users with
visual impairments.

## Enable tile contrast

```js
<FeatureFlags
  flags={{
    'enable-tile-contrast': true,
  }}>
  ...
</FeatureFlags>
```



File: Tile/Tile.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './tile-story.scss';
import '../AILabel/ailabel-story.scss';
import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import Link from '../Link';
import Button from '../Button';
import { default as TextInput } from '../TextInput';
import { default as RadioTile } from '../RadioTile';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from './';
import { TileGroup } from '../TileGroup';
import {
  Launch,
  ArrowRight,
  View,
  FolderOpen,
  Folders,
  Information,
} from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';

import mdx from './Tile.mdx';

export default {
  title: 'Components/Tile',
  component: Tile,
  subcomponents: {
    ClickableTile,
    SelectableTile,
    ExpandableTile,
    RadioTile,
    TileGroup,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
    slug: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Tile id="tile-1">
      Default tile
      <br />
      <br />
      <Link href="https://www.carbondesignsystem.com">Link</Link>
    </Tile>
  );
};

export const DefaultWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <Tile id={`tile-${layer}`}>
        Default tile
        <br />
        <br />
        <Link href="https://www.carbondesignsystem.com">Link</Link>
      </Tile>
    )}
  </WithLayer>
);

export const Clickable = (args) => {
  return (
    <ClickableTile
      id="clickable-tile-1"
      href="https://www.carbondesignsystem.com/"
      {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

Clickable.args = {
  disabled: false,
};

Clickable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ClickableWithCustomIcon = (args) => {
  return (
    <ClickableTile
      id="clickable-tile-1"
      href="https://www.carbondesignsystem.com/"
      renderIcon={Launch}
      {...args}>
      Clickable Tile
    </ClickableTile>
  );
};

ClickableWithCustomIcon.args = {
  disabled: false,
};

ClickableWithCustomIcon.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const ClickableWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <ClickableTile
        id={`clickable-tile-${layer}`}
        href="https://www.carbondesignsystem.com/">
        Clickable tile
      </ClickableTile>
    )}
  </WithLayer>
);

export const Selectable = (args) => {
  return (
    <SelectableTile id="selectable-tile-1" {...args}>
      Selectable
    </SelectableTile>
  );
};

Selectable.args = {
  disabled: false,
};

Selectable.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const MultiSelect = (args) => {
  return (
    <div role="group" aria-label="selectable tiles">
      <SelectableTile id="selectable-tile-1" name="tiles" {...args}>
        Option 1
      </SelectableTile>
      <SelectableTile id="selectable-tile-2" name="tiles" {...args}>
        Option 2
      </SelectableTile>
      <SelectableTile id="selectable-tile-3" name="tiles" {...args}>
        Option 3
      </SelectableTile>
    </div>
  );
};

MultiSelect.args = {
  disabled: false,
};

MultiSelect.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const Radio = (args) => {
  return (
    <TileGroup
      defaultSelected="default-selected"
      legend="Radio Tile Group"
      name="radio tile group"
      {...args}>
      <RadioTile
        id="radio-tile-1"
        value="standard"
        style={{ marginBottom: '.5rem' }}
        {...args}>
        Option 1
      </RadioTile>
      <RadioTile
        id="radio-tile-2"
        value="default-selected"
        style={{ marginBottom: '.5rem' }}
        {...args}>
        Option 2
      </RadioTile>
      <RadioTile id="radio-tile-3" value="selected" {...args}>
        Option 3
      </RadioTile>
    </TileGroup>
  );
};

Radio.args = {
  disabled: false,
};

Radio.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};

export const RadioWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TileGroup
        defaultSelected="default-selected"
        legend="Radio Tile Group"
        name={`radio tile group ${layer}`}>
        <RadioTile
          id={`radio-tile-${layer}-1`}
          value="standard"
          style={{ marginBottom: '.5rem' }}>
          Option 1
        </RadioTile>
        <RadioTile id={`radio-tile-${layer}-2`} value="default-selected">
          Option 2
        </RadioTile>
      </TileGroup>
    )}
  </WithLayer>
);

export const Expandable = () => {
  return (
    <div style={{ width: '400px' }}>
      <ExpandableTile
        id="expandable-tile-1"
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile">
        <TileAboveTheFoldContent>
          <div style={{ height: '200px' }}>Above the fold content here</div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '400px' }}>Below the fold content here</div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

export const ExpandableWithInteractive = () => {
  return (
    <div style={{ width: '400px' }}>
      <ExpandableTile
        onClick={() => console.log('click')}
        id="expandable-tile-1"
        tileCollapsedIconText="Interact to Expand tile"
        tileExpandedIconText="Interact to Collapse tile">
        <TileAboveTheFoldContent>
          <div style={{ height: '200px', width: '200px' }}>
            Above the fold content here
            <div style={{ paddingTop: '1rem' }}>
              <Button>Example</Button>
            </div>
          </div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <div style={{ height: '200px', width: '200px' }}>
            Below the fold content here
            <TextInput id="test2" invalidText="A valid value is required" />
          </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

export const ExpandableWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: '400px' }}>
          <ExpandableTile
            id={`expandable-tile-${layer}`}
            tileCollapsedIconText="Interact to Expand tile"
            tileExpandedIconText="Interact to Collapse tile">
            <TileAboveTheFoldContent>
              <div style={{ height: '100px' }}>Above the fold content here</div>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
              <div style={{ height: '200px' }}>Below the fold content here</div>
            </TileBelowTheFoldContent>
          </ExpandableTile>
        </div>
      )}
    </WithLayer>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

export const withAILabel = {
  argTypes: {
    hasRoundedCorners: {
      control: {
        type: 'boolean',
      },
    },
    decorator: {
      description:
        '**Experimental**: Provide a `decorator` component to be rendered inside the component',
    },
  },
  render: (args) => (
    <>
      <div className="ai-label-tile-container">
        <Tile decorator={aiLabel} id="tile-1" {...args}>
          <h4>Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris gravida penatibus.
          </p>
          <div className="ai-data">
            <div className="data-container">
              <p>Data Quality</p>
              <h3>85%</h3>
            </div>
            <div className="data-container">
              <p>Label text</p>
              <h3>16%</h3>
            </div>
          </div>
        </Tile>
        <ClickableTile
          href="https://www.carbondesignsystem.com/"
          decorator
          id="tile-click"
          renderIcon={ArrowRight}
          {...args}>
          <h4>Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris gravida penatibus.
          </p>
          <div className="ai-data">
            <div className="data-container">
              <p>Data Quality</p>
              <h3>85%</h3>
            </div>
            <div className="data-container">
              <p>Label text</p>
              <h3>16%</h3>
            </div>
          </div>
        </ClickableTile>

        <ExpandableTile
          id="expandable-tile-1"
          tileCollapsedIconText="Interact to Expand tile"
          tileExpandedIconText="Interact to Collapse tile"
          decorator={aiLabel}
          {...args}>
          <TileAboveTheFoldContent>
            <h4>Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris gravida penatibus.
            </p>
            <div className="ai-data">
              <div className="data-container">
                <p>Data Quality</p>
                <h3>85%</h3>
              </div>
              <div className="data-container">
                <p>Label text</p>
                <h3>16%</h3>
              </div>
            </div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <h6>Expanded Section</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris.
            </p>
          </TileBelowTheFoldContent>
        </ExpandableTile>
      </div>

      <div className="ai-label-selectable-tile-container">
        <TileGroup
          defaultSelected="default-selected"
          legend="Selectable Tile Group"
          name="selectable tile group"
          {...args}>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              id="selectable-tile-1"
              decorator={aiLabel}
              {...args}>
              Option 1
            </SelectableTile>
          </div>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              decorator={aiLabel}
              id="selectable-tile-2"
              {...args}>
              Option 2
            </SelectableTile>
          </div>
          <div>
            <SelectableTile
              className="ai-label-selectable-tile"
              decorator={aiLabel}
              id="selectable-tile-3"
              {...args}>
              Option 3
            </SelectableTile>
          </div>
        </TileGroup>
      </div>
      <br />
      <br />
      <div className="ai-label-selectable-tile-container">
        <TileGroup
          defaultSelected="default-selected"
          legend="Radio Tile Group"
          name="radio tile group"
          {...args}>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-1"
            value="standard"
            decorator={aiLabel}
            {...args}>
            Option 1
          </RadioTile>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-2"
            value="default-selected"
            decorator={aiLabel}
            {...args}>
            Option 2
          </RadioTile>
          <RadioTile
            className="ai-label-radio-tile"
            id="radio-tile-3"
            value="selected"
            decorator={aiLabel}
            {...args}>
            Option 3
          </RadioTile>
        </TileGroup>
        <br />
      </div>
    </>
  ),
};



