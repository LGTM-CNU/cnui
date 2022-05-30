import { jsx, css } from '@emotion/react';

export interface TextProps {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'strong';
  children: React.ReactNode;
}

export function Text({ as = 'div', children }: TextProps) {
  return jsx(
    as,
    {
      css: [css({})],
    },
    children
  );
}
