File: HideAtBreakpoint/HideAtBreakpoint-story.scss


//
// Copyright IBM Corp. 2022, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/utilities/hide-at-breakpoint' as *;

.hide-at-sm {
  padding: 2rem 1rem;
  background: #8a3ffc;
  @include hide-at-sm;
}

.hide-at-md {
  padding: 2rem 1rem;
  background: #4589ff;
  @include hide-at-md;
}

.hide-at-lg {
  padding: 2rem 1rem;
  background: #42be65;
  @include hide-at-lg;
}

.hide-at-xlg {
  padding: 2rem 1rem;
  background: #f1c21b;
  @include hide-at-xlg;
}

.hide-at-max {
  padding: 2rem 1rem;
  background: #da1e28;
  @include hide-at-max;
}



File: HideAtBreakpoint/HideAtBreakpoint.mdx


import { Canvas, ArgTypes, Story, Meta } from '@storybook/addon-docs/blocks';
import * as HideAtBreakpoint from './HideAtBreakpoint.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Hide At Breakpoint

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/HideAtBreakpoint)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas of={HideAtBreakpoint.HideAtBreakpoint} />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/HideAtBreakpoint/HideAtBreakpoint.mdx).



File: HideAtBreakpoint/HideAtBreakpoint.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './HideAtBreakpoint-story.scss';
import mdx from './HideAtBreakpoint.mdx';

export default {
  title: 'Helpers/HideAtBreakpoint',
  component: 'HideAtBreakpoint',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const HideAtBreakpoint = () => {
  return (
    <>
      <div className="hide-at-sm">
        <code>@include hide-at-sm</code> <br />
        <br />
        Only hidden on sm breakpoint
      </div>
      <div className="hide-at-md">
        <code>@include hide-at-md</code> <br />
        <br />
        Only hidden on md breakpoint
      </div>
      <div className="hide-at-lg">
        <code>@include hide-at-lg</code> <br />
        <br />
        Only hidden on lg breakpoint
      </div>
      <div className="hide-at-xlg">
        <code>@include hide-at-xlg</code> <br />
        <br />
        Only hidden on xlg breakpoint
      </div>
      <div className="hide-at-max">
        <code>@include hide-at-max</code> <br />
        <br />
        Only hidden on max breakpoint
      </div>
    </>
  );
};



