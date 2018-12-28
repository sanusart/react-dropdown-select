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
                  key={`${item.value}${item.label}`}
                  parentItem={item}
                  parentState={parentState}
                  parentProps={parentProps}
                  parentMethods={parentMethods}
                />
              ))
            : parentState.values &&
              parentState.values.length > 0 && <span>{parentState.values[0].label}</span>}
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
  flex: 1;
`;

Content.propTypes = {};

export default Content;
