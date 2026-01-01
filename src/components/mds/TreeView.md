File: TreeView/Treeview.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Document, Folder } from '@carbon/icons-react';
import { default as TreeView, TreeNode } from './';
import { Button } from '../Button/index';
import mdx from './TreeView.mdx';

import './story.scss';
import TextInput from '../TextInput';

function renderTree({ nodes, expanded, withIcons = false, withLinks = false }) {
  if (!nodes) {
    return;
  }
  return nodes.map(
    ({ children, renderIcon, href, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        href={withLinks ? href : null}
        isExpanded={expanded ?? isExpanded}
        onClick={withLinks ? (event) => event.preventDefault() : null} // This is so that we only simulate links within the storybook
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons, withLinks })}
      </TreeNode>
    )
  );
}

export default {
  title: 'components/TreeView',
  component: TreeView,
  subcomponents: {
    TreeNode,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['label'],
    },
  },
  args: {
    onSelect: action('onSelect'),
  },
};

export const Default = (args) => {
  const nodes = [
    {
      id: '1',
      value: 'Application development and integration solutions',
      label: 'Application development and integration solutions',
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }
  return (
    <TreeView label="Tree View" {...args}>
      {renderTree({ nodes })}
    </TreeView>
  );
};

Default.args = {
  hideLabel: false,
  multiselect: false,
};

Default.argTypes = {
  active: { control: { type: 'text' } },
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

export const WithIcons = () => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }
  return (
    <TreeView label="Tree View">
      {renderTree({ nodes, withIcons: true })}
    </TreeView>
  );
};

const TreeViewWithLinks = React.memo(({ setCurrentPage }) => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      href: '/artificial-intelligence',
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      href: '/blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      href: '/business-automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          href: '/business-process-automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          href: '/business-process-mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      href: '/business-operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      href: '/cloud-computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          href: '/containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          href: '/databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          href: '/devops',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              href: '/solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              href: '/case-studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  href: '/resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      href: '/data-analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          href: '/big-data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          href: '/business-intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      href: '/models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          href: '/audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          href: '/monthly-data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          href: '/data-warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              href: '/report-samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              href: '/sales-performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  return (
    <TreeView
      label="Tree View"
      hideLabel
      active="1"
      selected={['1']}
      onSelect={(event, node) => setCurrentPage(node.value)}>
      {renderTree({ nodes, withLinks: true })}
    </TreeView>
  );
});

export const WithLinks = () => {
  const [currentPage, setCurrentPage] = React.useState(
    'Artificial Intelligence'
  );

  return (
    <div id="page-body">
      <TreeViewWithLinks setCurrentPage={setCurrentPage} />
      <main>
        <h3>The current page is: {currentPage}</h3>
      </main>
    </div>
  );
};

export const WithControlledExpansion = () => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  const [expanded, setExpanded] = React.useState(undefined);

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Button onClick={() => setExpanded(true)}>Expand all</Button>
        &nbsp;
        <Button onClick={() => setExpanded(false)}>Collapse all</Button>
      </div>
      <TreeView label="Tree View">{renderTree({ nodes, expanded })}</TreeView>
    </>
  );
};

const Nested = () => {
  return <TreeNode key={21} value="Nested" label="Nested" />;
};

export const WithComplexNesting = (args) => {
  return (
    <TreeView label="Tree View with Complex Nesting" {...args}>
      <TreeNode id="1" value="A.I." label="A.I." isExpanded>
        {/* Pattern 1: A TreeNode wrapped in a simple <div> */}
        <div>
          <TreeNode id="1-1" value="Sub 1" label="Sub 1 (in a div)" />
        </div>
        <TreeNode id="1-2" value="Sub 2" label="Sub 2 (direct child)">
          <TreeNode id="1-2-1" value="Sub 2.1" label="Sub 2.1" />
        </TreeNode>
      </TreeNode>

      <TreeNode id="2" value="Analytics" label="Analytics" isExpanded>
        {/* Pattern 2: A TreeNode rendered from an imported component */}
        <Nested />
      </TreeNode>

      <TreeNode id="3" value="Trust" label="Trust" />
    </TreeView>
  );
};

WithComplexNesting.args = {
  hideLabel: true,
  multiselect: true,
  selected: ['1-1'],
};



File: TreeView/TreeView.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as TreeViewStories from './Treeview.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# TreeView

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/TreeView)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tree-view/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tree-view/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [With Controlled Expansion](#with-controlled-expansion)
- [With Icons](#with-icons)
- [With Links](#with-links)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

TreeView is a component that allows users to navigate through a hierarchy of
items. It is used to display nested lists of items that can be expanded or
collapsed to show and hide additional items.

<Canvas
  of={TreeViewStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(
          TreeViewStories.Default,
          "import { Document, Folder } from '@carbon/icons-react';"
        ),
    },
  ]}
/>

## With Controlled Expansion

The `expanded` prop can be used to control the expansion state of the TreeView.
The `isExpanded` prop can be used to determine if an individual tree node is
expanded or collapsed.

<Canvas
  of={TreeViewStories.WithControlledExpansion}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(
          TreeViewStories.WithControlledExpansion,
          "import { Document, Folder } from '@carbon/icons-react';"
        ),
    },
  ]}
/>

## With Icons

The `renderIcon` prop can be used to customize the icons of each node in the
TreeView.

<Canvas
  of={TreeViewStories.WithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(
          TreeViewStories.WithIcons,
          "import { Document, Folder } from '@carbon/icons-react';"
        ),
    },
  ]}
/>

## With Links

The `href` prop can be used with click handling on each node of the TreeView.

<Canvas
  of={TreeViewStories.WithLinks}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/TreeView/TreeView.mdx).



File: TreeView/TreeContext.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';
import type { TreeNodeProps } from './TreeNode';

interface TreeContextProps {
  active?: string | number;
  multiselect?: boolean;
  onActivate?: (nodeId?: string | number) => void;
  onTreeSelect?: TreeNodeProps['onTreeSelect'];
  selected?: Array<string | number>;
  size?: 'xs' | 'sm';
}

export const TreeContext = createContext<TreeContextProps | null>(null);

export const DepthContext = createContext<number>(-1);



File: TreeView/TreeView.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useMemo, type JSX } from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import TreeNode, { type TreeNodeProps } from './TreeNode';
import { TreeContext, DepthContext } from './TreeContext';

type UncontrolledOnSelect = (
  event: React.MouseEvent | React.KeyboardEvent,
  payload: Parameters<NonNullable<TreeNodeProps['onSelect']>>[1] & {
    activeNodeId?: TreeViewProps['active'];
  }
) => void;

type ControlledOnSelect = (selected: TreeViewProps['selected']) => void;

export type TreeViewProps = {
  /**
   * Mark the active node in the tree, represented by its ID
   */
  active?: string | number;
  /**
   * Specify the children of the TreeView
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the TreeView
   */
  className?: string;
  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel?: boolean;
  /**
   * Provide the label text that will be read by a screen reader
   */
  label: string;
  /**
   * **[Experimental]** Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect?: boolean;
  /**
   * **[Experimental]** Callback function that is called when any node is activated.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  onActivate?: (active: TreeViewProps['active']) => void;
  /**
   * Callback function that is called when any node is selected
   */
  onSelect?: UncontrolledOnSelect | ControlledOnSelect;
  /**
   * Array representing all selected node IDs in the tree
   */
  selected?: Array<string | number>;
  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size?: 'xs' | 'sm';
} & Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>;

type TreeViewComponent = {
  (props: TreeViewProps): JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: any;
  TreeNode: typeof TreeNode;
};

const TreeView: TreeViewComponent = ({
  active: prespecifiedActive,
  children,
  className,
  hideLabel = false,
  label,
  multiselect = false,
  onActivate,
  onSelect,
  selected: preselected,
  size = 'sm',
  ...rest
}: TreeViewProps) => {
  const enableTreeviewControllable = useFeatureFlag(
    'enable-treeview-controllable'
  );

  // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
  const { current: treeId } = useRef(rest.id || useId());
  const prefix = usePrefix();
  const treeClasses = classNames(className, `${prefix}--tree`, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore - will always be false according to prop types

    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const treeRootRef = useRef<HTMLUListElement>(null);
  const treeWalker = useRef<TreeWalker | null>(null);

  const controllableSelectionState = useControllableState({
    value: preselected,
    onChange: onSelect as ControlledOnSelect,
    defaultValue: [],
  });
  const uncontrollableSelectionState = useState(preselected ?? []);
  const [selected, setSelected] = enableTreeviewControllable
    ? controllableSelectionState
    : uncontrollableSelectionState;

  const controllableActiveState = useControllableState({
    value: prespecifiedActive,
    onChange: onActivate,
    defaultValue: undefined,
  });
  const uncontrollableActiveState = useState(prespecifiedActive);
  const [active, setActive] = enableTreeviewControllable
    ? controllableActiveState
    : uncontrollableActiveState;

  function resetNodeTabIndices() {
    Array.prototype.forEach.call(
      treeRootRef?.current?.querySelectorAll('[tabIndex="0"]') ?? [],
      (item) => {
        item.tabIndex = -1;
      }
    );
  }

  // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  function handleTreeSelect(
    event,
    node: Parameters<NonNullable<TreeNodeProps['onTreeSelect']>>[1]
  ) {
    const nodeId = node.id;
    if (nodeId) {
      if (multiselect && (event.metaKey || event.ctrlKey)) {
        if (!selected.includes(nodeId)) {
          setSelected(selected.concat(nodeId));
        } else {
          setSelected(selected.filter((selectedId) => selectedId !== nodeId));
        }

        if (!enableTreeviewControllable) {
          (onSelect as UncontrolledOnSelect)?.(event, node);
        }
      } else {
        setSelected([nodeId]);
        setActive(nodeId);

        if (!enableTreeviewControllable) {
          (onSelect as UncontrolledOnSelect)?.(event, {
            activeNodeId: nodeId,
            ...node,
          });
        }
      }
    }
  }

  // The logic inside this function is now handled by TreeNode consuming context.
  // This function is kept to manage focus between nodes, which is a TreeView-level concern.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  function handleFocusEvent(event) {
    if (event.type === 'blur') {
      const { relatedTarget: currentFocusedNode, target: prevFocusedNode } =
        event;
      if (treeRootRef?.current?.contains(currentFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
    }
    if (event.type === 'focus') {
      resetNodeTabIndices();
      const { relatedTarget: prevFocusedNode, target: currentFocusedNode } =
        event;
      if (treeRootRef?.current?.contains(prevFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
      currentFocusedNode.tabIndex = 0;
    }
  }

  // Set the first non-disabled node to be tabbable
  useEffect(() => {
    const firstNode = treeRootRef.current?.querySelector(
      `.${prefix}--tree-node:not(.${prefix}--tree-node--disabled)`
    );
    if (firstNode instanceof HTMLElement) {
      firstNode.tabIndex = 0;
    }
  }, [children, prefix]);

  function handleKeyDown(event) {
    event.stopPropagation();
    if (matches(event, [keys.ArrowUp, keys.ArrowDown, keys.Home, keys.End])) {
      event.preventDefault();
    }

    if (!treeWalker.current) {
      return;
    }

    treeWalker.current.currentNode = event.target as Node;
    let nextFocusNode: Node | null = null;

    if (match(event, keys.ArrowUp)) {
      nextFocusNode = treeWalker.current.previousNode();
    }
    if (match(event, keys.ArrowDown)) {
      nextFocusNode = treeWalker.current.nextNode();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
    // @ts-ignore - `matches` doesn't like the object syntax without missing properties
    if (matches(event, [keys.Home, keys.End, { code: 'KeyA' }])) {
      const nodeIds: string[] = [];

      if (matches(event, [keys.Home, keys.End])) {
        if (
          multiselect &&
          event.shiftKey &&
          event.ctrlKey &&
          treeWalker.current.currentNode instanceof Element &&
          !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
          !treeWalker.current.currentNode.classList.contains(
            `${prefix}--tree-node--hidden`
          )
        ) {
          nodeIds.push((treeWalker.current.currentNode as Element).id);
        }
        while (
          match(event, keys.Home)
            ? treeWalker.current.previousNode()
            : treeWalker.current.nextNode()
        ) {
          nextFocusNode = treeWalker.current.currentNode;
          if (
            multiselect &&
            event.shiftKey &&
            event.ctrlKey &&
            nextFocusNode instanceof Element &&
            !nextFocusNode.getAttribute('aria-disabled') &&
            !nextFocusNode.classList.contains(`${prefix}--tree-node--hidden`)
          ) {
            nodeIds.push((nextFocusNode as Element).id);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
      // @ts-ignore - `matches` doesn't like the object syntax without missing properties
      if (match(event, { code: 'KeyA' }) && event.ctrlKey) {
        treeWalker.current.currentNode = treeWalker.current.root;

        while (treeWalker.current.nextNode()) {
          if (
            treeWalker.current.currentNode instanceof Element &&
            !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
            !treeWalker.current.currentNode.classList.contains(
              `${prefix}--tree-node--hidden`
            )
          ) {
            nodeIds.push((treeWalker.current.currentNode as Element).id);
          }
        }
      }
      setSelected(selected.concat(nodeIds));
    }
    if (nextFocusNode && nextFocusNode !== event.target) {
      resetNodeTabIndices();
      if (nextFocusNode instanceof HTMLElement) {
        nextFocusNode.tabIndex = 0;
        nextFocusNode.focus();
      }
    }
    rest?.onKeyDown?.(event);
  }

  useEffect(() => {
    if (treeRootRef.current && !treeWalker.current) {
      treeWalker.current = document.createTreeWalker(
        treeRootRef.current,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: function (node) {
            if (!(node instanceof Element)) {
              return NodeFilter.FILTER_SKIP;
            }
            if (
              node.classList.contains(`${prefix}--tree-node--disabled`) ||
              node.classList.contains(`${prefix}--tree-node--hidden`)
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            if (node.matches(`.${prefix}--tree-node`)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          },
        }
      );
    }
  }, [prefix]);

  const labelId = `${treeId}__label`;
  const TreeLabel = () =>
    !hideLabel ? (
      <label id={labelId} className={`${prefix}--label`}>
        {label}
      </label>
    ) : null;

  const treeContextValue = useMemo(
    () => ({
      active,
      multiselect,
      onActivate: setActive,
      onTreeSelect: handleTreeSelect,
      selected,
      size,
    }),
    [active, multiselect, setActive, handleTreeSelect, selected, size]
  );

  return (
    <>
      <TreeLabel />
      <TreeContext.Provider value={treeContextValue}>
        <DepthContext.Provider value={0}>
          <ul
            {...rest}
            aria-label={hideLabel ? label : undefined}
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-multiselectable={multiselect || undefined}
            className={treeClasses}
            onKeyDown={handleKeyDown}
            ref={treeRootRef}
            role="tree">
            {children}
          </ul>
        </DepthContext.Provider>
      </TreeContext.Provider>
    </>
  );
};

TreeView.propTypes = {
  /**
   * Mark the active node in the tree, represented by its ID
   */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify the children of the TreeView
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeView
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide the label text that will be read by a screen reader
   */
  label: PropTypes.string.isRequired,

  /**
   * **[Experimental]** Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect: PropTypes.bool,

  /**
   * **[Experimental]** Callback function that is called when any node is activated.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  onActivate: PropTypes.func,

  /**
   * Callback function that is called when any node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Array representing all selected node IDs in the tree
   */
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size: PropTypes.oneOf(['xs', 'sm']),
};

TreeView.TreeNode = TreeNode;
export default TreeView;



File: TreeView/TreeView-test.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen, within } from '@testing-library/react';

import React from 'react';
import TreeNode from './TreeNode';
import TreeView from './TreeView';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('TreeView', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(<TreeView data-testid="test-id" label="Tree" />);

      expect(screen.getByRole('tree')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect active prop', () => {
      render(
        <TreeView active="Node 1" label="Tree">
          <TreeNode data-testid="Node 1" id="Node 1" label="Node 1" />
          <TreeNode id="Node 2" label="Node 2" />
        </TreeView>
      );

      const node = screen.getByTestId('Node 1');

      expect(node).toHaveClass(`${prefix}--tree-node--active`);
    });

    it('should render children as expected', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode isExpanded={true} data-testid="Node 1" label="Node 1">
            <TreeNode data-testid="Node 2" label="Node 2" />
          </TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeParent).toHaveClass(`${prefix}--tree-parent-node`);
      expect(nodeChild).toHaveClass(`${prefix}--tree-leaf-node`);

      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should render children as expected when treenode is wrapped in a component', () => {
      render(
        <TreeView label="Tree View">
          <div>
            <TreeNode isExpanded={true} data-testid="Node 1" label="Node 1">
              <div>
                <TreeNode data-testid="Node 2" label="Node 2" />
              </div>
            </TreeNode>
          </div>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeParent).toHaveClass(`${prefix}--tree-parent-node`);
      expect(nodeChild).toHaveClass(`${prefix}--tree-leaf-node`);

      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should render children as expected when using dot syntax', () => {
      render(
        <TreeView label="Tree View">
          <TreeView.TreeNode
            isExpanded={true}
            data-testid="Node 1"
            label="Node 1">
            <TreeView.TreeNode data-testid="Node 2" label="Node 2" />
          </TreeView.TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeParent).toHaveClass(`${prefix}--tree-parent-node`);
      expect(nodeChild).toHaveClass(`${prefix}--tree-leaf-node`);

      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TreeView className="custom-class" label="Tree" />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const ul = container?.getElementsByTagName('ul')[0];

      expect(ul).toHaveClass('custom-class');
    });

    it('should respect hideLabel prop', () => {
      render(
        <TreeView id="Tree" label="Tree View" hideLabel>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(
        screen.queryByText('Tree View', { selector: 'label' })
      ).not.toBeInTheDocument();
    });

    it('should respect label prop', () => {
      render(
        <TreeView label="Tree View" selected={['Node 1']}>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    });

    it('should respect multiselect prop', async () => {
      const user = userEvent.setup();
      render(
        <TreeView multiselect label="Tree">
          <TreeNode data-testid="Node 1" label="Node 1" />
          <TreeNode data-testid="Node 2" label="Node 2" />
        </TreeView>
      );

      const lists = screen.getAllByRole('treeitem');

      await user.keyboard('[ControlLeft>]');
      await user.click(lists[0]);
      await user.click(lists[1]);

      expect(lists[0]).toHaveAttribute('aria-selected', 'true');
      expect(lists[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('should respect onSelect prop', () => {
      const onSelectSpy = jest.fn();

      render(
        <TreeView label="Tree View">
          <TreeNode
            onSelect={onSelectSpy}
            id="Node 1"
            data-testid="Node 1"
            label="Node 1"
          />
        </TreeView>
      );

      fireEvent.click(screen.getByTestId('Node 1'));

      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('should respect selected prop', () => {
      render(
        <TreeView label="Tree View" selected={['Node 1']}>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(screen.getByRole('treeitem', { name: 'Node 1' })).toHaveClass(
        `${prefix}--tree-node--selected`
      );
    });

    it('should respect size prop', () => {
      render(<TreeView size="xs" label="Tree" />);

      const tree = screen.getByRole('tree');

      expect(tree).toHaveClass(`${prefix}--tree--xs`);
    });
  });

  describe('behaves as expected', () => {
    it('should render tree with expanded node', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode data-testid="Node 1" label="Node 1" isExpanded={true}>
            <TreeNode data-testid="Node 2" label="Node 2" />
          </TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      // eslint-disable-next-line testing-library/no-node-access
      const nodeChild = nodeParent?.querySelector('div > span');

      expect(nodeChild).toHaveClass(`${prefix}--tree-parent-node__toggle`);
      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeParent).getByText('Node 2')).toBeInTheDocument();
    });

    it('should render tree with disabled nodes', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode label="Node 1" data-testid="Node 1" />
          <TreeNode
            data-testid="Node 2"
            label="Node 2"
            disabled={true}
            isExpanded={true}>
            <TreeNode isExpanded={true} data-testid="Node 3" label="Node 3" />
          </TreeNode>
        </TreeView>
      );

      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeChild).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render tree with icons', () => {
      const CustomIcon = jest.fn(() => {
        return <svg data-testid="test-icon" />;
      });

      render(
        <TreeView label="Tree View">
          <TreeNode
            renderIcon={CustomIcon}
            data-testid="Node 1"
            label="Node 1"
          />
        </TreeView>
      );

      expect(screen.getByTestId('Node 1')).toHaveClass(
        `${prefix}--tree-node--with-icon`
      );
    });
  });

  describe('keyboard navigation', () => {
    it('should focus on the first child node when right arrow is pressed on an expanded parent node', async () => {
      const user = userEvent.setup();

      render(
        <TreeView label="Tree View">
          <TreeNode
            data-testid="parent-node"
            label="Parent Node"
            isExpanded={true}>
            <TreeNode data-testid="child-node-1" label="Child Node 1" />
            <TreeNode data-testid="child-node-2" label="Child Node 2" />
          </TreeNode>
        </TreeView>
      );

      const parentNode = screen.getByTestId('parent-node');
      const childNode1 = screen.getByTestId('child-node-1');

      // Focus on the parent node
      parentNode.focus();
      expect(parentNode).toHaveFocus();

      // Press the right arrow key
      await user.keyboard('[ArrowRight]');

      // Check if the first child node is now focused
      expect(childNode1).toHaveFocus();
    });

    it('should expand a collapsed parent node when right arrow is pressed', async () => {
      const user = userEvent.setup();

      render(
        <TreeView label="Tree View">
          <TreeNode
            data-testid="parent-node"
            label="Parent Node"
            isExpanded={false}>
            <TreeNode data-testid="child-node" label="Child Node" />
          </TreeNode>
        </TreeView>
      );

      const parentNode = screen.getByTestId('parent-node');

      // Initially, the parent node should not be expanded
      expect(parentNode).not.toHaveAttribute('aria-expanded', 'true');

      // Focus on the parent node
      parentNode.focus();
      expect(parentNode).toHaveFocus();

      // Press the right arrow key
      await user.keyboard('[ArrowRight]');

      // The parent node should now be expanded
      expect(parentNode).toHaveAttribute('aria-expanded', 'true');

      // Now that the parent is expanded, we can check for the child node
      const childNode = screen.getByTestId('child-node');
      expect(childNode).toBeInTheDocument();

      // The parent node should still have focus
      expect(parentNode).toHaveFocus();
    });
  });
  it('should respect multiselect prop (deselecting nodes)', async () => {
    const user = userEvent.setup();
    render(
      <TreeView multiselect label="Tree">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
      </TreeView>
    );
    const lists = screen.getAllByRole('treeitem');
    await user.keyboard('[ControlLeft>]');
    await user.click(lists[0]);
    await user.click(lists[1]);
    expect(lists[0]).toHaveAttribute('aria-selected', 'true');
    expect(lists[1]).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('[ControlLeft>]');
    await user.click(lists[0]);
    expect(lists[0]).toHaveAttribute('aria-selected', 'false');
    expect(lists[1]).toHaveAttribute('aria-selected', 'true');
  });
  it('should render tree with custom icons', () => {
    const CustomIcon = () => <svg data-testid="test-icon" />;
    render(
      <TreeView label="Tree View">
        <TreeNode renderIcon={CustomIcon} data-testid="Node 1" label="Node 1" />
      </TreeView>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should expand a collapsed parent node when right arrow is pressed', async () => {
    const user = userEvent.setup();
    render(
      <TreeView label="Tree View">
        <TreeNode
          data-testid="parent-node"
          label="Parent Node"
          isExpanded={false}>
          <TreeNode data-testid="child-node" label="Child Node" />
        </TreeNode>
      </TreeView>
    );
    const parentNode = screen.getByTestId('parent-node');
    expect(parentNode).not.toHaveAttribute('aria-expanded', 'true');
    parentNode.focus();
    expect(parentNode).toHaveFocus();
    await user.keyboard('[ArrowRight]');
    expect(parentNode).toHaveAttribute('aria-expanded', 'true');
    const childNode = screen.getByTestId('child-node');
    expect(childNode).toBeInTheDocument();
  });
  it('should navigate between nodes using ArrowUp and ArrowDown', async () => {
    const user = userEvent.setup();
    render(
      <TreeView label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
      </TreeView>
    );
    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');
    node1.focus();
    expect(node1).toHaveFocus();
    await user.keyboard('[ArrowDown]');
    expect(node2).toHaveFocus();
    await user.keyboard('[ArrowUp]');
    expect(node1).toHaveFocus();
  });

  it('should not render label when hideLabel is true', () => {
    render(
      <TreeView label="Tree View" hideLabel>
        <TreeNode id="Node 1" label="Node 1" />
      </TreeView>
    );
    expect(screen.queryByText('Tree View')).not.toBeInTheDocument();
  });

  it('should render custom icons in TreeNode', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;

    render(
      <TreeView label="Tree View">
        <TreeNode id="Node 1" label="Node 1" renderIcon={CustomIcon} />
        <TreeNode id="Node 2" label="Node 2" />
      </TreeView>
    );

    const node1Icon = screen.getByTestId('custom-icon');
    const node2 = screen.getByText('Node 2');

    expect(node1Icon).toBeInTheDocument();
    expect(node2.querySelector('svg')).toBeNull();
  });
  it('should render the label correctly', () => {
    render(
      <TreeView label="My Tree View">
        <TreeNode id="Node 1" label="Node 1" />
        <TreeNode id="Node 2" label="Node 2" />
      </TreeView>
    );

    expect(screen.getByLabelText('My Tree View')).toBeInTheDocument();
  });

  it('should collapse an expanded parent node when left arrow is pressed', async () => {
    const user = userEvent.setup();

    render(
      <TreeView label="Tree View">
        <TreeNode
          data-testid="parent-node"
          label="Parent Node"
          isExpanded={true}>
          <TreeNode data-testid="child-node" label="Child Node" />
        </TreeNode>
      </TreeView>
    );

    const parentNode = screen.getByTestId('parent-node');

    // Initially, the parent node should be expanded
    expect(parentNode).toHaveAttribute('aria-expanded', 'true');

    // Focus on the parent node
    parentNode.focus();
    await user.keyboard('[ArrowLeft]');

    // The parent node should now be collapsed
    expect(parentNode).toHaveAttribute('aria-expanded', 'false');
  });

  it('should deselect a node when clicked again in multiselect mode', async () => {
    const user = userEvent.setup();
    render(
      <TreeView multiselect label="Tree">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
      </TreeView>
    );

    const lists = screen.getAllByRole('treeitem');
    await user.keyboard('[ControlLeft>]');
    await user.click(lists[0]);
    await user.click(lists[1]);

    expect(lists[0]).toHaveAttribute('aria-selected', 'true');
    expect(lists[1]).toHaveAttribute('aria-selected', 'true');

    // Deselect Node 1
    await user.keyboard('[ControlLeft>]');
    await user.click(lists[0]);

    expect(lists[0]).toHaveAttribute('aria-selected', 'false');
    expect(lists[1]).toHaveAttribute('aria-selected', 'true');
  });
  it('should not allow interaction with disabled nodes', async () => {
    const user = userEvent.setup();
    render(
      <TreeView label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" disabled={true} />
      </TreeView>
    );

    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');

    // The disabled node should not be focusable
    await user.tab();
    expect(node1).toHaveFocus();

    // The disabled node should also not be clickable
    fireEvent.click(node2);
    expect(node2).not.toHaveClass(`${prefix}--tree-node--selected`);
  });
  it('should select nodes correctly when Home/End keys are used with multiselect and shiftKey+ctrlKey', async () => {
    const user = userEvent.setup();

    render(
      <TreeView multiselect label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
        <TreeNode data-testid="Node 3" label="Node 3" />
      </TreeView>
    );

    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');
    const node3 = screen.getByTestId('Node 3');

    await user.click(node2);
    expect(node2).toHaveFocus();
    await user.keyboard('[ControlLeft>][ShiftLeft>][Home]');
    expect(node1).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node2).toHaveClass(`${prefix}--tree-node--selected`);
  });
  it('should select nodes correctly when Home key is used with multiselect and shiftKey+ctrlKey', async () => {
    const user = userEvent.setup();

    render(
      <TreeView multiselect label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
        <TreeNode data-testid="Node 3" label="Node 3" />
      </TreeView>
    );

    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');
    const node3 = screen.getByTestId('Node 3');

    await user.click(node2);
    expect(node2).toHaveFocus();

    await user.keyboard('[ControlLeft>][ShiftLeft>][Home]');

    expect(node1).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node2).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node3).not.toHaveClass(`${prefix}--tree-node--selected`);
  });

  it('should select multiple nodes when Home key is pressed with Shift and Ctrl keys', async () => {
    const user = userEvent.setup();

    render(
      <TreeView multiselect label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
        <TreeNode data-testid="Node 3" label="Node 3" />
      </TreeView>
    );

    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');
    const node3 = screen.getByTestId('Node 3');

    await user.click(node2);
    expect(node2).toHaveFocus();
    await user.keyboard('[ControlLeft>][ShiftLeft>][Home]');
    expect(node1).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node2).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node3).not.toHaveClass(`${prefix}--tree-node--selected`);
  });
  it('should select nodes correctly when ctrl+A is pressed', async () => {
    const user = userEvent.setup();

    render(
      <TreeView multiselect label="Tree View">
        <TreeNode data-testid="Node 1" label="Node 1" />
        <TreeNode data-testid="Node 2" label="Node 2" />
        <TreeNode data-testid="Node 3" label="Node 3" />
      </TreeView>
    );

    const node1 = screen.getByTestId('Node 1');
    const node2 = screen.getByTestId('Node 2');
    const node3 = screen.getByTestId('Node 3');

    await user.click(node1);
    expect(node1).toHaveFocus();

    await user.keyboard('[ControlLeft>]A');

    expect(node1).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node2).toHaveClass(`${prefix}--tree-node--selected`);
    expect(node3).toHaveClass(`${prefix}--tree-node--selected`);
  });

  it('should expand a collapsed parent node when Enter key is pressed', async () => {
    const user = userEvent.setup();

    render(
      <TreeView label="Tree View">
        <TreeNode
          data-testid="parent-node"
          label="Parent Node"
          isExpanded={false}>
          <TreeNode data-testid="child-node" label="Child Node" />
        </TreeNode>
      </TreeView>
    );

    const parentNode = screen.getByTestId('parent-node');

    // Initially, the parent node should not be expanded
    expect(parentNode).not.toHaveAttribute('aria-expanded', 'true');

    // Focus on the parent node
    parentNode.focus();
    expect(parentNode).toHaveFocus();

    // Press the Enter key
    await user.keyboard('[Enter]');

    // The parent node should now be expanded
    expect(parentNode).toHaveAttribute('aria-expanded', 'true');

    // Child node should be visible
    const childNode = screen.getByTestId('child-node');
    expect(childNode).toBeInTheDocument();
  });

  it('should collapse an expanded parent node when Enter key is pressed', async () => {
    const user = userEvent.setup();

    render(
      <TreeView label="Tree View">
        <TreeNode
          data-testid="parent-node"
          label="Parent Node"
          isExpanded={true}>
          <TreeNode data-testid="child-node" label="Child Node" />
        </TreeNode>
      </TreeView>
    );

    const parentNode = screen.getByTestId('parent-node');

    // Initially, the parent node should be expanded
    expect(parentNode).toHaveAttribute('aria-expanded', 'true');

    // Focus on the parent node
    parentNode.focus();
    expect(parentNode).toHaveFocus();

    // Press the Enter key
    await user.keyboard('[Enter]');

    // The parent node should now be collapsed
    expect(parentNode).toHaveAttribute('aria-expanded', 'false');
  });

  it('should expand/collapse nodes with Enter key while maintaining selection', async () => {
    const user = userEvent.setup();

    render(
      <TreeView label="Tree View">
        <TreeNode
          data-testid="parent-node"
          label="Parent Node"
          isExpanded={false}>
          <TreeNode data-testid="child-node" label="Child Node" />
        </TreeNode>
      </TreeView>
    );

    const parentNode = screen.getByTestId('parent-node');

    // Focus and select the parent node
    parentNode.focus();
    await user.click(parentNode);
    expect(parentNode).toHaveClass(`${prefix}--tree-node--selected`);

    // Press Enter to expand
    await user.keyboard('[Enter]');
    expect(parentNode).toHaveAttribute('aria-expanded', 'true');
    expect(parentNode).toHaveClass(`${prefix}--tree-node--selected`); // Should still be selected

    // Press Enter again to collapse
    await user.keyboard('[Enter]');
    expect(parentNode).toHaveAttribute('aria-expanded', 'false');
    expect(parentNode).toHaveClass(`${prefix}--tree-node--selected`); // Should still be selected
  });
});



File: TreeView/TreeView.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/TreeView/Feature Flag" name="Flag details" />

# TreeView controllable

API

The new controllable API of TreeView allows you to synchronize the state of
`selected` and `active` with your application.

You can opt-in to this by enabling the `enable-treeview-controllable` feature
flag. This changes the following behaviour:

- `TreeView`
  - `props.onActivate` will be called with a node's ID whenever it is activated.
  - The signature of `props.onSelect` changes from `(event, selectedIDs)` to
    `(selectedIDs)`.
  - Whenever you update `props.selected` or `props.active`, the internal state
    will be updated accordingly and the component re-renders.
- `TreeNode`
  - The signature of `props.onToggle` changes from
    `(event, { id, isExpanded, label, value })` to `(isExpanded)`.
  - `props.defaultIsExpanded` is added to allow for a default state in
    uncontrolled mode.

## Example

```jsx
function SynchronizedTreeView() {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);

  return (
    <TreeView
      selected={selected}
      onSelect={setSelected}
      active={active}
      onActivate={setActive}>
      ...
    </TreeView>
  );
}
```



File: TreeView/TreeNode.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretDown } from '@carbon/icons-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  type ComponentType,
  type FunctionComponent,
  type MouseEvent,
  type MutableRefObject,
  type FocusEvent,
} from 'react';
import { keys, match, matches } from '../../internal/keyboard';
import { deprecate } from '../../prop-types/deprecate';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { useFeatureFlag } from '../FeatureFlags';
import { IconButton } from '../IconButton';
import { TreeContext, DepthContext } from './TreeContext';

type UncontrolledOnToggle = (
  event: React.MouseEvent | React.KeyboardEvent,
  node: Pick<TreeNodeProps, 'id' | 'label' | 'value' | 'isExpanded'>
) => void;

type ControlledOnToggle = (isExpanded: TreeNodeProps['isExpanded']) => void;

export type TreeNodeProps = {
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * The ID of the active node in the tree
   *
   * @deprecated The `active` prop for `TreeNode` has
   * been deprecated after the introduction of context. It will be removed in the next major release.
   */
  active?: string | number;
  /**
   * Specify the children of the TreeNode
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className?: string;
  /**
   * **[Experimental]** The default expansion state of the node.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  defaultIsExpanded?: boolean;
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * TreeNode depth to determine spacing
   *
   * @deprecated The `depth` prop for `TreeNode` has
   * been deprecated after the introduction of context. It will be removed in the next major release.
   */
  depth?: number;
  /**
   * Specify if the TreeNode is disabled
   */
  disabled?: boolean;
  /**
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active, props.selected and aria-owns
   */
  id?: string;
  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded?: boolean;
  /**
   * Rendered label for the TreeNode
   */
  label: React.ReactNode;
  /**
   * Callback function for when the node receives or loses focus
   *
   * @deprecated The `onNodeFocusEvent` prop for `TreeNode` has
   * been deprecated after the introduction of context. It will be removed in the next major release.
   */
  onNodeFocusEvent?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * Callback function for when the node is selected
   */
  onSelect?: (
    event: React.MouseEvent | React.KeyboardEvent,
    node: Pick<TreeNodeProps, 'id' | 'label' | 'value'>
  ) => void;
  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle?: UncontrolledOnToggle | ControlledOnToggle;
  /**
   * Callback function for when any node in the tree is selected
   *
   * @deprecated The `onTreeSelect` prop for `TreeNode` has
   * been deprecated after the introduction of context. It will be removed in the next major release.
   */
  onTreeSelect?: (
    event: React.MouseEvent | React.KeyboardEvent,
    node: Pick<TreeNodeProps, 'id' | 'label' | 'value'>
  ) => void;
  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * Array containing all selected node IDs in the tree
   * @deprecated The `selected` prop for `TreeNode` has
   * been deprecated after the introduction of context. It will be removed in the next major release.
   */
  selected?: Array<string | number>;
  /**
   * Specify the value of the TreeNode
   */
  value?: string;
  /**
   * Optional: The URL the TreeNode is linking to
   */
  href?: string;
  /**
   *
   * Specify how the trigger should align with the tooltip when text is truncated
   */

  align?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start';

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;
} & Omit<React.LiHTMLAttributes<HTMLElement>, 'onSelect'>;

const extractTextContent = (node: React.ReactNode): string => {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (typeof node === 'boolean') return String(node);

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('');
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    const children = element.props.children;
    return extractTextContent(children);
  }

  return '';
};

type HTMLElementOrAnchor = HTMLElement | HTMLAnchorElement | null;

const useEllipsisCheck = (
  label: React.ReactNode,
  detailsWrapperRef: React.RefObject<HTMLElementOrAnchor>
) => {
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
  const labelTextRef = useRef<HTMLSpanElement>(null);

  const checkEllipsis = useCallback(() => {
    const element = labelTextRef.current;
    if (!element) {
      setIsEllipsisApplied(false);
      return;
    }
    if (element.offsetWidth === 0) {
      setIsEllipsisApplied(false);
      return;
    }
    const checkElement = detailsWrapperRef.current || element;

    if (checkElement && checkElement.offsetWidth > 0) {
      const isTextTruncated = element.scrollWidth > checkElement.offsetWidth;
      setIsEllipsisApplied(isTextTruncated);
    } else {
      setIsEllipsisApplied(false);
    }
  }, [detailsWrapperRef]);

  useEffect(() => {
    const animationFrameId: number = requestAnimationFrame(checkEllipsis);

    let resizeObserver: ResizeObserver | undefined;
    if (
      typeof window !== 'undefined' &&
      typeof window.ResizeObserver !== 'undefined' &&
      labelTextRef.current
    ) {
      resizeObserver = new window.ResizeObserver(() => {
        requestAnimationFrame(checkEllipsis);
      });
      resizeObserver.observe(labelTextRef.current);

      if (detailsWrapperRef.current) {
        resizeObserver.observe(detailsWrapperRef.current);
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        if (labelTextRef.current) {
          // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
          resizeObserver.unobserve(labelTextRef.current);
        }
        if (detailsWrapperRef.current) {
          // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
          resizeObserver.unobserve(detailsWrapperRef.current);
        }
        resizeObserver.disconnect();
      }
    };
  }, [checkEllipsis, detailsWrapperRef]);

  return {
    labelTextRef,
    isEllipsisApplied,
    tooltipText: extractTextContent(label),
  };
};

const TreeNode = React.forwardRef<HTMLElement, TreeNodeProps>(
  (
    {
      children,
      className,
      disabled,
      id: nodeId,
      isExpanded,
      defaultIsExpanded,
      label,
      onSelect: onNodeSelect,
      onToggle,
      renderIcon: Icon,
      value,
      href,
      align = 'bottom',
      autoAlign = false,
      // These props are fallback props if the TreeContext is not available or only TreeNode is used as a standalone component
      active: propActive,
      depth: propDepth,
      selected: propSelected,
      onTreeSelect: propOnTreeSelect,
      onNodeFocusEvent,
      ...rest
    },
    forwardedRef
  ) => {
    const treeContext = useContext(TreeContext);
    const contextDepth = useContext(DepthContext);

    // Prioritize direct props, and fall back to context values.
    const depth = propDepth ?? (contextDepth !== -1 ? contextDepth : 0);
    const active = propActive ?? treeContext?.active;
    const selected = propSelected ?? treeContext?.selected ?? [];
    const onTreeSelect = propOnTreeSelect ?? treeContext?.onTreeSelect;

    const detailsWrapperRef = useRef<HTMLElementOrAnchor>(null);
    const { labelTextRef, isEllipsisApplied, tooltipText } = useEllipsisCheck(
      label,
      detailsWrapperRef
    );

    const enableTreeviewControllable = useFeatureFlag(
      'enable-treeview-controllable'
    );

    // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
    const { current: id } = useRef(nodeId || useId());

    const controllableExpandedState = useControllableState({
      value: isExpanded,
      onChange: onToggle as ControlledOnToggle,
      defaultValue: defaultIsExpanded ?? false,
    });
    const uncontrollableExpandedState = useState(isExpanded ?? false);
    const [expanded, setExpanded] = enableTreeviewControllable
      ? controllableExpandedState
      : uncontrollableExpandedState;

    const currentNode = useRef<HTMLElement | null>(null);
    const currentNodeLabel = useRef<HTMLDivElement>(null);
    const prefix = usePrefix();

    const nodeLabelId = `${id}__label`;

    const renderLabelText = () => {
      if (isEllipsisApplied && tooltipText) {
        return (
          <IconButton
            label={tooltipText}
            kind="ghost"
            align={align}
            autoAlign={autoAlign}
            className={`${prefix}--tree-node__label__text-button`}
            wrapperClasses={`${prefix}--popover-container`}>
            <span
              id={nodeLabelId}
              ref={labelTextRef}
              className={`${prefix}--tree-node__label__text`}>
              {label}
            </span>
          </IconButton>
        );
      }

      return (
        <span
          id={nodeLabelId}
          ref={labelTextRef}
          className={`${prefix}--tree-node__label__text`}>
          {label}
        </span>
      );
    };

    const setRefs = (element: HTMLElement | null) => {
      currentNode.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLElement | null>).current =
          element;
      }
    };

    const isActive = active === id;
    const isSelected = selected?.includes(id) ?? false;

    const treeNodeClasses = classNames(className, `${prefix}--tree-node`, {
      [`${prefix}--tree-node--active`]: isActive,
      [`${prefix}--tree-node--disabled`]: disabled,
      [`${prefix}--tree-node--selected`]: isSelected,
      [`${prefix}--tree-node--with-icon`]: Icon,
      [`${prefix}--tree-leaf-node`]: !children,
      [`${prefix}--tree-parent-node`]: children,
    });
    const toggleClasses = classNames(
      `${prefix}--tree-parent-node__toggle-icon`,
      {
        [`${prefix}--tree-parent-node__toggle-icon--expanded`]: expanded,
      }
    );
    function handleToggleClick(event: React.MouseEvent<HTMLSpanElement>) {
      if (disabled) {
        return;
      }

      // Prevent the node from being selected
      event.stopPropagation();
      if (href) {
        event.preventDefault();
      }

      if (!enableTreeviewControllable) {
        (onToggle as UncontrolledOnToggle)?.(event, {
          id,
          isExpanded: !expanded,
          label,
          value,
        });
      }
      setExpanded(!expanded);
    }

    function handleClick(event: React.MouseEvent) {
      event.stopPropagation();
      if (!disabled) {
        onTreeSelect?.(event, { id, label, value });
        onNodeSelect?.(event, { id, label, value });
        rest?.onClick?.(event as React.MouseEvent<HTMLElement>);
      }
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      function getFocusableNode(node) {
        if (node?.classList.contains(`${prefix}--tree-node`)) {
          return node;
        }
        return node?.firstChild;
      }

      if (disabled) {
        return;
      }

      if (matches(event, [keys.ArrowLeft, keys.ArrowRight, keys.Enter])) {
        event.stopPropagation();
      }

      if (match(event, keys.ArrowLeft)) {
        const findParentTreeNode = (node: Element | null): Element | null => {
          if (!node) return null;
          if (node.classList.contains(`${prefix}--tree-parent-node`)) {
            return node;
          }
          if (node.classList.contains(`${prefix}--tree-node-link-parent`)) {
            return node.firstChild as Element | null;
          }
          if (node.classList.contains(`${prefix}--tree`)) {
            return null;
          }
          return findParentTreeNode(node.parentElement);
        };

        if (children && expanded) {
          if (!enableTreeviewControllable) {
            (onToggle as UncontrolledOnToggle)?.(event, {
              id,
              isExpanded: false,
              label,
              value,
            });
          }
          setExpanded(false);
        } else {
          /**
           * When focus is on a leaf node or a closed parent node, move focus to
           * its parent node (unless its depth is level 1)
           */
          const parentNode = findParentTreeNode(
            href
              ? (currentNode.current?.parentElement?.parentElement as Element)
              : (currentNode.current?.parentElement as Element)
          );
          if (parentNode instanceof HTMLElement) {
            parentNode.focus();
          }
        }
      }

      if (children && match(event, keys.ArrowRight)) {
        if (expanded) {
          /**
           * When focus is on an expanded parent node, move focus to the first
           * child node
           */
          getFocusableNode(
            href
              ? currentNode.current?.parentElement?.lastChild?.firstChild
              : currentNode.current?.lastChild?.firstChild
          )?.focus();
        } else {
          if (!enableTreeviewControllable) {
            (onToggle as UncontrolledOnToggle)?.(event, {
              id,
              isExpanded: true,
              label,
              value,
            });
          }
          setExpanded(true);
        }
      }

      if (matches(event, [keys.Enter, keys.Space])) {
        event.preventDefault();
        if (match(event, keys.Enter) && children) {
          // Toggle expansion state for parent nodes
          if (!enableTreeviewControllable) {
            (onToggle as UncontrolledOnToggle)?.(event, {
              id,
              isExpanded: !expanded,
              label,
              value,
            });
          }
          setExpanded(!expanded);
        }
        if (href) {
          currentNode.current?.click();
        }
        handleClick(event as unknown as MouseEvent);
      }
      rest?.onKeyDown?.(event);
    }
    function handleFocusEvent(event: FocusEvent<HTMLElement>) {
      if (event.type === 'focus') {
        rest?.onFocus?.(event);
      }
      if (event.type === 'blur') {
        rest?.onBlur?.(event);
      }
      onNodeFocusEvent?.(event);
    }

    useEffect(() => {
      /**
       * Negative margin shifts node to align with the left side boundary of the
       * tree
       * Dynamically calculate padding to recreate tree node indentation
       * - parent nodes with icon have (depth + 1rem + depth * 0.5) left padding
       * - parent nodes have (depth + 1rem) left padding
       * - leaf nodes have (depth + 2.5rem) left padding without icons (because
       *   of expand icon + spacing)
       * - leaf nodes have (depth + 2rem + depth * 0.5) left padding with icons (because of
       *   reduced spacing between the expand icon and the node icon + label)
       */
      const calcOffset = () => {
        // parent node with icon
        if (children && Icon) {
          return depth + 1 + depth * 0.5;
        }
        // parent node without icon
        if (children) {
          return depth + 1;
        }
        // leaf node with icon
        if (Icon) {
          return depth + 2 + depth * 0.5;
        }
        // leaf node without icon
        return depth + 2.5;
      };

      if (currentNodeLabel.current) {
        currentNodeLabel.current.style.marginInlineStart = `-${calcOffset()}rem`;
        currentNodeLabel.current.style.paddingInlineStart = `${calcOffset()}rem`;
      }

      if (!enableTreeviewControllable) {
        // sync props and state
        setExpanded(isExpanded ?? false);
      }
    }, [
      children,
      depth,
      Icon,
      isExpanded,
      enableTreeviewControllable,
      setExpanded,
    ]);

    const tabIndex = disabled ? undefined : (rest.tabIndex ?? -1);

    const treeNodeProps: React.LiHTMLAttributes<HTMLElement> = {
      ...rest,
      ['aria-current']: !href
        ? isActive || undefined
        : isActive
          ? 'page'
          : undefined,
      ['aria-selected']: !href
        ? disabled
          ? undefined
          : isSelected
        : undefined,
      ['aria-disabled']: disabled,
      ['aria-owns']: children ? `${id}-subtree` : undefined,
      className: treeNodeClasses,
      id,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role: 'treeitem',
      tabIndex,
      onFocus: handleFocusEvent,
      onBlur: handleFocusEvent,
    };

    const nodeContent = (
      <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
        {children && (
          // eslint-disable-next-line  jsx-a11y/no-static-element-interactions , jsx-a11y/click-events-have-key-events -- https://github.com/carbon-design-system/carbon/issues/20452
          <span
            className={`${prefix}--tree-parent-node__toggle`}
            onClick={handleToggleClick}>
            <CaretDown className={toggleClasses} />
          </span>
        )}

        <span className={`${prefix}--tree-node__label__details`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452*/}
          {/*@ts-ignore - TS cannot be sure `className` exists on Icon props */}
          {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
          {renderLabelText()}
        </span>
      </div>
    );

    if (href) {
      return (
        <li
          role="none"
          className={children ? `${prefix}--tree-node-link-parent` : ''}>
          <a
            {...treeNodeProps}
            aria-expanded={!!expanded}
            ref={setRefs}
            href={!disabled ? href : undefined}>
            {nodeContent}
          </a>
          {children && (
            <ul
              id={`${id}-subtree`}
              role="group"
              aria-labelledby={nodeLabelId}
              className={classNames(`${prefix}--tree-node__children`, {
                [`${prefix}--tree-node--hidden`]: !expanded,
              })}>
              <DepthContext.Provider value={depth + 1}>
                {children}
              </DepthContext.Provider>
            </ul>
          )}
        </li>
      );
    }

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props -- https://github.com/carbon-design-system/carbon/issues/20452 */}
        <li
          {...treeNodeProps}
          aria-expanded={children ? !!expanded : undefined}
          ref={setRefs}>
          {nodeContent}
          {children && (
            <ul
              id={`${id}-subtree`}
              role="group"
              aria-labelledby={nodeLabelId}
              className={classNames(`${prefix}--tree-node__children`, {
                [`${prefix}--tree-node--hidden`]: !expanded,
              })}>
              <DepthContext.Provider value={depth + 1}>
                {children}
              </DepthContext.Provider>
            </ul>
          )}
        </li>
      </>
    );
  }
);

TreeNode.propTypes = {
  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * The ID of the active node in the tree
   */
  active: deprecate(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'The `active` prop for `TreeNode` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * Specify the children of the TreeNode
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className: PropTypes.string,

  /**
   * **[Experimental]** The default expansion state of the node.
   * *This is only supported with the `enable-treeview-controllable` feature flag!*
   */
  defaultIsExpanded: PropTypes.bool,

  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * TreeNode depth to determine spacing
   */
  depth: deprecate(
    PropTypes.number,
    'The `depth` prop for `TreeNode` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),
  /**
   * Specify if the TreeNode is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the TreeNode's ID. Must be unique in the DOM and is used for props.active, props.selected and aria-owns
   */
  id: PropTypes.string,

  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded: PropTypes.bool,

  /**
   * Rendered label for the TreeNode
   */
  label: PropTypes.node,

  /**
   * Callback function for when the node receives or loses focus
   */
  onNodeFocusEvent: deprecate(
    PropTypes.func,
    'The `onNodeFocusEvent` prop for `TreeNode` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * Callback function for when the node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle: PropTypes.func,

  /**
   * Callback function for when any node in the tree is selected
   */
  onTreeSelect: deprecate(
    PropTypes.func,
    'The `onTreeSelect` prop for `TreeNode` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * A component used to render an icon.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * **Note:** this is controlled by the parent TreeView component, do not set manually.
   * Array containing all selected node IDs in the tree
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  selected: deprecate(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    'The `selected` prop for `TreeNode` is no longer needed and has ' +
      'been deprecated. It will be removed in the next major release.'
  ),

  /**
   * Specify the value of the TreeNode
   */
  value: PropTypes.string,

  /**
   * Optional: The URL the TreeNode is linking to
   */
  href: PropTypes.string,

  /**
   * Specify how the tooltip should align when text is truncated
   */
  align: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-end',
    'left-start',
    'right-end',
    'right-start',
  ]),

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,
};

TreeNode.displayName = 'TreeNode';
export default TreeNode;



File: TreeView/TreeView.featureflag.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { Document, Folder } from '@carbon/icons-react';
import { Button, VStack } from '../../';

import { TreeView, TreeNode } from './';

import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

const nodes = [
  {
    id: '1',
    value: 'Artificial intelligence',
    label: <span>Artificial intelligence</span>,
    renderIcon: Document,
  },
  {
    id: '2',
    value: 'Blockchain',
    label: 'Blockchain',
    renderIcon: Document,
  },
  {
    id: '3',
    value: 'Business automation',
    label: 'Business automation',
    renderIcon: Folder,
    children: [
      {
        id: '3-1',
        value: 'Business process automation',
        label: 'Business process automation',
        renderIcon: Document,
      },
      {
        id: '3-2',
        value: 'Business process mapping',
        label: 'Business process mapping',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '4',
    value: 'Business operations',
    label: 'Business operations',
    renderIcon: Document,
  },
  {
    id: '5',
    value: 'Cloud computing',
    label: 'Cloud computing',
    isExpanded: true,
    renderIcon: Folder,
    children: [
      {
        id: '5-1',
        value: 'Containers',
        label: 'Containers',
        renderIcon: Document,
      },
      {
        id: '5-2',
        value: 'Databases',
        label: 'Databases',
        renderIcon: Document,
      },
      {
        id: '5-3',
        value: 'DevOps',
        label: 'DevOps',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '5-4',
            value: 'Solutions',
            label: 'Solutions',
            renderIcon: Document,
          },
          {
            id: '5-5',
            value: 'Case studies',
            label: 'Case studies',
            isExpanded: true,
            renderIcon: Folder,
            children: [
              {
                id: '5-6',
                value: 'Resources',
                label: 'Resources',
                renderIcon: Document,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6',
    value: 'Data & Analytics',
    label: 'Data & Analytics',
    renderIcon: Folder,
    children: [
      {
        id: '6-1',
        value: 'Big data',
        label: 'Big data',
        renderIcon: Document,
      },
      {
        id: '6-2',
        value: 'Business intelligence',
        label: 'Business intelligence',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '7',
    value: 'Models',
    label: 'Models',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder,
    children: [
      {
        id: '7-1',
        value: 'Audit',
        label: 'Audit',
        renderIcon: Document,
      },
      {
        id: '7-2',
        value: 'Monthly data',
        label: 'Monthly data',
        renderIcon: Document,
      },
      {
        id: '8',
        value: 'Data warehouse',
        label: 'Data warehouse',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '8-1',
            value: 'Report samples',
            label: 'Report samples',
            renderIcon: Document,
          },
          {
            id: '8-2',
            value: 'Sales performance',
            label: 'Sales performance',
            renderIcon: Document,
          },
        ],
      },
    ],
  },
];

function renderTree(nodes) {
  if (!nodes) {
    return;
  }

  return nodes.map(({ children, isExpanded, ...nodeProps }) => (
    <TreeNode key={nodeProps.id} defaultIsExpanded={isExpanded} {...nodeProps}>
      {renderTree(children)}
    </TreeNode>
  ));
}

export default {
  title: 'components/TreeView/Feature Flag',
  component: TreeView,
  subcomponents: {
    TreeNode,
  },
  tags: ['!autodocs'],
  args: {
    onSelect: action('onSelect'),
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const Default = (args) => {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);

  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setSelected(['5-2']);
          }}>
          Select &quot;Databases&quot;
        </Button>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setActive('5-2');
          }}>
          Activate &quot;Databases&quot;
        </Button>
      </VStack>

      <div>
        <TreeView
          label="Tree View"
          {...args}
          active={active}
          onActivate={setActive}
          selected={selected}
          onSelect={setSelected}>
          {renderTree(nodes)}
        </TreeView>
      </div>
    </VStack>
  );
};

Default.args = {
  hideLabel: false,
  multiselect: false,
};

Default.argTypes = {
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

Default.parameters = {
  controls: {
    exclude: ['active', 'selected'],
  },
};



File: TreeView/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-treeview--default'
    },
    {
      label: 'With controlled expansion',
      variant: 'components-treeview--with-controlled-expansion'
    },
    {
      label: 'With icons',
      variant: 'components-treeview--with-icons'
    }
  ]}
/>


File: TreeView/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TreeNode, { TreeNodeProps } from './TreeNode';
import TreeView, { TreeViewProps } from './TreeView';

export { TreeNode, TreeView };
export type { TreeViewProps, TreeNodeProps };
export default TreeView;



File: TreeView/story.scss


//
// Copyright IBM Corp. 2016, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
.cds--tree {
  inline-size: 20rem;
}

#page-body {
  display: flex;

  main {
    flex: 1;
  }
}



