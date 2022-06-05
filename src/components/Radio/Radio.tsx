import { InputHTMLAttributes, useState } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'polished';

import { cssVar } from '../../contexts';
import { useRadioGroup } from '../RadioGroup/RadioGroup';
import { useThemeVariableColor } from '../../hooks/useThemeVariableColor';
import { safelyAlterColor } from '../../lib/utils';

type RadioSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  children: string;
  size?: RadioSize;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}

export function Radio({
  children,
  size = 'sm',
  checked,
  onChange,
  color = cssVar('primary'),
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const { value, onChangeValue } = useRadioGroup();
  const isChecked = checked || value === rest.value;
  const themeColor = useThemeVariableColor(color);
  // const {value, onChangeValue}

  // const isChecked = checked || value === rest.value;

  return (
    <label css={wrapper(size, color)}>
      <input
        type="radio"
        {...rest}
        onChange={(e) => {
          onChange?.(e);
          onChangeValue?.(e.target.value);
        }}
        checked={isChecked}
        onFocus={(e) => {
          setFocused(true);
        }}
        onBlur={(e) => {
          setFocused(false);
        }}
      />
      <span css={circle(!!isChecked, focused, themeColor)}>
        <span css={smallDot(isChecked)}></span>
      </span>
      <span>{children}</span>
    </label>
  );
}

const sizes = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
};

const wrapper = (size: RadioSize, color: string) => css`
  position: relative;
  font-size: ${sizes[size]};
  display: flex;
  align-items: center;
  color: ${cssVar('accent-9')};
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }

  &:hover {
    span:first-of-type {
      border-color: ${color};
    }
  }
  &:focus {
    opacity: 0.4;
  }
`;

const circle = (checked: boolean, focused: boolean, color: string) => css`
  width: 1.125em;
  height: 1.125em;
  border-radius: 50%;
  border: 1px solid {
    ${cssVar('accent-5')}
  }
  margin-right: 0.5em;
  transition: 0.125s all ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  ${checked &&
  css`
    border-color: ${color};
    background: ${color};
  `}

  ${focused &&
  css`
    box-shadow: 0 0 0 0.25em
      ${safelyAlterColor(color, (color) => rgba(color, 0.4))};
  `}
`;

const smallDot = (checked?: boolean) => css`
  background: ${cssVar('element-text')};
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  transform: scale(0);
  transition: 0.125s all ease-in;
  ${checked &&
  css`
    transform: scale(1);
  `}
`;
