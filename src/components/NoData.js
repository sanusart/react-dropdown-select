import React from 'react';
import cxs from 'cxs/component';
import { LIB_NAME } from '../constants';

const NoData = ({ props, state, methods }) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <NoDataComponent className={`${LIB_NAME}-no-data`} color={props.color}>
      {props.noDataLabel}
    </NoDataComponent>
  );

const NoDataComponent = cxs('div')((props) => ({
  padding: '10px',
  textAlign: 'center',
  color: props.color
}));

export default NoData;
