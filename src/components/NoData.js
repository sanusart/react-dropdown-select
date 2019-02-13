import React from 'react';
import styled from '@emotion/styled';

const NoData = ({ props, state, methods }) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <NoDataComponent color={props.color}>{props.noDataLabel}</NoDataComponent>
  );

const NoDataComponent = styled.div`
  padding: 10px;
  text-align: center;
  color: ${({ color }) => color};
`;

export default NoData;
