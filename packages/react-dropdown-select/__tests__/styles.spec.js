/**
 * @jest-environment jsdom
 */
import React from 'react';
import { TestRenderer, selectWithProps, Select } from './use-cases/helpers';

const props = (props = {}) => ({ onChange: () => undefined, ...props });

const getStyleTag = () => document.head.querySelector('style[data-react-dropdown-select]');

describe('style injection', () => {
  it('injects a style tag without nonce by default', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = selectWithProps(<Select {...props()} />);
    });

    const style = getStyleTag();
    expect(style).not.toBeNull();
    expect(style.getAttribute('nonce')).toBeNull();

    TestRenderer.act(() => renderer.unmount());
  });

  it('sets the nonce attribute when styleNonce prop is provided', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = selectWithProps(<Select {...props({ styleNonce: 'testNonce' })} />);
    });

    const style = getStyleTag();
    expect(style).not.toBeNull();
    expect(style.getAttribute('nonce')).toBe('testNonce');

    TestRenderer.act(() => renderer.unmount());
  });

  it('re-injects with a new nonce when styleNonce changes', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = selectWithProps(<Select {...props({ styleNonce: 'firstNonce' })} />);
    });

    const first = getStyleTag();
    expect(first.getAttribute('nonce')).toBe('firstNonce');

    TestRenderer.act(() => {
      renderer.update(<Select {...props({ styleNonce: 'secondNonce' })} />);
    });

    const second = getStyleTag();
    expect(second).not.toBeNull();
    expect(second).not.toBe(first);
    expect(second.getAttribute('nonce')).toBe('secondNonce');

    TestRenderer.act(() => renderer.unmount());
  });

  it('registers a per-instance rule in the style tag', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = selectWithProps(<Select {...props({ color: '#ff0000' })} />);
    });

    const styleTag = getStyleTag();
    expect(styleTag.textContent).toContain('[data-rdrs="');
    expect(styleTag.textContent).toContain('--select-color: #ff0000');

    TestRenderer.act(() => renderer.unmount());
  });

  it('removes the per-instance rule on unmount', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = selectWithProps(<Select {...props()} />);
    });

    expect(getStyleTag().textContent.match(/\[data-rdrs="/g)).toHaveLength(1);

    TestRenderer.act(() => renderer.unmount());
    expect(getStyleTag().textContent.match(/\[data-rdrs="/g)).toBeNull();
  });
});
