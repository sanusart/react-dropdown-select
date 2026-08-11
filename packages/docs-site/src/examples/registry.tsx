import type { ComponentType } from 'react';
import * as addPlaceholder from './addPlaceholder';
import * as animatedClose from './animatedClose';
import * as autoPosition from './autoPosition';
import * as avatarDropdown from './avatarDropdown';
import * as backspaceDelete from './backspaceDelete';
import * as basic from './basic';
import * as callbacks from './callbacks';
import * as clearable from './clearable';
import * as closeOnClickInput from './closeOnClickInput';
import * as closeOnScroll from './closeOnScroll';
import * as closeOnSelect from './closeOnSelect';
import * as colors from './colors';
import * as controlled from './controlled';
import * as create from './create';
import * as customClear from './customClear';
import * as customContent from './customContent';
import * as customDropdown from './customDropdown';
import * as customHandle from './customHandle';
import * as customInput from './customInput';
import * as customItem from './customItem';
import * as customLoading from './customLoading';
import * as customNoData from './customNoData';
import * as customSeparator from './customSeparator';
import * as disabled from './disabled';
import * as disabledLabel from './disabledLabel';
import * as dropdownGap from './dropdownGap';
import * as externalControl from './externalControl';
import * as form from './form';
import * as groupedDropdown from './groupedDropdown';
import * as height from './height';
import * as keepSelectedInList from './keepSelectedInList';
import * as keyboard from './keyboard';
import * as loading from './loading';
import * as multi from './multi';
import * as nested from './nested';
import * as noDataLabel from './noDataLabel';
import * as nonSearchable from './nonSearchable';
import * as portal from './portal';
import * as positionTop from './positionTop';
import * as rtl from './rtl';
import * as searchBy from './searchBy';
import * as searchFn from './searchFn';
import * as selectAll from './selectAll';
import * as separator from './separator';
import * as sortBy from './sortBy';
import * as styled from './styled';
import * as tagsCreate from './tagsCreate';
import type { ExampleMeta } from './meta';

const SOURCE_BASE =
  'https://github.com/sanusart/react-dropdown-select/blob/master/packages/docs-site/src/examples';

interface ExampleModule {
  default: ComponentType;
  meta: ExampleMeta;
}

interface ExampleEntry {
  id: string;
  title: string;
  description?: string;
  code: string;
  source: string;
  Component: ComponentType;
}

function toEntry(module: ExampleModule): ExampleEntry {
  return {
    ...module.meta,
    source: `${SOURCE_BASE}/${module.meta.id}.tsx`,
    Component: module.default,
  };
}

export const sections = [
  {
    title: 'Basic',
    examples: [
      basic,
      multi,
      clearable,
      separator,
      nonSearchable,
      disabled,
      loading,
      addPlaceholder,
    ].map(toEntry),
  },
  {
    title: 'Features',
    examples: [
      create,
      selectAll,
      closeOnSelect,
      closeOnClickInput,
      closeOnScroll,
      autoPosition,
      positionTop,
      keyboard,
      backspaceDelete,
      keepSelectedInList,
      dropdownGap,
      portal,
      callbacks,
      animatedClose,
      searchFn,
    ].map(toEntry),
  },
  {
    title: 'Data',
    examples: [
      nested,
      searchBy,
      sortBy,
      controlled,
      externalControl,
      form,
      disabledLabel,
      noDataLabel,
    ].map(toEntry),
  },
  {
    title: 'Customization',
    examples: [
      colors,
      height,
      rtl,
      styled,
      customItem,
      customHandle,
      customContent,
      customDropdown,
      groupedDropdown,
      avatarDropdown,
      customClear,
      customInput,
      customNoData,
      customLoading,
      customSeparator,
      tagsCreate,
    ].map(toEntry),
  },
];
