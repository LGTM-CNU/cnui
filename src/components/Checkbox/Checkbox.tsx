import { css } from '@emotion/react';
import { InputHTMLAttributes } from 'react';
import { cssVar } from '../../contexts/ThemeProvider';
import { Icon } from '../Icon';

type CheckboxSize = 'sm' | 'md' | 'lg';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked: boolean;
  onToggle(): void;
  color?: string;
  size?: CheckboxSize;
  className?: string;
  disabled?: boolean;
}

export function Checkbox({
  className,
  checked,
  onToggle,
  size = 'sm',
  color = cssVar('primary'),
  disabled,
}: CheckboxProps) {
  return (
    <label className={className} css={wrapper(color, size, disabled)}>
      <input
        type="checkbox"
        css={invisibleCheckbox}
        checked={checked}
        onChange={onToggle}
        disabled={disabled}
      />
      <span className="box" css={box(checked, color)}>
        {checked && <Icon name="check" />}
      </span>
      <span css={textStyle}>Check me</span>
    </label>
  );
}

const sizes = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
};

const wrapper = (color: string, size: CheckboxSize, disabled?: boolean) =>
  css`
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: ${sizes[size]};
  `;

const invisibleCheckbox = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  left: 0;
  top: 0;
`;

const box = (checked: boolean, color: string) => css`
  position: relative;
  display: block;
  align-items: center;
  justify-content: center;
  width: 1.125em;
  height: 1.125em;
  border-radius: 0.25rem;
  border: 1px solid ${cssVar('accent-6')};
  margin-right: 0.5em;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 0.625em;
    height: 0.625em;
  }

  ${checked &&
  css`
    border-color: ${color};
    background: ${color};
    color: ${cssVar('element-text')};
  `}
`;

const textStyle = () => css`
  font-size: 1em;
  line-height: 1;
  color: ${cssVar('accent-9')};
`;
