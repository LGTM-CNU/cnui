import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'polished';

import { useTheme } from '../../contexts';
import { cssVar } from '../../contexts';
import { useThemeVariableColor } from '../../hooks/useThemeVariableColor';
import { Size, sizeSets } from '../../lib/sizes';
import { safelyAlterColor } from '../../lib/utils';

type ButtonType = 'primary' | 'secondary' | 'destructive';
type ButtonVariant = 'default' | 'outline' | 'ghost';

export interface ButtonColorScheme {
  background: string;
  hover: string;
  active: string;
  text: string;
}

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  > {
  children: React.ReactNode;
  type?: ButtonType;
  htmlType?: 'button' | 'reset' | 'submit';
  variant?: ButtonVariant;
  size?: Size;
  isFullWidth?: boolean;
  isStickIconToEnd?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  asLink?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  isSquare?: boolean;
  marginTop?: string | number;
}

export function Button({
  children,
  type = 'primary',
  variant = 'default',
  size = 'md',
  isFullWidth,
  isStickIconToEnd,
  iconPosition = 'left',
  icon,
  asLink,
  href,
  isSquare,
  marginTop,
  ...rest
}: ButtonProps) {
  const { isDarkTheme } = useTheme();
  const scheme =
    variant !== 'default' && type === 'secondary'
      ? secondaryVariantScheme(isDarkTheme)
      : schemes[type];

  const themeColor = useThemeVariableColor(scheme.background);

  const styles = [
    buttonStyle(size, isSquare),
    variant === 'default' && defaultStyle(scheme),
    variant === 'outline' && outlineStyle(scheme),
    variant === 'ghost' && ghostStyle(themeColor, isDarkTheme),
    isFullWidth && fullWidthStyle,
    marginTop &&
      css`
        margin-top: ${marginTop};
      `,
  ];

  const contents = (
    <>
      {icon && iconPosition === 'left' && (
        <div css={iconWrapperStyle('left', isStickIconToEnd)}>{icon}</div>
      )}
      {isStickIconToEnd ? <div css={takeFullWidth}>{children}</div> : children}
      {icon && iconPosition === 'right' && (
        <div css={iconWrapperStyle('right', isStickIconToEnd)}>{icon}</div>
      )}
    </>
  );

  console.log(
    safelyAlterColor('#3285f7', (color) => rgba(color, isDarkTheme ? 0.3 : 0.1))
  );

  if (asLink) {
    return (
      <a href={href} css={styles.concat(resetLinkStyle)} {...(rest as any)}>
        {contents}
      </a>
    );
  }

  return (
    <button css={styles} {...rest}>
      {contents}
    </button>
  );
}

export const schemes: Record<ButtonType, ButtonColorScheme> = {
  primary: {
    background: cssVar('primary'),
    hover: cssVar('primary-hover'),
    active: cssVar('primary-active'),
    text: cssVar('element-text'),
  },
  secondary: {
    background: cssVar('secondary'),
    hover: cssVar('secondary-hover'),
    active: cssVar('secondary-active'),
    text: cssVar('secondary-element-text'),
  },
  destructive: {
    background: cssVar('destructive'),
    hover: cssVar('destructive-hover'),
    active: cssVar('destructive-active'),
    text: cssVar('element-text'),
  },
};

const secondaryVariantScheme: (isDarkTheme: boolean) => ButtonColorScheme = (
  isDarkTheme
) =>
  isDarkTheme
    ? {
        background: cssVar('accent-9'),
        hover: cssVar('accent-8'),
        active: cssVar('accent-7'),
        text: cssVar('element-text'),
      }
    : {
        background: cssVar('accent-8'),
        hover: cssVar('accent-7'),
        active: cssVar('accent-6'),
        text: cssVar('element-text'),
      };

const defaultStyle = (scheme: ButtonColorScheme) => css`
  background: ${scheme.background};
  color: ${scheme.text};
  &:hover:enabled {
    background: ${scheme.hover};
  }
  &:active:enabled {
    background: ${scheme.active};
  }
`;

const outlineStyle = (scheme: ButtonColorScheme) => css`
  background: transparent;
  border: 1px solid ${scheme.background};
  color: ${scheme.background};
  &:hover:enabled {
    background: ${scheme.background};
    color: ${scheme.text};
    border-color: ${scheme.background};
  }
  &:active:enabled {
    background: ${scheme.hover};
    border-color: ${scheme.hover};
  }
`;

const ghostStyle = (color: string, isDarkTheme: boolean) => css`
  background: transparent;
  color: ${color};
  &:hover:enabled {
    background: ${safelyAlterColor(color, (color) =>
      rgba(color, isDarkTheme ? 0.3 : 0.1)
    )};
  }
  &:active:enabled {
    background: ${safelyAlterColor(color, (color) =>
      rgba(color, isDarkTheme ? 0.4 : 0.2)
    )};
  }
`;

const buttonStyle = (size: Size, isSquare?: boolean) => css`
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  font-size: ${sizeSets[size].fontSize};
  height: ${sizeSets[size].height};
  padding-left: 1em;
  padding-right: 1em;

  &:disabled {
    filter: grayScale(15%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  transition: 0.1s background ease-in, 0.1s color ease-in;

  ${isSquare &&
  css`
    padding: 0;
    width: 2.5em;
  `}
`;

const fullWidthStyle = css`
  width: 100%;
`;

const iconWrapperStyle = (position: 'left' | 'right', noMargin?: boolean) =>
  css``;

const takeFullWidth = css`
  flex: 1;
`;

const resetLinkStyle = css`
  text-decoration: none;
`;
