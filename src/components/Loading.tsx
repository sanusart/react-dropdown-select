import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

interface Props {
  props: {
    loadingRenderer?: (args: { props: Props['props'] }) => React.ReactNode;
    color?: string;
  };
  color?: string | undefined;
}

const Loading: React.FC<Props> = ({ props, color }) =>
  props.loadingRenderer ? (
    props.loadingRenderer({ props })
  ) : (
    <LoadingComponent className={`${LIB_NAME}-loading`} color={color} />
  );

const LoadingComponent = styled.div<{ color?: string }>`
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
    border-color: ${({ color }) => color} transparent;
    animation: dual-ring-spin 0.7s ease-in-out infinite;
    margin: 0 0 0 -10px;
  }
`;

export default Loading;
