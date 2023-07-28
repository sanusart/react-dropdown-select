/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['./stories/*.mdx', './stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    toc: true,
    autodocs: true,
    defaultName: 'Documentation',
    story: { inline: true } // render the story in an iframe
    // source: { type: 'code' } // forces the raw source code (rather than the rendered JSX).
  }
};
export default config;
