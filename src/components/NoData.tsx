import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

interface NoDataProps {
  props: {
    noDataRenderer?: (args: {
      props: NoDataProps['props'];
      state: any;
      methods: any;
    }) => React.ReactNode;
    noDataLabel: string;
    color?: string;
  };
  state: any;
  methods: any;
}

const NoData: React.FC<NoDataProps> = ({ props, state, methods }) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <NoDataComponent className={`${LIB_NAME}-no-data`} color={props.color}>
      {props.noDataLabel}
    </NoDataComponent>
  );

interface NoDataComponentProps {
  color?: string;
}

const NoDataComponent = styled.div<NoDataComponentProps>`
  padding: 10px;
  text-align: center;
  color: ${({ color }) => color};
`;

export default NoData;
