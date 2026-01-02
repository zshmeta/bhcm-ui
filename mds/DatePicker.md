File: DatePicker/DatePicker.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import * as DatePickerStories from './DatePicker.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Date Picker

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/DatePicker)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/date-picker/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/date-picker/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Simple DatePicker](#simple-datepicker)
  - [Range Datepicker](#range-datepicker)
  - [Skeleton state](#skeleton-state)
  - [AI label](#ai-label)
- [Component API](#component-api)
  - [DatePicker `appendTo`](#datepicker-appendto)
  - [DatePicker `className`](#datepicker-classname)
  - [DatePicker `dateFormat`](#datepicker-dateformat)
  - [DatePicker `parseDate`](#datepicker-parsedate)
  - [DatePicker `datePickerType`](#datepicker-datepickertype)
  - [DatePicker `light`](#datepicker-light)
  - [DatePicker `locale`](#datepicker-locale)
  - [DatePicker `maxDate`](#datepicker-maxdate)
  - [DatePicker `minDate`](#datepicker-mindate)
  - [DatePicker `disable` and `enable`](#datepicker-disable-and-enable)
  - [DatePicker `value`](#datepicker-value)
- [References](#references)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Date pickers allow users to select a single or a range of dates. Pickers are
used to display past, present, or future dates. The kind of date (exact,
approximate, memorable) you are requesting from the user will determine which
picker is best to use. Each picker’s format can be customized depending on
location or need. The `DatePicker` component expects a `DatePickerInput` as a
child.

<Canvas of={DatePickerStories.Default} />

### Simple DatePicker

The simple date input provides the user with only a text field in which they can
manually input a date. It allows dates to be entered without adding unnecessary
interactions that come with the calendar menu or a dropdown.

<Canvas
  of={DatePickerStories.Simple}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DatePickerStories.Simple),
    },
  ]}
/>

### Range Datepicker

Calendar pickers default to showing today’s date when opened and only one month
is shown at a time. Calendar pickers allow users to navigate through months and
years, however they work best when used for recent or near future dates.

<Canvas
  of={DatePickerStories.SingleWithCalendar}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(DatePickerStories.SingleWithCalendar),
    },
  ]}
/>
<Canvas
  of={DatePickerStories.RangeWithCalendar}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(DatePickerStories.RangeWithCalendar),
    },
  ]}
/>

### Skeleton state

You can use the `DatePickerSkeleton` component to render a skeleton variant of a
`DatePicker`. This is useful to display while an initial date range in your
`DatePicker` is being fetched from an external resource like an API.

<Canvas
  of={DatePickerStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DatePickerStories.Skeleton),
    },
  ]}
/>

### AI label

<Canvas
  of={DatePickerStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DatePickerStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />

### DatePicker `appendTo`

By default, the `DatePicker` menu will be appended to the end of the `body`
element. If you would like to attach it to a different node, you can specify a
DOM element with the `appendTo` prop.

```jsx
const node = document.querySelector('#my-node');

<DatePicker appendTo={node}>...</DatePicker>;
```

### DatePicker `className`

The className prop passed into `DatePicker` will be forwarded along to the
underlying wrapper `div.cds--date-picker` element. This is useful for specifying
a custom class name for layout.

```jsx
<DatePicker className="some-class">...</DatePicker>
```

### DatePicker `dateFormat`

You can use the `dateFormat` prop to change how the selected date is displayed
in the input. For a complete list of supported date formatting tokens, please
see the Flatpickr
[documentation](https://flatpickr.js.org/formatting/#date-formatting-tokens).

When configuring `dateFormat`, a `parseDate` function can be specified to modify
the date correction behavior that is sometimes undesirable due to
[oddities in how the native date methods work](https://github.com/carbon-design-system/carbon/issues/15432#issuecomment-1967447677).

<DatePicker datePickerType="single" dateFormat="Y-m-d">
  <DatePickerInput
    placeholder="yyyy-mm-dd"
    id="date-picker-1"
    labelText="Date format example"
  />
</DatePicker>

```jsx
<DatePicker datePickerType="single" dateFormat="Y-m-d">
  <DatePickerInput placeholder="mm/dd/yyyy" />
</DatePicker>
```

### DatePicker `parseDate`

Most often used when configuring `dateFormat`, a `parseDate` function can be
specified to modify the date correction behavior that is sometimes undesirable
due to
[oddities in how the native date methods work](https://github.com/carbon-design-system/carbon/issues/15432#issuecomment-1967447677).

The specified `parseDate` function will be called before the date is actually
set. It's called with a date parameter, the input value, that should be parsed
and return a valid date string. The
[internal/default implementation](https://github.com/search?q=repo%3Acarbon-design-system%2Fcarbon+symbol%3AparseDate+language%3ATSX&type=code&l=TSX)
can be copied and used as a starting point.

### DatePicker `datePickerType`

There are three supported variations of `DatePicker` in Carbon.

- `simple` will render a simple text input _without_ a calendar dropdown.
- `single` will render a a single text input _with_ a calendar dropdown.
- `range` will indicate that multiple `DatePicker` inputs will be rendered. Two
  `DatePickerInput` will need to be provided as children.

```jsx
<DatePicker datePickerType="range">
  <DatePickerInput placeholder="Start" />
  <DatePickerInput placeholder="End" />
</DatePicker>
```

### DatePicker `light`

In certain circumstances, a `DatePicker` will exist on a container element with
the same background color. To improve contrast, you can use the `light` property
to toggle the light variant of the `DatePicker`.

```jsx
<DatePicker light>...</DatePicker>
```

### DatePicker `locale`

The `locale` prop can be used to help with internationalization. For best
results, combine with the `dateFormat` prop. We pass this under the hood to the
FlatPickr instance. A complete list of valid locales can be found in the
[component API](#component-api) section

<DatePicker locale="no" dateFormat="d/m/Y" datePickerType="single">
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-2"
    labelText="Locale example"
  />
</DatePicker>

```jsx
// Load Norwegian text with the proper date format
<DatePicker locale="no" dateFormat="d/m/Y" datePickerType="single">
  <DatePickerInput placeholder="dd/mm/yyyy" />
</DatePicker>
```

### DatePicker `maxDate`

Limits the date selection to any date before the date specified. The string
format depends on the `locale` specified. For example, the top example below is
using the default US date format, and the one below it is using the same format
as the `locale` prop example. One is setting it as September 1st, and the other
is setting it as January 9th.

<DatePicker maxDate="09/01/2020" datePickerType="single">
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-3"
    labelText="US format"
  />
</DatePicker>
<br />
<DatePicker
  maxDate="09/01/2020"
  datePickerType="single"
  locale="no"
  dateFormat="d/m/Y">
  <DatePickerInput
    placeholder="mm/dd/yyyy"
    id="date-picker-4"
    labelText="European format"
  />
</DatePicker>

```jsx
<DatePicker maxDate="09/01/2020">
  <DatePickerInput placeholder="mm/dd/yyyy" />
</DatePicker>

<DatePicker
  maxDate="09/01/2020"
  datePickerType="single"
  locale="no"
  dateFormat="d/m/Y">
  <DatePickerInput placeholder="mm/dd/yyyy" />
</DatePicker>;
```

### DatePicker `minDate`

Works similarly to the `maxDate` prop. [See above](#datepicker-maxdate).

<DatePicker
  minDate={new Date().setDate(new Date().getDate() - 5)}
  datePickerType="single"
  value={new Date()}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-5"
    labelText="minDate example"
  />
</DatePicker>

```jsx
<DatePicker
  minDate={new Date().setDate(new Date().getDate() - 5)}
  datePickerType="single"
  value={new Date()}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-5"
    labelText="minDate example"
  />
</DatePicker>
```

### DatePicker `disable` and `enable`

This uses the Flatpickr `disable` option which allows a user to disable certain
dates. The disable takes in a array of date strings, or you can pass in a date
function to the array that will disable dates that returns true.
[See the Flatpickr documentation for more info](https://flatpickr.js.org/examples/#disabling-dates).

<DatePicker
  datePickerType="single"
  disable={[(date) => date.getDay() === 0 || date.getDay() === 6]}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-8"
    labelText="minDate example"
  />
</DatePicker>

```jsx
<DatePicker
  datePickerType="single"
  disable={[(date) => date.getDay() === 0 || date.getDay() === 6]}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-8"
    labelText="minDate example"
  />
</DatePicker>
```

The `enable` option works the same, but will disable all dates that are not
explicitly added to the array.
[See the flatpickr documentation for more info](https://flatpickr.js.org/examples/#disabling-all-dates-except-select-few).

<DatePicker
  datePickerType="single"
  value="04/20/2023"
  enable={[
    {
      from: '04/10/2023',
      to: '04/25/2023',
    },
  ]}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-8"
    labelText="minDate example"
  />
</DatePicker>

```jsx
<DatePicker
  datePickerType="single"
  value="04/20/2023"
  enable={[
    {
      from: '04/10/2023',
      to: '04/25/2023',
    },
  ]}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-8"
    labelText="minDate example"
  />
</DatePicker>
```

### DatePicker `value`

By default `DatePicker` will set the current date as its value. If you'd like to
start this at a different date, you can pass in a date string or date object.

<DatePicker datePickerType="single" value="07/15/1988">
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-6"
    labelText="Value as string example"
  />
</DatePicker>
<br />
<DatePicker datePickerType="single" value={new Date()}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-7"
    labelText="Value as object example"
  />
</DatePicker>

```jsx
<DatePicker datePickerType="single" value="07/15/1988">
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-6"
    labelText="Value as string example"
  />
</DatePicker>
<br />
<DatePicker datePickerType="single" value={new Date()}>
  <DatePickerInput
    placeholder="dd/mm/yyyy"
    id="date-picker-7"
    labelText="Value as object example"
  />
</DatePicker>
```

## References

- The `DatePicker` component utilizes Flatpickr under the hood. We will pass any
  extra options down to the FlatPickr instance. For a full list of options,
  please see the [Flatpickr docs](https://flatpickr.js.org/options/)
- The `DatePickerInput` takes in similar props to the `TextInput` component,
  such as `size` and `placeholder`. For more information on these props, check
  out the `TextInput` page.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/DatePicker/DatePicker.mdx).



File: DatePicker/DatePicker.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import { useDocumentLang } from '../../internal/useDocumentLang';

import mdx from './DatePicker.mdx';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
    DatePickerSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'appendTo',
        'datePickerType',
        'disable',
        'enable',
        'inline',
        'locale',
        'value',
      ],
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

const sharedArgTypes = {
  onChange: {
    action: 'onChange',
  },
  onClose: {
    action: 'onClose',
  },
  onOpen: {
    action: 'onOpen',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    table: {
      category: 'DatePickerInput',
    },
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  placeholder: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  helperText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
};

export const Default = ({ readOnly, ...args }) => {
  const locale = useDocumentLang();
  return (
    <DatePicker
      datePickerType="single"
      {...args}
      readOnly={readOnly}
      locale={locale}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...args}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...args}
        />
      )}
    </DatePicker>
  );
};

Default.argTypes = {
  ...sharedArgTypes,
  datePickerType: {
    options: ['single', 'simple', 'range'],
    control: { type: 'select' },
  },
};

export const Simple = (args) => (
  <DatePicker datePickerType="simple" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
      {...args}
    />
  </DatePicker>
);

Simple.argTypes = { ...sharedArgTypes };

export const SingleWithCalendar = (args) => (
  <DatePicker datePickerType="single" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
      {...args}
    />
  </DatePicker>
);

SingleWithCalendar.argTypes = { ...sharedArgTypes };

export const RangeWithCalendar = (args) => {
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
        {...args}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
        {...args}
      />
    </DatePicker>
  );
};

RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const SimpleWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SimpleWithLayer.argTypes = { ...sharedArgTypes };

export const SingleWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SingleWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const RangeWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range" {...args}>
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
          {...args}
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

RangeWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const Skeleton = () => {
  return <DatePickerSkeleton range />;
};

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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
  return (
    <div style={{ width: 400 }}>
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          size="md"
          id="date-picker"
          decorator={aiLabel}
          {...args}
        />
      </DatePicker>
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };



File: DatePicker/DatePicker.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
  useState,
  ForwardedRef,
  ReactNode,
} from 'react';
import cx from 'classnames';
import flatpickr from 'flatpickr';
import l10n from 'flatpickr/dist/l10n/index';
import DatePickerInput from '../DatePickerInput';
import { appendToPlugin } from './plugins/appendToPlugin';
import carbonFlatpickrFixEventsPlugin from './plugins/fixEventsPlugin';
import { rangePlugin } from './plugins/rangePlugin';
import { deprecate } from '../../prop-types/deprecate';
import { match, keys } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { useSavedCallback } from '../../internal/useSavedCallback';
import { FormContext } from '../FluidForm';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import {
  DateLimit,
  DateOption,
  Options as FlatpickrOptions,
  Plugin,
} from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';
import { datePartsOrder } from '@carbon/utilities';
import { SUPPORTED_LOCALES, type SupportedLocale } from './DatePickerLocales';

// Weekdays shorthand for English locale
// Ensure localization exists before trying to access it
function initializeWeekdayShorthand() {
  if (l10n?.en?.weekdays?.shorthand) {
    l10n.en.weekdays.shorthand.forEach((_day, index) => {
      const currentDay = l10n.en.weekdays.shorthand;
      if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
        currentDay[index] = 'Th';
      } else {
        currentDay[index] = currentDay[index].charAt(0);
      }
    });
  }
}

const forEach = Array.prototype.forEach;

/**
 * @param {number} monthNumber The month number.
 * @param {boolean} shorthand `true` to use shorthand month.
 * @param {Locale} locale The Flatpickr locale data.
 * @returns {string} The month string.
 */
const monthToStr = (monthNumber, shorthand, locale) =>
  locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];

/**
 * @param {object} config Plugin configuration.
 * @param {boolean} [config.shorthand] `true` to use shorthand month.
 * @param {string} config.selectorFlatpickrMonthYearContainer The CSS selector for the container of month/year selection UI.
 * @param {string} config.selectorFlatpickrYearContainer The CSS selector for the container of year selection UI.
 * @param {string} config.selectorFlatpickrCurrentMonth The CSS selector for the text-based month selection UI.
 * @param {string} config.classFlatpickrCurrentMonth The CSS class for the text-based month selection UI.
 * @param {string} config.locale The locale code.
 * @returns {Plugin} A Flatpickr plugin to use text instead of `<select>` for month picker.
 */
const carbonFlatpickrMonthSelectPlugin = (config) => (fp) => {
  const setupElements = () => {
    if (!fp.monthElements) {
      return;
    }
    fp.monthElements.forEach((elem) => {
      if (!elem.parentNode) {
        return;
      }
      elem.parentNode.removeChild(elem);
    });
    fp.monthElements.splice(
      0,
      fp.monthElements.length,
      ...fp.monthElements.map(() => {
        const monthElement = fp._createElement(
          'span',
          config.classFlatpickrCurrentMonth
        );
        monthElement.textContent = monthToStr(
          fp.currentMonth,
          config.shorthand === true,
          fp.l10n
        );

        // Depending on the locale, toggle the order of the month and year
        if (datePartsOrder.isMonthFirst(config.locale)) {
          fp.yearElements[0]
            .closest(config.selectorFlatpickrMonthYearContainer)
            .insertBefore(
              monthElement,
              fp.yearElements[0].closest(config.selectorFlatpickrYearContainer)
            );
        } else {
          fp.yearElements[0]
            .closest(config.selectorFlatpickrMonthYearContainer)
            .insertAdjacentElement('afterend', monthElement);
        }

        return monthElement;
      })
    );
  };

  const updateCurrentMonth = () => {
    if (fp.monthElements) {
      const monthStr = monthToStr(
        fp.currentMonth,
        config.shorthand === true,
        fp.l10n
      );
      fp.yearElements.forEach((elem) => {
        const currentMonthContainer = elem.closest(
          config.selectorFlatpickrMonthYearContainer
        );
        Array.prototype.forEach.call(
          currentMonthContainer.querySelectorAll('.cur-month'),
          (monthElement) => {
            monthElement.textContent = monthStr;
          }
        );
      });
    }
  };

  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrMonthSelectPlugin');
  };

  return {
    onMonthChange: updateCurrentMonth,
    onValueUpdate: updateCurrentMonth,
    onOpen: updateCurrentMonth,
    onReady: [setupElements, updateCurrentMonth, register],
  };
};

/**
 * Determine if every child in a list of children has no label specified
 * @param {Array<ReactElement>} children
 * @returns {boolean}
 */
function isLabelTextEmpty(children) {
  return children.every((child) => !child.props.labelText);
}

function updateClassNames(calendar, prefix) {
  const calendarContainer = calendar.calendarContainer;
  const daysContainer = calendar.days;
  if (calendarContainer && daysContainer) {
    // calendarContainer and daysContainer are undefined if flatpickr detects a mobile device
    calendarContainer.classList.add(`${prefix}--date-picker__calendar`);
    calendarContainer
      .querySelector('.flatpickr-month')
      .classList.add(`${prefix}--date-picker__month`);
    calendarContainer
      .querySelector('.flatpickr-weekdays')
      .classList.add(`${prefix}--date-picker__weekdays`);
    calendarContainer
      .querySelector('.flatpickr-days')
      .classList.add(`${prefix}--date-picker__days`);
    forEach.call(
      calendarContainer.querySelectorAll('.flatpickr-weekday'),
      (item) => {
        const currentItem = item;
        currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
        currentItem.classList.add(`${prefix}--date-picker__weekday`);
      }
    );
    forEach.call(daysContainer.querySelectorAll('.flatpickr-day'), (item) => {
      item.classList.add(`${prefix}--date-picker__day`);
      item.setAttribute('role', 'button');
      if (
        item.classList.contains('today') &&
        calendar.selectedDates.length > 0
      ) {
        item.classList.add('no-border');
      } else if (
        item.classList.contains('today') &&
        calendar.selectedDates.length === 0
      ) {
        item.classList.remove('no-border');
      }
    });
  }
}

export type DatePickerTypes = 'simple' | 'single' | 'range';

export interface DatePickerProps {
  /**
   * Flatpickr prop passthrough enables direct date input, and when set to false,
   * we must clear dates manually by resetting the value prop to to a falsy value (such as `""`, `null`, or `undefined`) or an array of all falsy values, making it a controlled input.
   */
  allowInput?: boolean;

  /**
   * The DOM element the flatpickr should be inserted into `<body>` by default.
   */
  appendTo?: HTMLElement;

  /**
   * The child nodes.
   */
  children: ReactNode | object;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
   */
  closeOnSelect?: boolean;

  /**
   * The date format.
   */
  dateFormat?: string;

  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType?: DatePickerTypes;

  /**
   * The flatpickr `disable` option that allows a user to disable certain dates.
   */
  disable?: DateLimit<DateOption>[];

  /**
   * The flatpickr `enable` option that allows a user to enable certain dates.
   */
  enable?: DateLimit<DateOption>[];

  /**
   * The flatpickr `inline` option.
   */
  inline?: boolean;

  /**
   * Specify whether or not the control is invalid (Fluid only)
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in error state (Fluid Only)
   */
  invalidText?: ReactNode;

  /**
   * `true` to use the light version.
   */
  light?: boolean;

  /**
   *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
   */
  locale?:
    | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    | any
    | SupportedLocale
    | undefined;

  /**
   * The maximum date that a user can pick to.
   */
  maxDate?: DateOption;

  /**
   * The minimum date that a user can start picking from.
   */
  minDate?: DateOption;

  /**
   * The `change` event handler.
   */
  onChange?: flatpickr.Options.Hook;

  /**
   * The `close` event handler.
   */
  onClose?: flatpickr.Options.Hook;

  /**
   * The `open` event handler.
   */
  onOpen?: flatpickr.Options.Hook;

  /**
   * flatpickr prop passthrough. Controls how dates are parsed.
   */
  parseDate?: (date: string) => Date | false;

  /**
   * whether the DatePicker is to be readOnly
   * if boolean applies to all inputs
   * if array applies to each input in order
   */
  readOnly?: boolean | undefined;

  /**
   * `true` to use the short version.
   */
  short?: boolean;

  /**
   * The value of the date value provided to flatpickr, could
   * be a date, a date number, a date string, an array of dates.
   */
  value?: DateOption | DateOption[];

  /**
   * Specify whether the control is currently in warning state (Fluid only)
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state (Fluid only)
   */
  warnText?: ReactNode;

  /**
   * Accessible aria-label for the "next month" arrow icon.
   */
  nextMonthAriaLabel?: string;

  /**
   * Accessible aria-label for the "previous month" arrow icon.
   */
  prevMonthAriaLabel?: string;
}

const DatePicker = React.forwardRef(function DatePicker(
  {
    allowInput,
    appendTo,
    children,
    className,
    closeOnSelect = true,
    dateFormat = 'm/d/Y',
    datePickerType,
    disable,
    enable,
    inline,
    invalid,
    invalidText,
    warn,
    warnText,
    light = false,
    locale = 'en',
    maxDate,
    minDate,
    onChange,
    onClose,
    onOpen,
    readOnly = false,
    short = false,
    value,
    parseDate: parseDateProp,
    nextMonthAriaLabel = 'Next month',
    prevMonthAriaLabel = 'Previous month',
    ...rest
  }: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const [hasInput, setHasInput] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const startInputField: any = useCallback((node) => {
    if (node !== null) {
      startInputField.current = node;
      setHasInput(true);
    }
  }, []);

  const lastStartValue = useRef('');
  const calendarRef = useRef<Instance>(null);

  interface CalendarCloseEvent {
    selectedDates: Date[];
    dateStr: string;
    instance: Instance;
  }
  const [calendarCloseEvent, setCalendarCloseEvent] =
    useState<CalendarCloseEvent | null>(null);

  // fix datepicker deleting the selectedDate when the calendar closes
  const handleCalendarClose = useCallback(
    (selectedDates, dateStr, instance) => {
      if (
        lastStartValue.current &&
        selectedDates[0] &&
        !startInputField.current.value
      ) {
        startInputField.current.value = lastStartValue.current;
        calendarRef.current?.setDate(
          [startInputField.current.value, endInputField?.current?.value],
          true,
          calendarRef.current.config.dateFormat
        );
      }
      if (onClose) {
        onClose(selectedDates, dateStr, instance);
      }
    },
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    [onClose]
  );
  // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  const onCalendarClose = (selectedDates, dateStr, instance, e) => {
    if (e && e.type === 'clickOutside') {
      return;
    }
    setCalendarCloseEvent({ selectedDates, dateStr, instance });
  };
  useEffect(() => {
    if (calendarCloseEvent) {
      const { selectedDates, dateStr, instance } = calendarCloseEvent;
      handleCalendarClose(selectedDates, dateStr, instance);
      setCalendarCloseEvent(null);
    }
  }, [calendarCloseEvent, handleCalendarClose]);

  const endInputField = useRef<HTMLInputElement>(null);
  const lastFocusedField = useRef<HTMLInputElement>(null);
  const savedOnChange = useSavedCallback(onChange);

  const savedOnOpen = useSavedCallback(onOpen);

  const effectiveWarn = warn && !invalid;

  const datePickerClasses = cx(`${prefix}--date-picker`, {
    [`${prefix}--date-picker--short`]: short,
    [`${prefix}--date-picker--light`]: light,
    [`${prefix}--date-picker--simple`]: datePickerType === 'simple',
    [`${prefix}--date-picker--single`]: datePickerType === 'single',
    [`${prefix}--date-picker--range`]: datePickerType === 'range',
    [`${prefix}--date-picker--nolabel`]:
      datePickerType === 'range' && isLabelTextEmpty(children),
  });
  const wrapperClasses = cx(`${prefix}--form-item`, {
    [String(className)]: className,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const childrenWithProps = React.Children.toArray(children as any).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    (child: any, index) => {
      if (
        index === 0 &&
        child.type === React.createElement(DatePickerInput, child.props).type
      ) {
        return React.cloneElement(child, {
          datePickerType,
          ref: startInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
      if (
        index === 1 &&
        child.type === React.createElement(DatePickerInput, child.props).type
      ) {
        return React.cloneElement(child, {
          datePickerType,
          ref: endInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
      if (index === 0) {
        return React.cloneElement(child, {
          ref: startInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
      if (index === 1) {
        return React.cloneElement(child, {
          ref: endInputField,
          readOnly,
          invalid,
          warn: effectiveWarn,
        });
      }
    }
  );

  useEffect(() => {
    initializeWeekdayShorthand();
  }, []);

  useEffect(() => {
    if (datePickerType !== 'single' && datePickerType !== 'range') {
      return;
    }

    if (!startInputField.current) {
      return;
    }

    const onHook = (_electedDates, _dateStr, instance) => {
      updateClassNames(instance, prefix);
      if (startInputField?.current) {
        startInputField.current.readOnly = readOnly;
      }
      if (endInputField?.current) {
        endInputField.current.readOnly = readOnly;
      }
    };

    // Logic to determine if `enable` or `disable` will be passed down. If neither
    // is provided, we return the default empty disabled array, allowing all dates.
    const enableOrDisable = enable ? 'enable' : 'disable';
    let enableOrDisableArr;
    if (!enable && !disable) {
      enableOrDisableArr = [];
    } else if (enable) {
      enableOrDisableArr = enable;
    } else {
      enableOrDisableArr = disable;
    }

    let localeData;
    if (typeof locale === 'object') {
      const location = locale.locale ? locale.locale : 'en';
      localeData = { ...l10n[location], ...locale };
    } else {
      localeData = l10n[locale];
    }

    /**
     * parseDate is called before the date is actually set.
     * It attempts to parse the input value and return a valid date string.
     * Flatpickr's default parser results in odd dates when given invalid
     * values, so instead here we normalize the month/day to `1` if given
     * a value outside the acceptable range.
     */
    let parseDate;
    if (!parseDateProp && dateFormat === 'm/d/Y') {
      // This function only supports the default dateFormat.
      parseDate = (date) => {
        // Month must be 1-12. If outside these bounds, `1` should be used.
        const month =
          date.split('/')[0] <= 12 && date.split('/')[0] > 0
            ? parseInt(date.split('/')[0])
            : 1;
        const year = parseInt(date.split('/')[2]);

        if (month && year) {
          // The month and year must be provided to be able to determine
          // the number of days in the month.
          const daysInMonth = new Date(year, month, 0).getDate();
          // If the day does not fall within the days in the month, `1` should be used.
          const day =
            date.split('/')[1] <= daysInMonth && date.split('/')[1] > 0
              ? parseInt(date.split('/')[1])
              : 1;

          return new Date(`${year}/${month}/${day}`);
        } else {
          // With no month and year, we cannot calculate anything.
          // Returning false gives flatpickr an invalid date, which will clear the input
          return false;
        }
      };
    } else if (parseDateProp) {
      parseDate = parseDateProp;
    }

    // Accessible arrow icons (localized manually)
    // Flatpickr does not currently support localization of next/previous month
    // labels, so we inject translated aria-labels based on the provided locale.
    const rightArrowHTML = `<svg aria-label="${nextMonthAriaLabel}" role="img" width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 "/>
    </svg>`;

    const leftArrowHTML = `<svg aria-label="${prevMonthAriaLabel}" role="img" width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 "/>
    </svg>`;

    const { current: start } = startInputField;
    const { current: end } = endInputField;
    const flatpickerConfig: Partial<FlatpickrOptions> = {
      inline: inline ?? false,
      onClose: onCalendarClose,
      disableMobile: true,
      defaultDate: value,
      closeOnSelect: closeOnSelect,
      mode: datePickerType,
      allowInput: allowInput ?? true,
      dateFormat: dateFormat,
      locale: localeData,
      [enableOrDisable]: enableOrDisableArr,
      minDate: minDate,
      maxDate: maxDate,
      parseDate: parseDate,
      plugins: [
        datePickerType === 'range'
          ? rangePlugin({
              input: endInputField.current ?? undefined,
            })
          : ((() => {}) as unknown as Plugin),
        appendTo
          ? appendToPlugin({
              appendTo,
            })
          : ((() => {}) as unknown as Plugin),
        carbonFlatpickrMonthSelectPlugin({
          selectorFlatpickrMonthYearContainer: '.flatpickr-current-month',
          selectorFlatpickrYearContainer: '.numInputWrapper',
          selectorFlatpickrCurrentMonth: '.cur-month',
          classFlatpickrCurrentMonth: 'cur-month',
          locale: locale,
        }) as unknown as Plugin,
        carbonFlatpickrFixEventsPlugin({
          inputFrom: startInputField.current,
          inputTo: endInputField.current,
          lastStartValue,
        }) as unknown as Plugin,
      ],
      clickOpens: !readOnly,
      noCalendar: readOnly,
      nextArrow: rightArrowHTML,
      prevArrow: leftArrowHTML,
      onChange: (...args: [Date[], string, Instance]) => {
        if (!readOnly) {
          savedOnChange(...args);
        }
      },
      onReady: onHook,
      onMonthChange: onHook,
      onYearChange: onHook,
      onOpen: (...args: [Date[], string, Instance]) => {
        onHook(...args);
        savedOnOpen(...args);
      },
      onValueUpdate: onHook,
    };
    const calendar = flatpickr(start, flatpickerConfig);

    calendarRef.current = calendar;

    const handleInputFieldKeyDown = (event: KeyboardEvent) => {
      const {
        calendarContainer,
        selectedDateElem: fpSelectedDateElem,
        todayDateElem: fpTodayDateElem,
      } = calendar;

      if (match(event, keys.Escape)) {
        calendarContainer.classList.remove('open');
      }

      if (match(event, keys.Tab)) {
        if (!event.shiftKey) {
          event.preventDefault();
          calendarContainer.classList.add('open');
          const selectedDateElem =
            calendarContainer.querySelector('.selected') && fpSelectedDateElem;
          const todayDateElem =
            calendarContainer.querySelector('.today') && fpTodayDateElem;
          (
            (selectedDateElem ||
              todayDateElem ||
              calendarContainer.querySelector('.flatpickr-day[tabindex]') ||
              calendarContainer) as HTMLElement
          ).focus();

          if (event.target === startInputField.current) {
            lastFocusedField.current = startInputField.current;
          } else if (event.target === endInputField.current) {
            lastFocusedField.current = endInputField.current;
          }
        } else if (
          calendarRef.current?.isOpen &&
          event.target === startInputField.current
        ) {
          calendarRef.current.close();
          onCalendarClose(
            calendarRef.current.selectedDates,
            '',
            calendarRef.current,
            event
          );
        }
      }
    };

    const handleCalendarKeyDown = (event: KeyboardEvent) => {
      if (!calendarRef.current || !startInputField.current) return;
      const lastInputField =
        datePickerType == 'range'
          ? endInputField.current
          : startInputField.current;
      if (match(event, keys.Tab)) {
        if (!event.shiftKey) {
          if (lastFocusedField.current === lastInputField) {
            lastInputField.focus();
            calendarRef.current.close();
            onCalendarClose(
              calendarRef.current.selectedDates,
              '',
              calendarRef.current,
              event
            );
          } else {
            event.preventDefault();
            lastInputField.focus();
          }
        } else {
          event.preventDefault();
          (lastFocusedField.current || startInputField.current).focus();
        }
      }
    };

    function handleOnChange(event) {
      const { target } = event;
      if (target === start) {
        lastStartValue.current = start.value;
      }

      if (start.value !== '') {
        return;
      }

      if (!calendar.selectedDates) {
        return;
      }

      if (calendar.selectedDates.length === 0) {
        return;
      }
    }

    function handleKeyPress(event) {
      if (
        match(event, keys.Enter) &&
        closeOnSelect &&
        datePickerType == 'single'
      ) {
        calendar.calendarContainer.classList.remove('open');
      }
    }

    if (start) {
      start.addEventListener('keydown', handleInputFieldKeyDown);
      start.addEventListener('change', handleOnChange);
      start.addEventListener('keypress', handleKeyPress);

      if (calendar && calendar.calendarContainer) {
        // Flatpickr's calendar dialog is not rendered in a landmark causing an
        // error with IBM Equal Access Accessibility Checker so we add an aria
        // role to the container div.
        calendar.calendarContainer.setAttribute('role', 'application');
        // IBM EAAC requires an aria-label on a role='region'
        calendar.calendarContainer.setAttribute(
          'aria-label',
          'calendar-container'
        );
      }
    }

    if (end) {
      end.addEventListener('keydown', handleInputFieldKeyDown);
      end.addEventListener('change', handleOnChange);
      end.addEventListener('keypress', handleKeyPress);
    }

    if (calendar.calendarContainer) {
      calendar.calendarContainer.addEventListener(
        'keydown',
        handleCalendarKeyDown
      );
    }

    //component did unmount equivalent
    return () => {
      // Note: if the `startInputField` ref is undefined then calendar will be
      // of type: Array and `destroy` will not be defined
      if (calendar && calendar.destroy) {
        calendar.destroy();
      }

      // prevent a duplicate date selection when a default value is set
      if (value) {
        if (start) {
          start.value = '';
        }
        if (end) {
          end.value = '';
        }
      }

      if (start) {
        start.removeEventListener('keydown', handleInputFieldKeyDown);
        start.removeEventListener('change', handleOnChange);
        start.removeEventListener('keypress', handleKeyPress);
      }

      if (end) {
        end.removeEventListener('keydown', handleInputFieldKeyDown);
        end.removeEventListener('change', handleOnChange);
        end.removeEventListener('keypress', handleKeyPress);
      }

      if (calendar.calendarContainer) {
        calendar.calendarContainer.removeEventListener(
          'keydown',
          handleCalendarKeyDown
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    savedOnChange,
    savedOnOpen,
    readOnly,
    closeOnSelect,
    hasInput,
    datePickerType,
    nextMonthAriaLabel,
    prevMonthAriaLabel,
  ]);

  // this hook allows consumers to access the flatpickr calendar
  // instance for cases where functions like open() or close()
  // need to be imperatively called on the calendar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  useImperativeHandle(ref, (): any => ({
    get calendar() {
      return calendarRef.current;
    },
  }));

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set({ dateFormat });
    }
  }, [dateFormat]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('minDate', minDate);
    }
  }, [minDate]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('allowInput', allowInput);
    }
  }, [allowInput]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      calendarRef.current.set('maxDate', maxDate);
    }
  }, [maxDate]);

  useEffect(() => {
    if (calendarRef.current?.set && disable) {
      calendarRef.current.set('disable', disable);
    }
  }, [disable]);

  useEffect(() => {
    if (calendarRef.current?.set && enable) {
      calendarRef.current.set('enable', enable);
    }
  }, [enable]);

  useEffect(() => {
    if (calendarRef.current?.set && inline) {
      calendarRef.current.set('inline', inline);
    }
  }, [inline]);

  useEffect(() => {
    // when value prop is manually reset, this clears the flatpickr calendar instance and text input
    // run if both:
    // 1. value prop is set to a falsy value (`""`, `undefined`, `null`, etc) OR an array of all falsy values
    // 2. flatpickr instance contains values in its `selectedDates` property so it hasn't already been cleared
    if (
      (!value || (Array.isArray(value) && value.every((date) => !date))) &&
      calendarRef.current?.selectedDates.length
    ) {
      calendarRef.current?.clear();

      if (startInputField.current) {
        startInputField.current.value = '';
      }

      if (endInputField.current) {
        endInputField.current.value = '';
      }
    }
  }, [value, startInputField]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        calendarRef.current &&
        calendarRef.current.isOpen &&
        !calendarRef.current.calendarContainer.contains(event.target) &&
        !startInputField.current.contains(event.target) &&
        !endInputField.current?.contains(event.target)
      ) {
        // Close the calendar immediately on mousedown
        closeCalendar();
      }
    };
    const closeCalendar = () => {
      calendarRef.current?.close();
      // Remove focus from endDate calendar input
      onCalendarClose(
        calendarRef.current?.selectedDates,
        '',
        calendarRef.current,
        { type: 'clickOutside' }
      );
    };
    document.addEventListener('mousedown', handleMouseDown, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [calendarRef, startInputField, endInputField, onCalendarClose]);

  useEffect(() => {
    if (calendarRef.current?.set) {
      if (value !== undefined) {
        // To make up for calendarRef.current.setDate not making provision for an empty string or array
        if (
          value === '' ||
          value === null ||
          (Array.isArray(value) &&
            (value.length === 0 || value.every((element) => !element)))
        ) {
          // only clear if there are selected dates to avoid unnecessary operations
          if (calendarRef.current.selectedDates.length > 0) {
            calendarRef.current.clear();
          }
        } else {
          calendarRef.current.setDate(value);
        }
      }
      updateClassNames(calendarRef.current, prefix);
      //for simple date picker w/o calendar; initial mount may not have value
    } else if (!calendarRef.current && value) {
      startInputField.current.value = value;
    }
  }, [value, prefix, startInputField]);

  let fluidError;
  if (isFluid) {
    if (invalid) {
      fluidError = (
        <>
          <WarningFilled
            className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
          />
          <hr className={`${prefix}--date-picker__divider`} />
          <div className={`${prefix}--form-requirement`}>{invalidText}</div>
        </>
      );
    } else if (warn) {
      fluidError = (
        <>
          <WarningAltFilled
            className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
          />
          <hr className={`${prefix}--date-picker__divider`} />
          <div className={`${prefix}--form-requirement`}>{warnText}</div>
        </>
      );
    }
  }

  return (
    <div className={wrapperClasses} ref={ref} {...rest}>
      <div className={datePickerClasses}>{childrenWithProps}</div>
      {fluidError}
    </div>
  );
});

DatePicker.propTypes = {
  /**
   * Flatpickr prop passthrough enables direct date input, and when set to false,
   * we must clear dates manually by resetting the value prop to a falsy value (such as `""`, `null`, or `undefined`) or an array of all falsy values, making it a controlled input.
   */
  allowInput: PropTypes.bool,

  /**
   * The DOM element the Flatpicker should be inserted into. `<body>` by default.
   */
  appendTo: PropTypes.object,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.
   */
  closeOnSelect: PropTypes.bool,

  /**
   * The date format.
   */
  dateFormat: PropTypes.string,

  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * The flatpickr `disable` option that allows a user to disable certain dates.
   */
  disable: PropTypes.array,

  /**
   * The flatpickr `enable` option that allows a user to enable certain dates.
   */
  enable: PropTypes.array,

  /**
   * The flatpickr `inline` option.
   */
  inline: PropTypes.bool,

  /**
   * Specify whether or not the control is invalid (Fluid only)
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state (Fluid Only)
   */
  invalidText: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `DatePicker` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),
  /**
   *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
   */
  locale: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf(SUPPORTED_LOCALES),
  ]),

  /**
   * The maximum date that a user can pick to.
   */
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The minimum date that a user can start picking from.
   */
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The `change` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onChange: PropTypes.func,

  /**
   * The `close` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onClose: PropTypes.func,

  /**
   * The `open` event handler.
   * `(dates: Date[], dStr: string, fp: Instance, data?: any):void;`
   */
  onOpen: PropTypes.func,

  /**
   * flatpickr prop passthrough. Controls how dates are parsed.
   */
  parseDate: PropTypes.func,

  /**
   * whether the DatePicker is to be readOnly
   * if boolean applies to all inputs
   * if array applies to each input in order
   */
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),

  /**
   * `true` to use the short version.
   */
  short: PropTypes.bool,

  /**
   * The value of the date value provided to flatpickr, could
   * be a date, a date number, a date string, an array of dates.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ])
    ),
    PropTypes.object,
    PropTypes.number,
  ]),

  /**
   * Specify whether the control is currently in warning state (Fluid only)
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state (Fluid only)
   */
  warnText: PropTypes.node,

  /**
   * Accessible aria-label for the "next month" arrow icon.
   */
  nextMonthAriaLabel: PropTypes.string,

  /**
   * Accessible aria-label for the "previous month" arrow icon.
   */
  prevMonthAriaLabel: PropTypes.string,
};

export default DatePicker;



File: DatePicker/DatePickerLocales.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The full list of supported locales can be found here:
 * https://github.com/flatpickr/flatpickr/tree/master/src/l10n
 */
export const SUPPORTED_LOCALES = [
  'ar', // Arabic
  'at', // Austria
  'az', // Azerbaijan
  'be', // Belarusian
  'bg', // Bulgarian
  'bn', // Bangla
  'bs', // Bosnia
  'cat', // Catalan
  'cs', // Czech
  'cy', // Welsh
  'da', // Danish
  'de', // German
  'en', // English
  'eo', // Esperanto
  'es', // Spanish
  'et', // Estonian
  'fa', // Persian
  'fi', // Finnish
  'fo', // Faroese
  'fr', // French
  'ga', // Gaelic
  'gr', // Greek
  'he', // Hebrew
  'hi', // Hindi
  'hr', // Croatian
  'hu', // Hungarian
  'id', // Indonesian
  'is', // Icelandic
  'it', // Italian
  'ja', // Japanese
  'ka', // Georgian
  'km', // Khmer
  'ko', // Korean
  'kz', // Kazakh
  'lt', // Lithuanian
  'lv', // Latvian
  'mk', // Macedonian
  'mn', // Mongolian
  'ms', // Malaysian
  'my', // Burmese
  'nl', // Dutch
  'no', // Norwegian
  'pa', // Punjabi
  'pl', // Polish
  'pt', // Portuguese
  'ro', // Romanian
  'ru', // Russian
  'si', // Sinhala
  'sk', // Slovak
  'sl', // Slovenian
  'sq', // Albanian
  'sr', // Serbian
  'sv', // Swedish
  'th', // Thai
  'tr', // Turkish
  'uk', // Ukrainian
  'uz', // Uzbek
  'uz_latn', // Uzbek Latin
  'vn', // Vietnamese
  'zh_tw', // Mandarin Traditional
  'zh', // Mandarin
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];



File: DatePicker/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  tall
  variants={[
    {
      label: 'Range With Calendar',
      variant: 'components-datepicker--range-with-calendar'
    },
    {
      label: 'Simple',
      variant: 'components-datepicker--simple'
    },
    {
      label: 'Single With Calendar',
      variant: 'components-datepicker--single-with-calendar'
    },
    {
      label: 'Fluid Range With Calendar (unstable)',
      variant: 'experimental-unstable-fluiddatepicker--range-with-calendar'
    },
    {
      label: 'Fluid Simple (unstable)',
      variant: 'experimental-unstable-fluiddatepicker--simple'
    },
    {
      label: 'Fluid Single (unstable)',
      variant: 'experimental-unstable-fluiddatepicker--single'
    }
  ]}
/>



File: DatePicker/migrate-to-7.x.md


# Props

`<DatePicker>`

| Prop       | v9                                   | v10                     |
| ---------- | ------------------------------------ | ----------------------- |
| `appendTo` | Accepts a CSS selector or a DOM node | Accepts a DOM node only |



File: DatePicker/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DatePicker, { type DatePickerProps } from './DatePicker';

export {
  default as DatePickerSkeleton,
  type DatePickerSkeletonProps,
} from './DatePicker.Skeleton';
export default DatePicker;
export { DatePicker, type DatePickerProps };



File: DatePicker/DatePicker-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import DatePicker from './DatePicker';
import DatePickerInput from '../DatePickerInput';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AILabel } from '../AILabel';
import { FormContext } from '../FluidForm';

const prefix = 'cds';

describe('DatePicker', () => {
  it('should add extra classes that are passed via className', () => {
    render(
      <DatePicker
        onChange={() => {}}
        className="custom-class"
        dateFormat="m/d/Y"
        data-testid="datePicker-1">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(screen.getByTestId('datePicker-1')).toHaveClass('custom-class');
  });

  it('should add the correct class when type "simple" is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--simple`)
    ).toBeInTheDocument();
  });

  it('should add the correct class when type "single" is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--single`)
    ).toBeInTheDocument();
  });

  it('should add the correct class when type "range" is passed as a prop', () => {
    render(
      <DatePicker onChange={() => {}} dateFormat="m/d/Y" datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--date-picker--range`)
    ).toBeInTheDocument();
  });

  it('should add the date format as expected', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/01/2022"
        dateFormat="Y/m/d">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="yyyy/mm/dd"
          labelText="Date Picker label"
        />
      </DatePicker>
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '2022/01/01'
    );
  });

  it('has the value as expected', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/03/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/03/2018'
    );
  });

  it('should accept a `ref` for the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<DatePicker ref={ref} />);

    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  it('should respect decorator prop', () => {
    render(
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        data-testid="input-value"
        decorator={<AILabel />}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(
      `${prefix}--ai-label__button`
    );
  });

  it('should respect deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        data-testid="input-value"
        slug={<AILabel />}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(
      `${prefix}--ai-label__button`
    );
    spy.mockRestore();
  });

  it('should respect parseDate prop', async () => {
    const parseDate = jest.fn();
    parseDate.mockReturnValueOnce(new Date('1989/01/20'));
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        parseDate={parseDate}>
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/20/1989{enter}'
    );
    expect(parseDate).toHaveBeenCalled();
  });

  it('invalid date month/day is correctly parsed when using the default format', async () => {
    render(
      <DatePicker onChange={() => {}} datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    // Invalid month
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '99/20/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    // Invalid day
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/99/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    // Invalid month and day
    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '99/99/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/1989'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });

  it('invalid date month/day is parsed by flatpickr when using a custom format', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        dateFormat="d/m/Y">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '34/34/3434{enter}'
    );
    // More on how this value is calculated by flatpickr:
    // https://github.com/carbon-design-system/carbon/issues/15432#issuecomment-1967447677
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '03/10/3436'
    );
    await userEvent.clear(screen.getByLabelText('Date Picker label'));
  });

  it('the input is cleared when given a completely invalid date', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DatePicker onChange={() => {}} datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-value"
        />
      </DatePicker>
    );

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      'a1/0a/a999{enter}'
    );
    expect(warn).toHaveBeenCalled();
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
    warn.mockRestore();
  });

  it('should show only invalid text when both invalid and warn are true in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={true}
          invalidText="Invalid date"
          warn={true}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
  });

  it('should show only warning text when warn is true and invalid is false in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={false}
          invalidText="Invalid date"
          warn={true}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
  });

  it('should not show any error text when both invalid and warn are false in fluid mode', () => {
    render(
      <FormContext.Provider value={{ isFluid: true }}>
        <DatePicker
          datePickerType="single"
          invalid={false}
          invalidText="Invalid date"
          warn={false}
          warnText="Warning message">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
          />
        </DatePicker>
      </FormContext.Provider>
    );
    expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
  });

  describe('Invalid and Warning States with Disabled/ReadOnly', () => {
    it('should not show invalid state when disabled', () => {
      render(
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            invalid={true}
            invalidText="Invalid date"
            disabled={true}
          />
        </DatePicker>
      );

      expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--invalid`)
      ).not.toBeInTheDocument();
    });

    it('should not show warning state when disabled', () => {
      render(
        <DatePicker datePickerType="single">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            warn={true}
            warnText="Warning message"
            disabled={true}
          />
        </DatePicker>
      );

      expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--warn`)
      ).not.toBeInTheDocument();
    });

    it('should not show invalid state when readOnly', () => {
      render(
        <DatePicker datePickerType="single" readOnly={true}>
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            invalid={true}
            invalidText="Invalid date"
          />
        </DatePicker>
      );

      expect(screen.queryByText('Invalid date')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--invalid`)
      ).not.toBeInTheDocument();
    });

    it('should not show warning state when readOnly', () => {
      render(
        <DatePicker datePickerType="single" readOnly={true}>
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            warn={true}
            warnText="Warning message"
          />
        </DatePicker>
      );

      expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-node-access
      expect(
        document.querySelector(`.${prefix}--date-picker__icon--warn`)
      ).not.toBeInTheDocument();
    });
  });
});

describe('Simple date picker', () => {
  it('should not initialize a calendar', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    expect(screen.queryByRole('application')).not.toBeInTheDocument();
  });

  it('should remove the calendar if changed from another type to simple', () => {
    const { rerender } = render(
      <DatePicker datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.queryByRole('application')).not.toBeInTheDocument();
  });

  describe('react.lazy', () => {
    let cleanup;
    let render;
    let screen;
    let LazyDatePicker;
    let LazyDatePickerInput;

    beforeEach(() => {
      jest.resetModules();
      cleanup = require('@testing-library/react/pure').cleanup;
      render = require('@testing-library/react/pure').render;
      screen = require('@testing-library/react/pure').screen;
    });

    afterEach(() => {
      cleanup();
    });

    it.skip('should initialize a calendar when using react.lazy', async () => {
      LazyDatePicker = React.lazy(() =>
        import('@carbon/react').then((module) => ({
          default: module.DatePicker,
        }))
      );

      LazyDatePickerInput = React.lazy(() =>
        import('@carbon/react').then((module) => ({
          default: module.DatePickerInput,
        }))
      );

      render(
        <React.Suspense fallback="Loading">
          <LazyDatePicker datePickerType="single">
            <LazyDatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
            />
          </LazyDatePicker>
        </React.Suspense>
      );

      const labeledElement = await screen.findByLabelText(
        'Date Picker label',
        {},
        { timeout: 5000 }
      );
      expect(labeledElement).toBeInTheDocument();

      const input = screen.getByRole('textbox');

      expect(screen.getByRole('application')).not.toHaveClass('open');
      await userEvent.click(input);
      expect(screen.getByRole('application')).toHaveClass('open');
    });
  });
});

describe('Single date picker', () => {
  it('should initialize a calendar', () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('should update the calendar classnames when open', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        dateFormat="m/d/Y"
        datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
      </DatePicker>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const input = document.querySelector(`.${prefix}--date-picker__input`);

    expect(screen.getByRole('application')).not.toHaveClass('open');
    await userEvent.click(input);
    expect(screen.getByRole('application')).toHaveClass('open');
  });

  it('should add the calendar if changed from simple type to single', () => {
    const { rerender } = render(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.queryByRole('application')).not.toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="single">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('should support controlled value', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState();
      return (
        <>
          <DatePicker
            datePickerType="single"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
            />
          </DatePicker>
          <button
            type="button"
            onClick={() => {
              setDate('');
            }}>
            clear
          </button>
        </>
      );
    };

    render(<DatePickerExample />);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');

    await userEvent.type(
      screen.getByLabelText('Date Picker label'),
      '01/20/1989{enter}'
    );
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );

    await userEvent.click(screen.getByText('clear'));
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });

  it('should clear calendar when value is set to null', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState('01/20/1989');
      return (
        <>
          <DatePicker
            datePickerType="single"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              id="date-picker-simple"
            />
          </DatePicker>
          <button
            type="button"
            onClick={() => {
              setDate(null);
            }}>
            clear
          </button>
        </>
      );
    };

    render(<DatePickerExample />);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/20/1989'
    );

    await userEvent.click(screen.getByText('clear'));
    expect(screen.getByLabelText('Date Picker label')).toHaveValue('');
  });

  it('should respect closeOnSelect prop', async () => {
    const DatePickerExample = () => {
      const [date, setDate] = useState();
      return (
        <DatePicker
          datePickerType="single"
          value={date}
          closeOnSelect={false}
          minDate="11/25/2023"
          maxDate="11/28/2023"
          onChange={(value) => {
            setDate(value);
          }}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-simple"
          />
        </DatePicker>
      );
    };
    render(<DatePickerExample />);
    const input = screen.getByLabelText('Date Picker label');
    expect(screen.getByRole('application')).not.toHaveClass('open');

    await userEvent.click(input);
    expect(screen.getByRole('application')).toHaveClass('open');

    // eslint-disable-next-line testing-library/no-node-access
    const belowMinDate = document.querySelector(
      '[aria-label="November 26, 2023"]'
    );
    await userEvent.click(belowMinDate);

    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '11/26/2023'
    );
    expect(screen.getByRole('application')).toHaveClass('open');
  });

  it('should close calendar with single type on focus loss', async () => {
    const onClose = jest.fn();
    render(
      <DatePicker datePickerType="single" onClose={onClose}>
        <DatePickerInput id="input-id" labelText="Date input" />
      </DatePicker>
    );

    const dateInput = screen.getByLabelText('Date input');

    // close on pressing TAB from calendar
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(dateInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(1);

    // close on pressing SHIFT+TAB from date input
    await userEvent.tab();
    expect(dateInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab({ shift: true });
    expect(dateInput).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

describe('Range date picker', () => {
  it('should not fire onChange handler when clicking outside the datepicker in range mode', () => {
    const handleChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <DatePicker
        onChange={handleChange}
        dateFormat="m/d/Y"
        datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );
    const startDateInput = getByLabelText('Start date');
    const endDateInput = getByLabelText('End date');
    // Change the dates
    fireEvent.change(startDateInput, { target: { value: '01/01/2023' } });
    fireEvent.change(endDateInput, { target: { value: '01/07/2023' } });
    // Simulate a click event outside the datepicker
    fireEvent.click(document.body);
    fireEvent.focus(startDateInput);
    fireEvent.click(document.body);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should render the children as expected', () => {
    render(
      <DatePicker onChange={() => {}} dateFormat="m/d/Y" datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
  });

  it('should respect readOnly prop', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    render(
      <DatePicker
        dateFormat="m/d/Y"
        onClick={onClick}
        onChange={onChange}
        datePickerType="range"
        readOnly={true}>
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          labelText="End date"
        />
      </DatePicker>
    );

    // Click events should fire
    const theStart = screen.getByLabelText('Start date');
    await userEvent.click(theStart);
    expect(onClick).toHaveBeenCalledTimes(1);
    const theEnd = screen.getByLabelText('End date');
    await userEvent.click(theEnd);
    expect(onClick).toHaveBeenCalledTimes(2);

    await userEvent.type(theStart, '01/01/2018{tab}'); // should not be possible to type
    await userEvent.type(theEnd, '02/02/2018{enter}'); // should not be possible to type

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('should work with ISO 8601 format or others', async () => {
    const onChange = jest.fn();

    render(
      <DatePicker dateFormat="Y-m-d" onChange={onChange} datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          labelText="End date"
        />
      </DatePicker>
    );
    const theStart = screen.getByLabelText('Start date');
    const theEnd = screen.getByLabelText('End date');

    await userEvent.type(theStart, '2023-01-05{enter}');
    await userEvent.type(theEnd, '2023-01-19{enter}');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('application')).toHaveClass('open');
    await userEvent.keyboard('{escape}');
    expect(screen.getByRole('application')).not.toHaveClass('open');
  });

  it('clearing end date should not cause console warnings', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <DatePicker onChange={() => {}} datePickerType="range" dateFormat="m/d/Y">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start Date"
          data-testid="input-value-start"
        />
        <DatePickerInput
          id="date-picker-input-id-end"
          placeholder="mm/dd/yyyy"
          labelText="End Date"
          data-testid="input-value-end"
        />
      </DatePicker>
    );
    await userEvent.type(
      screen.getByLabelText('Start Date'),
      '01/01/2024{enter}'
    );
    await userEvent.type(
      screen.getByLabelText('End Date'),
      '01/15/2024{enter}'
    );

    // Ensure the dates are correctly populated
    expect(screen.getByLabelText('Start Date')).toHaveValue('01/01/2024');
    expect(screen.getByLabelText('End Date')).toHaveValue('01/15/2024');

    // Clear the end date
    await userEvent.clear(screen.getByLabelText('End Date'));
    expect(screen.getByLabelText('End Date')).toHaveValue('');

    // Click on the start date input after clearing the end date
    await userEvent.click(screen.getByLabelText('Start Date'));
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('should add the calendar if changed from simple type to range', () => {
    const { rerender } = render(
      <DatePicker datePickerType="simple">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
      </DatePicker>
    );
    expect(screen.queryByRole('application')).not.toBeInTheDocument();
    rerender(
      <DatePicker datePickerType="range">
        <DatePickerInput
          id="date-picker-input-id-start"
          labelText="Start date"
        />
        <DatePickerInput id="date-picker-input-id-end" labelText="End date" />
      </DatePicker>
    );
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('end date in range mode should not retain old value after setting to null', async () => {
    const DatePickerExample = () => {
      const resetValues = { fromDate: null, toDate: null };
      const [dateRange, setDateRange] = useState(resetValues);
      const onChange = ({ fromDate, toDate }) => {
        setDateRange({ fromDate, toDate });
      };
      return (
        <>
          <DatePicker
            datePickerType="range"
            onChange={(dates) => {
              const [start, end] = dates;
              onChange({ fromDate: start, toDate: end });
            }}
            value={
              dateRange ? [dateRange.fromDate, dateRange.toDate] : [null, null]
            }>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange(resetValues)}>
            reset
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    // populate fromDate and toDate values
    await userEvent.type(
      screen.getByLabelText('FromDate'),
      '01/14/2025{enter}'
    );
    await userEvent.type(screen.getByLabelText('ToDate'), '02/10/2025{enter}');

    // reset both values
    await userEvent.click(screen.getByText('reset'));

    // assert that toDate is empty
    expect(screen.getByLabelText('ToDate')).toHaveValue('');

    // populate fromDate
    await userEvent.type(
      screen.getByLabelText('FromDate'),
      '01/14/2025{enter}'
    );

    // assert that toDate is still empty
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to empty array', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange([])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to array of empty strings', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button type="button" onClick={() => setDateRange(['', ''])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should clear calendar when value is set to array of undefined', async () => {
    const DatePickerExample = () => {
      const [dateRange, setDateRange] = useState(['01/14/2025', '02/10/2025']);
      return (
        <>
          <DatePicker
            datePickerType="range"
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
            }}>
            <DatePickerInput
              id="fromDate"
              placeholder="mm/dd/yyyy"
              labelText="FromDate"
            />
            <DatePickerInput
              id="toDate"
              placeholder="mm/dd/yyyy"
              labelText="ToDate"
            />
          </DatePicker>
          <button
            type="button"
            onClick={() => setDateRange([undefined, undefined])}>
            clear
          </button>
        </>
      );
    };
    render(<DatePickerExample />);

    expect(screen.getByLabelText('FromDate')).toHaveValue('01/14/2025');
    expect(screen.getByLabelText('ToDate')).toHaveValue('02/10/2025');

    await userEvent.click(screen.getByText('clear'));

    expect(screen.getByLabelText('FromDate')).toHaveValue('');
    expect(screen.getByLabelText('ToDate')).toHaveValue('');
  });

  it('should close calendar with range type on focus loss', async () => {
    const onClose = jest.fn();
    render(
      <DatePicker datePickerType="range" onClose={onClose}>
        <DatePickerInput id="start-input-id" labelText="Start input" />
        <DatePickerInput id="end-input-id" labelText="End input" />
      </DatePicker>
    );

    const startInput = screen.getByLabelText('Start input');
    const endInput = screen.getByLabelText('End input');

    // close on pressing TAB from calendar after navigating past end date input
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(startInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(endInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(1);

    // close on pressing SHIFT+TAB from start date input
    await userEvent.tab();
    expect(startInput).toHaveFocus();
    await userEvent.tab();
    expect(document.activeElement).toHaveClass(`flatpickr-day`);
    await userEvent.tab({ shift: true });
    expect(startInput).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(document.body).toHaveFocus();
    expect(onClose).toHaveBeenCalledTimes(2);
  });
  it('should log a one-time warning when `value` prop is passed directly to DatePickerInput', () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(
      <DatePickerInput
        id="test-input-1"
        labelText="Test Label 1"
        placeholder="mm/dd/yyyy"
        value="2023-01-01"
      />
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    consoleWarnSpy.mockRestore();
  });

  describe('rangePlugin', () => {
    it('should set start and end input values correctly when calling setDate with triggerChange=false', async () => {
      const ref = React.createRef();

      render(
        <DatePicker ref={ref} datePickerType="range" value={undefined}>
          <DatePickerInput
            id="start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            data-testid="start-input"
          />
          <DatePickerInput
            id="end"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            data-testid="end-input"
          />
        </DatePicker>
      );

      const fp = ref.current.calendar;
      const start = await screen.findByTestId('start-input');
      const end = await screen.findByTestId('end-input');

      // Call `setDate` with two dates and `triggerChange` equal to `false`,
      // which is where the `rangePlugin` logic should be triggered to set
      // values on both inputs.
      fp.setDate(['01/05/2025', '01/10/2025'], false, 'm/d/Y');

      expect(start.value).toBe('01/05/2025');
      expect(end.value).toBe('01/10/2025');

      // Verify clearing the end date keeps the start date while clearing the
      // end date.
      fp.setDate(['01/15/2025', null], false, 'm/d/Y');

      expect(start.value).toBe('01/15/2025');
      expect(end.value).toBe('');

      // Verify that calling `setDate` again with both dates updates both
      // fields.
      fp.setDate(['02/01/2025', '02/14/2025'], false, 'm/d/Y');

      expect(start.value).toBe('02/01/2025');
      expect(end.value).toBe('02/14/2025');
    });

    it('should not write both dates into the first input', async () => {
      const ref = React.createRef();

      render(
        <DatePicker ref={ref} datePickerType="range" value={undefined}>
          <DatePickerInput
            id="start-2"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            data-testid="start-input-2"
          />
          <DatePickerInput
            id="end-2"
            placeholder="mm/dd/yyyy"
            labelText="End date"
            data-testid="end-input-2"
          />
        </DatePicker>
      );

      const fp = ref.current.calendar;
      const start = await screen.findByTestId('start-input-2');
      const end = await screen.findByTestId('end-input-2');

      // When `triggerChange` is `false`, flatpickr's default behavior could
      // leave both dates reflected only in the first input. The plugin should
      // ensure each input is updated correctly.
      fp.setDate(['03/03/2025', '03/09/2025'], false, 'm/d/Y');

      expect(start.value).toBe('03/03/2025');
      expect(end.value).toBe('03/09/2025');
    });
  });
});

describe('Date picker with locale', () => {
  it('sets the locale when it is passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="es"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
        />
      </DatePicker>
    );
    expect(screen.getByText('Enero')).toBeInTheDocument();
  });

  it('should use default locale if one is not passed as a prop', () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
        />
      </DatePicker>
    );
    expect(screen.getByText('January')).toBeInTheDocument();
  });

  it('should render in month-year order per en locale rules', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="en"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
          data-testid="input"
        />
      </DatePicker>
    );

    await userEvent.click(screen.getByTestId('input'));
    const year = screen.getByDisplayValue('2022');
    const month = screen.getByText('January');
    expect(year).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(month.compareDocumentPosition(year)).toBe(4);
  });
  it('should render in year-month order per japanese locale rules', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        locale="ja"
        value="01/01/2022">
        <DatePickerInput
          id="date-picker-input-id"
          placeholder="mm/dd/yyyy"
          labelText="Date picker label"
          data-testid="input"
        />
      </DatePicker>
    );

    await userEvent.click(screen.getByTestId('input'));
    const year = screen.getByDisplayValue('2022');
    const month = screen.getByText('1月');
    expect(year).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(month.compareDocumentPosition(year)).toBe(2);
  });
});

describe('Date picker with minDate and maxDate', () => {
  it('should respect minDate', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        minDate="01/01/2018"
        maxDate="01/03/2018"
        value="01/01/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-min-max"
        />
      </DatePicker>
    );
    // eslint-disable-next-line testing-library/no-node-access
    const belowMinDate = document.querySelector(
      '[aria-label="December 31, 2017"]'
    );
    await userEvent.click(screen.getByTestId('input-min-max'));
    await userEvent.click(belowMinDate);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/2018'
    );
  });

  it('should respect maxDate', async () => {
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        minDate="01/01/2018"
        maxDate="01/03/2018"
        value="01/01/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          data-testid="input-min-max-2"
        />
      </DatePicker>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const aboveMaxDate = document.querySelector(
      '[aria-label="January 4, 2018"]'
    );

    await userEvent.click(screen.getByTestId('input-min-max-2'));
    await userEvent.click(aboveMaxDate);
    expect(screen.getByLabelText('Date Picker label')).toHaveValue(
      '01/01/2018'
    );
  });

  it('should not have "console.error" being created', () => {
    const mockConsoleError = jest.spyOn(console, 'error');
    render(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        minDate="01/01/2018"
        maxDate="01/30/2018">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Start date"
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
        />
      </DatePicker>
    );

    expect(mockConsoleError).not.toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it('should append the calendar to a custom container using the `appendTo` prop', async () => {
    const customContainer = document.createElement('div');

    document.body.appendChild(customContainer);

    render(
      <DatePicker
        datePickerType="single"
        appendTo={customContainer}
        value="01/01/2025">
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Label"
          data-testid="date-picker-1"
        />
      </DatePicker>
    );

    const input = screen.getByTestId('date-picker-1');

    expect(screen.getByRole('application').parentElement).toBe(customContainer);

    await userEvent.click(input);

    expect(screen.getByRole('application').parentElement).toBe(customContainer);

    document.body.removeChild(customContainer);
  });
});



File: DatePicker/plugins/appendToPlugin.ts


/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Plugin } from 'flatpickr/dist/types/options';
import type { Instance } from 'flatpickr/dist/types/instance';

interface AppendToPluginConfig {
  appendTo: HTMLElement;
}

export const appendToPlugin =
  (config: AppendToPluginConfig): Plugin =>
  (fp: Instance) => {
    /**
     * Adjusts the floating menu position after Flatpickr sets it.
     */
    const handlePreCalendarPosition = () => {
      Promise.resolve().then(() => {
        const {
          calendarContainer,
          config: fpConfig,
          _positionElement: positionElement,
        } = fp;

        const appendTo = fpConfig.appendTo;

        if (!appendTo) {
          throw new Error('[appendToPlugin] Missing `appendTo` element.');
        }

        const { left: containerLeft, top: containerTop } =
          appendTo.getBoundingClientRect();
        const { left: refLeft, bottom: refBottom } =
          positionElement.getBoundingClientRect();
        if (
          (appendTo !== appendTo.ownerDocument.body ||
            containerLeft !== 0 ||
            containerTop !== 0) &&
          appendTo.ownerDocument.defaultView
            ?.getComputedStyle(appendTo)
            .getPropertyValue('position') === 'static'
        ) {
          throw new Error(
            'Floating menu container must not have `position: static`.'
          );
        }
        // `2` for negative margin on calendar dropdown
        calendarContainer.style.top = `${refBottom - containerTop + 2}px`;
        calendarContainer.style.left = `${refLeft - containerLeft}px`;
      });
    };

    /**
     * Registers this Flatpickr plugin.
     */
    const register = () => {
      fp.loadedPlugins.push('carbonFlatpickrAppendToPlugin');
    };

    return {
      appendTo: config.appendTo,
      onReady: register,
      onPreCalendarPosition: handlePreCalendarPosition,
    };
  };



File: DatePicker/plugins/rangePlugin.ts


/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import baseRangePlugin, {
  type Config,
} from 'flatpickr/dist/plugins/rangePlugin';
import { Instance } from 'flatpickr/dist/types/instance';

/**
 * @param config Plugin configuration.
 * @returns An extension of Flatpickr `rangePlugin` that does the following:
 *   * Better ensures the calendar dropdown is always aligned to the `<input>` for the starting date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1944
 *   * A logic to ensure `fp.setDate()` call won't end up with "startDate to endDate" set to the first `<input>`
 */
export const rangePlugin = (config: Config = {}) => {
  const factory = baseRangePlugin(Object.assign({ position: 'left' }, config));
  return (fp: Instance) => {
    const { setDate: origSetDate } = fp;

    const init = () => {
      fp.setDate = (dates, triggerChange, format) => {
        origSetDate(dates, triggerChange, format);
        // If `triggerChange` is `true`, `onValueUpdate` Flatpickr event is fired
        // where Flatpickr's range plugin takes care of fixing the first `<input>`
        if (!triggerChange && Array.isArray(dates) && dates.length === 2) {
          const { formatDate, _input: inputFrom } = fp;
          const { input: inputTo } = config;
          const inputToElement =
            typeof inputTo === 'string'
              ? document.querySelector(inputTo)
              : inputTo;

          [inputFrom, inputToElement].forEach((input, i) => {
            if (input && input instanceof HTMLInputElement) {
              input.value = !dates[i]
                ? ''
                : formatDate(new Date(dates[i]), fp.config.dateFormat);
            }
          });
        }
      };
    };

    const origRangePlugin = factory(fp);
    const { onReady: origOnReady } = origRangePlugin;

    return Object.assign(origRangePlugin, {
      onReady: [init, origOnReady],
      onPreCalendarPosition: () => {},
    });
  };
};



File: DatePicker/plugins/fixEventsPlugin.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { match, keys } from '../../../internal/keyboard';

/**
 * @param {object} config Plugin configuration.
 * @returns {Plugin} A Flatpickr plugin to fix Flatpickr's behavior of certain events.
 */
export default (config) => (fp) => {
  const { inputFrom, inputTo, lastStartValue } = config;
  /**
   * Handles `click` outside to close calendar
   */
  const handleClickOutside = (event) => {
    if (
      !fp.isOpen ||
      fp.calendarContainer.contains(event.target) ||
      event.target === inputFrom ||
      event.target === inputTo
    ) {
      return;
    }
    fp.close();
  };
  /**
   * Handles `keydown` event.
   */
  const handleKeydown = (event) => {
    const { target } = event;
    if (inputFrom === target || inputTo === target) {
      if (match(event, keys.Enter)) {
        // Makes sure the hitting enter key picks up pending values of both `<input>`
        // Workaround for: https://github.com/flatpickr/flatpickr/issues/1942
        fp.setDate(
          [inputFrom.value, inputTo && inputTo.value],
          true,
          fp.config.dateFormat
        );
        event.stopPropagation();
      } else if (
        match(event, keys.ArrowLeft) ||
        match(event, keys.ArrowRight)
      ) {
        // Prevents Flatpickr code from canceling the event if left/right arrow keys are hit on `<input>`,
        // so user can move the keyboard cursor for editing dates
        // Workaround for: https://github.com/flatpickr/flatpickr/issues/1943
        event.stopPropagation();
      } else if (match(event, keys.ArrowDown)) {
        event.preventDefault();
        fp.open();
      } else if (!fp.config.allowInput) {
        // We override the default behaviour of Flatpickr, ideally when allowInput is set to false,
        // the Delete/Backspace button clears all of the date, which we don't want, hence
        // we stop event bubbling and the default Flatpickr's onChange behaviour here itself
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const parseDateWithFormat = (dateStr) =>
    fp.parseDate(dateStr, fp.config.dateFormat);

  /**
   * Handles `blur` event.
   *
   * For whatever reason, manual changes within the `to` input do not update the
   * calendar on blur. If a manual change is made within the input, this block will
   * set the date again, triggering the calendar to update.
   */
  const handleBlur = (event) => {
    const { target } = event;

    // Only fall into this logic if the event is on the `to` input and there is a
    // `to` date selected
    if (inputTo === target && fp.selectedDates[1]) {
      // Using getTime() enables the ability to more readily compare the date currently
      // selected in the calendar and the date currently in the value of the input
      const withoutTime = (date) => date?.setHours(0, 0, 0, 0);
      const selectedToDate = withoutTime(new Date(fp.selectedDates[1]));
      const currentValueToDate = withoutTime(
        parseDateWithFormat(inputTo.value)
      );

      // The date should only be set if both dates are valid dates, and they don't match.
      // When they don't match, this indicates that the date selected in the calendar is stale,
      // and the current value in the input should be set for the calendar to update.
      if (
        selectedToDate &&
        currentValueToDate &&
        selectedToDate !== currentValueToDate
      ) {
        // Update the calendar with the value of the `to` date input
        fp.setDate(
          [inputFrom.value, inputTo && inputTo.value],
          true,
          fp.config.dateFormat
        );
      }
    }

    const isValidDate = (date) => date?.toString() !== 'Invalid Date';
    // save end date in calendar immediately after it's been written down
    if (inputTo === target && fp.selectedDates.length === 1 && inputTo.value) {
      if (isValidDate(parseDateWithFormat(inputTo.value))) {
        fp.setDate(
          [inputFrom.value, inputTo.value],
          true,
          fp.config.dateFormat
        );
      }
    }

    // overriding the flatpickr bug where the startDate gets deleted on blur
    if (inputTo === target && !inputFrom.value && lastStartValue.current) {
      if (isValidDate(parseDateWithFormat(lastStartValue.current))) {
        inputFrom.value = lastStartValue.current;
        if (inputTo.value) {
          fp.setDate(
            [inputFrom.value, inputTo.value],
            true,
            fp.config.dateFormat
          );
        }
      }
    }
  };

  /**
   * Releases event listeners used in this Flatpickr plugin.
   */
  const release = () => {
    const { inputFrom, inputTo } = config;
    if (inputTo) {
      inputTo.removeEventListener('keydown', handleKeydown, true);
      inputTo.removeEventListener('blur', handleBlur, true);
    }
    inputFrom.removeEventListener('keydown', handleKeydown, true);
    document.removeEventListener('click', handleClickOutside, true);
  };

  /**
   * Sets up event listeners used for this Flatpickr plugin.
   */
  const init = () => {
    release();
    const { inputFrom, inputTo } = config;
    inputFrom.addEventListener('keydown', handleKeydown, true);
    if (inputTo) {
      inputTo.addEventListener('keydown', handleKeydown, true);
      inputTo.addEventListener('blur', handleBlur, true);
    }
    document.addEventListener('click', handleClickOutside, true);
  };

  /**
   * Registers this Flatpickr plugin.
   */
  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrFixEventsPlugin');
  };

  return {
    onReady: [register, init],
    onDestroy: [release],
  };
};



File: DatePicker/DatePicker.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface DatePickerSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  // Specify whether the skeleton should be of range date picker.
  range?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}

const DatePickerSkeleton = ({
  range,
  id,
  hideLabel,
  className,
  ...rest
}: DatePickerSkeletonProps) => {
  const prefix = usePrefix();
  const dateInput = (
    <div className={`${prefix}--date-picker-container`}>
      {!hideLabel && <span className={`${prefix}--label`} id={id} />}
      <div className={`${prefix}--date-picker__input ${prefix}--skeleton`} />
    </div>
  );

  if (range) {
    return (
      <div className={`${prefix}--form-item`}>
        <div
          className={cx(
            `${prefix}--date-picker`,
            `${prefix}--date-picker--range`,
            `${prefix}--skeleton`,
            className
          )}
          {...rest}>
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className={`${prefix}--form-item`}>
      <div
        className={cx(
          `${prefix}--date-picker`,
          `${prefix}--date-picker--short`,
          `${prefix}--date-picker--simple`,
          `${prefix}--skeleton`,
          className
        )}
        {...rest}>
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the id to add.
   */
  id: PropTypes.string,

  /**
   * Specify whether the skeleton should be of range date picker.
   */
  range: PropTypes.bool,
};

export default DatePickerSkeleton;
export { DatePickerSkeleton };



