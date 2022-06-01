import React, { SVGProps } from 'react';
import * as vectors from './vectors';

type IconName = keyof typeof vectors;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'css'> {
  name: IconName;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...rest }, ref) => {
    return React.createElement(vectors[name], {
      ...rest,
      ref,
    });
  }
);

Icon.displayName = 'Icon';
