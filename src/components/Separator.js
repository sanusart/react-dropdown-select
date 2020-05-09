import React from 'react';
import { styled, setup } from 'goober';
import { LIB_NAME } from '../constants';

setup(React.createElement, null, React.forwardRef);

const Separator = ({ props, state, methods }) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods })
  ) : (
    <SeparatorComponent className={`${LIB_NAME}-separator`} />
  );

const SeparatorComponent = styled('div')`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
