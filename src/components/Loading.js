import React from 'react';
import styled from '@emotion/styled';

const Loading = ({ parentProps }) =>
  parentProps.loadingRenderer ? (
    parentProps.loadingRenderer()
  ) : (
    <LoadingComponent className="react-dropdown-select-loading" />
  );

Loading.propTypes = {};

const LoadingComponent = styled.div`
  @keyframes dual-ring-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  padding: 0 5px;
  display: block;
  width: auto;
  height: auto;

  :after {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: deepskyblue transparent;
    animation: dual-ring-spin 0.7s ease-in-out infinite;
    margin: 0 0 0 -10px;
  }
`;

export default Loading;
