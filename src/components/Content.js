import React from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';

const Content = ({ props, state, methods }) => {
  return (
    <ContentComponent
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={() => methods.dropDown('open')}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.multi
            ? state.values &&
              state.values.map((item) => (
                <Option
                  key={`${item[props.valueField]}${item[props.labelField]}`}
                  item={item}
                  state={state}
                  props={props}
                  methods={methods}
                />
              ))
            : state.values &&
              state.values.length > 0 && <span>{state.values[0][props.labelField]}</span>}
          <Input props={props} methods={methods} state={state} />
        </React.Fragment>
      )}
    </ContentComponent>
  );
};

const ContentComponent = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;

export default Content;
