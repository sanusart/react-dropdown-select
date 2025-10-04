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
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        // Exclude props that are not relevant for the storybook
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      }
    }
  }
};
export default config;
