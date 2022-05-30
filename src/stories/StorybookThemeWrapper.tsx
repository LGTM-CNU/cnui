import React, { useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { useTheme } from '../contexts';

interface Props {
  children: React.ReactNode;
}

function StorybookThemeWrapper({ children }: Props) {
  const darkTheme = useDarkMode();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light');
  }, [darkTheme, setTheme]);

  return <>{children}</>;
}

export default StorybookThemeWrapper;
