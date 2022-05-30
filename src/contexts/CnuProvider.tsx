import ThemeProvider, { Theme } from './ThemeProvider';

interface Props {
  initialTheme?: Theme;
  children: React.ReactNode;
}

export function CnuProvider({ children, initialTheme }: Props) {
  return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>;
}
