import React from 'react';
import { styled, setup } from 'goober';
import { LIB_NAME } from '../constants';

setup(React.createElement, null, React.forwardRef);

const NoData = ({ props, state, methods }) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <NoDataComponent className={`${LIB_NAME}-no-data`} color={props.color}>
      {props.noDataLabel}
    </NoDataComponent>
  );

const NoDataComponent = styled('div')`
  padding: 10px;
  text-align: center;
  color: ${({ color }) => color};
`;

export default NoData;
