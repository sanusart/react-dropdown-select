# react-dropdown-select

Customisable dropdown select for react

[![](https://badgen.net/bundlephobia/minzip/react-dropdown-select)](https://bundlephobia.com/result?p=react-dropdown-select)
[![](https://img.shields.io/npm/v/react-dropdown-select.svg)](https://www.npmjs.com/package/react-dropdown-select)
[![Coverage Status](https://coveralls.io/repos/github/sanusart/react-dropdown-select/badge.svg?branch=master&service=github)](https://coveralls.io/github/sanusart/react-dropdown-select?branch=master)
[![Build Status](https://travis-ci.org/sanusart/react-dropdown-select.svg?branch=master)](https://travis-ci.org/sanusart/react-dropdown-select)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2a68db3684044b4cb0900f0ef4550a46)](https://www.codacy.com/app/sanusart/react-dropdown-select?utm_source=github.com&utm_medium=referral&utm_content=sanusart/react-dropdown-select&utm_campaign=Badge_Grade)

### Features

- configurable via `prop`s
- total custom components overrides for all internals via render prop callbacks (with access to internal props, state and methods)
- stylable via css (or custom components)
- portal support for rendering dropdown outside local DOM tree. e.g. in `document.body`
- small bundle size

### Installation

> `npm install --save react-dropdown-select`

### Web site

[Web site, docs and demo](https://sanusart.github.io/react-dropdown-select)

### Motivation

react-select is very nice, but sometimes project requerements are beyond it's abilities

### Usage

import:

`import Select from "react-dropdown-select";`

and use as:

```jsx
<Select options={options} onChange={(values) => this.setValues(values)} />
```

> **options** and **onChange** are the minimum required props

### Help and Contributions

#### How to help/contribute

- fix issues, pull request are very welcome
- write, improve docs
- write tests (we use jest)
- suggest features and improvements

### Demo

[![Edit react-dropdown-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p54p8y1987?autoresize=1)

| Props                                                                                                    | Type        | Default        | Description                                                                                                                      |
| -------------------------------------------------------------------------------------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Component props**                                                                                      |             |                |                                                                                                                                  |
| values                                                                                                   | array       | []             | Selected values                                                                                                                  |
| options                                                                                                  | array       | []             | Available options, (option with key `disabled: true` will be disabled)                                                           |
| keepOpen                                                                                                 | bool        | false          | If true, dropdown will always stay open (good for debugging)                                                                     |
| name                                                                                                     | string      | null           | If set, input type hidden would be added in the component with the value of the `name` prop as name and select's `values` as value |
| dropdownGap                                                                                              | number      | 5              | Gap between select element and dropdown                                                                                          |
| multi                                                                                                    | bool        | false          | If true - will act as multi-select, if false - only one option will be selected at the time                                      |
| placeholder                                                                                              | string      | "Select..."    | Placeholder shown where there are no selected values                                                                             |
| addPlaceholder                                                                                           | string      | "+"            | Secondary placeholder on search field if any value selected                                                                      |
| disabled                                                                                                 | bool        | false          | Disable select and all interactions                                                                                              |
| style                                                                                                    | object      | {}             | Style object to pass to select                                                                                                   |
| className                                                                                                | string      |                | CSS class attribute to pass to select                                                                                            |
| loading                                                                                                  | bool        | false          | Loading indicator                                                                                                                |
| clearable                                                                                                | bool        | false          | Clear all indicator                                                                                                              |
| searchable                                                                                               | bool        | true           | If true, select will have search input text                                                                                      |
| separator                                                                                                | bool        | false          | Separator line between close all and dropdown handle                                                                             |
| dropdownHandle                                                                                           | bool        | true           | Dropdown handle to open/close dropdown                                                                                           |
| dropdownHeight                                                                                           | string      | "300px"        | Minimum height of a dropdown                                                                                                     |
| searchBy                                                                                                 | string      | label          | Search by object property in values                                                                                              |
| sortBy                                                                                                   | string      | null           | Sort by object property in values. If the property is of type string - sort ABC, if number sort by ascending order               |
| labelField                                                                                               | string      | "label"        | Field in data to use for label                                                                                                   |
| valueField                                                                                               | string      | "value"        | Field in data to use for value                                                                                                   |
| color                                                                                                    | string      | "#0074D9"      | Base color to use in component, also can be overwritten via CSS                                                                  |
| closeOnScroll                                                                                            | bool        | false          | If true, scrolling the page will close the dropdown                                                                              |
| closeOnSelect                                                                                            | bool        | false          | If true, selecting option will close the dropdown                                                                                |
| [openOnTop](https://sanusart.github.io/react-dropdown-select/prop/open-on-top)                           | bool        | false          | If true, dropdown will open on top of the select                                                                                 |
| keepSelectedInList                                                                                       | bool        | true           | If false, selected item will not appear in a list                                                                                |
| portal                                                                                                   | DOM element | false          | If valid dom element specified - dropdown will break out to render inside the specified element                                  |
| create                                                                                                   | bool        | false          | If true, select will create value from search string and fire `onCreateNew` callback prop                                        |
| createNewLabel                                                                                           | string      | 'add {search}' | If create set to true, this will be the label of the "add new" component. `{search}` will be replaced by search value            |
| disabledLabel                                                                                            | string      | "disabled"     | Label shown on disabled field (after) the text                                                                                   |
| **Callback props**                                                                                       |             |                |                                                                                                                                  |
| onChange                                                                                                 | func        |                | On values change callback, returns array of values objects                                                                       |
| onDropdownClose                                                                                          | func        |                | Fires upon dropdown close                                                                                                        |
| onDropdownOpen                                                                                           | func        |                | Fires upon dropdown open                                                                                                         |
| onCreateNew                                                                                              | func        |                | Fires upon creation of new item if `create` prop set to `true`                                                                   |
| onClearAll                                                                                               | func        |                | Fires upon clearing all values (via custom renderers)                                                                            |
| onSelectAll                                                                                              | func        |                | Fires upon selecting all values (via custom renderers)                                                                           |
| [contentRenderer](https://sanusart.github.io/react-dropdown-select/prop/content-renderer)                | func        |                | Overrides internal content component (the contents of the select component)                                                      |
| [itemRenderer](https://sanusart.github.io/react-dropdown-select/prop/item-renderer)                      | func        |                | Overrides internal item in a dropdown                                                                                            |
| [noDataRenderer](https://sanusart.github.io/react-dropdown-select/prop/no-data-renderer)                 | func        |                | Overrides internal "no data" (shown where search has no results)                                                                 |
| [optionRenderer](https://sanusart.github.io/react-dropdown-select/prop/option-renderer)                  | func        |                | Overrides internal option (the pillow with an "x") on the select content                                                         |
| [inputRenderer](https://sanusart.github.io/react-dropdown-select/prop/input-renderer)                    | func        |                | Overrides internal input text                                                                                                    |
| [loadingRenderer](https://sanusart.github.io/react-dropdown-select/prop/loading-renderer)                | func        |                | Overrides internal loading                                                                                                       |
| [clearRenderer](https://sanusart.github.io/react-dropdown-select/prop/clear-renderer)                    | func        |                | Overrides internal clear button                                                                                                  |
| [separatorRenderer](https://sanusart.github.io/react-dropdown-select/prop/separator-renderer)            | func        |                | Overrides internal separator                                                                                                     |
| [dropdownRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-renderer)              | func        |                | Overrides internal dropdown component                                                                                            |
| [dropdownHandleRenderer](https://sanusart.github.io/react-dropdown-select/prop/dropdown-handle-renderer) | func        |                | Overrides internal dropdown handle                                                                                               |

### License

[MIT](https://github.com/sanusart/react-dropdown-select/blob/master/LICENSE)
