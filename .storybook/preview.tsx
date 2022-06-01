import { themes } from '@storybook/theming';

import { CnuProvider } from '../src/contexts/CnuProvider';
import StorybookThemeWrapper from '../src/stories/StorybookThemeWrapper';
import { GlobalStyles } from '../src/components/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: { order: ['Introduction', 'Colors', 'Components'] },
  },
};

export const decorators = [
  (Story) => {
    let theme: 'default' | 'light' | 'dark' = 'default';
    try {
      const data = JSON.parse(localStorage.getItem('sb-addon-themes-3'));
      document.body.dataset.theme = data.current;
      theme = data.current;
    } catch (error) {}

    return (
      <CnuProvider initialTheme={theme}>
        <StorybookThemeWrapper>
          <GlobalStyles />
          <Story />
        </StorybookThemeWrapper>
      </CnuProvider>
    );
  },
];
