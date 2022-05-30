import StorybookThemeWrapper from '../src/stories/StorybookThemeWrapper';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    let theme: 'default' | 'dark' | 'light' = 'default';
    try {
      const data = JSON.parse(localStorage.getItem('sb-addon-themes-3'));
      document.body.dataset.theme = data.current;
    } catch (error) {}

    return (
      <StorybookThemeWrapper>
        <Story />
      </StorybookThemeWrapper>
    );
  },
];
