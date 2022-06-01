import { ReactNode } from 'react';

import ThemeProvider from '../contexts/ThemeProvider';
import StorybookThemeWrapper from './StorybookThemeWrapper';

interface Props {
  children: ReactNode;
}

function DocsThemeWrapper(props: Props) {
  return (
    <ThemeProvider>
      <StorybookThemeWrapper {...props} />
    </ThemeProvider>
  );
}

export default DocsThemeWrapper;
