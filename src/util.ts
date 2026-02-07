import { SelectProps } from 'react-dropdown-select';

export const valueExistInSelected = <T extends object>(
  value: string,
  values: T[],
  props: SelectProps<T>
): boolean =>
  !!values.find(
    (val) =>
      getByPath(val, props.valueField || 'value') === value ||
      getByPath(val, props.labelField || 'label') === value
  );

export const hexToRGBA = (hex: string, alpha?: number): string => {
  if (hex.length === 4) {
    hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  const RR = parseInt(hex.slice(1, 3), 16);
  const GG = parseInt(hex.slice(3, 5), 16);
  const BB = parseInt(hex.slice(5, 7), 16);

  return `rgba(${RR}, ${GG}, ${BB}${alpha ? `, ${alpha}` : ''})`;
};

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 0
): ((...args: Parameters<T>) => void) => {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export const isEqual = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b);

export const getByPath = (object: any, path?: string): any => {
  if (!path) {
    return;
  }

  return path.split('.').reduce((acc, value) => acc[value], object);
};

export const getProp = (object: any, path?: string | string[], defaultValue?: any): any => {
  if (!path) {
    return object;
  }

  const normalizedPath = Array.isArray(path) ? path : path.split('.').filter((item) => item.length);

  if (!normalizedPath.length) {
    return object === undefined ? defaultValue : object;
  }

  const nextKey = normalizedPath.shift();
  return nextKey !== undefined
    ? getProp(object[nextKey], normalizedPath, defaultValue)
    : defaultValue;
};

export const isomorphicWindow = (): Window => {
  if (typeof window === 'undefined') {
    (global as any).window = {};
  }

  return window;
};
