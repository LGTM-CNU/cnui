import { css } from '@emotion/react';
import React from 'react';
import { cssVar } from '../../contexts/ThemeProvider';
import { Text, TextProps } from '../Text/Text';

interface Props {
  focused?: boolean;
  focusedColor?: string;
  isError?: boolean;
  className?: string;
  size?: TextProps['size'];
  children: React.ReactNode;
}

export function Label({
  focused,
  focusedColor = cssVar('primary'),
  isError,
  className,
  size = 14,
  children,
}: Props) {
  return (
    <Text
      as="label"
      css={[
        labelStyle,
        focused && css({ color: focusedColor }),
        isError && errorStyle,
      ]}
      size={size}
      className={className}
      weight={500}
    >
      {children}
    </Text>
  );
}

const labelStyle = css`
  color: ${cssVar('accent-7')};
  transition: 0.125s all ease-in;
  margin-bottom: 0.5em !important;
`;

const errorStyle = css`
  color: ${cssVar('destructive')};
`;
