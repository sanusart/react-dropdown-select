import React from 'react';
import cxs from "cxs/component";

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import {getByPath} from '../util';

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
              state.values.map((item) => (
                <Option
                  key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
                  item={item}
                  state={state}
                  props={props}
                  methods={methods}
                />
              ))
            : state.values &&
              state.values.length > 0 && <span>{getByPath(state.values[0], props.labelField)}</span>}
          <Input props={props} methods={methods} state={state} />
        </React.Fragment>
      )}
    </ContentComponent>
  );
};

const ContentComponent = cxs('div')({
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap'
});

export default Content;
