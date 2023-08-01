import React from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath, getItemByValue } from '../util';

const Content = ({ props, state, methods }) => {
  return (
    <ContentComponent
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={(event) => {
        event.stopPropagation();
        methods.dropDown('open');
      }}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.multi
            ? state.values &&
              state.values.map((val) => (
                <Option
                  key={
                    props.fullObjectValues
                      ? `${getByPath(val, props.valueField)}${getByPath(val, props.labelField)}`
                      : val
                  }
                  item={
                    props.fullObjectValues
                      ? val
                      : getItemByValue(val, props.valueField, props.options)
                  }
                  state={state}
                  props={props}
                  methods={methods}
                />
              ))
            : state.values &&
              state.values.length > 0 && (
                <span>
                  {props.fullObjectValues
                    ? getByPath(state.values[0], props.labelField)
                    : getItemByValue(state.values[0], props.valueField, props.options)[
                        props.labelField
                      ]}
                </span>
              )}
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
