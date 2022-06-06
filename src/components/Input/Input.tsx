import {
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { Size, sizeSets } from '../../lib/sizes';
import { cssVar } from '../../contexts/ThemeProvider';
import { Label } from '../Label';
import { Icon } from '../Icon';
import { palette } from '../../lib/palette';
import { NONAME } from 'dns';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  focusedColor?: string;
  isFullWidth?: boolean;
  isError?: boolean;
  errorMessage?: string;
  fixedWidth?: string | number;
  label?: string;
  id?: string;
  icon?: React.ReactNode;
  disablePlainPassword?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const labelSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
} as const;

function Input({
  size = 'md',
  focusedColor = cssVar('primary'),
  isFullWidth,
  disabled,
  isError,
  errorMessage,
  fixedWidth,
  label,
  icon,
  iconPosition = 'left',
  type,
  disablePlainPassword,
  className,
  rightAddon,
  leftAddon,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [plainMode, setPlainMode] = useState(type !== 'password');
  const ref = useRef<HTMLInputElement>(null);
  const cursorPosRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorPosRef.current === 0) return;
    if (ref.current) {
      ref.current.focus();
      ref.current.selectionStart = cursorPosRef.current;
    }
  }, [plainMode]);

  const leftAddonEl = useMemo(() => {
    if (!leftAddon) return null;
    if (typeof leftAddon === 'string') {
      return <div css={textAddon('left')}>{leftAddon}</div>;
    }
    return null;
  }, [leftAddon]);

  const rightAddonEl = useMemo(() => {
    if (!rightAddon) return null;
    if (typeof rightAddon === 'string') {
      return <div css={textAddon('right')}>{rightAddon}</div>;
    }
    return (
      <div
        css={rightAddonStyle}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {rightAddon}
      </div>
    );
  }, [rightAddon]);

  return (
    <div
      css={[
        wrapper(size, isFullWidth),
        fixedWidth !== undefined && css({ width: fixedWidth }),
      ]}
      onClick={(e) => {
        const input = e.currentTarget.querySelector('input');
        if (!input) return;
        input.focus();
      }}
      className={className}
    >
      {label && (
        <Label
          focused={focused}
          focusedColor={focusedColor}
          isError={isError}
          size={labelSizeMap[size]}
        >
          {label}
        </Label>
      )}
      <div css={wrapperForAddons}>
        {leftAddonEl}
        <div
          css={[
            inputBox(size, disabled),
            focusedStyle(focusedColor),
            isError && errorStyle,
            rightAddon && noBorderRadius('right'),
            leftAddon && noBorderRadius('left'),
          ]}
          ref={wrapperRef}
        >
          {icon && iconPosition === 'left' && <div>{icon}</div>}
          <input
            css={inputStyle}
            onFocus={(e) => {
              onFocus?.(e);
              setFocused(true);
            }}
            onBlur={(e) => {
              onBlur?.(e);
              setFocused(false);
            }}
            onMouseUp={(e) => {
              cursorPosRef.current = e.currentTarget.selectionStart ?? 0;
              rest.onMouseUp?.(e);
            }}
            onChange={(e) => {
              cursorPosRef.current = e.target.selectionStart ?? 0;
              rest.onChange?.(e);
            }}
            disabled={disabled}
            type={plainMode ? 'text' : type}
            ref={ref}
            {...rest}
          />
          {icon && iconPosition === 'right' && (
            <div css={iconStyle('right')}>{icon}</div>
          )}
          {type === 'password' && !disablePlainPassword && (
            <div>
              <Icon name={plainMode ? 'eye_off' : 'eye'} />
            </div>
          )}
        </div>
        {rightAddonEl}
      </div>
      {errorMessage && <div css={errorMessageStyle}>{errorMessage}</div>}
    </div>
  );
}

const wrapper = (size: Size, isFullWidth?: boolean) => css`
  display: inline-flex;
  flex-direction: column;
  ${isFullWidth &&
  css`
    width: 100%;
  `}
  font-size: ${sizeSets[size].fontSize}
`;

const wrapperForAddons = css`
  width: 100%;
  display: flex;
`;

const textAddon = (position: 'left' | 'right') => css`
  padding-left: 0.75em;
  padding-right: 0.75em;
  display: flex;
  align-items: center;
  background: ${cssVar('accent-1')};
  border: 1px solid ${cssVar('accent-3')};
  border-${position === 'right' ? 'left' : 'right'}: none;
  font-size: 1em;
  border-top-${position}-radius: 0.25rem;
  border-bottom-${position}-radius: 0.25rem;
`;

const rightAddonStyle = css`
  & > * {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
  }
`;

const focusedStyle = (color: string) => css`
  &:focus-within {
    color: ${color};
    border-color: ${color};
  }
`;

const errorMessageStyle = css`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${cssVar('destructive')};
  display: flex;
  align-items: center;
`;

const errorStyle = css`
  border: 1px solid ${cssVar('destructive')};
  color: ${cssVar('destructive')};

  &:focus-within {
    border: 1px solid ${cssVar('destructive-active')};
    color: ${cssVar('destructive-active')};
  }
  input {
    &::placeholder {
      color: ${cssVar('destructive')};
      opacity: 0.5;
    }
  }
`;

const inputBox = (size: Size, disabled?: boolean) => css`
  width: 100%;
  border: 1px solid ${cssVar('accent-4')};

  transition: 0.125s all ease-in;
  ${palette.grey[800]}
  border-radius: 0.25rem;
  background: ${cssVar('accent-0')};
  display: inline-flex;
  padding-left: 0.75em;
  padding-right: 0.75em;
  align-items: center;
  height: ${sizeSets[size].height};
  cursor: text;

  ${disabled &&
  css`
    background: ${cssVar('accent-2')};
    color: ${cssVar('accent-5')};
    cursor: not-allowed;
    input {
      cursor: not-allowed;
      &::placeholder {
        color: ${cssVar('accent-5')};
      }
    }
  `}
`;

const iconStyle = (position: 'left' | 'right' = 'left') => css`
  svg {
    color: inherit;
    width: 1.25em;
    display: flex;
    ${position === 'left'
      ? css`
          margin-right: 0.5rem;
        `
      : css`
          margin-left: 0.5rem;
        `}
  }
`;

const noBorderRadius = (position: 'left' | 'right') => css``;

const inputStyle = css`
  flex: 1;
  font-size: 1em;
  padding: 0;
  outline: none;
  height: 100%;
  background: transparent;

  color: inherit;
  border: none;

  font-family: inherit;

  &::placeholder {
    color: ${cssVar('accent-4')};
  }
`;

export default Input;
