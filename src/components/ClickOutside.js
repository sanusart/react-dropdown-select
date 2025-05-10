import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const ClickOutside = ({ onClickOutside, className, children }) => {
  const container = useRef(null);

  const handleClick = useCallback(
    (event) => {
      if (!container.current) return;

      try {
        if (!container.current.contains(event.target)) {
          onClickOutside(event);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // If there's an error with contains (e.g. in test environment),
        // we'll assume it's a click outside
        onClickOutside(event);
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, true);

    return () => {
      document.removeEventListener('mousedown', handleClick, true);
    };
  }, [handleClick]);

  return (
    <div className={className} ref={container}>
      {children}
    </div>
  );
};

ClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ClickOutside;
