File: Icon/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './Icon.Skeleton';



File: Icon/Icon.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ComponentProps } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface IconSkeletonProps extends ComponentProps<'div'> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const IconSkeleton = ({ className, ...rest }: IconSkeletonProps) => {
  const prefix = usePrefix();

  return (
    <div className={cx(`${prefix}--icon--skeleton`, className)} {...rest} />
  );
};

IconSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default IconSkeleton;
export { IconSkeleton };



File: Icon/migrate-to-7.x.md


# Props

`<Icon>`

| Prop   | v9                      | v10                 |
| ------ | ----------------------- | ------------------- |
| `name` | Points to the icon name | Removed (See below) |

## Notes for `v10`

The `<Icon>` component uses the `carbon-icons` library, which hosts a set of
icons built for v9 of the Carbon Design System. In v10, we introduced
`@carbon/icons-react` which offers an updated set of icons built for consumption
as React components. However, we will still support both `carbon-icons` and
`@carbon/icons-react` through v11.

While you can still use the `<Icon>` component, the `name` prop has been removed
in `v10`. We removed the `name` prop in preference of the `icon` prop which will
allow you to tree-shake icons in your build. You can use the `icon` prop by
directly importing icons from `carbon-icons` and supplying them as the `icon`
prop. For example:

```js
import { Icon } from 'carbon-components-react';
import { iconAdd } from 'carbon-icons';

<Icon icon={iconAdd} />;
```

This `icon` prop is a data structure that we use to represent an icon in code.
You can pass in your own icons if they follow this data structure. For more
information, you can view the
[`icon` prop type](https://github.com/carbon-design-system/carbon/blob/v10.3.0/packages/react/src/components/Icon/Icon.js#L189-L194)
in addition to the exports from
[`carbon-icons`](https://unpkg.com/browse/carbon-icons@7.0.7/dist/carbon-icons-list.js).



File: Icon/Icon.Skeleton-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import IconSkeleton from './Icon.Skeleton';

describe('IconSkeleton', () => {
  it('should pass in an extra className when one is given', () => {
    render(<IconSkeleton className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});



