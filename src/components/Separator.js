import React from 'react';
import cxs from 'cxs/component';
import { LIB_NAME } from '../constants';

const Separator = ({ props, state, methods }) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods })
  ) : (
    <SeparatorComponent className={`${LIB_NAME}-separator`} />
  );

const SeparatorComponent = cxs('div')({
  borderLeft: '1px solid #ccc',
  width: '1px',
  height: '25px',
  display: 'block'
});

export default Separator;
