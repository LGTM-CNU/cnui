import { InputHTMLAttributes, useState } from 'react';
import { css } from '@emotion/react';
import { rgba } from 'polished';
import { cssVar } from '../../contexts';

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
  // const {value, onChangeValue}

  // const isChecked = checked || value === rest.value;
}
