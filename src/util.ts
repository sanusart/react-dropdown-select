export const valueExistInSelected = (
  value: any,
  values: any[],
  props: any
): boolean =>
  !!values.find(
    (val) =>
      getByPath(val, props['valueField']) === value ||
      getByPath(val, props['labelField']) === value
  );

export const hexToRGBA = (hex: string, alpha?: number): string => {
  if (hex.length === 4) {
    hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}}`;
  }

  const RR = parseInt(hex.slice(1, 3), 16);
  const GG = parseInt(hex.slice(3, 5), 16);
  const BB = parseInt(hex.slice(5, 7), 16);

  return `rgba(${RR}, ${GG}, ${BB}${alpha !== undefined ? `, ${alpha}` : ''})`;
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 0
): ((...args: Parameters<T>) => void) => {
  let timerId: ReturnType<typeof setTimeout> | null;

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

export const isEqual = (a: any, b: any): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

export const getByPath = (object: any, path: string): any => {
  if (!path) {
    return;
  }

  return path.split('.').reduce((acc, value) => acc?.[value], object);
};

export const getProp = (
  object: any,
  path: string | string[],
  defaultValue: any
): any => {
  if (!path) {
    return object;
  }

  const normalizedPath = Array.isArray(path)
    ? path
    : path.split('.').filter((item) => item.length);

  if (!normalizedPath.length) {
    return object === undefined ? defaultValue : object;
  }

  return getProp(object?.[normalizedPath.shift()!], normalizedPath, defaultValue);
};

export const isomorphicWindow = (): Window | {} => {

  return globalThis.window;
};
