import React from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';
import { LIB_NAME } from '../constants';
import { getByPath } from '../util';
import { SelectRenderer, SelectProps, SelectState, SelectMethods } from 'react-dropdown-select';

interface ContentProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const Content = <T extends object>({ props, state, methods }: ContentProps<T>) => {
  return (
    <ContentComponent
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close');
        } else {
          return methods.dropDown('open');
        }
      }}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods } as SelectRenderer<T>)
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
              state.values.length > 0 && (
                <span>{getByPath(state.values[0], props.labelField)}</span>
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
