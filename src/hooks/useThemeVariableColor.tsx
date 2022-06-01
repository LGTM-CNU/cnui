import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import { getCSSVarValue } from '../lib/utils';

export function useThemeVariableColor(variable: string) {
  const [color, setColor] = useState(
    () => getCSSVarValue(variable) || variable
  );
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      const value = getCSSVarValue(variable);
      if (value !== '') {
        setColor(value);
      }
    }, 0);
  }, [color, theme, variable]);

  return color;
}
