import { DocsPage, Canvas } from '@storybook/addon-docs';
import React from 'react';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      controls: { expanded: true },
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (storyFn) => (
      <div
        style={{
          height: 200,
          width: 400,
          margin: '0 auto'
        }}>
        {storyFn()}
      </div>
    )
  ]
};

export default preview;
