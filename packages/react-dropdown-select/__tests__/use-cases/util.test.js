/** @jest-environment jsdom */
import {
  debounce,
  getProp,
  isEqual,
  getByPath,
  hexToRGBA,
  valueExistInSelected,
} from '../../src/util';

describe('debounce', () => {
  it('calls the function after delay', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('clears previous timer on subsequent calls', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('getByPath', () => {
  it('returns undefined when no path is given', () => {
    expect(getByPath({ a: 1 })).toBeUndefined();
  });

  it('gets nested value by dot-separated path', () => {
    expect(getByPath({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42);
  });
});

describe('getProp', () => {
  it('returns the object when no path is given', () => {
    const obj = { a: 1 };
    expect(getProp(obj)).toBe(obj);
  });
});

describe('isEqual', () => {
  it('returns true for equal objects', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('returns false for different objects', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
});

describe('hexToRGBA', () => {
  it('converts hex to rgba', () => {
    expect(hexToRGBA('#ff0000')).toBe('rgba(255, 0, 0undefined)');
  });

  it('converts hex to rgba with alpha', () => {
    expect(hexToRGBA('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });
});

describe('valueExistInSelected', () => {
  const options = [
    { name: 'Alice', id: 1 },
    { name: 'Bob', id: 2 },
  ];

  it('returns true when value exists in selected by valueField', () => {
    expect(valueExistInSelected(1, options, { valueField: 'id', labelField: 'name' })).toBe(true);
  });

  it('returns true when value exists in selected by labelField', () => {
    expect(valueExistInSelected('Alice', options, { valueField: 'id', labelField: 'name' })).toBe(
      true,
    );
  });

  it('returns false when value does not exist', () => {
    expect(valueExistInSelected(3, options, { valueField: 'id', labelField: 'name' })).toBe(false);
  });
});
