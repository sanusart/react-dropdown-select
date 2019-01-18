export const valueExistInSelected = (value, values) => !!values.find((val) => val.value === value);

export const hexToRGBA = (hex, alpha) => {
  const RR = parseInt(hex.slice(1, 3), 16);
  const GG = parseInt(hex.slice(3, 5), 16);
  const BB = parseInt(hex.slice(5, 7), 16);

  return `rgba(${RR}, ${GG}, ${BB}${alpha && `, ${alpha}`})`;
};

export const debounce = (fn, delay = 0) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};
