/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['./stories/*.mdx', './stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-webpack5-compiler-swc'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
};
export default config;
