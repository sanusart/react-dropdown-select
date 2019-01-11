import React from 'react';
import styled from '@emotion/styled';

import Option from './Option';
import Input from './Input';

const Content = ({ parentProps, parentState, parentMethods }) => {
  return (
    <ContentComponent
      className={`react-dropdown-select-content ${
        parentProps.multi ? 'react-dropdown-select-type-multi' : 'react-dropdown-select-type-single'
      }`}
      onClick={() => parentMethods.dropDown('open')}>
      {parentProps.contentRenderer ? (
        parentProps.contentRenderer(parentProps, parentState, parentMethods)
      ) : (
        <React.Fragment>
          {parentProps.multi
            ? parentState.values &&
              parentState.values.map((item) => (
                <Option
                  key={`${item[parentProps.valueField]}${item[parentProps.labelField]}`}
                  parentItem={item}
                  parentState={parentState}
                  parentProps={parentProps}
                  parentMethods={parentMethods}
                />
              ))
            : parentState.values &&
              parentState.values.length > 0 && <span>{parentState.values[0][parentProps.labelField]}</span>}
          <Input
            parentProps={parentProps}
            parentMethods={parentMethods}
            parentState={parentState}
          />
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

Content.propTypes = {};

export default Content;
