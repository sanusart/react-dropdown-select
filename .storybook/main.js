/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['./stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
export default config;
