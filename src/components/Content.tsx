import React from 'react';
import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath } from '../util';
import { ComponentRendererArgs } from '../select-types';

const Content = <T extends Record<string, any>>({ props, state, methods }: ComponentRendererArgs<T>) => {
  return (
    <div
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={(event) => {
        event.stopPropagation();
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close');
        } else {
          return methods.dropDown('open');
        }
      }}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.multi
            ? state.values &&
              state.values.map((item: T) => (
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
    </div>
  );
};

export default Content;
