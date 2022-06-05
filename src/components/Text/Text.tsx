import { jsx, css } from '@emotion/react';
import { useMemo } from 'react';
import { ColorKey, cssVar } from '../../contexts';

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
  whiteSpace?: 'pre' | 'nowrap' | 'pre-wrap' | 'pre-line' | 'normal';
  align?: 'left' | 'center' | 'right';
  size?: 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 72;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  children: React.ReactNode;
  className?: string;
  color?: ColorKey;
  clamp?: number;
  truncate?: boolean;
}

export function Text({
  as = 'div',
  whiteSpace,
  children,
  size = 16,
  weight = 400,
  align,
  className,
  truncate,
  clamp,
  color,
}: TextProps) {
  const fontSize = useMemo(() => `${size / 16}rem`, [size]);

  return jsx(
    as,
    {
      css: [
        css({
          whiteSpace,
          fontSize,
          fontWeight: weight,
          textAlign: align,
          color: color ? cssVar(color) : undefined,
        }),
        textStyle,
        truncate && truncateStyle,
        clamp && clampStyle(clamp),
      ],
      className,
    },
    children
  );
}

const textStyle = css`
  margin: 0;
  line-height: 1.5;
`;

const truncateStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const clampStyle = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
