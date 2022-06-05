import React, { createContext, useContext } from 'react';
import { css } from '@emotion/react';

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
  onChangeValue,
  value,
  direction = 'column',
  gap = '1rem',
}: Props) {
  return (
    <RadioGroupContext.Provider>
      <div css={}></div>
    </RadioGroupContext.Provider>
  );
}

const wrapper = (direction: 'row' | 'column', gap: string | number) => css`
  display: flex;
  flex-direction: ${direction};
`;
