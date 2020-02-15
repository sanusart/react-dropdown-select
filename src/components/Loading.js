import React from 'react';
import cxs from 'cxs/component';
import { LIB_NAME } from '../constants';

const Loading = ({ props }) =>
  props.loadingRenderer ? (
    props.loadingRenderer({ props })
  ) : (
    <LoadingComponent className={`${LIB_NAME}-loading`} color={props.color} />
  );

const LoadingComponent = cxs('div')((props) => ({
  padding: '0 5px',
  display: 'block',
  width: 'auto',
  height: 'auto',
  ':after': {
    content: "' '",
    display: 'block',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${props.color} transparent`,
    animationName: 'spin',
    animationTimingFunction: 'ease-in-out',
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    margin: '0 0 0 -10px'
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(180deg)' }
  }
}));

export default Loading;
