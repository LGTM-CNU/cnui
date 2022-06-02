import { createContext, useContext } from 'react';
import { css } from '@emotion/react';
// import {safePx} from

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
}
