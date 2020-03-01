import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
import { Heading } from './components/Heading';
import Select from '../../../src';

const WithAnimation = ({ options, title }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [open, setOpen] = useState(null);

  return (
    <React.Fragment>
      <Heading
        title={title}
        source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/WithAnimation.js"
      />

      <StyledSelect
        multi
        options={options}
        values={[]}
        isOpen={open}
        onDropdownCloseRequest={({ close }) => {
          setOpen(true);
          sleep(298).then(() => {
            close();
            setOpen(false);
          });
        }}
        onChange={(value) =>
          console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
        }
      />
    </React.Fragment>
  );
};

const hide = keyframes`
  from {
    transition: height 298ms ease;
    overflow: hidden;
  }

  to {
    transition: height 298ms ease;
    height: 0;
    overflow: hidden;
  }
`;

const show = keyframes`
  from {
    transition: height 298ms ease;
    height: 0;
    overflow: hidden;
  }

  to {
    transition: height 298ms ease;
    overflow: hidden;
  }
`;

const StyledSelect = styled(Select)`
  .react-dropdown-select-dropdown {
    height: 300px;
    ${({ isOpen }) =>
      isOpen
        ? css`
            animation: ${hide} 298ms ease-in-out;
          `
        : css`
            animation: ${show} 298ms ease-in-out;
          `};
  }
`;

WithAnimation.propTypes = {};

export default WithAnimation;
