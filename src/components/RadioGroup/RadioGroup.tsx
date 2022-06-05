import React, { createContext, useContext } from 'react';
import { css } from '@emotion/react';
import { safePx } from '../../lib/utils';

interface RadioGroupContextValue {
  value: string | number | null;
  onChangeValue?(value: string | number): void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: null,
  onChangeValue: undefined,
});

interface Props extends RadioGroupContextValue {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: string | number;
}

export function RadioGroup({
  children,
  onChangeValue,
  value,
  direction = 'column',
  gap = '1rem',
}: Props) {
  return (
    <RadioGroupContext.Provider value={{ onChangeValue, value }}>
      <div css={wrapper(direction, gap)}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

export function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  return context;
}

const wrapper = (direction: 'row' | 'column', gap: string | number) => css`
  display: flex;
  flex-direction: ${direction};
  gap: ${safePx(gap)};
`;
