/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClickOutside from '../../src/components/ClickOutside';

describe('ClickOutside Component', () => {
  it('renders correctly', () => {
    const onClickOutside = jest.fn();
    const { container } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Content</div>
      </ClickOutside>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Test Content</div>
      </ClickOutside>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClickOutside when clicking outside', () => {
    const onClickOutside = jest.fn();
    const { container } = render(
      <div>
        <div data-testid="outside">Outside</div>
        <ClickOutside onClickOutside={onClickOutside}>
          <div>Inside</div>
        </ClickOutside>
      </div>
    );

    fireEvent.mouseDown(container.querySelector('[data-testid="outside"]'));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it('does not call onClickOutside when clicking inside', () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Inside Content</div>
      </ClickOutside>
    );

    fireEvent.mouseDown(getByText('Inside Content'));
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const onClickOutside = jest.fn();
    const { container } = render(
      <ClickOutside onClickOutside={onClickOutside} className="custom-class">
        <div>Content</div>
      </ClickOutside>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles multiple children', () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>First Child</div>
        <div>Second Child</div>
      </ClickOutside>
    );
    expect(getByText('First Child')).toBeInTheDocument();
    expect(getByText('Second Child')).toBeInTheDocument();
  });

  it('handles click on component itself', () => {
    const onClickOutside = jest.fn();
    const { container } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Content</div>
      </ClickOutside>
    );

    fireEvent.mouseDown(container.firstChild);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const onClickOutside = jest.fn();
    const { unmount, container } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Content</div>
      </ClickOutside>
    );

    unmount();
    fireEvent.mouseDown(document.body);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('handles nested components', () => {
    const onClickOutside = jest.fn();
    const { getByTestId } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div data-testid="parent">
          <div data-testid="child">Nested Content</div>
        </div>
      </ClickOutside>
    );

    fireEvent.click(getByTestId('child'));
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('handles dynamic content updates', () => {
    const onClickOutside = jest.fn();
    const { rerender, getByText } = render(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Initial Content</div>
      </ClickOutside>
    );

    rerender(
      <ClickOutside onClickOutside={onClickOutside}>
        <div>Updated Content</div>
      </ClickOutside>
    );

    expect(getByText('Updated Content')).toBeInTheDocument();
  });
});
